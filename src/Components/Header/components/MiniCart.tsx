import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { formatCurrencyVN } from "@/model/_base/Number";
import { CartItem } from "@/model/Cart";
import { CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Flex, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Badge, Drawer, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
type Props = {
    dataCart: any;
    refetch: any;
};
const MiniCart = ({ dataCart, refetch }: Props) => {
    if (!dataCart) {
        return <div>Không có sản phẩm nào trong giỏ hàng</div>;
    }
    // Xóa sản phẩm
    const handleDeleteProduct = async (ids: number) => {
        try {
            const response = await instance.delete(`/delete-cart?ids=${ids}`);
            if (response && response.status === 200) {
                refetch();
                message.success("Xóa sản phẩm thành công");
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi xóa sản phẩm");
        }
    };
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
                            <Flex direction={"row"} align={"center"}>
                                <p
                                    className="text-base"
                                    style={{
                                        fontSize: "16px",
                                    }}
                                >
                                    {product.quantity} ×{" "}
                                    {formatCurrencyVN(product.product.price)}
                                </p>
                                <p
                                    style={{
                                        color: "#333",
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        marginLeft: "10px",
                                    }}
                                >
                                    {product.product_variant.attribute_values
                                        .map((item: any) => item.name)
                                        .join(", ")}
                                </p>
                            </Flex>
                        </div>
                        <div>
                            <CloseCircleOutlined
                                style={{ fontSize: "24px", color: "red" }}
                                onClick={() => {
                                    handleDeleteProduct(product.id);
                                }}
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
    const fetchDataCart = async () => {
        try {
            const response = await instance.get("/cart");
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            NotificationExtension.Fails("Đã xảy ra lỗi khi lấy dữ liệu");
        }
    };
    const {
        data: dataCart,
        isLoading: isLoadingCart,
        refetch,
    } = useQuery<CartItem[]>({
        queryKey: ["cart"],
        queryFn: fetchDataCart,
    });

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

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
                <Skeleton visible={isLoadingCart} />
                <MiniCart dataCart={dataCart} refetch={refetch} />
            </Drawer>
        </>
    );
};

export default IconCart;
