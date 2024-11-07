import { Box, Button, Input, Menu, Text } from "@mantine/core";
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
type Person = {
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
    city: string;
    state: string;
};
const handleExport = () => {
    try {
        // const exportData = data.map((item) => ({
        //     fullName: `${item.name.firstName} ${item.name.lastName}`, // Gộp firstName và lastName
        //     address: item.address,
        //     city: item.city,
        //     state: item.state,
        // }));

        // Tạo worksheet và workbook từ dữ liệu đã chuyển đổi
        // const worksheet = xlsx.utils.json_to_sheet(exportData);
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Data");
        xlsx.writeFile(workbook, "danh-sach-don-hang.xlsx");
        toast.success("Export excel thành công", { autoClose: 1500 });
    } catch (error) {
        toast.error("Export excel thất bại", { autoClose: 1500 });
    }
};
// Dữ liệu mẫu
const data: Person[] = [
    {
        name: {
            firstName: "Zachary",
            lastName: "Davis",
        },
        address: "261 Battle Ford",
        city: "Columbus",
        state: "Ohio",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
];

const OrderAll = () => {
    const [height, setHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null); // Đặt hooks bên trong component
    // const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: "name.firstName",
                header: "Mã đơn hàng",
                size: 30,
                Cell: ({ renderedCellValue }: any) => (
                    <>
                        <Text>{renderedCellValue}</Text>
                    </>
                ),
            },
            {
                accessorKey: "name.lastName",
                header: "Số lượng ",
            },
            {
                accessorKey: "address",
                header: "Ngày đặt",
            },
            {
                accessorKey: "city",
                header: "Ngày nhận (dự kiến)",
            },
            {
                accessorKey: "statea", // Thay đổi `accessorKey` cho cột này
                header: "Tổng tiền",
            },
            {
                accessorKey: "state",
                header: "Trạng thái",
                size: 30,
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
                left: ["mrt-row-select", "name.firstName"], // ghim cột bên phải
                right: ["state"], // ghim cột bên trái
            },
            density: "xs",
        },
        positionToolbarAlertBanner: "bottom",
        mantineTableContainerProps: {
            style: { maxHeight: height, minHeight: height },
        },
        enableRowSelection: true,
        manualFiltering: false,
        manualPagination: true,
        manualSorting: false,
        mantinePaginationProps: {
            showRowsPerPage: true,
            withEdges: true,
            rowsPerPageOptions: ["10", "50", "100"],
            // total: rowCount,
        },
        paginationDisplayMode: "pages",
        mantineTableProps: {
            striped: false,
        },
        // onRowSelectionChange: setRowSelection,
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
        renderToolbarInternalActions: ({ table }) => (
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
        <>
            <div className="mt-5">
                <MantineReactTable table={table} />
            </div>
        </>
    );
};

export default OrderAll;
