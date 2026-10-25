import type { CartItem, CartState } from "@/types/cart";

export const CART_STORAGE_KEY = "lowtide.cart.v1";
export const CART_STORAGE_VERSION = 1;
export const MAX_CART_QUANTITY = 20;

export const initialCartState: CartState = {
  items: [],
  hydrated: false,
};

export type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | {
      type: "add";
      variantId: string;
      quantity?: number;
      maxQuantity?: number;
    }
  | {
      type: "setQuantity";
      variantId: string;
      quantity: number;
      maxQuantity?: number;
    }
  | { type: "remove"; variantId: string }
  | { type: "clear" };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return {
        items: normalizeItems(action.items),
        hydrated: true,
      };

    case "add": {
      if (!state.hydrated) return state;

      const max = resolveMaxQuantity(action.maxQuantity);
      if (max <= 0) return state;

      const quantity = clampQuantity(action.quantity ?? 1, max);
      const existing = state.items.find(
        (item) => item.variantId === action.variantId,
      );

      if (!existing) {
        return {
          ...state,
          items: [...state.items, { variantId: action.variantId, quantity }],
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.variantId === action.variantId
            ? {
                ...item,
                quantity: clampQuantity(item.quantity + quantity, max),
              }
            : item,
        ),
      };
    }

    case "setQuantity": {
      if (!state.hydrated) return state;
      if (!state.items.some((item) => item.variantId === action.variantId)) {
        return state;
      }

      const max = resolveMaxQuantity(action.maxQuantity);
      if (max <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.variantId !== action.variantId,
          ),
        };
      }

      const quantity = clampQuantity(action.quantity, max);

      return {
        ...state,
        items: state.items.map((item) =>
          item.variantId === action.variantId ? { ...item, quantity } : item,
        ),
      };
    }

    case "remove":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.variantId !== action.variantId,
        ),
      };

    case "clear":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function getCartQuantity(
  items: readonly CartItem[],
  variantId: string,
): number {
  return items.find((item) => item.variantId === variantId)?.quantity ?? 0;
}

export function getCartTotalQuantity(items: readonly CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function calculateLineTotalCents(
  unitPriceCents: number,
  quantity: number,
): number {
  if (!Number.isSafeInteger(unitPriceCents) || unitPriceCents < 0) {
    throw new TypeError("Unit price must be a non-negative integer.");
  }
  if (!Number.isSafeInteger(quantity) || quantity < 0) {
    throw new TypeError("Quantity must be a non-negative integer.");
  }

  return unitPriceCents * quantity;
}

export function calculateSubtotalCents(
  lines: ReadonlyArray<{ unitPriceCents: number; quantity: number }>,
): number {
  return lines.reduce(
    (total, line) =>
      total + calculateLineTotalCents(line.unitPriceCents, line.quantity),
    0,
  );
}

/**
 * Validates untrusted localStorage data. Prices are deliberately never read
 * from storage; only variant ids and quantities are persisted.
 */
export function parseStoredCart(
  raw: string | null,
  validVariantIds?: ReadonlySet<string>,
): CartItem[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      !isRecord(parsed) ||
      parsed.version !== CART_STORAGE_VERSION ||
      !Array.isArray(parsed.items)
    ) {
      return [];
    }

    const quantities = new Map<string, number>();

    for (const candidate of parsed.items) {
      if (!isRecord(candidate)) continue;

      const variantId = candidate.variantId;
      const quantity = candidate.quantity;

      if (
        typeof variantId !== "string" ||
        variantId.length === 0 ||
        variantId.length > 200 ||
        (validVariantIds && !validVariantIds.has(variantId)) ||
        typeof quantity !== "number" ||
        !Number.isSafeInteger(quantity) ||
        quantity <= 0
      ) {
        continue;
      }

      const nextQuantity = Math.min(
        MAX_CART_QUANTITY,
        (quantities.get(variantId) ?? 0) + quantity,
      );
      quantities.set(variantId, nextQuantity);
    }

    return [...quantities].map(([variantId, quantity]) => ({
      variantId,
      quantity,
    }));
  } catch {
    return [];
  }
}

export function serializeCart(items: readonly CartItem[]): string {
  return JSON.stringify({
    version: CART_STORAGE_VERSION,
    items: items.map(({ variantId, quantity }) => ({ variantId, quantity })),
  });
}

function normalizeItems(items: readonly CartItem[]): CartItem[] {
  const quantities = new Map<string, number>();

  for (const item of items) {
    if (
      !item ||
      typeof item.variantId !== "string" ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      continue;
    }

    quantities.set(
      item.variantId,
      Math.min(
        MAX_CART_QUANTITY,
        (quantities.get(item.variantId) ?? 0) + item.quantity,
      ),
    );
  }

  return [...quantities].map(([variantId, quantity]) => ({
    variantId,
    quantity,
  }));
}

function resolveMaxQuantity(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return MAX_CART_QUANTITY;
  }

  return Math.min(MAX_CART_QUANTITY, Math.max(0, Math.floor(value)));
}

function clampQuantity(value: number, max: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(max, Math.max(1, Math.floor(value)));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
