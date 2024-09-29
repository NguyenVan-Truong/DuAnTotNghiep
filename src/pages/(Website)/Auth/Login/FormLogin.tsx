import { Button, Flex, Group, Text, TextInput, Title } from "@mantine/core";
import { FaAt } from "react-icons/fa";

const Login = () => {
    return (
        <>
            <Flex mb={40} direction="column">
                <Title c="#342e79" fw={500} order={3}>
                    Chào mừng trở lại!
                </Title>
                <Text c="#8e8e8e" fw="400" size="md">
                    Xin hãy đăng nhập vào tài khoản của bạn
                </Text>
            </Flex>
            <form>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    leftSection={<FaAt />}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </>
    );
};

export default Login;
