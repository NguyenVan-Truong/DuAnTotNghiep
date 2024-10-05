import { banner, banner_footer1, banner_footer2, banner_footer6 } from "@/assets/img";
import './ChiTietSP.scss';
import { useState } from "react";
import ListProducts from "../Product/Category/ListProduct/Listproduct";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules




const ChiTietSP = () => {
    const [activeTab, setActiveTab] = useState('warranty');
    const [isLiked, setIsLiked] = useState(false);
   

    const handleLike = () => {
        setIsLiked(!isLiked);
    }
    return (
        <div className="product-container">
            <div className="menu">
                <a href="#">Trang Chủ</a> / <a href="#">Phòng Khách</a> / <a href="#">Sofa</a>
            </div>

            <div className="product-content">
                {/* Phần bên trái: Slider dọc */}
                


                {/* Phần bên giữa: Slider chính */}
                

                {/* Phần bên phải: Chi tiết sản phẩm */}
                <div className="product-detail-container">
                    {/* Tiêu đề sản phẩm */}
                    <h1>Sofa 3 chỗ Orientale da beige R5</h1>
                    <div className="heart-button" onClick={handleLike}>
                        {isLiked ? '💖' : '🤍'}
                    </div>
                    {/* Giá sản phẩm */}
                    <div className="price">
                        <span>135,750,000 đ</span>
                    </div>

                    {/* Thông tin vật liệu và kích thước */}
                    <div className="product-info">
                        <div className="info-row">
                            <label>Vật liệu</label>
                            <input type="text" placeholder="text" value="Khung gỗ Walnut tự nhiên - Nệm bọc da bò tự nhiên cao cấp màu Beige R5" readOnly />
                        </div>
                        <div className="info-row">
                            <label>Kích thước</label>
                            <input type="text" placeholder="text" value="D2300 - R945 - C390/780 mm" readOnly />
                        </div><br></br>
                        <div className="info-row-1">
                            <label>Mã sản phẩm</label>
                            <input type="text" placeholder="text" value="3*113663" readOnly />
                        </div>
                        <div className="info-row-1">
                            <label>Danh mục</label>
                            <input type="text" placeholder="text" value="Phòng khách, Sofa" readOnly />
                        </div>
                        <br />
                        <div className="info-row status">
                            <br />
                            <span>Không có sẵn</span>
                        </div>
                    </div>

                    {/* Tab điều hướng cho Bảo Hành và Vận Chuyển */}
                    <div className="tabs">
                        <button
                            className={activeTab === 'warranty' ? 'active' : ''}
                            onClick={() => setActiveTab('warranty')}
                        >
                            Bảo Hành
                        </button>
                        <button
                            className={activeTab === 'shipping' ? 'active' : ''}
                            onClick={() => setActiveTab('shipping')}
                        >
                            Vận Chuyển
                        </button>
                    </div>

                    {/* Nội dung của các tab */}
                    <div className="tab-content">
                        {activeTab === 'warranty' && (
                            <div className="warranty-content">
                                <ul>
                                    <li>
                                        Các sản phẩm nội thất tại Nhà Xinh đa số đều được sản xuất tại nhà máy của công ty cổ phần xây dựng kiến trúc AA với đội ngũ nhân viên và công nhân ưu tú cùng cơ sở vật chất hiện đại (http://www.aacorporation.com/). Nhà Xinh đã kiểm tra kỹ lưỡng từ nguồn nguyên liệu cho đến sản phẩm hoàn thiện cuối cùng.
                                    </li>
                                    <li>
                                        Nhà Xinh bảo hành một năm cho các trường hợp có lỗi về kỹ thuật trong quá trình sản xuất hay lắp đặt.
                                    </li>
                                    <li>
                                        Quý khách không nên tự sửa chữa mà hãy báo ngay cho Nhà Xinh qua hotline: 1800 7200.
                                    </li>
                                    <li>
                                        Sau thời gian hết hạn bảo hành, nếu quý khách có bất kỳ yêu cầu hay thắc mắc thì vui lòng liên hệ với Nhà Xinh để được hướng dẫn và giải quyết các vấn đề gặp phải.
                                    </li>
                                </ul>
                                <p>TUY NHIÊN NHÀ XINH KHÔNG BẢO HÀNH CHO CÁC TRƯỜNG HỢP SAU:</p>
                                <ul>
                                    <li>
                                        Khách hàng tự ý sửa chữa khi sản phẩm bị trục trặc mà không báo cho Nhà Xinh.
                                    </li>
                                    <li>
                                        Sản phẩm được sử dụng không đúng quy cách của sổ bảo hành (được trao gửi khi quý khách mua sản phẩm) gây nên trầy xước, móp, dơ bẩn hay mất màu.
                                    </li>
                                    <li>
                                        Sản phẩm bị biến dạng do môi trường bên ngoài bất bình thường (quá ẩm, quá khô, mối hay do tác động từ các thiết bị điện nước, các hóa chất hay dung môi khách hàng sử dụng không phù hợp).
                                    </li>
                                    <li>
                                        Sản phẩm hết hạn bảo hành.
                                    </li>
                                    <li>
                                        Sản phẩm không có phiếu bảo hành của Nhà Xinh.
                                    </li>
                                    <li>
                                        Xem nội dung sổ bảo hành
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="shipping-content">
                                <ul>
                                    <li>
                                        Nhà Xinh cung cấp dịch vụ giao hàng tận nơi, lắp ráp và sắp xếp vị trí theo đúng ý muốn của quý khách:
                                    </li>
                                    <li>
                                        MIỄN PHÍ giao hàng trong các Quận nội thành Tp.Hồ Chí Minh và Hà Nội, áp dụng cho các đơn hàng trị giá trên 10 triệu.
                                    </li>
                                    <li>
                                        Đối với khu vực các tỉnh lân cận: Tính phí hợp lý theo dựa trên quãng đường vận chuyển
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <div className="product-title-1">
                    <p>Có Thể Bạn Cũng Thích</p>
                </div>
                <ListProducts />
            </div>
            <div>
                <div className="product-title-2">
                    <h2>SẢN PHẨM VỪA XEM</h2>
                    <div className="container">
                        <div className="left">
                            <img src={banner_footer6} alt="Sofa Image" className="image-left" />
                        </div>

                        <div className="middle">
                            <div className="content">
                                <h2>Mẫu thiết kế phòng khách</h2>
                                <p>Phòng khách là không gian chính của ngôi nhà, là nơi sum họp gia đình</p>
                                <a href="#">MẪU PHÒNG KHÁCH →</a>
                            </div>
                            <div className="content">
                                <h2>Đồ trang trí</h2>
                                <p>Mang lại những nguồn cảm hứng và nét sinh động cho không gian</p>
                                <a href="#">KHÁM PHÁ →</a>
                            </div>
                        </div>

                        <div className="right">
                            <img src={banner} alt="Decor Image" className="image-right" />
                        </div>
                    </div>
                    <div className="design-examples">
                        <div className="design-example design-example-1">
                            <div className="image-container">
                                <img src={banner_footer2} alt="Mẫu thiết kế phòng ngủ" />
                            </div>
                            <div className="content-container">
                                <h3>Mẫu thiết kế phòng ngủ</h3>
                                <p>Những mẫu phòng ngủ của Nhà Xinh mang đến cảm giác ấm cúng, gần gũi và thoải mái</p>
                                <a href="#" className="read-more">MẪU PHÒNG NGỦ →</a>
                            </div>
                        </div>

                        <div className="design-example design-example-2">
                            <div className="image-container">
                                <img src={banner_footer1} alt="Mẫu thiết kế phòng ăn" />
                            </div>
                            <div className="content-container">
                                <h3>Mẫu thiết kế phòng ăn</h3>
                                <p>Một bữa ăn ngon luôn là mong ước của mỗi gia đình. Không gian phòng ăn đóng vai trò rất quan trọng trong văn hóa Việt.</p>
                                <a href="#" className="read-more">MẪU PHÒNG ĂN →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChiTietSP;