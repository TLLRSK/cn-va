"use client";
import { menuLinks } from "@/utils/links";
import { usePathname } from "next/navigation";
import React from "react";
import LinkMenu from "../links/LinkMenu";
import Link from "next/link";

function MenuLinks() {
  const pathname = usePathname();

  const checkIsActive = (link: { href: string; label: string }) => {
    return link.href === "/" ? pathname === "" : pathname === link.href;
  };
  return (
    <nav className="flex lg:col-span-7 lg:order-1 ipad:order-2 xl:order-1 my-auto lg:my-0 ipad:my-auto xl:mt-0 xl:mb-lg">
      <ul className="flex flex-col items-start justify-center lg:justify-start gap-md md:gap-lg">
        {menuLinks.map((link, i) => {
          return (
            <li key={i}>
              <LinkMenu
                key={i}
                index={i}
                checkIsActive={checkIsActive}
                link={link}
              />
            </li>
          );
        })}
      </ul>

      <div className="w-ful lg:w-fit flex justify-between gap-md absolute bottom-0 left-0 p-sm lg:pb-sm mt-auto">
        <Link
          href="/shop/privacy-policy"
          target="_top"
          className="flex text-xs text-accent font-medium overflow-hidden"
        >
          <span className="ae">Privacy Policy</span>
        </Link>

        <Link
          href="/shop/terms"
          target="_top"
          className="flex text-xs text-accent font-medium overflow-hidden"
        >
          <span className="ae">Terms & Conditions</span>
        </Link>
      </div>
    </nav>
  );
}

export default MenuLinks;
