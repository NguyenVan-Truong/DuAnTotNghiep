import CheckoutPage from "@/pages/(Website)/Checkout/page";
import ForgotPassword from "@/pages/(Website)/Home/components/Login/Forgot";
import Login from "@/pages/(Website)/Home/components/Login/Login";
import Register from "@/pages/(Website)/Home/components/Login/Register";
import Home from "@/pages/(Website)/Home/Home";
import LayoutWeb from "@/pages/(Website)/LayoutWeb";
import ProductCategory from "@/pages/(Website)/Product/Category/page";
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
