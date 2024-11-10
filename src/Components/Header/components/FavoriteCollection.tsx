import {
    CloseCircleOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Drawer } from "antd";
import { useState } from "react";
import { sanpham1 } from "@/assets/img";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import { Favorites } from "@/model/Favorite";

const fetchFavoritesData = async () => {
    const response = await instance.get('/api/favorites', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Lấy token từ localStorage
        },
    });
    return response.data;
};

const MiniFavorite = () => {

    // Sử dụng useQuery để lấy dữ liệu từ API
    const { data: products, isLoading, error } = useQuery<Favorites[]>({
        queryKey: ['favoritesData'],
        queryFn: fetchFavoritesData,
    });

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
                    products.map((product: Favorites, index: number) => (
                        <div key={index} className="flex space-x-4 mb-2">
                            <div>
                                <img src={product.image || '/default-image.jpg'} alt={product.name} width={100} />
                            </div>
                            <div>
                                <h1 className="font-medium text-lg">{product.name}</h1>
                                <p className="text-base">{product.quantity} × {product.price}</p>
                            </div>
                            <div>
                                <CloseCircleOutlined style={{ fontSize: '24px', color: 'red' }} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm yêu thích nào.</p>
                )}
            </div>
            <div className="border-t border-t-gray-300 p-3 h-[20%] flex flex-col justify-between">
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

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    return (
        <>
            <div className="items-center space-x-4">
                <Badge count={1} className="relative">
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
