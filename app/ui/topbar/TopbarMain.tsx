import { FaAsterisk } from "react-icons/fa";
import ButtonMenuToggler from "../buttons/ButtonMenuToggler";
import LinkHome from "../links/LinkHome";
function Topbar() {
  return (
    <>
      <nav
        className={`topbar max-h-0 inset-[0_0_auto_0] flex justify-between pt-sm px-sm md:pt-md md:px-md md:grid-cols-12 gap-md fixed z-30 mix-blend-difference`}
      >
        <LinkHome />
        <ButtonMenuToggler />
      </nav>
    </>
  );
}

export default Topbar;
