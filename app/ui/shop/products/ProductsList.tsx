"use client";
import ProductCard from "./ProductCard";
import { useFilter } from "@/app/context/filterContext";

const ProductList = () => {
  const { filteredItems } = useFilter();

  return (
    <>
      <ul className="grid md:grid-cols-2 px-sm md:px-md gap-sm md:gap-md lg:gap-y-lg">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
};

export default ProductList;
