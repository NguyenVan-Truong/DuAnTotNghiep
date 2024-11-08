import axios from "axios";
import BannerIntroduce from "./Components/Banner/BannerIntroduce";
import Content from "./Components/Content/Content";
import ContentPost from "./Components/Content/ContentPost";
//import Founder from "./Components/Content/Founder";
import Quality from "./Components/Content/Quality";
import Values from "./Components/Content/Values";
import StoryNew from "./Components/StoryNews/StoryNew";
import ViewAll from "./Components/ViewAll/ViewAll";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import { AboutPages } from "@/model/AboutPages";


// Hàm gọi API
const fetchAboutData = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/about');
  return response.data;
};

const Introduce = () => {

  // Sử dụng useQuery để gọi API
  const { data, isLoading, error } = useQuery<AboutPages[]>({
    queryKey: ["aboutData"],
    queryFn: fetchAboutData,
  });

  // Kiểm tra trạng thái tải dữ liệu
  if (isLoading) return <Loader />; // Hiển thị loading spinner khi đang tải
  if (error) return <div>Lỗi khi tải dữ liệu giới thiệu</div>; // Hiển thị thông báo lỗi nếu có lỗi

  // Lọc dữ liệu theo id
  const contentData = data?.find((item) => item.id === 1) || null;
  const contentPostData = data?.find((item) => item.id === 2) || null;
  const valuesData = data?.find((item) => item.id === 5) || null;
  const qualityData = data?.find((item) => item.id === 4) || null;


  return (
    <>
      {/*Banner*/}
      <BannerIntroduce />
      {/*Content*/}
      <Content data={contentData} />
      {/*ContentPost*/}
      <ContentPost data={contentPostData} />
      {/*<Founder />*/}
      <Values data={valuesData} />
      <Quality data={qualityData} />
      <StoryNew />
      <ViewAll />
    </>
  )
}

export default Introduce;
