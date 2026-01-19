import React from "react";
import Cart from "../ui/shop/cart/Cart";

function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cart />
      {children}
    </>
  );
}

export default ShopLayout;
