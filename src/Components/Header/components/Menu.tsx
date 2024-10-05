import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Menu } from "antd";
import { useState } from "react";
import "../Header.scss";

const MenuContent = () => {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const handleSubMenuClick = () => {
        setSubmenuOpen(!submenuOpen);
    };

    return (
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.SubMenu
                key="sub1"
                title={<span>Sofa và Armchair</span>}
                onTitleClick={handleSubMenuClick}
            >
                <Menu.Item key="1">Sofa</Menu.Item>
                <Menu.Item key="2">Sofa góc</Menu.Item>
                <Menu.Item key="3">Armchair</Menu.Item>
                <Menu.Item key="4">Ghế dài & đôn</Menu.Item>
                <Menu.Item key="5">Ghế thư giãn</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
                key="sub2"
                title={<span>Bàn</span>}
                onTitleClick={handleSubMenuClick}
            >
                <Menu.Item key="6">Bàn nước</Menu.Item>
                <Menu.Item key="7">Bàn ăn</Menu.Item>
                <Menu.Item key="8">Bàn bên</Menu.Item>
                <Menu.Item key="9">Bàn làm việc</Menu.Item>
                <Menu.Item key="10">Bàn trang điểm</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
                key="sub3"
                title={<span>Giường ngủ</span>}
                onTitleClick={handleSubMenuClick}
            >
                <Menu.Item key="11">Giường</Menu.Item>
                <Menu.Item key="12">Bàn đầu giường</Menu.Item>
                <Menu.Item key="13">Nệm</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
};

const IconMenu = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    return (
        <>
            <div className="flex items-center">
                <MenuOutlined
                    className="text-2xl cursor-pointer"
                    onClick={showDrawer}
                />
            </div>
            <Drawer
                title="Menu"
                placement="left"
                closable={true}
                onClose={onClose}
                open={drawerVisible}
                width={300}
            >
                <MenuContent />
            </Drawer>
        </>
    );
};

export default IconMenu;
