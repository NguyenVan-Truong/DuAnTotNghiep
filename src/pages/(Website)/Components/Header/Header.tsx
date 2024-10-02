import { useState } from "react";
import {
    SearchOutlined,
    EnvironmentOutlined,
    HeartOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import CartIcon from "./components/MiniCart";
import IconMenu from "./components/Menu";
import { logo } from "@/assets/img";
import { Input } from "@mantine/core";

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
                    <HeartOutlined className="text-lg" />
                    <CartIcon />
                    <Button className="border-none text-sm">Đăng Nhập</Button>
                </div>
                <div className="block lg-hidden items-center space-x-4">
                    <CartIcon />
                </div>
            </header>
            {/* Header2 */}
            <header className="sticky top-0 space-x-5 left-0 w-full bg-white shadow-md z-50 flex items-center md:px-20">
                <div className="flex items-center">
                    <div className="md:mr-5 ml-10 text-5xl">
                        <IconMenu />
                    </div>
                    <div className="w-[120px] h-[60px] flex items-center justify-center md:justify-start">
                        <Link to="/">
                            <img
                                src={logo}
                                alt=""
                                className="object-cover w-full mt-2 h-full scale-125 transition-transform duration-300 ease-in-out"
                            />
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
                        <li className="relative group ">
                            <NavLink
                                to="/shop"
                                className={({ isActive }) =>
                                    `relative flex items-center ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                }
                            >
                                Shop
                                <svg
                                    className="w-4 h-4 ml-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </NavLink>

                            <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <NavLink
                                    to="/shop/category1"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Category 1
                                </NavLink>
                                <NavLink
                                    to="/shop/category2"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Category 2
                                </NavLink>
                                <NavLink
                                    to="/shop/category3"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Category 3
                                </NavLink>
                            </div>
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
