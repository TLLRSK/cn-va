import PortfolioList from "./PortfolioList";
import { getCategories, getPostsData } from "@/lib/actions";
import Filter from "../../filter/Filter";
import { FilterProvider } from "@/app/context/filterContext";
import DisplayToggler from "./DisplayToggler";
import ButtonFilterToggler from "../../buttons/ButtonFilterToggler";

const Portfolio = async() => {
  const allProjects = await getPostsData();
  const categories = await getCategories();

  return (
    <section className="flex flex-col mt-3xl">
      <FilterProvider
        itemsType="projects"
        allItems={allProjects}
        categories={categories}
        categoryKey="categories"
      >
        <div id="control-bar" className="list-bar flex justify-between items-center p-sm md:px-md">
          <div>
            <ButtonFilterToggler />
            <Filter />
          </div>
          <DisplayToggler />
        </div>
        
        <PortfolioList />
      </FilterProvider>
    </section>
  );
};

export default Portfolio;
