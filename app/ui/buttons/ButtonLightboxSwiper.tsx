import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";


const ButtonLightboxSwiper = ({
  action,
  disabled,
  handleSwiping,
  className = "",
}: {
  action: "next" | "prev";
  disabled: boolean;
  handleSwiping: (action: "next" | "prev") => void;
  className?: string;
}) => {
  const icons = {
    next: ArrowRight,
    prev: ArrowLeft,
  };
  const Icon = icons[action];
  return (
    <button
      onClick={() => handleSwiping(action)}
      disabled={disabled}
      className={`ae disabled:cursor-pointer bg-highlight p-4 rounded-full text-secondary overflow-hidden xl:hover:opacity-65 z-10 ${className}`}
    >
      <Icon className="w-6 h-auto aspect-square" />
    </button>
  );
};

export default ButtonLightboxSwiper;
