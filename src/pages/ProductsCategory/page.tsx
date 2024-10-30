import ListProducts from "@/Components/ListProduct/Listproduct";
import ProductFilter from "./ProductFilter/ProductFilter";
import BannerProduct from "./BannerProduct/BannerProduct";

const ProductCategory = () => {
    return (
        <>
            <div>
                {/* Banner Trang sản phẩm */}
                <BannerProduct />
                {/* end Banner trang sản phẩm */}

                {/* start main trang sản phẩm */}
                <div className="container">
                    <div className="grid grid-cols-[25%_75%]">
                        {/* phần lọc sản phẩm */}
                        <ProductFilter />
                        {/* end phần lọc sản phẩm */}
                        {/* Phần sản phẩm */}
                        <ListProducts />
                        {/* end phần sản phẩm */}
                    </div>
                </div>

                {/* end main trang sản phẩm */}
            </div>
        </>
    );
};

export default ProductCategory;
