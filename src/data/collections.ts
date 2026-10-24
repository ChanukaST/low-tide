import type { Collection } from "@/types/catalog";

export const collections: Collection[] = [
  {
    slug: "first-studies",
    name: "First studies",
    label: "SS26 / Capsule 01",
    tagline: "Five pieces. One direction.",
    description:
      "The opening capsule brings together oversized tees, fleece, and a single cap. A first pass at the LOW TIDE silhouette, kept deliberately small.",
    featuredProductSlug: "essential-oversized-tee",
    sequence: 1,
  },
  {
    slug: "tees",
    name: "Tees & graphics",
    label: "Collection / Tees",
    tagline: "The plain and the printed.",
    description:
      "Two tees define the base of the range: a clean oversized silhouette and a darker graphic study built around an original waterline mark.",
    featuredProductSlug: "heavyweight-graphic-tee",
    sequence: 2,
  },
  {
    slug: "fleece",
    name: "Fleece & layers",
    label: "Collection / Fleece",
    tagline: "For the in-between.",
    description:
      "A hoodie and a relaxed sweatshirt form the layered half of the capsule. Broad shapes, low noise, and room for whatever the day requires.",
    featuredProductSlug: "core-hoodie",
    sequence: 3,
  },
  {
    slug: "accessories",
    name: "Accessories",
    label: "Collection / Accessories",
    tagline: "The last quiet detail.",
    description:
      "A single finishing piece. The Everyday Streetwear Cap carries the capsule's waterline mark in a small embroidered arch.",
    featuredProductSlug: "everyday-streetwear-cap",
    sequence: 4,
  },
];
