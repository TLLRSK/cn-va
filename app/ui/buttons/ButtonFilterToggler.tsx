"use client";
import { useFilter } from "@/app/context/filterContext";
import { IoFilterSharp } from "react-icons/io5";

const ButtonFilterToggler = () => {
  const { toggleFilter, activeCategory } = useFilter();
  return (
    <button
      onClick={() => toggleFilter()}
      className="group w-fit flex gap-3 items-center opacity-100 transition-opacity duration-150 hover:opacity-60"
    >
      <IoFilterSharp className="w-8 md:w-10 h-auto text-highlight" />

      <p className="text-sm text-foreground font-semibold capitalize leading-[90%]">
        {activeCategory?.name || "All"}
      </p>
    </button>
  );
};

export default ButtonFilterToggler;