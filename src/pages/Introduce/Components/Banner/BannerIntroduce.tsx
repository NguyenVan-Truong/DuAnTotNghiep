
import { gioi_thieu } from '@/assets/img';
import styles from './BannerIntroduce.module.scss';

const BannerIntroduce = () => {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src={gioi_thieu} alt="Nhà Xinh" className={styles.bannerImage} />
        <div className={styles.overlay}>
          <p className={styles.leftText}>Về chúng tôi</p>
          <div className={styles.rightButtons}>
            <button className={styles.button}>Trang chủ</button>
            <button className={styles.button}>Giới thiệu</button>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default BannerIntroduce;
