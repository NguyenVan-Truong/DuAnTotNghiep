import { duong_dai_5_new, duong_dai_6 } from '@/assets/img';
import styles from './StoryNew.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface NewsItem {
    id: number;
    title: string;
    meta_description: string;
    created_at: string;
    image: string;
}

const StoryNew = () => {

    const [newsData, setNewsData] = useState<NewsItem[]>([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu bài viết
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/posts');
                setNewsData(response.data);
            } catch (error) {
                console.error('Không Thể Tải Dữ Liệu:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>CHUYỆN NHÀ XINH</h1>
            <div className={styles.newsContainer}>
                {newsData.map((newsItem) => (
                    <div key={newsItem.id} className={styles.newsItem}>
                        <img src={newsItem.image} alt={newsItem.title} className={styles.newsImage} />
                        <div className={styles.newsDetails}>
                            <div className={styles.newsDate}>{new Date(newsItem.created_at).toLocaleDateString()}</div>
                            <h2 className={styles.newsTitle}>{newsItem.title}</h2>
                            <p className={styles.newsDescription}>
                                {newsItem.meta_description}
                            </p>
                        </div>
                    </div>
                ))}
                {/* <div className={styles.newsItem}>
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
                </div> */}
            </div>
        </div>
    );
};

export default StoryNew;
