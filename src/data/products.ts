import type { Product, ProductColor, ProductVariant } from "@/types/catalog";

const TOP_SIZES = ["S", "M", "L", "XL"] as const;

const COLORS = {
  ink: { id: "ink", name: "Ink", hex: "#191917" },
  bone: { id: "bone", name: "Bone", hex: "#e8e1d4" },
  washedBlack: { id: "washed-black", name: "Washed black", hex: "#393834" },
  stone: { id: "stone", name: "Stone", hex: "#b8b0a0" },
  undyed: { id: "undyed", name: "Undyed", hex: "#eee8db" },
} satisfies Record<string, ProductColor>;

type ColorStock = {
  color: ProductColor;
  stock: Record<string, number>;
};

function colorCode(colorId: string) {
  return colorId
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
}

function sizeCode(size: string) {
  return size === "One size" ? "OS" : size;
}

function makeVariants(
  skuPrefix: string,
  sizes: readonly string[],
  colorStocks: ColorStock[],
): ProductVariant[] {
  return colorStocks.flatMap(({ color, stock }) =>
    sizes.map((size) => {
      const sku = `${skuPrefix}-${colorCode(color.id)}-${sizeCode(size)}`;

      return {
        id: sku.toLowerCase(),
        sku,
        colorId: color.id,
        size,
        stockQuantity: stock[size] ?? 0,
        isActive: true,
      };
    }),
  );
}

