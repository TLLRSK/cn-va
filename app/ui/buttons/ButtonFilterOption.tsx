"use client";

interface ButtonFilterOptionProps {
  id?: string | number;
  name: string;
  onClick: () => void;
  categoryCount: number;
  activeCategoryId?: string | number;
}

const ButtonFilterOption: React.FC<ButtonFilterOptionProps> = ({
  id,
  name,
  onClick,
  categoryCount,
  activeCategoryId,
}) => {
  const isActive = activeCategoryId === id;

  return (
    <button
      id={id?.toString()}
      name={name}
      onClick={onClick}
      className={`ae filter-option flex justify-between uppercase border-b border-muted pb-xs transition-opacity duration-300 group overflow-hidden ${
        isActive ? "active" : ""
      }`}
    >
      <span
        data-content={name}
        className={`option-span w-full text-left relative text-title font-bold leading-[85%] hover:cursor-pointer will-change-transform after:content-[attr(data-content)] after:absolute after:inset-0 after:w-full after:font-bold
          ${
            isActive
              ? "active text-inverse -translate-y-full selected after:text-foreground after:translate-y-full"
              : "text-highlight lg:group-hover:text-foreground translate-y-0 not-selected after:text-inverse after:translate-y-[100%]"
          }`}
      >
        {name}
      </span>

      <div className="option-count ae text-xs leading-[85%] font-regular transition-colors duration-300 mt-auto">
        <span
          className={`filter-span text-title font-bold ${
            isActive ? "active text-foreground" : "text-highlight"
          }`}
        >
          {categoryCount < 10 ? `0${categoryCount}` : categoryCount}
        </span>
      </div>
    </button>
  );
};

export default ButtonFilterOption;
