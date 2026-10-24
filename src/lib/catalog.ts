import { collections } from "@/data/collections";
import { products } from "@/data/products";
import type {
  CatalogFilters,
  CatalogSort,
  Collection,
  Product,
  ProductColor,
  SearchParamsRecord,
} from "@/types/catalog";
import { isProductInStock } from "@/lib/variants";

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
] as const satisfies ReadonlyArray<{
  value: CatalogSort;
  label: string;
}>;

const SIZE_ORDER = ["S", "M", "L", "XL", "One size"];

function isCatalogSort(value: string | undefined): value is CatalogSort {
  return sortOptions.some((option) => option.value === value);
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseCatalogFilters(
  searchParams: SearchParamsRecord,
): CatalogFilters {
  const rawSort = firstValue(searchParams.sort);
  const availability = firstValue(searchParams.availability);

  return {
    size: firstValue(searchParams.size) || undefined,
    color: firstValue(searchParams.color) || undefined,
    availability:
      availability === "in-stock" ? ("in-stock" as const) : undefined,
    sort: isCatalogSort(rawSort) ? rawSort : "featured",
  };
}

export function getPublishedProducts(): Product[] {
  return products
    .filter((product) => product.isPublished)
    .slice()
    .sort((a, b) => a.sequence - b.sequence);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(
    (product) => product.isPublished && product.slug === slug,
  );
}

export function getCollections(): Collection[] {
  return collections.slice().sort((a, b) => a.sequence - b.sequence);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductsForCollection(collectionSlug: string): Product[] {
  return getPublishedProducts().filter((product) =>
    product.collectionSlugs.includes(collectionSlug),
  );
}

export function getNewArrivals(limit = 5): Product[] {
  return getPublishedProducts().slice(0, limit);
}

export function getPrimaryCollection(product: Product): Collection | undefined {
  const slug = product.collectionSlugs[0];
  return slug ? getCollectionBySlug(slug) : undefined;
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getPublishedProducts()
    .filter(
      (candidate) =>
        candidate.slug !== product.slug &&
        candidate.collectionSlugs.some((slug) =>
          product.collectionSlugs.includes(slug),
        ),
    )
    .sort((a, b) => {
      const scoreA = a.collectionSlugs.filter((slug) =>
        product.collectionSlugs.includes(slug),
      ).length;
      const scoreB = b.collectionSlugs.filter((slug) =>
        product.collectionSlugs.includes(slug),
      ).length;

      return scoreB - scoreA || a.sequence - b.sequence;
    })
    .slice(0, limit);
}

export function getCollectionFacets(collectionProducts: Product[]): {
  sizes: string[];
  colors: ProductColor[];
} {
  const sizes = new Set<string>();
  const colors = new Map<string, ProductColor>();

  for (const product of collectionProducts) {
    for (const size of product.sizes) {
      sizes.add(size);
    }
    for (const color of product.colors) {
      colors.set(color.id, color);
    }
  }

  const orderedSizes = [...sizes].sort((a, b) => {
    const indexA = SIZE_ORDER.indexOf(a);
    const indexB = SIZE_ORDER.indexOf(b);
    return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
  });

  return {
    sizes: orderedSizes,
    colors: [...colors.values()],
  };
}

export function filterCatalogProducts(
  catalogProducts: Product[],
  filters: CatalogFilters,
): Product[] {
  return catalogProducts.filter((product) => {
    const activeVariants = product.variants.filter(
      (variant) => variant.isActive,
    );

    if (filters.size || filters.color) {
      const hasMatchingAvailableVariant = activeVariants.some(
        (variant) =>
          (!filters.size || variant.size === filters.size) &&
          (!filters.color || variant.colorId === filters.color) &&
          variant.stockQuantity > 0,
      );

      if (!hasMatchingAvailableVariant) return false;
    }

    if (filters.availability === "in-stock" && !isProductInStock(product)) {
      return false;
    }

    return true;
  });
}

export function sortCatalogProducts(
  catalogProducts: Product[],
  sort: CatalogSort,
): Product[] {
  const sorted = catalogProducts.slice();

  switch (sort) {
    case "price-asc":
      return sorted.sort(
        (a, b) => a.priceCents - b.priceCents || a.sequence - b.sequence,
      );
    case "price-desc":
      return sorted.sort(
        (a, b) => b.priceCents - a.priceCents || a.sequence - b.sequence,
      );
    case "newest":
      return sorted.sort(
        (a, b) =>
          Date.parse(b.publishedAt) - Date.parse(a.publishedAt) ||
          a.sequence - b.sequence,
      );
    case "featured":
    default:
      return sorted.sort((a, b) => a.sequence - b.sequence);
  }
}

export function searchCatalog(query: string): Product[] {
  const normalizedQuery = normalizeSearchTerm(query).slice(0, 120);
  if (!normalizedQuery) return [];

  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  return getPublishedProducts().filter((product) => {
    const collectionNames = product.collectionSlugs
      .map((slug) => getCollectionBySlug(slug)?.name ?? "")
      .join(" ");

    const haystack = normalizeSearchTerm(
      [
        product.name,
        product.subtitle,
        ...product.description,
        ...product.designNotes,
        ...product.colors.map((color) => color.name),
        ...product.sizes,
        collectionNames,
        product.artKind.replaceAll("-", " "),
        product.isDemo ? "demo" : "",
        "sri lanka colombo streetwear",
      ].join(" "),
    );

    return tokens.every((token) => haystack.includes(token));
  });
}

export function buildCollectionHref(
  collectionSlug: string,
  filters: CatalogFilters,
  overrides: Partial<CatalogFilters> = {},
): string {
  const nextFilters = { ...filters, ...overrides };
  const params = new URLSearchParams();

  if (nextFilters.size) params.set("size", nextFilters.size);
  if (nextFilters.color) params.set("color", nextFilters.color);
  if (nextFilters.availability) {
    params.set("availability", nextFilters.availability);
  }
  if (nextFilters.sort && nextFilters.sort !== "featured") {
    params.set("sort", nextFilters.sort);
  }

  const query = params.toString();
  return query
    ? `/collections/${collectionSlug}?${query}`
    : `/collections/${collectionSlug}`;
}

export function buildSearchHref(query: string): string {
  const trimmed = query.trim();
  return trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search";
}

function normalizeSearchTerm(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
