import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
    Upload,
    message,
    Row,
    Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import instance from "@/configs/axios"; // Giả sử bạn có instance axios đã cấu hình sẵn

const FormUpdate = () => {
    const [fileList, setFileList] = useState<any[]>([]);
    const [form] = Form.useForm();

    // Hàm gọi API để lấy dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get("/auth/profile");
                const data = response.data;

                // Cập nhật dữ liệu lên form
                form.setFieldsValue({
                    full_name: data.full_name,
                    phone: data.phone,
                    address: data.address,
                    birthday: data.birthday ? new Date(data.birthday) : null,
                    avatar: data.avatar,
                });

                // Cập nhật fileList cho avatar nếu có
                if (data.avatar) {
                    setFileList([
                        {
                            uid: "-1", // UID của file
                            name: "avatar", // Tên ảnh
                            status: "done", // Trạng thái tải lên
                            url: data.avatar, // Đường dẫn avatar
                        },
                    ]);
                } else {
                    setFileList([]);
                }
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchData();
    }, []);

    const onChange = (info: any) => {
        setFileList(info.fileList);
        // const avatar =
        //     info.fileList.length > 0 ? info.fileList[0].thumbUrl : "dswdw";
        // console.log("info.fileList[0].thumbUrl", info.fileList[0].thumbUrl);

        // console.log("avatar", avatar);
        // if (info.fileList.length > 0) {
        //     console.log("aaa", info.fileList[0]?.thumbUrl);
        // } else {
        //     console.log("bbb", info.fileList[0]);
        // }
        // form.setFieldsValue({ avatar });
    };

    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onFinish = async (values: any) => {
        // Tạo FormData để gửi file cùng với các trường dữ liệu khác
        const formData = new FormData();
        formData.append("full_name", values.full_name);
        formData.append("phone", values.phone);
        formData.append("address", values.address);
        formData.append(
            "birthday",
            values.birthday ? values.birthday.format("YYYY-MM-DD") : "",
        );

        // Kiểm tra xem có avatar không và thêm nó vào FormData
        if (fileList.length > 0) {
            formData.append("avatar", fileList[0].originFileObj); // Gửi file gốc
        }

        // try {
        //     // Gửi dữ liệu lên API
        //     const response = await axios.post("/auth/updateProfile", formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     });

        //     // Xử lý response của API sau khi gửi thành công
        //     console.log("Profile updated successfully", response.data);
        //     message.success("Cập nhật thông tin thành công!");
        // } catch (error) {
        //     console.error("Error updating profile", error);
        //     message.error("Cập nhật thông tin thất bại!");
        // }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
                full_name: "",
                phone: "",
                address: "",
                birthday: null,
                avatar: "",
            }}
        >
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        label="Tên người dùng"
                        name="full_name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên người dùng",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên người dùng" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số điện thoại",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập địa chỉ",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="Ngày sinh" name="birthday">
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder="Ngày sinh"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="Avatar" name="avatar">
                        <ImgCrop rotationSlider>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                beforeUpload={() => false} // Prevent auto-upload
                            >
                                {fileList.length < 1 && (
                                    <div>
                                        <UploadOutlined /> + Upload
                                    </div>
                                )}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button
                    type="default"
                    style={{ marginRight: "10px" }}
                    onClick={() => message.info("Đóng form")}
                >
                    Đóng
                </Button>
                <Button type="primary" htmlType="submit">
                    Lưu
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormUpdate;
