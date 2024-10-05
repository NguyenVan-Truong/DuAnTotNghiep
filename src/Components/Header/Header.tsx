import { bannerh1 } from "@/assets/img";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Input, Menu, Text, Tooltip } from "@mantine/core";
import {
    IconArrowsLeftRight,
    IconMessageCircle,
    IconPhoto,
    IconSearch,
    IconSettings,
    IconTrash,
} from "@tabler/icons-react";
import { Button, Dropdown } from "antd";
import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import Logo from "../logo/logo";
import Favorite from "./components/FavoriteCollection";
import IconMenu from "./components/Menu";
import CartIcon from "./components/MiniCart";
import "./Header.scss";

const Header = () => {
    const [visible, setVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const handleOverlayClick = () => {
        setVisible(false);
        setDropdownVisible(false);
    };

    return (
        <>
            {/* Header1 */}
            <header className="flex border-b border-gray-100 bg-white justify-between items-center md:px-16 p-4">
                <div className="flex flex-row ml-10">
                    <span className="text-black flex flex-row items-center font-bold text-sm">
                        <FiPhone style={{ fontSize: "13px", color: "black" }} />{" "}
                        1800 7200
                    </span>
                    <div className="mx-5 space-x-5 text-sm hidden sm:flex">
                        <span>Giới Thiệu</span>
                        <span>Khuyến mãi</span>
                        <span className="text-red-500">Giám giá đặc biệt</span>
                    </div>
                </div>
                <div className="hidden lg:flex items-center mr-10 space-x-4">
                    <EnvironmentOutlined className="text-xl mb-1" />
                    <Favorite />
                    <CartIcon />
                    <Button className="border-none text-sm">Đăng Nhập</Button>
                    <Menu shadow="md" width={200} offset={2}>
                        <Menu.Target>
                            <Tooltip label="Chào , Salazar Troop">
                                <Avatar src={bannerh1} />
                            </Tooltip>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Application</Menu.Label>
                            <Menu.Item leftSection={<IconSettings />}>
                                Settings
                            </Menu.Item>
                            <Menu.Item leftSection={<IconMessageCircle />}>
                                Messages
                            </Menu.Item>
                            <Menu.Item leftSection={<IconPhoto />}>
                                Gallery
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconSearch />}
                                rightSection={
                                    <Text size="xs" c="dimmed">
                                        ⌘K
                                    </Text>
                                }
                            >
                                Search
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Label>Danger zone</Menu.Label>
                            <Menu.Item leftSection={<IconArrowsLeftRight />}>
                                Transfer my data
                            </Menu.Item>
                            <Menu.Item color="red" leftSection={<IconTrash />}>
                                Delete my account
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
                <div className="lg-hidden flex space-x-5">
                    <div className="block lg-hidden">
                        <Favorite />
                    </div>
                    <div className="block lg-hidden items-center space-x-4">
                        <CartIcon />
                    </div>
                </div>
            </header>
            {/* Header2 */}
            <header className="sticky top-0 space-x-5 !py-3  left-0 w-full bg-white shadow-md z-50 flex items-center md:px-16">
                <div className="flex items-center">
                    <div className="md:mr-5 ml-10 text-5xl lg:hidden">
                        <IconMenu />
                    </div>
                    <div className="w-[150px] h-[60px] ml-1 lg:ml-8 flex items-center justify-center md:justify-start">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                </div>
                <div className="flex-1 w-full block xl:w-[180px]">
                    <ul className="hidden lg:flex justify-center  space-x-3 xl:space-x-5 uppercase font-normal text-[14px] !md:text-sm !lg:text-[12px]">
                        <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: "1",
                                            label: (
                                                <NavLink to="/shop/sub1">
                                                    Subitem 1
                                                </NavLink>
                                            ),
                                        },
                                        {
                                            key: "2",
                                            label: (
                                                <NavLink to="/shop/sub2">
                                                    Subitem 2
                                                </NavLink>
                                            ),
                                        },
                                        {
                                            key: "3",
                                            label: (
                                                <NavLink to="/shop/sub3">
                                                    Subitem 3
                                                </NavLink>
                                            ),
                                        },
                                    ],
                                }}
                                placement="bottomLeft"
                                arrow
                            >
                                <NavLink
                                    to="/shop"
                                    className={({ isActive }) =>
                                        `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`
                                    }
                                >
                                    Shop
                                </NavLink>
                            </Dropdown>
                        </li>
                        <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                            <NavLink
                                to="/abc"
                                className={({ isActive }) =>
                                    `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                }
                            >
                                Phòng
                            </NavLink>
                        </li>
                        <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                            <NavLink
                                to="/xyz"
                                className={({ isActive }) =>
                                    `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                }
                            >
                                Bộ sưu tập
                            </NavLink>
                        </li>
                        <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                            <NavLink
                                to="/123"
                                className={({ isActive }) =>
                                    `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                }
                            >
                                Góc cảm hứng
                            </NavLink>
                        </li>
                        <li className="flex items-center space-x-5 !lg:space-x-2 whitespace-nowrap">
                            <NavLink
                                to="/123"
                                className={({ isActive }) =>
                                    `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                }
                            >
                                Cửa hàng 360 độ
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="pr-5 md:pr-1">
                    <Input
                        type="text"
                        variant="filled"
                        radius="xl"
                        placeholder="Tìm kiếm..."
                        rightSection={<SearchOutlined />}
                    />
                </div>
            </header>
            {/* Overlay */}
            {(visible || dropdownVisible) && (
                <div className="overlay" onClick={handleOverlayClick} />
            )}
        </>
    );
};

export default Header;
