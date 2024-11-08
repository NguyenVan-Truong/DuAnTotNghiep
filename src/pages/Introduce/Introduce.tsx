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

const fetchData = async (id: number | string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/about/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi không lấy được dữ liệu:", error);
    return null;
  }
};

const Introduce = () => {

  const [contentData, setContentData] = useState(null);
  const [contentPostData, setContentPostData] = useState(null);
  const [valuesData, setValuesData] = useState(null);
  const [qualityData, setQualityData] = useState(null);

  useEffect(() => {
    fetchData(1).then(data => setContentData(data));
    fetchData(2).then(data => setContentPostData(data));
    fetchData(5).then(data => setValuesData(data));
    fetchData(4).then(data => setQualityData(data));
  }, []);

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
