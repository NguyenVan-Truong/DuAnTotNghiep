import ItemProduct from "@/Components/ListProduct/ItemProduct/ItemProduct";
import style from "@/Components/ListProduct/ListProduct.module.scss";
import instance from "@/configs/axios";
import { Product } from "@/model/Products";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    Grid,
    LoadingOverlay,
    Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCaretDownFilled, IconFilter } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import BannerProduct from "./BannerProduct/BannerProduct";
import { Category } from "@/model/Categories";
import { Attribute } from "@/model/Attribute";

const ProductCategory = () => {
    // Danh mục được chọn
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    //const [hoveredStar, setHoveredStar] = useState(0);
    //const [tym, setTym] = useState(false);
    const [visible, { toggle }] = useDisclosure(false);
    const [data, setData] = useState<Product[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<
        Record<string, string[]>
    >({});
    const mapFilterKeyToApi = (key: string): string => {
        const filterMapping: Record<string, string> = {
            "Chất Liệu": "material",
            "Màu Sắc": "color",
            "Kích Thước": "dimension",
            // Thêm các mapping khác nếu cần
        };
        return filterMapping[key] || key.toLowerCase().replace(/\s+/g, "_");
    };

    const buildQueryString = () => {
        const params: Record<string, string> = {};
        // Lặp qua các bộ lọc và thêm vào query string
        Object.entries(selectedFilters).forEach(([key, values]) => {
            if (values.length > 0) {
                const paramKey = mapFilterKeyToApi(key); // Hàm này sẽ chuyển tên bộ lọc thành tên tham số API
                // Mã hóa các giá trị tham số nếu cần thiết
                params[paramKey] = values.join(",");
            }
        });

        // Gắn category_id nếu có
        if (selectedCategories.length > 0) {
            params["category_id"] = selectedCategories.join(",");
        }
        return Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join("&");
    };

    // Lấy danh sách danh mục từ API
    const fetchCategories = async () => {
        const response = await instance.get("/product-catalogues"); // API danh mục
        return response.data;
    };
    // Gọi API để lấy dữ liệu lọc
    const fetchFilters = async () => {
        const response = await instance.get("/attributesValue");
        return response.data;
    };

    const fetchData = async () => {
        const response = await instance.get(`/products/list`);
        return response.data.data; // Lấy danh sách sản phẩm
    };
    const applyFilters = async () => {
        try {
            const queryString = buildQueryString();
            const response = await instance.get(
                `/products/list?${queryString}`,
            );
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    };

    // Dùng react-query để lấy dữ liệu danh mục
    const { data: categories, isLoading: loadingCategories } = useQuery<
        Category[]
    >({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });
    const { data: filters } = useQuery<Attribute[]>({
        queryKey: ["filters"],
        queryFn: fetchFilters,
    });
    const { error, isLoading, isError } = useQuery<Product[]>({
        queryKey: ["products", selectedFilters, selectedCategories],
        queryFn: fetchData,
    });

    // Kiểm tra xem tất cả các mục con của một danh mục cha có được chọn không
    const isParentChecked = (parentId: number) => {
        const childCategories = categories?.filter(
            (category) => category.parent_id === parentId,
        );
        return childCategories?.every((category) =>
            selectedCategories.includes(category.id),
        );
    };

    // Kiểm tra nếu có ít nhất một mục con được chọn nhưng không phải tất cả (dấu trừ)
    const isParentIndeterminate = (parentId: number) => {
        if (!categories) return false;
        const childCategories = categories.filter(
            (category) => category.parent_id === parentId,
        );
        return (
            childCategories.some((category) =>
                selectedCategories.includes(category.id),
            ) && !isParentChecked(parentId)
        );
    };

    // Hàm xử lý khi thay đổi checkbox
    const handleCategoryChange = (
        categoryId: number,
        isChecked: boolean,
        parentId?: number,
    ) => {
        if (!categories) return;

        if (parentId === undefined) {
            // Nếu là checkbox cha
            const childCategories = categories.filter(
                (category) => category.parent_id === categoryId,
            );
            const childIds = childCategories.map((category) => category.id);

            if (isChecked) {
                // Chọn tất cả các mục con
                setSelectedCategories((prev) => {
                    // Kiểm tra xem danh mục cha đã được chọn chưa
                    return [...new Set([...prev, categoryId, ...childIds])];
                });
            } else {
                // Bỏ chọn tất cả các mục con
                setSelectedCategories((prev) => {
                    return prev.filter(
                        (id) => id !== categoryId && !childIds.includes(id),
                    );
                });
            }
        } else {
            // Nếu là checkbox con
            setSelectedCategories((prev) => {
                if (isChecked) {
                    return [...new Set([...prev, categoryId])]; // Thêm ID vào nếu được chọn
                } else {
                    return prev.filter((id) => id !== categoryId); // Loại bỏ ID nếu bị bỏ chọn
                }
            });
        }
    };

    // Hàm cập nhật trạng thái bộ lọc
    const handleCheckboxChange = (
        attribute: string,
        value: string,
        isChecked: boolean,
    ) => {
        setSelectedFilters((prev) => {
            const updated = { ...prev };

            if (isChecked) {
                if (!updated[attribute]) {
                    updated[attribute] = [];
                }
                updated[attribute].push(value);
            } else {
                updated[attribute] = updated[attribute].filter(
                    (v) => v !== value,
                );
                if (updated[attribute].length === 0) {
                    delete updated[attribute];
                }
            }

            return updated;
        });
    };

    // Hiển thị loading nếu chưa tải xong danh mục
    if (loadingCategories) {
        return <div>Loading categories...</div>;
    }

    // Kiểm tra lỗi
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // const onhandleTymItem = () => {
    //     setTym(!tym);
    // };
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
                                        <IconFilter size={20} />
                                        <Text fw={500} size="xl">
                                            Bộ Lọc Tìm Kiếm
                                        </Text>
                                    </span>
                                    <h5 className="py-1">Theo Danh mục</h5>
                                    <div>
                                        {categories?.length ? (
                                            categories
                                                .filter(
                                                    (category) =>
                                                        category.parent_id ===
                                                        null,
                                                ) // Lọc các danh mục cấp 1
                                                .map((category) => (
                                                    <div
                                                        key={category.id}
                                                        className="space-y-2"
                                                    >
                                                        <div
                                                            style={{
                                                                paddingLeft:
                                                                    category.level *
                                                                    20,
                                                            }}
                                                        >
                                                            <Checkbox
                                                                label={
                                                                    category.name
                                                                }
                                                                //value={category.id.toString()}
                                                                checked={selectedCategories.includes(
                                                                    category.id,
                                                                )}
                                                                indeterminate={isParentIndeterminate(
                                                                    category.id,
                                                                )}
                                                                onChange={(e) =>
                                                                    handleCategoryChange(
                                                                        category.id,
                                                                        e.target
                                                                            .checked,
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        {/* Render các danh mục con của danh mục cấp 1 */}
                                                        <div className="space-y-2">
                                                            {categories
                                                                .filter(
                                                                    (
                                                                        subCategory,
                                                                    ) =>
                                                                        subCategory.parent_id ===
                                                                        category.id,
                                                                ) // Lọc các danh mục con
                                                                .map(
                                                                    (
                                                                        subCategory,
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                subCategory.id
                                                                            }
                                                                            style={{
                                                                                paddingLeft:
                                                                                    subCategory.level *
                                                                                    20,
                                                                            }}
                                                                        >
                                                                            <Checkbox
                                                                                label={
                                                                                    subCategory.name
                                                                                }
                                                                                //value={subCategory.id.toString()}
                                                                                checked={selectedCategories.includes(
                                                                                    subCategory.id,
                                                                                )}
                                                                                onChange={(
                                                                                    e,
                                                                                ) =>
                                                                                    handleCategoryChange(
                                                                                        subCategory.id,
                                                                                        e
                                                                                            .target
                                                                                            .checked,
                                                                                        category.id,
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                    ),
                                                                )}
                                                        </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <p>No categories available</p>
                                        )}
                                    </div>
                                    {/* <p className="flex items-center pt-2 pl-8">
                                        <span>Thêm</span>
                                        <span>
                                            <IconCaretDownFilled size={15} />
                                        </span>
                                    </p> */}
                                    <div>
                                        <Divider my="sm" />
                                    </div>
                                    {/* Hiển thị bộ lọc */}
                                    {filters?.map((filter) => (
                                        <div key={filter.id}>
                                            <h5 className="py-1">
                                                {filter.name}
                                            </h5>
                                            <div className="space-y-2">
                                                {filter.values.map((value) => (
                                                    <Checkbox
                                                        key={value.id}
                                                        label={value.name}
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                filter.name,
                                                                value.name,
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                    />
                                                ))}
                                            </div>
                                            <Divider my="sm" />
                                        </div>
                                    ))}
                                </div>
                                <div className="w-[100%] lg:w-[256px] mt-[20px] lg:flex lg:justify-end">
                                    <Button
                                        variant="filled"
                                        color="rgba(0, 0, 0, 1)"
                                        className="bg-black w-[100%] border-none rounded-none lg:w-[100px] font-normal text-[15px]"
                                        onClick={applyFilters} // Gọi hàm applyFilters khi nhấn
                                    >
                                        Áp dụng
                                    </Button>
                                </div>
                            </Flex>
                        </form>
                    </div>
                    {/*bên phải*/}
                    <Box pos="relative">
                        <div
                            className={`${style.listProductss} mt-[50px] padding`}
                        >
                            <Grid className={style.listProductsMain}>
                                <LoadingOverlay
                                    visible={isLoading || visible}
                                    zIndex={1000}
                                    overlayProps={{ radius: "sm", blur: 2 }}
                                />
                                {data?.map((product) => (
                                    <ItemProduct
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </Grid>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default ProductCategory;
