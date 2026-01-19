import ProductList from "@/app/ui/shop/products/ProductsList";
import { ShopProductsProvider } from "@/app/context/shopProductsContext";
import { getProductsCategories, getProductsData } from "@/lib/actions";
import { FilterProvider } from "@/app/context/filterContext";
import ControlBar from "@/app/ui/shop/products/ControlBar";

const ShopPage = async () => {
  const products = await getProductsData();
  const categories = await getProductsCategories();

  return (
    <ShopProductsProvider
      initialProducts={products}
      initialCategories={categories}
    >
      <FilterProvider
        itemsType="products"
        allItems={products}
        categories={categories}
      >
        <section id="shop" className="pt-[33dvh]">
          <ControlBar />
          <ProductList />
        </section>
      </FilterProvider>
    </ShopProductsProvider>
  );
};

export default ShopPage;
