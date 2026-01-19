"use client";
import { useDisplayList } from "@/app/stores/useDisplayListStore";
import { FaThList } from "react-icons/fa";
import { IoGridSharp } from "react-icons/io5";

const DisplayToggler = () => {
  const { displayMode, toggleDisplayMode } = useDisplayList();
  return (
    <ul className="display flex gap-sm">
      <li>
        <input type="radio" name="display" id="grid" className="hidden"/>
        <label
          htmlFor="grid"
          onClick={() => toggleDisplayMode("grid")}
          className={`w-6 md:w-8 h-6 md:h-8 transition-colors duration-150 cursor-pointer ${
            displayMode === "grid" ? "text-secondary" : "text-highlight hover:opacity-65 "
          }`}
        >
          <IoGridSharp className="w-8 h-8"/>
        </label>
      </li>
      <li>
        <input type="radio" name="display" id="list" className="hidden"/>
        <label
          htmlFor="list"
          onClick={() => toggleDisplayMode("list")}
          className={`w-6 md:w-8 h-6 md:h-8 transition-colors duration-150 cursor-pointer ${
            displayMode === "list" ? "text-secondary " : "text-highlight hover:opacity-65 "
          }`}
        >
          <FaThList className="w-8 h-8"/>
        </label>
      </li>
    </ul>
  );
};

export default DisplayToggler;
