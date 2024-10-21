import ForgotPassword from "@/pages/Auth/ForgotPassword/page";
import Login from "@/pages/Auth/Login/FormLogin";
import Auth from "@/pages/Auth/page";
import Register from "@/pages/Auth/Register/page";
import ProductCategory from "@/pages/Category/page";
import CheckoutPage from "@/pages/Checkout/page";
import Home from "@/pages/Home/Home";
import InspirationCorner from "@/pages/InspirationCorner/InspirationCorner";
import Introduce from "@/pages/Introduce/Introduce";

import LayoutWeb from "@/pages/Layout";
import PageNotFound from "@/pages/NotFound/page";
import ChiTietSP from "@/pages/ProductDetail/ProductDetail";

import ShoppingCart from "@/pages/ShoppingCart/page";
import { Route, Routes } from "react-router-dom";

const Index = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWeb />}>
                    <Route index element={<Home />} />
                    <Route path="cua-hang" element={<ProductCategory />} />
                    <Route path="thanh-toan" element={<CheckoutPage />} />
                    <Route path="gio-hang" element={<ShoppingCart />} />
                    <Route path="san-pham" element={<ChiTietSP />} />
                    <Route path="gioi-thieu" element={<Introduce />} />
                    <Route path="gch" element={<InspirationCorner />} />
                </Route>
                <Route path="/xac-thuc" element={<Auth />}>
                    <Route path="dang-nhap" element={<Login />} />
                    <Route path="dang-ky" element={<Register />} />
                    <Route path="quen-mat-khau" element={<ForgotPassword />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
};

export default Index;
