import React from "react";
import Slider from "react-slick";
import { Button, Flex } from "@mantine/core";
import { CiHeart } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ban_an_6_cho1, ban_an_6_cho2 } from "@/assets/img";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductsHomenew.scss"; // Import SCSS file

// Custom next arrow using FiChevronRight
const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FiChevronRight className="arrow-icon" />
        </div>
    );
};

// Custom prev arrow using FiChevronLeft
const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <FiChevronLeft className="arrow-icon" />
        </div>
    );
};

const ProductsHomeNew = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container list-products mt-[50px] relative">
            <Slider {...settings} className="list-products-slider">
                {[...Array(4).keys()].map((_, index) => (
                    <div key={index} className="list-products__item-main">
                        <div></div>
                        <div className="list-products__item">
                            <div className="list-products__image-container">
                                <img
                                    src={ban_an_6_cho1}
                                    alt="Armchair Doultoun vintage"
                                    className="list-products__image list-products__image--primary w-full h-auto"
                                />
                                <img
                                    src={ban_an_6_cho2}
                                    alt="Armchair Doultoun vintage"
                                    className="list-products__image list-products__image--secondary w-full h-auto absolute top-0 left-0 opacity-0"
                                />
                            </div>
                            <Flex
                                direction="row"
                                className="list-products__info items-center justify-between"
                            >
                                <h2 className="list-products__title font-medium">
                                    Armchair Doultoun vintage
                                </h2>
                                <CiHeart className="list-products__favorite-icon text-[24px]" />
                            </Flex>
                            <Flex
                                direction="column"
                                className="list-products__pricing"
                            >
                                <p className="list-products__price-current text-red-600">
                                    24,225,000đ
                                </p>
                                <p className="list-products__price-original line-through">
                                    28,500,000đ
                                </p>
                            </Flex>
                            <Flex
                                direction="row"
                                className="list-products__actions items-center justify-between mt-[20px]"
                            >
                                <Button
                                    variant="default"
                                    className="list-products__button !w-[110px] md:!w-[150px] "
                                >
                                    THÊM VÀO GIỎ
                                </Button>
                                <Button
                                    variant="filled"
                                    color="rgba(0, 0, 0, 1)"
                                    className="list-products__button !w-[70px] md:!w-[110px] "
                                >
                                    XEM THÊM
                                </Button>
                            </Flex>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductsHomeNew;
