import React from "react";
import { Box, Image, Text } from "@mantine/core";
import style from "./Auth.module.scss";
import { imageLogin, logo_pana } from "@/assets/img";
import { Link, Outlet } from "react-router-dom";
const Auth = () => {
    return (
        <>
            <Box className={style.container}>
                <Box className={style.logo}>
                    <Link to={"/"}>
                        <Image w={150} h={110} src={logo_pana} />
                    </Link>
                </Box>
                <Box className={style.imageUser}>
                    <Image src={imageLogin} />
                </Box>
                <Box className={style.images}>
                    <svg
                        width="100%"
                        height="100vh"
                        preserveAspectRatio="xMidYMid slice"
                        viewBox="10 10 80 80"
                    >
                        <path
                            fill="#5a2392e0"
                            className={style.outTop}
                            d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
                        />
                    </svg>
                </Box>
                <Box className={style.content_login}>
                    <Text
                        c="#342e79"
                        className={style.title}
                        tt="uppercase"
                        fw={700}
                    >
                        Cửa hàng nội thất Morden Home
                    </Text>
                    {/* <Box className={style.content}>
                        <AuthenticationTitle />
                    </Box> */}

                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default Auth;
