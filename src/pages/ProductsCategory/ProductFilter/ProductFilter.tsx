import { bannerTrangSanPham } from "@/assets/img";
import { Button, Flex, Input, Select, TextInput } from "@mantine/core";
import "./ProductFilter.scss";
type Props = {};

const ProductFilter = (props: Props) => {
    return (
        <div className="mt-[20px] product-filter padding">
            <form action="">
                <Flex
                    direction="column"
                    className="items-center product-filter__container justify-between"
                    gap="md"
                >
                    <div className="w-[100%] lg:w-[276px] border-b-[1px] border-[#000] font-normal">
                        <Select
                            label="Giá"
                            placeholder="Mức độ phổ biến"
                            data={["React", "Angular", "Vue", "Svelte"]}
                            defaultValue=""
                            clearable
                            className="w-full "
                            styles={{
                                input: {
                                    border: "none",
                                    borderRadius: "none",
                                },
                            }}
                        />
                    </div>
                    <div className="w-[100%] lg:w-[276px]   border-b-[1px] border-[#000] font-normal">
                        <Select
                            label="Chất liệu"
                            placeholder="Tất cả"
                            data={["React", "Angular", "Vue", "Svelte"]}
                            defaultValue=""
                            clearable
                            className="w-full "
                            styles={{
                                input: {
                                    border: "none",
                                    borderRadius: "none",
                                    borderBottom: "none",
                                },
                            }}
                        />
                    </div>

                    <div className="w-[100%] lg:w-[276px] mt-[20px] lg:flex lg:justify-end">
                        <Button
                            variant="filled"
                            color="rgba(0, 0, 0, 1)"
                            className="bg-black w-[100%] border-none rounded-none lg:w-[100px] font-normal text-[15px] "
                        >
                            Áp dụng
                        </Button>
                    </div>
                </Flex>
            </form>
        </div>
    );
};

export default ProductFilter;
