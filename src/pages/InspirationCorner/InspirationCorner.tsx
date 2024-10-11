
import Inspiration from './BannerInspirationCorner';
import Carousle from './Carousle';

import style from './InspirationCorner.module.scss';
import { BannerBottom2, footer } from '@/assets/img';

const InspirationCorner = () => {
    return (
        <div>
        <div className={style.imageGallery}>
        {/* Ảnh chính */}
        <div className={style.mainImageContainers}>
          <div className={style.mainImageContainer}>
            <img
            src={BannerBottom2}
            alt="Main Banner"
            className={style.mainImage}
            />
          </div>
          <div className={style.overlay}>
            <p className={style.smallText}>Góc cảm hứng</p>
            <h1>Ý TƯỞNG KHÔNG GIAN SỐNG</h1>
            <button className={style.overlayButton}>XEM THÊM</button>
          </div>
        </div>
  
        {/* Ảnh nhỏ */}
        <div className={style.sideImages}>
          <div className={style.sideImageContainer}>
            <img src={footer} alt="Side Image 1" className={style.sideImage} />
          </div>
          <div className={style.sideImageContainer}>
            <img src={footer} alt="Side Image 2" className={style.sideImage} />
          </div>
        </div>
      </div>
      <div className={style.bannerGCH}>
        <Inspiration />
        <Carousle />
      </div>
      <div className={style.XemTatCa}>
            <button className={style.ButtonXem}>XEM TẤT CẢ</button>
          </div>
      </div>
      );
};

export default InspirationCorner;