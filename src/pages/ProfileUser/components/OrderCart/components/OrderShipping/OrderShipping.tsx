import { AvatarUtils } from "@/common/ColorByName/AvatarUtils";
import instance from "@/configs/axios";
import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Input,
    Select,
    Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { modals } from "@mantine/modals";
import {
    IconCalendar,
    IconCheck,
    IconEye,
    IconFileExport,
    IconSearch,
    IconSwitch,
} from "@tabler/icons-react";
import {
    MantineReactTable,
    MRT_PaginationState,
    MRT_Row,
    MRT_RowSelectionState,
    useMantineReactTable,
    type MRT_ColumnDef,
} from "mantine-react-table";

import { formatDateNotTimeZone } from "@/model/_base/Date";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as xlsx from "xlsx";
import DetailOrder from "../DetailOrder";
import { Order } from "@/model/Order";
import { message } from "antd";
import { useQuery } from "@tanstack/react-query";

const OrderShipping = () => {
    const [height, setHeight] = useState(0);
    const [rowCount, setRowCount] = useState(1);
    const headerRef = useRef<HTMLDivElement>(null);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [selectId, setSelectId] = useState<string | undefined>(undefined);
    const [search, setSearch] = useState({
        search: "",
        order_date: "",
    });
    const handleChangeSearchValue = (value: string | null, key: string) => {
        setSearch((prevData) => ({
            ...prevData,
            [key]: value ? value : 0,
        }));
        setPagination({
            ...pagination,
            pageIndex: 0,
        });
    };
    // Hàm xuất file Excel
    const { data, refetch } = useQuery<Order[]>({
        queryKey: ["orders", pagination],
        queryFn: async () => fetchData(),
    });

    // Lấy dữ liệu từ API
    const fetchData = async () => {
        let url = `?page=${pagination.pageIndex}&status=shipping`;
        if (search.order_date) {
            url += `&order_date=${search.order_date}`;
        }
        if (search.search) {
            url += `&search=${search.search}`;
        }
        try {
            const response = await instance.get(`orders${url}`);
            if (response.status === 200) {
                const result = response.data.data.data;
                setRowCount(response.data.data.total);
                return result;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Hook gọi fetchData khi pagination thay đổi

    // Hàm lấy màu cho trạng thái đơn hàng
    function getColorStatus(text: any) {
        switch (text) {
            case "Chờ xử lý":
                return "#FFE082";
            case "Đang xử lý":
                return "#FFB74D";
            case "Đang giao hàng":
                return "#64B5F6";
            default:
                return "#81C784";
        }
    }

    // Hàm lấy màu cho trạng thái thanh toán
    function getColorStatusPayment(text: any) {
        return text === "Đã thanh toán" ? "green" : "red";
    }
    function getColorStatusPay(text: any) {
        return text === "Chuyển khoản ngân hàng" ? "blue" : "pink";
    }
    // Cấu hình các cột của bảng
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "order_code",
                header: "Mã đơn hàng",
                Cell: ({ renderedCellValue }) => (
                    <Badge
                        radius="sm"
                        variant="dot"
                        size="lg"
                        color={renderedCellValue === null ? "red" : "#21d01b"}
                    >
                        {renderedCellValue || null}
                    </Badge>
                ),
                size: 20,
            },
            {
                accessorKey: "created_at",
                header: "Ngày đặt",
            },
            {
                accessorKey: "final_amount",
                header: "Tổng tiền",
                Cell: ({ cell }) => {
                    const totalAmount = Number(cell.getValue());
                    return !isNaN(totalAmount)
                        ? totalAmount.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                          })
                        : "₫0";
                },
            },
            {
                accessorKey: "status",
                header: "Trạng thái đơn hàng",
                Cell: ({ renderedCellValue }) => (
                    <Badge color={getColorStatus(renderedCellValue)}>
                        {renderedCellValue || "Không có"}
                    </Badge>
                ),
            },
            {
                accessorKey: "action",
                header: "Thao tác",
                size: 10,
                Cell: ({ row }) => (
                    <Box
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        {processTaskActionMenu(row)}
                    </Box>
                ),
            },
        ],
        [],
    );
    function processTaskActionMenu(row: MRT_Row<any>): any {
        return (
            <>
                <Tooltip label="Xem chi tiết">
                    <ActionIcon
                        variant="light"
                        aria-label="Settings"
                        color="yellow"
                    >
                        <IconEye
                            size={20}
                            onClick={() => callApiGetData(row?.original.id)}
                        />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Xác nhận đã nhận hàng">
                    <ActionIcon
                        variant="light"
                        aria-label="Settings"
                        color="green"
                        disabled={row.original.status !== "Đã giao hàng"}
                    >
                        <IconCheck
                            size={20}
                            onClick={() => handleCheck(row?.original.id)}
                        />
                    </ActionIcon>
                </Tooltip>
            </>
        );
    }
    const handleCheck = async (id: string) => {
        try {
            await instance.put(`orders?confirm_order_id=${id}`);
            message.success("Xác nhận đã nhận hàng thành công");
            refetch();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // Xử lý khi chỉ lấy 1 ID từ rowSelection

    const callApiGetData = async (id: string | undefined) => {
        try {
            const response = await instance.get(`/orders/${id}`);
            if (response?.data?.data) {
                modals.openConfirmModal({
                    title: "Chi tiết đơn hàng",
                    size: "1000px",
                    children: <DetailOrder data={response.data.data} />,
                    confirmProps: { display: "none" },
                    cancelProps: { display: "none" },
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const table = useMantineReactTable({
        columns,
        data: data || [],
        mantineTopToolbarProps: {
            style: {
                borderBottom: "3px solid rgba(128, 128, 128, 0.5)",
                marginBottom: 5,
            },
        },

        initialState: {
            showColumnFilters: false,
            columnPinning: {
                left: ["order_code"],
                right: ["action"],
            },
            columnVisibility: { id: true },
            density: "xs",
        },
        enableRowSelection: false,
        mantineTableContainerProps: {
            style: { maxHeight: height - 100, minHeight: height - 100 },
        },
        enableStickyHeader: true,
        manualFiltering: false,
        manualPagination: true,
        manualSorting: true,
        enableTopToolbar: true,
        rowCount,
        onPaginationChange: setPagination,
        renderTopToolbarCustomActions: ({ table }) => (
            <div ref={headerRef}>
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Input
                        style={{ flex: 1, maxWidth: "180px" }}
                        placeholder="Nhập tìm kiếm"
                        leftSection={<IconSearch size={"20"} color="#15aabf" />}
                        onChange={(e) => {
                            handleChangeSearchValue(
                                e.target.value ?? "",
                                "search",
                            );
                        }}
                    />
                    <Select
                        size="sm"
                        placeholder="Trạng thái"
                        searchable
                        clearable
                        data={[
                            { value: "completed", label: "Hoàn thành" },
                            {
                                value: "shipping",
                                label: "Đang giao hàng",
                            },
                            {
                                value: "processing",
                                label: "Đang Xử lý",
                            },
                            {
                                value: "pending",
                                label: "Chờ Xử lý",
                            },
                        ]}
                        style={{ flex: 1, maxWidth: "180px" }}
                        leftSection={<IconSwitch size={20} color="#15aabf" />}
                        onChange={(value: any) =>
                            handleChangeSearchValue(value ?? "", "status")
                        }
                    />
                    <DateInput
                        size="sm"
                        placeholder="Ngày đặt"
                        locale="vi"
                        valueFormat="DD/MM/YYYY"
                        leftSection={<IconCalendar color="#15aabf" />}
                        w={180}
                        clearable
                        onChange={(e) => {
                            handleChangeSearchValue(
                                formatDateNotTimeZone(e) ?? "",
                                "order_date",
                            );
                        }}
                    />
                    <Button
                        color="blue"
                        variant="outline"
                        onClick={async () => {
                            await fetchData();
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Box>
            </div>
        ),
        renderToolbarInternalActions: () => <></>,
        mantineTableBodyCellProps: ({ row }) => ({
            style: {
                fontSize: "11.5px",
                padding: "4px 12px",
            },
        }),
        state: {
            pagination,
        },
        mantinePaginationProps: {
            showRowsPerPage: false,
            withEdges: false,
            rowsPerPageOptions: ["20", "50", "100"],
        },
        paginationDisplayMode: "pages",
        enableColumnPinning: true,
        mantineTableProps: {
            striped: false,
        },
    });

    useEffect(() => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const handleResize = () => {
            setHeight(window.innerHeight - (263 + headerHeight));
        };

        handleResize(); // Set initial height
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return <MantineReactTable table={table} />;
};

export default OrderShipping;
