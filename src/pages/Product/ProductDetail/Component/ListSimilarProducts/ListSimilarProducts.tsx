import React from "react";
import style from "./ListSimilarProducts.module.scss";
import Slider from "react-slick";
import { ban_an_6_cho1, ban_an_6_cho2, bg_bage } from "@/assets/img";
import { Button, Flex } from "@mantine/core";
import { IconMessageCircleHeart } from "@tabler/icons-react";
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
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    <div>
                        <div className={style.listProductsItemMain}>
                            <div className={style.listProductsItem}>
                                <div
                                    className={style.listProductsImageContainer}
                                >
                                    <img
                                        src={ban_an_6_cho1}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                                    />
                                    <img
                                        src={ban_an_6_cho2}
                                        alt="Armchair Doultoun vintage"
                                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                                    />
                                </div>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsInfo} items-center justify-between`}
                                >
                                    <h2
                                        className={`${style.listProductsTitle} font-medium`}
                                    >
                                        Armchair Doultoun vintage
                                    </h2>
                                    <IconMessageCircleHeart
                                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                    />
                                </Flex>
                                <Flex
                                    direction="column"
                                    className={style.listProductsPricing}
                                >
                                    <p
                                        className={`${style.listProductsPriceCurrent} text-red-600`}
                                    >
                                        24,225,000đ
                                    </p>
                                    <p
                                        className={`${style.listProductsPriceOriginal} line-through`}
                                    >
                                        28,500,000đ
                                    </p>
                                </Flex>
                                <Flex
                                    direction="row"
                                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                                    gap="xs"
                                >
                                    <Button
                                        variant="default"
                                        radius="xs"
                                        className={`${style.listProductsButton} font-medium`}
                                    >
                                        THÊM VÀO GIỎ
                                    </Button>
                                    <Button
                                        variant="filled"
                                        radius="xs"
                                        color="rgba(0, 0, 0, 1)"
                                        className={`${style.listProductsButton} block bg-black font-medium`}
                                    >
                                        XEM THÊM
                                    </Button>
                                </Flex>
                            </div>
                            <div className={style.promotionTags}>
                                <div
                                    className={style.discountTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.discountText}>
                                        <span>-15%</span>
                                    </div>
                                </div>
                                <div
                                    className={style.newTag}
                                    style={{
                                        backgroundImage: `url(${bg_bage})`,
                                        backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className={style.newText}>
                                        <span className="font-bold">New</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                </Slider>
            </div>
        </div>
    );
};

export default ListSimilarProducts;
