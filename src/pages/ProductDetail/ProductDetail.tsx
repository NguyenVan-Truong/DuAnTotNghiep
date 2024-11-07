import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CommentProductDetail from "./Component/Comment/Comment";
import DescriptionProduct from "./Component/Description/Description";
import ListSimilarProducts from "./Component/ListSimilarProducts/ListSimilarProducts";
import ProductImageSlider from "./Component/ProductImageSlider/ProductImageSlider";
import RightProduct from "./Component/RightProduct/RightProduct";
import "./ProductDetail.scss";

const ProductDetail = () => {
    const location = useLocation();

    const [data, setData] = useState<TypeProductDetail>();
    const [isLiked, setIsLiked] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked);
    };
    const fetchData = async () => {
        try {
            const response = await instance.get(
                `/products/${location.state.id}`,
            );
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            NotificationExtension.Fails("Đã xảy ra lỗi khi lấy dữ liệu");
        }
    };
    useEffect(() => {
        fetchData();
    }, [location.state.id]);
    return (
        <>
            <div className="product-detail-main ">
                <div className="Breadcrumbs">
                    <div className="container padding">
                        <div className="menu">
                            <Link to="#">Trang Chủ</Link> /
                            <Link to="#">
                                <span className="">Phòng Khách</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="product-content padding">
                        <div className="imageMain">
                            <ProductImageSlider data={data} />
                            <div className="rightProductTop">
                                <RightProduct data={data} />
                            </div>
                            <div className="mt-[30px]">
                                <DescriptionProduct data={data} />
                            </div>

                            <div>
                                <CommentProductDetail />
                            </div>
                        </div>
                        {/* Phần bên phải: Chi tiết sản phẩm */}
                        <div className="rightProductBottom">
                            <RightProduct data={data} />
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
