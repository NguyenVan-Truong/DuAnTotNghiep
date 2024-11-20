import React, { useEffect, useState } from "react";
import ItemProduct from "@/Components/ListProduct/ItemProduct/ItemProduct";
import style from "@/Components/ListProduct/ListProduct.module.scss";
import instance from "@/configs/axios";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Flex,
    Grid,
    Text,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconFilter } from "@tabler/icons-react";
import BannerProduct from "./BannerProduct/BannerProduct";

const ProductCategory = () => {
    const [data, setData] = useState<any>([]);
    const [dataCategory, setCategory] = useState<any>([]);
    const [attributes, setAttributes] = useState<any>([]);
    const [checkedCategories, setCheckedCategories] = useState<Set<number>>(
        new Set(),
    );
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const form = useForm({
        initialValues: {
            category: "",
            dimension: "",
            material: "",
            min_price: "",
            max_price: "",
        },
    });

    const fetchdata = async () => {
        let url = `?page=${pagination.pageIndex}`;

        if (form.values.category) {
            url += `&category_id=${form.values.category}`;
        }
        if (form.values.dimension) {
            url += `&dimension=${form.values.dimension}`;
        }
        if (form.values.material) {
            url += `&material=${form.values.material}`;
        }
        if (form.values.min_price) {
            url += `&min_price=${form.values.min_price}`;
        }
        if (form.values.max_price) {
            url += `&max_price=${form.values.max_price}`;
        }

        try {
            const response = await instance.get(`/products/list${url}`);
            console.log("API Response:", url);
            setData(response.data.data);
        } catch (error) {
            console.log("API Error:", error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await instance.get(`/product-catalogues`);
            setCategory(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAttributes = async () => {
        try {
            const response = await instance.get(`/attributesValue`);
            setAttributes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchAttributes();
    }, []);

    useEffect(() => {
        fetchdata();
    }, [pagination.pageIndex]);

    const handleCategoryChange = (categoryId: number, isChecked: boolean) => {
        const updatedCheckedCategories = new Set(checkedCategories);
        if (isChecked) {
            updatedCheckedCategories.add(categoryId);
            const addChildren = (parentId: number) => {
                dataCategory.forEach((category: any) => {
                    if (category.parent_id === parentId) {
                        updatedCheckedCategories.add(category.id);
                        addChildren(category.id);
                    }
                });
            };
            addChildren(categoryId);
        } else {
            updatedCheckedCategories.delete(categoryId);
            const removeChildren = (parentId: number) => {
                dataCategory.forEach((category: any) => {
                    if (category.parent_id === parentId) {
                        updatedCheckedCategories.delete(category.id);
                        removeChildren(category.id);
                    }
                });
            };
            removeChildren(categoryId);
        }
        setCheckedCategories(updatedCheckedCategories);
        form.setFieldValue(
            "category",
            Array.from(updatedCheckedCategories).join(","),
        );
    };

    const renderCategories = (
        categories: any[],
        parentId: number | null = null,
    ) => {
        return categories
            .filter((category) => category.parent_id === parentId)
            .map((category) => (
                <div
                    key={category.id}
                    style={{ marginLeft: parentId ? "20px" : "0" }}
                >
                    <Checkbox
                        label={category.name}
                        checked={checkedCategories.has(category.id)}
                        onChange={(event) =>
                            handleCategoryChange(
                                category.id,
                                event.currentTarget.checked,
                            )
                        }
                    />
                    {renderCategories(categories, category.id)}
                </div>
            ));
    };

    const renderAttributes = () => {
        return attributes.map((attribute: any) => (
            <div key={attribute.id}>
                <h5 className="py-1">{attribute.name}</h5>
                <div className="space-y-2">
                    {attribute.values.map((value: any) => (
                        <Checkbox key={value.id} label={value.name} />
                    ))}
                </div>
                <Divider my="sm" />
            </div>
        ));
    };

    return (
        <>
            <BannerProduct />
            <div className="container">
                <div className="grid grid-cols-[25%_75%]">
                    <div className="mt-[50px] product-filter padding">
                        <form
                            onSubmit={form.onSubmit(() => {
                                console.log("Form Values:", form.values);
                                fetchdata();
                            })}
                        >
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
                                    <div>{renderCategories(dataCategory)}</div>
                                    {renderAttributes()}
                                </div>
                                <Button type="submit">Apply Filters</Button>
                            </Flex>
                        </form>
                    </div>
                    <Box pos="relative">
                        <div
                            className={`${style.listProductss} mt-[50px] padding`}
                        >
                            <Grid className={style.listProductsMain}>
                                {data?.map((product: any) => (
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
