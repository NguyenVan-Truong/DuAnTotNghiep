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
    IconMessageCircleStar,
    IconSearch,
    IconSwitch,
    IconX,
} from "@tabler/icons-react";
import {
    MantineReactTable,
    MRT_Row,
    MRT_RowSelectionState,
    useMantineReactTable,
    type MRT_ColumnDef,
} from "mantine-react-table";

import { formatDateNotTimeZone } from "@/model/_base/Date";
import { Order } from "@/model/Order";
import { message, Popconfirm } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as xlsx from "xlsx";
import DetailOrder from "../DetailOrder";

const OrderAll = () => {
    const [data, setData] = useState<Order[]>([]); // Cập nhật kiểu dữ liệu
    const [height, setHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [search, setSearch] = useState({
        search: "",
        order_date: "",
        status: "",
    });
    const handleChangeSearchValue = (value: string | null, key: string) => {
        setSearch((prevData) => ({
            ...prevData,
            [key]: value ? value : 0,
        }));
    };
    // Hàm xuất file Excel
    const handleExport = () => {
        try {
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(workbook, worksheet, "Data");
            xlsx.writeFile(workbook, "danh-sach-don-hang.xlsx");
            toast.success("Export excel thành công", { autoClose: 1500 });
        } catch (error) {
            toast.error("Export excel thất bại", { autoClose: 1500 });
        }
    };

    // Lấy dữ liệu từ API
    const fetchData = async () => {
        let url = `?page=${pagination.pageIndex}`;
        if (search.status) {
            url += `&status=${search.status}`;
        }
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
                setData(result);
            }
        } catch (error) {
            setData([]);
            console.error(error);
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
            // {
            //     accessorKey: "customer.customer_name",
            //     header: "Tên khách hàng",
            //     Cell: ({ row }) => (
            //         <AvatarUtils
            //             value={
            //                 row.original.customer.customer_name?.split("-")[0]
            //             }
            //         />
            //     ),
            // },
            // {
            //     accessorKey: "customer_name",
            //     header: "Tên người nhận",
            //     Cell: ({ row }) => (
            //         <AvatarUtils
            //             value={row.original.customer_name?.split("-")[0]}
            //         />
            //     ),
            // },
            // {
            //     accessorKey: "email",
            //     header: "Email người nhận",
            // },
            // {
            //     accessorKey: "shipping_address",
            //     header: "Địa chỉ giao hàng",
            // },
            {
                accessorKey: "created_at",
                header: "Ngày đặt",
            },
            // {
            //     accessorKey: "note",
            //     header: "Ghi chú",
            // },
            // {
            //     accessorKey: "payment_method.payment_method_name",
            //     header: "Phương thức thanh toán",
            //     size: 250,
            //     Cell: ({ renderedCellValue }) => (
            //         <Badge color={getColorStatusPay(renderedCellValue)}>
            //             {renderedCellValue === "Chuyển khoản ngân hàng"
            //                 ? "Chuyển khoản ngân hàng"
            //                 : "Tiền mặt khi nhận hàng"}
            //         </Badge>
            //     ),
            // },
            // {
            //     accessorKey: "payment_status",
            //     header: "Trạng thái thanh toán",
            //     size: 230,
            //     Cell: ({ renderedCellValue }) => (
            //         <Badge color={getColorStatusPayment(renderedCellValue)}>
            //             {renderedCellValue === "Đã thanh toán"
            //                 ? "Đã thanh toán"
            //                 : "Chưa thanh toán"}
            //         </Badge>
            //     ),
            // },

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
                <Popconfirm
                    placement="topRight"
                    title={"Bạn có chắc muốn xóa ko ?"}
                    okText="Có"
                    cancelText="Ko"
                    className="mx-auto"
                    onConfirm={() => handleCancel(row?.original.id)}
                >
                    <Tooltip label="Xóa">
                        <ActionIcon
                            color="red"
                            variant="light"
                            size="md"
                            aria-label="Settings"
                            disabled={row.original.status !== "Chờ xử lý"}
                        >
                            <IconX size={20} />
                        </ActionIcon>
                    </Tooltip>
                </Popconfirm>
            </>
        );
    }

    const handleCheck = async (id: string) => {
        try {
            await instance.put(`/orders/${id}/complete-status`);
            message.success("Xác nhận đã nhận hàng thành công");
            fetchData();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCancel = async (id: string) => {
        try {
            await instance.put(`/orders/${id}/cancel-status`);
            message.success("Hủy đặt hàng thành công");
            fetchData();
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
        data,
        enableColumnFilters: true,
        enableSorting: true,
        enableColumnActions: true,
        enableColumnPinning: true,
        initialState: {
            showColumnFilters: false,
            columnPinning: {
                left: ["mrt-row-select", "order_code"],
                right: ["action"],
            },
            density: "xs",
        },
        state: {
            pagination,
        },
        getRowId: (row) => row.id,
        positionToolbarAlertBanner: "bottom",
        renderTopToolbarCustomActions: () => (
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
                        onChange={(value) =>
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
        renderToolbarInternalActions: () => (
            <>
                <Button
                    leftSection={<IconFileExport size={20} />}
                    variant="outline"
                    mr="xs"
                    onClick={handleExport}
                >
                    Export Excel
                </Button>
            </>
        ),
        mantineTableContainerProps: {
            style: { maxHeight: height, minHeight: height },
        },
        enableStickyHeader: true,
        manualPagination: true,
        onPaginationChange: setPagination,
        mantineTableBodyCellProps: () => ({
            style: { fontSize: "11.5px", padding: "4px 12px" },
        }),
        mantinePaginationProps: {
            showRowsPerPage: false,
            withEdges: true,
            rowsPerPageOptions: ["10", "50", "100"],
        },
    });

    useEffect(() => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const handleResize = () => {
            setHeight(window.innerHeight - (240 + headerHeight));
        };

        handleResize(); // Set initial height
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        fetchData();
    }, [pagination]);
    return <MantineReactTable table={table} />;
};

export default OrderAll;
