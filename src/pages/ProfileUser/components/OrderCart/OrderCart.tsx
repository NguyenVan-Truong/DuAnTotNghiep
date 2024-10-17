import { sanpham1 } from "@/assets/img";
import {
    Image,
    Menu,
    Tabs,
    Text,
    Grid,
    Card,
    Badge,
    Button,
    Flex,
} from "@mantine/core";
import {
    IconCards,
    IconDoorExit,
    IconHeart,
    IconMapPin,
    IconMenuDeep,
    IconMessageCircle,
    IconPhoto,
    IconSettings,
    IconShoppingCart,
    IconUser,
} from "@tabler/icons-react";
import OrderAll from "./components/OrderAll/OrderAll";

const OrderCart = () => {
    const iconStyle = { width: 12, height: 12 };
    return (
        <div className="bg-white !pb-6">
            <div className="px-10 py-2">
                <div className="flex items-center justify-between my-5">
                    <div>
                        <Text size="lg">Đơn hàng của tôi</Text>
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
                <div>
                    <Tabs defaultValue="gallery">
                        <Tabs.List>
                            <Tabs.Tab
                                value="gallery"
                                leftSection={<IconPhoto style={iconStyle} />}
                            >
                                Tất cả đơn hàng
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="messages"
                                leftSection={
                                    <IconMessageCircle style={iconStyle} />
                                }
                            >
                                Đang xử lý
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="settings"
                                leftSection={<IconSettings style={iconStyle} />}
                            >
                                Đang giao
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="settings1"
                                leftSection={<IconSettings style={iconStyle} />}
                            >
                                Đã hoàn thành
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="settings2"
                                leftSection={<IconSettings style={iconStyle} />}
                            >
                                Trả lại
                            </Tabs.Tab>
                        </Tabs.List>
                        {/* noi dung */}
                        <Tabs.Panel value="gallery">
                            <OrderAll />
                        </Tabs.Panel>

                        <Tabs.Panel value="messages">123</Tabs.Panel>

                        <Tabs.Panel value="settings">
                            Settings tab content
                        </Tabs.Panel>
                        <Tabs.Panel value="settings1">
                            Settings tab content
                        </Tabs.Panel>
                        <Tabs.Panel value="settings2">
                            Settings tab content
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default OrderCart;
