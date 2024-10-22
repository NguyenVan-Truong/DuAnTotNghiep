import { Box, Button, Input, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconEye, IconSearch } from "@tabler/icons-react";
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
} from "mantine-react-table";
import { useEffect, useMemo, useRef, useState } from "react";

type Person = {
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
    city: string;
    state: string;
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

const OrderBack = () => {
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

export default OrderBack;
