import type { Product } from "@/types/catalog";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/storefront/product-card";

export function ProductGrid({
  products,
  className,
  headingLevel = 3,
}: {
  products: Product[];
  className?: string;
  headingLevel?: 2 | 3;
}) {
  if (!products.length) return null;

  return (
    <div
      data-testid="product-grid"
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5",
        className,
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
}
