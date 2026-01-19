import React from "react";

interface ButtonCloseProps {
  onClose: () => void;
  color?: string;
  className?: string;
}

const ButtonClose = ({
  onClose,
  color = "muted",
  className = "",
  
}: ButtonCloseProps) => {
  return (
    <button
      onClick={onClose}
      className={`btn--close w-fit h-fit aspect-square flex items-center bg-${color} rounded-full z-30 p-xs hover:opacity-60 will-change-transform ${className}`}
    >
      <span
        className={`burger w-8 h-[5px] md:w-10 md:h-[6px] bg-secondary after:bg-secondary`}
      ></span>
    </button>
  );
};

export default ButtonClose;
