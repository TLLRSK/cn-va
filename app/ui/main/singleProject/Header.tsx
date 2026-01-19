"use client";
import he from "he";
import { useSingleProject } from "@/app/context/singleProjectContext";
import { ResponsiveImage } from "../../images/ResponsiveImage";

const Header = () => {
  const { title, main_image } = useSingleProject();
  const decodedTitle = he.decode(title.rendered);

  return (
    <header className="flex flex-col">
      {title && (
        <>
          <h1 className="h-[25dvh] md:h-[33dvh] flex flex-col items-center justify-start font-black p-sm md:pt-md">
            <span className="ae w-1/3 text-md font-bold text-highlight text-center ">{decodedTitle}</span>
          </h1>
        </>
      )}
      <div className="flex aspect-[16/9]">
        {main_image && (
          <ResponsiveImage
            image={main_image}
            className="image--anim w-full h-full object-cover"
          />
        )}
      </div>
    </header>
  );
};
export default Header;
