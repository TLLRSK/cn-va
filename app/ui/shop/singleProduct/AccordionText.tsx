"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function AccordionText({ label, content }: { label: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  return (
    <div>
      <button
        onClick={(e) => handleClick(e)}
        className="w-full text-sm text-highlight font-regular capitalize hover:cursor-pointer flex relative peer group"
      >
        <h2 className="ae group-hover:opacity-65 font-medium">
          {label}
        </h2>

        <FaChevronDown className={`absolute top-0 right-0 text-highlight group-hover:text-secondary transition-all duration-150 ${isOpen ? "rotate-180" : "rotate-0"}`} />
      </button>

      <div
        className={`w-3/4 flex flex-col gap-sm font-regular text-sm overflow-hidden [interpolate-size:allow-keywords] transition-all duration-300 [&>p:first-child]:mt-xs ${isOpen ? "h-auto text-secondary opacity-100" : "h-0 text-inverse opacity-0"}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default AccordionText;
