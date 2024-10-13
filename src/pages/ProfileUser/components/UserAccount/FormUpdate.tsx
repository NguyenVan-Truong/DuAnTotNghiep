import React, { useState } from "react";
import { Box, Button, Grid, Group, Radio, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { DateInput } from "@mantine/dates";
const FormUpdate = () => {
    return (
        <Box
            component="form"
            style={{ position: "relative", width: "350px", height: "auto" }}
        >
            <Grid mt={10}>
                <Grid.Col span={12}>
                    <TextInput
                        label={"Tên người dùng"}
                        placeholder={"Nhập tên người dùng"}
                        type="text"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextInput
                        label={"Số điện thoại"}
                        placeholder={"Nhập số điện thoại"}
                        type="text"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextInput
                        label={"Địa chỉ"}
                        placeholder={"Nhập địa chỉ"}
                        type="text"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Radio.Group label="Giới tính" withAsterisk>
                        <Group mt="xs">
                            <Radio value="Nam" label="Nam" />
                            <Radio value="Nữ" label="Nữ" />
                            <Radio value="Khác" label="Khác" />
                        </Group>
                    </Radio.Group>
                </Grid.Col>
                <Grid.Col span={12}>
                    <DateInput size="xs" label="Ngày sinh" withAsterisk />
                </Grid.Col>
            </Grid>

            <Group
                justify="end"
                mt="xs"
                style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "white",
                }}
            >
                <Button
                    type="button"
                    color="gray"
                    onClick={() => {
                        modals.closeAll();
                    }}
                >
                    Đóng
                </Button>
                <Button type="submit">Lưu</Button>
            </Group>
        </Box>
    );
};

export default FormUpdate;
