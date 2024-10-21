import { duong_dai_5_new, duong_dai_6 } from '@/assets/img';
import styles from './StoryNew.module.scss';

const StoryNew = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>CHUYỆN NHÀ XINH</h1>
            <div className={styles.newsContainer}>
                <div className={styles.newsItem}>
                    <img src={duong_dai_5_new} alt="Cùng LG và AKA" className={styles.newsImage} />
                    <div className={styles.newsDetails}>
                        <div className={styles.newsDate}>15 Jul</div>
                        <h2 className={styles.newsTitle}>Cùng LG VÀ AKA “Nâng tầm không gian – Sống sang đẳng cấp”</h2>
                        <p className={styles.newsDescription}>
                            Sự kiện hợp tác đặc biệt giữa LG Electronics (LG) và AKA Furniture (AKA), mang đến sự mới mẻ cho không gian sống của người Việt.
                        </p>
                    </div>
                </div>
                <div className={styles.newsItem}>
                    <img src={duong_dai_6} alt="Tập đoàn AA Corporation" className={styles.newsImage} />
                    <div className={styles.newsDetails}>
                        <div className={styles.newsDate}>11 Jun</div>
                        <h2 className={styles.newsTitle}>Tập đoàn AA Corporation Gây Ấn Tượng Tại INDEX Dubai 2024</h2>
                        <p className={styles.newsDescription}>
                            Gian hàng của AA Corporation tại INDEX 2024 nổi bật với thiết kế độc đáo, thu hút sự chú ý từ khách tham quan.
                        </p>
                    </div>
                </div>
                <div className={styles.newsItem}>
                    <img src={duong_dai_5_new} alt="Bàn làm việc Wing" className={styles.newsImage} />
                    <div className={styles.newsDetails}>
                        <div className={styles.newsDate}>16 Apr</div>
                        <h2 className={styles.newsTitle}>Bàn làm việc Wing tại Milan Design Week 2024</h2>
                        <p className={styles.newsDescription}>
                            Là thiết kế Việt đầu tiên đạt giải thưởng danh giá iF Design Award 2024, Bàn làm việc Wing nhận được nhiều sự chú ý từ cộng đồng thiết kế quốc tế.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryNew;
