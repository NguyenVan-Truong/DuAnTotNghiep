import { Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { message } from "antd";
import { FaAt, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const form = useForm({
        initialValues: {
            email: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Email không hợp lệ",
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
        message.success("Thành công");
        toast.success("Thành công");
    };

    return (
        <>
            <Flex
                mb={10}
                w={340}
                direction="row"
                align="center"
                justify="flex-start"
            >
                <Link
                    to={"/xac-thuc/dang-nhap"}
                    className="flex items-center hover:text-blue-300"
                >
                    <FaChevronLeft className="mr-1" size={13} />
                    <Text size="sm">Quay Lại</Text>
                </Link>
            </Flex>
            <Flex mb={20} w={340} direction="column">
                <Title c="#342e79" fw={500} order={3}>
                    Quên Mật Khẩu !
                </Title>
                <Text c="#8e8e8e" fw="400" size="sm">
                    Nhập địa chỉ email đã đăng ký của bạn. <br />
                    Chúng tôi sẽ gửi cho bạn mật khẩu mới
                </Text>
            </Flex>
            <form className="w-[340px]" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    className="mb-4"
                    withAsterisk
                    size="md"
                    radius="md"
                    label="Tài khoản"
                    placeholder="Mời bạn nhập email"
                    leftSection={<FaAt />}
                    {...form.getInputProps("email")}
                />
                <Button
                    type="submit"
                    radius="md"
                    size="md"
                    fullWidth
                    className="!bg-black hover:!bg-gray-900"
                >
                    Gửi Mật Khẩu
                </Button>
            </form>
        </>
    );
};

export default ForgotPassword;
