"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Product, ProductColor, SizeGuideId } from "@/types/catalog";
import {
  getAvailableSizes,
  getColorStock,
  getProductStock,
  getStockLabel,
  getStockState,
  getVariant,
  getVariantStock,
} from "@/lib/variants";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";

type ProductVariantSelectorProps = {
  product: Product;
  colors: ProductColor[];
  sizes: string[];
  sizeGuideId: SizeGuideId;
};

export function ProductVariantSelector({
  product,
  colors,
  sizes,
  sizeGuideId,
}: ProductVariantSelectorProps) {
  const firstColorWithStock =
    colors.find((color) => getColorStock(product, color.id) > 0) ?? colors[0];
  const [selectedColorId, setSelectedColorId] = useState(
    firstColorWithStock?.id ?? "",
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { addItem, getItemQuantity, hydrated } = useCart();

  const selectedColor =
    colors.find((color) => color.id === selectedColorId) ?? colors[0];
  const selectedVariant =
    selectedColor && selectedSize
      ? getVariant(product, selectedColor.id, selectedSize)
      : undefined;
  const selectedStock = selectedVariant?.stockQuantity ?? 0;
  const productSoldOut = getProductStock(product) === 0;
  const inBagQuantity = selectedVariant
    ? getItemQuantity(selectedVariant.id)
    : 0;
  const atStockLimit = Boolean(
    selectedVariant && inBagQuantity >= selectedStock,
  );
  const addDisabled =
    !hydrated || !selectedVariant || selectedStock <= 0 || atStockLimit;
  const stockState =
    selectedSize && selectedColor
      ? getStockState(selectedStock)
      : "not-selected";

  function handleColorChange(colorId: string) {
    setSelectedColorId(colorId);
    setFeedback(null);

    if (selectedSize && getVariantStock(product, colorId, selectedSize) <= 0) {
      setSelectedSize(null);
    }
  }

  function handleSizeChange(size: string) {
    setSelectedSize(size);
    setFeedback(null);
  }

  function handleAddToBag() {
    if (addDisabled || !selectedVariant || !selectedColor) return;

    addItem(selectedVariant.id, 1, selectedStock);
    setFeedback(
      `Added ${product.name} — ${selectedColor.name} / ${selectedVariant.size} to bag.`,
    );
  }

  return (
    <div className="mt-8 border-t border-ink/15 pt-7">
      <fieldset>
        <legend className="w-full">
          <span className="flex items-baseline justify-between gap-4">
            <span className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
              Colour
            </span>
            <span className="text-[0.625rem] tracking-[0.1em] text-ink-soft uppercase">
              {selectedColor?.name ?? "None"}
            </span>
          </span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {colors.map((color) => {
            const available = getColorStock(product, color.id) > 0;
            const active = selectedColorId === color.id;

            return (
              <button
                key={color.id}
                type="button"
                onClick={() => handleColorChange(color.id)}
                aria-pressed={active}
                aria-label={`${color.name}${available ? "" : ", sold out"}`}
                disabled={!available}
                className={cn(
                  "flex h-10 items-center gap-2 border px-3 text-[0.65rem] font-semibold tracking-[0.1em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 text-ink-soft hover:border-ink hover:text-ink",
                )}
              >
                <span
                  aria-hidden="true"
                  className="block size-3 border border-current/25"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="w-full">
          <span className="flex items-baseline justify-between gap-4">
            <span className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
              Size
            </span>
            <Link
              href={`/size-guide#${sizeGuideId}`}
              className="text-[0.625rem] font-semibold tracking-[0.1em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              Size guide
            </Link>
          </span>
        </legend>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {sizes.map((size) => {
            const stock = selectedColor
              ? getVariantStock(product, selectedColor.id, size)
              : 0;
            const unavailable = stock <= 0;
            const active = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeChange(size)}
                aria-pressed={active}
                aria-label={`Size ${size}${unavailable ? ", sold out" : ""}`}
                disabled={unavailable}
                className={cn(
                  "flex h-11 items-center justify-center border text-[0.7rem] font-semibold tracking-[0.08em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none disabled:cursor-not-allowed disabled:text-ink/30",
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 text-ink hover:border-ink",
                  unavailable && "line-through",
                )}
              >
                {size === "One size" ? "OS" : size}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div
        data-testid="variant-stock-status"
        className="mt-6 flex min-h-[3rem] flex-col justify-center border-y border-ink/10 py-3"
        role="status"
        aria-live="polite"
      >
        {selectedVariant ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.04em]">
              <span
                aria-hidden="true"
                className={cn(
                  "block size-2",
                  stockState === "low" ? "bg-accent" : "bg-ink",
                )}
              />
              {getStockLabel(selectedStock)}
              <span className="text-ink-soft">— demo inventory</span>
            </p>
            <p className="text-[0.58rem] tracking-[0.12em] text-ink-soft uppercase">
              {selectedVariant.sku}
            </p>
          </div>
        ) : (
          <p className="text-[0.68rem] tracking-[0.04em] text-ink-soft">
            {selectedColor &&
            getAvailableSizes(product, selectedColor.id).length
              ? "Select a size to check availability."
              : "This colour is currently sold out in the demo inventory."}
          </p>
        )}
      </div>

      <Button
        type="button"
        onClick={handleAddToBag}
        disabled={addDisabled}
        size="lg"
        className="mt-5 w-full disabled:cursor-not-allowed"
      >
        {productSoldOut
          ? "Sold out"
          : !selectedVariant
            ? "Select a size"
            : atStockLimit
              ? "Maximum stock in bag"
              : "Add to bag"}
      </Button>

      <p className="sr-only" role="status" aria-live="polite">
        {feedback ?? ""}
      </p>

      {feedback ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border border-ink/15 px-3 py-2.5">
          <p className="text-[0.68rem] leading-relaxed text-ink-soft">
            {feedback}
            {inBagQuantity > 0 ? ` ${inBagQuantity} in bag.` : ""}
          </p>
          <Link
            href="/cart"
            className="group inline-flex shrink-0 items-center gap-1.5 text-[0.62rem] font-semibold tracking-[0.12em] text-ink uppercase underline decoration-ink/20 underline-offset-4 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            View bag
            <ArrowUpRight
              className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </div>
      ) : null}

      <p className="mt-3 flex items-start justify-between gap-3 text-[0.6rem] leading-relaxed text-ink-soft">
        <span>
          Saved on this device. Checkout and server-side totals arrive in Phase
          5.
        </span>
        <span className="shrink-0 tracking-[0.1em] uppercase">Demo bag</span>
      </p>

      <details className="group mt-8 border-t border-ink/15">
        <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[0.65rem] font-semibold tracking-[0.16em] uppercase focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none [&::-webkit-details-marker]:hidden">
          Sizing &amp; prototype note
          <span
            aria-hidden="true"
            className="text-lg leading-none text-ink-soft transition-transform group-open:rotate-45"
          >
            +
          </span>
        </summary>
        <div className="space-y-3 pb-5 text-[0.78rem] leading-relaxed text-ink-soft">
          <p>
            Measurements and materials are placeholders until the production
            sample is confirmed. Use the size guide as a demo reference only.
          </p>
          <Link
            href={`/size-guide#${sizeGuideId}`}
            className="group inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.12em] text-ink uppercase underline decoration-ink/20 underline-offset-4 hover:decoration-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Open the size guide
            <ArrowUpRight
              className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </div>
      </details>
    </div>
  );
}
