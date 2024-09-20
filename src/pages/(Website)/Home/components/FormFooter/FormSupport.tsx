import { footer } from '@/assets/img'
import { Image, Textarea } from '@mantine/core'
import { Button, Group, TextInput, Text, FileButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import Style from './FormSupprt.module.scss';
import { MdPhone } from 'react-icons/md';
import { useState } from 'react';
const FormSupport = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            name: '',
            sdt: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });
    const [files, setFiles] = useState<File[]>([]);
    return (
        <div className={Style.container}>
            <div className={Style.bannerLeft}>
                <div className={Style.hotline}><MdPhone style={{ fontSize: '17px', color: '#fff', marginTop: "3px", marginRight: "3px" }} /> <span>Hotline: 1800 7200</span></div>
                <div className={Style.title}>
                    <h1>Bạn cần hỗ trợ?</h1>
                    <p>Xin vui lòng để lại yêu cầu hỗ trợ của bạn.</p>
                </div>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Group justify="space-between">
                        <TextInput
                            className={Style.input}
                            size="md"
                            withAsterisk
                            placeholder="Họ và tên"
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            className={Style.input}
                            size="md"
                            withAsterisk
                            placeholder="+(84) 123 456 789"
                            key={form.key('sdt')}
                            {...form.getInputProps('sdt')}
                        />
                    </Group>
                    <TextInput
                        className={Style.inputEmail}
                        withAsterisk
                        size="md"
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <Textarea
                        size="lg"
                        withAsterisk
                        className={Style.textarea}
                        placeholder="Your comment"
                    />

                    <Group justify="space-between" mt="md">
                        <Group>
                            <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
                                {(props) => (
                                    <Button
                                        variant="default"
                                        className="px-4 py-2 text-sm md:text-base lg:text-lg"
                                        {...props}
                                    >
                                        Chọn Tệp
                                    </Button>
                                )}
                            </FileButton>
                            {files.length <= 0 && (
                                <Text className="text-sm md:text-base lg:text-lg">
                                    Không có tệp nào được chọn
                                </Text>
                            )}
                            <ul>
                                {files.map((file: any, index: any) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </Group>
                        <Button type="submit">Gửi Yêu Cầu</Button>
                    </Group>
                </form>
            </div>
            <div className={Style.bannerRight}>
                <Image src={footer} />
            </div>
        </div>
    )
}

export default FormSupport
