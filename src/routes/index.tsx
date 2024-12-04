import ChangePassword from "@/pages/Auth/ChangePassword/ChangePassword";
import ForgotPassword from "@/pages/Auth/ForgotPassword/page";
import Login from "@/pages/Auth/Login/FormLogin";
import Auth from "@/pages/Auth/page";
import Register from "@/pages/Auth/Register/page";
import CheckoutPage from "@/pages/Checkout/page";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import InspirationCorner from "@/pages/InspirationCorner/InspirationCorner";
import Introduce from "@/pages/Introduce/Introduce";
import LayoutWeb from "@/pages/Layout";
import PostDetails from "@/pages/News/components/PostDetail";
import PostList from "@/pages/News/PostList";
import PageNotFound from "@/pages/NotFound/page";
import PaymentPage from "@/pages/Payment/Payment";
import PaymentResult from "@/pages/Payment/PaymentResult";
import ProductDetail from "@/pages/ProductDetail/ProductDetail";
import ProductCategory from "@/pages/ProductsCategory/list";
// import ProductCategory from "@/pages/ProductsCategory/page";
import OrderCart from "@/pages/ProfileUser/components/OrderCart/OrderCart";
import SupportFeedback from "@/pages/ProfileUser/components/SupportFeedback/SupportFeedback";
import UserAccount from "@/pages/ProfileUser/components/UserAccount/UserAccount";
import WishList from "@/pages/ProfileUser/components/Wishlist/WishList";
import ProfileUser from "@/pages/ProfileUser/pages";
import ShoppingCart from "@/pages/ShoppingCart/page";
import { useEffect } from "react";
import {
    Navigate,
    Route,
    Routes,
    useLocation
} from "react-router-dom";

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
                    <Route path="gioi-thieu" element={<Introduce />} />
                    <Route path="gch" element={<InspirationCorner />} />
                    <Route path="lien-he" element={<Contact />} />
                    <Route path="tin-tuc" element={<PostList />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="order-success" element={<PaymentResult />} />
                    <Route
                        path="chi-tiet-san-pham/:slug"
                        element={<ProductDetail />}
                    />
                    <Route
                        path="chi-tiet-bai-viet/:slug"
                        element={<PostDetails />}
                    />

                    <Route
                        path="nguoi-dung"
                        element={
                            localStorage.getItem("token") ? (
                                <ProfileUser />
                            ) : (
                                <Navigate to="/xac-thuc" replace />
                            )
                        }
                    >
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
                        <Route
                            path="doi-mat-khau"
                            element={<ChangePassword />}
                        />
                        <Route
                            path="thu-ho-tro"
                            element={<SupportFeedback />}
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
