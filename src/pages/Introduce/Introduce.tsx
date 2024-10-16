import BannerIntroduce from "./Components/Banner/BannerIntroduce";
import Content from "./Components/Content/Content";
import ContentPost from "./Components/Content/ContentPost";
import Founder from "./Components/Content/Founder";
import Quality from "./Components/Content/Quality";
import Values from "./Components/Content/Values";
import StoryNew from "./Components/StoryNews/StoryNew";
import ViewAll from "./Components/ViewAll/ViewAll";

const Introduce = () => {
  return (
    <>
      {/*Banner*/}
      <BannerIntroduce />
      {/*Content*/}
      <Content />
      {/*ContentPost*/}
      <ContentPost />
      <Founder />
      <Values />
      <Quality />
      <StoryNew />
      <ViewAll />
    </>
  )
}

export default Introduce;
