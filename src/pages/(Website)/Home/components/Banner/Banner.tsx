import { banner, banner1, banner2 } from "@/assets/img";
import { Button } from 'antd';
const Banner = () => {

    return (
        <>
            <div className="relative mb-10">
                <img src={banner} alt="" className='w-full h-auto' />
                <div className="absolute inset-0 flex flex-col items-center mt-16 md:mt-56 text-center">
                    <h1 className="text-white text-3xl md:text-6xl font-medium mb-2">TẤT CẢ SẢN PHẨM</h1>
                    <p className="text-white text-md md:text-2xl mb-4">TRẢI NGHIỆM MỚI SẢN PHẨM MỚI</p>
                    <button className="bg-red-600 text-white hover:bg-red-300 font-medium text-xl py-2 md:py-4 px-3 md:px-6 rounded-lg">ƯU ĐÃI 15% ++</button>
                </div>
            </div>
            <div className="relative mb-10">
                <img src={banner2} alt="" className='w-full h-auto' />
                <div className="absolute inset-0 flex flex-col items-center mt-20 md:mt-52  text-center">
                    <h1 className="text-red-600 text-3xl md:text-6xl font-medium mb-2">SALE UP TO 70%</h1>
                    <p className="text-red-600 text-md md:text-2xl mb-4">Áp dụng tại Mordem Home </p>
                    <button className="bg-red-600 text-white hover:bg-red-300 font-medium text-xl py-2 md:py-4 px-3 md:px-6 rounded-lg">Xem Chi Tiết</button>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <div className='flex-1 text-center mx-4'>
                    <h1 className='text-xl md:text-2xl font-semibold not-italic mb-4'>NỘI THẤT TINH TẾ</h1>
                    <p className='mb-4 mx-auto w-[420px] max-w-md text-sm md:text-lg '>
                        Với kinh nghiệm hơn 24 năm trong hoàn thiện nội thất,
                        Nhà Xinh mang đến giải pháp toàn diện trong bao gồm thiết kế,
                        trang trí và cung cấp nội thất trọn gói.
                        Sở hữu đội ngũ chuyên nghiệp và hệ thống 10 cửa hàng,
                        Nhà Xinh là lựa chọn cho không gian tinh tế và hiện đại.
                    </p>
                    <Button >Xem Thêm</Button>
                </div>
                <div className='flex-1'>
                    <img src={banner1} alt="Nội thất tinh tế" className='w-full h-auto rounded-lg' />
                </div>
            </div>

        </>
    );
};

export default Banner