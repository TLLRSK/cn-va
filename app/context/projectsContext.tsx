"use client";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import {
  type ProjectData,
  type TransformedCategory,
  type IProjectsContext,
  isNormalizedCategory,
} from "@/types/types";

const ProjectsContext = createContext<IProjectsContext | undefined>(undefined);

export const ProjectsProvider = ({
  children,
  initialProjects,
  initialCategories,
}: {
  children: ReactNode;
  initialProjects: ProjectData[];
  initialCategories: TransformedCategory[];
}) => {
  const [allProjects] = useState(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const [categories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState<
    TransformedCategory | undefined
  >(undefined);
  const [selectedProject, setSelectedProject] = useState<
    ProjectData | undefined
  >(undefined);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const categoryCounts = useMemo(() => {
    const counts: Record<number, number> = {};

    allProjects.forEach((project) => {
      project.categories?.forEach((category) => {
        const categoryId = isNormalizedCategory(category)
          ? category.id
          : category;
        counts[categoryId] = (counts[categoryId] || 0) + 1;
      });
    });

    initialCategories.forEach((category) => {
      counts[category.id] = counts[category.id] || 0;
    });

    return counts;
  }, [allProjects, initialCategories]);

  const filteredByCategory = () => {
    if (!activeCategory) return allProjects;

    return allProjects.filter((project) => {
      if (!project.categories) return false;

      return project.categories.some((category) => {
        return category.id === activeCategory.id;
      });
    });
  };

  useEffect(() => {
    setFilteredProjects(filteredByCategory);
  }, [allProjects, activeCategory]);

  const getCurrentIndex = (slug: string) => {
    const currentProjectIndex = allProjects.findIndex((project) => project.slug === slug) || currentIndex;
    setCurrentIndex(currentProjectIndex);
  }
  
  const selectCategory = (id: number | undefined) => {
    setActiveCategory((prev) =>
      prev?.id === id ? undefined : categories.find((cat) => id === cat.id)
    );
  };

  const clearCategory = () => {
    setActiveCategory(undefined);
  };

  const value = useMemo(
    () => ({
      allProjects,
      filteredProjects,
      categories,
      activeCategory,
      categoryCounts,
      getCurrentIndex,
      currentIndex,
      selectCategory,
      clearCategory,
    }),
    [
      allProjects,
      filteredProjects,
      categories,
      activeCategory,
      categoryCounts,
      selectedProject,
      getCurrentIndex,
      currentIndex,
    ]
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectsProvider");
  return ctx;
};
