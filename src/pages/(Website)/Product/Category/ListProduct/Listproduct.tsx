import { Button, Flex, Grid, GridCol } from "@mantine/core";
import style from "./ListProduct.module.scss";
import { ban_an_6_cho1, ban_an_6_cho2, bg_bage } from "@/assets/img";
import { CiHeart } from "react-icons/ci";
type Props = {};

const ListProducts = (props: Props) => {
    return (
        <div className={`${style.listProductss} mt-[50px] padding`}>
            <Grid className={style.listProductsMain}>
                <GridCol
                    span={{ lg: 3, md: 3, sm: 4, xs: 6 }}
                    className={style.listProductsItemMain}
                >
                    <div className={style.listProductsItem}>
                        <div className={style.listProductsImageContainer}>
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
                            <CiHeart
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
                </GridCol>{" "}
                <GridCol
                    span={{ lg: 3, md: 3, sm: 4, xs: 6 }}
                    className={style.listProductsItemMain}
                >
                    <div className={style.listProductsItem}>
                        <div className={style.listProductsImageContainer}>
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
                            <CiHeart
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
                </GridCol>{" "}
                <GridCol
                    span={{ lg: 3, md: 3, sm: 4, xs: 6 }}
                    className={style.listProductsItemMain}
                >
                    <div className={style.listProductsItem}>
                        <div className={style.listProductsImageContainer}>
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
                            <CiHeart
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
                </GridCol>{" "}
                <GridCol
                    span={{ lg: 3, md: 3, sm: 4, xs: 6 }}
                    className={style.listProductsItemMain}
                >
                    <div className={style.listProductsItem}>
                        <div className={style.listProductsImageContainer}>
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
                            <CiHeart
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
                </GridCol>{" "}
            </Grid>
        </div>
    );
};

export default ListProducts;
