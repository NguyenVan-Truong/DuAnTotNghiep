import { useState } from 'react';
import { Box, Image, Text, Title } from "@mantine/core";
import { banner_footer, banner_footer1, banner_footer2, banner_footer3, banner_footer4 } from "@/assets/img";
import { Button } from 'antd';
import Style from './BannerFooter.module.scss';
const BannerFooter = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <div className="container-fluid mx-auto space-y-5 mb-5 px-4">
                {activeIndex === 0 && (
                    <div className="flex flex-col xl:flex-row space-y-5 md:space-y-0 md:space-x-2">
                        <div className="flex-1 flex flex-col items-center mb-4">
                            <div className="h-[300px] md:h-[400px] w-full relative overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover transition-all duration-2000 hover:brightness-100 brightness-95"
                                    src={banner_footer} alt="Banner Footer" />
                            </div>
                            <h1 className="text-base md:text-lg font-semibold mb-2 mt-4 text-center">
                                Nội thất Mây – Mang hơi thở thiên nhiên vào không gian hiện đại
                            </h1>
                            <div className='w-[40px] h-[2px] bg-slate-300 mb-1'></div>
                            <Box maw={500} w="100%">
                                <Text size='sm' truncate="end">
                                    Trong cuộc sống đầy bận rộn, tìm kiếm một khoảng không gian yên bình để thư giãn và cân bằng tâm hồn là điều quý giá.
                                    Nội thất mây không chỉ làm dịu mát không gian sống mà còn gợi lên cảm giác thanh bình, an yên, kết nối con người với thiên nhiên.
                                    BST Mây mới của Nhà Xinh là minh chứng hoàn hảo cho sự hài hòa này, đem đến một luồng gió mới cho không gian sống của bạn.
                                </Text>
                            </Box>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="h-[300px] md:h-[400px] w-full">
                                <Image
                                    className="w-full h-full object-cover transition-all duration-2000 hover:brightness-100 brightness-95"
                                    src={banner_footer1} alt="Banner Footer" />
                            </div>
                            <h1 className="text-base md:text-lg font-semibold mb-2 mt-4 text-center">
                                Nội thất Mây – Mang hơi thở thiên nhiên vào không gian hiện đại
                            </h1>
                            <div className='w-[40px] h-[2px] bg-slate-300 mb-1'></div>
                            <Box maw={500} w="100%">
                                <Text size='sm' truncate="end">
                                    Trong cuộc sống đầy bận rộn, tìm kiếm một khoảng không gian yên bình để thư giãn và cân bằng tâm hồn là điều quý giá.
                                    Nội thất mây không chỉ làm dịu mát không gian sống mà còn gợi lên cảm giác thanh bình, an yên, kết nối con người với thiên nhiên.
                                    BST Mây mới của Nhà Xinh là minh chứng hoàn hảo cho sự hài hòa này, đem đến một luồng gió mới cho không gian sống của bạn.
                                </Text>
                            </Box>
                        </div>
                    </div>
                )}
                {activeIndex === 1 && (
                    <div className="flex flex-col xl:flex-row space-y-5 md:space-y-0 md:space-x-2">
                        <div className="flex-1 flex flex-col items-center mb-4">
                            <div className="h-[300px] md:h-[400px] w-full">
                                <Image
                                    className="w-full h-full object-cover transition-all duration-2000 hover:brightness-100 brightness-95"
                                    src={banner_footer4} alt="Banner Footer" />
                            </div>
                            <h1 className="text-base md:text-lg font-semibold mt-4 mb-2 text-center">
                                Nội thất cho phòng khách nhỏ gọn có gì?
                            </h1>
                            <div className='w-[40px] h-[2px] bg-slate-300 mb-1'></div>
                            <Box maw={500} w="100%">
                                <Text size='sm' truncate="end">
                                    Không gian phòng khách nhỏ gọn nhưng vẫn đầy đủ tiện nghi, thoải mái và có tính thẩm mỹ cao nhờ những lựa chọn tinh tế về sản phẩm nội thất.
                                    Để tạo nên một không gian sống hoàn hảo, dù diện tích hạn chế, cần sự khéo léo để đảm bảo tính linh hoạt và thẩm mỹ, đồng thời phục vụ tốt nhất cho nhu cầu của gia chủ.
                                </Text>
                            </Box>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="h-[300px] md:h-[400px] w-full">
                                <Image
                                    className="w-full h-full object-cover transition-all duration-2000 hover:brightness-100 brightness-95"
                                    src={banner_footer3} alt="Banner Footer" />
                            </div>
                            <h1 className="text-base md:text-lg font-semibold mt-4 mb-2 text-center">
                                Nội thất cho phòng khách nhỏ gọn có gì?
                            </h1>
                            <div className='w-[40px] h-[2px] bg-slate-300 mb-1'></div>
                            <Box maw={500} w="100%">
                                <Text size='sm' truncate="end">
                                    Không gian phòng khách nhỏ gọn nhưng vẫn đầy đủ tiện nghi, thoải mái và có tính thẩm mỹ cao nhờ những lựa chọn tinh tế về sản phẩm nội thất.
                                    Để tạo nên một không gian sống hoàn hảo, dù diện tích hạn chế, cần sự khéo léo để đảm bảo tính linh hoạt và thẩm mỹ, đồng thời phục vụ tốt nhất cho nhu cầu của gia chủ.
                                </Text>
                            </Box>
                        </div>
                    </div>
                )}

                {/* Nút điều khiển */}
                <div className="flex space-x-2 justify-center mt-5">
                    <div
                        className={`w-[40px] h-[4px] ${activeIndex === 0 ? 'bg-red-500' : 'bg-slate-300 hover:bg-black cursor-pointer'}`}
                        onClick={() => handleClick(0)}
                    />
                    <div
                        className={`w-[40px] h-[4px] ${activeIndex === 1 ? 'bg-red-500' : 'bg-slate-300 hover:bg-black cursor-pointer'}`}
                        onClick={() => handleClick(1)}
                    />
                </div>
            </div>
            <div className={Style.banner_container}>
                <div className={Style.banner_left}>
                    <Title lineClamp={1}>Tổ ấm của người tinh tế</Title>
                    <Text lineClamp={4}>Trong suốt hơn 24 năm qua, cảm hứng từ gu thẩm mỹ tinh tế và tinh thần “Việt” đã giúp Nhà Xinh tạo ra những
                        thiết kế độc đáo, hợp thời và chất lượng. Nhà Xinh hiện đã mở 10 cửa hàng tại Việt Nam.
                    </Text>
                    <Button>Về Mordem Home</Button>
                </div>
                <div className={Style.banner_right}>
                    <Image src={banner_footer2} />
                </div>
            </div>
        </>
    );
}

export default BannerFooter;
