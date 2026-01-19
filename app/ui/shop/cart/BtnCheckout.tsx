"use client";
import useCartStore from "@/app/stores/useCartStore";
import ArrowRight from "@/app/ui/icons/ArrowRight";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function BtnCheckout({ disabled }: { disabled: boolean }) {
  const { products, isLoading, sendToCheckout } = useCartStore();
  
  const handleClick = () => {
    sendToCheckout();
  };
  return (
    <button
      onClick={handleClick}
      disabled={products.length < 1 || isLoading}
      className={`
            ae group w-full flex justify-center p-sm uppercase relative overflow-hidden rounded-md border mt-md
            ${
              isLoading
                ? "bg-background border-violet"
                : disabled
                ? "border-muted text-foreground cursor-not-allowed"
                : "bg-foreground text-inverse after:content-[''] after:bg-violet after:absolute after:inset-0 after:scale-x-0 after:origin-right hover:after:origin-left hover:after:scale-x-100 after:transition-fading after:duration-500 after:will-change-transform after:ease-in_out"
            }`}
    >
      <span
        data-content={disabled ? "Add some stuff" : "To Checkout"}
        className={`w-full h-fit flex items-center justify-center gap-4 text-sm font-bold capitalize leading-[85%] duration-500 z-10 ${
          isLoading
            ? "text-inverse"
            : disabled
            ? "text-accent"
            : ""
        }`}
      >
        {disabled ? "Add some stuff" : "To Checkout"}
        {!disabled && (
          <div className="overflow-hidden">
            <ArrowRight className="w-4 h-4 md:w-6 md:h-6 sliding--right" />
          </div>
        )}
      </span>

      {isLoading && (
        <div
          className={`absolute inset-0 w-full flex items-center justify-center gap-4 p-xs z-10 text-violet`}
        >
          <AiOutlineLoading3Quarters className="ae animate-rotate w-4 xl:w-6 h-auto" />
          <span className="ae capitalize text-sm font-bold animate-loading">Processing...</span>
        </div>
      )}
    </button>
  );
}
