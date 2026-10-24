export type GarmentArtKind =
  "oversized-tee" | "graphic-tee" | "hoodie" | "sweatshirt" | "cap";

export type ProductColor = {
  name: string;
  hex: string;
};

export type DemoProduct = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  artKind: GarmentArtKind;
  artBackground: string;
  artForeground: string;
  sizes: string[];
  colors: ProductColor[];
  isDemo: true;
};
