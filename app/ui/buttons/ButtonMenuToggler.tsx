"use client";
import { useMenu } from "@/app/stores/useMenuStore";
import React from "react";

const ButtonMenuToggler = () => {
  const toggleMenu = useMenu((state) => state.toggleMenu);

  return (
    <button
      onClick={toggleMenu}
      className={`menu-toggler w-8 h-8 md:w-10 md:h-10 flex group items-center justify-center hover:cursor-pointer hover:opacity-60 `}
    >
      <span
        className={`w-8 h-[5px] md:w-10 md:h-[6px] transition-transform bg-inverse after:bg-inverse
        after:w-8 after:h-[5px] md:after:w-10 md:after:h-[6px] after:content-[''] after:-translate-x-2/4 after:transition-transform after:absolute rotate-[180deg] after:rotate-90`}
      />
    </button>
  );
};

export default ButtonMenuToggler;
