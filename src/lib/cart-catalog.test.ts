import { describe, expect, it } from "vitest";

import { getActiveVariantIds, getCartCatalog } from "@/lib/cart-catalog";

describe("cart catalogue", () => {
  const catalog = getCartCatalog();
  const entries = Object.values(catalog);

  it("has one presentment entry for every active variant", () => {
    const activeVariantIds = getActiveVariantIds().sort();
    const catalogIds = Object.keys(catalog).sort();

    expect(activeVariantIds.length).toBeGreaterThan(0);
    expect(catalogIds).toEqual(activeVariantIds);
    expect(new Set(catalogIds).size).toBe(catalogIds.length);
  });

  it("resolves display data from the catalogue, not cart storage", () => {
    const hoodie = entries.find(
      (entry) =>
        entry.productSlug === "core-hoodie" &&
        entry.colorId === "ink" &&
        entry.size === "M",
    );

    expect(hoodie).toMatchObject({
      productName: "Core Hoodie",
      colorName: "Ink",
      unitPriceCents: 1_190_000,
      stockQuantity: 4,
      isDemo: true,
    });
  });

  it("contains only valid presentment values", () => {
    for (const entry of entries) {
      expect(entry.variantId).toBeTruthy();
      expect(entry.productSlug).toBeTruthy();
      expect(entry.productName).toBeTruthy();
      expect(entry.colorName).toBeTruthy();
      expect(entry.size).toBeTruthy();
      expect(Number.isSafeInteger(entry.unitPriceCents)).toBe(true);
      expect(entry.unitPriceCents).toBeGreaterThan(0);
      expect(Number.isSafeInteger(entry.stockQuantity)).toBe(true);
      expect(entry.stockQuantity).toBeGreaterThanOrEqual(0);
      expect(entry.artKind).toBeTruthy();
      expect(entry.imageAlt).toBeTruthy();
    }
  });

  it("keeps the intentionally sold-out sweatshirt visible as unavailable", () => {
    const sweatshirtEntries = entries.filter(
      (entry) => entry.productSlug === "relaxed-fit-sweatshirt",
    );

    expect(sweatshirtEntries.length).toBeGreaterThan(0);
    expect(sweatshirtEntries.every((entry) => entry.stockQuantity === 0)).toBe(
      true,
    );
  });
});
