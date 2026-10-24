import type { Product, ProductVariant } from "@/types/catalog";

export type StockState = "available" | "low" | "sold-out";

export const LOW_STOCK_THRESHOLD = 3;

export function getActiveVariants(product: Product): ProductVariant[] {
  return product.variants.filter((variant) => variant.isActive);
}

export function getVariant(
  product: Product,
  colorId: string,
  size: string,
): ProductVariant | undefined {
  return product.variants.find(
    (variant) =>
      variant.isActive && variant.colorId === colorId && variant.size === size,
  );
}

export function getVariantStock(
  product: Product,
  colorId: string,
  size: string,
): number {
  return getVariant(product, colorId, size)?.stockQuantity ?? 0;
}

export function getColorStock(product: Product, colorId: string): number {
  return getActiveVariants(product)
    .filter((variant) => variant.colorId === colorId)
    .reduce((total, variant) => total + variant.stockQuantity, 0);
}

export function getProductStock(product: Product): number {
  return getActiveVariants(product).reduce(
    (total, variant) => total + variant.stockQuantity,
    0,
  );
}

export function isProductInStock(product: Product): boolean {
  return getProductStock(product) > 0;
}

export function getStockState(stockQuantity: number): StockState {
  if (stockQuantity <= 0) return "sold-out";
  if (stockQuantity <= LOW_STOCK_THRESHOLD) return "low";
  return "available";
}

export function getStockLabel(stockQuantity: number): string {
  if (stockQuantity <= 0) return "Sold out";
  if (stockQuantity <= LOW_STOCK_THRESHOLD) {
    return `Only ${stockQuantity} left`;
  }
  return "In stock";
}

export function getAvailableSizes(product: Product, colorId: string): string[] {
  return product.sizes.filter(
    (size) => getVariantStock(product, colorId, size) > 0,
  );
}

export function isColorAvailable(product: Product, colorId: string): boolean {
  return getColorStock(product, colorId) > 0;
}
