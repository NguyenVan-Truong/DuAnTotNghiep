import { Loader } from "@mantine/core";
import React from "react";

const Loading = () => {
    return (
        <>
            <div className="mx-auto justify-center text-center items-center mt-10">
                <Loader color="red" />
            </div>
        </>
    );
};

export default Loading;
