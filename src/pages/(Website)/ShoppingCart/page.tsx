import { Button, Image } from "@mantine/core";
import Style from "./ShoppingCart.module.scss";
import { ban_an_6_cho2 } from "@/assets/img";
import { MdClose, MdFavorite } from "react-icons/md";
import { useState } from "react";

const ShoppingCart = () => {
    const [quantity, setQuantity] = useState<number | null>(1);
    const increment = () => {
        setQuantity((prevQuantity) =>
            prevQuantity !== null ? prevQuantity + 1 : 1,
        );
    };
    const decrement = () => {
        setQuantity((prevQuantity) =>
            prevQuantity !== null && prevQuantity > 1 ? prevQuantity - 1 : 1,
        );
    };
    return (
        <div className="container mx-auto">
            <h1 className={Style.Title}>
                Giỏ Hàng
                <span className={Style.Total_count}>1</span>
            </h1>
            <div className={Style.Main}>
                <div className={Style.Left}>
                    <div className="flex">
                        <div className="w-[200px]">
                            <Image src={ban_an_6_cho2} />
                        </div>
                        <div className={Style.Content}>
                            <div className={Style.Content_Title}>
                                <h1>Sofa 3 chỗ Orientale da beige R5</h1>
                                <MdClose
                                    className={Style.Content_Title_Close}
                                />
                            </div>
                            <span className={Style.material}>
                                <span>pa_vat-lieu:</span>
                                <span> 3795</span>
                            </span>
                            <span className={Style.material}>
                                <span>pa_kich-thuoc:</span>
                                <span> 3796</span>
                            </span>
                            <span className={Style.Content_Price}>
                                23,822,100₫
                            </span>
                            <div className={Style.Content_Button}>
                                <span className={Style.Content_Button_Favorite}>
                                    <MdFavorite />
                                    <span>Thêm vào yêu thích</span>
                                </span>
                                <div className={Style.Content_Button_Quantity}>
                                    <button
                                        onClick={decrement}
                                        className={Style.Button}
                                    >
                                        -
                                    </button>

                                    <input
                                        type="number"
                                        value={
                                            quantity !== null ? quantity : ""
                                        }
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === "") {
                                                setQuantity(null); // Đặt quantity thành null khi xóa hết
                                            } else {
                                                const numValue = Number(value);
                                                if (numValue >= 1) {
                                                    setQuantity(numValue);
                                                }
                                            }
                                        }}
                                        className={Style.quantity}
                                        min="1"
                                    />

                                    <button
                                        onClick={increment}
                                        className={Style.Button}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button>Cập Nhật Giỏ Hàng</Button>
                </div>
                <div className={Style.Right}>formm123</div>
            </div>
        </div>
    );
};

export default ShoppingCart;
