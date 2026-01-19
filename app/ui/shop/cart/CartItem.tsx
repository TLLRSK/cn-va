"use client";
import React from "react";
import useCartStore from "@/app/stores/useCartStore";
import { CartProduct } from "@/types/types";
import AmountInput from "../singleProduct/AmountInput";
import { MdDeleteOutline } from "react-icons/md";

const CartItem = ({ product }: { product: CartProduct }) => {
  const updateAmount = useCartStore((state) => state.updateProductAmount);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const handleAmountChange = (newAmount: number) => {
    if (newAmount <= 0) {
      removeProduct(product.id);
    } else {
      updateAmount(product.id, newAmount);
    }
  };

  const maxStock =
    typeof product.stock_quantity === "number" ? product.stock_quantity : 99;

  return (
    <li className="cart-item w-full flex items-start justify-between gap-md relative overflow-hidden pb-sm border-b border-muted mt-sm">
      <div className="w-auto max-w-36 aspect-square flex items-center justify-center bg-muted p-xxs rounded-md">
        <img
          src={product.image.sizes.thumbnail}
          alt={product.name}
          className="ae w-3/4 object-contain"
        />
      </div>

      <div className="flex-1 h-full flex flex-wrap gap-y-md">
        <h3 className="w-full ae font-medium text-sm font-secondary overflow-hidden">
          <span>{product.name}</span>
        </h3>

        <button
          type="button"
          onClick={() => removeProduct(product.id)}
          className="text-highlight absolute top-0 right-0 opacity-100 hover:opacity-60 transition-fading duration-150 overflow-hidden"
          aria-label="Remove product"
        >
          <MdDeleteOutline className="ae w-8 h-auto lg:w-10" />
        </button>

        <AmountInput
          value={product.quantity ?? 1}
          onChange={handleAmountChange}
          min={1}
          max={maxStock}
          className="ae item-quantity mt-auto"
        />

        <p className="text-md ae font-bold text-secondary text-right mt-auto ml-auto">
          {product.price} €
        </p>
      </div>
    </li>
  );
};

export default CartItem;
