import { DatePickerInput } from "@mantine/dates";
import type { TableColumnsType } from "antd";
import { Button, Input, Table } from "antd";
import React, { useState } from "react";
import styles from "./OrderAll.module.scss";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: "Mã đơn hàng",
        width: 120,
        dataIndex: "name",
        key: "name",
        fixed: "left",
    },
    { title: "Số lượng sản phẩm", dataIndex: "address", key: "1" },
    { title: "Ngày mua", dataIndex: "address", key: "2" },
    { title: "Ngày dự kiến nhận hàng", dataIndex: "address", key: "3" },
    { title: "Địa chỉ nhận hàng", dataIndex: "address", key: "4" },
    { title: "Tổng Tiền", dataIndex: "address", key: "5" },
    { title: "Ngày giao", dataIndex: "address", key: "6" },
    {
        title: "Trạng thái",
        key: "operation",
        fixed: "right",
        width: 100,
        render: () => <Button type="link">Xem chi tiết</Button>,
    },
];

const dataSource: DataType[] = [
    { key: "1", name: "Olivia", age: 32, address: "New York Park" },
    { key: "2", name: "Ethan", age: 40, address: "London Park" },
    { key: "3", name: "Sophia", age: 25, address: "Paris Street" },
    { key: "4", name: "Liam", age: 35, address: "Berlin Avenue" },
];

const OrderAll: React.FC = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [filteredDataSource, setFilteredDataSource] =
        useState<DataType[]>(dataSource);

    const handleSearch = () => {
        const filteredData = dataSource.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()),
        );
        setFilteredDataSource(filteredData);
    };

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[]) => {
            console.log("Selected row keys:", selectedRowKeys);
        },
    };

    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 10,
                }}
            >
                <div className="flex">
                    <Input
                        placeholder="Tìm kiếm theo mã đơn hàng"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 200, marginRight: 5 }}
                    />
                    <DatePickerInput
                        clearable
                        type="range"
                        placeholder="Tìm theo ngày mua"
                        style={{ width: 270 }}
                    />
                    <Button
                        onClick={handleSearch}
                        // className="!py-2"
                        style={{ height: 35, marginLeft: 5 }}
                    >
                        Tìm kiếm
                    </Button>
                </div>

                <Button style={{ height: 35, marginLeft: 5 }}>
                    Xem chi tiết
                </Button>
            </div>
            <Table<DataType>
                className={styles.customTable}
                rowSelection={rowSelection}
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                }}
                columns={columns}
                dataSource={filteredDataSource}
                scroll={{ x: "max-content" }}
            />
        </div>
    );
};

export default OrderAll;
