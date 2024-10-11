import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { banner_footer, banner_footer1 } from "@/assets/img";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./InspirationCorner.module.scss"; // Import SCSS file
import { Box, Image, Text } from "@mantine/core";

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

const Carousle = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
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
        <div>
            <Slider {...settings} className="list-products-slider">
                {[...Array(4).keys()].map((_, index) => (
                    <div key={index}>
                        <div className="flex flex-col xl:flex-row space-y-5 md:space-y-0 md:space-x-2">
                        <div className="flex-1 flex flex-col items-center mb-4">
                            <div className="h-[300px] md:h-[400px] w-full relative overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-all duration-2000 hover:brightness-100 brightness-95"
                                    src={banner_footer}
                                    alt="Banner Footer"
                                />
                            </div>
                            <h1 className="text-base md:text-lg font-semibold mb-2 mt-4 text-center">
                                Nội thất Mây – Mang hơi thở thiên nhiên vào
                                không gian hiện đại
                            </h1>
                            <div className="w-[40px] h-[2px] bg-slate-300 mb-1"></div>
                            <Box maw={500} w="100%">
                                <Text size="sm" truncate="end">
                                    Trong cuộc sống đầy bận rộn, tìm kiếm một
                                    khoảng không gian yên bình để thư giãn và
                                    cân bằng tâm hồn là điều quý giá. Nội thất
                                    mây không chỉ làm dịu mát không gian sống mà
                                    còn gợi lên cảm giác thanh bình, an yên, kết
                                    nối con người với thiên nhiên. BST Mây mới
                                    của Nhà Xinh là minh chứng hoàn hảo cho sự
                                    hài hòa này, đem đến một luồng gió mới cho
                                    không gian sống của bạn.
                                </Text>
                            </Box>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="h-[300px] md:h-[400px] w-full">
                                <Image
                                    className="w-full h-full object-cover transition-all duration-2000 hover:brightness-100 brightness-95"
                                    src={banner_footer1}
                                    alt="Banner Footer"
                                />
                            </div>
                            <h1 className="text-base md:text-lg font-semibold mb-2 mt-4 text-center">
                                Nội thất Mây – Mang hơi thở thiên nhiên vào
                                không gian hiện đại
                            </h1>
                            <div className="w-[40px] h-[2px] bg-slate-300 mb-1"></div>
                            <Box maw={500} w="100%">
                                <Text size="sm" truncate="end">
                                    Trong cuộc sống đầy bận rộn, tìm kiếm một
                                    khoảng không gian yên bình để thư giãn và
                                    cân bằng tâm hồn là điều quý giá. Nội thất
                                    mây không chỉ làm dịu mát không gian sống mà
                                    còn gợi lên cảm giác thanh bình, an yên, kết
                                    nối con người với thiên nhiên. BST Mây mới
                                    của Nhà Xinh là minh chứng hoàn hảo cho sự
                                    hài hòa này, đem đến một luồng gió mới cho
                                    không gian sống của bạn.
                                </Text>
                            </Box>
                        </div>
                    </div> 
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousle;
