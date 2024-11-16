import instance from "@/configs/axios";
import { NotificationExtension } from "@/extension/NotificationExtension";
import { formatCurrencyVN } from "@/model/_base/Number";
import { CartItem } from "@/model/Cart";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Grid,
    GridCol,
    LoadingOverlay,
    Text,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Style from "./ShoppingCart.module.scss";
import { IconShoppingCart } from "@tabler/icons-react";
const ShoppingCart = () => {
    const [data, setData] = useState<any>([]);
    const [debouncedQuantity, setDebouncedQuantity] = useDebouncedState<
        number | null
    >(null, 400); // Sử dụng hook debounced state để giảm số lần gọi API
    const [debouncedId, setDebouncedId] = useState<number | null>();
    const [debouncedName, setDebouncedName] = useState<string | null>();
    const [isLoading, setisLoading] = useState(false);
    //   tỔNG TIỀN
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const fetchData = async () => {
        setisLoading(true);
        try {
            const response = await instance.get("/cart");
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            NotificationExtension.Fails("Đã xảy ra lỗi khi lấy dữ liệu");
        } finally {
            setisLoading(false);
        }
    };

    const handleQuantityChange = (
        id: number,
        type: "increase" | "decrease",
    ) => {
        setData((prevData: any) =>
            prevData.map((item: CartItem) => {
                if (item.id === id) {
                    const newQuantity =
                        type === "increase"
                            ? item.quantity + 1
                            : item.quantity - 1;
                    if (newQuantity < 1) {
                        const openModal = () =>
                            modals.openConfirmModal({
                                title: "Bạn chắc chắn muốn bỏ sản phẩm này?",
                                children: (
                                    <Text size="lg">{debouncedName}</Text>
                                ),
                                labels: { confirm: "Xác nhận", cancel: "Hủy" },
                                // onCancel: () => console.log("Hủy bỏ"),
                                onConfirm: () => {},
                                classNames: {
                                    title: "my-custom-modal-title",
                                    body: "my-custom-modal-body",
                                    header: "my-custom-modal-header",
                                },
                            });
                        openModal();
                        return item;
                    }
                    setDebouncedQuantity(newQuantity);
                    setDebouncedId(id);
                    setDebouncedName(item.product.name);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }),
        );
    };

    // Xóa sản phẩm
    const handleDeleteProduct = async (id: number) => {
        console.log("id", id);
        try {
            const response = await instance.delete(`/cart/${id}`);
            console.log("response", response);
        } catch (error) {
            message.error("Đã xảy ra lỗi khi xóa sản phẩm");
        }
    };
    useEffect(() => {
        if (debouncedQuantity !== null && debouncedQuantity >= 1) {
            const updateQuantity = async () => {
                try {
                    await instance.put(`/cart/${debouncedId}`, {
                        quantity: debouncedQuantity,
                    });
                } catch (error) {
                    message.error("Đã xảy ra lỗi khi cập nhật số lượng");
                }
            };
            updateQuantity();
        }
    }, [debouncedQuantity]);
    useEffect(() => {
        fetchData();
    }, []);
    // Tính tổng số lượng và tổng tiền
    useEffect(() => {
        if (data?.length > 0) {
            const total = data.reduce(
                (acc: any, item: CartItem) => {
                    acc.totalQuantity += item.quantity;
                    acc.totalPrice +=
                        Number(item.product_variant.discount_price) *
                        Number(item.quantity);
                    return acc;
                },
                { totalQuantity: 0, totalPrice: 0 },
            );
            setTotalPrice(total.totalPrice);
        }
    }, [data]);

    return (
        <div
            className="container mx-auto padding"
            style={{
                marginTop: "10px",
                marginBottom: "30px",
            }}
        >
            <div className={Style.Main}>
                <LoadingOverlay
                    visible={isLoading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 2 }}
                />

                <div className={Style.Left}>
                    <Flex direction="row" justify={"space-between"}>
                        <h1 className={Style.Title}>
                            Giỏ Hàng
                            <span className={Style.Total_count}>
                                {data.length}
                            </span>
                        </h1>
                        <Button variant="filled" color="red" disabled>
                            Xóa{" "}
                        </Button>
                    </Flex>
                    {data?.map((item: CartItem) => {
                        return (
                            <Flex
                                direction={"row"}
                                justify={"space-between"}
                                className="border-b-2 border-b-gray-200"
                            >
                                <div
                                    className="flex "
                                    style={{
                                        alignItems: "start",
                                    }}
                                >
                                    <div
                                        style={{
                                            marginTop: "35px",
                                        }}
                                    >
                                        <Checkbox
                                            defaultChecked
                                            style={{
                                                marginTop: "10px",
                                            }}
                                        />
                                    </div>
                                    <div className="">
                                        <img
                                            src={item.product.image_url}
                                            alt=""
                                            style={{
                                                padding: "10px",
                                                maxHeight: "110px",
                                                minHeight: "110px",
                                                minWidth: "130px",
                                                maxWidth: "130px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                    <div className={Style.Content}>
                                        <div className={Style.Content_Title}>
                                            <h4
                                                style={{
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                    marginTop: "5px",
                                                }}
                                            >
                                                {item.product.name}
                                            </h4>
                                        </div>

                                        <Flex
                                            direction="row"
                                            style={{
                                                margin: "5px 0",
                                            }}
                                            align={"center"}
                                        >
                                            <span
                                                className={Style.Content_Price}
                                            >
                                                {formatCurrencyVN(
                                                    item.product_variant
                                                        .discount_price,
                                                )}
                                            </span>
                                            <p
                                                style={{
                                                    color: "#333",
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    marginLeft: "10px",
                                                    marginTop: "-5px",
                                                }}
                                            >
                                                Thuộc tính
                                            </p>
                                        </Flex>

                                        <div className={Style.Content_Button}>
                                            <div
                                                className={
                                                    Style.Content_Button_Quantity
                                                }
                                            >
                                                <button
                                                    className={Style.Button}
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            "decrease",
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    className={Style.quantity}
                                                    disabled
                                                />

                                                <button
                                                    className={Style.Button}
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            "increase",
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column-reverse",
                                    }}
                                >
                                    {/* tổng tiền của 1 sản phẩm */}
                                    <p
                                        style={{
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {formatCurrencyVN(
                                            String(
                                                Number(
                                                    item.product_variant
                                                        .discount_price,
                                                ) * Number(item.quantity),
                                            ),
                                        )}
                                    </p>
                                </div>
                            </Flex>
                        );
                    })}
                </div>
                <div className={Style.Right}>
                    <div className={Style.Right_Container}>
                        <Box
                            c="blue.6"
                            bg="#fff"
                            my="xl"
                            style={{
                                borderRadius: "10px",
                                boxShadow: "0 0 10px 0 rgba(0,0,0,.1)",
                                padding: "20px",
                            }}
                        >
                            <div
                                style={{
                                    marginBottom: "5px",
                                }}
                            >
                                <span className={Style.Right_Title}>
                                    Thông tin đơn hàng
                                </span>
                            </div>
                            <Flex
                                direction="row"
                                style={{
                                    color: "#333",
                                }}
                                justify={"space-between"}
                                align={"center"}
                            >
                                <p
                                    style={{
                                        fontSize: "16px",
                                    }}
                                >
                                    Tổng tiền
                                </p>
                                <p>{formatCurrencyVN(String(totalPrice))}</p>
                            </Flex>
                            <div
                                style={{
                                    marginTop: "10px",
                                }}
                            >
                                <Button
                                    variant="filled"
                                    color="red"
                                    style={{
                                        width: "100%",
                                        fontSize: "16px",
                                    }}
                                >
                                    THANH TOÁN
                                </Button>
                                <Link to={"/san-pham"}>
                                    <Button
                                        variant="outline"
                                        color="gray"
                                        style={{
                                            width: "100%",
                                            fontSize: "16px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        Tiếp tục mua hàng
                                    </Button>
                                </Link>
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
            <div
                style={{
                    position: "relative",
                }}
            >
                <Grid>
                    <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                        <Flex direction="column" justify={"center"}>
                            <div>
                                <IconShoppingCart stroke={2} />
                            </div>
                            <div>
                                <p>Giao hàng và lắp đặt</p>
                            </div>
                            <div>
                                <p>Miễn phí</p>
                            </div>
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                        <Flex direction="column" justify={"center"}>
                            <div>
                                <IconShoppingCart stroke={2} />
                            </div>
                            <div>
                                <p>Giao hàng và lắp đặt</p>
                            </div>
                            <div>
                                <p>Miễn phí</p>
                            </div>
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                        <Flex direction="column" justify={"center"}>
                            <div>
                                <IconShoppingCart stroke={2} />
                            </div>
                            <div>
                                <p>Giao hàng và lắp đặt</p>
                            </div>
                            <div>
                                <p>Miễn phí</p>
                            </div>
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, md: 4, lg: 3 }}>
                        <Flex direction="column" justify={"center"}>
                            <div>
                                <IconShoppingCart stroke={2} />
                            </div>
                            <div>
                                <p>Giao hàng và lắp đặt</p>
                            </div>
                            <div>
                                <p>Miễn phí</p>
                            </div>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
};

export default ShoppingCart;
