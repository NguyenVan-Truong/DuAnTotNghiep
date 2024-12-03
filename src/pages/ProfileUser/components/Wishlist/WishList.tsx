import { Box, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Favorites } from "@/model/Favorite";
import instance from "@/configs/axios";
import { formatCurrencyVN } from "@/model/_base/Number";
import { message, Popconfirm } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const WishList = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Favorites[]>([]);
    useEffect(() => {
        (async () => {
            const response = await instance.get("/favorites");
            console.log("response", response);
            setData(response.data);
        })();
    }, []);
    const handleRemoveFavorite = async (productId: number) => {
        try {
            await instance.delete(`/favorites/${productId}`);
            message.success("Xóa sản phẩm yêu thích thành công");
            setData(data.filter((item) => item.id !== productId));
        } catch (error) {
            message.error("Có lỗi khi xóa sản phẩm yêu thích");
        }
    };
    const onhandleTurnPage = (id: number, slug: string) => {
        navigate(`/chi-tiet-san-pham/${slug}`, { state: { id: id } });
    };
    console.log("data", data);
    return (
        <div className="p-6 bg-white rounded-lg shadow-md h-[612px]">
            <Text size="xl" mb="xl" className="font-semibold text-gray-800">
                Sản phẩm yêu thích
            </Text>
            <hr className="mb-4" />
            {data && data.length > 0 ? (
                data.map((favorite: any, index: any) => (
                    <div
                        key={index}
                        className="flex space-x-4 mb-4 items-center border-b pb-4"
                    >
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                if (
                                    !favorite?.product?.id ||
                                    !favorite?.product?.slug
                                ) {
                                    message.error("Sản phẩm đã ngừng bán");
                                } else {
                                    onhandleTurnPage(
                                        favorite.product.id,
                                        favorite.product.slug,
                                    );
                                }
                            }}
                        >
                            <div className="flex-shrink-0">
                                <img
                                    src={favorite.product.image_url}
                                    alt={favorite.product.name}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-1 ml-4">
                                <h1 className="font-medium text-lg text-gray-900">
                                    <Box w={290}>
                                        <Text truncate="end" size="lg">
                                            {favorite.product.name}
                                        </Text>
                                    </Box>
                                </h1>
                                <p className="text-base text-gray-600">
                                    {formatCurrencyVN(favorite.product.price)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Popconfirm
                                title="Bạn có chắc xóa sản phẩm này ?"
                                placement="leftTop"
                                onConfirm={() =>
                                    handleRemoveFavorite(favorite.product.id)
                                }
                                okText="Đồng ý"
                                cancelText="Không"
                            >
                                <CloseCircleOutlined
                                    className="text-red-500 hover:text-red-700 transition duration-150"
                                    style={{
                                        fontSize: "24px",
                                    }}
                                />
                            </Popconfirm>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">
                    Không có sản phẩm yêu thích nào!
                </p>
            )}
        </div>
    );
};

export default WishList;
