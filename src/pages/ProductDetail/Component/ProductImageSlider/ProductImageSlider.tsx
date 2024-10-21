import { sanpham1 } from "@/assets/img";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "../../ProductDetail.scss";
const ProductImageSlider = () => {
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
    return (
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
    );
};

export default ProductImageSlider;
