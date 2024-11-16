import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { formatCurrencyVN } from "@/model/_base/Number";
import { CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Skeleton } from "@mantine/core";
import { Badge, Drawer } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
type Props = {
    dataCart: any;
};
const MiniCart = ({ dataCart }: Props) => {
    const [totalPrice, setTotalPrice] = useState(0);
    return (
        <div className="flex flex-col justify-between h-full">
            <div className="text-center h-[10%]">
                <h3 className="font-bold mb-5 text-2xl pb-2 border-b-4 border-b-gray-400 inline-block">
                    Giỏ Hàng
                </h3>
            </div>
            <div className="max-h-[80%] overflow-auto custom-scrollbar">
                {dataCart?.map((product: any, index: number) => (
                    <div key={index} className="flex space-x-4 mb-2">
                        <div>
                            <img
                                src={product.product.image_url}
                                alt=""
                                width={100}
                                style={{
                                    maxHeight: "70px",
                                    objectFit: "cover",
                                }}
                            />
                        </div>
                        <div>
                            <h1 className="font-medium text-lg">
                                {product.product.name}
                            </h1>
                            <p className="text-base">
                                {product.quantity} ×{" "}
                                {formatCurrencyVN(product.product.price)}
                            </p>
                        </div>
                        <div>
                            <CloseCircleOutlined
                                style={{ fontSize: "24px", color: "red" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t border-t-gray-300 p-3 h-[20%] flex flex-col justify-between">
                <div className="flex justify-between">
                    <h1>Thành tiền :</h1>
                    <h3>37,451,000₫</h3>
                </div>
                <div className="mt-5">
                    <Link to="/gio-hang">
                        <button className="w-full bg-black text-white p-2 rounded-md mb-3">
                            Xem Giỏ Hàng
                        </button>
                    </Link>
                    <button className="w-full hover:bg-gray-300 border border-collapse p-2 rounded-md">
                        Thanh Toán
                    </button>
                </div>
            </div>
        </div>
    );
};

const IconCart = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [dataCart, setDataCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await instance.get("/cart");
            if (response && response.status === 200) {
                setDataCart(response.data.data);
            }
        } catch (error) {
            NotificationExtension.Fails("Đã xảy ra lỗi khi lấy dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, [setDrawerVisible]);
    return (
        <>
            <div className="items-center space-x-4">
                <Badge count={dataCart?.length} className="relative">
                    <ShoppingCartOutlined
                        className="text-xl cursor-pointer"
                        onClick={showDrawer}
                    />
                </Badge>
            </div>
            <Drawer
                placement="right"
                closable={true}
                onClose={onClose}
                open={drawerVisible}
                width={500}
            >
                <Skeleton visible={isLoading} />
                <MiniCart dataCart={dataCart} />
            </Drawer>
        </>
    );
};

export default IconCart;
