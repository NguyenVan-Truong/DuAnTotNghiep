import { ban_an_6_cho1, ban_an_6_cho2, bg_bage } from "@/assets/img";
import { Button, Flex, Rating } from "@mantine/core";
import {
    IconChevronLeft,
    IconChevronRight,
    IconMessageCircleHeart,
} from "@tabler/icons-react";
import Slider from "react-slick";
import style from "./ListSimilarProducts.module.scss";
import { CiHeart } from "react-icons/ci";
import ItemProduct from "@/Components/ListProduct/ItemProduct/ItemProduct";
const ListSimilarProducts = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        speed: 500,
        rows: 2,
        arrows: true,
        nextArrow: (
            <div className="slick-arrow slick-next">
                <IconChevronRight stroke={3} color="#4A4947" />
            </div>
        ),
        prevArrow: (
            <div className="slick-arrow slick-prev">
                <IconChevronLeft stroke={3} color="#4A4947" />
            </div>
        ),
        responsive: [
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className={style.sliderProductSimilar}>
            <div className="slider-container">
                <Slider {...settings}>
                    <div>
                        <ItemProduct />
                    </div>
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>{" "}
                    <div>
                        <ItemProduct />
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default ListSimilarProducts;
