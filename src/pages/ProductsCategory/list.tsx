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
            dimension: "", // dimension can be something like "200x160"
            material: "", // material can be something like "Gỗ Sồi"
            min_price: "",
            max_price: "",
            kt: "",
        },
    });

    const fetchdata = async () => {
        console.log("values: ", form.values);
        let url = `?page=${pagination.pageIndex}`;

        if (form.values.category) {
            url += `&category_id=${form.values.category}`;
        }
        if (form.values.dimension) {
            console.log("Dimension value: ", form.values.dimension); // Kiểm tra giá trị
            url += `&dimension=${encodeURIComponent(form.values.dimension)}`; // Mã hóa nếu có khoảng trắng
        }
        if (form.values.material) {
            console.log("Material value: ", form.values.material); // Kiểm tra giá trị
            url += `&material=${encodeURIComponent(form.values.material)}`; // Mã hóa nếu có khoảng trắng
        }
        if (form.values.min_price) {
            url += `&min_price=${form.values.min_price}`;
        }
        if (form.values.max_price) {
            url += `&max_price=${form.values.max_price}`;
        }

        console.log("Final URL: ", url); // Kiểm tra URL cuối cùng

        try {
            const response = await instance.get(`/products/list${url}`);
            setData(response.data.data);
            console.log("url", url);
        } catch (error) {
            console.log("API Error:", error);
        }
    };

    const fetchCategory = async () => {
        try {
            const response = await instance.get(`/product-catalogues`);
            const categoriesWithChildren = response.data.map(
                (category: any) => ({
                    ...category,
                    children: response.data.filter(
                        (child: any) => child.parent_id === category.id,
                    ),
                }),
            );
            setCategory(categoriesWithChildren);
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

        const updateChildren = (categoryId: number, isChecked: boolean) => {
            const children = dataCategory.filter(
                (category: any) => category.parent_id === categoryId,
            );

            children.forEach((child: any) => {
                if (isChecked) {
                    updatedCheckedCategories.add(child.id);
                } else {
                    updatedCheckedCategories.delete(child.id);
                }
            });
        };

        if (isChecked) {
            updatedCheckedCategories.add(categoryId);
            updateChildren(categoryId, true);
        } else {
            updatedCheckedCategories.delete(categoryId);
            updateChildren(categoryId, false);
        }

        setCheckedCategories(updatedCheckedCategories);
        form.setFieldValue(
            "category",
            Array.from(updatedCheckedCategories).join(","),
        );
    };

    const renderCategories = (
        categories: any[] | undefined,
        parentId: number | null = null,
    ) => {
        return categories
            ? categories
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
                          {category.children &&
                              category.children.length > 0 && (
                                  <div>
                                      {renderCategories(
                                          category.children,
                                          category.id,
                                      )}
                                  </div>
                              )}
                      </div>
                  ))
            : null;
    };

    const handleAttributeChange = (
        attributeName: string,
        valueName: string,
        isChecked: boolean,
    ) => {
        const currentValues =
            form.values[attributeName as keyof typeof form.values] || "";
        const valuesArray = currentValues.split(",").filter(Boolean);

        if (isChecked) {
            valuesArray.push(valueName);
        } else {
            const index = valuesArray.indexOf(valueName);
            if (index > -1) {
                valuesArray.splice(index, 1);
            }
        }

        form.setFieldValue(attributeName, valuesArray.join(","));
    };

    const renderAttributes = () => {
        return attributes.map((attribute: any) => (
            <div key={attribute.id}>
                <h5 className="py-1">{attribute.name}</h5>
                <div className="space-y-2">
                    {attribute.values.map((value: any) => (
                        <Checkbox
                            key={value.id}
                            label={value.name}
                            checked={form.values[
                                attribute.name as keyof typeof form.values
                            ]
                                ?.split(",")
                                ?.includes(value.name)}
                            onChange={(event) =>
                                handleAttributeChange(
                                    attribute.name,
                                    value.name,
                                    event.currentTarget.checked,
                                )
                            }
                        />
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
