"use client";
import useCart from "@/app/stores/useCartStore";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function ButtonCartToggler() {
  const productsCount = useCart((state) => state.productsCount);
  const toggleCart = useCart((state) => state.toggleCart);
  return (
    <button
      onClick={toggleCart}
      className="cart-toggler w-fit flex items-center justify-end ml-auto hover:opacity-60 relative text-md font-black text-inverse"
    >
      <FaShoppingCart className="w-8 md:w-10 h-auto text-inverse" />
      {productsCount > 0 ? (
        <p className="cart-count text-xs font-bold text-inverse absolute -top-4 -right-4">
          {productsCount}
        </p>
      ) : (
        <></>
      )}
    </button>
  );
}

export default ButtonCartToggler;
