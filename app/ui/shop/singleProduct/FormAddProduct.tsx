"use client";
import ButtonMainAction from "@/app/ui/buttons/ButtonMainAction";
import { useState } from "react";
import useCartStore from "@/app/stores/useCartStore";
import AmountInput from "./AmountInput";
import { CartProduct } from "@/types/types";

const FormAddProduct = ({ product }: { product: CartProduct }) => {
  const addProductToCart = useCartStore((state) => state.addProduct);
  const openCart = useCartStore((state) => state.openCart);

  const quantityInCartSelector = useCartStore(
    (state) => state.products.find((p) => p.id === product.id)?.quantity ?? 0
  );
  const quantityInCart = quantityInCartSelector || 0;

  const remainingStock = Math.max(product.stock_quantity - quantityInCart, 0);
  const [quantity, setQuantity] = useState<number>(remainingStock > 0 ? 1 : 0);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (quantity <= 0 || remainingStock <= 0) return;

    const toAdd = Math.min(quantity, remainingStock);

    addProductToCart(product, toAdd);
    setQuantity(1);
    openCart();
  };

  return (
    <form
      action="#"
      className="ae flex flex-col ipad:flex-col 2xl:flex-col gap-md"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col overflow-hidden">
        <label
          htmlFor="quantity"
          className="ae text-sm font-medium text-highlight mb-5"
        >
          Qty
        </label>
        <AmountInput
          value={quantity}
          onChange={setQuantity}
          min={product.stock_quantity - quantityInCart < 1 ? 0 : 1}
          max={product.stock_quantity - quantityInCart}
        />
      </div>
      {product.stock_status === "instock" ? (
        <ButtonMainAction
          text="Add to cart"
          altText="Max."
          type="submit"
          className="xl:w-3/4"
          disabled={quantity <= 0 || remainingStock <= 0}
        />
      ) : (
        <div className="ae w-full xl:w-3/4 h-fit group flex justify-center p-sm text-accent text-sm font-bol relative border border-muted overflow-hidden mt-auto rounded-sm">
          Sold out
        </div>
      )}
    </form>
  );
};

export default FormAddProduct;
