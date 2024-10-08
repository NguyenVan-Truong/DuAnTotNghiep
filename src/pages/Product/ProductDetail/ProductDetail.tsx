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
import {
    Badge,
    Button,
    Flex,
    Indicator,
    Rating,
    ScrollArea,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

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
                    <div className="product-content padding">
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
                        <div className="product-details">
                            <div className="product-header">
                                <h2 className="product-title text-[20px] font-medium">
                                    Giường Ngủ Gỗ Tràm MOHO VLINE 601 Nhiều Kích
                                    Thước
                                </h2>
                            </div>
                            <Flex
                                direction="row"
                                className="product-interactions"
                            >
                                <Flex
                                    className="product-rating"
                                    direction="row"
                                >
                                    <Rating
                                        defaultValue={5}
                                        size="xs"
                                        readOnly
                                    />
                                    <span className="rating-count">(77)</span>
                                </Flex>
                                <div className="product-sales">
                                    <span>Đã bán 965</span>
                                </div>
                            </Flex>
                            <div className="product-pricing my-[5px] py-[5px] ">
                                <Flex direction="row" align="center" gap="lg">
                                    <Badge
                                        size="lg"
                                        variant="gradient"
                                        gradient={{
                                            from: "blue",
                                            to: "cyan",
                                            deg: 90,
                                        }}
                                        radius="sm"
                                    >
                                        -35%
                                    </Badge>
                                    <span className="current-price text-[#ef683a] text-[17px] font-bold">
                                        1.200.000đ
                                    </span>
                                    <span className="original-price text-[#777a7b] text-[14px] ">
                                        <del>1.500.000đ</del>
                                    </span>
                                </Flex>
                            </div>
                            <Flex
                                direction="column"
                                gap="sm"
                                className="product-attributes"
                            >
                                <div>
                                    <h4>Chất liệu</h4>
                                    <Flex direction="row" gap="lg">
                                        <Indicator withBorder processing>
                                            <Badge
                                                variant="default"
                                                color="rgba(5, 5, 5, 1)"
                                                radius="xs"
                                                size="lg"
                                            >
                                                Gỗ-kim loại
                                            </Badge>
                                        </Indicator>
                                    </Flex>
                                </div>
                                <div>
                                    <h4>Màu sắc</h4>
                                    <Flex direction="row" gap="lg">
                                        <Badge
                                            variant="default"
                                            color="rgba(5, 5, 5, 1)"
                                            radius="xs"
                                            size="lg"
                                        >
                                            Màu gỗ tự nhiên
                                        </Badge>{" "}
                                        <Badge
                                            variant="default"
                                            color="rgba(5, 5, 5, 1)"
                                            radius="xs"
                                            size="lg"
                                        >
                                            Màu nâu
                                        </Badge>
                                    </Flex>
                                </div>
                                <div>
                                    <h4>Kích thước</h4>
                                    <Flex direction="row" gap="lg">
                                        <Badge
                                            variant="default"
                                            color="rgba(5, 5, 5, 1)"
                                            radius="xs"
                                            size="lg"
                                        >
                                            1m5
                                        </Badge>
                                        <Badge
                                            variant="default"
                                            color="rgba(5, 5, 5, 1)"
                                            radius="xs"
                                            size="lg"
                                        >
                                            1m8
                                        </Badge>
                                    </Flex>
                                </div>
                            </Flex>
                            <div className="py-[5px]">
                                <ScrollArea h={150} offsetScrollbars>
                                    - Thân giường: Gỗ tràm tự nhiên, Veneer gỗ
                                    tràm tự nhiên - Chân giường: Gỗ cao su tự
                                    nhiên - Tấm phản: Gỗ plywood chuẩn CARB-P2
                                    (*) (*) Tiêu chuẩn California Air Resources
                                    Board xuất khẩu Mỹ, đảm bảo gỗ không độc
                                    hại, an toàn cho sức khỏe Lorem ipsum dolor
                                    sit amet consectetur adipisicing elit.
                                    Corporis non suscipit accusamus alias facere
                                    numquam! Odio, corporis perspiciatis.
                                    Architecto eligendi repellendus, sequi
                                    nostrum corporis necessitatibus sapiente eos
                                    veritatis laborum harum!
                                </ScrollArea>
                            </div>
                            <div className="mt-[20px]">
                                <Flex direction="row" gap="lg" align="center">
                                    <div>
                                        <Button.Group>
                                            <Button variant="default">
                                                <IconMinus size={14} />
                                            </Button>
                                            <Button variant="default">2</Button>
                                            <Button variant="default">
                                                <IconPlus size={14} />
                                            </Button>
                                        </Button.Group>
                                    </div>
                                    <div>
                                        <Badge
                                            size="lg"
                                            variant="gradient"
                                            gradient={{
                                                from: "rgba(3, 0, 207, 1)",
                                                to: "cyan",
                                                deg: 35,
                                            }}
                                            radius="xs"
                                            style={{ padding: "20px " }}
                                        >
                                            Mua ngay
                                        </Badge>
                                    </div>
                                    <div>
                                        <Badge
                                            size="lg"
                                            variant="gradient"
                                            gradient={{
                                                from: "rgba(5, 3, 2, 1)",
                                                to: "rgba(61, 61, 61, 1)",
                                                deg: 35,
                                            }}
                                            style={{ padding: "20px " }}
                                            radius="xs"
                                        >
                                            Thêm vào giỏ hàng
                                        </Badge>
                                    </div>
                                </Flex>
                            </div>
                        </div>
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
