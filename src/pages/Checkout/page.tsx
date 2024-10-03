import { ban_an_6_cho2 } from "@/assets/img";
import { ActionIcon, Flex, Radio, ScrollArea, Textarea } from "@mantine/core";
import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./checkoutPage.module.scss"; // Import CSS module

type Props = {};

const CheckoutPage = (props: Props) => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            name: "",
            sđt: "",
            city: "",
            district: "",
            address: "",
            description: "",
            termsOfService: false,
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
        },
    });

    return (
        <div className="padding my-[30px]">
            <div className="container">
                <div className={styles.checkoutForm}>
                    <div className={styles.container}>
                        <form
                            onSubmit={form.onSubmit((values) =>
                                console.log(values),
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

                                        <ActionIcon
                                            size="input-sm"
                                            variant="default"
                                            aria-label="ActionIcon the same size as inputs"
                                            className="my-[10px]"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                />
                                                <path d="M12 5l0 14" />
                                                <path d="M5 12l14 0" />
                                            </svg>
                                        </ActionIcon>
                                    </div>
                                    <div className="mb-[10px]">
                                        <TextInput
                                            withAsterisk
                                            label="Họ và tên"
                                            placeholder="Nhập họ và tên"
                                            {...form.getInputProps("name")}
                                            className="w-[100%]"
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
                                        <TextInput
                                            withAsterisk
                                            label="Địa chỉ email"
                                            placeholder="Nhập địa chỉ email"
                                            {...form.getInputProps("email")}
                                            className="w-[50%]"
                                        />
                                    </div>
                                    <div
                                        className={`${styles.inputGroup} flex w-[100%] justify-between gap-3 mb-[10px] `}
                                    >
                                        <TextInput
                                            withAsterisk
                                            label="Tỉnh/Thành phố"
                                            placeholder="Nhập tỉnh/thành phố"
                                            {...form.getInputProps("city")}
                                            className="w-[50%]"
                                        />
                                        <TextInput
                                            withAsterisk
                                            label="Quận / Huyện"
                                            placeholder="Nhập quận/huyện"
                                            {...form.getInputProps("district")}
                                            className="w-[50%]"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <TextInput
                                            withAsterisk
                                            label="Địa chỉ"
                                            placeholder="Nhập địa chỉ"
                                            {...form.getInputProps("address")}
                                        />
                                    </div>
                                    <div className="mb-[10px]">
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
                                            <div className="px-[20px] py-[20px] flex flex-col border border-spacing-1 mr-[10px]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="50"
                                                    height="50"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-building-bank mx-auto"
                                                >
                                                    <path
                                                        stroke="none"
                                                        d="M0 0h24v24H0z"
                                                        fill="none"
                                                    />
                                                    <path d="M3 21l18 0" />
                                                    <path d="M3 10l18 0" />
                                                    <path d="M5 6l7 -3l7 3" />
                                                    <path d="M4 10l0 11" />
                                                    <path d="M20 10l0 11" />
                                                    <path d="M8 14l0 3" />
                                                    <path d="M12 14l0 3" />
                                                    <path d="M16 14l0 3" />
                                                </svg>
                                                <span className="text-[12px] text-[#656565]">
                                                    Chuyển khoản ngân hàng
                                                </span>
                                            </div>
                                            <div className="px-[20px] py-[20px] flex flex-col border border-spacing-1">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="50"
                                                    height="50"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-cash-banknote mx-auto"
                                                >
                                                    <path
                                                        stroke="none"
                                                        d="M0 0h24v24H0z"
                                                        fill="none"
                                                    />
                                                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                                    <path d="M3 6m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                                                    <path d="M18 12l.01 0" />
                                                    <path d="M6 12l.01 0" />
                                                </svg>
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
                                        <div className="flex flex-row justify-between mt-[5px]">
                                            <p>Thành tiền</p>
                                            <p>23,630,000đ</p>
                                        </div>
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
                                    <div className="mt-[5px]">
                                        <div className=" pb-[10px]">
                                            <h2 className="text-[16px] text-[#000] font-medium">
                                                Sản phẩm
                                            </h2>
                                        </div>
                                        <div>
                                            <div
                                                className={`${styles.productDetails} flex flex-row justify-between gap-3 items-center my-[9px]`}
                                            >
                                                <div
                                                    className={`${styles.imgwp} `}
                                                >
                                                    <img
                                                        src={ban_an_6_cho2}
                                                        alt="Product"
                                                        className="max-w-[70px] "
                                                    />
                                                </div>
                                                <div>
                                                    <p>
                                                        Armchair Hùng King + Gối
                                                        VACT3231{" "}
                                                        <span>× 1</span>
                                                    </p>
                                                </div>
                                                <p
                                                    className={
                                                        styles.productPrice
                                                    }
                                                >
                                                    11,815,000₫
                                                </p>
                                            </div>
                                            <div
                                                className={`${styles.productDetails} flex flex-row justify-between gap-3 items-center my-[9px]`}
                                            >
                                                <div
                                                    className={`${styles.imgwp} `}
                                                >
                                                    <img
                                                        src={ban_an_6_cho2}
                                                        alt="Product"
                                                        className="max-w-[70px] "
                                                    />
                                                </div>
                                                <div>
                                                    <p>
                                                        Armchair Hùng King + Gối
                                                        VACT3231{" "}
                                                        <span>× 1</span>
                                                    </p>
                                                </div>
                                                <p
                                                    className={
                                                        styles.productPrice
                                                    }
                                                >
                                                    11,815,000₫
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-[7px] py-3">
                                        <ScrollArea h={200} type="always">
                                            Lorem Ipsum is simply dummy text of
                                            the printing and typesetting
                                            industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever
                                            since the 1500s, when an unknown
                                            printer took a galley of type and
                                            scrambled it to make a type specimen
                                            book. It has survived not only five
                                            centuries, but also the leap into
                                            electronic typesetting, remaining
                                            essentially unchanged. It was
                                            popularised in the 1960s with the
                                            release of Letraset sheets
                                            containing Lorem Ipsum passages, and
                                            more recently with desktop
                                            publishing software like Aldus
                                            PageMaker including versions of
                                            Lorem Ipsum. Lorem Ipsum is simply
                                            dummy text of the printing and
                                            typesetting industry. Lorem Ipsum
                                            has been the industry's standard
                                            dummy text ever since the 1500s,
                                            when an unknown printer took a
                                            galley of type and scrambled it to
                                            make a type specimen book. It has
                                            survived not only five centuries,
                                            but also the leap into electronic
                                            typesetting, remaining essentially
                                            unchanged. It was popularised in the
                                            1960s with the release of Letraset
                                            sheets containing Lorem Ipsum
                                            passages, and more recently with
                                            desktop publishing software like
                                            Aldus PageMaker including versions
                                            of Lorem Ipsum.
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
                                                Button
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
