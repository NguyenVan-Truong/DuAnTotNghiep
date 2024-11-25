import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ActionIcon, Box, Text, Tooltip } from "@mantine/core";
import { IconMessageCircleStar } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import ProductReviews from "./ProductReviews";
import { Image, message } from "antd";
import { useNavigate } from "react-router-dom";

type OrderDetailProps = {
    data: any;
};

const OrderDetail = ({ data }: OrderDetailProps) => {
    const navigate = useNavigate();
    const Reviews = async (item: number) => {
        modals.openConfirmModal({
            title: "Dánh giá đơn hàng",
            size: "500px",
            children: <ProductReviews data={item} />,
            confirmProps: { display: "none" },
            cancelProps: { display: "none" },
        });
    };
    const componentPDF = useRef<HTMLDivElement>(null);
    const onhandleTurnPage = (id: number, slug: string) => {
        navigate(`/chi-tiet-san-pham/${slug}`, { state: { id: id } });
        modals.closeAll();
    };
    const rows = data.order_items.map((item: any) => {
        return (
            <tr key={item.id} className="border-b border-gray-200">
                <td
                    className="px-4 py-2 text-left cursor-pointer"
                    onClick={() =>
                        onhandleTurnPage(item?.product_id, item?.slug)
                    }
                >
                    <Box className="w-44">
                        <Text className="truncate">{item.product_name}</Text>
                    </Box>
                </td>
                <td>
                    <Image
                        src={item.image_url}
                        alt={item.product_name}
                        width={80}
                    />
                </td>
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
                                  const parsedVariant = JSON.parse(
                                      item.variant,
                                  );
                                  return Object.values(parsedVariant).join(
                                      ", ",
                                  );
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
        );
    });

    const generatePDF = useReactToPrint({
        contentRef: componentPDF,
        documentTitle: `Order`,
        onAfterPrint: () => {
            message.success("In hóa đơn thành công!");
        },
    });

    return (
        <div className="p-5 border border-gray-300 rounded-lg shadow-md">
            <button
                onClick={() => generatePDF()}
                className="px-5 py-2 mb-5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                In hóa đơn
            </button>
            <div ref={componentPDF}>
                <h2 className="text-xl font-semibold mb-4">
                    Mã đơn hàng: {data.order_code}
                </h2>
                <div className="flex justify-between mb-5">
                    <div className="w-1/2 space-y-2">
                        <p>
                            <strong>Tên người nhận:</strong>{" "}
                            {data.customer_name}
                        </p>
                        <p>
                            <strong>Tên khách hàng:</strong>{" "}
                            {data.customer.customer_name}
                        </p>
                        <p>
                            <strong>Địa chỉ giao hàng:</strong>{" "}
                            {data.shipping_address}
                        </p>
                    </div>
                    <div className="w-1/2 space-y-2">
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
                <div className="flex justify-between mb-5">
                    <div className="w-1/2 space-y-2">
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
                    <div className="w-1/2 space-y-2">
                        <p>
                            <strong>Trạng thái đơn hàng:</strong>{" "}
                            <span className="text-green-600">
                                {data.status}
                            </span>
                        </p>
                        <p>
                            <strong>Trạng thái thanh toán:</strong>{" "}
                            <span
                                className={
                                    data.payment_status === "Đã thanh toán"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
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

                <h3 className="text-lg font-semibold mb-3">
                    Sản phẩm trong đơn hàng
                </h3>

                <table className="w-full border-collapse mt-2">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">
                                Tên sản phẩm
                            </th>
                            <th className="border border-gray-300 p-2">
                                Hình ảnh
                            </th>
                            <th className="border border-gray-300 p-2">
                                Số lượng
                            </th>
                            <th className="border border-gray-300 p-2">Giá</th>
                            <th className="border border-gray-300 p-2">
                                Tổng cộng
                            </th>
                            <th className="border border-gray-300 p-2">
                                Mô tả sản phẩm
                            </th>
                            <th className="border border-gray-300 p-2">
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
