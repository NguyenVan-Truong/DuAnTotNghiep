import {
    Button,
    Flex,
    Group,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FaAt, FaUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { message } from "antd";

const Register = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
        },

        validate: {
            name: (value) => {
                if (!value) return "Tên không được để trống";
                if (value.length < 2) return "Tên phải có ít nhất 2 ký tự";
                return null;
            },
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Email không hợp lệ",
            password: (value) =>
                value.length >= 6 ? null : "Mật khẩu phải có ít nhất 6 ký tự",
            confirmPassword: (value, values) => {
                if (!value) return "Nhập lại mật khẩu không được để trống";
                if (value !== values.password) return "Mật khẩu không khớp";
                return null;
            },
        },
    });

    const handleSubmit = (values: typeof form.values) => {
        console.log(values);
        message.success("Thành công");
    };

    return (
        <>
            <Flex
                mb={30}
                direction="column"
                justify="flex-start"
                align="flex-start"
                className="w-[340px]"
            >
                <Title c="#342e79" fw={500} order={3}>
                    Tạo tài khoản mới !
                </Title>
                <Text c="#8e8e8e" fw="400" size="md">
                    Vui lòng nhập thông tin chi tiết
                </Text>
            </Flex>
            <form className="w-[340px]" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    className="mb-3"
                    withAsterisk
                    size="md"
                    radius="md"
                    label="Tên người dùng"
                    placeholder="Mời bạn nhập tên"
                    leftSection={<FaUser />}
                    {...form.getInputProps("name")}
                />
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
                <Stack>
                    <PasswordInput
                        className="mb-3"
                        withAsterisk
                        size="md"
                        radius="md"
                        visible={visiblePassword}
                        onVisibilityChange={() =>
                            setVisiblePassword((prev) => !prev)
                        }
                        leftSection={<FiLock />}
                        label="Mật khẩu"
                        placeholder="Mời bạn nhập mật khẩu"
                        {...form.getInputProps("password")}
                    />
                    <PasswordInput
                        className="mb-3"
                        withAsterisk
                        size="md"
                        radius="md"
                        visible={visibleConfirmPassword}
                        onVisibilityChange={() =>
                            setVisibleConfirmPassword((prev) => !prev)
                        }
                        leftSection={<FiLock />}
                        label="Nhập lại mật khẩu"
                        placeholder="Mời bạn nhập lại mật khẩu"
                        {...form.getInputProps("confirmPassword")}
                    />
                </Stack>
                <Group justify="flex-end">
                    <Link
                        to="/xac-thuc/dang-nhap"
                        className="mb-3 text-sm hover:text-blue-500"
                    >
                        Bạn đã có tài khoản
                    </Link>
                </Group>
                <Button
                    type="submit"
                    radius="md"
                    size="md"
                    fullWidth
                    className="!bg-black hover:!bg-gray-900"
                >
                    Đăng Ký
                </Button>
            </form>
        </>
    );
};

export default Register;
