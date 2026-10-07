import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ProductVariant } from "@/features/catalog/types/product.types";

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const FREE_SHIPPING_THRESHOLD = 150000; // $150.000 COP envío gratis nacional

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.variant.id === variant.id
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const currentItem = updated[existingIndex];
            const newQty = Math.min(
              currentItem.quantity + quantity,
              variant.stock
            );
            updated[existingIndex] = {
              ...currentItem,
              quantity: newQty,
            };
            return { items: updated, isOpen: true };
          }

          return {
            items: [
              ...state.items,
              { product, variant, quantity: Math.min(quantity, variant.stock) },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variant.id !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.variant.id === variantId) {
              return {
                ...item,
                quantity: Math.min(quantity, item.variant.stock),
              };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "vitalfit_cart_storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
