import type { GarmentArtKind } from "@/types/catalog";

export type CartItem = {
  variantId: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

export type CartCatalogEntry = {
  variantId: string;
  productId: string;
  productSlug: string;
  productName: string;
  colorId: string;
  colorName: string;
  colorHex: string;
  size: string;
  unitPriceCents: number;
  stockQuantity: number;
  artKind: GarmentArtKind;
  background: string;
  foreground: string;
  imageAlt: string;
  isDemo: boolean;
};

export type CartCatalog = Record<string, CartCatalogEntry>;
