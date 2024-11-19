import React, { useEffect, useRef, useState } from "react";
import instance from "@/configs/axios";
import { useReactToPrint } from "react-to-print";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconMessageCircleStar } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import ProductReviews from "./ProductReviews";
import { message } from "antd";

type OrderDetailProps = {
    data: any;
};

const OrderDetail = ({ data }: OrderDetailProps) => {
    const Reviews = async (item: number) => {
        modals.openConfirmModal({
            title: "Chi tiết đơn hàng",
            size: "1000px",
            children: <ProductReviews data={item} />,
            confirmProps: { display: "none" },
            cancelProps: { display: "none" },
        });
    };
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
                {item.variant
                    ? (() => {
                          try {
                              const parsedVariant = JSON.parse(item.variant);
                              return Object.values(parsedVariant).join(", ");
                          } catch (e) {
                              console.error("Invalid JSON:", e);
                              return "";
                          }
                      })()
                    : ""}
            </td>
            <td className="px-4 py-2 text-left">
                <Tooltip label="Đánh giá">
                    <ActionIcon
                        variant="light"
                        aria-label="Settings"
                        color="green"
                        disabled={
                            item.is_reviewed === "Đã có đánh giá" ||
                            data.status !== "Hoàn thành"
                        }
                        onClick={() => Reviews(item)}
                    >
                        <IconMessageCircleStar size={20} />
                    </ActionIcon>
                </Tooltip>
            </td>
        </tr>
    ));

    // Đảm bảo rằng hook useReactToPrint luôn được gọi trong render
    const generatePDF = useReactToPrint({
        contentRef: componentPDF,
        documentTitle: `Order`,
        onAfterPrint: () => {
            message.success("In hóa đơn thành công!");
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
                <h2>Mã đơn hàng : {data.order_code}</h2>
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
                            <span>{data.created_at}</span>
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
                                Mô tả sản phẩm
                            </th>
                            <th
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                }}
                            >
                                Thao tác
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
