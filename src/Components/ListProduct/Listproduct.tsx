import { Grid } from "@mantine/core";
import ItemProduct from "./ItemProduct/ItemProduct";
import style from "./ListProduct.module.scss";

const ListProducts = () => {
    const products = Array.from({ length: 10 });
    return (
        <div className={`${style.listProductss} mt-[50px] padding`}>
            <Grid className={style.listProductsMain}>
                {/* {products.map((_, index) => (
                    <Grid.Col span={{ lg: 3, md: 3, sm: 4, xs: 6 }} key={index}>
                        <ItemProduct />
                    </Grid.Col>
                ))} */}
                <ItemProduct />
            </Grid>
        </div>
    );
};

export default ListProducts;
