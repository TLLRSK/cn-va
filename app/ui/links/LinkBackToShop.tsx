import Link from "next/link";
import ArrowLeft from "../icons/ArrowLeft";

const LinkBackToShop = () => {
  return (
    <Link
      href="/shop"
      target="_top"
      className="w-fit flex flex-col items-end text-xl font-black ml-auto text-right hover:opacity-60 transition-fading duration-150 leading-[95%] uppercase"
    >
      <div className="overflow-hidden">
        <ArrowLeft className="sliding--left w-10 md:w-12 xl:w-14 2xl:w-16 h-auto aspect-square text-secondary" />
      </div>
      Back
      <br />
      to Shop
    </Link>
  );
};

export default LinkBackToShop;
