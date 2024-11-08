import { Box, Flex, Rating } from "@mantine/core";
import { IconCornerDownRightDouble } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import "./Comment.scss";
import { useLocation } from "react-router-dom";
import instance from "@/configs/axios";

const CommentProductDetail = () => {
    const location = useLocation();
    const [openCommentIds, setOpenCommentIds] = useState<number[]>([]);
    const [data, setData] = useState<any>([]); // Initial state for reviews and average rating

    // Hàm lấy dữ liệu từ API
    // const fetchData = async () => {
    //     try {
    //         const response = await instance.get(
    //             `/products/${location.state.id}/reviews`,
    //         );
    //         console.log("API Response:", response.data);

    //         // Set dữ liệu vào state
    //         setData(response.data);
    //     } catch (error) {
    //         console.error("Error fetching reviews:", error);
    //     }
    // };

    // Gọi API khi component mount
    useEffect(() => {
        (async () => {
            try {
                const response = await instance.get(
                    `/products/${location.state.id}/reviews`,
                );
                console.log("API Response:", response.data);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        })();
    }, [location.state.id]);

    console.log("data456", data);

    return (
        <div className="rating-container">
            <Flex direction="column" gap="md">
                <Flex direction="column" gap="">
                    {/* start-rating-top */}
                    <div className="rating-header">
                        <p>Khách hàng chấm điểm, đánh giá, nhận xét</p>
                    </div>
                    {/* end-rating-top */}

                    <div className="rating-divider">{/* thanh ngang */}</div>

                    {/* start-rating-center */}
                    <Flex gap="sm" className="rating-summary">
                        <div className="flex">
                            <div className="rating-summary-average">
                                <p className="rating-average-score">
                                    {/* {averageRating}/5 */}
                                    {data.average_rating}/5
                                </p>
                                <Rating
                                    defaultValue={data.average_rating} // Use the actual average rating from the API
                                    size="md"
                                    readOnly
                                    className="average-icon"
                                />
                            </div>
                        </div>

                        <Flex
                            direction="row"
                            className="rating-summary-breakdown"
                        >
                            <div className="rating-summary-breakdown-item">
                                Tất cả
                            </div>
                            <Flex
                                direction="row"
                                className="rating-summary-breakdown-item"
                            >
                                5{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                className="rating-summary-breakdown-item"
                            >
                                4{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                className="rating-summary-breakdown-item"
                            >
                                3{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                className="rating-summary-breakdown-item"
                            >
                                2{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                className="rating-summary-breakdown-item"
                            >
                                1{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                        </Flex>
                    </Flex>
                    {/* end-rating-center */}

                    <div className="rating-divider">{/* thanh ngang */}</div>

                    {/* start-rating-bottom */}
                    <Flex
                        direction="row"
                        className="rating-details"
                        justify="start"
                    >
                        <div className="mx-auto p-5 border rounded-lg shadow-lg bg-white w-full">
                            <h2 className="text-2xl font-bold mb-4">
                                Danh sách đánh giá
                            </h2>

                            <div>
                                {data.reviews.map(
                                    (comment: any) =>
                                        // <div key={comment.id}>
                                        //     <div className="border-b py-4 cursor-pointer">
                                        //         <h4 className="font-bold">
                                        //             {comment.name}
                                        //         </h4>
                                        //         <p>{comment.content}</p>

                                        //         {comment.adminResponse && (
                                        //             <p
                                        //                 style={{
                                        //                     fontSize: "15px",
                                        //                     fontWeight: "bold",
                                        //                     color: "#ff4500",
                                        //                     display: "flex",
                                        //                     alignItems: "center",
                                        //                 }}
                                        //             >
                                        //                 <IconCornerDownRightDouble
                                        //                     style={{
                                        //                         fontSize: "24px",
                                        //                         marginLeft: "8px",
                                        //                         color: "#ff4500",
                                        //                     }}
                                        //                 />
                                        //                 Phản hồi của admin
                                        //             </p>
                                        //         )}
                                        //         {comment.adminResponse &&
                                        //             openCommentIds.includes(
                                        //                 comment.id,
                                        //             ) && (
                                        //                 <Box className="admin-response mt-2 p-2 bg-gray-100 rounded">
                                        //                     <strong>Admin:</strong>{" "}
                                        //                     {comment.adminResponse}
                                        //                 </Box>
                                        //             )}
                                        //     </div>
                                        // </div>
                                        123,
                                )}
                            </div>
                        </div>
                    </Flex>
                    {/* end-rating-bottom */}
                </Flex>
            </Flex>
        </div>
    );
};

export default CommentProductDetail;
