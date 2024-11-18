import instance from "@/configs/axios";
import { CartItem } from "@/model/Cart";
import { formatCurrencyVN } from "@/model/_base/Number";
import {
    Button,
    Checkbox,
    Flex,
    Loader,
    Modal,
    ScrollArea,
    Select,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBuildingBank, IconCashBanknote } from "@tabler/icons-react";
import { message } from "antd";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import DescriptionShipping from "./DescriptionShipping";
import styles from "./checkoutPage.module.scss"; // Import CSS module
import { modals } from "@mantine/modals";

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
export interface Promotion {
    id: number;
    code: string;
    discount_value: string; // Giá trị giảm giá (sử dụng string vì dữ liệu đầu vào là string)
    discount_type: "fixed" | "percentage"; // Loại giảm giá: cố định hoặc theo phần trăm
    status: "active" | "inactive"; // Trạng thái mã giảm giá
    start_date: string; // Ngày bắt đầu (ISO format)
    end_date: string; // Ngày kết thúc (ISO format)
    max_uses: number; // Số lần sử dụng tối đa
    used_count: number; // Số lần đã sử dụng
    created_at: string; // Thời gian tạo (ISO format)
    updated_at: string; // Thời gian cập nhật (ISO format)
    deleted_at: string | null; // Thời gian xóa, có thể null
}

