import { Avatar } from "@/assets/img";
import { Box, Image, NavLink, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import {
    IconCards,
    IconDoorExit,
    IconHeart,
    IconMapPin,
    IconPencil,
    IconShoppingCart,
    IconUser,
} from "@tabler/icons-react";
const ProfileUser = () => {
    return (
        <div className="bg-[#F5F5F5]">
            <div className="container !mt-5">
                <hr />
            </div>
            <div className="container grid grid-cols-1 lg:grid-cols-[25%_75%] !mt-6 !pb-5">
                <div className="w-64 border-2 hidden lg:block bg-white">
                    <div className="flex items-center space-x-2 justify-center mx-auto py-2">
                        <Image
                            src={Avatar}
                            radius="xl"
                            h={45}
                            w="auto"
                            fit="contain"
                        />{" "}
                        <Box w={160}>
                            <Text truncate="end" size="sm">
                                Nguyễn Văn Trường
                            </Text>
                            <Text
                                size="sm"
                                className="flex items-center !text-[#9B9B9B]"
                            >
                                <IconPencil color="#9B9B9B" size={16} />
                                Sửa hồ sơ
                            </Text>
                        </Box>
                    </div>
                    <hr />
                    <ul className="flex flex-col space-y-2 p-4">
                        <NavLink
                            leftSection={<IconUser size="1rem" />}
                            href="/nguoi-dung/thong-tin-tai-khoan"
                            label="Thông tin cá nhân"
                        />
                        <NavLink
                            leftSection={<IconShoppingCart size="1rem" />}
                            href="/nguoi-dung/don-hang"
                            label="Danh sách đơn hàng"
                        />
                        <NavLink
                            leftSection={<IconMapPin size="1rem" />}
                            href="/nguoi-dung/thong-tin-tai-khoan"
                            label="Quản lý địa chỉ"
                        />
                        <NavLink
                            leftSection={<IconCards size="1rem" />}
                            href="/nguoi-dung/thong-tin-tai-khoan"
                            label="Danh sách thẻ tín dụng"
                        />
                        <NavLink
                            leftSection={<IconHeart size="1rem" />}
                            href="/nguoi-dung/yeu-thich"
                            label="Danh sách yêu thích"
                        />
                        <NavLink
                            leftSection={<IconDoorExit size="1rem" />}
                            href="/nguoi-dung/thong-tin-tai-khoan"
                            label="Đăng Xuất"
                        />
                    </ul>
                </div>

                {/* Main content */}
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ProfileUser;
