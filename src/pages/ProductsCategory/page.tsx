import ItemProduct from "@/Components/ListProduct/ItemProduct/ItemProduct";
import style from "@/Components/ListProduct/ListProduct.module.scss";
import instance from "@/configs/axios";
import {
    Button,
    Checkbox,
    Divider,
    Flex,
    Grid,
    LoadingOverlay,
    Text,
} from "@mantine/core";
import { randomId, useDisclosure, useListState } from "@mantine/hooks";
import {
    IconAlignJustified,
    IconCaretDownFilled,
    IconCornerDownRightDouble,
    IconFilter,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import BannerProduct from "./BannerProduct/BannerProduct";
import { Product } from "@/modals/Products";
const ProductCategory = () => {
    //#region filter
    const initialValues = [
        {
            label: "Receive email notifications",
            checked: false,
            key: randomId(),
        },
        { label: "Receive sms notifications", checked: false, key: randomId() },
        {
            label: "Receive push notifications",
            checked: false,
            key: randomId(),
        },
    ];
    const [values, handlers] = useListState(initialValues);

    const allChecked = values.every((value) => value.checked);
    const indeterminate = values.some((value) => value.checked) && !allChecked;

    const items = values.map((value, index) => (
        <Checkbox
            mt="xs"
            ml={33}
            label={value.label}
            key={value.key}
            checked={value.checked}
            onChange={(event) =>
                handlers.setItemProp(
                    index,
                    "checked",
                    event.currentTarget.checked,
                )
            }
        />
    ));
    // sao
    const [hoveredStar, setHoveredStar] = useState(0);
    //#endregion
    //#region product
    const [tym, setTym] = useState(false);
    const onhandleTymItem = () => {
        setTym(!tym);
    };

    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await instance.get("/products");
        return response.data;
    };

    const { data, error, isLoading, isError } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchData,
    });

    const [visible, { toggle }] = useDisclosure(true);

    // Hiện LoadingOverlay khi đang tải dữ liệu
    if (isLoading) {
        return (
            <LoadingOverlay
                visible={visible}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
                loaderProps={{ color: "pink", type: "bars" }}
            />
        );
    }

    // Kiểm tra lỗi
    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    //#endregion
    return (
        <>
            {/* Banner Trang sản phẩm */}
            <BannerProduct />
            <div className="container">
                <div className="grid grid-cols-[25%_75%]">
                    {/*bên trái*/}
                    <div className="mt-[50px] product-filter padding">
                        <form action="">
                            <Flex
                                direction="column"
                                className="items-center product-filter__container justify-between w-full"
                                gap="md"
                            >
                                <div className="w-[100%] lg:w-[256px] ">
                                    <span className="flex items-center space-x-2">
                                        <IconAlignJustified size={20} />
                                        <Text fw={500} size="xl">
                                            Tất Cả Danh Mục
                                        </Text>
                                    </span>
                                    <div className="mt-0">
                                        <p className="pt-2 pl-2 space-x-1 text-red-500 flex items-center">
                                            <span>
                                                <IconCornerDownRightDouble
                                                    size={18}
                                                />
                                            </span>
                                            <span className="pt-1">
                                                {" "}
                                                Chăn, Ga, Gối & Nệm
                                            </span>
                                        </p>
                                        <p className="pt-2 pl-8">
                                            Chăn, Ga, Gối & Nệm
                                        </p>
                                        <p className="pt-2 pl-8">
                                            Chăn, Ga, Gối & Nệm
                                        </p>
                                        <p className="pt-2 pl-8">
                                            Chăn, Ga, Gối & Nệm
                                        </p>
                                        <p className="flex items-center pt-2 pl-8">
                                            <span>Thêm</span>
                                            <span>
                                                <IconCaretDownFilled
                                                    size={15}
                                                />
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="w-[100%] lg:w-[256px] ">
                                    <span className="flex items-center space-x-2">
                                        <IconFilter size={20} />
                                        <Text fw={500} size="xl">
                                            Bộ Lọc Tìm Kiếm
                                        </Text>
                                    </span>
                                    <h5 className="py-1">Theo Danh mục</h5>
                                    <div>
                                        <Checkbox
                                            checked={allChecked}
                                            indeterminate={indeterminate}
                                            label="Receive all notifications"
                                            onChange={() =>
                                                handlers.setState((current) =>
                                                    current.map((value) => ({
                                                        ...value,
                                                        checked: !allChecked,
                                                    })),
                                                )
                                            }
                                        />
                                        {items}
                                    </div>
                                    <p className="flex items-center pt-2 pl-8">
                                        <span>Thêm</span>
                                        <span>
                                            <IconCaretDownFilled size={15} />
                                        </span>
                                    </p>
                                    <div>
                                        <Divider my="sm" />
                                    </div>
                                    <h5 className="py-1">Theo Kích Thước</h5>
                                    <div className="space-y-2">
                                        <Checkbox label="I agree to sell my privacy" />
                                        <Checkbox label="I agree to sell my privacy" />
                                        <Checkbox label="I agree to sell my privacy" />
                                        <Checkbox label="I agree to sell my privacy" />
                                    </div>
                                    <div>
                                        <Divider my="sm" />
                                    </div>
                                    <h5 className="py-1">Theo Chất Liệu</h5>
                                    <div className="space-y-2">
                                        <Checkbox label="I agree to sell my privacy" />
                                        <Checkbox label="I agree to sell my privacy" />
                                        <Checkbox label="I agree to sell my privacy" />
                                        <Checkbox label="I agree to sell my privacy" />
                                    </div>
                                    <div>
                                        <Divider my="sm" />
                                    </div>
                                    <h5 className="py-1">Khoảng Giá</h5>
                                    <div className="space-y-2">
                                        <Checkbox label="I agree to sell my privacy" />
                                        <Checkbox label="I agree to sell my privacy" />
                                        <Checkbox label="I agree to sell my privacy" />
                                        <Checkbox label="I agree to sell my privacy" />
                                    </div>
                                    <div>
                                        <Divider my="sm" />
                                    </div>
                                    <h5 className="py-1">Đánh Giá</h5>
                                    <div
                                        style={{
                                            display: "flex",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {Array.from(
                                            { length: 5 },
                                            (_, index) => (
                                                <FaStar
                                                    key={index}
                                                    size={18} // Kích thước của ngôi sao
                                                    color={
                                                        index <
                                                        (hoveredStar || 0)
                                                            ? "#FAB005"
                                                            : "gray"
                                                    }
                                                    onMouseEnter={() =>
                                                        setHoveredStar(
                                                            index + 1,
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoveredStar(0)
                                                    }
                                                    style={{
                                                        margin: "2px",
                                                    }}
                                                />
                                            ),
                                        )}
                                    </div>
                                    <div>
                                        <Divider my="sm" />
                                    </div>
                                </div>
                                <div className="w-[100%] lg:w-[256px] mt-[20px] lg:flex lg:justify-end">
                                    <Button
                                        variant="filled"
                                        color="rgba(0, 0, 0, 1)"
                                        className="bg-black w-[100%] border-none rounded-none lg:w-[100px] font-normal text-[15px]"
                                    >
                                        Áp dụng
                                    </Button>
                                </div>
                            </Flex>
                        </form>
                    </div>
                    {/*bên phải*/}
                    <div className={`${style.listProductss} mt-[50px] padding`}>
                        <Grid className={style.listProductsMain}>
                            {data?.map((product: any) => (
                                <ItemProduct product={product} />
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCategory;
