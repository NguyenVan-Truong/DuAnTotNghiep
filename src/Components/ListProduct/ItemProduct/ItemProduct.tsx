import { ban_an_6_cho1, ban_an_6_cho2, bg_bage } from "@/assets/img";
import { Button, Flex, Rating, Tooltip } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import style from "../ListProduct.module.scss";
import { Link } from "react-router-dom";
import { Product } from "@/modals/Products";
type props = {
    product: Product;
};
const ItemProduct = ({ product }: props) => {
    const [tym, setTym] = useState(false);
    const onhandleTymItem = () => {
        setTym(!tym);
    };
    return (
        <div className={style.listProductsItemMain}>
            <div className={style.listProductsItem}>
                <div className={style.listProductsImageContainer}>
                    <img
                        src={ban_an_6_cho1}
                        alt="Armchair Doultoun vintage"
                        className={`${style.listProductsImage} ${style.listProductsImagePrimary}`}
                    />
                    {/* <img
                        src={ban_an_6_cho2}
                        alt="Armchair Doultoun vintage"
                        className={`${style.listProductsImage} ${style.listProductsImageSecondary}`}
                    /> */}
                </div>
                <Flex
                    direction="row"
                    className={`${style.listProductsInfo} items-center justify-between`}
                >
                    <Tooltip label="Tooltip" color="rgba(166, 166, 166, 1)">
                        <h2
                            className={`${style.listProductsTitle} font-medium`}
                        >
                            {product?.name}
                        </h2>
                    </Tooltip>
                    {/* <CiHeart
                        className={`${style.listProductsFavoriteIcon} text-[24px]`}
                    /> */}
                </Flex>
                <Flex
                    direction="row"
                    justify="start"
                    align="center"
                    className={style.listProductsPricing}
                >
                    <p className={`${style.listProductsPriceCurrent} `}>
                        24,225,000đ
                    </p>
                    <p
                        className={`${style.listProductsPriceOriginal} line-through`}
                    >
                        28,500,000đ
                    </p>
                </Flex>
                <Flex direction="row" justify="space-between">
                    <Flex direction="row">
                        <Rating defaultValue={5} readOnly />
                        <span className="text-[12px] text-yellow-700">
                            (54)
                        </span>
                    </Flex>
                    <div>
                        <p className="text-[14px] text-slate-600">Đã bán 999</p>
                    </div>
                </Flex>
                <Flex
                    direction="row"
                    className={`${style.listProductsActions} items-center justify-between mt-[20px]`}
                    gap="xs"
                >
                    {tym ? (
                        <>
                            <IconHeartFilled
                                color="red"
                                onClick={() => setTym(false)}
                            />
                        </>
                    ) : (
                        <>
                            <CiHeart
                                className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                onClick={() => onhandleTymItem()}
                                style={{ cursor: "pointer" }}
                            />
                        </>
                    )}
                    <Link
                        to="/chi-tiet-san-pham"
                        className={`${style.LinkButtonWrapper}`}
                    >
                        <Button
                            variant="light"
                            className={`${style.listProductsButton}`}
                        >
                            XEM THÊM
                        </Button>
                    </Link>
                </Flex>
            </div>
            <div className={style.promotionTags}>
                <Flex direction="column" justify="space-between">
                    <div
                        className={style.discountTag}
                        style={{
                            backgroundImage: `url(${bg_bage})`,
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className={style.discountText}>
                            <span>15%</span>
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
                </Flex>
            </div>
        </div>
    );
};

export default ItemProduct;
