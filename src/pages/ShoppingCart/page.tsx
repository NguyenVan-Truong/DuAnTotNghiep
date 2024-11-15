import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { formatCurrencyVN } from "@/model/_base/Number";
import { CartItem } from "@/model/Cart";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import Style from "./ShoppingCart.module.scss";
const ShoppingCart = () => {
    const [data, setData] = useState<any>([]);
    const [selectedOption, setSelectedOption] = useState<string>(
        "Liên hệ phí vận chuyển sau",
    ); // Trạng thái cho lựa chọn

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value); // Cập nhật trạng thái khi thay đổi radio button
    };
    const fetchData = async () => {
        try {
            const response = await instance.get("/cart");
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            NotificationExtension.Fails("Đã xảy ra lỗi khi lấy dữ liệu");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Tăng số lượng
    const onhandleIncrease = async (id: number) => {
        if (data) {
            const newData = data.map((item: CartItem) => {
                if (item.id === id) {
                    const newQuantity = item.quantity + 1;
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }
                return item;
            });
            setData(newData);
        }
    };

    // Giảm số lượng
    const onhandleReduce = async (id: number) => {
        if (data) {
            const newData = data.map((item: CartItem) => {
                if (item.id === id && item.quantity > 1) {
                    const newQuantity = item.quantity - 1;
                    return {
                        ...item,
                        quantity: newQuantity,
                    };
                }
                return item;
            });
            setData(newData);
        }
    };
    // Tính tổng đơn hàng
    const calculateTotal = () => {
        return data.reduce((acc: number, item: CartItem) => {
            return acc + Number(item.price) * item.quantity;
        }, 0);
    };

    console.log("data", data);
    return (
        <div className="container mx-auto padding">
            <h1 className={Style.Title}>
                Giỏ Hàng
                <span className={Style.Total_count}>{data.length}</span>
            </h1>
            <div className={Style.Main}>
                <div className={Style.Left}>
                    {data?.map((item: CartItem) => {
                        return (
                            <div className="flex border-b-2 border-b-gray-200">
                                <div className="w-[150px] md:w-[200px]">
                                    {/* <Image src={ban_an_6_cho2} /> */}
                                    <img
                                        src={item.product.image_url}
                                        alt=""
                                        style={{
                                            padding: "10px",
                                        }}
                                    />
                                </div>
                                <div className={Style.Content}>
                                    <div className={Style.Content_Title}>
                                        <h1
                                            style={{
                                                fontSize: "18px",
                                                fontWeight: "500",
                                                marginTop: "5px",
                                            }}
                                        >
                                            {item.product.name}
                                        </h1>
                                        <MdClose
                                            className={
                                                Style.Content_Title_Close
                                            }
                                        />
                                    </div>

                                    <span className={Style.Content_Price}>
                                        {formatCurrencyVN(item.price)}
                                    </span>
                                    <div className={Style.Content_Button}>
                                        <div
                                            className={
                                                Style.Content_Button_Quantity
                                            }
                                        >
                                            <button
                                                className={Style.Button}
                                                onClick={() =>
                                                    onhandleReduce(item.id)
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
                                                    onhandleIncrease(item.id)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                {calculateTotal()}
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
                                23,822,100
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
