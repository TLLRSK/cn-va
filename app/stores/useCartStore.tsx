import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartState } from "@/types/types";

const useCartStore = create<CartState>()(
  persist(
    (set, get) => {
      const store: CartState = {
        isOpen: false,
        isClosing: false,
        isLoading: false,
        products: [],
        productsCount: 0,
        subtotal: 0,
        displayStatus: "closed",

        toggleCart: () => {
          if (!get().isOpen) {
            set({ isOpen: true });
          } else {
            set({ isOpen: false });
          }
        },
        openCart: () => set({ isOpen: true, isClosing: false }),
        closeCart: () => {
          set({ isClosing: true });
          setTimeout(() => set({ isOpen: false }), 600);
        },
        addProduct: (product, quantity) => {
          if (quantity <= 0) return;
          set((state) => {
            const existing = state.products.find((p) => p.id === product.id);
            const stock =
              typeof product.stock_quantity === "number"
                ? product.stock_quantity
                : Infinity;

            let newProducts;
            if (existing) {
              const desired = (existing.quantity ?? 0) + quantity;
              const capped = Math.min(desired, stock);
              newProducts = state.products.map((p) =>
                p.id === product.id ? { ...p, quantity: capped } : p
              );
            } else {
              const capped = Math.min(quantity, stock);
              newProducts = [
                ...state.products,
                { ...product, quantity: capped },
              ];
            }

            const productsCount = newProducts.reduce(
              (sum, p) => sum + (p.quantity ?? 0),
              0
            );

            return { products: newProducts, productsCount };
          });
        },

        removeProduct: (productId) =>
          set((state) => {
            const newProducts = state.products.filter(
              (p) => p.id !== productId
            );
            return {
              products: newProducts,
              productsCount: newProducts.reduce(
                (sum, p) => sum + (p.quantity ?? 0),
                0
              ),
            };
          }),

        updateProductAmount: (productId, quantity) =>
          set((state) => {
            const newProducts = state.products
              .map((p) => (p.id === productId ? { ...p, quantity } : p))
              .filter((p) => (p.quantity ?? 0) > 0);

            const productsCount = newProducts.reduce(
              (sum, p) => sum + (p.quantity ?? 0),
              0
            );

            return { products: newProducts, productsCount };
          }),

        clearCart: () => set({ products: [], productsCount: 0, subtotal: 0 }),

        getSubtotal: () => {
          const { products } = get();
          return products.reduce((total, p) => {
            const price =
              typeof p.price === "number"
                ? p.price
                : parseFloat(p.price || "0");
            const quantity = p.quantity ?? 0;
            return total + price * quantity;
          }, 0);
        },

        sendToCheckout: async () => {
          const { products } = get();
          if (!products || products.length === 0) return;
          set({ isLoading: true });

          const items = products.map((p: any) => ({
            id: p.id,
            quantity: p.quantity ?? 1,
            variation_id: p.variation_id ?? 0,
            variation: p.variation ?? undefined,
          }));

          const res = await fetch("/api/sign-cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items }),
          });

          const data = await res.json();

          if (!res.ok || !data.url) {
            alert("Error creando checkout: " + (data.error || "unknown"));
            return;
          }
          
          window.location.href = data.url;
        },
      };
      return store;
    },
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        products: state.products,
        productsCount: state.productsCount,
        subtotal: state.subtotal,
      }),
    }
  )
);

export default useCartStore;
