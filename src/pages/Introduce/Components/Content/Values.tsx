

import { ghe_ngoi_lam_viec_phu_hop } from '@/assets/img';
import styles from './Content.module.scss';

const Values = () => {
    return (
        <div className={styles.valuesContainer}>

            <div className={styles.imageSection}>
                <img src={ghe_ngoi_lam_viec_phu_hop} alt="Giá trị của Nhà Xinh" className={styles.image} />
            </div>
            <div className={styles.textSection}>
                <h2>Giá trị và sự khác biệt</h2>
                <p>
                    Với mong muốn phát triển thương hiệu Việt bằng nội lực, Nhà Xinh đã chú trọng vào thiết kế và sản xuất nội thất trong nước.
                    Danh mục sản phẩm của Nhà Xinh thường xuyên được đổi mới và cập nhật, liên tục cung cấp cho khách hàng các dòng sản phẩm theo xu hướng mới nhất.
                </p>
                <p>
                    Hơn 70% sản phẩm của Nhà Xinh được thiết kế, sản xuất bởi đội ngũ nhân viên cùng công nhân ưu tú với nhà máy có cơ sở vật chất hiện đại bậc nhất tại Việt Nam.
                </p>
                <p>
                    Sự khác biệt của Nhà Xinh chính là sáng tạo nội thất thành phong cách riêng, phù hợp với nhu cầu khách hàng.
                    Không chỉ là sản phẩm nội thất đơn thuần, mà còn là không gian sống theo phong cách riêng với cách bày trí hài hòa từ đồ nội thất kết hợp với đồ trang trí.
                    Giúp khách hàng cảm nhận được một không gian sống thực sự, cảm thấy thoải mái để tận hưởng cuộc sống.
                </p>
            </div>
        </div>
    );
};

export default Values;
