
import { banner2 } from '@/assets/img';
import styles from './Content.module.scss';

const Quality = () => {
    return (
        <div className={styles.valuesContainer}>

            <div className={styles.imageSection}>
                <img src={banner2} alt="Giá trị của Nhà Xinh" className={styles.image} />
            </div>
            <div className={styles.textSection}>
                <h2>Chất lượng và dịch vụ</h2>
                <p>
                Chất lượng của nguyên vật liệu, phụ kiện và quy trình sản xuất đều được kiểm định và giám sát chặt chẽ bởi hệ thống quản lý chất lượng ISO 9001. Sản phẩm của Nhà Xinh được thiết kế theo định hướng công năng sử dụng, thẩm mỹ và chất lượng. Trong những năm gần đây, thương hiệu luôn hướng đến xu hướng thiết kế xanh nhằm đóng góp không chỉ một không gian sống tiện nghi mà còn là một môi trường sống trong lành cho người sử dụng và cộng đồng. Với nhiều cống hiến như vậy, Nhà Xinh vinh dự nhiều năm liền được trao tặng các danh hiệu “Hàng Việt Nam chất lượng cao”, “Trusted brand” và “Top 100 nhà cung cấp hàng đầu”.
                </p>
                <p>
                Bên cạnh đó, Nhà Xinh tự hào sở hữu đội ngũ tư vấn thiết kế và kỹ sư chuyên nghiệp, có kiến thức sâu rộng trong lĩnh vực đồ gỗ nội thất. Tập thể nhân viên tại Nhà Xinh cam kết nỗ lực tư vấn và trợ giúp khách hàng lựa chọn sản phẩm ưng ý nhất. Dịch vụ tư vấn thiết kế của Nhà Xinh sẽ giúp khách hàng kiến tạo một không gian sống như ý thông qua sự phối hợp điêu luyện giữa các sản phẩm nội thất và đồ trang trí.
                </p>
            </div>
        </div>
    );
};

export default Quality;
