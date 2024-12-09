import { conDau, logo, logoPrint } from "@/assets/img";
import { Box, Text } from "@mantine/core";
import { Image } from "antd";

type OrderDetailProps = {
    data: any;
};

const PrintDetail = ({ data }: OrderDetailProps) => {
    function getColorStatus(text: any) {
        switch (text) {
            case "Chờ xử lý":
                return "#FFE082";
            case "Đang xử lý":
                return "#FFB74D";
            case "Đang giao hàng":
                return "#64B5F6";
            case "Đã hủy":
                return "red";
            default:
                return "#81C784";
        }
    }
    return (
        <>
            <div className="max-w-4xl mx-auto p-5">
                <h1 className="text-2xl font-bold text-center mb-5">
                    THÔNG TIN HÓA ĐƠN
                </h1>

                <div className="max-w-4xl border border-gray-300 rounded-lg shadow-md p-4">
                    <div>
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold mb-4">
                                Thông tin người mua
                            </h2>
                            <p className="mr-2">
                                Mã đơn hàng : {data.order_code}
                            </p>
                        </div>

                        <table className="w-full table-fixed border-collapse">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Tên người nhận
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {data.customer_name}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Tên người mua
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {data.customer.customer_name}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Số điện thoại
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {data.phone_number}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Email
                                    </td>
                                    <td
                                        className="border border-gray-300 p-2"
                                        style={{ wordWrap: "break-word" }}
                                    >
                                        {data.email}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Địa chỉ giao hàng
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {data.shipping_address}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Phương thức thanh toán
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {
                                            data.payment_method
                                                .payment_method_name
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Phí vận chuyển
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {Number(
                                            data.shipping_fee,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Trạng thái đơn hàng
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        <span
                                            style={{
                                                color: getColorStatus(
                                                    data.status,
                                                ),
                                            }}
                                        >
                                            {data.status}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Giảm giá
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {Number(
                                            data.discount_amount,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Trạng thái thanh toán
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        <span
                                            className={
                                                data.payment_status ===
                                                "Đã thanh toán"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }
                                        >
                                            {data.payment_status}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Ngày đặt
                                    </td>
                                    <td className="border border-gray-300 p-2 ">
                                        {data.created_at}
                                    </td>
                                    <td className="border border-gray-300 p-2 font-semibold bg-gray-50">
                                        Tổng tiền
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        {Number(
                                            data.total_amount,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </td>
                                </tr>
                                <tr>
                                    <th
                                        colSpan={4}
                                        className="border border-gray-300 p-2 text-right"
                                    >
                                        Thanh toán:{" "}
                                        {Number(
                                            data.final_amount,
                                        ).toLocaleString("vi-VN")}{" "}
                                        VND
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold mt-4 mb-4">
                            Thông tin sản phẩm
                        </h2>

                        <table className="w-full table-fixed border-collapse border border-gray-300">
                            <thead className="bg-gray-200 text-center">
                                <tr>
                                    <th className="border border-gray-300  w-[140px] font-semibold">
                                        Tên sản phẩm
                                    </th>
                                    <th className="border border-gray-300  w-[60px] font-semibold">
                                        Số lượng
                                    </th>
                                    <th className="border border-gray-300  w-[130px] font-semibold">
                                        Giá
                                    </th>
                                    <th className="border border-gray-300  w-[130px] font-semibold">
                                        Tổng cộng
                                    </th>
                                    <th className="border border-gray-300 w-[150px] font-semibold">
                                        Mô tả sản phẩm
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.order_items.map(
                                    (item: any, index: number) => (
                                        <tr
                                            key={item.id}
                                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} transition duration-200 hover:bg-gray-100`}
                                        >
                                            <td className="border border-gray-300 p-4">
                                                <div>{item.product_name}</div>
                                            </td>
                                            <td className="border border-gray-300 p-4 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="border border-gray-300 p-4 text-center">
                                                {Number(
                                                    item.price,
                                                ).toLocaleString("vi-VN")}{" "}
                                                VND
                                            </td>
                                            <td className="border border-gray-300 p-4 text-center">
                                                {Number(
                                                    item.total,
                                                ).toLocaleString("vi-VN")}{" "}
                                                VND
                                            </td>
                                            <td className="border border-gray-300 p-4">
                                                {item.variant
                                                    ? (() => {
                                                          try {
                                                              const parsedVariant =
                                                                  JSON.parse(
                                                                      item.variant,
                                                                  );
                                                              return Object.values(
                                                                  parsedVariant,
                                                              ).join(", ");
                                                          } catch (e) {
                                                              console.error(
                                                                  "Invalid JSON:",
                                                                  e,
                                                              );
                                                              return "";
                                                          }
                                                      })()
                                                    : ""}
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-2 justify-between mt-5 ">
                        <div className="text-center">
                            <h2 className="font-semibold">Người mua hàng</h2>
                            <p>(Ký , đóng dấu , ghi rõ họ tên)</p>
                        </div>
                        <div className="text-center justify-center">
                            <h2 className="font-semibold">Người bán hàng</h2>
                            <p>(Ký , đóng dấu , ghi rõ họ tên)</p>
                            <img
                                className="mx-auto"
                                src={conDau}
                                alt=""
                                width={120}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrintDetail;
