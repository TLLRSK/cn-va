import { getAboutData, getPageData } from "@/lib/actions";
import Header from "@/app/ui/main/about/Header";
import Content from "@/app/ui/main/about/Content";

const AboutPage = async () => {
  const pageData = await getAboutData();

  const { featured_media } = pageData;

  return (
    <section id="about" className="about">
      <Header portrait={featured_media} />
      <Content data={pageData.acf} />
    </section>
  );
};

export default AboutPage;
