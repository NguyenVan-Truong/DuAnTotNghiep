import instance from "@/configs/axios";
import { Box, Button, Rating, Textarea } from "@mantine/core";
import { message } from "antd";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { modals } from "@mantine/modals";

const ProductReviews = ({ data, onSuccess }: any) => {
    const form = useForm({
        initialValues: {
            rating: 0,
            review: "",
        },
        validate: {
            rating: (value) => {
                if (value === 0) return "Vui lòng đánh giá sản phẩm.";
                return null;
            },
            review: (value) => {
                if (!value.trim()) return "Phản hồi không được để trống.";
                return null;
            },
        },
    });

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            await instance.post(`/reviews/store/${data?.id}`, {
                rating: values.rating,
                review: values.review,
            });
            modals.closeAll();
            message.success("Đánh giá thành công!");
        } catch (error) {
            message.error("Không thành công, vui lòng thử lại.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <h2>Đánh giá sản phẩm: {data?.product_name}</h2>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                {/* Rating component */}
                <label>Đánh giá sản phẩm</label>
                <Rating
                    value={form.values.rating}
                    onChange={(value) => form.setFieldValue("rating", value)}
                    size="lg"
                />
                {form.errors.rating && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                        {form.errors.rating}
                    </div>
                )}

                {/* Textarea for review */}
                <label>Phản hồi của bạn</label>
                <Textarea
                    value={form.values.review}
                    onChange={(e) =>
                        form.setFieldValue("review", e.target.value)
                    }
                    placeholder="Nhập phản hồi của bạn"
                    minRows={4}
                />
                {form.errors.review && (
                    <div style={{ color: "red", fontSize: "12px" }}>
                        {form.errors.review}
                    </div>
                )}

                {/* Submit button */}
                <Button type="submit" loading={loading}>
                    Gửi đánh giá
                </Button>
            </form>
        </Box>
    );
};

export default ProductReviews;
