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
import {
    
    IconCaretDownFilled,
    
    IconFilter,
} from "@tabler/icons-react";
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
    // const [selectedFilters, setSelectedFilters] = useState<{}>({});

    // const buildQueryString = () => {
    //     const params: any = {};
    
    //     // Duyệt qua selectedFilters để tạo query string
    //     Object.keys(selectedFilters).forEach((key) => {
    //         const value = selectedFilters[key];
    //         if (value) {
    //             params[key] = value;
    //         }
    //     });
    
    //     // Tạo query string
    //     return Object.keys(params)
    //         .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    //         .join('&');
    // };   
    
    

    // Lấy danh sách danh mục từ API
    const fetchCategories = async () => {
        const response = await instance.get('/product-catalogues'); // API danh mục
        return response.data;
    };
    // Gọi API để lấy dữ liệu lọc
    const fetchFilters = async () => {
        const response = await instance.get("/attributesValue");
        return response.data;
    };

    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await instance.get(`/products`);
        return response.data;
    };

    // const fetchData = async () => {
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //     const queryString = buildQueryString();
    //     const response = await instance.get(`/products/list?${queryString}`);
    //     return response.data;
    // };

    // const handleFilterChange = (key: string, value: any) => {
    //     setSelectedFilters((prevFilters) => ({
    //         ...prevFilters,
    //         [key]: value,
    //     }));
    // };
    
    
    
    


    // Dùng react-query để lấy dữ liệu danh mục
    const { data: categories, isLoading: loadingCategories } = useQuery<Category[]>({
        queryKey: ['categories'], // Key của query
        queryFn: fetchCategories
    });
    const { data: filters } = useQuery<Attribute[]>({
        queryKey: ["filters"],
        queryFn: fetchFilters,
    });
    // const { data, error, isLoading, isError } = useQuery<Product[]>({
    //     queryKey: ["products"],
    //     queryFn: fetchData,
    // });
    const { data, error, isLoading, isError } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchData,
    });
    


    
    // Kiểm tra xem tất cả các mục con của một danh mục cha có được chọn không
    const isParentChecked = (parentId: number) => {
        if (!categories) return false;
        const childCategories = categories.filter((category) => category.parent_id === parentId);
        return childCategories.every((category) => selectedCategories.includes(category.id));
    };

    // Kiểm tra nếu có ít nhất một mục con được chọn nhưng không phải tất cả (dấu trừ)
    const isParentIndeterminate = (parentId: number) => {
        if (!categories) return false;
        const childCategories = categories.filter((category) => category.parent_id === parentId);
        return (
        childCategories.some((category) => selectedCategories.includes(category.id)) &&
        !isParentChecked(parentId)
        );
    };

    // Hàm xử lý khi thay đổi checkbox
    const handleCategoryChange = (categoryId: number, isChecked: boolean, parentId?: number) => {
        if (!categories) return;
        if (parentId === undefined) {
        // Nếu là checkbox cha
        if (isChecked) {
            // Chọn tất cả các mục con
            const childCategories = categories.filter((category) => category.parent_id === categoryId);
            const childIds = childCategories.map((category) => category.id);
            setSelectedCategories((prev) => [...prev, categoryId, ...childIds]);
        } else {
            // Bỏ chọn tất cả các mục con
            const childCategories = categories.filter((category) => category.parent_id === categoryId);
            const childIds = childCategories.map((category) => category.id);
            setSelectedCategories((prev) => prev.filter((id) => id !== categoryId && !childIds.includes(id)));
        }
        } else {
        // Nếu là checkbox con
        if (isChecked) {
            setSelectedCategories((prev) => [...prev, categoryId]);
        } else {
            setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
        }
        }
    };
    

    // Xử lý khi thay đổi checkbox
    // const handleCheckboxChange = (attributeId: number, valueId: number, isChecked: boolean) => {
    //     setSelectedFilters((prevFilters) => {
    //         const currentValues = prevFilters[attributeId] || [];
    //         if (isChecked) {
    //             return {
    //                 ...prevFilters,
    //                 [attributeId]: [...currentValues, valueId],
    //             };
    //         } else {
    //             return {
    //                 ...prevFilters,
    //                 [attributeId]: currentValues.filter((id) => id !== valueId),
    //             };
    //         }
    //     });
    // };

    // Hiển thị loading nếu chưa tải xong danh mục
    if (loadingCategories) {
        return <div>Loading categories...</div>;
    }      
    
    
    
    // Kiểm tra lỗi
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // Hàm xử lý khi nhấn nút "Áp dụng"
    

    //#endregion

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
                                                .filter((category) => category.parent_id === null) // Lọc các danh mục cấp 1
                                                .map((category) => (
                                                    <div key={category.id} className="space-y-2">
                                                        <div style={{ paddingLeft: category.level * 20 }}>
                                                            <Checkbox
                                                                label={category.name}
                                                                //value={category.id.toString()}
                                                                checked={selectedCategories.includes(category.id)}
                                                                indeterminate={isParentIndeterminate(category.id)}
                                                                onChange={(e) =>
                                                                    handleCategoryChange(category.id, e.target.checked, category.id)
                                                                }
                                                            />
                                                        </div>
                                            
                                                        {/* Render các danh mục con của danh mục cấp 1 */}
                                                        <div className="space-y-2">
                                                        {categories
                                                            .filter(subCategory => subCategory.parent_id === category.id) // Lọc các danh mục con
                                                            .map(subCategory => (
                                                                <div key={subCategory.id} style={{ paddingLeft: subCategory.level * 20 }}>
                                                                    <Checkbox
                                                                        label={subCategory.name}
                                                                        //value={subCategory.id.toString()}
                                                                        checked={selectedCategories.includes(subCategory.id)}
                                                                        onChange={(e) =>
                                                                            handleCategoryChange(subCategory.id, e.target.checked, category.id)
                                                                        }
                                                                    />
                                                                </div>                                                                
                                                            ))}
                                                            </div>
                                                    </div>
                                                ))
                                        ) : (
                                            <p>No categories available</p>
                                        )}
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
                                    {/* Hiển thị bộ lọc */}
                                    {filters?.map((filter: any) => (
                                        <div key={filter.id}>
                                            <h5 className="py-1">{filter.name}</h5>
                                            <div className="space-y-2">
                                                {filter.values.map((value: any) => (
                                                    <Checkbox
                                                        key={value.id}
                                                        label={value.name}
                                                        // onChange={(e) =>
                                                        //     handleCheckboxChange(
                                                        //         filter.id, 
                                                        //         value.id,  
                                                        //         e.target.checked 
                                                        //     )
                                                        // }
                                                    />
                                                ))}
                                            </div>
                                            <Divider my="sm" />
                                        </div>
                                    ))}
                                    {/* <h5 className="py-1">Theo Chất Liệu</h5>
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
                                    </div> */}
                                    {/* <div>
                                        <Divider my="sm" />
                                    </div>
                                    <div>
                                        <Divider my="sm" />
                                    </div> */}
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
