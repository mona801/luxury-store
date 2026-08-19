"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "./data";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, color?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  coupon: string;
  setCoupon: (code: string) => void;
  discount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");

  const addItem = useCallback(
    (product: Product, quantity = 1, color?: string) => {
      setItems((prev) => {
        const existing = prev.find(
          (item) => item.product.id === product.id && item.selectedColor === (color ?? product.colors[0]?.value)
        );
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id && item.selectedColor === (color ?? product.colors[0]?.value)
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [
          ...prev,
          { product, quantity, selectedColor: color ?? product.colors[0]?.value ?? "" },
        ];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = coupon === "WELCOME10" ? Math.round(subtotal * 0.1) : 0;

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        itemCount,
        coupon,
        setCoupon,
        discount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
