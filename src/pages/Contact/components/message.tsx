import { Button, Flex, Grid, TextInput } from "@mantine/core";
import styles from "../../../Components/Footer/Footer.module.scss";
import { useForm } from "@mantine/form";
const Message = () => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            termsOfService: false,
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Không đúng định dạng email",
        },
    });
    return (
        <footer>
            <div className="mt-[20px]">
                <div className="container">
                    <div className={`${styles.footer__top}`}>
                        <Grid>
                            <Grid.Col
                                span={{ base: 12, xs: 6, sm: 6, md: 6, lg: 3 }}
                            >
                                <ul>
                                    <li className={styles.footer__title}>
                                        LỜI NHẮN
                                    </li>
                                    <li>
                                        <div className="bg-slate-400 w-10 h-[3px] mt-2 mb-2 rounded-sm hover:bg-white "></div>
                                    </li>
                                    <li>
                                        <p className={styles.footer__message}>
                                            Hãy để lại email của bạn để nhận
                                            được những ý tưởng trang trí mới và
                                            những thông tin, ưu đãi từ MORDEN
                                            HOME
                                        </p>
                                    </li>
                                    <li>Email: support@mordenhome.com</li>
                                    <li>
                                        <form
                                            onSubmit={form.onSubmit((values) =>
                                                console.log(values),
                                            )}
                                        >
                                            <Flex direction="row" gap="lg">
                                                <TextInput
                                                    withAsterisk
                                                    placeholder="Email của bạn"
                                                    key={form.key("email")}
                                                    {...form.getInputProps(
                                                        "email",
                                                    )}
                                                />
                                                <Button
                                                    variant="default"
                                                    type="submit"
                                                    className={
                                                        styles.footer__submitBtn
                                                    }
                                                >
                                                    Submit
                                                </Button>
                                            </Flex>
                                        </form>
                                    </li>
                                </ul>
                            </Grid.Col>
                        </Grid>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Message;