export const products: Product[] = [
  {
    id: "demo-01",
    slug: "essential-oversized-tee",
    name: "Essential Oversized Tee",
    subtitle: "An oversized foundation.",
    description: [
      "The opening silhouette. A wide body, dropped shoulders, and a clean neckline, drawn to leave room between the garment and the body.",
      "A quiet base layer for the rest of the capsule, shown here in ink and bone.",
    ],
    designNotes: [
      "Oversized, boxy silhouette",
      "Dropped shoulder seams",
      "Clean ribbed neckline",
      "Small signal-orange hem tab",
    ],
    priceCents: 590_000,
    publishedAt: "2026-09-18T09:00:00+05:30",
    sequence: 1,
    collectionSlugs: ["first-studies", "tees"],
    artKind: "oversized-tee",
    colors: [COLORS.ink, COLORS.bone],
    sizes: [...TOP_SIZES],
    variants: makeVariants("LT-TEE-ESS", TOP_SIZES, [
      {
        color: COLORS.ink,
        stock: { S: 8, M: 6, L: 0, XL: 4 },
      },
      {
        color: COLORS.bone,
        stock: { S: 4, M: 0, L: 3, XL: 2 },
      },
    ]),
    images: [
      {
        id: "essential-tee-front",
        label: "Front study",
        alt: "Front-facing black oversized T-shirt illustration on a stone background.",
        kind: "full",
        background: "#d8d1c2",
        foreground: "#191917",
      },
      {
        id: "essential-tee-detail",
        label: "Neckline detail",
        alt: "Close-up illustration of the oversized tee's neckline and shoulder seams.",
        kind: "detail",
        background: "#d8d1c2",
        foreground: "#191917",
        zoom: 1.9,
        focusX: 50,
        focusY: 25,
      },
      {
        id: "essential-tee-bone",
        label: "Bone study",
        alt: "Bone version of the oversized T-shirt illustration on an ink background.",
        kind: "colour",
        background: "#191917",
        foreground: "#e8e1d4",
      },
    ],
    sizeGuideId: "tees",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "demo-02",
    slug: "heavyweight-graphic-tee",
    name: "Heavyweight Graphic Tee",
    subtitle: "A quieter kind of graphic.",
    description: [
      "A graphic study built around an original circular waterline mark and a small Colombo signature. The body takes the same relaxed shape as the Essential Tee, with the print kept central and considered.",
      "Designed to sit as a darker counterpoint inside the first capsule.",
    ],
    designNotes: [
      "Relaxed, boxy silhouette",
      "Original circular waterline print",
      "Small Colombo signature",
      "Washed-black demo colourway",
    ],
    priceCents: 650_000,
    publishedAt: "2026-09-25T09:00:00+05:30",
    sequence: 2,
    collectionSlugs: ["first-studies", "tees"],
    artKind: "graphic-tee",
    colors: [COLORS.washedBlack],
    sizes: [...TOP_SIZES],
    variants: makeVariants("LT-TEE-GRA", TOP_SIZES, [
      {
        color: COLORS.washedBlack,
        stock: { S: 5, M: 2, L: 0, XL: 0 },
      },
    ]),
    images: [
      {
        id: "graphic-tee-front",
        label: "Front study",
        alt: "Front-facing washed-black graphic T-shirt illustration with a circular wave print.",
        kind: "full",
        background: "#242421",
        foreground: "#393834",
      },
      {
        id: "graphic-tee-detail",
        label: "Print detail",
        alt: "Close-up illustration of the circular LOW TIDE waterline print.",
        kind: "detail",
        background: "#242421",
        foreground: "#393834",
        zoom: 2,
        focusX: 50,
        focusY: 50,
      },
      {
        id: "graphic-tee-stone",
        label: "Stone study",
        alt: "Washed-black graphic T-shirt illustration on a lighter stone background.",
        kind: "colour",
        background: "#d8d1c2",
        foreground: "#393834",
      },
    ],
    sizeGuideId: "tees",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "demo-03",
    slug: "core-hoodie",
    name: "Core Hoodie",
    subtitle: "A place to disappear into.",
    description: [
      "A deep hood, dropped shoulders, and an oversized body. The shape is intentionally broad and simple, with a front pocket and a small orange marker at the chest.",
      "The heavier layer of the first study, shown here in ink and stone.",
    ],
    designNotes: [
      "Oversized body with dropped shoulders",
      "Three-panel hood construction",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
    ],
    priceCents: 1_190_000,
    publishedAt: "2026-10-02T09:00:00+05:30",
    sequence: 3,
    collectionSlugs: ["first-studies", "fleece"],
    artKind: "hoodie",
    colors: [COLORS.ink, COLORS.stone],
    sizes: [...TOP_SIZES],
    variants: makeVariants("LT-HOO-COR", TOP_SIZES, [
      {
        color: COLORS.ink,
        stock: { S: 1, M: 4, L: 3, XL: 2 },
      },
      {
        color: COLORS.stone,
        stock: { S: 0, M: 2, L: 0, XL: 0 },
      },
    ]),
    images: [
      {
        id: "core-hoodie-front",
        label: "Front study",
        alt: "Front-facing black hoodie illustration on a warm stone background.",
        kind: "full",
        background: "#b8b0a0",
        foreground: "#191917",
      },
      {
        id: "core-hoodie-detail",
        label: "Hood detail",
        alt: "Close-up illustration of the hoodie's hood, drawcords and chest marker.",
        kind: "detail",
        background: "#b8b0a0",
        foreground: "#191917",
        zoom: 1.8,
        focusX: 50,
        focusY: 32,
      },
      {
        id: "core-hoodie-stone",
        label: "Stone study",
        alt: "Stone-coloured hoodie illustration on an ink background.",
        kind: "colour",
        background: "#191917",
        foreground: "#b8b0a0",
      },
    ],
    sizeGuideId: "fleece",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "demo-04",
    slug: "relaxed-fit-sweatshirt",
    name: "Relaxed Fit Sweatshirt",
    subtitle: "The layer in between.",
    description: [
      "A relaxed crewneck with dropped shoulders and a wide, straight body. Designed to sit between the tee and the hoodie as the quieter middle layer.",
      "The demo artwork shows the intended proportions in a bone colourway.",
    ],
    designNotes: [
      "Relaxed, straight silhouette",
      "Raglan-style shoulder line",
      "Wide ribbed neckline",
      "Ribbed cuffs and hem",
    ],
    priceCents: 1_090_000,
    publishedAt: "2026-10-09T09:00:00+05:30",
    sequence: 4,
    collectionSlugs: ["first-studies", "fleece"],
    artKind: "sweatshirt",
    colors: [COLORS.undyed],
    sizes: [...TOP_SIZES],
    variants: makeVariants("LT-SWE-REL", TOP_SIZES, [
      {
        color: COLORS.undyed,
        stock: { S: 0, M: 0, L: 0, XL: 0 },
      },
    ]),
    images: [
      {
        id: "sweatshirt-front",
        label: "Front study",
        alt: "Front-facing bone sweatshirt illustration on a warm grey background.",
        kind: "full",
        background: "#c7bfae",
        foreground: "#eee8db",
      },
      {
        id: "sweatshirt-detail",
        label: "Neckline detail",
        alt: "Close-up illustration of the sweatshirt's wide crew neckline and shoulder seams.",
        kind: "detail",
        background: "#c7bfae",
        foreground: "#eee8db",
        zoom: 1.9,
        focusX: 50,
        focusY: 25,
      },
      {
        id: "sweatshirt-ink",
        label: "Ink study",
        alt: "Bone sweatshirt illustration on an ink background.",
        kind: "colour",
        background: "#191917",
        foreground: "#eee8db",
      },
    ],
    sizeGuideId: "fleece",
    isPublished: true,
    isDemo: true,
  },
  {
    id: "demo-05",
    slug: "everyday-streetwear-cap",
    name: "Everyday Streetwear Cap",
    subtitle: "The last quiet detail.",
    description: [
      "A six-panel cap with a curved brim, a small embroidered waterline arch, and a low-profile crown. The finishing note to the first study.",
      "Shown here in a bone demo colourway with an orange side marker.",
    ],
    designNotes: [
      "Six-panel construction",
      "Curved brim",
      "Embroidered waterline arch",
      "Adjustable back closure",
    ],
    priceCents: 390_000,
    publishedAt: "2026-10-16T09:00:00+05:30",
    sequence: 5,
    collectionSlugs: ["first-studies", "accessories"],
    artKind: "cap",
    colors: [COLORS.bone],
    sizes: ["One size"],
    variants: makeVariants(
      "LT-CAP-EVE",
      ["One size"],
      [
        {
          color: COLORS.bone,
          stock: { "One size": 12 },
        },
      ],
    ),
    images: [
      {
        id: "cap-front",
        label: "Front study",
        alt: "Front-facing bone cap illustration with an orange waterline arch on an ink background.",
        kind: "full",
        background: "#161614",
        foreground: "#d9d2c3",
      },
      {
        id: "cap-detail",
        label: "Embroidery detail",
        alt: "Close-up illustration of the cap's embroidered waterline arch and panel seams.",
        kind: "detail",
        background: "#161614",
        foreground: "#d9d2c3",
        zoom: 1.8,
        focusX: 50,
        focusY: 53,
      },
      {
        id: "cap-ink",
        label: "Ink study",
        alt: "Ink-coloured cap illustration on a warm stone background.",
        kind: "colour",
        background: "#d8d1c2",
        foreground: "#161614",
      },
    ],
    sizeGuideId: "headwear",
    isPublished: true,
    isDemo: true,
  },
];
