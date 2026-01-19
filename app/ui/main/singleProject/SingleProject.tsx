"use client";
import Header from "./Header";
import Gallery from "./Gallery";
import NavProjects from "./NavProjects";
import Content from "./Content";

const SingleProject = () => {
  return (
    <section>
      <article className="single-project flex flex-col">
        <Header />
        <Content />
        <Gallery />
      </article>
      <NavProjects />
    </section>
  );
};

export default SingleProject;