const CheckoutPage = () => {
    const location = useLocation();
    if (!location.state) {
        return <Navigate to="/san-pham" replace />;
    }
    const navigate = useNavigate();
    //Sản phẩm order
    const [orderItems, setOrderItems] = useState<[]>([]);
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
    // Thông tin người dùng
    const [inforUser, setInforfUser] = useState<UserInfo>();
    // Phí ship
    const [shippingFee, setShippingFee] = useState<number>(0);
    // Mã giảm giá
    const [dataPromotions, setDataPromotions] = useState([]);
    const [valuePromotions, setValuePromotions] = useState<string>();
    const [dataAllPromotions, setDataAllPromotions] = useState([]);
    const [checkedPromotions, setCheckedPromotions] = useState<Promotion>();
    // Tiền cuối cùng
    const [finalAmount, setFinalAmount] = useState<number>(0);
    // LAODING KHI SUBMIT
    const [loading, setLoading] = useState(false);
    // checkked
    const [checked, setChecked] = useState(false);
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
    //#region callorder
    // Xử lý submit form
    const onhandleSubmit = async (values: any) => {
        const dataSubmit = {
            customer_id: inforUser?.id,
            customer_name: values?.name,
            promotion_id: checkedPromotions?.id, //hỏi hoàn
            total_amount: location?.state.totalPrice,
            discount_amount: Number(checkedPromotions?.discount_value), //chưa ai làm
            shipping_fee: shippingFee || 0,
            final_amount: finalAmount,
            status: 1,
            payment_method_id: selectedPaymentMethod, //phương thức thanh toán
            payment_status: 1, //thanh toán off trạng thái là 1
            shipping_address: values.address || "",
            discount_code: checkedPromotions?.code, //chưa ai làm
            email: values.email,
            phone_number: values.sđt,
            note: values.description,
            order_items: orderItems,
            // cart_id:"1,2,3", Thêm trường này
        };
        if (dataSubmit) {
            if (!checked) {
                return message.error(
                    "Vui lòng đọc và đồng ý điều khoản của chúng tôi",
                );
            }
            setLoading(true);
            try {
                const response = await instance.post("/orders", dataSubmit);
                if (response && response.status === 201) {
                    // location.state = null;
                    modals.openConfirmModal({
                        title: (
                            <Title
                                order={4}
                                style={{
                                    marginLeft: "6px",
                                }}
                            >
                                Cảm ơn bạn đã đặt hàng tại Morden Home
                            </Title>
                        ),
                        size: "400px",
                        centered: true, // Căn giữa modal
                        withCloseButton: false, // Ẩn nút "x"
                        closeOnClickOutside: false, // Không đóng khi click ra ngoài
                        children: (
                            <>
                                <div style={{ textAlign: "center" }}>
                                    {" "}
                                    {/* Căn giữa nội dung */}
                                    <p>Đơn hàng đã đặt thành công</p>
                                </div>
                                <Flex
                                    direction={"row"}
                                    justify={"space-evenly"}
                                    style={{
                                        marginTop: "20px",
                                    }}
                                >
                                    <Button
                                        style={{
                                            minWidth: "150px",
                                        }}
                                        variant="light"
                                        onClick={() => {
                                            modals.closeAll();
                                            navigate("/nguoi-dung/don-hang", {
                                                replace: true,
                                            });
                                        }}
                                    >
                                        Xem đơn hàng
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            modals.closeAll();
                                            navigate("/san-pham", {
                                                replace: true,
                                            });
                                        }}
                                        style={{
                                            minWidth: "150px",
                                        }}
                                        variant="filled"
                                    >
                                        Tiếp tục mua hàng{" "}
                                    </Button>
                                </Flex>
                            </>
                        ),
                        confirmProps: { display: "none" },
                        cancelProps: { display: "none" },
                        classNames: {
                            header: "custom-modal-header", // Tên class cho header
                            root: "custom-modal-root", // Tên class cho modal
                            title: "custom-modal-title", // Tên class cho tiêu đề
                            body: "custom-modal-body", // Tên class cho phần nội dung
                        },
                    });
                }
            } catch (error) {
                message.error("Lỗi không thể đặt hàng");
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        }
    };

    // lấy thông tin user
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
    // Hàm lấy phí vận chuyển
    const getShippingFee = async () => {
        try {
            const response = await instance.get("/shipping-fees");
            if (response.status === 200) {
                return response.data;
            }
            console.warn("Unexpected response:", response);
            return [];
        } catch (error) {
            console.error("Error fetching shipping fee", error);
            return [];
        }
    };
    //lấy mã giảm giá
    const onhandlePromotions = async () => {
        try {
            const response = await instance.get("/promotions");
            if (response && response.status === 200) {
                setDataAllPromotions(response.data);
                const transformedData = response.data.map((item: any) => ({
                    value: String(item.id),
                    label: item.code,
                }));
                setDataPromotions(transformedData);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            if (checkedValueCity !== undefined && checkedValueCity !== null) {
                const data = await getShippingFee(); // Đợi dữ liệu từ API

                // Xử lý logic tìm kiếm phí vận chuyển
                const shippingFee = data.find((item: any) => {
                    return item.province_code === String(checkedValueCity);
                });

                if (shippingFee) {
                    setShippingFee(shippingFee.fee);
                } else {
                    console.warn(
                        "No shipping fee found for the selected city.",
                    );
                }
            } else {
                setShippingFee(0);
            }
        };

        fetchData(); // Gọi hàm bất đồng bộ
    }, [checkedValueCity, checkedValueCity]);

    useEffect(() => {
        fetchDataUser();
        const orderItems = location?.state.listchecked.map((item: any) => {
            return {
                product_id: item.product_id,
                product_name: item.product.name,
                quantity: item.quantity,
                price: parseFloat(item.product_variant.price),
                total: item.quantity * parseFloat(item.product_variant.price),
                variant: JSON.stringify(
                    item.product_variant.attribute_values.reduce(
                        (acc: any, attr: any) => {
                            acc[attr.attributes.name] = attr.name;
                            return acc;
                        },
                        {},
                    ),
                ),
            };
        });
        setOrderItems(orderItems);
    }, []);
    // MÃ GIẢM GIÁ
    useEffect(() => {
        if (valuePromotions !== undefined) {
            const data = dataAllPromotions.find((item: any) => {
                return item.id === Number(valuePromotions);
            });
            setCheckedPromotions(data);
        } else {
            setCheckedPromotions(undefined);
        }
    }, [valuePromotions]);
    // SÔs tiền cuối cùng
    useEffect(() => {
        const discountValue = (checkedPromotions as any)?.discount_value || 0;
        console.log("discountValue", discountValue);
        const calculatedFinalAmount =
            Number(location?.state.totalPrice) +
            Number(shippingFee) -
            Number(discountValue);
        console.log("calculatedFinalAmount", calculatedFinalAmount);
        setFinalAmount(calculatedFinalAmount);
    }, [location?.state.totalPrice, shippingFee, checkedPromotions]);

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
                                        <Flex
                                            className={styles.paymentMethod}
                                            gap={"md"}
                                        >
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
                                                                {item
                                                                    .product_variant
                                                                    .discount_price !==
                                                                "0.00" ? (
                                                                    <>
                                                                        {formatCurrencyVN(
                                                                            item
                                                                                .product_variant
                                                                                .discount_price,
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {formatCurrencyVN(
                                                                            item
                                                                                .product_variant
                                                                                .price,
                                                                        )}
                                                                    </>
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
                                        <p>
                                            {formatCurrencyVN(
                                                String(shippingFee),
                                            )}
                                        </p>
                                    </div>
                                    <div
                                        className="flex flex-row justify-between  mt-[5px]"
                                        style={{
                                            alignItems: "center",
                                        }}
                                    >
                                        <p>Giảm giá</p>
                                        <Select
                                            w={150}
                                            placeholder="Chọn mã giảm giá"
                                            data={dataPromotions}
                                            onClick={() => onhandlePromotions()}
                                            onChange={(value) => {
                                                if (value) {
                                                    setValuePromotions(value);
                                                } else {
                                                    setValuePromotions(
                                                        undefined,
                                                    );
                                                }
                                            }}
                                        ></Select>
                                        <div
                                            style={{
                                                width: "100px",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            <p>
                                                {checkedPromotions !==
                                                undefined ? (
                                                    <>
                                                        {formatCurrencyVN(
                                                            String(
                                                                (
                                                                    checkedPromotions as any
                                                                )
                                                                    .discount_value,
                                                            ),
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {formatCurrencyVN(
                                                            String(0),
                                                        )}
                                                    </>
                                                )}
                                            </p>
                                        </div>
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
                                            {formatCurrencyVN(
                                                String(finalAmount),
                                            )}
                                        </p>
                                    </div>

                                    <div className="my-[7px] py-3">
                                        <ScrollArea h={200} type="always">
                                            <DescriptionShipping />
                                        </ScrollArea>
                                    </div>
                                    <div className="mt-[20px]">
                                        <Checkbox
                                            label="Tôi đã đọc và đồng ý điều kiện đổi trả hàng, giao hàng, chính sách bảo mật, điều khoản dịch vụ mua hàng online **"
                                            color="rgba(71, 71, 71, 1)"
                                            className={styles.terms}
                                            checked={checked}
                                            onChange={(event) =>
                                                setChecked(
                                                    event.currentTarget.checked,
                                                )
                                            }
                                        />
                                        <div
                                            className={`${styles.submitButton} w-[100%] mt-2`}
                                        >
                                            <Button
                                                variant="filled"
                                                color="blue"
                                                type="submit"
                                                style={{ width: "100%" }}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <Loader
                                                        color="cyan"
                                                        size="sm"
                                                    />
                                                ) : (
                                                    "HOÀN TẤT ĐƠN HÀNG"
                                                )}
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
