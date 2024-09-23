import CheckoutPage from "@/pages/(Website)/Checkout/page";
import Home from "@/pages/(Website)/Home/Home";
import LayoutWeb from "@/pages/(Website)/LayoutWeb";
import ProductCategory from "@/pages/(Website)/Product/Category/page";
import ShoppingCart from "@/pages/(Website)/ShoppingCart/page";
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
            </Routes>
        </>
    );
};

export default RouteWeb;
