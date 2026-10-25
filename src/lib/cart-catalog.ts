import { products } from "@/data/products";
import type { CartCatalog, CartCatalogEntry } from "@/types/cart";

/**
 * Server-side presentment data for the local demo cart. Only ids and
 * quantities are persisted in the browser; prices and stock always come from
 * this catalogue data. Phase 5 will replace this source with authoritative
 * server-side database reads before accepting any order.
 */
export function getCartCatalog(): CartCatalog {
  const catalog: CartCatalog = {};

  for (const product of products) {
    if (!product.isPublished) continue;

    const image = product.images[0];
    if (!image) continue;

    for (const variant of product.variants) {
      if (!variant.isActive) continue;

      const color = product.colors.find(
        (candidate) => candidate.id === variant.colorId,
      );
      if (!color) continue;

      const entry: CartCatalogEntry = {
        variantId: variant.id,
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        colorId: color.id,
        colorName: color.name,
        colorHex: color.hex,
        size: variant.size,
        unitPriceCents: product.priceCents,
        stockQuantity: variant.stockQuantity,
        artKind: product.artKind,
        background: image.background,
        foreground: image.foreground,
        imageAlt: image.alt,
        isDemo: product.isDemo,
      };

      catalog[variant.id] = entry;
    }
  }

  return catalog;
}

export function getActiveVariantIds(): string[] {
  return products.flatMap((product) =>
    product.isPublished
      ? product.variants
          .filter((variant) => variant.isActive)
          .map((variant) => variant.id)
      : [],
  );
}
