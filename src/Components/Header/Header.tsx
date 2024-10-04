import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "@mantine/core";
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
            <header className="flex border-b border-gray-100 bg-white justify-between items-center md:px-20 p-4">
                <div className="flex flex-row ml-10">
                    <span className="text-black flex flex-row items-center font-bold text-sm">
                        <FiPhone style={{ fontSize: "13px", color: "black" }} />{" "}
                        1800 7200
                    </span>
                    <div className="mx-5 space-x-5 text-sm hidden lg:flex">
                        <span>Giới Thiệu</span>
                        <span>Khuyến mãi</span>
                        <span className="text-red-500">Giám giá đặc biệt</span>
                    </div>
                </div>
                <div className="hidden lg:flex items-center mr-10 space-x-4">
                    <EnvironmentOutlined className="text-lg" />
                    <Favorite />
                    <CartIcon />
                    <Button className="border-none text-sm">Đăng Nhập</Button>
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
            <header className="sticky top-0 space-x-5 !py-3  left-0 w-full bg-white shadow-md z-50 flex items-center md:px-20">
                <div className="flex items-center">
                    <div className="md:mr-5 ml-10 text-5xl">
                        <IconMenu />
                    </div>
                    <div className="w-[150px] h-[60px] flex items-center justify-center md:justify-start">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                </div>
                <div className="flex-1 w-[250px]">
                    <ul className="hidden space-x-4 font-serif font-normal text-[14px] md:text-sm md:flex justify-center lg:text-lg lg:space-x-10">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:border-red-500"}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
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
                        <li>
                            <NavLink
                                to="/abc"
                                className={({ isActive }) =>
                                    `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                }
                            >
                                ABC
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/xyz"
                                className={({ isActive }) =>
                                    `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                }
                            >
                                XYZ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/123"
                                className={({ isActive }) =>
                                    `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                }
                            >
                                123
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div>
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
