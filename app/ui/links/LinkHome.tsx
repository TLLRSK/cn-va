import Link from "next/link";

const LinkHome = ({ className = "" }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={`link--home flex text-md font-extrabold text-inverse xl:hover:opacity-60 transition-opacity hover:cursor-pointer z-30 relative ${className}`}
      target="_top"
    >
      <span>Coke</span>
    </Link>
  );
};

export default LinkHome;
