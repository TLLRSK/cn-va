"use client";

import { useDisplayList } from "@/app/stores/useDisplayListStore";
import ProjectCard from "./ProjectCard";
import { useFilter } from "@/app/context/filterContext";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <h3 className="text-lg font-semibold mb-2">No projects available</h3>
  </div>
);

const PortfolioList = () => {
  const { filteredItems } = useFilter();
  const { displayMode } = useDisplayList();

  if (filteredItems.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul
      className={`portfolio ${
        displayMode === "grid"
          ? "grid md:grid-cols-2 col-span-6 md:col-span-12 gap-sm md:gap-md px-sm md:px-md"
          : displayMode === "list"
          ? "flex flex-col xl:[&:has(li:hover)_li:not(:hover)_a]:opacity-40 px-sm md:px-md"
          : ""
      }`}
      role="list"
      aria-label="Portfolio projects"
    >
      {filteredItems.map((project, i) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </ul>
  );
};

export default PortfolioList;
