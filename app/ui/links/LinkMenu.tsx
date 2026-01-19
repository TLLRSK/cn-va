import { TLink } from "@/types/types";
import Link from "next/link";

const LinkMenu = ({
  link,
  index,
  checkIsActive,
}: {
  link: TLink;
  index: number;
  checkIsActive: (link: TLink) => boolean;
}) => {
  return (
    <Link
      href={link.href}
      target="_top"
      className="w-full flex flex-col gap-2 transition-opacity overflow-hidden uppercase relative group/menu text-inverse"
    >
      <div className="flex h-fit link-index text-xs font-medium leading-[90%] text-accent overflow-hidden">
        <span className="ae">0{index + 1}.</span>
      </div>

      <div className="flex overflow-hidden">
        <span
          className={`ae relative h-fit leading-[80%] text-vw-sm ipad:text-vw-sm lg:text-vw-lg font-black after:content-[''] after:absolute after:left-0 after:right-0 after:top-[50%]
        after:-translate-y-[50%] after:h-6 md:after:h-10 xl:after:h-12 after:bg-background after:transition-transform after:duration-300 after:ease-in_out will-change-transform
        ${
          checkIsActive(link)
            ? "after:scale-x-100 after:origin-left"
            : "after:scale-x-0 after:origin-right group-hover/menu:after:scale-x-100 group-hover/menu:after:origin-left"
        }
      `}
        >
          {link.label}
        </span>
      </div>
    </Link>
  );
};

export default LinkMenu;
