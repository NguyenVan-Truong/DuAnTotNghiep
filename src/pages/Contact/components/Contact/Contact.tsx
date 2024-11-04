import { dia_chi } from "@/assets/img";
import styles from "./Contact.module.scss";
import { AspectRatio, Loader } from "@mantine/core";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Information } from "@/modals/Information";

const ContactPage = () => {
    const latitude = 20.93842860324119;
    const longitude = 105.69620715330682;

    const fetchData = async () => {
        try {
            const respone = await instance.get("/information");
            return respone.data;
        } catch (error) {
            console.log(error);
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
        console.error(error);
    }
    return (
        <div className={styles.contactPage}>
            <h1 className={styles.title}>Trang Liên Hệ</h1>
            {data?.map((item) => (
                <>
                    <div className={styles.infoSection}>
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
                </>
            ))}
        </div>
    );
};

export default ContactPage;
