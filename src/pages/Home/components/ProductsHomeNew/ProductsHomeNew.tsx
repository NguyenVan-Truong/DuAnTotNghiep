import ItemProduct from "@/Components/ListProduct/ItemProduct/ItemProduct";
import instance from "@/configs/axios";
import { Product } from "@/model/Products";
import { Box, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./ProductsHomenew.scss"; // Import SCSS file
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// Custom next arrow using FiChevronRight
const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            {/* <FiChevronRight className="arrow-icon" /> */}
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
    );
};

// Custom prev arrow using FiChevronLeft
const PrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
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
    );
};

const ProductsHomeNew = () => {
    const [visible, { toggle }] = useDisclosure(false);
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
    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await instance.get("/products");
        return response.data;
    };

    const { data, error, isLoading, isError } = useQuery<Product[]>({
        queryKey: ["productsHomeNew"],
        queryFn: fetchData,
    });
    if (error) return <div>Error: {error.message}</div>;
    return (
        <Box pos="relative">
            <div className="container list-products mt-[50px] relative">
                <LoadingOverlay
                    visible={visible || isLoading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />
                <Slider {...settings} className="list-products-slider">
                    {data?.map((product, index) => (
                        <div key={index} className="list-products__item-main">
                            <ItemProduct product={product} />
                        </div>
                    ))}
                </Slider>
            </div>
        </Box>
    );
};

export default ProductsHomeNew;
