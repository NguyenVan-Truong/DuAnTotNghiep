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
import { LoadingOverlay } from "@mantine/core";

const ProductDetail = () => {
    const location = useLocation();
    const [data, setData] = useState<TypeProductDetail>();
    const [isLiked, setIsLiked] = useState(false);
    const [dataComment, setDataComment] = useState<{}>();
    const [valueRating, setValueRating] = useState(0);
    const [dataCategory, setDataCategory] = useState();
    const [isLoading, setisLoading] = useState(false);
    const handleLike = () => {
        setIsLiked(!isLiked);
    };
    const fetchData = async () => {
        setisLoading(true);
        try {
            const response = await instance.get(
                `/products/chi-tiet-san-pham/${location.state.id}`,
            );
            if (response.status === 200) {
                setData(response.data);
                setDataCategory(response.data.catalogue_id.join(","));
            }
        } catch (error) {
            NotificationExtension.Fails("Đã xảy ra lỗi khi lấy dữ liệu");
        } finally {
            setisLoading(false);
        }
    };
    const fetchDataComment = async () => {
        let url = "";
        if (valueRating) {
            url += `?rating=${valueRating}`;
        }
        try {
            const response = await instance.get(
                `/products/${location.state.id}/reviews${url}`,
            );
            if (response && response.status === 200) {
                setDataComment(response.data);
            }
        } catch (error) {
            NotificationExtension.Fails(
                "Đã xảy ra lỗi khi lấy dữ liệu đánh giá",
            );
        }
    };
    useEffect(() => {
        Promise.all([fetchData(), fetchDataComment()]);
    }, [location.state.id]);
    useEffect(() => {
        fetchDataComment();
    }, [valueRating]);
    return (
        <>
            <div className="product-detail-main">
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
                <div
                    className="container"
                    style={{
                        position: "relative",
                    }}
                >
                    <LoadingOverlay
                        visible={isLoading}
                        zIndex={1000}
                        overlayProps={{ radius: "sm", blur: 2 }}
                    />
                    <div className="product-content padding">
                        <div className="imageMain">
                            <ProductImageSlider data={data} />
                            <div className="rightProductTop">
                                <RightProduct
                                    data={data}
                                    id={location.state.id}
                                />
                            </div>
                            <div className="mt-[30px]">
                                <DescriptionProduct data={data} />
                            </div>

                            <div>
                                {dataComment !== undefined && (
                                    <CommentProductDetail
                                        data={dataComment}
                                        setValueRating={setValueRating}
                                    />
                                )}
                            </div>
                        </div>
                        {/* Phần bên phải: Chi tiết sản phẩm */}
                        <div className="rightProductBottom">
                            <RightProduct data={data} id={location.state.id} />
                        </div>
                    </div>

                    <div className="padding">
                        <div className="product-title-1">
                            <p>Có Thể Bạn Cũng Thích</p>
                        </div>
                        <ListSimilarProducts
                            dataCategory={dataCategory}
                            productId={location.state.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
