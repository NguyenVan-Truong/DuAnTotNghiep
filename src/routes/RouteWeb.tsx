import CheckoutPage from "@/pages/(Website)/Checkout/page";
import ForgotPassword from "@/pages/(Website)/ForgotPassword/Forgot";
import Home from "@/pages/(Website)/Home/Home";
import LayoutWeb from "@/pages/(Website)/LayoutWeb";
import Login from "@/pages/(Website)/Login/Login";
import ProductCategory from "@/pages/(Website)/Product/Category/page";
import Register from "@/pages/(Website)/Register/Register";
import { Route, Routes } from "react-router-dom";

const RouteWeb = () => {


    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWeb />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<ProductCategory />} />
                    <Route path="checkout" element={<CheckoutPage />} />                   

                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgotpassword" element={<ForgotPassword />} />
            </Routes>
        </>
    );
};

export default RouteWeb;
