"use client";
import React from "react";

import { useLenis } from "@/app/context/lenisContext";
import ArrowTop from "../icons/ArrowTop";

function ButtonToTop() {
  const lenis = useLenis();

  return (
    <button
      className="flex flex-col items-end ml-auto hover:opacity-60 transition-opacity duration-300 ease-in-out absolute right-6 md:right-8"
      onClick={() => lenis?.scrollTo(0, { duration: 1.5 })}
    >
      <div className="overflow-hidden">
        <ArrowTop className="text-secondary w-8 md:w-10 h-auto aspect-square sliding--top" />
      </div>
    </button>
  );
}

export default ButtonToTop;
