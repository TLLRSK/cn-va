import AccordionListText from "./AccordionListText";
import AccordionListPublication from "./AccordionPublication";

export type AccordionListItem = {
  publication_image?: number;
  main_text: string;
  secondary_text: string;
  url: string;
};
export type FeaturingCategoriesItem = {
  name: string;
  type: "publication" | "text";
  list_items: AccordionListItem[];
};
export type FeaturingCategories = FeaturingCategoriesItem[];

const FeaturingCategories = ({ list }: { list: FeaturingCategories }) => {
  return (
    <ul className="xl:[&:has(label:hover)_label:not(:hover)]:opacity-45">
      {list.map((item: FeaturingCategoriesItem, i: number) => {
        const { name, type, list_items } = item;
        return (
          <li
            key={i}
            id="featuring-accordion"
            className="flex flex-col first:border-t border-b border-muted group"
          >
            <input type="checkbox" id={name} className="hidden" />
            <label
              htmlFor={name}
              className="w-full flex items-center justify-between text-xl md:text-2xl xl:text-3xl uppercase font-bold hover:cursor-pointer py-sm transition-all duration-300 ease-in_out"
            >
              {name}

              <div className="overflow-hidden flex">
                <span
                  id="quantity"
                  className="text-highlight transition-fading duration-300 ease-in_out group-has-[input:checked]:opacity-0"
                >
                  {list_items.length < 10
                    ? "0" + list_items.length
                    : list_items.length}
                </span>
              </div>
            </label>

            {type === "text" ? (
              <AccordionListText list_items={list_items} />
            ) : (
              <AccordionListPublication list_items={list_items} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default FeaturingCategories;
