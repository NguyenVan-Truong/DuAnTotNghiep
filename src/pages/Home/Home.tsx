import TitleNew from "./components/Title/TitleNew";
import ProductsHomeNew from "./components/ProductsHomeNew/ProductsHomeNew";
import TitleProducts from "./components/Title/TitleProducts";
import ProductsHome from "./components/ProductsHome/ProductsHome";
import BannerFooter from "./components/Banner/BannerFooter";
import TitleInspiration from "./components/Title/TitleInspiration";
import FormSupport from "./components/FormFooter/FormSupport";
import Banner from "./components/Banner/Banner";
import BannerBottom from "./components/BannerBottom/BannerBottom";

const Home = () => {
    return (
        <>
            {/* Banner */}
            <Banner />
            {/* TitleNew */}
            <TitleNew />
            {/* ProductsHomeNew */}
            <ProductsHomeNew />
            {/* TitleProducts */}
            <TitleProducts />
            {/* ProductsHome */}
            <ProductsHome />
            {/* TitleInspiration */}
            <TitleInspiration />
            {/* BannerFooter */}
            <BannerFooter />
            {/* Form */}
            <FormSupport />
            {/* BannerBottom */}
            <BannerBottom />
        </>
    );
};

export default Home;
