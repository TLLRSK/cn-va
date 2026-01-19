const ButtonMainAction = ({
  text,
  altText,
  type = "button",
  disabled,
  className = "",
}: {
  text: string;
  altText: string;
  type?: "button" | "submit" | "reset";
  disabled: boolean;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`
            w-full flex justify-center p-sm font-semibold relative overflow-hidden rounded-md mt-auto text-sm transition-colors duration-150
            ${
              disabled
                ? "border border-muted text-accent cursor-not-allowed"
                : "bg-foreground text-inverse hover:bg-accent"
            }
            ${className}
            `}
      type={type}
    >
        <span>{disabled ? altText : text}</span>
    </button>
  );
};

export default ButtonMainAction;
