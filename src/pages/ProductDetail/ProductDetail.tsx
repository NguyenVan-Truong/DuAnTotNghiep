import { useState } from "react";
import { Link } from "react-router-dom";
import CommentProductDetail from "./Component/Comment/Comment";
import DescriptionProduct from "./Component/Description/Description";
import ListSimilarProducts from "./Component/ListSimilarProducts/ListSimilarProducts";
import ProductImageSlider from "./Component/ProductImageSlider/ProductImageSlider";
import RightProduct from "./Component/RightProduct/RightProduct";
import "./ProductDetail.scss";
import { NotificationExtension } from "@/extension/NotificationExtension";

const fakeData = {
    id: 15,
    catalogue_id: null,
    brand_id: 4,
    name: "Bàn Ăn Gỗ Tự Nhiên 6 Ghế",
    slug: "ban-an-go-tu-nhien-6-ghe",
    sku: "DINING0012",
    price: "50000.00",
    stock: 2,
    discount_price: "48000.00",
    detailed_description:
        "<p>Bàn ăn gỗ tự nhiên với 6 ghế, phù hợp cho gia đình.</p>",
    image_url: "http://127.0.0.1:8000/images/Ban_an_6_cho2.jpg",
    variants: [
        {
            id: 32,
            price: "50000.00",
            discount_price: "0.00",
            discount_percentage: null,
            stock: 0,
            weight: "0.00",
            sku: "001",
            image_url: "",
            ratings_avg: null,
            ratings_count: null,
            is_active: null,
            is_featured: null,
            created_at: "2024-10-30T14:27:18.000000Z",
            updated_at: "2024-10-30T14:27:18.000000Z",
            attributes: [
                {
                    id: 47,
                    attribute_value_id: 1,
                    product_variant_id: 32,
                    attribute_value: {
                        id: 1,
                        name: "Gỗ Sồi",
                        attribute_id: 1,
                        attributes: {
                            id: 1,
                            name: "Chất Liệu",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
                {
                    id: 48,
                    attribute_value_id: 3,
                    product_variant_id: 32,
                    attribute_value: {
                        id: 3,
                        name: "Màu Đen",
                        attribute_id: 2,
                        attributes: {
                            id: 2,
                            name: "Màu Sắc",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
            ],
        },
        {
            id: 33,
            price: "50000.00",
            discount_price: "0.00",
            discount_percentage: null,
            stock: 0,
            weight: "0.00",
            sku: "002",
            image_url: "",
            ratings_avg: null,
            ratings_count: null,
            is_active: null,
            is_featured: null,
            created_at: "2024-10-30T14:27:18.000000Z",
            updated_at: "2024-10-30T14:27:18.000000Z",
            attributes: [
                {
                    id: 49,
                    attribute_value_id: 1,
                    product_variant_id: 33,
                    attribute_value: {
                        id: 1,
                        name: "Gỗ Sồi",
                        attribute_id: 1,
                        attributes: {
                            id: 1,
                            name: "Chất Liệu",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
                {
                    id: 50,
                    attribute_value_id: 4,
                    product_variant_id: 33,
                    attribute_value: {
                        id: 4,
                        name: "Màu Xám",
                        attribute_id: 2,
                        attributes: {
                            id: 2,
                            name: "Màu Sắc",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
            ],
        },
        {
            id: 34,
            price: "80000.00",
            discount_price: "0.00",
            discount_percentage: null,
            stock: 0,
            weight: "0.00",
            sku: "003",
            image_url: "",
            ratings_avg: null,
            ratings_count: null,
            is_active: null,
            is_featured: null,
            created_at: "2024-10-30T14:27:18.000000Z",
            updated_at: "2024-10-30T14:27:18.000000Z",
            attributes: [
                {
                    id: 51,
                    attribute_value_id: 1,
                    product_variant_id: 34,
                    attribute_value: {
                        id: 1,
                        name: "Gỗ Bình thường",
                        attribute_id: 1,
                        attributes: {
                            id: 1,
                            name: "Chất Liệu",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
                {
                    id: 52,
                    attribute_value_id: 3,
                    product_variant_id: 34,
                    attribute_value: {
                        id: 3,
                        name: "Màu Đen",
                        attribute_id: 2,
                        attributes: {
                            id: 2,
                            name: "Màu Sắc",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
            ],
        },
        {
            id: 35,
            price: "980000.00",
            discount_price: "0.00",
            discount_percentage: null,
            stock: 0,
            weight: "0.00",
            sku: "004",
            image_url: "",
            ratings_avg: null,
            ratings_count: null,
            is_active: null,
            is_featured: null,
            created_at: "2024-10-30T14:27:18.000000Z",
            updated_at: "2024-10-30T14:27:18.000000Z",
            attributes: [
                {
                    id: 53,
                    attribute_value_id: 1,
                    product_variant_id: 35,
                    attribute_value: {
                        id: 1,
                        name: "Gỗ Bình thường",
                        attribute_id: 1,
                        attributes: {
                            id: 1,
                            name: "Chất Liệu",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
                {
                    id: 54,
                    attribute_value_id: 4,
                    product_variant_id: 35,
                    attribute_value: {
                        id: 4,
                        name: "Màu Đỏ",
                        attribute_id: 2,
                        attributes: {
                            id: 2,
                            name: "Màu Sắc",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
            ],
        },
        {
            id: 35,
            price: "980000.00",
            discount_price: "0.00",
            discount_percentage: null,
            stock: 0,
            weight: "0.00",
            sku: "004",
            image_url: "",
            ratings_avg: null,
            ratings_count: null,
            is_active: null,
            is_featured: null,
            created_at: "2024-10-30T14:27:18.000000Z",
            updated_at: "2024-10-30T14:27:18.000000Z",
            attributes: [
                {
                    id: 53,
                    attribute_value_id: 1,
                    product_variant_id: 35,
                    attribute_value: {
                        id: 1,
                        name: "Gỗ Bình thường",
                        attribute_id: 1,
                        attributes: {
                            id: 1,
                            name: "Chất Liệu",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
                {
                    id: 54,
                    attribute_value_id: 4,
                    product_variant_id: 35,
                    attribute_value: {
                        id: 4,
                        name: "Màu Đỏ",
                        attribute_id: 2,
                        attributes: {
                            id: 2,
                            name: "Màu Tím",
                            created_at: "2024-10-28T11:10:49.000000Z",
                            updated_at: "2024-10-28T11:10:49.000000Z",
                        },
                    },
                },
            ],
        },
    ],
    geleries: [
        {
            image_url: "http://127.0.0.1:8000/images/Ban_an_6_cho1.jpg",
        },
        {
            image_url: "http://127.0.0.1:8000/images/Ban_an_6_cho2.jpg",
        },
        {
            image_url: "http://127.0.0.1:8000/images/bannerFooter5.jpg",
        },
        {
            image_url:
                "http://127.0.0.1:8000/images/ImageM%E1%BB%9Bi/banner_gioi_thieu.jpg",
        },
        {
            image_url:
                "http://127.0.0.1:8000/images/ImageM%E1%BB%9Bi/banner.jpeg",
        },
        {
            image_url:
                "http://127.0.0.1:8000/images/ImageM%E1%BB%9Bi/banner.jpg",
        },
        {
            image_url:
                "http://127.0.0.1:8000/images/ImageM%E1%BB%9Bi/banner1234.jpg",
        },
    ],
    created_at: "2024-10-28T11:12:08.000000Z",
    updated_at: "2024-10-30T14:27:18.000000Z",
};
const ProductDetail = () => {
    const [isLiked, setIsLiked] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked);
    };
    const fetchData = async () => {
        try {
        } catch (error) {
            NotificationExtension.Fails("Đã xảy ra lỗi khi lấy dữ liệu");
        }
    };
    return (
        <>
            <div className="product-detail-main ">
                <div className="Breadcrumbs">
                    <div className="container padding">
                        <div className="menu">
                            <Link to="#">Trang Chủ</Link> /{" "}
                            <Link to="#">
                                <span className="">Phòng Khách</span>
                            </Link>{" "}
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="product-content padding">
                        <div className="imageMain">
                            <ProductImageSlider />
                            <div className="rightProductTop">
                                <RightProduct data={fakeData} />
                            </div>
                            <div className="mt-[30px]">
                                <DescriptionProduct />
                            </div>

                            <div>
                                <CommentProductDetail />
                            </div>
                        </div>
                        {/* Phần bên phải: Chi tiết sản phẩm */}
                        <div className="rightProductBottom">
                            <RightProduct data={fakeData} />
                        </div>
                    </div>

                    <div className="padding">
                        <div className="product-title-1">
                            <p>Có Thể Bạn Cũng Thích</p>
                        </div>
                        <ListSimilarProducts />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
