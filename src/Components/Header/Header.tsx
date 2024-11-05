import { AvatarDefault, bannerh1 } from "@/assets/img";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Box, Input, Menu, Text, Tooltip } from "@mantine/core";
import {
    IconHeartSpark,
    IconLogout,
    IconShoppingCart,
    IconUserCircle,
} from "@tabler/icons-react";
import { Button, Dropdown, message, Modal } from "antd";
import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userProFile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    const navigate = useNavigate();
    const logout = () => {
        Modal.confirm({
            title: "Xác nhận đăng xuất",
            content: "Bạn có chắc chắn muốn đăng xuất?",
            onOk: () => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("userProfile");
                navigate("/xac-thuc/dang-nhap");
                message.success("Đăng xuất thành công");
            },
            onCancel() {
                console.log("Người dùng đã huỷ đăng xuất");
            },
        });
    };
    return (
        <>
            {/* Header1 */}
            <header className="container flex border-b border-gray-100 bg-white justify-between items-center !py-3 ">
                <div className="flex flex-row ml-5 xl:ml-0">
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
                <div className="hidden lg:flex items-center mr-10 space-x-3">
                    <EnvironmentOutlined className="text-xl mb-1" />
                    <Favorite />
                    <CartIcon />
                    {localStorage.getItem("token") ? (
                        <Menu
                            shadow="md"
                            width={200}
                            offset={2}
                            transitionProps={{
                                transition: "rotate-right",
                                duration: 150,
                            }}
                        >
                            <Menu.Target>
                                <Tooltip
                                    label={`Chào, ${
                                        userProFile.full_name
                                            ? userProFile.full_name
                                            : user
                                    }`}
                                >
                                    <Avatar
                                        src={
                                            userProFile.avatar || AvatarDefault
                                        }
                                    />
                                </Tooltip>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Label>
                                    <Box w={170}>
                                        <Text truncate="end" size="sm">
                                            Chào ,{" "}
                                            {userProFile.full_name
                                                ? userProFile.full_name
                                                : user}
                                        </Text>
                                    </Box>
                                </Menu.Label>
                                <Menu.Divider />
                                <Menu.Item
                                    leftSection={
                                        <IconUserCircle
                                            style={{ fontSize: "14px" }}
                                        />
                                    }
                                    style={{ fontSize: "13px" }}
                                >
                                    <Link
                                        to={"/nguoi-dung/thong-tin-tai-khoan"}
                                    >
                                        Thông tin của tôi
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconShoppingCart
                                            style={{ fontSize: "14px" }}
                                        />
                                    }
                                    style={{ fontSize: "13px" }}
                                >
                                    <Link to={"/nguoi-dung/don-hang"}>
                                        Đơn hàng
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconHeartSpark
                                            style={{ fontSize: "14px" }}
                                        />
                                    }
                                    style={{ fontSize: "13px" }}
                                >
                                    <Link to={"/nguoi-dung/san-pham-yeu-thich"}>
                                        Sản Phẩm Yêu thích
                                    </Link>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    color="red"
                                    leftSection={
                                        <IconLogout
                                            style={{ fontSize: "14px" }}
                                        />
                                    }
                                    onClick={logout}
                                >
                                    Đăng xuất
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    ) : (
                        <Button className="border-none text-sm">
                            <Link to={"/xac-thuc/dang-nhap"}>Đăng Nhập</Link>
                        </Button>
                    )}
                </div>
                <div className="lg-hidden flex space-x-5 mr-5">
                    <div className="block lg-hidden">
                        <Favorite />
                    </div>
                    <div className="block lg-hidden items-center space-x-4">
                        <CartIcon />
                    </div>
                    <div>
                        {localStorage.getItem("token") ? (
                            <Menu
                                shadow="md"
                                width={200}
                                offset={2}
                                transitionProps={{
                                    transition: "rotate-right",
                                    duration: 150,
                                }}
                            >
                                <Menu.Target>
                                    <Tooltip
                                        label={`Chào, ${
                                            userProFile.full_name
                                                ? userProFile.full_name
                                                : user
                                        }`}
                                    >
                                        <Avatar
                                            size="sm"
                                            src={
                                                userProFile.avatar ||
                                                AvatarDefault
                                            }
                                        />
                                    </Tooltip>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>
                                        <Box w={170}>
                                            <Text truncate="end" size="sm">
                                                Chào ,{" "}
                                                {userProFile.full_name
                                                    ? userProFile.full_name
                                                    : user}
                                            </Text>
                                        </Box>
                                    </Menu.Label>
                                    <Menu.Divider />
                                    <Menu.Item
                                        leftSection={
                                            <IconUserCircle
                                                style={{ fontSize: "14px" }}
                                            />
                                        }
                                        style={{ fontSize: "13px" }}
                                    >
                                        <Link
                                            to={
                                                "/nguoi-dung/thong-tin-tai-khoan"
                                            }
                                        >
                                            Thông tin của tôi
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={
                                            <IconShoppingCart
                                                style={{ fontSize: "14px" }}
                                            />
                                        }
                                        style={{ fontSize: "13px" }}
                                    >
                                        <Link to={"/nguoi-dung/don-hang"}>
                                            Đơn hàng
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item
                                        leftSection={
                                            <IconHeartSpark
                                                style={{ fontSize: "14px" }}
                                            />
                                        }
                                        style={{ fontSize: "13px" }}
                                    >
                                        <Link
                                            to={
                                                "/nguoi-dung/san-pham-yeu-thich"
                                            }
                                        >
                                            Sản Phẩm Yêu thích
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item
                                        color="red"
                                        leftSection={
                                            <IconLogout
                                                style={{ fontSize: "14px" }}
                                            />
                                        }
                                        onClick={logout}
                                    >
                                        Đăng xuất
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <Button className="border-none text-sm">
                                <Link to={"/xac-thuc/dang-nhap"}>
                                    Đăng Nhập
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>
            {/* Header2 */}
            <header className=" sticky top-0 space-x-5  bg-white left-0 w-ful z-50 flex items-center">
                <div
                    className="container top-0 space-x-5  !py-1 bg-white left-0 w-ful z-[9999] flex items-center"
                    style={{ zIndex: 999 }}
                >
                    <div className="flex items-center ml-5 xl:ml-0">
                        <div className=" mr-2 md:mr-5 text-5xl  lg:hidden">
                            <IconMenu />
                        </div>
                        <div className="w-[150px] h-[60px] flex items-center justify-center md:justify-start">
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
                                        to="/san-pham"
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
                                    to="/lien-he"
                                    className={({ isActive }) =>
                                        `relative ${isActive ? "border-b-4 border-red-500" : "hover:border-b-2 hover:text-orange-300"}`
                                    }
                                >
                                    Liên Hệ
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

                    <div className="!mr-3 md:mr-0">
                        <Input
                            type="text"
                            variant="filled"
                            radius="xl"
                            placeholder="Tìm kiếm..."
                            rightSection={<SearchOutlined />}
                        />
                    </div>
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
