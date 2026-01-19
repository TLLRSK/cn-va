import Link from "next/link";
import ArrowLeft from "../icons/ArrowLeft";

const LinkBackTo = ({ url, label }: { url: string; label: string }) => {
  return (
    <Link
      href={url}
      className="w-fit col-span-2 col-start-5 md:col-start-11 2xl:col-start-10 flex flex-col items-end text-xl font-black ml-auto text-right hover:opacity-65 leading-[95%] uppercase"
    >
      <div className="overflow-hidden">
        <ArrowLeft className="sliding--left w-10 md:w-12 xl:w-14 2xl:w-16 h-auto aspect-square" />
      </div>
      Back
      <br />
      {label}
    </Link>
  );
};

export default LinkBackTo;
