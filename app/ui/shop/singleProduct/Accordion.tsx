import { ProductAttribute } from "@/types/types";
import { FaChevronDown } from "react-icons/fa";

const AccordionAttr = ({key, attr}: {key: number, attr: ProductAttribute}) => {
  return (
    <div key={key}>
      <label
        htmlFor={attr.name}
        className="w-full text-sm text-accent font-regular capitalize hover:cursor-pointer relative peer group"
      >
        {attr.name}

        <FaChevronDown className="absolute top-0 right-0 text-highlight group-hover:text-secondary group-has-[input:checked]:rotate-180 transition-colors duration-100" />

        <input
          type="radio"
          name="attribute"
          id={attr.name}
          className="hidden"
        />
      </label>

      <ul
        className="w-3/4 xl:w-full flex gap-xs font-regular text-sm text-inverse mt-xs h-0 overflow-hidden
            peer-has-[input:checked]:h-auto peer-has-[input:checked]:text-secondary peer-has-[input:checked[&>li]]:animate-bounce leading-[115%] transition-all duration-300"
      >
        {attr.options.map((option: string, i: number) => {
          return (
            <li key={i}>
              <p>{option}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AccordionAttr;
