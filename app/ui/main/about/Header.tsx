"use client";
import React from "react";
import { MediaDetails } from "@/types/types";

const Header = ({ portrait }: { portrait: MediaDetails }) => {
  return (
    <header className="w-full pt-[33dvh] md:pt-[25dvh] h-screen lg:h-auto ipad:h-screen xl:h-auto flex">
      <div
        style={{ backgroundImage: `url(${portrait.url})` }}
        className="about-image animate-parallax xl:animate-parallax-xl relative w-full md:aspect-[3/4] xl:aspect-[16/12] object-center bg-no-repeat bg-[auto_120%] md:bg-cover"
      ></div>
    </header>
  );
};

export default Header;
