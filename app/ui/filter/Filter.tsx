"use client";
import { useFilter } from "@/app/context/filterContext";
import Overlay from "../global/Overlay";
import ButtonClose from "../buttons/ButtonClose";
import ButtonFilterOption from "../buttons/ButtonFilterOption";

const Filter = () => {
  const {
    isOpen,
    toggleFilter,
    handleCategoryChange,
    categories,
    activeCategory,
    categoryCounts,
  } = useFilter();

  const totalItems = Object.values(categoryCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <>

      {isOpen && (
        <article
          className={`filter min-h-[50dvh] text-secondary fixed inset-[auto_0_0_0] lg:inset-[0_50%_0_0] ipad:inset-[auto_0_0_0] xl:inset-[0_66.66%_0_0] bg-background z-50 flex flex-col overflow-hidden px-sm md:px-md pb-md ${
            !isOpen ? "w-0" : ""
          }`}
        >
          <header className="ae filter-header flex items-center justify-between gap-xl md:gap-2xl relative pt-sm pb-xs mb-sm border-b border-muted">
            <h2 className="overflow-hidden flex">
              <span
                className={`ae font-semibold text-accent text-lg leading-[95%]`}
              >
                Filter
              </span>
            </h2>

            <ButtonClose onClose={toggleFilter} color="muted" />
          </header>

          <ul className="flex flex-col gap-sm">
            <ButtonFilterOption
              id={undefined}
              name="All"
              onClick={() => handleCategoryChange(undefined)}
              categoryCount={totalItems}
              activeCategoryId={activeCategory?.id}
            />

            {categories.map(({ id, name }) => {
              if (categoryCounts[id] > 0) {
                return (
                  <ButtonFilterOption
                    key={id}
                    id={id}
                    name={name}
                    onClick={() => handleCategoryChange(id)}
                    activeCategoryId={activeCategory?.id}
                    categoryCount={categoryCounts[id]}
                  />
                );
              }
            })}
          </ul>
        </article>
      )}

      {isOpen && <Overlay onClose={toggleFilter} />}
    </>
  );
};

export default Filter;
