import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { formatLKR } from "@/lib/money";
import type { Product } from "@/types/catalog";
import { getProductStock } from "@/lib/variants";
import { cn } from "@/lib/utils";
import { ProductArt } from "@/components/storefront/product-art";

type ProductCardProps = {
  product: Product;
  index: number;
  className?: string;
  headingLevel?: 2 | 3;
};

export function ProductCard({
  product,
  index,
  className,
  headingLevel = 3,
}: ProductCardProps) {
  const primaryImage = product.images[0];
  const inStock = getProductStock(product) > 0;
  const Heading = headingLevel === 2 ? "h2" : "h3";

  if (!primaryImage) return null;

  return (
    <article
      className={cn("group min-w-0", className)}
      data-testid="product-card"
      data-product-slug={product.slug}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper focus-visible:outline-none"
      >
        <span className="sr-only">View product: </span>
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]">
            <ProductArt
              artKind={product.artKind}
              background={primaryImage.background}
              foreground={primaryImage.foreground}
              name={product.name}
            />
          </div>
          <span className="absolute top-3 left-3 bg-paper/85 px-1.5 py-1 text-[0.625rem] font-semibold tracking-[0.16em] text-ink-soft uppercase backdrop-blur-sm">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute top-3 right-3 border border-ink/15 bg-paper/85 px-2 py-1 text-[0.625rem] font-semibold tracking-[0.16em] text-ink-soft uppercase backdrop-blur-sm">
            Demo
          </span>
          {!inStock ? (
            <span className="absolute inset-x-3 bottom-3 border border-ink/15 bg-paper/90 px-3 py-2 text-center text-[0.625rem] font-semibold tracking-[0.16em] text-ink uppercase backdrop-blur-sm">
              Sold out
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex items-start justify-between gap-3 border-t border-ink/20 pt-3">
          <div className="min-w-0">
            <Heading className="text-[0.85rem] leading-snug font-medium tracking-[-0.01em] sm:text-[0.9rem]">
              {product.name}
            </Heading>
            <p className="mt-1.5 text-[0.65rem] font-medium tracking-[0.12em] text-ink-soft uppercase">
              {product.sizes.join(" / ")} · {product.colors.length}{" "}
              {product.colors.length === 1 ? "colour" : "colours"}
            </p>
          </div>
          <p className="flex shrink-0 items-center gap-1.5 pt-0.5 text-[0.76rem] font-medium tracking-[0.02em]">
            {formatLKR(product.priceCents)}
            <ArrowUpRight
              className="size-3 text-ink/25 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </p>
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="sr-only">
            Colourways: {product.colors.map((color) => color.name).join(", ")}
          </span>
          {product.colors.map((color) => (
            <span
              key={color.id}
              className="block size-2.5 border border-ink/20"
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-hidden="true"
            />
          ))}
        </div>
      </Link>
    </article>
  );
}
