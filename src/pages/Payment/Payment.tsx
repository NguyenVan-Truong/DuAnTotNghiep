import React, { useState } from "react";
import axios from "axios";
import instance from "@/configs/axios";

const PaymentPage = () => {
    const [orderId, setOrderId] = useState("123456");
    const [orderDesc, setOrderDesc] = useState("Thanh toán đơn hàng 123456");
    const [totalPrice, setTotalPrice] = useState(100000); // Số tiền thanh toán

    const handlePayment = async () => {
        try {
            // const response = await axios.post('http://127.0.0.1:8000/api/vnpay/payment', {
            //     order_id: orderId,
            //     order_desc: orderDesc,
            //     order_type: 'billpayment',
            //     total_price: totalPrice,
            //     bank_code: 'NCB' // Tùy chọn, có thể để null nếu không cần chọn ngân hàng
            // });
            const response = await instance.post("/vnpay/payment", {
                // order_id: orderId,
                // order_desc: orderDesc,
                // order_type: "billpayment",
                // total_price: totalPrice,
                // bank_code: "NCB", // Tùy chọn, có thể để null nếu không cần chọn ngân hàng

                order_id: "123456",
                order_desc: "Thanh toan don hang 123456",
                order_type: "billpayment",
                total_price: 100000,
                language: "vn",
                bank_code: "NCB",
                txtexpire: "20231231235959",
            });

            if (response.data.success) {
                // Chuyển hướng người dùng tới URL thanh toán VNPAY
                window.location.href = response.data.payment_url;
            } else {
                alert("Có lỗi khi tạo yêu cầu thanh toán!");
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra khi thanh toán!");
        }
    };

    return (
        <div>
            <h1>Thanh toán đơn hàng</h1>
            <p>Đơn hàng ID: {orderId}</p>
            <p>Miêu tả: {orderDesc}</p>
            <p>Số tiền: {totalPrice} VND</p>
            <button onClick={handlePayment}>Thanh toán</button>
        </div>
    );
};

export default PaymentPage;
