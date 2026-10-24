import Link from "next/link";
import type { ReactNode } from "react";
import { X } from "lucide-react";

import type { CatalogFilters, Collection, ProductColor } from "@/types/catalog";
import { buildCollectionHref, sortOptions } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type CollectionControlsProps = {
  collection: Collection;
  filters: CatalogFilters;
  sizes: string[];
  colors: ProductColor[];
};

const shortSortLabels: Record<CatalogFilters["sort"], string> = {
  featured: "Featured",
  "price-asc": "Price ↑",
  "price-desc": "Price ↓",
  newest: "Newest",
};

function FilterOption({
  href,
  active,
  children,
  label,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-label={label}
      aria-current={active ? "true" : undefined}
      className={cn(
        "inline-flex h-8 items-center gap-2 border px-2.5 text-[0.6rem] font-semibold tracking-[0.1em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none",
        active
          ? "border-ink bg-ink text-paper"
          : "border-ink/20 text-ink-soft hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

export function CollectionControls({
  collection,
  filters,
  sizes,
  colors,
}: CollectionControlsProps) {
  const activeFilters = [
    filters.size ? "size" : null,
    filters.color ? "color" : null,
    filters.availability ? "availability" : null,
  ].filter(Boolean);
  const activeColor = colors.find((color) => color.id === filters.color);
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="border-b border-ink/15 py-5">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5">
            <span className="text-[0.62rem] font-semibold tracking-[0.18em] text-ink uppercase">
              Filter
            </span>

            <div
              role="group"
              aria-labelledby="filter-size-label"
              className="flex flex-wrap items-center gap-1.5"
            >
              <span
                id="filter-size-label"
                className="mr-1 text-[0.6rem] font-medium tracking-[0.12em] text-ink-soft uppercase"
              >
                Size
              </span>
              {sizes.map((size) => {
                const active = filters.size === size;
                const href = buildCollectionHref(collection.slug, filters, {
                  size: active ? undefined : size,
                });

                return (
                  <FilterOption
                    key={size}
                    href={href}
                    active={active}
                    label={`${active ? "Clear" : "Filter by"} size ${size}`}
                  >
                    {size}
                  </FilterOption>
                );
              })}
            </div>

            <div
              role="group"
              aria-labelledby="filter-color-label"
              className="flex flex-wrap items-center gap-1.5"
            >
              <span
                id="filter-color-label"
                className="mr-1 text-[0.6rem] font-medium tracking-[0.12em] text-ink-soft uppercase"
              >
                Colour
              </span>
              {colors.map((color) => {
                const active = filters.color === color.id;
                const href = buildCollectionHref(collection.slug, filters, {
                  color: active ? undefined : color.id,
                });

                return (
                  <FilterOption
                    key={color.id}
                    href={href}
                    active={active}
                    label={`${active ? "Clear" : "Filter by"} colour ${color.name}`}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "block size-2.5 border",
                        active ? "border-paper/40" : "border-ink/20",
                      )}
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </FilterOption>
                );
              })}
            </div>

            <div
              role="group"
              aria-labelledby="filter-availability-label"
              className="flex flex-wrap items-center gap-1.5"
            >
              <span
                id="filter-availability-label"
                className="mr-1 text-[0.6rem] font-medium tracking-[0.12em] text-ink-soft uppercase"
              >
                Availability
              </span>
              <FilterOption
                href={buildCollectionHref(collection.slug, filters, {
                  availability:
                    filters.availability === "in-stock"
                      ? undefined
                      : "in-stock",
                })}
                active={filters.availability === "in-stock"}
                label={
                  filters.availability === "in-stock"
                    ? "In stock, clear filter"
                    : "In stock, filter to available pieces"
                }
              >
                In stock
              </FilterOption>
            </div>
          </div>

          {hasActiveFilters ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[0.6rem] font-medium tracking-[0.1em] text-ink-soft uppercase">
                Active
              </span>
              {filters.size ? (
                <Link
                  href={buildCollectionHref(collection.slug, filters, {
                    size: undefined,
                  })}
                  scroll={false}
                  aria-label={`Size: ${filters.size}, remove filter`}
                  className="inline-flex h-7 items-center gap-1.5 border border-ink bg-ink px-2 text-[0.58rem] font-semibold tracking-[0.08em] text-paper uppercase transition-colors hover:border-accent hover:bg-accent hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
                >
                  Size: {filters.size}
                  <X className="size-3" strokeWidth={1.8} aria-hidden="true" />
                </Link>
              ) : null}
              {filters.color ? (
                <Link
                  href={buildCollectionHref(collection.slug, filters, {
                    color: undefined,
                  })}
                  scroll={false}
                  aria-label={`Colour: ${activeColor?.name ?? filters.color}, remove filter`}
                  className="inline-flex h-7 items-center gap-1.5 border border-ink bg-ink px-2 text-[0.58rem] font-semibold tracking-[0.08em] text-paper uppercase transition-colors hover:border-accent hover:bg-accent hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
                >
                  Colour: {activeColor?.name ?? filters.color}
                  <X className="size-3" strokeWidth={1.8} aria-hidden="true" />
                </Link>
              ) : null}
              {filters.availability === "in-stock" ? (
                <Link
                  href={buildCollectionHref(collection.slug, filters, {
                    availability: undefined,
                  })}
                  scroll={false}
                  aria-label="In stock, remove filter"
                  className="inline-flex h-7 items-center gap-1.5 border border-ink bg-ink px-2 text-[0.58rem] font-semibold tracking-[0.08em] text-paper uppercase transition-colors hover:border-accent hover:bg-accent hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
                >
                  In stock
                  <X className="size-3" strokeWidth={1.8} aria-hidden="true" />
                </Link>
              ) : null}
              <Link
                href={buildCollectionHref(collection.slug, filters, {
                  size: undefined,
                  color: undefined,
                  availability: undefined,
                })}
                scroll={false}
                className="ml-1 text-[0.58rem] font-medium tracking-[0.08em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              >
                Clear all
              </Link>
            </div>
          ) : null}
        </div>

        <div
          role="group"
          aria-label="Sort products"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 xl:justify-end"
        >
          <span className="text-[0.62rem] font-semibold tracking-[0.18em] text-ink uppercase">
            Sort
          </span>
          {sortOptions.map((option) => {
            const active = filters.sort === option.value;

            return (
              <Link
                key={option.value}
                href={buildCollectionHref(collection.slug, filters, {
                  sort: option.value,
                })}
                scroll={false}
                aria-label={`${shortSortLabels[option.value]}, sort by ${option.label.toLowerCase()}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "border-b pb-0.5 text-[0.6rem] font-medium tracking-[0.1em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
                  active
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-soft hover:border-ink/20 hover:text-ink",
                )}
              >
                {shortSortLabels[option.value]}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
