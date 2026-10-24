import { formatLKR } from "@/lib/money";
import type { DemoProduct } from "@/types/product";
import { cn } from "@/lib/utils";
import { ProductArt } from "@/components/storefront/product-art";

type ProductCardProps = {
  product: DemoProduct;
  index: number;
  className?: string;
};

export function ProductCard({ product, index, className }: ProductCardProps) {
  return (
    <article
      className={cn("group min-w-0", className)}
      data-testid="product-card"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]">
          <ProductArt
            artKind={product.artKind}
            background={product.artBackground}
            foreground={product.artForeground}
            name={product.name}
          />
        </div>
        <span className="absolute top-3 left-3 bg-paper/85 px-1.5 py-1 text-[0.625rem] font-semibold tracking-[0.16em] text-ink-soft uppercase backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute top-3 right-3 border border-ink/15 bg-paper/85 px-2 py-1 text-[0.625rem] font-semibold tracking-[0.16em] text-ink-soft uppercase backdrop-blur-sm">
          Demo
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 border-t border-ink/20 pt-3">
        <div className="min-w-0">
          <h3 className="text-[0.85rem] leading-snug font-medium tracking-[-0.01em] sm:text-[0.9rem]">
            {product.name}
          </h3>
          <p className="mt-1.5 text-[0.65rem] font-medium tracking-[0.12em] text-ink-soft uppercase">
            {product.sizes.join(" / ")} · {product.colors.length}{" "}
            {product.colors.length === 1 ? "colour" : "colours"}
          </p>
        </div>
        <p className="shrink-0 pt-0.5 text-[0.76rem] font-medium tracking-[0.02em]">
          {formatLKR(product.priceCents)}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <span className="sr-only">
          Colourways: {product.colors.map((color) => color.name).join(", ")}
        </span>
        {product.colors.map((color) => (
          <span
            key={color.name}
            className="block size-2.5 border border-ink/20"
            style={{ backgroundColor: color.hex }}
            title={color.name}
            aria-hidden="true"
          />
        ))}
      </div>
    </article>
  );
}
