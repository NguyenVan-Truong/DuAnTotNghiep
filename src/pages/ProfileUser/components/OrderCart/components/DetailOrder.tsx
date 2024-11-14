import React, { useEffect, useRef, useState } from "react";
import instance from "@/configs/axios";
import { useReactToPrint } from "react-to-print";

type OrderDetailProps = {
    data: any;
};

const OrderDetail = ({ data }: OrderDetailProps) => {
    const componentPDF = useRef<HTMLDivElement>(null);
    const rows = data.order_items.map((item: any) => (
        <tr key={item.id} className="border-b border-gray-200">
            <td className="px-4 py-2 text-left">{item.product_name}</td>
            <td className="px-4 py-2 text-center">{item.quantity}</td>
            <td className="px-4 py-2 text-center">
                {Number(item.price).toLocaleString("vi-VN")} VND
            </td>
            <td className="px-4 py-2 text-center">
                {Number(item.total).toLocaleString("vi-VN")} VND
            </td>
            <td className="px-4 py-2 text-left">
                {item.variant ? JSON.parse(item.variant).join(", ") : ""}
            </td>
        </tr>
    ));

    // Đảm bảo rằng hook useReactToPrint luôn được gọi trong render
    const generatePDF = useReactToPrint({
        contentRef: componentPDF,
        documentTitle: `Order`,
        onAfterPrint: () => {
            console.log("Printed successfully");
        },
    });

    return (
        <div
            style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <button
                onClick={() => generatePDF()}
                style={{
                    padding: "10px 20px",
                    marginBottom: "20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                In hóa đơn
            </button>
            <div ref={componentPDF}>
                <h2>Mã đơn hàng : {data.id}</h2>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                    }}
                >
                    <div style={{ width: "45%" }}>
                        <p>
                            <strong>Tên người nhận:</strong>{" "}
                            {data.customer_name}
                        </p>
                        <p>
                            <strong>Tên khách hàng :</strong>{" "}
                            {data.customer.customer_name}
                        </p>
                        <p>
                            <strong>Địa chỉ giao hàng:</strong>{" "}
                            {data.shipping_address}
                        </p>
                    </div>
                    <div style={{ width: "45%" }}>
                        <p>
                            <strong>Phương thức thanh toán:</strong>{" "}
                            {data.payment_method.payment_method_name}
                        </p>
                        <p>
                            <strong>Phí vận chuyển:</strong>{" "}
                            {Number(data.shipping_fee).toLocaleString("vi-VN")}{" "}
                            VND
                        </p>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                    }}
                >
                    <div style={{ width: "45%" }}>
                        <p>
                            <strong>Tổng tiền:</strong>{" "}
                            {Number(data.total_amount).toLocaleString("vi-VN")}{" "}
                            VND
                        </p>
                        <p>
                            <strong>Giảm giá:</strong>{" "}
                            {Number(data.discount_amount).toLocaleString(
                                "vi-VN",
                            )}{" "}
                            VND
                        </p>
                        <p>
                            <strong>Thành toán:</strong>{" "}
                            {Number(data.final_amount).toLocaleString("vi-VN")}{" "}
                            VND
                        </p>
                    </div>
                    <div style={{ width: "45%" }}>
                        <p>
                            <strong>Trạng thái đơn hàng:</strong>{" "}
                            <span style={{ color: "green" }}>
                                {data.status}
                            </span>
                        </p>
                        <p>
                            <strong>Trạng thái thanh toán:</strong>{" "}
                            <span
                                style={{
                                    color:
                                        data.payment_status === "Đã thanh toán"
                                            ? "green"
                                            : "red",
                                }}
                            >
                                {data.payment_status}
                            </span>
                        </p>
                        <p>
                            <strong>Ngày tạo:</strong>{" "}
                            {new Date(data.created_at).toLocaleDateString(
                                "vi-VN",
                            )}
                        </p>
                        <p>
                            <strong>Ngày cập nhật:</strong>{" "}
                            {new Date(data.updated_at).toLocaleDateString(
                                "vi-VN",
                            )}
                        </p>
                    </div>
                </div>

                <h3>Sản phẩm trong đơn hàng</h3>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                }}
                            >
                                Tên sản phẩm
                            </th>
                            <th
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                }}
                            >
                                Số lượng
                            </th>
                            <th
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                }}
                            >
                                Giá
                            </th>
                            <th
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                }}
                            >
                                Tổng cộng
                            </th>
                            <th
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                }}
                            >
                                Biến thể
                            </th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
