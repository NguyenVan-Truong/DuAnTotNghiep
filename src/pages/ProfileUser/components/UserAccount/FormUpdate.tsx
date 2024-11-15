import instance from "@/configs/axios"; // Giả sử bạn có instance axios đã cấu hình sẵn
import { UploadOutlined } from "@ant-design/icons";
import { DateInput } from "@mantine/dates";
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    message,
    Row,
    Upload,
} from "antd";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import { useEffect, useState } from "react";

const FormUpdate = ({ onSuccess }: { onSuccess: () => void }) => {
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
                    birthday: data.birthday ? moment(data.birthday) : null,
                    avatar: data.avatar,
                });

                // Cập nhật fileList cho avatar nếu có
                if (data.avatar) {
                    setFileList([
                        {
                            uid: "-1",
                            name: "avatar",
                            status: "done",
                            url: data.avatar,
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
        try {
            const formData = new FormData();
            formData.append("full_name", values.full_name);
            formData.append("phone", values.phone);
            formData.append("address", values.address);
            formData.append(
                "birthday",
                values.birthday
                    ? moment(values.birthday).format("YYYY-MM-DD")
                    : "",
            );

            if (fileList.length > 0) {
                formData.append("avatar", fileList[0].originFileObj);
            }

            const response = await instance.post(
                "/auth/update-profile",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            message.success("Cập nhật thông tin thành công!");
            localStorage.setItem(
                "userProFile",
                JSON.stringify(response.data.user),
            );
            console.log("Profile updated successfully", response.data);

            // Call onSuccess callback passed from parent to close modal and trigger refetch
            onSuccess();
        } catch (error) {
            console.error("Error updating profile", error);
            message.error("Cập nhật thông tin thất bại!");
        }
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
                        <DateInput
                            valueFormat="DD-MM-YYYY"
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
                <Button type="primary" htmlType="submit">
                    Lưu
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormUpdate;
