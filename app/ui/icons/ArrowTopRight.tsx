import React from "react";

function ArrowTopRight({ className, color }: { className?: string, color?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{color:`${color}`}}
    >
      <path
        d="M2.67195 12L0 9.32805L6.05705 3.26149H1.35024V0H12V10.6498H8.74802V5.94295L2.67195 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default ArrowTopRight;
