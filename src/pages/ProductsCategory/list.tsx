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
import {
    Pagination as AntdPagination,
} from "antd"; 
import { useForm } from "@mantine/form";
import { IconFilter } from "@tabler/icons-react";
import BannerProduct from "./BannerProduct/BannerProduct";
import { TextInput } from "@mantine/core";
import { useLocation } from "react-router-dom";
//import { values } from "lodash";

const ProductCategory = () => {
    const location = useLocation();
    console.log("location", location);
    const [data, setData] = useState<any>([]);
    const [dataCategory, setCategory] = useState<any>([]);
    const [attributes, setAttributes] = useState<any>([]);
    const [checkedCategories, setCheckedCategories] = useState<Set<number>>(
        new Set(),
    );
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 3,
        totalItems: 0,
    });
    const [totalPages, setTotalPages] = useState<number>(1);
    //const [searchParams] = useSearchParams();
    //const categoryIdFromParams = searchParams.get("category_id");
    //const keysearch = searchParams.get("keysearch");

    const mapAttributeNameToField = (name: string) => {
        const mappings: Record<string, string> = {
            "Chất Liệu": "attribute",
            "Màu Sắc": "attribute",
            "Kích Thước": "attribute",
        };
        return mappings[name] || name;
    };

    const form = useForm({
        mode: "controlled",
        initialValues: {
            category: "",
            attribute: "",
            minPrice: "",
            maxPrice: "",
        },
        validate: {
            minPrice: (value, values) => {
                if (parseFloat(value) > parseFloat(values.maxPrice)) {
                    return "Giá nhỏ không được lớn hơn giá lớn";
                }
                return null;
            },
            maxPrice: (value, values) => {
                if (parseFloat(value) < parseFloat(values.minPrice)) {
                    return "Giá lớn không được nhỏ hơn giá nhỏ";
                }
                return null;
            },
        },
    });
    const fetchdata = async () => {
        console.log("Values :", form.values);
        //const params = Object.fromEntries(searchParams.entries());
        let url = `?page=${pagination.pageIndex + 1}`;

        if (form.values.category) {
            url += `&category_id=${form.values.category}`;
        } else if (location?.state?.id) {
            url += `&category_id=${location?.state?.id}`;
        }
        if (form.values.attribute) {
            url += `&attribute_value_ids=${form.values.attribute}`;
        }
        if (form.values.minPrice) {
            url += `&min_price=${form.values.minPrice}`;
        }
        if (form.values.maxPrice) {
            url += `&max_price=${form.values.maxPrice}`;
        }
        try {
            const response = await instance.get(`/products/list${url}`);
            setData(response.data.data);
            // Cập nhật số lượng sản phẩm
            const totalItems = response.data.totalItems;
            // Tính lại tổng số trang
            const newTotalPages = Math.ceil(totalItems / pagination.pageSize);
            setPagination((prev) => ({
                ...prev,
                totalItems: response.data.totalItems,
            }));
            setTotalPages(newTotalPages);
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
        valueId: number,
        isChecked: boolean,
    ) => {
        console.log("valueId", valueId);
        const fieldName: keyof typeof form.values = "attribute";
        const currentValues = form.values[fieldName] || "";
        //const currentValues = form.values[attributeName as keyof typeof form.values] || "";
        const valuesArray = currentValues.split(",").filter(Boolean);

        if (isChecked) {
            valuesArray.push(valueId.toString());
        } else {
            const index = valuesArray.indexOf(valueId.toString());
            if (index > -1) {
                valuesArray.splice(index, 1);
            }
        }

        form.setFieldValue(fieldName, valuesArray.join(","));
        // setTimeout(() => {
        //     console.log("Form values after attribute change:", form.values);
        // }, 0);
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
                                ?.includes(value.id.toString())}
                            onChange={(event) =>
                                handleAttributeChange(
                                    attribute.name,
                                    value.id,
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
    console.log("form", form.getValues());
    useEffect(() => {
        fetchCategory();
        fetchAttributes();
        if (location?.state?.id) {
            console.log("chayj vaof ddaay");
            handleCategoryChange(location.state.id,true)
            // handleAttributeChange("fsfse",location?.state?.id,true)
            form.setFieldValue("category", location?.state.id);
            fetchdata();
        }
    }, []);
    const handlePageChange = (page: number) => {
        setPagination((prev) => ({
            ...prev,
            pageIndex: page - 1,
        }));
    };
    useEffect(() => {
        fetchdata();
    }, [pagination.pageIndex]);

    // useEffect(() => {
    //     if (categoryIdFromParams) {
    //         form.setFieldValue("category", categoryIdFromParams);
    //         fetchdata();
    //     }
    // }, [categoryIdFromParams]);

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
                                    <span className="flex items-center space-x-2 mb-2">
                                        <IconFilter size={20} />
                                        <Text fw={500} size="xl">
                                            Bộ Lọc Tìm Kiếm
                                        </Text>
                                    </span>
                                    <hr />
                                    <h5 className="py-1">Theo Danh mục</h5>
                                    <div className="mb-5">
                                        {renderCategories(dataCategory)}
                                    </div>
                                    <hr />
                                    {renderAttributes()}
                                    <h5 className="mb-3">Khoảng giá</h5>
                                    <div className="flex items-center space-x-2">
                                        <TextInput
                                            placeholder="Từ"
                                            {...form.getInputProps("minPrice")}
                                        />
                                        <TextInput
                                            placeholder="Dến"
                                            {...form.getInputProps("maxPrice")}
                                        />
                                    </div>
                                    <hr />
                                </div>

                                <Button type="submit">Áp dụng</Button>
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
                        {/* Component phân trang */}
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "flex-end", // Căn phải
                                marginTop: "20px", // Khoảng cách với các sản phẩm phía trên
                            }}
                        >
                            <AntdPagination
                                current={pagination.pageIndex + 1}  // Đảm bảo giá trị bắt đầu từ 1
                                pageSize={pagination.pageSize}  // Số lượng sản phẩm trên mỗi trang
                                total={pagination.totalItems}  // Tổng số sản phẩm
                                onChange={handlePageChange}  // Cập nhật trang khi người dùng chọn
                                showSizeChanger={false}  // Không hiển thị chọn số lượng sản phẩm mỗi trang
                                disabled={pagination.pageIndex >= totalPages - 1}  // Disable nút "next" nếu là trang cuối
                            />
                        </Box>
                    </Box>
                </div>
            </div>
        </>
    );
};

export default ProductCategory;
