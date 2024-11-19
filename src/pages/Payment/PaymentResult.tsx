import { Box, Button } from "@mantine/core";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductsHome from "../Home/components/ProductsHome/ProductsHome";

const PaymentResult = () => {
    const location = useLocation();
    console.log("location", location.state);
    const params = new URLSearchParams(location.search);

    const status = params.get("status");
    const message = params.get("message");
    const orderId = params.get("orderId");
    const amount = params.get("amount");

    // useEffect(() => {
    //     // Có thể thêm code để cập nhật UI hoặc store của bạn ở đây
    //     if (status === "success") {
    //         // Xử lý khi thanh toán thành công
    //         console.log("Payment successful", { orderId, amount });
    //     }
    // }, [status]);

    return (
        <div className="container">
            <Box bg="red.5" my="xl" component="a">
                {status === "thanhcong" && (
                    <div className="thanhcong">
                        <div
                            style={{
                                color: "rgba(48, 48, 54, 1)",
                                textAlign: "center",
                                padding: "20px",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "600",
                                    color: "green",
                                }}
                            >
                                ĐƠN HÀNG ĐÃ ĐẶT THÀNH CÔNG!
                            </h2>
                            <p
                                style={{
                                    marginTop: "10px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                }}
                            >
                                " Chúng tôi đã nhận được đơn hàng của bạn. Đơn
                                hàng của bạn đang được xử lý và sẽ sớm được giao
                                đến bạn."
                            </p>
                            <div>
                                <Link to={"/don-hang"}>
                                    <Button
                                        style={{
                                            margin: "0 auto",
                                            marginRight: "40px",
                                            marginTop: "20px",
                                        }}
                                        variant="filled"
                                    >
                                        Xem đơn hàng
                                    </Button>
                                </Link>
                            </div>{" "}
                        </div>
                    </div>
                )}
                {status === "success" && (
                    <div className="success">
                        <div
                            style={{
                                color: "rgba(48, 48, 54, 1)",
                                textAlign: "center",
                                padding: "20px",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "600",
                                    color: "green",
                                }}
                            >
                                CẢM ƠN BẠN ĐÃ HOÀN TẤT THANH TOÁN!
                            </h2>
                            <p
                                style={{
                                    marginTop: "10px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                }}
                            >
                                " Chúng tôi đã nhận được đơn hàng và thanh toán
                                của bạn. Đơn hàng của bạn đang được xử lý và sẽ
                                sớm được giao đến bạn."
                            </p>
                            <div>
                                <Link to={"/don-hang"}>
                                    <Button
                                        style={{
                                            margin: "0 auto",
                                            marginRight: "40px",
                                            marginTop: "20px",
                                        }}
                                        variant="filled"
                                    >
                                        Xem đơn hàng
                                    </Button>
                                </Link>
                            </div>{" "}
                        </div>
                    </div>
                )}
                {status === "failure" && (
                    <div className="failure">
                        <div
                            style={{
                                color: "rgba(48, 48, 54, 1)",
                                textAlign: "center",
                                padding: "20px",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "600",
                                    color: "red",
                                }}
                            >
                                THANH TOÁN THẤT BẠI
                            </h2>
                            <p
                                style={{
                                    marginTop: "10px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                }}
                            >
                                Rất tiếc! Quá trình thanh toán của bạn đã không
                                thành công. Vui lòng kiểm tra lại thông tin và
                                thử lại lần nữa.
                            </p>
                            <Link to={"/gio-hang"}>
                                <Button
                                    style={{
                                        margin: "0 auto",
                                        marginRight: "40px",
                                        marginTop: "20px",
                                    }}
                                    variant="filled"
                                >
                                    Thử lại
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
                {status === "invalid" && (
                    <div className="invalid">
                        <div
                            style={{
                                color: "rgba(48, 48, 54, 1)",
                                textAlign: "center",
                                padding: "20px",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "600",
                                    color: "red",
                                }}
                            >
                                GIAO DỊCH KHÔNG HỢP LỆ
                            </h2>
                            <p
                                style={{
                                    marginTop: "10px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                }}
                            >
                                Hình như có lỗi xảy ra trong quá trình giao
                                dịch. Vui lòng liên hệ với bộ phận hỗ trợ để
                                được giúp đỡ.
                            </p>
                            <Link to={"/gio-hang"}>
                                <Button
                                    style={{
                                        margin: "0 auto",
                                        marginRight: "40px",
                                        marginTop: "20px",
                                    }}
                                    variant="filled"
                                >
                                    Thử lại
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </Box>
            <div
                style={{
                    height: "3px",
                    width: "100%",
                    backgroundColor: "#F4F6FF",
                    marginTop: "20px",
                }}
            ></div>
            <ProductsHome />
        </div>
    );
};

export default PaymentResult;
