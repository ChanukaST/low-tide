"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart/cart-provider";

export function CartBagLink() {
  const { totalQuantity } = useCart();

  return (
    <Link
      href="/cart"
      className="group flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.16em] uppercase focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
    >
      <span className="sr-only">Shopping bag: </span>
      <ShoppingBag
        className="size-[1.1rem]"
        strokeWidth={1.4}
        aria-hidden="true"
      />
      <span className="hidden transition-colors group-hover:text-accent sm:inline">
        Bag
      </span>
      <span className="text-ink-soft">({totalQuantity})</span>
    </Link>
  );
}
