import { NotificationExtension } from "@/extension/NotificationExtension";
import { toTitleCase } from "@/model/_base/Text";
import {
    Badge,
    Button,
    Flex,
    Loader,
    LoadingOverlay,
    Rating,
} from "@mantine/core";
import { IconCheck, IconMinus, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import "../../ProductDetail.scss";
import WanrrantyTab from "../WarrantyTab/WanrrantyTab";
import instance from "@/configs/axios";
import { formatCurrencyVN } from "@/model/_base/Number";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
type Props = {
    data: TypeProductDetail | undefined;
    id: number;
    dataAttribute: any;
};
type AttributeValues = {
    [key: string]: string[] | any;
};
type Attribute = {
    id: number;
    attribute: string;
    value: string;
};
type TypeFilteredVariant = {
    id: number;
    price: string;
    discount_price: string;
    stock: number;
    weight: string;
    sku: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    attributes: Attribute[];
};

const RightProduct = ({ data, id, dataAttribute }: Props) => {
    if (!data) return null;
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setisLoading] = useState(false);
    const queryClient = useQueryClient();
    const [isLoadingPaymentButton, setIsLoadingPaymentButton] = useState(false);
    const increaseQuantity = () => {
        if (
            quantity < (filteredVariant ? filteredVariant?.stock : data.stock)
        ) {
            setQuantity(quantity + 1);
        } else {
            NotificationExtension.Fails("Không thể vượt quá sản phẩm có sẵn");
        }
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    //#region handleAttribute
    const [selectedAttributes, setSelectedAttributes] = useState<any>({});
    const uniqueAttributes: AttributeValues = dataAttribute.reduce(
        (acc: any, attr: any) => {
            const values = Array.from(
                new Set(
                    data.variants.flatMap((variant: any) =>
                        variant.attributes
                            .filter(
                                (attribute: any) =>
                                    attribute.attribute === attr,
                            )
                            .map((attribute: any) => attribute.value),
                    ),
                ),
            );
            acc[attr] = values;
            return acc;
        },
        {} as AttributeValues,
    );
    // xử lý khi chọn thuộc tính
    const handleAttributeSelect = (attribute: string, value: string) => {
        setSelectedAttributes((prev: any) => {
            if (prev[attribute] === value) {
                const updatedAttributes = { ...prev };
                delete updatedAttributes[attribute];
                return updatedAttributes;
            }
            return {
                ...prev,
                [attribute]: value,
            };
        });
    };
    // lọc giá trị variant dựa trên thuộc tính đã chọn
    const filteredVariant = data.variants.find((variant: any) => {
        return Object.entries(selectedAttributes).every(
            ([attribute, value]) => {
                return variant.attributes.some(
                    (attr: any) =>
                        attr.attribute === attribute && attr.value === value,
                );
            },
        );
    }) as TypeFilteredVariant | undefined;
    // console.log("filteredVariant", filteredVariant);
    // console.log("selectedAttributes", selectedAttributes);
    // console.log("dataAttribute", dataAttribute);

    //add Cart
    const onhandleAddToCart = async (type: string) => {
        // Kiểm tra nếu selectedAttributes không đủ các thuộc tính cần thiết từ dataAttribute
        const missingAttributes = dataAttribute.filter(
            (attribute: string) => !(attribute in selectedAttributes),
        );

        // Nếu thiếu thuộc tính nào, hiển thị thông báo lỗi và dừng lại
        if (missingAttributes.length > 0) {
            message.error(
                `Vui lòng chọn đầy đủ các thuộc tính: ${missingAttributes.join(", ")}`,
            );
            return; // Dừng lại nếu thiếu thuộc tính
        }

        // Kiểm tra nếu filteredVariant không có giá trị hợp lệ
        if (!filteredVariant) {
            message.error("Không tìm thấy biến thể sản phẩm phù hợp.");
            return; // Dừng lại nếu không tìm thấy variant
        }
        const dataAddToCart = {
            product_id: id,
            product_variant_id: filteredVariant?.id,
            quantity: quantity,
        };

        try {
            if (type === "cart") {
                setisLoading(true);
                const response = await instance.post("/cart", dataAddToCart);
                if (response.status === 201 || response.status === 200) {
                    message.success("Thêm vào giỏ hàng thành công");
                    queryClient.invalidateQueries({ queryKey: ["cart"] });
                }
            }
            if (type === "buy") {
                setIsLoadingPaymentButton(true);
                const response = await instance.post("/cart", dataAddToCart);
                if (response.status === 201 || response.status === 200) {
                    queryClient.invalidateQueries({ queryKey: ["cart"] });
                    // Lấy lại giỏ hàng để tìm sản phẩm vừa thêm
                    const cartResponse = await instance.get("/cart");
                    const cartItems = cartResponse.data.data || [];
                    // Tìm sản phẩm vừa thêm trong giỏ hàng
                    const addedProduct = cartItems.find((item: any) => {
                        return (
                            Number(item.product_id) ==
                                Number(dataAddToCart.product_id) &&
                            Number(item.product_variants_id) ==
                                Number(dataAddToCart.product_variant_id)
                        );
                    });
                    const TotalPrice =
                        Number(addedProduct.product_variant.discount_price) *
                        Number(addedProduct.quantity);
                    if (addedProduct && TotalPrice) {
                        navigate("/thanh-toan", {
                            state: {
                                listchecked: [addedProduct],
                                totalPrice: TotalPrice,
                            },
                        });
                    }
                } else {
                    message.error("Đã xảy ra lỗi khi mua hàng");
                }
            }
        } catch (error) {
            message.error("Thêm vào giỏ hàng thất bại");
        } finally {
            setisLoading(false);
            setIsLoadingPaymentButton(false);
        }
    };

    // Tính phần trăm giảm giá
    const calculateDiscountPercentage = (
        originalPrice: number,
        discountPrice: number,
    ) => {
        if (
            !originalPrice ||
            !discountPrice ||
            originalPrice <= discountPrice
        ) {
            return 0; // Không giảm giá hoặc giá gốc không hợp lệ
        }
        return Math.round(
            ((originalPrice - discountPrice) / originalPrice) * 100,
        );
    };
    return (
        <div className="product-details">
            <div className="product-header">
                <h2 className="product-title text-[20px] font-medium">
                    {toTitleCase(data?.name)}
                </h2>
            </div>
            <Flex direction="row" className="product-interactions">
                <Flex className="product-rating" direction="row">
                    <Rating defaultValue={5} size="xs" readOnly />
                    <span className="rating-count">(77)</span>
                </Flex>
                <div className="product-sales">
                    <span>Đã bán 965</span>
                </div>
            </Flex>
            <div className="product-pricing my-[5px] py-[5px] ">
                <Flex direction="row" align="center" gap="lg">
                    {/* phần trăm được giảm */}
                    <Badge
                        size="lg"
                        radius="sm"
                        style={{ backgroundColor: "red" }}
                    >
                        {calculateDiscountPercentage(
                            filteredVariant
                                ? Number(filteredVariant?.price)
                                : Number(data?.price),
                            filteredVariant
                                ? Number(filteredVariant?.discount_price)
                                : Number(data?.discount_price),
                        )}
                        %
                    </Badge>
                    <span className="current-price text-[#ef683a] text-[17px] font-bold">
                        {/* giá sau khi được giảm */}
                        {formatCurrencyVN(
                            filteredVariant
                                ? filteredVariant?.discount_price
                                : data?.discount_price,
                        )}
                    </span>
                    <span className="original-price text-[#777a7b] text-[14px] ">
                        <del>
                            {/* giá gốc */}
                            {formatCurrencyVN(
                                filteredVariant
                                    ? filteredVariant?.price
                                    : data?.price,
                            )}
                        </del>
                    </span>
                </Flex>
            </div>
            <Flex direction="column" gap="sm" className="product-attributes">
                {dataAttribute.map((attribute: any) => (
                    <div key={attribute}>
                        <h4 style={{ fontWeight: "600" }}>{attribute}</h4>
                        <Flex direction="row" gap="lg">
                            {uniqueAttributes[attribute]?.map(
                                (item: string) => (
                                    <div
                                        key={item}
                                        style={{
                                            position: "relative",
                                            cursor: "pointer",
                                            fontWeight: "500",
                                            minWidth: "80px",
                                            textAlign: "center",
                                            border:
                                                selectedAttributes[
                                                    attribute
                                                ] === item
                                                    ? "1px solid #ef683a"
                                                    : "1px solid #ccc",
                                            padding: "8px 10px",
                                            color:
                                                selectedAttributes[
                                                    attribute
                                                ] === item
                                                    ? "#ef683a"
                                                    : "",
                                        }}
                                        onClick={() =>
                                            handleAttributeSelect(
                                                attribute,
                                                item,
                                            )
                                        }
                                    >
                                        {item}
                                        {selectedAttributes[attribute] ===
                                            item && (
                                            <div className="dotCheck">
                                                <IconCheck
                                                    stroke={2}
                                                    style={{
                                                        width: "14px",
                                                        height: "auto",
                                                        color: "#fff",
                                                        paddingLeft: "2px",
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ),
                            )}
                        </Flex>
                    </div>
                ))}
            </Flex>
            <div className="mt-[20px]">
                <Flex direction="row" gap="lg" align="center">
                    <div>
                        <Button.Group>
                            <Button
                                variant="default"
                                onClick={decreaseQuantity}
                                disabled={
                                    filteredVariant
                                        ? filteredVariant.stock < 1
                                        : data.stock < 1
                                }
                            >
                                <IconMinus size={14} />
                            </Button>
                            <Button
                                variant="default"
                                className="!w-[60px] text-center"
                                style={{ color: "red" }}
                            >
                                {quantity}
                            </Button>
                            <Button
                                variant="default"
                                onClick={increaseQuantity}
                                disabled={
                                    filteredVariant
                                        ? filteredVariant.stock < 1
                                        : data.stock < 1
                                }
                            >
                                <IconPlus size={14} />
                            </Button>
                        </Button.Group>
                    </div>
                    <div>
                        <span style={{ color: "rgb(1 1 1)", fontSize: "13px" }}>
                            {filteredVariant
                                ? filteredVariant?.stock
                                : data.stock}{" "}
                            sản phẩm có sẵn
                        </span>
                    </div>
                </Flex>
                <Flex
                    direction="row"
                    w="100%"
                    style={{ marginTop: "10px" }}
                    gap="xl"
                >
                    {filteredVariant?.stock == 0 || data.stock == 0 ? (
                        <div style={{ width: "100%" }}>
                            <Badge
                                w="100%"
                                size="lg"
                                variant="filled"
                                color="#ccc"
                                style={{
                                    padding: "20px ",
                                }}
                                radius="xs"
                            >
                                Hết hàng
                            </Badge>
                        </div>
                    ) : (
                        <>
                            <div style={{ width: "50%" }}>
                                <Badge
                                    w="100%"
                                    size="lg"
                                    variant="gradient"
                                    gradient={{
                                        from: "rgba(5, 3, 2, 1)",
                                        to: "rgba(61, 61, 61, 1)",
                                        deg: 35,
                                    }}
                                    style={{
                                        padding: "20px ",
                                        cursor: "pointer",
                                    }}
                                    radius="xs"
                                    onClick={() => onhandleAddToCart("cart")}
                                >
                                    {isLoading ? (
                                        <Loader color="blue" size="xs" />
                                    ) : (
                                        "Thêm vào giỏ hàng"
                                    )}
                                </Badge>
                            </div>
                            <div style={{ width: "50%" }}>
                                <Badge
                                    w="100%"
                                    size="lg"
                                    variant="gradient"
                                    gradient={{
                                        from: "rgba(3, 0, 207, 1)",
                                        to: "cyan",
                                        deg: 35,
                                    }}
                                    radius="xs"
                                    style={{
                                        padding: "20px ",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => onhandleAddToCart("buy")}
                                >
                                    {isLoadingPaymentButton ? (
                                        <Loader color="#fff" size="xs" />
                                    ) : (
                                        "Mua ngay"
                                    )}{" "}
                                </Badge>
                            </div>
                        </>
                    )}
                </Flex>
            </div>
            <div className="my-[10px]">
                <WanrrantyTab />
            </div>
        </div>
    );
};

export default RightProduct;
