import ForgotPassword from "@/pages/Auth/ForgotPassword/page";
import Login from "@/pages/Auth/Login/FormLogin";
import Auth from "@/pages/Auth/page";
import Register from "@/pages/Auth/Register/page";
import CheckoutPage from "@/pages/Checkout/page";
import GCH from "@/pages/GocCamHung/GCH";
import GCH_1 from "@/pages/GocCamHung/GCH_Item/Item_1/bannerGCH_1";
import GCH_2 from "@/pages/GocCamHung/GCH_Item/Item_2/bannerGCH_2";
import GCH_3 from "@/pages/GocCamHung/GCH_Item/Item_3/bannerGCH_3";
import Home from "@/pages/Home/Home";
import LayoutWeb from "@/pages/Layout";
import PageNotFound from "@/pages/NotFound/page";
import ProductCategory from "@/pages/Product/Category/page";
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
                    <Route path="gch" element={<GCH />} />
                    <Route path="gch1" element={<GCH_1 />} />
                    <Route path="gch2" element={<GCH_2 />} />
                    <Route path="gch3" element={<GCH_3 />} />
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
