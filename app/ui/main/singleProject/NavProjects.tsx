"use client";
import Link from "next/link";
import he from "he";
import { useProjects } from "@/app/context/projectsContext";
import usePostsIndex from "@/hooks/usePostsIndex";
import { useSingleProject } from "@/app/context/singleProjectContext";

const NavProjects = () => {
  const { allProjects } = useProjects();
  const { id } = useSingleProject();
  const { indexedPosts } = usePostsIndex(allProjects, id);

  return (
    <nav className="w-full flex justify-between px-sm md:px-md mt-lg mb-4xl ">
      
      <div className="2xl:col-span-1 2xl:col-start-2">
        <Link
          href={`/work/${indexedPosts.prev?.url}`}
          className="w-fit overflow-hidden mr-auto hover:opacity-60 transition-opacity"
          target="_top"
        >
          <p className="text-sm text-left font-bold">Prev</p>
        </Link>
      </div>

      <div className="flex justify-end max-w-[80%] md:max-w-[60%] xl:max-w-[45%]">
        <Link
          href={`/work/${indexedPosts.next?.url}`}
          className="w-fit flex flex-col items-end mt-auto pl-md hover:opacity-60 transition-opacity"
          target="_top"
        >
          <p className="text-sm text-right font-bold">Next</p>
          <p className="text-xl md:text-2xl xl:text-3xl text-right font-extrabold uppercase leading-[95%]">
            {indexedPosts.next && he.decode(indexedPosts.next.title)}
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default NavProjects;
