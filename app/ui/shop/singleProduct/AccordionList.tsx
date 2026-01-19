"use client";
import { ProductAttribute } from "@/types/types";
import { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const AccordionList = ({
  label,
  attributes = [],
}: {
  label: string;
  attributes?: ProductAttribute[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={(e) => handleClick(e)}
        className="w-full text-sm text-highlight font-medium capitalize hover:cursor-pointer flex relative peer group overflow-hidden"
      >
        <h2 className="ae group-hover:opacity-65 font-medium">
          {label}
        </h2>

        <FaChevronDown
          className={`absolute top-0 right-0 text-highlight group-hover:text-secondary transition-all duration-150 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <ul
        className={`xl:w-full flex flex-col gap-sm font-regular text-sm text-inverse overflow-hidden transition-all ease-in-out duration-300 [interpolate-size:allow-keywords] ${
          isOpen ? "h-auto text-secondary" : "h-0"
        }`}
      >
        {attributes.map((attr, i) => (
          <li key={i} className={`grid grid-cols-12 first:mt-xs transition-opacity duration-500 ease-in_out ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <h3 className="font-medium text-sm capitalize col-span-3">
              {attr.name}
            </h3>
            <ul className="flex flex-col col-span-8 xl:col-span-6">
              {attr.options.map((option, j) => (
                <li key={j} className="text-sm font-regular">
                  {option}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccordionList;
