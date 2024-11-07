import { NotificationExtension } from "@/extension/NotificationExtension";
import { toTitleCase } from "@/model/_base/Text";
import { Badge, Button, Flex, Rating } from "@mantine/core";
import { IconCheck, IconMinus, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import "../../ProductDetail.scss";
import WanrrantyTab from "../WarrantyTab/WanrrantyTab";
type Props = {
    data: TypeProductDetail | undefined;
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
const RightProduct = ({ data }: Props) => {
    if (!data) return null;
    const [quantity, setQuantity] = useState(1);
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

    const attributes = ["Chất Liệu", "Màu Sắc", "Kích Thước"];
    // Lôi những thuộc tính và value thuộc tính có trong sản phẩm
    const uniqueAttributes: AttributeValues = attributes.reduce((acc, attr) => {
        const values = Array.from(
            new Set(
                data.variants.flatMap(
                    (variant: any) =>
                        variant.attributes
                            .filter(
                                (attribute: any) =>
                                    attribute.attribute === attr,
                            )
                            .map((attribute: any) => attribute.value), // Giả sử giá trị thuộc tính lưu trong `value`
                ),
            ),
        );
        acc[attr] = values;
        return acc;
    }, {} as AttributeValues);
    // xử lý khi chọn thuộc tính
    const handleAttributeSelect = (attribute: string, value: string) => {
        // setSelectedAttributes({
        //     ...selectedAttributes,
        //     [attribute]: value,
        // });
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
    console.log("data", data);
    console.log("selectedAttributes", selectedAttributes);
    console.log("filteredVariant", filteredVariant);
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
                    <Badge
                        size="lg"
                        radius="sm"
                        style={{ backgroundColor: "red" }}
                    >
                        -35%
                    </Badge>
                    <span className="current-price text-[#ef683a] text-[17px] font-bold">
                        {data?.discount_price}
                    </span>
                    <span className="original-price text-[#777a7b] text-[14px] ">
                        <del>{data?.price}</del>
                    </span>
                    {/* <span className="current-price text-[#ef683a] text-[17px] font-bold">
                        {filteredVariant
                            ? filteredVariant?.discount_price
                            : data?.discount_price}
                    </span>
                    <span className="original-price text-[#777a7b] text-[14px] ">
                        <del>
                            {filteredVariant
                                ? filteredVariant?.price
                                : data?.price}
                        </del>
                    </span> */}
                </Flex>
            </div>
            <Flex direction="column" gap="sm" className="product-attributes">
                {attributes.map((attribute) => (
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
                                >
                                    Thêm vào giỏ hàng
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
                                >
                                    Mua ngay
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

// const RightProduct = ({ data: product }: any) => {
//     const [selectedMaterial, setSelectedMaterial] = useState("");
//     const [selectedColor, setSelectedColor] = useState("");
//     console.log("data", product);
//     // Lấy tất cả giá trị unique của "Chất Liệu" và "Màu Sắc" từ dữ liệu
//     const materials = Array.from(
//         new Set(
//             product.variants.flatMap((variant: any) =>
//                 variant.attributes
//                     .filter(
//                         (attr: any) =>
//                             attr.attribute_value.attributes.name ===
//                             "Chất Liệu",
//                     )

//                     .map((attr: any) => attr.attribute_value.name),
//             ),
//         ),
//     );
//     console.log("materials", materials);
//     // Tìm các màu khả dụng dựa trên chất liệu đã chọn
//     const availableColorsForMaterial = selectedMaterial
//         ? Array.from(
//               new Set(
//                   product.variants
//                       .filter((variant: any) =>
//                           variant.attributes.some(
//                               (attr: any) =>
//                                   attr.attribute_value.attributes.name ===
//                                       "Chất Liệu" &&
//                                   attr.attribute_value.name ===
//                                       selectedMaterial,
//                           ),
//                       )
//                       .flatMap((variant: any) =>
//                           variant.attributes
//                               .filter(
//                                   (attr: any) =>
//                                       attr.attribute_value.attributes.name ===
//                                       "Màu Sắc",
//                               )
//                               .map((attr: any) => attr.attribute_value.name),
//                       ),
//               ),
//           )
//         : [];
//     console.log("availableColorsForMaterial", availableColorsForMaterial);
//     const colors = Array.from(
//         new Set(
//             product.variants.flatMap((variant: any) =>
//                 variant.attributes
//                     .filter(
//                         (attr: any) =>
//                             attr.attribute_value.attributes.name === "Màu Sắc",
//                     )
//                     .map((attr: any) => attr.attribute_value.name),
//             ),
//         ),
//     );
//     console.log("colors", colors);
//     // Lọc variant theo lựa chọn của người dùng
//     const filteredVariant = product.variants.find((variant: any) => {
//         const material = variant.attributes.find(
//             (attr: any) => attr.attribute_value.attributes.name === "Chất Liệu",
//         )?.attribute_value.name;
//         const color = variant.attributes.find(
//             (attr: any) => attr.attribute_value.attributes.name === "Màu Sắc",
//         )?.attribute_value.name;

//         return material === selectedMaterial && color === selectedColor;
//     });
//     console.log("filteredVariant", filteredVariant);
//     return (
//         <div>
//             <div>
//                 <h3>Chọn thuộc tính</h3>
//                 <div>
//                     <label>Chất Liệu: </label>
//                     <select
//                         value={selectedMaterial}
//                         onChange={(e) => {
//                             setSelectedMaterial(e.target.value);
//                             setSelectedColor(""); // Reset màu sắc khi thay đổi chất liệu
//                         }}
//                     >
//                         <option value="">Chọn Chất Liệu</option>
//                         {materials.map((material: any) => (
//                             <option key={material} value={material}>
//                                 {material}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label>Màu Sắc: </label>
//                     <select
//                         value={selectedColor}
//                         onChange={(e) => setSelectedColor(e.target.value)}
//                     >
//                         <option value="">Chọn Màu Sắc</option>
//                         {colors.map((color: any) => (
//                             <option
//                                 key={color}
//                                 value={color}
//                                 style={{
//                                     color: availableColorsForMaterial.includes(
//                                         color,
//                                     )
//                                         ? "red"
//                                         : "black",
//                                 }}
//                                 disabled={
//                                     !availableColorsForMaterial.includes(color)
//                                 }
//                             >
//                                 {color}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {filteredVariant ? (
//                     <div>
//                         <h4>Thông tin sản phẩm</h4>
//                         <p>SKU: {filteredVariant.sku}</p>
//                         <p>Giá: {filteredVariant.price}</p>
//                         <p>Giảm giá: {filteredVariant.discount_price}</p>
//                         <p>Tồn kho: {filteredVariant.stock}</p>
//                     </div>
//                 ) : (
//                     <p>Không tìm thấy sản phẩm với cặp thuộc tính đã chọn.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RightProduct;
