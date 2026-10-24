export type GarmentArtKind =
  "oversized-tee" | "graphic-tee" | "hoodie" | "sweatshirt" | "cap";

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  colorId: string;
  size: string;
  stockQuantity: number;
  isActive: boolean;
};

export type ProductImageKind = "full" | "detail" | "colour";

export type ProductImage = {
  id: string;
  label: string;
  alt: string;
  kind: ProductImageKind;
  background: string;
  foreground: string;
  zoom?: number;
  focusX?: number;
  focusY?: number;
};

export type SizeGuideId = "tees" | "fleece" | "headwear";

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string[];
  designNotes: string[];
  priceCents: number;
  publishedAt: string;
  sequence: number;
  collectionSlugs: string[];
  artKind: GarmentArtKind;
  colors: ProductColor[];
  sizes: string[];
  variants: ProductVariant[];
  images: ProductImage[];
  sizeGuideId: SizeGuideId;
  isPublished: boolean;
  isDemo: boolean;
};

export type Collection = {
  slug: string;
  name: string;
  label: string;
  tagline: string;
  description: string;
  featuredProductSlug: string;
  sequence: number;
};

export type SizeGuideTable = {
  id: SizeGuideId;
  name: string;
  description: string;
  unit: string;
  columns: string[];
  rows: Array<{
    label: string;
    values: string[];
  }>;
  notes: string[];
};

export type CatalogSort = "featured" | "price-asc" | "price-desc" | "newest";

export type CatalogFilters = {
  size?: string;
  color?: string;
  availability?: "in-stock";
  sort: CatalogSort;
};

export type SearchParamsRecord = {
  [key: string]: string | string[] | undefined;
};
