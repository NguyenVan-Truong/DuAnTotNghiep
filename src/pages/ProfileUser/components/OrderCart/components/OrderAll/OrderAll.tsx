import { AvatarUtils } from "@/common/ColorByName/AvatarUtils";
import instance from "@/configs/axios";
import { Badge, Box, Button, Input, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
    IconCalendar,
    IconEye,
    IconFileExport,
    IconSearch,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
} from "mantine-react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as xlsx from "xlsx";

const OrderAll = () => {
    const [data, setData] = useState([]); // Đặt useState bên trong component
    const [height, setHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null); // Đặt hooks bên trong component

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
        try {
            const response = await instance.get(`orders`);
            if (response.status === 200) {
                let result = response.data.data.data; // Đảm bảo lấy đúng thuộc tính "data" từ response
                setData(result);
            }
        } catch (error) {
            setData([]);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "id",
                header: "Mã đơn hàng",
                Cell: ({ renderedCellValue, cell }) => (
                    <Badge
                        radius="sm"
                        variant="dot"
                        size="lg"
                        color={renderedCellValue === null ? "red" : "#21d01b"}
                    >
                        {renderedCellValue === null ? null : renderedCellValue}
                    </Badge>
                ),
            },
            {
                accessorKey: "customer.customer_name",
                header: "Tên khách hàng",
                Cell: ({ renderedCellValue, row }) => (
                    <>
                        <AvatarUtils
                            value={
                                row.original.customer.customer_name
                                    ?.toString()
                                    .split("-")[0]
                            }
                        />
                    </>
                ),
            },
            {
                accessorKey: "customer_name",
                header: "Tên người nhận",
                Cell: ({ renderedCellValue, row }) => (
                    <>
                        <AvatarUtils
                            value={
                                row.original.customer_name
                                    ?.toString()
                                    .split("-")[0]
                            }
                        />
                    </>
                ),
            },
            {
                accessorKey: "total_amount",
                header: "Tổng tiền",
                Cell: ({ cell }) => {
                    const totalAmount = Number(cell.getValue());
                    if (!isNaN(totalAmount)) {
                        const roundedAmount = Math.floor(totalAmount);
                        return roundedAmount.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        });
                    }
                    return "₫0";
                },
            },
            {
                accessorKey: "shipping_address",
                header: "Địa chỉ giao hàng",
            },
            {
                accessorKey: "created_at",
                header: "Ngày đặt",
                Cell: ({ cell }: any) =>
                    dayjs(cell.getValue()).format("DD-MM-YYYY"),
            },
            {
                accessorKey: "payment_method.payment_method_name",
                header: "Phương thức thanh toán",
                size: 250,
            },
            {
                accessorKey: "payment_status",
                header: "Trạng thái thanh toán",
                size: 250,
            },
            {
                accessorKey: "status",
                header: "Trạng thái đơn hàng",
            },
            {
                accessorKey: "final_amount",
                header: "Tổng tiền sau giảm giá",
                Cell: ({ cell }) => {
                    const totalAmount = Number(cell.getValue());
                    if (!isNaN(totalAmount)) {
                        const roundedAmount = Math.floor(totalAmount);
                        return roundedAmount.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        });
                    }
                    return "₫0";
                },
                size: 250,
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data,
        enableColumnPinning: true, // Kích hoạt ghim cột
        initialState: {
            showColumnFilters: false,
            columnPinning: {
                left: ["mrt-row-select", "id"], // ghim cột bên trái
                right: ["status"], // ghim cột bên phải
            },
            density: "xs",
        },
        positionToolbarAlertBanner: "bottom",
        mantineTableContainerProps: {
            style: { maxHeight: height, minHeight: height },
        },
        enableRowSelection: true,
        mantinePaginationProps: {
            showRowsPerPage: true,
            withEdges: true,
            rowsPerPageOptions: ["10", "50", "100"],
        },
        paginationDisplayMode: "pages",
        mantineTableProps: {
            striped: false,
        },
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
                        type="text"
                        leftSection={<IconSearch size={"20"} color="#15aabf" />}
                    />
                    <DatePickerInput
                        type="range"
                        size="sm"
                        placeholder="Từ ngày - Đến ngày"
                        locale="vi"
                        valueFormat="DD/MM/YYYY"
                        leftSection={<IconCalendar color="#15aabf" />}
                        w={250}
                        clearable
                    />
                    <Button color="blue" variant="outline">
                        Tìm kiếm
                    </Button>
                </Box>
            </div>
        ),
        renderToolbarInternalActions: () => (
            <>
                <Button
                    leftSection={<IconEye size={20} />}
                    variant="outline"
                    mr={"xs"}
                >
                    Chi Tiết
                </Button>
                <Button
                    leftSection={<IconFileExport size={20} />}
                    variant="outline"
                    mr={"xs"}
                    onClick={handleExport}
                >
                    Export Excel
                </Button>
            </>
        ),
    });

    useEffect(() => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const handleResize = () => {
            setHeight(window.innerHeight - (210 + headerHeight));
        };

        handleResize(); // Set initial height
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="mt-5">
            <MantineReactTable table={table} />
        </div>
    );
};

export default OrderAll;
