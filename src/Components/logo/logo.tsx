import { Text } from "@mantine/core";
import React from "react";

const Logo = () => {
    return (
        <>
            <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{
                    from: "rgb(43 ,29 ,82,0.94)",
                    to: "rgb(98 ,0 ,255,0.95)",
                    deg: 0,
                }}
                className=""
            >
                Morden Home
            </Text>
        </>
    );
};

export default Logo;
