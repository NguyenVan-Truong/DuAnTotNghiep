import { Flex, Text, Title } from "@mantine/core";

const Login = () => {
    return (
        <>
            <Flex mb={40} direction="column">
                <Title c="#342e79" fw={500} order={3}>
                    Chào mừng trở lại!
                </Title>
                <Text c="#8e8e8e" fw="400" size="lg">
                    Xin hãy đăng nhập vào tài khoản của bạn
                </Text>
            </Flex>
            <form action=""></form>
        </>
    );
};

export default Login;
