import React from "react";
import LinkHome from "@/app/ui/links/LinkHome";
import ButtonCartToggler from "@/app/ui/buttons/ButtonCartToggler";
import ButtonMenuToggler from "@/app/ui/buttons/ButtonMenuToggler";

function Topbar() {
  return (
    <nav
      className={`topbar inset-[0_0_auto_0] grid grid-cols-3 pt-sm px-sm md:pt-md md:px-md items-center fixed z-30 mix-blend-difference
        [&>.link--home]:order-2 [&>.link--home]:mx-auto [&>.menu-toggler]:order-1 [&>.cart-toggler]:order-3`}
    >
      <LinkHome />
      <ButtonMenuToggler />
      <ButtonCartToggler />
    </nav>
  );
}

export default Topbar;
