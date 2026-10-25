import { describe, expect, it } from "vitest";

import {
  CART_STORAGE_KEY,
  CART_STORAGE_VERSION,
  MAX_CART_QUANTITY,
  calculateLineTotalCents,
  calculateSubtotalCents,
  cartReducer,
  getCartQuantity,
  getCartTotalQuantity,
  initialCartState,
  parseStoredCart,
  serializeCart,
  type CartAction,
} from "@/lib/cart";
import type { CartState } from "@/types/cart";

function hydrated(items: CartState["items"] = []): CartState {
  return cartReducer(initialCartState, { type: "hydrate", items });
}

function apply(state: CartState, action: CartAction): CartState {
  return cartReducer(state, action);
}

describe("cart storage", () => {
  it("exports a versioned, stable storage key", () => {
    expect(CART_STORAGE_KEY).toBe("lowtide.cart.v1");
    expect(CART_STORAGE_VERSION).toBe(1);
  });

  it("ignores malformed, mismatched, or untrusted stored data", () => {
    expect(parseStoredCart(null)).toEqual([]);
    expect(parseStoredCart("not json")).toEqual([]);
    expect(parseStoredCart(JSON.stringify({ version: 2, items: [] }))).toEqual(
      [],
    );
    expect(parseStoredCart(JSON.stringify({ items: [] }))).toEqual([]);
    expect(
      parseStoredCart(
        JSON.stringify({
          version: 1,
          items: [
            { variantId: "v1", quantity: 0 },
            { variantId: "v2", quantity: -2 },
            { variantId: "v3", quantity: 2.5 },
            { variantId: "v4", quantity: "2" },
            { variantId: "v5", quantity: Number.POSITIVE_INFINITY },
            { variantId: "", quantity: 1 },
            { variantId: null, quantity: 1 },
            null,
          ],
        }),
      ),
    ).toEqual([]);
  });

  it("filters unknown variants and ignores extra fields such as price", () => {
    const raw = JSON.stringify({
      version: 1,
      items: [
        {
          variantId: "core-hoodie-ink-m",
          quantity: 2,
          priceCents: 1,
        },
        { variantId: "not-a-variant", quantity: 4 },
      ],
    });

    expect(parseStoredCart(raw, new Set(["core-hoodie-ink-m"]))).toEqual([
      { variantId: "core-hoodie-ink-m", quantity: 2 },
    ]);
  });

  it("merges duplicate variants and caps stored quantities", () => {
    const raw = JSON.stringify({
      version: 1,
      items: [
        { variantId: "v1", quantity: 2 },
        { variantId: "v1", quantity: 3 },
        { variantId: "v2", quantity: 40 },
      ],
    });

    expect(parseStoredCart(raw)).toEqual([
      { variantId: "v1", quantity: 5 },
      { variantId: "v2", quantity: MAX_CART_QUANTITY },
    ]);
  });

  it("persists only variant ids and quantities", () => {
    const serialized = serializeCart([
      { variantId: "core-hoodie-ink-m", quantity: 2 },
    ]);

    expect(JSON.parse(serialized)).toEqual({
      version: 1,
      items: [{ variantId: "core-hoodie-ink-m", quantity: 2 }],
    });
    expect(serialized).not.toContain("price");
    expect(serialized).not.toContain("total");
  });
});

describe("cart reducer", () => {
  it("stays empty until hydrated", () => {
    const next = apply(initialCartState, {
      type: "add",
      variantId: "v1",
      maxQuantity: 4,
    });

    expect(next).toBe(initialCartState);
  });

  it("adds quantities, merges duplicates, and caps at available stock", () => {
    let state = hydrated();

    state = apply(state, {
      type: "add",
      variantId: "v1",
      maxQuantity: 3,
    });
    state = apply(state, {
      type: "add",
      variantId: "v1",
      maxQuantity: 3,
    });
    state = apply(state, {
      type: "add",
      variantId: "v1",
      maxQuantity: 3,
    });
    state = apply(state, {
      type: "add",
      variantId: "v1",
      maxQuantity: 3,
    });

    expect(state.items).toEqual([{ variantId: "v1", quantity: 3 }]);
  });

  it("does not add unavailable variants", () => {
    const state = apply(hydrated(), {
      type: "add",
      variantId: "v1",
      maxQuantity: 0,
    });

    expect(state.items).toEqual([]);
  });

  it("sets quantity within stock bounds and removes at zero stock", () => {
    let state = hydrated([{ variantId: "v1", quantity: 1 }]);

    state = apply(state, {
      type: "setQuantity",
      variantId: "v1",
      quantity: 10,
      maxQuantity: 4,
    });
    expect(state.items[0]?.quantity).toBe(4);

    state = apply(state, {
      type: "setQuantity",
      variantId: "v1",
      quantity: -1,
      maxQuantity: 4,
    });
    expect(state.items[0]?.quantity).toBe(1);

    state = apply(state, {
      type: "setQuantity",
      variantId: "v1",
      quantity: 2,
      maxQuantity: 0,
    });
    expect(state.items).toEqual([]);
  });

  it("removes lines and clears the bag", () => {
    let state = hydrated([
      { variantId: "v1", quantity: 1 },
      { variantId: "v2", quantity: 2 },
    ]);

    state = apply(state, { type: "remove", variantId: "v1" });
    expect(state.items).toEqual([{ variantId: "v2", quantity: 2 }]);

    state = apply(state, { type: "clear" });
    expect(state.items).toEqual([]);
    expect(state.hydrated).toBe(true);
  });

  it("normalizes duplicates during hydration", () => {
    const state = hydrated([
      { variantId: "v1", quantity: 2 },
      { variantId: "v1", quantity: 3 },
    ]);

    expect(state.items).toEqual([{ variantId: "v1", quantity: 5 }]);
    expect(state.hydrated).toBe(true);
  });
});

describe("cart totals", () => {
  it("calculates line totals and subtotals in integer cents", () => {
    expect(calculateLineTotalCents(590_000, 2)).toBe(1_180_000);
    expect(
      calculateSubtotalCents([
        { unitPriceCents: 590_000, quantity: 2 },
        { unitPriceCents: 1_190_000, quantity: 1 },
      ]),
    ).toBe(2_370_000);
  });

  it("rejects invalid money and quantity inputs", () => {
    expect(() => calculateLineTotalCents(-1, 1)).toThrow(TypeError);
    expect(() => calculateLineTotalCents(12.5, 1)).toThrow(TypeError);
    expect(() => calculateLineTotalCents(100, -1)).toThrow(TypeError);
    expect(() => calculateLineTotalCents(100, 1.5)).toThrow(TypeError);
  });

  it("counts quantities and finds a variant quantity", () => {
    const items = [
      { variantId: "v1", quantity: 2 },
      { variantId: "v2", quantity: 3 },
    ];

    expect(getCartTotalQuantity(items)).toBe(5);
    expect(getCartQuantity(items, "v2")).toBe(3);
    expect(getCartQuantity(items, "missing")).toBe(0);
  });
});
