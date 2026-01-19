"use client";
import { ImMinus, ImPlus } from "react-icons/im";
import { AmountInputProps } from "@/types/types";
import { useEffect, useState } from "react";
import BtnAmount from "./BtnAmount";

const AmountInput = ({
  value,
  onChange,
  min = 1,
  max = 1,
  className = "",
}: AmountInputProps) => {
  const [animKey, setAnimKey] = useState(0);
  const [animAction, setAnimAction] = useState<
    "increment" | "decrement" | null
  >(null);
  const [displayValue, setDisplayValue] = useState(value);

  const handleChange = (
    newValue: number,
    action: "increment" | "decrement"
  ) => {
    const clamped = Math.max(min, Math.min(max ?? newValue, newValue));

    setAnimAction(action);
    setAnimKey((k) => k + 1);

    onChange(clamped);

    setTimeout(() => {
      setAnimAction(null);
    }, 300);
  };

  const increment = () => handleChange(value + 1, "increment");
  const decrement = () => handleChange(value - 1, "decrement");

  useEffect(() => {
    const id = setTimeout(() => {
      setDisplayValue(value);
    }, 150);
    return () => clearTimeout(id);
  }, [value]);

  return (
    <div className={`flex items-center rounded-md gap-4 ${className}`}>
      <BtnAmount
        onClick={decrement}
        action="decrement"
        disabled={value <= min || max < 1}
      />
     
      <div
        className={`w-14 h-14 flex items-center justify-center px-2 py-2 text-center focus:outline-none focus:ring-2 rounded-md
            ${max < 1 ? "bg-background text-accent" : "bg-[var(--gray-50)]"} `}
      >
        <span
          key={animKey}
          className={`text-sm font-regular leading-[85%]
              ${
                animAction === "increment"
                  ? "animate-counter--to-top"
                  : animAction === "decrement"
                  ? "animate-counter--to-bottom"
                  : ""
              }
            `}
        >
          {displayValue}
        </span>
      </div>

      <input
        type="hidden"
        min={min}
        max={max}
        value={value}
        aria-label="Product quantity"
        disabled={min === 0}
      />

      <BtnAmount
        onClick={increment}
        action="increment"
        disabled={max !== undefined && value >= max}
      />
    </div>
  );
};

export default AmountInput;