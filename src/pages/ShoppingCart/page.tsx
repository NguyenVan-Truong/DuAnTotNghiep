import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { formatCurrencyVN } from "@/model/_base/Number";
import { CartItem } from "@/model/Cart";
import { Button, Checkbox, Flex, LoadingOverlay } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Style from "./ShoppingCart.module.scss";
const ShoppingCart = () => {
    const [data, setData] = useState<any>([]);
    const [selectedOption, setSelectedOption] = useState<string>(
        "Liên hệ phí vận chuyển sau",
    ); // Trạng thái cho lựa chọn
    const [isLoading, setisLoading] = useState(false);
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value); // Cập nhật trạng thái khi thay đổi radio button
    };
    const fetchData = async () => {
        setisLoading(true);
        try {
            const response = await instance.get("/cart");
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            NotificationExtension.Fails("Đã xảy ra lỗi khi lấy dữ liệu");
        } finally {
            setisLoading(false);
        }
    };

    // // Tính tổng đơn hàng
    // const calculateTotal = () => {
    //     return data.reduce((acc: number, item: CartItem) => {
    //         return acc + Number(item.price) * item.quantity;
    //     }, 0);
    // };
    // Cập nhật số lượng
    const onhandleUpdateQuantity = async (id: number, type: string) => {
        console.log("id", id);
        console.log("type", type);
        try {
            // const response = await instance.put(`/cart/${id}`, {
            //     quantity: quantity,
            // });
        } catch (error) {
            NotificationExtension.Fails("Đã xảy ra lỗi khi cập nhật dữ liệu");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log("data", data);

    return (
        <div
            className="container mx-auto padding"
            style={{
                marginTop: "10px",
                marginBottom: "30px",
            }}
        >
            <div className={Style.Main}>
                <LoadingOverlay
                    visible={isLoading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />

                <div className={Style.Left}>
                    <Flex direction="row" justify={"space-between"}>
                        <h1 className={Style.Title}>
                            Giỏ Hàng
                            <span className={Style.Total_count}>
                                {data.length}
                            </span>
                        </h1>
                        <Button variant="filled" color="red" disabled>
                            Xóa{" "}
                        </Button>
                    </Flex>
                    {data?.map((item: CartItem) => {
                        return (
                            <Flex
                                direction={"row"}
                                justify={"space-between"}
                                className="border-b-2 border-b-gray-200"
                            >
                                <div
                                    className="flex "
                                    style={{
                                        alignItems: "start",
                                    }}
                                >
                                    <div
                                        style={{
                                            marginTop: "35px",
                                        }}
                                    >
                                        <Checkbox
                                            defaultChecked
                                            style={{
                                                marginTop: "10px",
                                            }}
                                        />
                                    </div>
                                    <div className="">
                                        <img
                                            src={item.product.image_url}
                                            alt=""
                                            style={{
                                                padding: "10px",
                                                maxHeight: "110px",
                                                minHeight: "110px",
                                                minWidth: "130px",
                                                maxWidth: "130px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <div className={Style.Content}>
                                        <div className={Style.Content_Title}>
                                            <h4
                                                style={{
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                    marginTop: "5px",
                                                }}
                                            >
                                                {item.product.name}
                                            </h4>
                                        </div>

                                        <Flex
                                            direction="row"
                                            style={{
                                                margin: "5px 0",
                                            }}
                                            align={"center"}
                                        >
                                            <span
                                                className={Style.Content_Price}
                                            >
                                                {formatCurrencyVN(
                                                    item.product_variant
                                                        .discount_price,
                                                )}
                                            </span>
                                            <p
                                                style={{
                                                    color: "#333",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    marginLeft: "10px",
                                                    marginTop: "-5px",
                                                }}
                                            >
                                                Thuộc tính
                                            </p>
                                        </Flex>

                                        <div className={Style.Content_Button}>
                                            <div
                                                className={
                                                    Style.Content_Button_Quantity
                                                }
                                            >
                                                <button
                                                    className={Style.Button}
                                                    onClick={() =>
                                                        onhandleUpdateQuantity(
                                                            item.id,
                                                            "decrease",
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    className={Style.quantity}
                                                    min="1"
                                                    disabled
                                                />

                                                <button
                                                    className={Style.Button}
                                                    onClick={() =>
                                                        onhandleUpdateQuantity(
                                                            item.id,
                                                            "increase",
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column-reverse",
                                    }}
                                >
                                    {/* tổng tiền của 1 sản phẩm */}
                                    <p
                                        style={{
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {formatCurrencyVN(
                                            String(
                                                Number(
                                                    item.product_variant
                                                        .discount_price,
                                                ) * Number(item.quantity),
                                            ),
                                        )}
                                    </p>
                                </div>
                            </Flex>
                        );
                    })}
                </div>
                <div className={Style.Right}>
                    <div className={Style.Right_Container}>
                        <div className="mb-10">
                            <span className={Style.Right_Title}>
                                Tóm tắt đơn hàng
                            </span>
                        </div>
                        <div className={Style.Right_Price}>
                            <span className={Style.Right_Price_Title}>
                                Thành tiền
                            </span>
                            <span className={Style.Right_Price_Value}>
                                {/* {calculateTotal()} */}
                                <span className={Style.Right_Price_Value_Unit}>
                                    ₫
                                </span>
                            </span>
                        </div>
                        <div className="mt-2 mb-4">
                            <span className="text-[.9em] font-normal tracking-normal">
                                Vận chuyển
                            </span>
                        </div>
                        <form className="px-2 mb-2">
                            <label className="flex items-center space-x-2 mb-1">
                                <input
                                    type="radio"
                                    name="option"
                                    value="Liên hệ phí vận chuyển sau"
                                    checked={
                                        selectedOption ===
                                        "Liên hệ phí vận chuyển sau"
                                    }
                                    onChange={handleOptionChange}
                                />
                                <span>Liên hệ phí vận chuyển sau</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="option"
                                    value="Phí vận chuyển"
                                    checked={
                                        selectedOption === "Phí vận chuyển"
                                    }
                                    onChange={handleOptionChange}
                                />
                                <span>Phí vận chuyển</span>
                            </label>
                        </form>
                        <div>
                            <span className="text-[.9em] font-normal tracking-normal">
                                Tùy chọn vận chuyển sẽ được cập nhật trong quá
                                trình thanh toán.
                            </span>
                        </div>
                        <form className="mt-8 mb-5   flex space-x-3">
                            <input
                                type="text"
                                placeholder="Mã giảm giá"
                                className="w-[70%] p-2 border border-gray-300 rounded"
                            />
                            <button
                                type="submit"
                                className="w-[30%] bg-[#000000] text-white p-2 rounded"
                            >
                                Sử Dụng
                            </button>
                        </form>

                        <div className={Style.Right_Price}>
                            <span className={Style.Right_Price_Title}>
                                Tổng cộng
                            </span>
                            <span className={Style.Right_Price_Value}>
                                <span className={Style.Right_Price_Value_Unit}>
                                    ₫
                                </span>
                            </span>
                        </div>
                        <h4 className="mt-5 font-semibold not-italic mb-2">
                            Thông tin giao hàng
                        </h4>
                        <p className="mb-2">
                            Đối với những sản phẩm có sẵn tại khu vực, Nhà Xinh
                            sẽ giao hàng trong vòng 2-7 ngày. Đối với những sản
                            phẩm không có sẵn, thời gian giao hàng sẽ được nhân
                            viên Nhà Xinh thông báo đến quý khách
                        </p>
                        <p className="mb-2">Từ 2-6: 8:30 - 17:30</p>
                        <p className="mb-2">Thứ 7, CN: 9:30 - 16:30</p>
                        <div className="flex justify-between mt-5 space-x-5">
                            <button className="flex-1 flex items-center justify-center border border-black text-black px-4 py-2 lg:px-2 lg:py-1 lg:text-sm">
                                <BiArrowBack className="mr-2" />
                                Tiếp tục mua hàng
                            </button>
                            <button className="flex-1 bg-[#000000] text-white lg:px-4 lg:py-3 rounded px-2 py-1 lg:text-sm">
                                Đặt Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
