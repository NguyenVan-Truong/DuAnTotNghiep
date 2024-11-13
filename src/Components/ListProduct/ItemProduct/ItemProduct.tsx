import { bg_bage } from "@/assets/img";
import { Product } from "@/model/Products";
import { Button, Flex, Rating, Tooltip } from "@mantine/core";
import { IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import style from "../ListProduct.module.scss";
import { useNavigate } from "react-router-dom";
import instance from "@/configs/axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
type props = {
    product: Product;
};
const ItemProduct = ({ product }: props) => {
    const navigate = useNavigate();
    const [tym, setTym] = useState(false);
    const queryClient = useQueryClient();
    const onhandleTymItem = async () => {
        setTym(!tym);
        try {
            const response = await instance.post("/favorites/toggle", {
              product_id: product.id,
            });
            
            if (response.status === 200) {
                // Cập nhật dữ liệu cache để đồng bộ ngay lập tức
                queryClient.setQueryData<number[]>(['favoritesData'], (oldData) => {
                    const currentData = oldData ?? []; // Đảm bảo oldData là mảng
                    return tym
                        ? currentData.filter(id => id !== product.id)
                        : [...currentData, product.id];
                });
                // await queryClient.invalidateQueries({queryKey: ['favoritesData']});
            }
          } catch (error) {
            console.error("Có lỗi xảy", error);
          }
        setTym(!tym);
    };
    const onhandleTurnPage = (id: number, slug: string) => {
        navigate(`/chi-tiet-san-pham/${slug}`, { state: { id: id } });
    };
    return (
        <div className={style.listProductsItemMain}>
            <div className={style.listProductsItem}>
                <div className={style.listProductsImageContainer}>
                    <img
                        src={product?.image_url}
                        alt={product?.name}
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
                        {Math.floor(product?.price).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </p>
                    <p
                        className={`${style.listProductsPriceOriginal} line-through`}
                    >
                        {Math.floor(product?.discount_price).toLocaleString(
                            "vi-VN",
                            {
                                style: "currency",
                                currency: "VND",
                            },
                        )}
                    </p>
                </Flex>
                <Flex direction="row" justify="space-between">
                    <Flex direction="row">
                        <Rating defaultValue={5} readOnly />
                        <span className="text-[12px] text-yellow-700">
                            ({product?.ratings_avg})
                        </span>
                    </Flex>
                    <div>
                        <p className="text-[14px] text-slate-600">
                            Kho : {product?.stock}
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
                                onClick={onhandleTymItem}
                            />
                        </>
                    ) : (
                        <>
                            <CiHeart
                                className={`${style.listProductsFavoriteIcon} text-[24px]`}
                                onClick={onhandleTymItem}
                                style={{ cursor: "pointer" }}
                            />
                        </>
                    )}
                    <div className={`${style.LinkButtonWrapper}`}>
                        <Button
                            variant="light"
                            className={`${style.listProductsButton}`}
                            onClick={() =>
                                onhandleTurnPage(product?.id, product?.slug)
                            }
                        >
                            XEM THÊM
                        </Button>
                    </div>
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
                                {Math.floor(product?.discount_percentage)}%
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
    );
};

export default ItemProduct;
