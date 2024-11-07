import { dia_chi } from "@/assets/img";
import styles from "./Contact.module.scss";
import { AspectRatio, Loader } from "@mantine/core";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Information } from "@/model/Information";

const ContactPage = () => {
    const fetchData = async () => {
        try {
            const response = await instance.get("/information");
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw new Error("Không thể tải dữ liệu liên hệ");
        }
    };

    const { data, error, isLoading, isError } = useQuery<Information[]>({
        queryKey: ["contactShow"],
        queryFn: fetchData,
    });

    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return (
            <div>
                Đã xảy ra lỗi khi tải dữ liệu liên hệ. Vui lòng thử lại sau.
            </div>
        );
    }

    if (!data) {
        return <div>Không có thông tin liên hệ nào để hiển thị.</div>;
    }

    return (
        <div className={styles.contactPage}>
            <h1 className={styles.title}>Trang Liên Hệ</h1>
            {data.map((item) => (
                <div className={styles.infoSection} key={item.id}>
                    <div className={styles.contactInfo}>
                        <h2>Thông tin người hỗ trợ</h2>
                        <div className={styles.contactItem}>
                            <label htmlFor="name">Tên:</label>
                            <input
                                type="text"
                                id="name"
                                value={item.name}
                                readOnly
                            />
                        </div>
                        <div className={styles.contactItem}>
                            <label htmlFor="phone">Điện thoại:</label>
                            <input
                                type="text"
                                id="phone"
                                value={item.phone}
                                readOnly
                            />
                        </div>
                        <div className={styles.contactItem}>
                            <label htmlFor="address">Địa chỉ:</label>
                            <input
                                type="text"
                                id="address"
                                value={item.address}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className={styles.addressImages}>
                        <h2>Ảnh Địa Chỉ Shop</h2>
                        <img
                            src={item.image}
                            alt="Địa chỉ 1"
                            className={styles.addressImage}
                        />
                    </div>

                    <div className={styles.mapSection}>
                        <h2>Bản Đồ</h2>
                        <AspectRatio ratio={16 / 9}>
                            <iframe
                                src={item.map}
                                className="map"
                                allowFullScreen
                            />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactPage;
