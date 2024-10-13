import ListProducts from "@/Components/ListProduct/Listproduct";
import BannerProduct from "./Component/BannerProduct/BannerProduct";
import ProductFilter from "./Component/ProductFilter/ProductFilter";
const ProductCategory = () => {
    return (
        <>
            <div>
                {/* Banner Trang sản phẩm */}
                <BannerProduct />
                {/* end Banner trang sản phẩm */}

                {/* start main trang sản phẩm */}
                <div className="container">
                    {/* phần lọc sản phẩm */}
                    <ProductFilter />
                    {/* end phần lọc sản phẩm */}
                    {/* Phần sản phẩm */}
                    <ListProducts />
                    {/* end phần sản phẩm */}
                </div>

                {/* end main trang sản phẩm */}
            </div>
        </>
    );
};

export default ProductCategory;
