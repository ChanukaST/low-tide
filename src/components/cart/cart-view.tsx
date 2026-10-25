"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus } from "lucide-react";

import type { CartCatalog, CartCatalogEntry } from "@/types/cart";
import { calculateLineTotalCents, calculateSubtotalCents } from "@/lib/cart";
import { formatLKR } from "@/lib/money";
import { useCart } from "@/components/cart/cart-provider";
import { ProductArt } from "@/components/storefront/product-art";
import { Button } from "@/components/ui/button";

type CartLine = {
  entry: CartCatalogEntry;
  quantity: number;
};

export function CartView({ catalog }: { catalog: CartCatalog }) {
  const { items, hydrated, setQuantity, removeItem } = useCart();
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const lines: CartLine[] = items.flatMap((item) => {
    const entry = catalog[item.variantId];
    return entry ? [{ entry, quantity: item.quantity }] : [];
  });
  const subtotalCents = calculateSubtotalCents(
    lines.map((line) => ({
      unitPriceCents: line.entry.unitPriceCents,
      quantity: line.quantity,
    })),
  );
  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);

  if (!hydrated) {
    return <CartSkeleton />;
  }

  if (!lines.length) {
    return (
      <div
        data-testid="cart-empty"
        className="border border-ink/15 px-6 py-20 text-center sm:py-24"
      >
        <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-ink-soft uppercase">
          Bag / 00
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.7rem,6vw,5rem)] leading-[0.86] tracking-[-0.03em] uppercase">
          Nothing here yet
          <span className="text-accent">.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[0.95rem] leading-[1.7] text-ink-soft">
          The bag is empty. Start with the first study, or search the demo
          catalogue for a piece.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/collections/first-studies">
              Explore the first study
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          </Button>
          <Link
            href="/search"
            className="inline-flex h-11 items-center justify-center px-4 text-[0.62rem] font-semibold tracking-[0.14em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Search the catalogue
          </Link>
        </div>
        <p className="mt-10 text-[0.6rem] leading-relaxed text-ink-soft">
          The bag is stored on this device only. No payment or order is created.
        </p>
      </div>
    );
  }

  function changeQuantity(line: CartLine, nextQuantity: number) {
    if (nextQuantity < 1 || nextQuantity > line.entry.stockQuantity) {
      return;
    }

    setQuantity(line.entry.variantId, nextQuantity, line.entry.stockQuantity);
    setAnnouncement(
      `Quantity updated to ${nextQuantity} for ${line.entry.productName}, ${line.entry.colorName}, ${line.entry.size}.`,
    );
  }

  function handleRemove(line: CartLine) {
    removeItem(line.entry.variantId);
    setAnnouncement(
      `Removed ${line.entry.productName}, ${line.entry.colorName}, ${line.entry.size} from the bag.`,
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
      <p className="sr-only" role="status" aria-live="polite">
        {announcement ?? ""}
      </p>

      <div className="min-w-0 lg:col-span-7">
        <div className="flex flex-col gap-2 border-b border-ink/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-ink-soft uppercase">
              Selection
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[0.9] tracking-[-0.03em] uppercase">
              In your bag<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">
            {String(itemCount).padStart(2, "0")}{" "}
            {itemCount === 1 ? "item" : "items"}
          </p>
        </div>

        <ul>
          {lines.map((line) => {
            const lineTotalCents = calculateLineTotalCents(
              line.entry.unitPriceCents,
              line.quantity,
            );
            const atStockLimit = line.quantity >= line.entry.stockQuantity;

            return (
              <li
                key={line.entry.variantId}
                data-testid="cart-line"
                className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-4 border-b border-ink/15 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6"
              >
                <Link
                  href={`/products/${line.entry.productSlug}`}
                  className="block self-start overflow-hidden border border-ink/10 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
                >
                  <div className="aspect-[4/5]">
                    <ProductArt
                      artKind={line.entry.artKind}
                      background={line.entry.background}
                      foreground={line.entry.foreground}
                      name={line.entry.imageAlt}
                    />
                  </div>
                </Link>

                <div className="min-w-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="text-[0.95rem] leading-snug font-medium tracking-[-0.01em]">
                        <Link
                          href={`/products/${line.entry.productSlug}`}
                          className="transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                        >
                          {line.entry.productName}
                        </Link>
                      </h3>
                      <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[0.62rem] font-medium tracking-[0.1em] text-ink-soft uppercase">
                        <span
                          aria-hidden="true"
                          className="block size-2.5 border border-ink/20"
                          style={{ backgroundColor: line.entry.colorHex }}
                        />
                        {line.entry.colorName} / {line.entry.size}
                      </p>
                      <p className="mt-1.5 text-[0.65rem] text-ink-soft">
                        {formatLKR(line.entry.unitPriceCents)} each · demo
                      </p>
                    </div>
                    <p
                      className="shrink-0 text-[0.82rem] font-medium tabular-nums"
                      data-testid="cart-line-total"
                    >
                      {formatLKR(lineTotalCents)}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-[0.6rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">
                        Quantity
                      </p>
                      <div className="mt-2 inline-flex items-center border border-ink/20">
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(line, line.quantity - 1)
                          }
                          disabled={line.quantity <= 1}
                          aria-label={`Decrease quantity for ${line.entry.productName}, ${line.entry.colorName}, ${line.entry.size}`}
                          className="flex size-9 items-center justify-center transition-colors hover:bg-ink hover:text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Minus
                            className="size-3.5"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </button>
                        <span
                          className="flex min-w-10 justify-center text-[0.72rem] font-semibold tabular-nums"
                          data-testid="cart-quantity"
                          data-quantity={line.quantity}
                        >
                          <span className="sr-only">Quantity: </span>
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(line, line.quantity + 1)
                          }
                          disabled={atStockLimit}
                          aria-label={`Increase quantity for ${line.entry.productName}, ${line.entry.colorName}, ${line.entry.size}`}
                          className="flex size-9 items-center justify-center transition-colors hover:bg-ink hover:text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <Plus
                            className="size-3.5"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(line)}
                      aria-label={`Remove ${line.entry.productName}, ${line.entry.colorName}, ${line.entry.size} from bag`}
                      className="inline-flex min-h-9 items-center text-[0.62rem] font-semibold tracking-[0.12em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                    >
                      Remove
                    </button>
                  </div>

                  {line.entry.stockQuantity <= 3 ? (
                    <p className="mt-3 text-[0.6rem] tracking-[0.05em] text-ink-soft">
                      Only {line.entry.stockQuantity} left in demo stock.
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        <Link
          href="/collections/first-studies"
          className="group mt-7 inline-flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.14em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          Continue shopping
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>

      <aside className="min-w-0 lg:col-span-5">
        <div className="border border-ink bg-ink p-6 text-paper lg:sticky lg:top-28 lg:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-paper/15 pb-5">
            <div>
              <p className="text-[0.6rem] font-semibold tracking-[0.16em] text-accent uppercase">
                Checkout
              </p>
              <h2 className="mt-2 font-display text-[2.2rem] leading-none tracking-[-0.02em] uppercase">
                Summary<span className="text-accent">.</span>
              </h2>
            </div>
            <span className="text-[0.6rem] font-semibold tracking-[0.12em] text-paper-soft uppercase">
              {String(itemCount).padStart(2, "0")}{" "}
              {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          <dl className="mt-6 space-y-4 text-[0.82rem]">
            <div className="flex items-center justify-between gap-6">
              <dt className="text-paper-soft">Subtotal</dt>
              <dd
                className="font-medium tabular-nums"
                data-testid="cart-subtotal"
              >
                {formatLKR(subtotalCents)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-6">
              <dt className="text-paper-soft">Delivery</dt>
              <dd className="text-paper-soft">Calculated in Phase 5</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-end justify-between gap-6 border-t border-paper/15 pt-5">
            <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-paper-soft uppercase">
              Estimated total
            </p>
            <p
              className="text-[1.35rem] font-medium tabular-nums"
              data-testid="cart-total"
            >
              {formatLKR(subtotalCents)}
            </p>
          </div>

          <Button asChild variant="inverse" size="lg" className="mt-7 w-full">
            <Link href="/checkout">
              Proceed to checkout
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          </Button>
          <p className="mt-4 text-[0.6rem] leading-relaxed text-paper-soft">
            Checkout opens in Phase 5. No order will be placed and no payment
            will be taken.
          </p>
          <p className="mt-3 border-t border-paper/15 pt-4 text-[0.58rem] leading-relaxed text-paper-soft">
            Demo totals are calculated for presentation only. Price, stock and
            delivery validation will happen on the server before order creation.
          </p>
        </div>
      </aside>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div aria-busy="true" className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="min-w-0 space-y-6 lg:col-span-7">
        <div className="h-9 w-48 animate-pulse bg-ink/[0.06] motion-reduce:animate-none" />
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[5.25rem_1fr] gap-4 border-b border-ink/10 py-6"
          >
            <div className="aspect-[4/5] animate-pulse bg-ink/[0.06] motion-reduce:animate-none" />
            <div className="space-y-3">
              <div className="h-4 w-2/3 animate-pulse bg-ink/[0.06] motion-reduce:animate-none" />
              <div className="h-3 w-1/3 animate-pulse bg-ink/[0.06] motion-reduce:animate-none" />
              <div className="mt-8 h-9 w-28 animate-pulse bg-ink/[0.06] motion-reduce:animate-none" />
            </div>
          </div>
        ))}
      </div>
      <div className="h-80 animate-pulse bg-ink/[0.06] motion-reduce:animate-none lg:col-span-5" />
      <p className="sr-only" role="status">
        Loading your bag.
      </p>
    </div>
  );
}
