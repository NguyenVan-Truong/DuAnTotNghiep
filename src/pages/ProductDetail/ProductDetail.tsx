import { useState } from "react";
import { Link } from "react-router-dom";
import CommentProductDetail from "./Component/Comment/Comment";
import DescriptionProduct from "./Component/Description/Description";
import ListSimilarProducts from "./Component/ListSimilarProducts/ListSimilarProducts";
import ProductImageSlider from "./Component/ProductImageSlider/ProductImageSlider";
import RightProduct from "./Component/RightProduct/RightProduct";
import "./ProductDetail.scss";
const ChiTietSP = () => {
    const [isLiked, setIsLiked] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked);
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
                                <RightProduct />
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
                            <RightProduct />
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

export default ChiTietSP;
