import React from "react";
import ItemProduct from "@/Components/ListProduct/ItemProduct/ItemProduct";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Slider from "react-slick";
import style from "./ListSimilarProducts.module.scss";

const ListSimilarProducts = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        slidesToShow: 4,
        speed: 500,
        rows: 2,
        arrows: false,
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
    const sliderRef = React.createRef<Slider>();

    return (
        <div
            className={`${style.sliderProductSimilar}`}
            style={{ position: "relative", zIndex: 3 }}
        >
            <Slider ref={sliderRef} {...settings}>
                {[...Array(12)].map((_, index) => (
                    <div key={index}>
                        <ItemProduct />
                    </div>
                ))}
            </Slider>
            <div
                className={style.NextPrev}
                onClick={() => sliderRef.current?.slickNext()}
            >
                <IconChevronRight
                    stroke={3}
                    color="#4A4947"
                    style={{
                        position: "absolute",
                        backgroundColor: "#ebebeb",
                        width: "19px",
                        height: "60px",
                        right: "-10px",
                        top: "-38px",
                        borderRadius: " 12px 0 0 12px ",
                        zIndex: 9999,
                    }}
                />
            </div>
            <div
                className={style.BackPrev}
                onClick={() => sliderRef.current?.slickPrev()}
            >
                <IconChevronLeft
                    stroke={3}
                    color="#4A4947"
                    style={{
                        position: "absolute",
                        backgroundColor: "#ebebeb",
                        width: "19px",
                        height: "60px",
                        top: "-38px",
                        left: "-10px",
                        borderRadius: "0 12px 12px 0",
                        zIndex: 9999,
                    }}
                />
            </div>
        </div>
    );
};

export default ListSimilarProducts;
