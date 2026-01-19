"use client";
import Link from "next/link";
import { MenuProps, SocialMedia } from "@/types/types";
import MenuLinks from "./MenuLinks";
import LinkSocial from "../links/LinkSocial";
import useBlockScrolling from "@/hooks/useBlockScrolling";

import { useMenu } from "@/app/stores/useMenuStore";
import ButtonClose from "../buttons/ButtonClose";
import MenuContact from "./MenuContact";
import LinkHome from "../links/LinkHome";
import { FaAsterisk } from "react-icons/fa";

const MenuClient = ({ email, social }: MenuProps) => {
  const { isMenuOpen } = useMenu();
  const toggleMenu = useMenu((state) => state.toggleMenu);

  useBlockScrolling(isMenuOpen);

  return (
    <>
      {isMenuOpen && (
        <section
          id="menu"
          className={`menu fixed inset-0 w-full flex flex-col bg-foreground text-inverse overflow-hidden group z-50 p-sm md:p-md`}
        >
          <header className="flex justify-between">
            <LinkHome className="text-inverse" />
            <ButtonClose
              color="inverse"
              className="ml-auto"
              onClose={toggleMenu}
            />
          </header>

          <div className="w-full h-full lg:h-auto ipad:h-full xl:h-auto flex flex-col lg:grid lg:grid-cols-12 ipad:flex xl:grid xl:grid-cols-12 pt-3xl xl:pt-[12.5dvh]">
            <MenuContact email={email} social={social} />
            <MenuLinks />
          </div>
        </section>
      )}
    </>
  );
};

export default MenuClient;
