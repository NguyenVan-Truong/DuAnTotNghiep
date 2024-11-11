import { AvatarUtils } from "@/common/ColorByName/AvatarUtils";
import instance from "@/configs/axios";
import { Badge, Box, Button, Input } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
    IconCalendar,
    IconEye,
    IconFileExport,
    IconSearch,
} from "@tabler/icons-react";
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
} from "mantine-react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as xlsx from "xlsx";

const OrderAll = () => {
    const [data, setData] = useState<any[]>([]); // Cập nhật kiểu dữ liệu
    const [height, setHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

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
        console.log("url", url);
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
    useEffect(() => {
        fetchData();
    }, [pagination]);

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
            },
            {
                accessorKey: "customer.customer_name",
                header: "Tên khách hàng",
                Cell: ({ row }) => (
                    <AvatarUtils
                        value={
                            row.original.customer.customer_name?.split("-")[0]
                        }
                    />
                ),
            },
            {
                accessorKey: "customer_name",
                header: "Tên người nhận",
                Cell: ({ row }) => (
                    <AvatarUtils
                        value={row.original.customer_name?.split("-")[0]}
                    />
                ),
            },
            {
                accessorKey: "shipping_address",
                header: "Địa chỉ giao hàng",
            },
            {
                accessorKey: "created_at",
                header: "Ngày đặt",
            },
            {
                accessorKey: "payment_method.payment_method_name",
                header: "Phương thức thanh toán",
                size: 250,
            },
            {
                accessorKey: "payment_status",
                header: "Trạng thái thanh toán",
                size: 230,
                Cell: ({ renderedCellValue }) => (
                    <Badge color={getColorStatusPayment(renderedCellValue)}>
                        {renderedCellValue === "Đã thanh toán"
                            ? "Đã thanh toán"
                            : "Chưa thanh toán"}
                    </Badge>
                ),
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
        ],
        [],
    );

    // Tạo bảng Mantine React Table
    const table = useMantineReactTable({
        columns,
        data,
        enableColumnFilters: true,
        enableSorting: true,
        enableColumnActions: true,
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
                    mr="xs"
                >
                    Chi Tiết
                </Button>
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
            showRowsPerPage: true,
            withEdges: true,
            rowsPerPageOptions: ["10", "50", "100"],
        },
    });

    // Thiết lập chiều cao động cho bảng
    useEffect(() => {
        const handleResize = () => {
            const headerHeight = headerRef.current?.offsetHeight || 0;
            setHeight(window.innerHeight - (210 + headerHeight));
        };
        handleResize(); // Set initial height
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="mt-5">
            <MantineReactTable table={table} />
        </div>
    );
};

export default OrderAll;
