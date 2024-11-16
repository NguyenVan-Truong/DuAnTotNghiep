import { Box, Flex, Rating, ScrollArea } from "@mantine/core";
import "./Comment.scss";
import { IconCornerDownRightDouble } from "@tabler/icons-react";
import { Image } from "antd";
import { formatDate } from "@/model/_base/Date";
type Props = {
    data: any;
    setValueRating: any;
};
const CommentProductDetail = ({ data, setValueRating }: Props) => {
    const dataComments = data.reviews.data;
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
                                    // Use the actual average rating from the API
                                    defaultValue={data.average_rating}
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
                            <div
                                className="rating-summary-breakdown-item"
                                onClick={() => setValueRating(0)}
                                style={{ cursor: "pointer" }}
                            >
                                Tất cả
                            </div>
                            <Flex
                                direction="row"
                                className="rating-summary-breakdown-item"
                                onClick={() => setValueRating(5)}
                                style={{ cursor: "pointer" }}
                            >
                                5{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                className="rating-summary-breakdown-item"
                                onClick={() => setValueRating(4)}
                                style={{ cursor: "pointer" }}
                            >
                                4{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                onClick={() => setValueRating(3)}
                                className="rating-summary-breakdown-item"
                                style={{ cursor: "pointer" }}
                            >
                                3{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                onClick={() => setValueRating(2)}
                                className="rating-summary-breakdown-item"
                                style={{ cursor: "pointer" }}
                            >
                                2{" "}
                                <Rating defaultValue={2} size="sm" count={1} />
                            </Flex>
                            <Flex
                                direction="row"
                                onClick={() => setValueRating(1)}
                                className="rating-summary-breakdown-item"
                                style={{ cursor: "pointer" }}
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
                        style={{
                            height: "600px",
                        }}
                    >
                        <div className="mx-auto p-5 border rounded-lg shadow-lg bg-white w-full">
                            <Box>
                                <h2
                                    className="mb-4"
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "20px",
                                    }}
                                >
                                    Đánh giá sản phẩm
                                </h2>
                            </Box>
                            <div>
                                <ScrollArea h={520}>
                                    {dataComments &&
                                    Array.isArray(dataComments) &&
                                    dataComments.length > 0 ? (
                                        dataComments.map((item: any) => {
                                            return (
                                                <Box
                                                    key={item.id}
                                                    style={{
                                                        padding: "20px 0",
                                                        borderBottom:
                                                            "1px solid #E4E0E1",
                                                        borderTop:
                                                            "1px solid #E4E0E1",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <Flex
                                                        direction="row"
                                                        gap="sm"
                                                        align={"start"}
                                                        justify={"start"}
                                                    >
                                                        <div
                                                            style={{
                                                                width: "80px",
                                                            }}
                                                        >
                                                            {item.user
                                                                .avatar !==
                                                            null ? (
                                                                <>
                                                                    <img
                                                                        src={
                                                                            item
                                                                                .user
                                                                                .avatar
                                                                        }
                                                                        alt=""
                                                                        style={{
                                                                            height: "60px",
                                                                            width: "60px",
                                                                            objectFit:
                                                                                "cover",
                                                                            borderRadius:
                                                                                "50%",
                                                                        }}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img
                                                                        src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                                                                        alt=""
                                                                        style={{
                                                                            height: "60px",
                                                                            width: "60px",
                                                                            objectFit:
                                                                                "cover",
                                                                            borderRadius:
                                                                                "50%",
                                                                        }}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <div>
                                                                <h5>
                                                                    {
                                                                        item
                                                                            .user
                                                                            .username
                                                                    }
                                                                </h5>
                                                                <Rating
                                                                    value={
                                                                        item.rating
                                                                    }
                                                                    fractions={
                                                                        2
                                                                    }
                                                                    readOnly
                                                                />
                                                                <Flex direction="row">
                                                                    <p
                                                                        style={{
                                                                            color: "#333",
                                                                            fontSize:
                                                                                "12px",
                                                                            marginRight:
                                                                                "2px",
                                                                        }}
                                                                    >
                                                                        {formatDate(
                                                                            item.created_at,
                                                                        )}
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            color: "000",
                                                                            width: "2px",
                                                                            height: "100%",
                                                                        }}
                                                                    >
                                                                        |
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            color: "#333",
                                                                            fontSize:
                                                                                "12px",
                                                                        }}
                                                                    >
                                                                        Phân
                                                                        loại
                                                                        hàng:
                                                                        {item.variant.map(
                                                                            (
                                                                                x: string,
                                                                            ) => {
                                                                                return (
                                                                                    <span
                                                                                        style={{
                                                                                            margin: "0 2px",
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            x
                                                                                        }
                                                                                    </span>
                                                                                );
                                                                            },
                                                                        )}
                                                                    </p>
                                                                </Flex>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    margin: "7px",
                                                                }}
                                                            >
                                                                <p>
                                                                    {
                                                                        item.review
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div>
                                                                {item.images && (
                                                                    <Image
                                                                        width={
                                                                            100
                                                                        }
                                                                        src={
                                                                            item.images
                                                                        }
                                                                        style={{
                                                                            objectFit:
                                                                                "cover",
                                                                            height: "100px",
                                                                        }}
                                                                    />
                                                                )}
                                                            </div>
                                                            <Flex
                                                                direction={
                                                                    "row"
                                                                }
                                                                gap={"sm"}
                                                                style={{
                                                                    padding:
                                                                        "10px",
                                                                    background:
                                                                        "rgb(246 244 244)",
                                                                    marginTop:
                                                                        "3px",
                                                                }}
                                                            >
                                                                <div>
                                                                    <IconCornerDownRightDouble color="#c3c3c3" />
                                                                </div>

                                                                <div>
                                                                    <p
                                                                        style={{
                                                                            // width: "200px",
                                                                            fontWeight:
                                                                                "500",
                                                                        }}
                                                                    >
                                                                        phản hồi
                                                                        của
                                                                        Người
                                                                        Bán
                                                                    </p>

                                                                    {item.comments.map(
                                                                        (
                                                                            comment: any,
                                                                        ) => {
                                                                            return (
                                                                                <p
                                                                                    style={{
                                                                                        fontSize:
                                                                                            "12px",
                                                                                        color: "#333",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        comment.comment
                                                                                    }
                                                                                </p>
                                                                            );
                                                                        },
                                                                    )}
                                                                </div>
                                                            </Flex>
                                                        </div>
                                                    </Flex>
                                                </Box>
                                            );
                                        })
                                    ) : (
                                        <p>Chưa có đánh giá</p>
                                    )}
                                </ScrollArea>
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
