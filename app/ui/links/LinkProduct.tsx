"use client";
import Link from "next/link";
import { useSingleProject } from "@/app/context/singleProjectContext";
import ArrowTopRight from "../icons/ArrowTopRight";

const LinkProduct = ({ color = "" }: { color?: string }) => {
  const { link } = useSingleProject();
  return (
    <Link
      href={link.url}
      target="_blank"
      className="w-fit h-fit flex gap-1 hover:opacity-60 transition-opacity overflow-hidden"
      style={{color:`${color}`}}
    >
      <p className="at animated-text text-md font-black">
        {link.text}
      </p>
      <div className="overflow-hidden flex">
        <ArrowTopRight color={color} className="at animated-text w-3 h-3 text-foreground sliding--top-right"  />
      </div>
    </Link>
  );
};
export default LinkProduct;
