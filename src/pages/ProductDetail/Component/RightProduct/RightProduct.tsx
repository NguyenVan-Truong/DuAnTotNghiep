import { Badge, Button, Flex, Indicator, Rating, Tabs } from "@mantine/core";
import {
    IconMinus,
    IconPlus,
    IconTableSpark,
    IconTir,
} from "@tabler/icons-react";
import { useState } from "react";
import "../../ProductDetail.scss";

const RightProduct = () => {
    // count
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    return (
        <div className="product-details">
            <div className="product-header">
                <h2 className="product-title text-[20px] font-medium">
                    Giường Ngủ Gỗ Tràm MOHO VLINE 601 Nhiều Kích Thước
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
                        1.200.000đ
                    </span>
                    <span className="original-price text-[#777a7b] text-[14px] ">
                        <del>1.500.000đ</del>
                    </span>
                </Flex>
            </div>
            <Flex direction="column" gap="sm" className="product-attributes">
                <div>
                    <h4>Chất liệu</h4>
                    <Flex direction="row" gap="lg">
                        <Indicator
                            style={{
                                zIndex: 10,
                            }}
                            withBorder
                            processing
                        >
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
