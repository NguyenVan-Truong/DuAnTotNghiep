import {
    Button,
    Flex,
    Group,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { message } from "antd";
import { FaAt } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = () => {
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Email không hợp lệ",
            password: (value) =>
                value.length >= 6 ? null : "Mật khẩu phải có ít nhất 6 ký tự",
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
        message.success("Thành công");
    };

    return (
        <>
            <Flex mb={30} direction="column">
                <Title c="#342e79" fw={500} order={3}>
                    Chào mừng trở lại !
                </Title>
                <Text c="#8e8e8e" fw="400" size="md">
                    Xin hãy đăng nhập vào tài khoản của bạn
                </Text>
            </Flex>
            <form className="w-[340px]" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    className="mb-3"
                    withAsterisk
                    size="md"
                    radius="md"
                    label="Tài khoản"
                    placeholder="Mời bạn nhập email"
                    leftSection={<FaAt />}
                    {...form.getInputProps("email")}
                />
                <PasswordInput
                    className="mb-3"
                    withAsterisk
                    size="md"
                    radius="md"
                    leftSection={<FiLock />}
                    label="Mật khẩu"
                    placeholder="Mời bạn nhập mật khẩu"
                    {...form.getInputProps("password")}
                />
                <Group justify="flex-end" className="mb-1">
                    <Link
                        to="/xac-thuc/quen-mat-khau"
                        className="mb-1 text-sm hover:text-blue-500"
                    >
                        Quên Mật Khẩu ?
                    </Link>
                </Group>
                <Group justify="flex-end" className="mb-3">
                    <Link
                        to="/xac-thuc/dang-ky"
                        className="text-sm hover:text-blue-500"
                    >
                        Bạn chưa có tài khoản ?
                    </Link>
                </Group>
                <Button
                    type="submit"
                    radius="md"
                    size="md"
                    fullWidth
                    className="!bg-black hover:!bg-gray-900"
                >
                    Đăng Nhập
                </Button>
            </form>
        </>
    );
};

export default Login;
