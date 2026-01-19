"use client";
import useCartStore from "@/app/stores/useCartStore";
import CartItem from "./CartItem";
import Overlay from "@/app/ui/global/Overlay";
import Separator from "@/app/ui/global/Separator";
import BtnCheckout from "./BtnCheckout";
import ButtonClose from "../../buttons/ButtonClose";

function Cart() {
  const { isOpen, toggleCart, products, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal().toFixed(2);

  return (
    <>
      {isOpen && (
        <>
          <aside
            className={`cart w-auto h-full fixed top-0 right-0 inset-0 md:inset-[0_0_0_50%] xl:inset-[0_0_0_66.6%] bg-background z-50 flex flex-col p-sm md:px-md pb-lg`}
          >
            <div className="flex gap-xs items-start justify-between">
              <header className="w-full flex items-center justify-between overflow-hidden pb-xxs">
                <h2 className="flex items-end gap-xs overflow-hidden">
                  <span className="ae text-lg text-accent font-semibold leading-[90%]">
                    Cart
                  </span>
                </h2>

                <ButtonClose color="muted" onClose={toggleCart} />
              </header>
            </div>

            <Separator color="muted" className="ae origin-right" />

            {products.length === 0 ? (
              <div className="flex overflow-hidden my-auto">
                <p className="ae text-lg font-bold text-accent text-center">
                  Your cart is empty.
                </p>
              </div>
            ) : (
              <ul className="flex-1 overflow-y-auto flex flex-col">
                {products.map((product, i) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ul>
            )}

            <div className="flex flex-col items-start gap-sm overflow-hidden">
              <p className="w-full flex items-center justify-between overflow-hidden">
                <span className="ae text-accent text-sm font-semibold">
                  Subtotal:
                </span>{" "}
                <span className="ae text-foreground text-lg font-semibold">
                  {subtotal}€
                </span>{" "}
              </p>

              <Separator color="muted" className="ae origin-right" />

              <p className="ae text-xs text-accent font-regular overflow-hidden">
                <span className="text-violet text-sm font-bold">*</span>{" "}
                Shipping cost will be added after filling the Checkout form.
              </p>
            </div>

            <BtnCheckout disabled={products.length < 1} />
          </aside>

          <Overlay onClose={toggleCart} />
        </>
      )}
    </>
  );
}

export default Cart;
