import { useState } from "react";
import "./Description.scss";
import { Button } from "@mantine/core";
const DescriptionProduct = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <>
            <div className="description-container">
                <div className={`description ${isExpanded ? "expanded" : ""}`}>
                    <h3 className="description-title">Mô tả sản phẩm</h3>
                    <div className={`description-content }`}>
                        <p>
                            Sau một thời gian sử dụng, chiếc iPhone của bạn bị
                            tụt pin, máy hao pin một cách nhanh chóng, thậm chí
                            là tắt nguồn khi pin còn hiển thị 50%? Nhưng chỉ sạc
                            30 – 45 phút máy đã báo đầy? Những dấu hiệu này cảnh
                            báo cho bạn điện thoại của bạn đã bị chai pin, phải
                            thay pin mới thôi.
                        </p>
                        <h2>
                            Vậy vì sao bạn lại cần phải thay pin Bison iPhone ?
                        </h2>
                        <p>
                            Sau một thời gian sử dụng, chiếc iPhone của bạn bị
                            tụt pin, máy hao pin một cách nhanh chóng, thậm chí
                            là tắt nguồn khi pin còn hiển thị 50%? Nhưng chỉ sạc
                            30 – 45 phút máy đã báo đầy? Những dấu hiệu này cảnh
                            báo cho bạn điện thoại của bạn đã bị chai pin, phải
                            thay pin mới thôi.
                        </p>
                        <p>
                            Sau một thời gian sử dụng, chiếc iPhone của bạn bị
                            tụt pin, máy hao pin một cách nhanh chóng, thậm chí
                            là tắt nguồn khi pin còn hiển thị 50%? Nhưng chỉ sạc
                            30 – 45 phút máy đã báo đầy? Những dấu hiệu này cảnh
                            báo cho bạn điện thoại của bạn đã bị chai pin, phải
                            thay pin mới thôi.
                        </p>
                        <h2>
                            Vậy vì sao bạn lại cần phải thay pin Bison iPhone ?
                        </h2>
                        <p>
                            Sau một thời gian sử dụng, chiếc iPhone của bạn bị
                            tụt pin, máy hao pin một cách nhanh chóng, thậm chí
                            là tắt nguồn khi pin còn hiển thị 50%? Nhưng chỉ sạc
                            30 – 45 phút máy đã báo đầy? Những dấu hiệu này cảnh
                            báo cho bạn điện thoại của bạn đã bị chai pin, phải
                            thay pin mới thôi.
                        </p>
                        <p>
                            Sau một thời gian sử dụng, chiếc iPhone của bạn bị
                            tụt pin, máy hao pin một cách nhanh chóng, thậm chí
                            là tắt nguồn khi pin còn hiển thị 50%? Nhưng chỉ sạc
                            30 – 45 phút máy đã báo đầy? Những dấu hiệu này cảnh
                            báo cho bạn điện thoại của bạn đã bị chai pin, phải
                            thay pin mới thôi.
                        </p>
                        <h2>
                            Vậy vì sao bạn lại cần phải thay pin Bison iPhone ?
                        </h2>
                        <p>
                            Sau một thời gian sử dụng, chiếc iPhone của bạn bị
                            tụt pin, máy hao pin một cách nhanh chóng, thậm chí
                            là tắt nguồn khi pin còn hiển thị 50%? Nhưng chỉ sạc
                            30 – 45 phút máy đã báo đầy? Những dấu hiệu này cảnh
                            báo cho bạn điện thoại của bạn đã bị chai pin, phải
                            thay pin mới thôi.
                        </p>
                    </div>
                </div>
                <div className="description-button">
                    {isExpanded ? (
                        <Button
                            variant="default"
                            className="toggle-button button_description_hiden"
                            onClick={toggleDescription}
                        >
                            Thu gọn
                        </Button>
                    ) : (
                        <Button
                            variant="default"
                            className="toggle-button button_description_show"
                            onClick={toggleDescription}
                        >
                            Xem thêm
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default DescriptionProduct;
