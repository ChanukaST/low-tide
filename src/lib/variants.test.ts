import { describe, expect, it } from "vitest";

import { products } from "@/data/products";
import {
  getAvailableSizes,
  getColorStock,
  getProductStock,
  getStockLabel,
  getStockState,
  getVariant,
  getVariantStock,
  isColorAvailable,
} from "@/lib/variants";

const hoodie = products.find((product) => product.slug === "core-hoodie");
const sweatshirt = products.find(
  (product) => product.slug === "relaxed-fit-sweatshirt",
);

describe("variant stock helpers", () => {
  it("finds a specific variant and its stock", () => {
    expect(hoodie).toBeDefined();
    if (!hoodie) return;

    const variant = getVariant(hoodie, "ink", "S");

    expect(variant?.sku).toBe("LT-HOO-COR-INK-S");
    expect(getVariantStock(hoodie, "ink", "S")).toBe(1);
    expect(getVariantStock(hoodie, "stone", "S")).toBe(0);
  });

  it("sums stock by colour and by product", () => {
    expect(hoodie).toBeDefined();
    if (!hoodie) return;

    expect(getColorStock(hoodie, "ink")).toBe(10);
    expect(getColorStock(hoodie, "stone")).toBe(2);
    expect(getProductStock(hoodie)).toBe(12);
    expect(isColorAvailable(hoodie, "stone")).toBe(true);
  });

  it("reports a fully sold-out demo product", () => {
    expect(sweatshirt).toBeDefined();
    if (!sweatshirt) return;

    expect(getProductStock(sweatshirt)).toBe(0);
    expect(isColorAvailable(sweatshirt, "undyed")).toBe(false);
    expect(getAvailableSizes(sweatshirt, "undyed")).toEqual([]);
  });

  it("classifies availability labels", () => {
    expect(getStockState(0)).toBe("sold-out");
    expect(getStockState(2)).toBe("low");
    expect(getStockState(8)).toBe("available");
    expect(getStockLabel(0)).toBe("Sold out");
    expect(getStockLabel(1)).toBe("Only 1 left");
    expect(getStockLabel(8)).toBe("In stock");
  });
});
