import ForgotPassword from "@/pages/Auth/ForgotPassword/page";
import Login from "@/pages/Auth/Login/FormLogin";
import Auth from "@/pages/Auth/page";
import Register from "@/pages/Auth/Register/page";
import CheckoutPage from "@/pages/Checkout/page";
import Home from "@/pages/Home/Home";
import InspirationCorner from "@/pages/InspirationCorner/InspirationCorner";
import Introduce from "@/pages/Introduce/Introduce";
import LayoutWeb from "@/pages/Layout";
import PageNotFound from "@/pages/NotFound/page";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import ProductCategory from "@/pages/ProductsCategory/page";
import OrderCart from "@/pages/ProfileUser/components/OrderCart/OrderCart";
import UserAccount from "@/pages/ProfileUser/components/UserAccount/UserAccount";
import WishList from "@/pages/ProfileUser/components/Wishlist/WishList";
import ProfileUser from "@/pages/ProfileUser/pages";
import ShoppingCart from "@/pages/ShoppingCart/page";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const Index = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWeb />}>
                    <Route index element={<Home />} />
                    <Route path="san-pham" element={<ProductCategory />} />
                    <Route path="thanh-toan" element={<CheckoutPage />} />
                    <Route path="gio-hang" element={<ShoppingCart />} />
                    <Route path="san-pham" element={<ProductDetail />} />
                    <Route path="gioi-thieu" element={<Introduce />} />
                    <Route path="gch" element={<InspirationCorner />} />
                    <Route
                        path="chi-tiet-san-pham"
                        element={<ProductDetail />}
                    />
                    <Route path="/nguoi-dung" element={<ProfileUser />}>
                        <Route
                            index
                            element={
                                <Navigate to="thong-tin-tai-khoan" replace />
                            }
                        />
                        <Route path="yeu-thich" element={<WishList />} />
                        <Route
                            path="thong-tin-tai-khoan"
                            element={<UserAccount />}
                        />
                        <Route path="don-hang" element={<OrderCart />} />
                    </Route>
                </Route>
                <Route path="/xac-thuc" element={<Auth />}>
                    <Route
                        index
                        element={<Navigate to="dang-nhap" replace />}
                    />
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
