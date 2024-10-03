import {
    Box,
    Button,
    Flex,
    Group,
    PasswordInput,
    Popover,
    Progress,
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
import { IconX, IconCheck } from "@tabler/icons-react";

const Register = () => {
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState("");

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
                value.length >= 6 ? null : "Mật khẩu không đc để trống",
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
    function PasswordRequirement({
        meets,
        label,
    }: {
        meets: boolean;
        label: string;
    }) {
        return (
            <Text
                c={meets ? "teal" : "red"}
                style={{ display: "flex", alignItems: "center" }}
                mt={7}
                size="sm"
            >
                {meets ? <IconCheck /> : <IconX />} <Box ml={10}>{label}</Box>
            </Text>
        );
    }

    const requirements = [
        { re: /[0-9]/, label: "Bao gồm số" },
        { re: /[a-z]/, label: "Bao gồm chữ thường" },
        { re: /[A-Z]/, label: "Bao gồm chữ hoa" },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Bao gồm ký tự đặc biệt" },
    ];

    function getStrength(password: string) {
        let multiplier = password.length > 5 ? 0 : 1;

        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });

        return Math.max(
            100 - (100 / (requirements.length + 1)) * multiplier,
            10,
        );
    }

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(value)}
        />
    ));

    const strength = getStrength(value);
    const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

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
                    <Popover
                        opened={popoverOpened}
                        position="bottom"
                        width="target"
                        transitionProps={{ transition: "pop" }}
                    >
                        <Popover.Target>
                            <div
                                onFocusCapture={() => setPopoverOpened(true)}
                                onBlurCapture={() => setPopoverOpened(false)}
                            >
                                <PasswordInput
                                    withAsterisk
                                    label="Mật khẩu"
                                    placeholder="Mời bạn nhập mật khẩu"
                                    {...form.getInputProps("password")}
                                    value={value}
                                    onChange={(event) => {
                                        const newPassword =
                                            event.currentTarget.value;
                                        setValue(newPassword);
                                        form.setFieldValue(
                                            "password",
                                            newPassword,
                                        );
                                    }}
                                />
                            </div>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <Progress
                                color={color}
                                value={strength}
                                size={5}
                                mb="xs"
                            />
                            <PasswordRequirement
                                label="Bao gồm ít nhất 6 ký tự"
                                meets={value.length > 5}
                            />
                            {checks}
                        </Popover.Dropdown>
                    </Popover>
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
