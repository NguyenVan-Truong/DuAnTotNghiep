import { CloseCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Drawer } from "antd";
import { useState } from "react";
import "../Header.scss";
import { sanpham1 } from "@/assets/img";

const MiniCart = () => {
    const products = Array(10).fill({
        name: "Sofa 3 chỗ Orientale da beige R5",
        price: "115,387,500₫",
        quantity: 2,
        image: sanpham1,
    });

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="text-center h-[10%]">
                <h3 className="font-bold mb-5 text-2xl pb-2 border-b-4 border-b-gray-400 inline-block">
                    Giỏ Hàng
                </h3>
            </div>
            <div className="max-h-[80%] overflow-auto custom-scrollbar">
                {products.map((product, index) => (
                    <div key={index} className="flex space-x-4 mb-2">
                        <div>
                            <img src={product.image} alt="" width={100} />
                        </div>
                        <div>
                            <h1 className="font-medium text-lg">
                                {product.name}
                            </h1>
                            <p className="text-base">
                                {product.quantity} × {product.price}
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
                    <button className="w-full bg-black text-white p-2 rounded-md mb-3">
                        Xem Giỏ Hàng
                    </button>
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
                <MiniCart />
            </Drawer>
        </>
    );
};

export default IconCart;
