import { dia_chi } from "@/assets/img";
import styles from "./Contact.module.scss";
import { AspectRatio } from "@mantine/core";

const ContactPage = () => {
    const latitude = 20.93842860324119;
    const longitude = 105.69620715330682;

    return (
        <div className={styles.contactPage}>
            <h1 className={styles.title}>Trang Liên Hệ</h1>

            <div className={styles.infoSection}>
                <div className={styles.contactInfo}>
                    <h2>Thông tin người hỗ trợ</h2>
                    <div className={styles.contactItem}>
                        <label htmlFor="name">Tên:</label>
                        <input
                            type="text"
                            id="name"
                            value="Trọng Luật"
                            readOnly
                        />
                    </div>
                    <div className={styles.contactItem}>
                        <label htmlFor="phone">Điện thoại:</label>
                        <input
                            type="text"
                            id="phone"
                            value="0378400050"
                            readOnly
                        />
                    </div>
                    <div className={styles.contactItem}>
                        <label htmlFor="address">Địa chỉ:</label>
                        <input
                            type="text"
                            id="address"
                            value="Thôn Trại, Tốt Động, Chương Mỹ, Hà Nội"
                            readOnly
                        />
                    </div>
                </div>

                <div className={styles.addressImages}>
                    <h2>Ảnh Địa Chỉ Shop</h2>
                    <img
                        src={dia_chi}
                        alt="Địa chỉ 1"
                        className={styles.addressImage}
                    />
                </div>
            </div>

            <div className={styles.mapSection}>
                <h2>Bản Đồ</h2>

                <AspectRatio ratio={16 / 9}>
                    <iframe
                        src={`https://www.google.com/maps?q=${latitude},${longitude}&t=k&z=16&output=embed&hl=vi`}
                        className="map"
                        allowFullScreen
                    />
                </AspectRatio>
            </div>
        </div>
    );
};

export default ContactPage;
