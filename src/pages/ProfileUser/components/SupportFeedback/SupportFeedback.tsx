import React from "react";
import { Card, Grid, Text, Badge, Button, Loader, Image } from "@mantine/core";
import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { message } from "antd";
import { Feedback } from "@/modals/Supports";

const SupportFeedback = () => {
    const queryClient = useQueryClient();

    // Hàm lấy dữ liệu
    const fetchData = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Giả lập độ trễ
        const response = await instance.get("/contacts/show");
        return response?.data?.data?.contacts || []; // Trả về danh sách phản hồi
    };

    // Sử dụng useQuery với kiểu dữ liệu cụ thể
    const { data, error, isLoading, isError, refetch } = useQuery<Feedback[]>({
        queryKey: ["contactShow"],
        queryFn: fetchData,
    });

    // Hàm xóa phản hồi
    const deleteFeedback = async (id: number) => {
        await instance.delete(`contacts/${id}`); // Gọi API xóa
    };

    const mutation = useMutation({
        mutationFn: deleteFeedback,
        onSuccess: () => {
            refetch(); // Gọi lại hàm fetch để lấy dữ liệu mới
            message.success("Xóa thành công");
        },
        onError: (error) => {
            console.error("Error deleting feedback:", error);
            message.error("Xóa không thành công"); // Hiển thị thông báo lỗi
        },
    });

    // Hiển thị khi đang tải dữ liệu
    if (isLoading) {
        return <Loader />;
    }

    // Hiển thị thông báo lỗi nếu có
    if (isError) {
        console.error(error);
        return (
            <Text color="red">
                Có lỗi xảy ra khi tải dữ liệu: {error.message}
            </Text>
        );
    }

    return (
        <div className="p-5 bg-white">
            <Text size="xl" mb="md">
                Danh sách thư hỗ trợ đã gửi
            </Text>
            <Grid gutter="md">
                {data?.map(
                    (
                        feedback: Feedback, // Sử dụng kiểu Feedback
                    ) => (
                        <Grid.Col span={4} key={feedback.id}>
                            <Card padding="lg" shadow="sm" radius="md">
                                <Image
                                    src={feedback.image}
                                    alt="Hình ảnh phản hồi"
                                />
                                <Text mt="sm">
                                    Nội dung: {feedback.content}
                                </Text>
                                <Text mt="sm">
                                    Phản hồi:{" "}
                                    {feedback.response || "Chưa có phản hồi"}
                                </Text>
                                <Text size="xs" color="dimmed" mt="xs">
                                    Ngày gửi:{" "}
                                    {dayjs(feedback.created_at).format(
                                        "DD-MM-YYYY",
                                    )}
                                </Text>
                                <Badge
                                    color={
                                        feedback.status === "đã phản hồi"
                                            ? "green"
                                            : "red"
                                    }
                                    mt="xs"
                                >
                                    {feedback.status}
                                </Badge>
                                <Button
                                    variant="outline"
                                    color="red"
                                    size="xs"
                                    mt="md"
                                    onClick={() => mutation.mutate(feedback.id)} // Gọi hàm xóa khi click
                                >
                                    Xóa
                                </Button>
                                <Button
                                    variant="outline"
                                    color="blue"
                                    size="xs"
                                    mt="md"
                                >
                                    Xem chi tiết
                                </Button>
                            </Card>
                        </Grid.Col>
                    ),
                )}
            </Grid>
        </div>
    );
};

export default SupportFeedback;
