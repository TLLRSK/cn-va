"use client";
import { ProjectData } from "@/types/types";
import React from "react";
import he from "he";
import Link from "next/link";
import { useDisplayList } from "@/app/stores/useDisplayListStore";
import { ResponsiveImage } from "../../images/ResponsiveImage";

const ProjectCard = ({ project }: { project: ProjectData }) => {
  const { displayMode } = useDisplayList();

  return (
    <li
      id="project-card"
      className={
        displayMode === "grid"
          ? "portfolio__card ae flex group relative"
          : "border-muted first:border-t border-b py-xs"
      }
    >
      <Link
        id="project-link"
        href={`work/${project.slug}`}
        className="w-full h-auto transition-opacity duration-150"
        target="_top"
      >
        <div
          id="container"
          className={
            displayMode === "grid"
              ? "w-full h-full aspect-square overflow-hidden relative rounded-md"
              : "flex xl:flex-row-reverse justify-between items-center"
          }
        >
          <div
            id="image-container"
            className={
              displayMode === "grid"
                ? "w-full h-full relative"
                : "w-[clamp(7.6rem,6vw,8.4rem)] h-auto image--anim hidden xl:flex relative aspect-square"
            }
          >
            {project.featured_media && (
              <ResponsiveImage
                image={project.featured_media}
                className={
                  displayMode === "grid"
                    ? "w-full aspect-square portfolio__card-image object-cover will-change-transform transition-all duration-300 ease-in_out group-hover:scale-[1.02] scale-[1]"
                    : "w-full aspect-square object-cover will-change-transform rounded-md transition-fading duration-300 ease-in_out"
                }
              />
            )}
          </div>

          <div
            id="title-container"
            className={
              displayMode === "grid"
                ? "absolute flex justify-center items-center z-10 inset-0 p-sm opacity-0 xl:group-hover:opacity-100 after:absolute after:content-[''] after:inset-[auto_0_0_0] after:h-full group-hover:after:opacity-75 after:-z-10 after:opacity-0 after:bg-foreground backdrop-blur-sm transition-all ease-in_out after:transition-all after:duration-300 after:ease-in_out"
                : "xl:max-w-[85%]"
            }
          >
            <h3
              className={
                displayMode === "grid"
                  ? "portfolio__card-title sm:w-3/4 lg:w-[85%] xl:w-4/5 text-xl font-bold text-inverse text-center translate-y-4 opacity-0 xl:group-hover:translate-y-0 xl:group-hover:opacity-100 xl:group-hover:transition-fading xl:group-hover:duration-300 ease-in_out will-change-transform uppercase leading-[95%]"
                  : "portfolio__card-title text-title md:text-2xl xl:text-3xl font-extrabold uppercase transition-fading duration-300 ease-in_out text-foreground leading-[90%] will-change-transform"
              }
            >
              {he.decode(project.title.rendered)}
            </h3>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProjectCard;
