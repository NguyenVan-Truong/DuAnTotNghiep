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

interface Item {
  id: number;
  title: string;
  content: string;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  image: string | null;
}

const fetchData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/about');
    return response.data;
  } catch (error) {
    console.error("Lỗi không lấy được dữ liệu:", error);
    return null;
  }
};

const Introduce = () => {

  const [data, setData] = useState<{ [key: string]: Item | null }>({
    contentData: null,
    contentPostData: null,
    valuesData: null,
    qualityData: null,
  });

  useEffect(() => {
    fetchData().then((apiData) => {
      if (apiData) {
        // Lặp qua dữ liệu và gán các mục vào state chung
        setData({
          contentData: apiData.find((item: Item) => item.id === 1) || null,
          contentPostData: apiData.find((item: Item) => item.id === 2) || null,
          valuesData: apiData.find((item: Item) => item.id === 5) || null,
          qualityData: apiData.find((item: Item) => item.id === 4) || null,
        });
      }
    });
  }, []);

  return (
    <>
      {/*Banner*/}
      <BannerIntroduce />
      {/*Content*/}
      <Content data={data.contentData} />
      {/*ContentPost*/}
      <ContentPost data={data.contentPostData} />
      {/*<Founder />*/}
      <Values data={data.valuesData} />
      <Quality data={data.qualityData} />
      <StoryNew />
      <ViewAll />
    </>
  )
}

export default Introduce;
