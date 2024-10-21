
import { duong_dai_6 } from '@/assets/img';
import styles from './Content.module.scss';

const ContentPost = () => {
  return (
    <div className={styles.historyContainer}>
      <div className={styles.imageSection}>
        <img src={duong_dai_6} alt="Lịch sử hình thành" className={styles.image} />
      </div>
      <div className={styles.textSection}>
        <h2>LỊCH SỬ HÌNH THÀNH</h2>
        <ul>
          <li>
            <strong>2021:</strong> Khẳng định thương hiệu bền vững với những bước phát triển mới dù đối mặt
            những khó khăn do dịch bệnh Covid. Hệ thống cửa hàng mở rộng, với showroom mới tại Bình Dương.
          </li>
          <li>
            <strong>2020:</strong> Đơn vị chủ quản thương hiệu Nhà Xinh – AKA Furniture Group tái cơ cấu trở thành
            thành viên của tập đoàn AA Corporation – Tập đoàn sản xuất và thi công nội thất chất lượng cao hàng đầu Châu Á.
          </li>
          <li>
            <strong>2019:</strong> Đây là năm mang dấu ấn đặc biệt của thương hiệu Nhà Xinh – Đánh dấu chặng đường
            phát triển 20 năm. Với sự xuất hiện của 2 cửa hàng tại Nguyễn Văn Hưởng (Q2, HCM) và Trung tâm nội thất Thụy Khuê (Tây Hồ, Hà Nội)
          </li>
          <li>
            <strong>2016:</strong> Mở rộng hệ thống Nhà Xinh với 2 cửa hàng lớn ở ngay trung tâm thủ đô Hà Nội thuộc quận Hoàn Kiếm và quận Đống Đa.
          </li>
          <li>
            <strong>2011 – 2014:</strong> Khẳng định thương hiệu với sự xuất hiện của 2 cửa hàng mới tại ngã tư trung tâm Q1, TP.HCM (Hai Bà Trưng – Trần Cao Vân) và TTTM Royal City Hà Nội.
          </li>
          <li>
            <strong>2005 – 2010:</strong> Phát triển mạnh mẽ với hệ thống cửa hàng trên các khu đô thị mới là Nhà Xinh Yên Hòa, Nhà Xinh Phú Mỹ Hưng và Nhà Xinh Centre – khu vực trung tâm Q1.
          </li>
          <li>
            <strong>2002 – 2005:</strong> Nhà Xinh Cát Linh tại Hà Nội và Nhà Xinh Citimart tại TP.HCM nhằm hoàn thiện hệ thống và phục vụ tốt hơn cho Khách hàng.
          </li>
          <li>
            <strong>1999:</strong> Ra đời với 2 cửa hàng lớn tại Hà Nội và TP.HCM, mang đậm phong cách riêng về thiết kế và cách bày trí.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContentPost;
