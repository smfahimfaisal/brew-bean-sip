import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
}

const key = (slug: string, size: string) => `${slug}::${size}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find(
            (i) => key(i.slug, i.size) === key(item.slug, item.size),
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                key(i.slug, i.size) === key(item.slug, item.size)
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        }),
      remove: (slug, size) =>
        set((state) => ({
          items: state.items.filter((i) => key(i.slug, i.size) !== key(slug, size)),
        })),
      setQty: (slug, size, qty) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              key(i.slug, i.size) === key(slug, size) ? { ...i, quantity: qty } : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "brew-bean-cart" },
  ),
);

export const cartCount = (items: CartItem[]) =>
  items.reduce((s, i) => s + i.quantity, 0);

export const cartTotal = (items: CartItem[]) =>
  items.reduce((s, i) => s + i.quantity * i.price, 0);
