import { Avatar } from "@/assets/img";
import {
    Button,
    Group,
    Image,
    Menu,
    Radio,
    Text,
    TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
    IconCards,
    IconDoorExit,
    IconHeart,
    IconMapPin,
    IconMenuDeep,
    IconShoppingCart,
    IconUser,
} from "@tabler/icons-react";
import FormUpdate from "./FormUpdate";

const UserAccount = () => {
    const handleAdd = () => {
        modals.openConfirmModal({
            title: "Cập nhật thông tin",
            size: "auto",
            children: <FormUpdate />,
            confirmProps: { display: "none" },
            cancelProps: { display: "none" },
        });
    };

    return (
        <div className="bg-white !pb-6">
            <div className="px-10 py-2">
                <div className="flex items-center justify-between">
                    <div className="mt-4">
                        <Text size="xl">Hồ sơ của tôi</Text>
                        <Text size="md" className="!mb-2 !text-[#9B9B9B]">
                            Quản lý thông tin hồ sơ để bảo mật tài khoản{" "}
                        </Text>
                    </div>
                    <div className="block lg:hidden">
                        <Menu position="bottom-end" shadow="md" width={230}>
                            <Menu.Target>
                                <IconMenuDeep />
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    leftSection={<IconUser size="1rem" />}
                                >
                                    Thông tin cá nhân
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconShoppingCart size="1rem" />
                                    }
                                >
                                    Danh sách đơn hàng
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconMapPin size="1rem" />}
                                >
                                    Quản lý địa chỉ
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconCards size="1rem" />}
                                >
                                    Danh sách thẻ tín dụng
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={<IconHeart size="1rem" />}
                                >
                                    Danh sách yêu thích
                                </Menu.Item>

                                <Menu.Divider />
                                <Menu.Item
                                    color="red"
                                    leftSection={<IconDoorExit size="1rem" />}
                                >
                                    Đăng Xuất
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </div>

                <hr />
                <form
                    action=""
                    className="mt-5 grid grid-cols-1 md:grid-cols-[65%_35%] gap-3"
                >
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3" size="lg">
                                Email:
                            </Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3" size="lg">
                                Tên người dùng:
                            </Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3" size="lg">
                                Số điện thoại:
                            </Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3" size="lg">
                                Địa chỉ:
                            </Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3" size="lg">
                                Giới tính:
                            </Text>
                            <Group>
                                <Radio
                                    disabled
                                    label="Nam"
                                    name="check"
                                    value="check"
                                    variant="outline"
                                    defaultChecked
                                />
                                <Radio
                                    disabled
                                    label="Nữ"
                                    name="check"
                                    value="check"
                                    variant="outline"
                                />
                                <Radio
                                    disabled
                                    label="Khác"
                                    name="check"
                                    value="check"
                                    variant="outline"
                                />
                            </Group>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3" size="lg">
                                Ngày sinh:
                            </Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                    </div>
                    <div className="border-l-2 border-slate-300">
                        <div className="flex justify-center">
                            <Image
                                src={Avatar}
                                radius="sm"
                                h={200}
                                w="auto"
                                fit="contain"
                            />
                        </div>
                        <div className="flex justify-center mt-5">
                            <Button
                                className="text-white p-2 rounded"
                                onClick={() => handleAdd()}
                            >
                                Sửa thông tin
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserAccount;
