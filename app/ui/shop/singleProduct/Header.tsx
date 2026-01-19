import BreadCrumb from "./BreadCrumb";

const Header = ({name, price}: {name: string, price: string}) => {
  return (
    <header className="flex flex-col items-start">
      <BreadCrumb productName={name} />
      <h1 className=" w-3/4 md:w-full xl:w-3/4 flex lg:pr-md text-xl capitalize font-bold text-secondary text-left leading-[90%] mt-md">
        <span className="ae">{name}</span>
      </h1>

      <p className="flex text-lg uppercase font-medium text-highlight text-center mt-xs overflow-hidden">
        <span className="ae">€{price}</span>
      </p>
    </header>
  );
};

export default Header;