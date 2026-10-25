"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import {
  CART_STORAGE_KEY,
  MAX_CART_QUANTITY,
  cartReducer,
  getCartQuantity,
  getCartTotalQuantity,
  initialCartState,
  parseStoredCart,
  serializeCart,
} from "@/lib/cart";
import type { CartItem } from "@/types/cart";

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  totalQuantity: number;
  getItemQuantity: (variantId: string) => number;
  addItem: (variantId: string, quantity?: number, maxQuantity?: number) => void;
  setQuantity: (
    variantId: string,
    quantity: number,
    maxQuantity?: number,
  ) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  validVariantIds,
}: {
  children: ReactNode;
  validVariantIds: string[];
}) {
  const validVariantIdsKey = validVariantIds.join("|");
  const validIdSet = useMemo(
    () => new Set(validVariantIdsKey.split("|").filter(Boolean)),
    [validVariantIdsKey],
  );
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    let stored: string | null = null;

    try {
      stored = window.localStorage.getItem(CART_STORAGE_KEY);
    } catch {
      // Storage can be unavailable in private modes or restricted browsers.
    }

    dispatch({
      type: "hydrate",
      items: parseStoredCart(stored, validIdSet),
    });
  }, [validIdSet]);

  useEffect(() => {
    if (!state.hydrated) return;

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, serializeCart(state.items));
    } catch {
      // The in-memory cart still works when persistence is unavailable.
    }
  }, [state.hydrated, state.items]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== CART_STORAGE_KEY) return;

      dispatch({
        type: "hydrate",
        items: parseStoredCart(event.newValue, validIdSet),
      });
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [validIdSet]);

  const totalQuantity = getCartTotalQuantity(state.items);

  function addItem(
    variantId: string,
    quantity = 1,
    maxQuantity = MAX_CART_QUANTITY,
  ) {
    if (!state.hydrated || !validIdSet.has(variantId)) return;

    dispatch({ type: "add", variantId, quantity, maxQuantity });
  }

  function setQuantity(
    variantId: string,
    quantity: number,
    maxQuantity = MAX_CART_QUANTITY,
  ) {
    if (!state.hydrated || !validIdSet.has(variantId)) return;

    dispatch({ type: "setQuantity", variantId, quantity, maxQuantity });
  }

  function removeItem(variantId: string) {
    if (!state.hydrated) return;
    dispatch({ type: "remove", variantId });
  }

  function clearCart() {
    if (!state.hydrated) return;
    dispatch({ type: "clear" });
  }

  const value: CartContextValue = {
    items: state.items,
    hydrated: state.hydrated,
    totalQuantity,
    getItemQuantity: (variantId) => getCartQuantity(state.items, variantId),
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
