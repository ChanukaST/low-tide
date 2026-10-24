import { describe, expect, it } from "vitest";

import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { sizeGuides } from "@/data/size-guides";

describe("Phase 2 demo catalogue data", () => {
  it("contains the five planned demo pieces with unique slugs", () => {
    expect(products).toHaveLength(5);
    expect(new Set(products.map((product) => product.slug)).size).toBe(5);
  });

  it("keeps prices as positive integer minor units", () => {
    for (const product of products) {
      expect(Number.isSafeInteger(product.priceCents)).toBe(true);
      expect(product.priceCents).toBeGreaterThan(0);
    }
  });

  it("labels every product as demo and published", () => {
    expect(products.every((product) => product.isDemo)).toBe(true);
    expect(products.every((product) => product.isPublished)).toBe(true);
  });

  it("provides colours, sizes, variants and a size guide for each product", () => {
    const collectionSlugs = new Set(
      collections.map((collection) => collection.slug),
    );
    const sizeGuideIds = new Set(sizeGuides.map((guide) => guide.id));

    for (const product of products) {
      expect(product.colors.length).toBeGreaterThan(0);
      expect(product.sizes.length).toBeGreaterThan(0);
      expect(product.variants.length).toBeGreaterThan(0);
      expect(sizeGuideIds.has(product.sizeGuideId)).toBe(true);

      for (const slug of product.collectionSlugs) {
        expect(collectionSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("creates a unique SKU for every variant", () => {
    const skus = products.flatMap((product) =>
      product.variants.map((variant) => variant.sku),
    );

    expect(new Set(skus).size).toBe(skus.length);
  });

  it("creates variants for every colour and size combination", () => {
    for (const product of products) {
      const expectedVariantCount = product.colors.length * product.sizes.length;

      expect(product.variants).toHaveLength(expectedVariantCount);

      for (const color of product.colors) {
        for (const size of product.sizes) {
          expect(
            product.variants.some(
              (variant) =>
                variant.colorId === color.id &&
                variant.size === size &&
                variant.isActive,
            ),
          ).toBe(true);
        }
      }
    }
  });

  it("provides three labelled gallery images per product", () => {
    for (const product of products) {
      expect(product.images).toHaveLength(3);

      for (const image of product.images) {
        expect(image.alt.length).toBeGreaterThan(10);
        expect(image.label.length).toBeGreaterThan(0);
      }
    }
  });

  it("keeps the demo stock mix realistic enough to cover availability states", () => {
    const lowStockVariants = products.flatMap((product) =>
      product.variants.filter(
        (variant) => variant.stockQuantity > 0 && variant.stockQuantity <= 3,
      ),
    );
    const soldOutVariants = products.flatMap((product) =>
      product.variants.filter((variant) => variant.stockQuantity === 0),
    );

    const soldOutProducts = products.filter((product) =>
      product.variants.every((variant) => variant.stockQuantity === 0),
    );

    expect(lowStockVariants.length).toBeGreaterThan(0);
    expect(soldOutVariants.length).toBeGreaterThan(0);
    expect(soldOutProducts.length).toBeGreaterThan(0);
  });
});
