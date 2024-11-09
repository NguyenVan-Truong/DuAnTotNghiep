import React from "react";
import ItemProduct from "@/Components/ListProduct/ItemProduct/ItemProduct";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Slider from "react-slick";
import style from "./ListSimilarProducts.module.scss";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/model/Products";
import { LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const ListSimilarProducts = () => {
    const settings = {
        className: "center",
        // centerMode: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        // rows: 2,
        arrows: false,
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
    const sliderRef = React.createRef<Slider>();
    const [visible, { toggle }] = useDisclosure(false);
    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await instance.get("/products/splq");
        console.log("data", response.data);
        return response.data;
    };

    const { data, error, isLoading, isError } = useQuery<Product[]>({
        queryKey: ["productsHome"],
        queryFn: fetchData,
    });

    // Kiểm tra lỗi
    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <div
                className={`container ${style.sliderProductSimilar}`}
                style={{ position: "relative", zIndex: 3 }}
            >
                <LoadingOverlay
                    visible={isLoading || visible}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
                <Slider ref={sliderRef} {...settings}>
                    {data?.map((product, index) => (
                        <div key={index}>
                            <ItemProduct product={product} />
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
                            backgroundColor: "#F4F6FF",
                            width: "29px",
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
                            backgroundColor: "#F4F6FF",
                            width: "29px",
                            height: "60px",
                            top: "-38px",
                            left: "-10px",
                            borderRadius: "0 12px 12px 0",
                            zIndex: 9999,
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default ListSimilarProducts;
