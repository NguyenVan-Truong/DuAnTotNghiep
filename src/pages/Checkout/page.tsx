import { CartItem } from "@/model/Cart";
import { formatCurrencyVN } from "@/model/_base/Number";
import {
    Button,
    Checkbox,
    Flex,
    Group,
    Radio,
    ScrollArea,
    Select,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBuildingBank, IconCashBanknote } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import DescriptionShipping from "./DescriptionShipping";
import styles from "./checkoutPage.module.scss"; // Import CSS module
import instance from "@/configs/axios";
import { useState } from "react";
import { message } from "antd";

type Props = {};

const CheckoutPage = (props: Props) => {
    const location = useLocation();
    // thông tin tỉnh thành phố
    const [valueCity, setValueCity] = useState([]);
    const [checkedValueCity, setCheckedValueCity] = useState();
    // thông tin quận huyện
    const [valueDistrict, setValueDistrict] = useState([]);
    const [checkedValueDistrict, setCheckedValueDistrict] = useState();
    // thông tin phường xã
    const [valueWard, setValueWard] = useState([]);
    const [checkedValueWard, setCheckedValueWard] = useState();
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            name: "",
            sđt: "",
            city: null,
            district: null,
            ward: null,
            address: "",
            description: "",
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
        },
    });
    // CHọn tỉnh
    const onhandleSelectCity = async () => {
        try {
            const response = await instance.get("/getAllProvinces");
            if (response && response.status === 200) {
                // setValueCity(response.data.content);
                const transformedData = response.data.content.map(
                    (item: any) => ({
                        value: item.code,
                        label: item.name,
                    }),
                );
                setValueCity(transformedData);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };
    // Chọn quận huyện
    const onhandleSelectDistrict = async () => {
        try {
            const response = await instance.get(
                `/getLocaion?target=district&data[province_id]=${checkedValueCity}`,
            );
            if (response && response.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                    response.data.content,
                    "text/html",
                );

                // Lấy tất cả các phần tử <option>
                const options = Array.from(doc.querySelectorAll("option"));
                // Chuyển đổi thành mảng các đối tượng với code và name
                const transformedData = options.map((option) => ({
                    value: option.value,
                    label: option.text.trim(),
                }));
                setValueDistrict(transformedData as []);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };
    // Chọn phường xã
    const onhandleSelectWart = async () => {
        try {
            const response = await instance.get(
                `/getLocaion?target=ward&data[district_id]=${checkedValueDistrict}`,
            );
            if (response && response.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                    response.data.content,
                    "text/html",
                );

                // Lấy tất cả các phần tử <option>
                const options = Array.from(doc.querySelectorAll("option"));
                // Chuyển đổi thành mảng các đối tượng với code và name
                const transformedData = options.map((option) => ({
                    value: option.value,
                    label: option.text.trim(),
                }));
                setValueWard(transformedData as []);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };

    // Xử lý submit form
    const onhandleSubmit = async (values: any) => {
        console.log("values", values);
    };
    return (
        <div className="padding my-[40px]">
            <div className="container">
                <div className={styles.checkoutForm}>
                    <div className={styles.container}>
                        <form
                            onSubmit={form.onSubmit((values) =>
                                onhandleSubmit(values),
                            )}
                        >
                            <Flex
                                direction="row"
                                className={styles.checkoutMain}
                            >
                                <div className={styles.leftCheckout}>
                                    <div>
                                        <h2
                                            className={`${styles.sectionTitle} font-medium pt-[10px] text-[20px] mb-[10px]`}
                                        >
                                            ĐỊA CHỈ GIAO HÀNG
                                        </h2>
                                    </div>
                                    <div
                                        className={`${styles.inputGroup} flex w-[100%] justify-between gap-3 mb-[10px] `}
                                    >
                                        <TextInput
                                            withAsterisk
                                            label="Họ và tên"
                                            placeholder="Nhập họ và tên"
                                            {...form.getInputProps("name")}
                                            className="w-[50%]"
                                        />
                                        <TextInput
                                            withAsterisk
                                            label="Email"
                                            placeholder="Nhập email"
                                            {...form.getInputProps("email")}
                                            className="w-[50%]"
                                        />
                                    </div>
                                    <div
                                        className={`${styles.inputGroup} flex w-[100%] justify-between gap-3 mb-[10px] `}
                                    >
                                        <TextInput
                                            withAsterisk
                                            label="Số điện thoại"
                                            placeholder="Nhập họ và tên"
                                            {...form.getInputProps("name")}
                                            className="w-[50%]"
                                        />
                                        <Select
                                            withAsterisk
                                            label="Tỉnh/Thành phố"
                                            data={valueCity}
                                            placeholder="Nhập tỉnh/thành phố"
                                            className="w-[50%]"
                                            onClick={() => {
                                                if (valueCity.length === 0) {
                                                    onhandleSelectCity();
                                                }
                                            }}
                                            onChange={(value: any) => {
                                                form.setFieldValue(
                                                    "city",
                                                    value,
                                                );
                                                setCheckedValueCity(value);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className={`${styles.inputGroup} flex w-[100%] justify-between gap-3 mb-[10px] `}
                                    >
                                        <Select
                                            withAsterisk
                                            label="Quận / Huyện"
                                            placeholder="Nhập quận/huyện"
                                            data={valueDistrict}
                                            className="w-[50%]"
                                            onClick={() => {
                                                if (
                                                    valueCity.length === 0 ||
                                                    !checkedValueCity
                                                ) {
                                                    return message.error(
                                                        "Vui lòng chọn tỉnh/thành phố trước",
                                                    );
                                                }
                                                if (
                                                    valueDistrict.length === 0
                                                ) {
                                                    onhandleSelectDistrict();
                                                }
                                            }}
                                            onChange={(value: any) => {
                                                form.setFieldValue(
                                                    "district",
                                                    value,
                                                );
                                                setCheckedValueDistrict(value);
                                            }}
                                        />
                                        <Select
                                            withAsterisk
                                            label="Phường/Xã"
                                            placeholder="Nhập phường/xã"
                                            data={valueWard}
                                            {...form.getInputProps("ward")}
                                            className="w-[50%]"
                                            onClick={() => {
                                                if (
                                                    valueDistrict.length ===
                                                        0 ||
                                                    !checkedValueDistrict
                                                ) {
                                                    return message.error(
                                                        "Vui lòng chọn quận huyện trước",
                                                    );
                                                }
                                                if (valueWard.length === 0) {
                                                    onhandleSelectWart();
                                                }
                                            }}
                                            onChange={(value: any) => {
                                                form.setFieldValue(
                                                    "ward",
                                                    value,
                                                );
                                                setCheckedValueWard(value);
                                            }}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <TextInput
                                            withAsterisk
                                            label="Địa chỉ cụ thể"
                                            placeholder="Nhập địa chỉ"
                                            {...form.getInputProps("address")}
                                        />
                                    </div>
                                    {/* <div className="mb-[10px]">
                                        <Checkbox
                                            mt="md"
                                            label="Tạo tài khoản?"
                                            {...form.getInputProps(
                                                "termsOfService",
                                                {
                                                    type: "checkbox",
                                                },
                                            )}
                                        />
                                    </div> */}
                                    <div>
                                        <h2
                                            className={`${styles.sectionTitle} font-medium pt-[10px] text-[20px] mb-[10px]`}
                                        >
                                            THÔNG TIN THÊM
                                        </h2>

                                        <div
                                            className={`mt-[10px] ${styles.textDescription}`}
                                        >
                                            <Textarea
                                                label="Lưu ý cho đơn hàng (Tùy chọn)"
                                                placeholder="Viết lưu ý cho đơn hàng của bạn"
                                                {...form.getInputProps(
                                                    "description",
                                                )}
                                                styles={{
                                                    input: {
                                                        height: "100px", // Custom height for the textarea
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className={styles.sectionTitle}>
                                            PHƯƠNG THỨC THANH TOÁN
                                        </h2>
                                        <Flex className={styles.paymentMethod}>
                                            <div
                                                className="px-[20px] py-[20px] flex flex-col border border-spacing-1 mr-[10px] "
                                                style={{ alignItems: "center" }}
                                            >
                                                <IconBuildingBank
                                                    stroke={1.25}
                                                    size={50}
                                                />

                                                <span className="text-[12px] text-[#656565]">
                                                    Chuyển khoản ngân hàng
                                                </span>
                                            </div>
                                            <div
                                                className="px-[20px] py-[20px] flex flex-col border border-spacing-1"
                                                style={{ alignItems: "center" }}
                                            >
                                                <IconCashBanknote
                                                    stroke={1.25}
                                                    size={50}
                                                />
                                                <span className="text-[12px] text-[#656565]">
                                                    Thanh toán khi nhận hàng
                                                </span>
                                            </div>
                                        </Flex>
                                    </div>
                                </div>

                                <div
                                    className={`${styles.rightCheckout} px-[30px] py-[30px] text-[14px] border-[1px] `}
                                >
                                    <div className=" border-b-[1px] pb-[5px]">
                                        <div>
                                            <h2
                                                className={`${styles.sectionTitle} text-[24px] text-[#000] font-medium `}
                                            >
                                                Tóm tắt đơn hàng
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="mt-[5px]">
                                        <div>
                                            <h2 className="text-[16px] text-[#000] font-medium">
                                                Sản phẩm
                                            </h2>
                                        </div>
                                        <div>
                                            {location?.state.listchecked.map(
                                                (item: CartItem) => {
                                                    return (
                                                        <div
                                                            className={`${styles.productDetails} flex flex-row justify-between gap-3 items-center my-[9px]`}
                                                            key={item.id}
                                                        >
                                                            <div
                                                                className={`${styles.imgwp} `}
                                                            >
                                                                <img
                                                                    src={
                                                                        item
                                                                            .product
                                                                            .image_url
                                                                    }
                                                                    alt="Product"
                                                                    className="max-w-[70px] max-h-[70px]"
                                                                />
                                                            </div>
                                                            <Flex
                                                                direction={
                                                                    "column"
                                                                }
                                                            >
                                                                <p>
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p
                                                                    style={{
                                                                        color: "#333",
                                                                        fontSize:
                                                                            "14px",
                                                                        fontWeight:
                                                                            "400",

                                                                        marginTop:
                                                                            "-5px",
                                                                    }}
                                                                >
                                                                    {item.product_variant.attribute_values
                                                                        .map(
                                                                            (
                                                                                item: any,
                                                                            ) =>
                                                                                item.name,
                                                                        )
                                                                        .join(
                                                                            ", ",
                                                                        )}
                                                                </p>
                                                            </Flex>
                                                            <strong>
                                                                x{item.quantity}
                                                            </strong>
                                                            <p
                                                                className={
                                                                    styles.productPrice
                                                                }
                                                            >
                                                                {formatCurrencyVN(
                                                                    item
                                                                        .product_variant
                                                                        .discount_price,
                                                                )}
                                                            </p>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between mt-[5px]">
                                        <p>Tạm tính</p>
                                        <p>
                                            {formatCurrencyVN(
                                                location?.state.totalPrice,
                                            )}
                                        </p>
                                    </div>
                                    <div className="mt-[5px] border-b-[1px] pb-[10px]">
                                        <h2
                                            className={`${styles.sectionTitle} text-[#7b7b7b] font-semibold text-[16px]`}
                                        >
                                            VẬN CHUYỂN
                                        </h2>
                                        <Radio.Group name="favoriteFramework">
                                            <Group mt="xs">
                                                <Radio
                                                    value="react"
                                                    label="Liên hệ phí vận chuyển sau"
                                                />
                                                <Radio
                                                    value="svelte"
                                                    label="Phí vận chuyển"
                                                />
                                            </Group>
                                        </Radio.Group>
                                    </div>
                                    <div className="flex flex-row justify-between mt-[5px]">
                                        <h2
                                            className={`${styles.sectionTitle} text-[#7b7b7b] font-semibold`}
                                        >
                                            TỔNG CỘNG
                                        </h2>
                                        <p>23,630,000đ</p>
                                    </div>

                                    <div className="my-[7px] py-3">
                                        <ScrollArea h={200} type="always">
                                            <DescriptionShipping />
                                        </ScrollArea>
                                    </div>
                                    <div className="mt-[20px]">
                                        <Checkbox
                                            defaultChecked
                                            label="Tôi đã đọc và đồng ý điều kiện đổi trả hàng, giao hàng, chính sách bảo mật, điều khoản dịch vụ mua hàng online **"
                                            color="rgba(0, 0, 0, 1)"
                                            className={styles.terms}
                                        />
                                        <div
                                            className={`${styles.submitButton} w-[100%] mt-2`}
                                        >
                                            <Button
                                                variant="filled"
                                                color="rgba(0, 0, 0, 1)"
                                                type="submit"
                                                style={{ width: "100%" }}
                                            >
                                                ĐẶT MUA
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Flex>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
