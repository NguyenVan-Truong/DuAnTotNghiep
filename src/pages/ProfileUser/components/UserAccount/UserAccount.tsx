import { Avatar } from "@/assets/img";
import {
    Image,
    Radio,
    Text,
    TextInput,
    Group,
    CheckIcon,
    Button,
} from "@mantine/core";

const UserAccount = () => {
    return (
        <div className="bg-white !pb-6">
            <div className="px-10 py-2">
                <Text size="lg">Hồ sơ của tôi</Text>
                <Text size="xs" className="!mb-2 !text-[#9B9B9B]">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản{" "}
                </Text>
                <hr />
                <form action="" className="mt-5 grid grid-cols-[65%_35%] gap-3">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3">Email:</Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3">Tên người dùng:</Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3">Số điện thoại:</Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3">Địa chỉ:</Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3">Giới tính:</Text>
                            <Group>
                                <Radio
                                    disabled
                                    icon={CheckIcon}
                                    label="Nam"
                                    name="check"
                                    value="check"
                                    variant="outline"
                                    defaultChecked
                                />
                                <Radio
                                    disabled
                                    icon={CheckIcon}
                                    label="Nữ"
                                    name="check"
                                    value="check"
                                    variant="outline"
                                />
                                <Radio
                                    disabled
                                    icon={CheckIcon}
                                    label="Khác"
                                    name="check"
                                    value="check"
                                    variant="outline"
                                />
                            </Group>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Text className="w-1/3">Ngày sinh:</Text>
                            <TextInput
                                disabled
                                placeholder="Input component"
                                className="flex-grow"
                                value="Nguyễn Văn Trường"
                            />
                        </div>
                    </div>
                    <div className="border-l-2 border-slate-300">
                        <div className="flex justify-center">
                            <Image
                                src={Avatar}
                                radius="sm"
                                h={200}
                                w="auto"
                                fit="contain"
                            />
                        </div>
                        <div className="flex justify-center mt-5">
                            <Button
                                style={{
                                    background:
                                        "linear-gradient(90deg, rgba(64, 32, 153, 1), rgba(33, 143, 156, 1))",
                                }}
                                className="text-white p-2 rounded"
                            >
                                Sửa thông tin
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserAccount;
