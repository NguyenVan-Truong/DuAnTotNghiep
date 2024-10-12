import { Outlet } from "react-router-dom";

const ProfileUser = () => {
    return (
        <>
            <div className="container flex">
                {/* Sidebar */}
                <div className="w-64  bg-gray-800 text-white flex flex-col">
                    <ul className="flex flex-col space-y-2 p-4">
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-700 rounded"
                            >
                                Thông tin cá nhân
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-700 rounded"
                            >
                                Danh sách đơn hàng
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-700 rounded"
                            >
                                Danh sách yêu thích
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-700 rounded"
                            >
                                Đăng Xuất
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Main content */}
                <div className="flex-1 p-10">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default ProfileUser;
