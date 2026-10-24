import type { SizeGuideTable } from "@/types/catalog";

export const sizeGuides: SizeGuideTable[] = [
  {
    id: "tees",
    name: "Tees",
    description:
      "Garment measurements for the Essential and Graphic tees. Both share an oversized, boxy cut.",
    unit: "Measurements in inches.",
    columns: ["Size", "Chest", "Body length", "Shoulder", "Sleeve"],
    rows: [
      { label: "S", values: ["44.1", "28.0", "20.5", "8.3"] },
      { label: "M", values: ["46.5", "28.7", "21.3", "8.7"] },
      { label: "L", values: ["48.8", "29.5", "22.0", "9.1"] },
      { label: "XL", values: ["51.2", "30.3", "22.8", "9.4"] },
    ],
    notes: [
      "Chest is measured across the full circumference of the garment.",
      "Body length is measured from the high point of the shoulder to the hem.",
      "If you prefer a closer fit, consider one size down.",
    ],
  },
  {
    id: "fleece",
    name: "Fleece",
    description:
      "Garment measurements for the Core Hoodie and Relaxed Fit Sweatshirt.",
    unit: "Measurements in inches.",
    columns: ["Size", "Chest", "Body length", "Shoulder", "Sleeve"],
    rows: [
      { label: "S", values: ["45.7", "27.2", "21.7", "24.4"] },
      { label: "M", values: ["48.0", "28.0", "22.4", "24.8"] },
      { label: "L", values: ["50.4", "28.7", "23.2", "25.2"] },
      { label: "XL", values: ["52.8", "29.5", "24.0", "25.6"] },
    ],
    notes: [
      "Sleeve is measured from the shoulder seam to the cuff.",
      "The hoodie is the roomier of the two silhouettes through the body.",
      "If you are between sizes, choose the larger size for a more relaxed layer.",
    ],
  },
  {
    id: "headwear",
    name: "Headwear",
    description:
      "The cap is a single adjustable size with a low-profile crown.",
    unit: "Measurements in inches unless noted.",
    columns: ["Size", "Circumference", "Brim depth"],
    rows: [
      {
        label: "One size",
        values: ["21.7–23.2", "2.8"],
      },
    ],
    notes: [
      "Circumference is adjustable at the back of the cap.",
      "Measure around the widest part of your head, just above the ears.",
      "For a closer fit, adjust the back closure after trying the cap on.",
    ],
  },
];

export function getSizeGuide(id: string) {
  return sizeGuides.find((guide) => guide.id === id);
}
