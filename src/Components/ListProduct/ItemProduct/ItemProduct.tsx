import { bg_bage } from "@/assets/img";
import instance from "@/configs/axios";
import { Button, Flex, Rating, Tooltip } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import style from "../ListProduct.module.scss";
const ItemProduct = () => {
    const [tym, setTym] = useState(false);
    const onhandleTymItem = () => {
        setTym(!tym);
    };
    const fetchData = async () => {
        const response = await instance.get("/products");
        console.log("response", response);
        return response.data;
    };
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: fetchData,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            {data.map((product: any) => (
                <div className={style.listProductsItemMain}>
                    <div className={style.listProductsItem}>
                        <div className={style.listProductsImageContainer}>
                            <img
                                src={product.image_url}
                                alt={product.name}
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
                            <Tooltip
                                label="Tooltip"
                                color="rgba(166, 166, 166, 1)"
                            >
                                <h2
                                    className={`${style.listProductsTitle} font-medium`}
                                >
                                    {product.name}
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
                                {product.price}
                            </p>
                            <p
                                className={`${style.listProductsPriceOriginal} line-through`}
                            >
                                {product.discount_price}
                            </p>
                        </Flex>
                        <Flex direction="row" justify="space-between">
                            <Flex direction="row">
                                <Rating defaultValue={5} readOnly />
                                <span className="text-[12px] text-yellow-700">
                                    ({product.ratings_avg})
                                </span>
                            </Flex>
                            <div>
                                <p className="text-[14px] text-slate-600">
                                    Kho : {product.stock}
                                </p>
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
                                    <span>
                                        {Math.floor(
                                            product.discount_percentage,
                                        )}
                                        %
                                    </span>
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
            ))}
        </>
    );
};

export default ItemProduct;
