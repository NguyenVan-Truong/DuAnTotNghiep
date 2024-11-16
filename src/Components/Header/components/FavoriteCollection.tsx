import {
    CloseCircleOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Drawer } from "antd";
import { useState } from "react";
import { sanpham1 } from "@/assets/img";
import instance from "@/configs/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Loader, Text } from "@mantine/core";
import { Favorites } from "@/model/Favorite";
import { min } from "lodash";

const fetchFavoritesData = async () => {
    const response = await instance.get("/favorites");
    return response.data;
};

const removeFavorite = async (productId: number) => {
    const response = await instance.post("/favorites/toggle", { product_id: productId });
    return response.data;
};

const MiniFavorite = () => {
    const queryClient = useQueryClient();
    // Sử dụng useQuery để lấy dữ liệu từ API
    const {
        data: products,
        isLoading,
        error,
    } = useQuery<Favorites[]>({
        queryKey: ["favoritesData"],
        queryFn: fetchFavoritesData,
    });

    const handleRemoveFavorite = async (productId: number) => {
        queryClient.setQueryData(['favoritesData'], (oldData: Favorites[] | undefined) => {
            const newData = oldData?.filter(favorite => favorite.product.id !== productId);
            return newData;
        }); try {
            const response = await removeFavorite(productId);

            console.log("Xóa thành công sản phẩm yêu thích", response);
        } catch (error) {
            console.error("Có lỗi khi xóa sản phẩm yêu thích", error);

            // Hoàn tác lại thay đổi trong cache nếu có lỗi từ API
            queryClient.setQueryData(['favoritesData'], (oldData: Favorites[] | undefined) => {
                const currentData = oldData ?? [];
                return [...currentData, { product: { id: productId } }];
            });
        }
    };

    // Kiểm tra trạng thái tải dữ liệu
    if (isLoading) return <Loader />;
    if (error) return <div>Lỗi khi tải dữ liệu yêu thích</div>;

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="text-center h-[10%]">
                <h3 className="font-bold mb-5 text-2xl pb-2 border-b-4 border-b-gray-400 inline-block">
                    Sưu tập yêu thích
                </h3>
            </div>
            <div className="max-h-[80%] overflow-auto custom-scrollbar">
                {products && products.length > 0 ? (
                    products.map((favorite, index) => (
                        <div
                            key={index}
                            className="flex space-x-4 mb-2 items-center"
                        >
                            <div>
                                <img
                                    src={favorite.product.image_url}
                                    alt={favorite.product.name}
                                    width={100}
                                    height={10}
                                    style={{ minWidth: 100 }}
                                />
                            </div>
                            <div className="flex-1">
                                <h1 className="font-medium text-lg">
                                    <Box w={290}>
                                        <Text truncate="end" size="lg">
                                            {favorite.product.name}
                                        </Text>
                                    </Box>
                                </h1>
                                <p className="text-base">
                                    {favorite.product.price}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <CloseCircleOutlined
                                    onClick={() => handleRemoveFavorite(favorite.product.id)}
                                    style={{ fontSize: "24px", color: "red" }}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm yêu thích nào !</p>
                )}
            </div>

            <div className="border-t border-t-gray-300 p-3 h-[10%] flex flex-col justify-between">
                {/* <div className="flex justify-between">
                    <h1>Thành tiền :</h1>
                    <h3>37,451,000₫</h3>
                </div> */}
                <div className="mt-5">
                    <button className="w-full bg-black text-white p-2 rounded-md mb-3">
                        Xem yêu thích
                    </button>
                    {/* <button className="w-full hover:bg-gray-300 border border-collapse p-2 rounded-md">
                        Thanh Toán
                    </button> */}
                </div>
            </div>
        </div>
    );
};

const Favorite = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const { data: products } = useQuery<Favorites[]>({
        queryKey: ["favoritesData"],
        queryFn: fetchFavoritesData,
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
                <Badge count={products?.length || 0} className="relative">
                    <HeartOutlined
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
                <MiniFavorite />
            </Drawer>
        </>
    );
};

export default Favorite;
