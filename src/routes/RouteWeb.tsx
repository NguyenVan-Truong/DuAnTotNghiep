
import { Route, Routes } from "react-router-dom";

import ChiTietSP from "@/pages/(Website)/ChiTietSP/ChiTietSP";
import LayoutWeb from "@/pages/Layout";
import Home from "@/pages/Home/Home";
import ProductCategory from "@/pages/Product/Category/page";
import CheckoutPage from "@/pages/Checkout/page";
import ShoppingCart from "@/pages/ShoppingCart/page";
import Auth from "@/pages/Auth/page";
import Login from "@/pages/Auth/Login/FormLogin";
import Register from "@/pages/Auth/Register/page";
import ForgotPassword from "@/pages/Auth/ForgotPassword/page";

const RouteWeb = () => {


    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWeb />}>
                    <Route index element={<Home />} />
                    <Route path="cua-hang" element={<ProductCategory />} />
                    <Route path="thanh-toan" element={<CheckoutPage />} />
                    <Route path="gio-hang" element={<ShoppingCart />} />
                    <Route path="sp" element={<ChiTietSP />} />
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
