import { NotificationExtension } from "@/extension/NotificationExtension";
import { Badge, Button, Flex, Rating, Tabs } from "@mantine/core";
import {
    IconMinus,
    IconPlus,
    IconTableSpark,
    IconTir,
} from "@tabler/icons-react";
import { useState } from "react";
import "../../ProductDetail.scss";
type Props = {
    data: any;
};
const RightProduct = ({ data }: Props) => {
    const [quantity, setQuantity] = useState(1);
    const [value, setValue] = useState({
        a: "",
        b: "",
    });
    console.log("data", data);
    const increaseQuantity = () => {
        if (quantity < 5) {
            setQuantity(quantity + 1);
        } else {
            console.log("không được vượt 5");
            NotificationExtension.Fails("Không được vượt quá 5 sản phẩm");
        }
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleChangeSearchValue = (value: string, key: string) => {
        setValue((prevData) => ({ ...prevData, [key]: value }));
    };
    return (
        <div className="product-details">
            <div className="product-header">
                <h2 className="product-title text-[20px] font-medium">
                    {data?.name}
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
                        {data?.discount_price}
                    </span>
                    <span className="original-price text-[#777a7b] text-[14px] ">
                        <del>{data?.price}</del>
                    </span>
                </Flex>
            </div>
            <Flex direction="column" gap="sm" className="product-attributes">
                <div>
                    <h4>Chất liệu</h4>
                    <Flex direction="row" gap="lg">
                        <Badge
                            variant="default"
                            color="rgba(5, 5, 5, 1)"
                            radius="xs"
                            size="lg"
                        >
                            Gỗ-kim loại
                        </Badge>{" "}
                        <Badge
                            variant="default"
                            color="rgba(5, 5, 5, 1)"
                            radius="xs"
                            size="lg"
                        >
                            Gỗ-Nhôm
                        </Badge>
                    </Flex>
                </div>
                <div>
                    <h4>Màu sắc</h4>
                    <Flex direction="row" gap="lg">
                        <Badge
                            radius="xs"
                            size="lg"
                            color={
                                value?.a === "go"
                                    ? "rgba(0, 17, 94, 1)"
                                    : "rgba(5, 5, 5, 1)"
                            }
                            variant={value?.a === "go" ? "filled" : "default"}
                            onClick={() => handleChangeSearchValue("go", "a")}
                            style={{ cursor: "pointer" }}
                        >
                            Màu gỗ tự nhiên
                        </Badge>{" "}
                        <Badge
                            variant={
                                value?.a === "gonau" ? "filled" : "default"
                            }
                            color={
                                value?.a === "gonau"
                                    ? "rgba(0, 17, 94, 1)"
                                    : "rgba(5, 5, 5, 1)"
                            }
                            radius="xs"
                            size="lg"
                            onClick={() =>
                                handleChangeSearchValue("gonau", "a")
                            }
                            style={{ cursor: "pointer" }}
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
            <div className="mt-[20px]">
                <Flex direction="row" gap="lg" align="center">
                    <div>
                        <Button.Group>
                            <Button
                                variant="default"
                                onClick={decreaseQuantity}
                            >
                                <IconMinus size={14} />
                            </Button>
                            <Button
                                variant="default"
                                className="!w-[60px] text-center"
                            >
                                {quantity}
                            </Button>
                            <Button
                                variant="default"
                                onClick={increaseQuantity}
                            >
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
                            style={{ padding: "20px ", cursor: "pointer" }}
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
                            style={{ padding: "20px ", cursor: "pointer" }}
                            radius="xs"
                        >
                            Thêm vào giỏ hàng
                        </Badge>
                    </div>
                </Flex>
            </div>
            <div className="my-[10px]">
                <Tabs defaultValue="gallery">
                    <Tabs.List>
                        <Tabs.Tab
                            value="gallery"
                            leftSection={<IconTableSpark />}
                        >
                            Bảo hành
                        </Tabs.Tab>
                        <Tabs.Tab value="messages" leftSection={<IconTir />}>
                            Vận chuyển
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="gallery">
                        <div className="warranty-content">
                            <ul>
                                <li>
                                    Các sản phẩm nội thất tại Mordren Home đa số
                                    đều được sản xuất tại nhà máy của công ty cổ
                                    phần xây dựng kiến trúc AA với đội ngũ nhân
                                    viên và công nhân ưu tú cùng cơ sở vật chất
                                    hiện đại (http://www.aacorporation.com/).
                                    Mordren Home đã kiểm tra kỹ lưỡng từ nguồn
                                    nguyên liệu cho đến sản phẩm hoàn thiện cuối
                                    cùng.
                                </li>
                                <li>
                                    Mordren Home bảo hành một năm cho các trường
                                    hợp có lỗi về kỹ thuật trong quá trình sản
                                    xuất hay lắp đặt.
                                </li>
                                <li>
                                    Quý khách không nên tự sửa chữa mà hãy báo
                                    ngay cho Nhà Xinh qua hotline: 1800 7200.
                                </li>
                                <li>
                                    Sau thời gian hết hạn bảo hành, nếu quý
                                    khách có bất kỳ yêu cầu hay thắc mắc thì vui
                                    lòng liên hệ với Nhà Xinh để được hướng dẫn
                                    và giải quyết các vấn đề gặp phải.
                                </li>
                            </ul>
                            <p>
                                TUY NHIÊN Mordren Home KHÔNG BẢO HÀNH CHO CÁC
                                TRƯỜNG HỢP SAU:
                            </p>
                            <ul>
                                <li>
                                    Khách hàng tự ý sửa chữa khi sản phẩm bị
                                    trục trặc mà không báo cho Mordren Home.
                                </li>
                                <li>
                                    Sản phẩm được sử dụng không đúng quy cách
                                    của sổ bảo hành (được trao gửi khi quý khách
                                    mua sản phẩm) gây nên trầy xước, móp, dơ bẩn
                                    hay mất màu.
                                </li>
                                <li>
                                    Sản phẩm bị biến dạng do môi trường bên
                                    ngoài bất bình thường (quá ẩm, quá khô, mối
                                    hay do tác động từ các thiết bị điện nước,
                                    các hóa chất hay dung môi khách hàng sử dụng
                                    không phù hợp).
                                </li>
                                <li>Sản phẩm hết hạn bảo hành.</li>
                                <li>
                                    Sản phẩm không có phiếu bảo hành của Mordren
                                    Home.
                                </li>
                                <li>Xem nội dung sổ bảo hành</li>
                            </ul>
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="messages">
                        <div className="shipping-content">
                            <ul>
                                <li>
                                    Mordren Home cung cấp dịch vụ giao hàng tận
                                    nơi, lắp ráp và sắp xếp vị trí theo đúng ý
                                    muốn của quý khách:
                                </li>
                                <li>
                                    MIỄN PHÍ giao hàng trong các Quận nội thành
                                    Tp.Hồ Chí Minh và Hà Nội, áp dụng cho các
                                    đơn hàng trị giá trên 10 triệu.
                                </li>
                                <li>
                                    Đối với khu vực các tỉnh lân cận: Tính phí
                                    hợp lý theo dựa trên quãng đường vận chuyển
                                </li>
                            </ul>
                        </div>
                    </Tabs.Panel>
                </Tabs>
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
