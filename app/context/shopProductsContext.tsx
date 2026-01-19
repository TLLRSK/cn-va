"use client";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";
import {
  isNormalizedCategory,
  IShopProductsContext,
  TransformedCategory,
  ProductData,
} from "@/types/types";

const ShopProductsContext = createContext<IShopProductsContext | undefined>(
  undefined
);

export const ShopProductsProvider = ({
  children,
  initialProducts,
  initialCategories,
}: {
  children: ReactNode;
  initialProducts: ProductData[];
  initialCategories: TransformedCategory[];
}) => {
  const allProducts = useMemo(() => initialProducts, [initialProducts]);
  const categories = useMemo(() => initialCategories, [initialCategories]);
  const [activeCategory, setActiveCategory] = useState<
    TransformedCategory | undefined
  >(undefined);

  const categoryCounts = useMemo(() => {
    const counts: Record<number, number> = {};

    allProducts.forEach((product) => {
      product.categories?.forEach((category) => {
        const categoryId = isNormalizedCategory(category)
          ? category.id
          : category;
        counts[categoryId] = (counts[categoryId] || 0) + 1;
      });
    });

    initialCategories.forEach((category) => {
      counts[category.id] = counts[category.id] || 0;
    });

    return counts;
  }, [allProducts, initialCategories]);

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return allProducts;

    return allProducts.filter((product) => {
      if (!product.categories) return false;
      return product.categories.some((category) => {
        const categoryId = isNormalizedCategory(category)
          ? category.id
          : category;
        return categoryId === activeCategory.id;
      });
    });
  }, [allProducts, activeCategory]);

  const selectCategory = (id: number) => {
    const selectedCategory = categories.find((cat) => cat.id === id);
    setActiveCategory((prev) =>
      prev === selectedCategory ? undefined : selectedCategory
    );
  };

  const clearCategory = () => {
    setActiveCategory(undefined);
  };

  const value = useMemo(
    () => ({
      allProducts,
      filteredProducts,
      categories,
      activeCategory,
      categoryCounts,
      selectCategory,
      clearCategory,
    }),
    [allProducts, filteredProducts, categories, activeCategory, categoryCounts]
  );

  return (
    <ShopProductsContext.Provider value={value}>
      {children}
    </ShopProductsContext.Provider>
  );
};

export const useShopProducts = () => {
  const ctx = useContext(ShopProductsContext);
  if (!ctx) throw new Error("useProjects must be used within ProductsProvider");
  return ctx;
};
