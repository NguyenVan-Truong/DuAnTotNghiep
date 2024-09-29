import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { FaFacebook, FaTiktok, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            {/* <div className="flex  flex-col justify-center items-center bg-customBlue text-white p-5">
                <h1 className="font-semibold text-[16px] md:text-[20px] lg:text-[25px] xl:text-[30px]">KHÔNG CẦN ĐẾN SHOWROOM - CHÚNG TÔI MANG ĐẾN TẬN CỬA NHÀ BẠN</h1>
                <p className="font-sans text-[11px] md:text-sm lg:text-[16px] xl:text-[20px]">Chúng tôi đã làm hài lòng hơn 10,000+ Khách hàng trong và ngoài nước, từ nội thất gia đình đến nội thất văn phòng.</p>
            </div> */}
            <div className="w-full  bg-white border-b border-b-black text-gray-800 p-10">
                <div className="grid grid-cols-12 justify-between gap-7 ">
                    <div className="col-span-12 lg:col-span-3 md:col-span-6">
                        <h2 className="text-lg font-semibold">Dịch Vụ Khách Hàng</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Các Câu Hỏi Thường Gặp</a></li>
                            <li><a href="#" className="hover:underline">Hướng Dẫn Đặt Hàng</a></li>
                            <li><a href="#" className="hover:underline">Chính Sách Vận Chuyển</a></li>
                            <li><a href="#" className="hover:underline">Chính Sách Bảo Hành</a></li>
                            <li><a href="#" className="hover:underline">Hướng dẫn sử dụng Coupon</a></li>
                            <li><a href="#" className="hover:underline">Chính Sách Bảo Mật Thông Tin</a></li>
                            <li><a href="#" className="hover:underline">Thiết Kế Thi Công Nội Thất</a></li>
                            <li><a href="#" className="hover:underline">Hình Ảnh Nội Thất</a></li>
                            <li><a href="#" className="hover:underline">Kiến Thức Tiêu Dùng</a></li>
                            <li><a href="#" className="hover:underline">Phong Thuỷ Nội Thất</a></li>
                        </ul>
                    </div>

                    <div className="col-span-6 lg:col-span-2">
                        <h2 className="text-lg font-semibold">Vật Liệu</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Gỗ Cao Su</a></li>
                            <li><a href="#" className="hover:underline">Gỗ Tre Ép</a></li>
                            <li><a href="#" className="hover:underline">Gỗ Me Tây</a></li>
                            <li><a href="#" className="hover:underline">Gỗ Keo-Tràm</a></li>
                            <li><a href="#" className="hover:underline">Gỗ Thông</a></li>
                            <li><a href="#" className="hover:underline">Gỗ Plywood</a></li>
                            <li><a href="#" className="hover:underline">Sắt thép-inox</a></li>
                            <li><a href="#" className="hover:underline">Kính cường lực</a></li>
                            <li><a href="#" className="hover:underline">Đá</a></li>
                            <li><a href="#" className="hover:underline">Da, vải, simili</a></li>
                        </ul>
                    </div>


                    <div className="col-span-6 lg:col-span-2">
                        <h2 className="text-lg font-semibold">THIẾT KẾ - SẢN XUẤT</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Nội Thất Văn Phòng</a></li>
                            <li><a href="#" className="hover:underline">Gia công Inox Xi Mạ</a></li>
                            <li><a href="#" className="hover:underline">Gia công chân bàn sắt</a></li>
                            <li><a href="#" className="hover:underline">Nội Thất Phòng Cho Thuê</a></li>
                            <li><a href="#" className="hover:underline">Nội Thất Trường Học</a></li>
                            <li><a href="#" className="hover:underline">Quán Cafe - Nhà Hàng</a></li>
                            <li><a href="#" className="hover:underline">Nội Thất Gia Đình</a></li>
                        </ul>
                    </div>

                    <div className="col-span-6 lg:col-span-3 ">
                        <h2 className="text-lg font-semibold">Hỗ Trợ Khách Hàng</h2>
                        <div className="space-y-2 flex flex-col">
                            <h3 className="font-medium">Phòng Kinh Doanh</h3>
                            <span><PhoneOutlined /> 0364275585</span>
                            <span><MailOutlined /> truongha21062004@gmail.com</span>
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <h3 className="font-medium">Phòng Chăm Sóc Khách Hàng</h3>
                            <span><PhoneOutlined /> 0364275585</span>
                            <span><PhoneOutlined /> 0364275585</span>
                            <span><MailOutlined /> truongha21062004@gmail.com</span>
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <h3 className="font-medium">Phòng Kế Toán</h3>
                            <span><PhoneOutlined /> 0364275585</span>
                            <span><MailOutlined /> truongha21062004@gmail.com</span>
                        </div>
                    </div>

                    <div className="col-span-12 mx-auto lg:col-span-2">
                        <img src="../src/assets/Images/logo.jpg" alt="" width={120} className="object-contain" />
                        <h1 className="mt-4 text-;g font-semibold">Mạng Xã Hội</h1>
                        <div className="flex space-x-2 mt-2">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="text-2xl text-blue-600" />
                            </a>
                            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                                <FaTiktok className="text-2xl text-black" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-2xl text-red-600" />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <FaYoutube className="text-2xl text-red-600" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-2xl text-blue-400" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="font-bold mt-4">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ MODERN HOME</h1>
                <div className="text-center" >
                    <p>Kho Trưng Bày: 206/40 Đồng Đen, Phường 14, Quận Tân Bình, Tp.Hồ Chí Minh</p>
                    <p>Xưởng sản xuất: 1/25 Đông Hưng Thuận 10B, Đông Hưng Thuận, Quận 12, Tp Hồ Chí Minh</p>
                    <p>Website: www.mordenhome.com.vn Ι Email: truonghayho@mordenhome.com.vn</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
