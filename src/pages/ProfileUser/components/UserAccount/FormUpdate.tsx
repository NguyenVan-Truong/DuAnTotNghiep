import instance from "@/configs/axios"; // Giả sử bạn có instance axios đã cấu hình sẵn
import { UploadOutlined } from "@ant-design/icons";
import { Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Button, Col, Form, Input, message, Row, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import moment from "moment";
import { useEffect, useState } from "react";

type FormUpdateProps = {
    onSuccess: () => void;
    modals: any;
};

const FormUpdate = ({ onSuccess, modals }: FormUpdateProps) => {
    const [fileList, setFileList] = useState<any[]>([]);
    const [form] = Form.useForm();
    const [valueCity, setValueCity] = useState([]);
    const [checkedValueCity, setCheckedValueCity] = useState();
    // thông tin quận huyện
    const [valueDistrict, setValueDistrict] = useState([]);
    const [checkedValueDistrict, setCheckedValueDistrict] = useState();
    // thông tin phường xã
    const [valueWard, setValueWard] = useState([]);
    const [checkedValueWard, setCheckedValueWard] = useState();

    // CHọn tỉnh
    const onhandleSelectCity = async () => {
        try {
            const response = await instance.get("/getAllProvinces");
            if (response && response.status === 200) {
                const transformedData = response.data.content.map(
                    (item: any) => ({
                        value: item.code,
                        label: item.name,
                    }),
                );
                setValueCity(transformedData);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };

    // Chọn quận huyện
    const onhandleSelectDistrict = async () => {
        try {
            const response = await instance.get(
                `/getLocaion?target=district&data[province_id]=${checkedValueCity}`,
            );
            if (response && response.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                    response.data.content,
                    "text/html",
                );
                const options = Array.from(doc.querySelectorAll("option"));
                const transformedData = options.map((option) => ({
                    value: option.value,
                    label: option.text.trim(),
                }));
                setValueDistrict(transformedData as []);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };

    // Chọn phường xã
    const onhandleSelectWard = async () => {
        try {
            const response = await instance.get(
                `/getLocaion?target=ward&data[district_id]=${checkedValueDistrict}`,
            );
            if (response && response.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(
                    response.data.content,
                    "text/html",
                );
                const options = Array.from(doc.querySelectorAll("option"));
                const transformedData = options.map((option) => ({
                    value: option.value,
                    label: option.text.trim(),
                }));
                setValueWard(transformedData as []);
            }
        } catch (error) {
            message.error("Lỗi không thể lấy dữ liệu");
        }
    };

    // Hàm gọi API để lấy dữ liệu ban đầu
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
                    city: data.province_id,
                    district: data.district_id,
                    ward: data.ward_id,
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

                // Cập nhật giá trị tỉnh/thành phố, quận/huyện, phường/xã
                if (data.province_id) {
                    setCheckedValueCity(data.province_id);
                    await onhandleSelectDistrict();
                }
                if (data.district_id) {
                    setCheckedValueDistrict(data.district_id);
                    await onhandleSelectWard();
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
            formData.append("province_id", checkedValueCity || "");
            formData.append("district_id", checkedValueDistrict || "");
            formData.append("ward_id", checkedValueWard || "");

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
            const {
                rule_id,
                status,
                updated_at,
                user_agent,
                last_login,
                created_at,
                deleted_at,
                ...userProfile
            } = response.data.user;

            localStorage.setItem("userProFile", JSON.stringify(userProfile));
            onSuccess();
            modals.closeAll();
        } catch (error) {
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
                city: "",
                district: "",
                ward: "",
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
                    <Select
                        withAsterisk
                        label="Tỉnh/Thành phố"
                        data={valueCity}
                        placeholder="Nhập tỉnh/thành phố"
                        className="w-[50%]"
                        searchable
                        onClick={() => {
                            if (valueCity.length === 0) {
                                onhandleSelectCity();
                            }
                        }}
                        onChange={(value: any) => {
                            form.setFieldValue("province_id", value);
                            setCheckedValueCity(value);
                            setValueDistrict([]);
                            setValueWard([]);
                        }}
                    />
                    <Select
                        withAsterisk
                        label="Quận / Huyện"
                        placeholder="Nhập quận/huyện"
                        data={valueDistrict}
                        className="w-[50%]"
                        searchable
                        onClick={() => {
                            if (valueDistrict.length === 0) {
                                onhandleSelectDistrict();
                            }
                        }}
                        onChange={(value: any) => {
                            form.setFieldValue("district_id", value);
                            setCheckedValueDistrict(value);
                            setValueWard([]);
                        }}
                    />
                    <Select
                        withAsterisk
                        label="Phường / Xã"
                        data={valueWard}
                        placeholder="Nhập phường/xã"
                        className="w-[50%]"
                        searchable
                        onClick={() => {
                            if (valueWard.length === 0) {
                                onhandleSelectWard();
                            }
                        }}
                        onChange={(value: any) => {
                            form.setFieldValue("ward_id", value);
                            setCheckedValueWard(value);
                        }}
                    />
                </Col>

                <Col span={24}>
                    <ImgCrop rotationSlider>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            beforeUpload={() => false}
                        >
                            {fileList.length === 0 && "+ Upload Avatar"}
                        </Upload>
                    </ImgCrop>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Button type="primary" htmlType="submit" block>
                        Cập nhật thông tin
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FormUpdate;
