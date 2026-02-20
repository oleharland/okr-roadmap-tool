"use client";
import { create } from "zustand";
import type { Product } from "@/types";
import { mockProducts } from "@/data/mock-products";

interface ProductStore {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: mockProducts,
  getProduct: (id) => get().products.find((p) => p.id === id),
  addProduct: (product) =>
    set((s) => ({ products: [...s.products, product] })),
  updateProduct: (id, updates) =>
    set((s) => ({
      products: s.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),
  deleteProduct: (id) =>
    set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
}));
