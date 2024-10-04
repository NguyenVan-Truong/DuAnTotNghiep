import {
    IconBed,
    IconBuildingStore,
    IconCaravan,
    IconFiretruck,
    IconFountain,
    IconGardenCart,
    IconIroningSteam,
    IconMountain
} from "@tabler/icons-react";
import Slider from "react-slick";
import styles from "./SliderFooterIcon.module.scss";
const SliderFooter = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };
    return (
        <div className="container">
            <div className="slider-container">
                <Slider {...settings}>
                    <div>
                        <IconBed stroke={2} className={styles.icons} />
                    </div>
                    <div>
                        <IconGardenCart stroke={2} className={styles.icons} />
                    </div>
                    <div>
                        <IconCaravan stroke={2} className={styles.icons} />
                    </div>
                    <div>
                        <IconIroningSteam stroke={2} className={styles.icons} />
                    </div>
                    <div>
                        <IconBuildingStore
                            stroke={2}
                            className={styles.icons}
                        />
                    </div>
                    <div>
                        <IconFiretruck stroke={2} className={styles.icons} />
                    </div>{" "}
                    <div>
                        <IconFountain stroke={2} className={styles.icons} />
                    </div>{" "}
                    <div>
                        <IconMountain stroke={2} className={styles.icons} />
                    </div>{" "}
                </Slider>
            </div>
        </div>
    );
};

export default SliderFooter;
