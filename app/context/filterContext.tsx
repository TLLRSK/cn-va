"use client";
import { FilterContextValue, FilterProviderProps, TransformedCategory } from "@/types/types";
import React, { createContext, useContext, useState, useMemo } from "react";

const FilterContext = createContext<FilterContextValue<any> | undefined>(undefined);

export function FilterProvider<T extends Record<string, any>>({
  children,
  itemsType,
  allItems,
  categories,
  categoryKey = 'categories'
}: FilterProviderProps<T>) {

  const [activeCategory, setActiveCategory] = useState<TransformedCategory | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  };

  const handleCategoryChange = (id?: string | number) => {
    selectCategory(id);
  };

  const { filteredItems, categoryCounts } = useMemo(() => {
    const counts: Record<string | number, number> = {};
  
    categories.forEach(category => {
      counts[category.id] = 0;
    });

    const filtered = activeCategory 
      ? allItems.filter(item => {
          const itemCategories: TransformedCategory[] = item[categoryKey] || [];
          const hasCategory = itemCategories.some((cat: any) => 
            (typeof cat === 'object' ? cat.id : cat) === activeCategory.id
          );
          return hasCategory;
        })
      : allItems;

    allItems.forEach(item => {
      const itemCategories: TransformedCategory[] = item[categoryKey] || [];
      itemCategories.forEach((cat: any) => {
        const catId = typeof cat === 'object' ? cat.id : cat;
        if (counts[catId] !== undefined) {
          counts[catId]++;
        }
      });
    });

    return { filteredItems: filtered, categoryCounts: counts };
  }, [categories, activeCategory]);

  const selectCategory = (id: string | number | undefined) => {
    setActiveCategory(id ? categories.find(cat => cat.id === id) : undefined);
  };

  const clearCategory = () => {
    setActiveCategory(undefined);
  };

  const value: FilterContextValue<T> = {
    isOpen,
    toggleFilter,
    handleCategoryChange,
    itemsType,
    allItems,
    filteredItems,
    categories,
    activeCategory,
    categoryCounts,
    selectCategory,
    clearCategory
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilter must be used within FilterProvider");
  return ctx;
};