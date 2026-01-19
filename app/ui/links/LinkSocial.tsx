import React from "react";

const LinkSocial = ({
  className = "",
  url,
  code,
  color = "currentColor",
}: {
  className?: string;
  url: string;
  code: string;
  color?: string;
}) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="animated-text pr-md transition-opacity">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
      >
        <path d={code} fill={color} />
      </svg>
    </a>
  );
};

export default LinkSocial;