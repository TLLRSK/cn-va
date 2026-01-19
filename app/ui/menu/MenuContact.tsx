import { MenuProps, SocialMedia } from "@/types/types";
import Link from "next/link";
import LinkSocial from "../links/LinkSocial";

const MenuContact = ({ email, social }: MenuProps) => {
  return (
    <div className="h-fit menu-header flex flex-col lg:col-span-5 lg:order-2 ipad:order-1 xl:order-2">
      <h2 className="flex flex-col sm:max-w-screen-2/3 text-title xl:text-title-xl font-black uppercase leading-[95%] transition-opacity overflow-hidden">
        <span className="ae">Contact</span>
      </h2>

      <ul className="flex [&>a:first-child]:pl-0 mt-xs overflow-hidden">
        {social.map((media: SocialMedia, i: number) => {
          return (
            <LinkSocial
              key={i}
              className="ae text-inverse w-10 md:w-12 aspect-square"
              url={media.url}
              code={media.svg_code}
            />
          );
        })}
      </ul>

      <div className="flex flex-col gap-2 overflow-hidden mt-3xl">
        <h4 className="flex text-xs font-medium text-accent overflow-hidden">
          <span className="ae">Get in touch</span>
        </h4>

        <Link
          href={`mailto:${email}`}
          className="w-fit flex flex-col overflow-hidden"
        >
          <span className="ae text-md font-black uppercase will-change-transform">
            {email.split("@")[0]}
            <br />@{email.split("@")[1]}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MenuContact;
