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
        // centerPadding: "60px",
        slidesToShow: 4,
        speed: 500,
        rows: 2,
        arrows: true,
        nextArrow: (
            <div className={style.NextPrev} style={{ zIndex: 1000 }}>
                <IconChevronRight
                    stroke={3}
                    color="#4A4947"
                    style={{
                        position: "absolute",
                        backgroundColor: "#ebebeb",
                        width: "19px",
                        height: "60px",
                        right: "6px",
                        top: "-38px",
                        borderRadius: "0 12px 12px 0",
                        zIndex: 9999,
                    }}
                />
            </div>
        ),
        prevArrow: (
            <div className={style.BackPrev} style={{ zIndex: 1000 }}>
                <IconChevronLeft
                    stroke={3}
                    color="#4A4947"
                    style={{
                        position: "absolute",
                        backgroundColor: "#ebebeb",
                        width: "19px",
                        height: "60px",
                        top: "-38px",
                        left: "7px",
                        borderRadius: "12px 0 0 12px",
                        zIndex: 9999,
                    }}
                />
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
                breakpoint: 560,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div
            className={style.sliderProductSimilar}
            style={{ position: "relative", zIndex: 3 }}
        >
            <div className={style.sliderContainer}>
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
