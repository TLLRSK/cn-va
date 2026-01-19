import { getPageData } from "@/lib/actions";
import React from "react";
import ButtonToTop from "../buttons/ButtonToTop";
import { SocialMedia } from "@/types/types";
import FooterLinks from "./FooterLinks";
import LinkSocial from "../links/LinkSocial";


const Footer = async () => {
  const contactData = await getPageData("contact");
  
  const { email, social } = contactData.acf;
  return (
    <footer className="relative flex flex-col justify-between px-sm pb-sm md:px-md bg-background text-secondary mt-4xl gap-2xl">
      <ButtonToTop />
      
      <div className="grid gap-md">
        <a
          href={`mailto:${email}`}
          className="w-fit text-md font-black hover:opacity-60 transition-opacity uppercase leading-none"
          color="secondary"
        >
          {email.split("@")[0]}
          <br />@{email.split("@")[1]}
        </a>

        <ul className="flex [&>a:first-child]:pl-0">
          {social.map((media: SocialMedia, i: number) => {
            return (
              <LinkSocial
                key={i}
                className="text-foreground w-10 md:w-12 aspect-square hover:opacity-60 transition-opacity"
                url={media.url}
                code={media.svg_code}
              />
            );
          })}
        </ul>
      </div>

      <div
        className="grid grid-cols-6 grid-rows-3 md:grid-rows-2 md:grid-cols-12 relative"
      >
        <FooterLinks />
        <h4
          className="h-fit col-span-4 col-start-1 row-span-3 overflow-hidden md:col-span-10 
          text-vw-xs sm:text-vw-sm md:text-vw-md lg:text-vw-xl xl:text-vw-xl font-black uppercase leading-[85%] mt-auto"
        >
          coke
          <br />
          navarro
        </h4>

        <div className="row-start-3 col-start-5 md:col-start-11 col-span-2 flex flex-col items-start justify-start mt-auto">
          <p className="text-left text-xs font-regular text-accent">
            ©2024
            <br />
            All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;