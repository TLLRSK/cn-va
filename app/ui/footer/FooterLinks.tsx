"use client";
import { TLink } from "@/types/types";
import { menuLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function FooterLinks() {
  const pathname = usePathname();

  const checkIsActive = (link: TLink) => {
    return pathname.toLowerCase().includes(link.href);
  };

  return (
    <ul
      className="w-full flex flex-col items-end lg:items-start gap-md ml-auto 
      col-span-2 row-start-1 col-start-5
      md:col-span-2 md:col-start-11 absolute top-0
    "
    >
      {menuLinks.map((link, i) => {
        if (pathname === "/" && link.label === "work") return null;
        if (pathname.startsWith("/work") && link.label === "work") return null;
        return (
          <li
            key={i}
            className={`peer group/footer flex justify-end md:justify-start ${
              checkIsActive(link) ? "hidden" : "flex"
            }`}
          >
            <Link
              href={link.href}
              className={`w-fit flex flex-col items-end lg:items-start gap-2 capitalize relative hover:opacity-60 transition-opacity`}
              target="_top"
            >
              <span
                className={`relative font-black text-md ${spanClasses}`}
              >
                {link.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default FooterLinks;

const spanClasses = "after:content-[''] after:absolute after:left-0 after:right-0 after:top-[50%] after:-translate-y-[50%] after:h-2 after:bg-foreground after:transition-fading after:duration-300 after:ease-in_out leading-[80%] will-change-transform after:scale-x-0 after:origin-right group-hover/footer:after:scale-x-100 group-hover/footer:after:origin-left"