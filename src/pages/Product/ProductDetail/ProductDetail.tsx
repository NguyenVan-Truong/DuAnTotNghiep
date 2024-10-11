import { sanpham1 } from "@/assets/img";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import CommentProductDetail from "./Component/Comment/Comment";
import DescriptionProduct from "./Component/Description/Description";
import ListSimilarProducts from "./Component/ListSimilarProducts/ListSimilarProducts";
import RightProduct from "./Component/RightProduct/RightProduct";
import "./ProductDetail.scss";
const ChiTietSP = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [nav1, setNav1] = useState<Slider | null>(null);
    const [nav2, setNav2] = useState<Slider | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderRef1 = useRef<Slider | null>(null);
    const sliderRef2 = useRef<Slider | null>(null);

    useEffect(() => {
        if (sliderRef1.current && sliderRef2.current) {
            setNav1(sliderRef1.current);
            setNav2(sliderRef2.current);
        }
    }, []);
    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <>
            <div className="product-detail-main ">
                <div className="Breadcrumbs">
                    <div className="container">
                        <div className="menu">
                            <a href="#">Trang Chủ</a> /{" "}
                            <a href="#">Phòng Khách</a> / <a href="#">Sofa</a>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="product-content padding">
                        <div className="imageMain">
                            <div className="slider-container">
                                <Image.PreviewGroup>
                                    <Slider
                                        asNavFor={nav2!}
                                        ref={sliderRef1}
                                        autoplay={true}
                                        autoplaySpeed={6000}
                                        arrows={false}
                                        beforeChange={(oldIndex, newIndex) =>
                                            setCurrentSlide(newIndex)
                                        }
                                    >
                                        <div>
                                            <Image
                                                src={sanpham1}
                                                width="99%"
                                                alt=""
                                                className="featured-photo"
                                                preview={{
                                                    src: sanpham1,
                                                }}
                                            />{" "}
                                        </div>
                                        <div>
                                            <Image
                                                src={sanpham1}
                                                alt=""
                                                width="99%"
                                                className="featured-photo"
                                                preview={{
                                                    src: sanpham1,
                                                }}
                                            />{" "}
                                        </div>
                                        <div>
                                            <Image
                                                src={sanpham1}
                                                alt=""
                                                width="99%"
                                                className="featured-photo"
                                                preview={{
                                                    src: sanpham1,
                                                }}
                                            />{" "}
                                        </div>
                                        <div>
                                            <Image
                                                src={sanpham1}
                                                alt=""
                                                width="99%"
                                                className="featured-photo"
                                                preview={{
                                                    src: sanpham1,
                                                }}
                                            />{" "}
                                        </div>
                                        <div>
                                            <Image
                                                src={sanpham1}
                                                alt=""
                                                width="99%"
                                                className="featured-photo"
                                                preview={{
                                                    src: sanpham1,
                                                }}
                                            />{" "}
                                        </div>
                                    </Slider>
                                </Image.PreviewGroup>
                                <Slider
                                    asNavFor={nav1!}
                                    ref={sliderRef2}
                                    slidesToShow={3}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                    autoplay={true}
                                    autoplaySpeed={6000}
                                    className="secondary-slider"
                                >
                                    {Array.from({ length: 6 }, (_, idx) => (
                                        <div key={idx}>
                                            <img
                                                src={sanpham1}
                                                alt=""
                                                className={`secondary-photo`}
                                                style={{
                                                    border:
                                                        currentSlide === idx
                                                            ? "1px solid #4F6F52"
                                                            : "none",

                                                    borderRadius: "5px",
                                                    height: "90px",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
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

                    <div>
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
