import CheckoutPage from "@/pages/(Website)/Checkout/page";
import ForgotPassword from "@/pages/(Website)/Auth/ForgotPassword/page";
import Home from "@/pages/(Website)/Home/Home";
import LayoutWeb from "@/pages/(Website)/LayoutWeb";
import ProductCategory from "@/pages/(Website)/Product/Category/page";
import Register from "@/pages/(Website)/Auth/Register/page";
import ShoppingCart from "@/pages/(Website)/ShoppingCart/page";
import { Route, Routes } from "react-router-dom";
import Auth from "@/pages/(Website)/Auth/page";
import Login from "./../pages/(Website)/Auth/Login/FormLogin";

const RouteWeb = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWeb />}>
                    <Route index element={<Home />} />
                    <Route path="cua-hang" element={<ProductCategory />} />
                    <Route path="thanh-toan" element={<CheckoutPage />} />
                    <Route path="gio-hang" element={<ShoppingCart />} />
                </Route>
                <Route path="/xac-thuc" element={<Auth />}>
                    <Route path="dang-nhap" element={<Login />} />
                    <Route path="dang-ky" element={<Register />} />
                    <Route path="quen-mat-khau" element={<ForgotPassword />} />
                </Route>
                <Route path="*" element={<div>404 - notfound</div>} />
            </Routes>
        </>
    );
};

export default RouteWeb;
