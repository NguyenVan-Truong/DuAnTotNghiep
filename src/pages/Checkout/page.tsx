import instance from "@/configs/axios";
import { CartItem } from "@/model/Cart";
import { formatCurrencyVN } from "@/model/_base/Number";
import {
    Button,
    Checkbox,
    Flex,
    ScrollArea,
    Select,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBuildingBank, IconCashBanknote } from "@tabler/icons-react";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DescriptionShipping from "./DescriptionShipping";
import styles from "./checkoutPage.module.scss"; // Import CSS module

type UserInfo = {
    id: number;
    username: string;
    full_name: string;
    email: string;
    phone: string;
    province_id: string;
    district_id: string;
    ward_id: string;
    address: string;
    birthday: string;
    avatar: string;
    description: string | null;
    user_agent: string | null;
    created_at: string;
    updated_at: string;
    rule_id: number;
    google_id: string | null;
    last_login: string | null;
    deleted_at: string | null;
    status: number;
    avatar_url: string;
};

const CheckoutPage = () => {
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
    // Phương thức thanh toán
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<Number>(3);
    const [inforUser, setInforfUser] = useState<UserInfo>();
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
                !value
                    ? "Email là bắt buộc"
                    : /^\S+@\S+$/.test(value)
                      ? null
                      : "Email phải đúng định dạng",
            name: (value) => (!value ? "Tên là bắt buộc" : null),
            sđt: (value) => (!value ? "Số điện thoại là bắt buộc" : null),
            city: (value) => (!value ? "Thành phố là bắt buộc" : null),
            district: (value) => (!value ? "Quận/Huyện là bắt buộc" : null),
            ward: (value) => (!value ? "Phường/Xã là bắt buộc" : null),
            address: (value) => (!value ? "Địa chỉ là bắt buộc" : null),
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
        const dataSubmit = {
            customer_id: inforUser?.id,
            customer_name: inforUser?.full_name,
            promotion_id: "id mã giảm giá ", //hỏi hoàn
            total_amount: location?.state.totalPrice,
            discount_amount: "phí giảm giá",
            shipping_fee: "phí ship",
            final_amount: "Tổng tiền trừ các chi phí",
            status: 1,
            payment_method_id: selectedPaymentMethod,
            payment_status: 1, //thanh toán off trạng thái là 1
            shipping_address: form.getValues().description,
            discount_code: "Mã code đã áp dụng", //chưa ai làm
            email: form.getValues().email,
            phone_number: form.getValues().sđt,
            note: form.getValues().description,
            order_items:[]
        };
        console.log("values", values);
        console.log("dataSubmit", dataSubmit);
    };
    const fetchDataUser = async () => {
        try {
            const response = await instance.get("/auth/profile");
            if (response && response.status === 200) {
                const data = response.data;
                setInforfUser(data);
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };
    useEffect(() => {
        fetchDataUser();
    }, []);
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
                                            {...form.getInputProps("sđt")}
                                            className="w-[50%]"
                                            type="number"
                                        />
                                        <Select
                                            withAsterisk
                                            label="Tỉnh/Thành phố"
                                            data={valueCity}
                                            placeholder="Nhập tỉnh/thành phố"
                                            className="w-[50%]"
                                            {...form.getInputProps("city")}
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
                                            {...form.getInputProps("district")}
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
                                                style={{
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    border:
                                                        selectedPaymentMethod ===
                                                        2
                                                            ? "1px solid #000"
                                                            : "1px solid #e5e5e5",
                                                }}
                                                onClick={() =>
                                                    setSelectedPaymentMethod(2)
                                                }
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
                                                style={{
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    border:
                                                        selectedPaymentMethod ===
                                                        3
                                                            ? "1px solid #000"
                                                            : "1px solid #e5e5e5",
                                                }}
                                                onClick={() =>
                                                    setSelectedPaymentMethod(3)
                                                }
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
                                                                {item.quantity}x
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
                                    <div className="flex flex-row justify-between mt-[5px]">
                                        <p>Vận chuyển</p>
                                        <p>0</p>
                                    </div>
                                    <div className="flex flex-row justify-between mt-[5px]">
                                        <p>Giảm giá</p>
                                        <p>0</p>
                                    </div>
                                    <div className="flex flex-row justify-between mt-[5px]">
                                        <h2
                                            className={`${styles.sectionTitle} text-[#000000] font-semibold`}
                                        >
                                            TỔNG CỘNG
                                        </h2>
                                        <p
                                            style={{
                                                color: "red",
                                            }}
                                        >
                                            {" "}
                                            0
                                        </p>
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
                                            color="rgba(71, 71, 71, 1)"
                                            className={styles.terms}
                                        />
                                        <div
                                            className={`${styles.submitButton} w-[100%] mt-2`}
                                        >
                                            <Button
                                                variant="filled"
                                                color="blue"
                                                type="submit"
                                                style={{ width: "100%" }}
                                            >
                                                HOÀN TẤT ĐƠN HÀNG
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
