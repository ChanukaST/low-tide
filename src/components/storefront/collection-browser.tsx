import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type {
  CatalogFilters,
  Collection,
  Product,
  SearchParamsRecord,
} from "@/types/catalog";
import {
  filterCatalogProducts,
  getCollectionFacets,
  parseCatalogFilters,
  sortCatalogProducts,
} from "@/lib/catalog";
import { CollectionControls } from "@/components/storefront/collection-controls";
import { ProductGrid } from "@/components/storefront/product-grid";

type CollectionBrowserProps = {
  collection: Collection;
  products: Product[];
  searchParams: Promise<SearchParamsRecord>;
};

export async function CollectionBrowser({
  collection,
  products,
  searchParams,
}: CollectionBrowserProps) {
  const parsedFilters = parseCatalogFilters(await searchParams);
  const facets = getCollectionFacets(products);

  const validFilters: CatalogFilters = {
    ...parsedFilters,
    size:
      parsedFilters.size && facets.sizes.includes(parsedFilters.size)
        ? parsedFilters.size
        : undefined,
    color:
      parsedFilters.color &&
      facets.colors.some((color) => color.id === parsedFilters.color)
        ? parsedFilters.color
        : undefined,
  };

  const filteredProducts = filterCatalogProducts(products, validFilters);
  const sortedProducts = sortCatalogProducts(
    filteredProducts,
    validFilters.sort,
  );

  return (
    <div className="pb-20 lg:pb-28">
      <CollectionControls
        collection={collection}
        filters={validFilters}
        sizes={facets.sizes}
        colors={facets.colors}
      />

      <div className="flex flex-col gap-4 pt-6 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          aria-live="polite"
          className="text-[0.62rem] font-semibold tracking-[0.14em] text-ink-soft uppercase"
        >
          Showing {String(sortedProducts.length).padStart(2, "0")} of{" "}
          {String(products.length).padStart(2, "0")} demo pieces
        </p>
        <Link
          href="/size-guide"
          className="group inline-flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.12em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          Size guide
          <ArrowUpRight
            className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>

      {sortedProducts.length ? (
        <ProductGrid
          products={sortedProducts}
          headingLevel={2}
          className={products.length > 4 ? "xl:grid-cols-5" : undefined}
        />
      ) : (
        <div className="border border-ink/15 px-6 py-16 text-center sm:py-24">
          <p className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.9] tracking-[-0.03em] uppercase">
            No pieces
            <span className="text-accent">.</span>
          </p>
          <p className="mx-auto mt-4 max-w-md text-[0.9rem] leading-relaxed text-ink-soft">
            Nothing in this demo collection matches those filters. Clear the
            selection to see the full study.
          </p>
          <Link
            href={`/collections/${collection.slug}`}
            scroll={false}
            className="mt-7 inline-flex h-11 items-center justify-center border border-ink bg-ink px-5 text-[0.62rem] font-semibold tracking-[0.16em] text-paper uppercase transition-colors hover:border-accent hover:bg-accent hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper focus-visible:outline-none"
          >
            Clear all filters
          </Link>
        </div>
      )}
    </div>
  );
}
