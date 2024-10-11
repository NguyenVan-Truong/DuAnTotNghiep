import React from "react";
import Slider from "react-slick";
import { Button, Flex } from "@mantine/core";
import { CiHeart } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ban_an_6_cho1, ban_an_6_cho2, bg_bage } from "@/assets/img";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductsHome.scss";
import ItemProduct from "@/Components/ListProduct/ItemProduct/ItemProduct";

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

const ProductsHome = () => {
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
                        <ItemProduct />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductsHome;
