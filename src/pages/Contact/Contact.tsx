import styles from "./components/Contact/Contact.module.scss";
import FormSupport from "@/pages/Contact/components/FormFooter/FormSupport";
import ContactPage from "./components/Contact/Contact";

const Contact = () => {
    return (
        <div className={styles.container}>
            <ContactPage />
            <FormSupport />
        </div>
    );
};

export default Contact;
