import instance from "@/configs/axios";
import { Category } from "@/model/Category";
import { Menu } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MenuHeader = () => {
    const buildCategoryTree = (categories: Category[]) => {
        const map: { [key: number]: Category & { children?: Category[] } } = {};
        categories.forEach((category) => {
            map[category.id] = { ...category, children: [] };
        });

        const tree: (Category & { children?: Category[] })[] = [];

        categories.forEach((category) => {
            if (category.parent_id === null) {
                tree.push(map[category.id]);
            } else {
                map[category.parent_id]?.children?.push(map[category.id]);
            }
        });

        return tree;
    };

    const renderMenuItems = (
        categories: (Category & { children?: Category[] })[],
    ) => {
        return categories.map((category) => {
            if (category.children && category.children.length > 0) {
                return (
                    <Menu.Item key={category.id}>
                        <Menu
                            trigger="hover"
                            position="right-start"
                            arrowPosition="center"
                            withArrow
                            offset={20}
                            openDelay={100}
                            closeDelay={100}
                        >
                            <Menu.Target>
                                <span>{category.name}</span>
                            </Menu.Target>
                            <Menu.Dropdown>
                                {renderMenuItems(category.children)}
                            </Menu.Dropdown>
                        </Menu>
                    </Menu.Item>
                );
            }
            return <Menu.Item key={category.id}>{category.name}</Menu.Item>;
        });
    };

    const fetchCategoryData = async () => {
        const response = await instance.get("/product-catalogues");
        return response.data;
    };

    const { data: categoryData } = useQuery<Category[]>({
        queryKey: ["categoryData"],
        queryFn: fetchCategoryData,
    });

    const categoryTree = buildCategoryTree(categoryData || []);

    return (
        <div>
            <Menu
                trigger="hover"
                withArrow
                position="bottom-start"
                closeDelay={100}
            >
                <Menu.Target>
                    <Link to={"/san-pham"}>
                        {" "}
                        <button>Sản Phẩm</button>
                    </Link>
                </Menu.Target>
                <Menu.Dropdown>{renderMenuItems(categoryTree)}</Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default MenuHeader;
