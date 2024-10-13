import { bannerTrangSanPham } from "@/assets/img";
import { Flex } from "@mantine/core";
import React from "react";
import "./BannerProduct.scss";

const BannerProduct = () => {
    return (
        <div className="relative text-white ">
            <img
                src={bannerTrangSanPham}
                alt=""
                className="w-full h-[486px] object-cover"
            />{" "}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="container product-banner__container absolute  h-auto w-[230px] lg:bottom-[50px] lg:left-[95px] " style={{marginBottom: "30px"}}>
                <h1 className=" title text-[1.5rem] font-semibold leading-[1.3rem] mb-[13px] ">
                    Sản Phẩm
                </h1>
                <Flex direction="row" className="product-banner__breadcrumb gap-[10px] ">
                    <p className="inline-block">Trang chủ</p> 
                    <span className="text-white">/</span>
                    <p className="font-bold">Sản phẩm</p>
                </Flex>
            </div>
        </div>
    );
};

export default BannerProduct;
