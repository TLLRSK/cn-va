import React from "react";

import Cart from "../cart/Cart";
import LinkHome from "../../links/LinkHome";
import Menu from "../../menu/Menu";
import ButtonCartToggler from "../../buttons/ButtonCartToggler";
function Navbar() {
  return (
    <div
      className="bg-background top-0 right-0 bottom-auto left-0 grid grid-cols-3 relative
    [&_.link--home]:left-2/4 [&_.link--home]:-translate-x-2/4
    [&>*:nth-child(2)]:left-0"
    >
      <LinkHome />
      <Menu />
      <ButtonCartToggler />
      <Cart />
    </div>
  );
}

export default Navbar;
