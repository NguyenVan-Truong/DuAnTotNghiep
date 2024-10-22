import { Menu, Tabs, Text } from "@mantine/core";
import {
    IconCards,
    IconClipboardList,
    IconDoorExit,
    IconHeart,
    IconLoader,
    IconMapPin,
    IconMenuDeep,
    IconShieldCheck,
    IconShoppingCart,
    IconTruckDelivery,
    IconTruckReturn,
    IconUser,
} from "@tabler/icons-react";
import OrderAll from "./components/OrderAll/OrderAll";
import OrderLoader from "./components/OrderLoader/OrderLoader";
import OrderShipping from "./components/OrderShipping/OrderShipping";
import OrderSucces from "./components/OrderSuccess/OrderSucces";
import OrderBack from "./components/OrderBack/OrderBack";

const OrderCart = () => {
    const iconStyle = { width: 15, height: 15 };
    return (
        <div className="bg-white !pb-6">
            <div className="px-10 py-2">
                <div className="flex items-center justify-between my-5">
                    <div>
                        <Text size="xl">Đơn hàng của tôi</Text>
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
                    <Tabs defaultValue="orderAll">
                        <Tabs.List>
                            <Tabs.Tab
                                value="orderAll"
                                leftSection={
                                    <IconClipboardList style={iconStyle} />
                                }
                                style={{ fontSize: "16px" }} // Tăng cỡ chữ tại đây
                            >
                                Tất cả đơn hàng
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="orderLoader"
                                leftSection={<IconLoader style={iconStyle} />}
                                style={{ fontSize: "16px" }} // Tăng cỡ chữ tại đây
                            >
                                Đang xử lý
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="orderShipping"
                                leftSection={
                                    <IconTruckDelivery style={iconStyle} />
                                }
                                style={{ fontSize: "16px" }} // Tăng cỡ chữ tại đây
                            >
                                Đang giao
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="orderDone"
                                leftSection={
                                    <IconShieldCheck style={iconStyle} />
                                }
                                style={{ fontSize: "16px" }} // Tăng cỡ chữ tại đây
                            >
                                Đã hoàn thành
                            </Tabs.Tab>
                            <Tabs.Tab
                                value="orderReturn"
                                leftSection={
                                    <IconTruckReturn style={iconStyle} />
                                }
                                style={{ fontSize: "16px" }} // Tăng cỡ chữ tại đây
                            >
                                Trả lại
                            </Tabs.Tab>
                        </Tabs.List>
                        {/* noi dung */}
                        <Tabs.Panel value="orderAll">
                            <OrderAll />
                        </Tabs.Panel>

                        <Tabs.Panel value="orderLoader">
                            <OrderLoader />
                        </Tabs.Panel>

                        <Tabs.Panel value="orderShipping">
                            <OrderShipping />
                        </Tabs.Panel>
                        <Tabs.Panel value="orderDone">
                            <OrderSucces />
                        </Tabs.Panel>
                        <Tabs.Panel value="orderReturn">
                            <OrderBack />
                        </Tabs.Panel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default OrderCart;
