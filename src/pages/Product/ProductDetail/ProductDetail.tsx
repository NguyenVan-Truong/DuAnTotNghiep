import {
    banner,
    banner_footer1,
    banner_footer2,
    banner_footer6,
    sanpham1,
} from "@/assets/img";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import ListProducts from "../Category/ListProduct/Listproduct";
import "./ProductDetail.scss";
import { Image } from "antd";

const ChiTietSP = () => {
    const [activeTab, setActiveTab] = useState("warranty");
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
                    <div className="product-content">
                        <div className="imageMain">
                            <div className="slider-container">
                                <Image.PreviewGroup>
                                    <Slider
                                        asNavFor={nav2!}
                                        ref={sliderRef1}
                                        autoplay={true}
                                        autoplaySpeed={6000}
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
                                        {/* <div>
                                    <img
                                        src={sanpham1}
                                        alt=""
                                        className="featured-photo"
                                    />{" "}
                                </div> */}
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
                        </div>
                        {/* Phần bên phải: Chi tiết sản phẩm */}
                        <div></div>
                    </div>
                    {/* <div>
                    <div className="product-title-1">
                        <p>Có Thể Bạn Cũng Thích</p>
                    </div>
                    <ListProducts />
                </div>
                <div>
                    <div className="product-title-2">
                        <h2>SẢN PHẨM VỪA XEM</h2>
                        <div className="container">
                            <div className="left">
                                <img
                                    src={banner_footer6}
                                    alt="Sofa Image"
                                    className="image-left"
                                />
                            </div>

                            <div className="middle">
                                <div className="content">
                                    <h2>Mẫu thiết kế phòng khách</h2>
                                    <p>
                                        Phòng khách là không gian chính của ngôi
                                        nhà, là nơi sum họp gia đình
                                    </p>
                                    <a href="#">MẪU PHÒNG KHÁCH →</a>
                                </div>
                                <div className="content">
                                    <h2>Đồ trang trí</h2>
                                    <p>
                                        Mang lại những nguồn cảm hứng và nét
                                        sinh động cho không gian
                                    </p>
                                    <a href="#">KHÁM PHÁ →</a>
                                </div>
                            </div>

                            <div className="right">
                                <img
                                    src={banner}
                                    alt="Decor Image"
                                    className="image-right"
                                />
                            </div>
                        </div>
                        <div className="design-examples">
                            <div className="design-example design-example-1">
                                <div className="image-container">
                                    <img
                                        src={banner_footer2}
                                        alt="Mẫu thiết kế phòng ngủ"
                                    />
                                </div>
                                <div className="content-container">
                                    <h3>Mẫu thiết kế phòng ngủ</h3>
                                    <p>
                                        Những mẫu phòng ngủ của Nhà Xinh mang
                                        đến cảm giác ấm cúng, gần gũi và thoải
                                        mái
                                    </p>
                                    <a href="#" className="read-more">
                                        MẪU PHÒNG NGỦ →
                                    </a>
                                </div>
                            </div>

                            <div className="design-example design-example-2">
                                <div className="image-container">
                                    <img
                                        src={banner_footer1}
                                        alt="Mẫu thiết kế phòng ăn"
                                    />
                                </div>
                                <div className="content-container">
                                    <h3>Mẫu thiết kế phòng ăn</h3>
                                    <p>
                                        Một bữa ăn ngon luôn là mong ước của mỗi
                                        gia đình. Không gian phòng ăn đóng vai
                                        trò rất quan trọng trong văn hóa Việt.
                                    </p>
                                    <a href="#" className="read-more">
                                        MẪU PHÒNG ĂN →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                </div>
            </div>
        </>
    );
};

export default ChiTietSP;
