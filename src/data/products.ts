import type { DemoProduct } from "@/types/product";

/**
 * Phase 1 demo catalogue.
 *
 * These products and prices are placeholders for design review only. They are
 * intentionally marked as demo data and will be replaced by the database-backed
 * catalogue in Phase 4.
 */
export const demoProducts: DemoProduct[] = [
  {
    id: "demo-01",
    slug: "essential-oversized-tee",
    name: "Essential Oversized Tee",
    priceCents: 590_000,
    artKind: "oversized-tee",
    artBackground: "#d8d1c2",
    artForeground: "#191917",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ink", hex: "#191917" },
      { name: "Bone", hex: "#e8e1d4" },
    ],
    isDemo: true,
  },
  {
    id: "demo-02",
    slug: "heavyweight-graphic-tee",
    name: "Heavyweight Graphic Tee",
    priceCents: 650_000,
    artKind: "graphic-tee",
    artBackground: "#242421",
    artForeground: "#393834",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Washed black", hex: "#393834" }],
    isDemo: true,
  },
  {
    id: "demo-03",
    slug: "core-hoodie",
    name: "Core Hoodie",
    priceCents: 1_190_000,
    artKind: "hoodie",
    artBackground: "#b8b0a0",
    artForeground: "#191917",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ink", hex: "#191917" },
      { name: "Stone", hex: "#b8b0a0" },
    ],
    isDemo: true,
  },
  {
    id: "demo-04",
    slug: "relaxed-fit-sweatshirt",
    name: "Relaxed Fit Sweatshirt",
    priceCents: 1_090_000,
    artKind: "sweatshirt",
    artBackground: "#c7bfae",
    artForeground: "#eee8db",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Undyed", hex: "#eee8db" }],
    isDemo: true,
  },
  {
    id: "demo-05",
    slug: "everyday-streetwear-cap",
    name: "Everyday Streetwear Cap",
    priceCents: 390_000,
    artKind: "cap",
    artBackground: "#161614",
    artForeground: "#d9d2c3",
    sizes: ["One size"],
    colors: [{ name: "Bone", hex: "#d9d2c3" }],
    isDemo: true,
  },
];
