import { ImMinus, ImPlus } from "react-icons/im";

const icons = {
  increment: <ImPlus className="w-4 h-4" />,
  decrement: <ImMinus className="w-4 h-4" />,
};

const BtnAmount = ({
  onClick,
  action,
  disabled,
}: {
  onClick: () => void;
  action: "increment" | "decrement";
  disabled: boolean;
}) => {

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${action} quantity`}
      className="btn w-14 h-14 flex items-center justify-center bg-background md:not-disabled:hover:bg-foreground border border-muted hover:bg-foreground hover:text-inverse hover:border-transparent disabled:border-muted disabled:bg-background disabled:text-accent rounded-md aspect-square text-secondary transition-all duration-150 ease-in-out"
    >
      {icons[action]}
    </button>
  );
};

export default BtnAmount;
