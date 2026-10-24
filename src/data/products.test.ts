import { describe, expect, it } from "vitest";

import { demoProducts } from "@/data/products";

describe("Phase 1 demo catalogue", () => {
  it("contains the five planned demo pieces", () => {
    expect(demoProducts).toHaveLength(5);
    expect(new Set(demoProducts.map((product) => product.slug)).size).toBe(5);
  });

  it("keeps prices as positive integer minor units", () => {
    for (const product of demoProducts) {
      expect(Number.isSafeInteger(product.priceCents)).toBe(true);
      expect(product.priceCents).toBeGreaterThan(0);
    }
  });

  it("labels every product as demo data", () => {
    expect(demoProducts.every((product) => product.isDemo)).toBe(true);
  });

  it("provides at least one colour and size for each product", () => {
    for (const product of demoProducts) {
      expect(product.colors.length).toBeGreaterThan(0);
      expect(product.sizes.length).toBeGreaterThan(0);
    }
  });
});
