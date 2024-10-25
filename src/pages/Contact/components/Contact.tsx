import { dia_chi } from '@/assets/img';
import styles from './Contact.module.scss';

const ContactPage = () => {
  return (
    <div className={styles.contactPage}>
      <h1 className={styles.title}>Trang Liên Hệ</h1>
      
      <div className={styles.infoSection}>
        <div className={styles.contactInfo}>
          <h2>Thông tin người hỗ trợ</h2>
          <div className={styles.contactItem}>
            <label htmlFor="name">Tên:</label>
            <input type="text" id="name" value="Trọng Luật" readOnly />
          </div>
          <div className={styles.contactItem}>
            <label htmlFor="phone">Điện thoại:</label>
            <input type="text" id="phone" value="0378400050" readOnly />
          </div>
          <div className={styles.contactItem}>
            <label htmlFor="address">Địa chỉ:</label>
            <input type="text" id="address" value="Thôn Trại, Tốt Động, Chương Mỹ, Hà Nội" readOnly />
          </div>
          <div className={styles.messageSection}>
                <h2 className={styles.messageTitle}>Lời Nhắn</h2>
                <p className={styles.messageDescription}>
                    Hãy để lại email của bạn để nhận được những ý tưởng trang trí mới và những thông tin, ưu đãi từ MORDEN HOME.
                </p>
                <p>Email: support@mordenhome.com</p>
                <div className={styles.emailForm}>
                    <input type="email" placeholder="Email của bạn" className={styles.emailInput} />
                    <button className={styles.submitButton}>Submit</button>
                </div>
            </div>
        </div>

        <div className={styles.addressImages}>
          <h2>Ảnh Địa Chỉ Shop</h2>
          <img src={dia_chi} alt="Địa chỉ 1" className={styles.addressImage} />
        </div>
      </div>
      
      <div className={styles.mapSection}>
        <h2>Bản Đồ</h2>
        <iframe
          title="Google Map"
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.924022723537!2d105.81641441532968!3d21.02281639343815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abfd2bfa805f%3A0x86b6b2eabae9f128!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1605727254632!5m2!1sen!2s"
          allowFullScreen={true}
        />
      </div>
      <div className={styles.editButton}>
        <button>Edit</button>
      </div>
    </div>
  );
};

export default ContactPage;
