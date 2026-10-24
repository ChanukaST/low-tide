export const siteConfig = {
  name: "LOW TIDE",
  shortName: "LT",
  tagline: "A study in island streetwear.",
  description:
    "LOW TIDE is a provisional independent streetwear label from Sri Lanka. This is a design prototype; products, prices and imagery are placeholders.",
  location: "Colombo, Sri Lanka",
  coordinates: "06°55′N / 79°50′E",
  season: "SS26",
  demoMode: true,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const navigation = [
  { label: "New arrivals", href: "/collections/first-studies" },
  { label: "Tees", href: "/collections/tees" },
  { label: "Fleece", href: "/collections/fleece" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Our story", href: "/#story" },
] as const;

export const footerShopNavigation = [
  { label: "New arrivals", href: "/collections/first-studies" },
  { label: "Tees", href: "/collections/tees" },
  { label: "Fleece", href: "/collections/fleece" },
  { label: "Accessories", href: "/collections/accessories" },
] as const;

export const footerMoreNavigation = [
  { label: "Search", href: "/search" },
  { label: "Size guide", href: "/size-guide" },
  { label: "Our story", href: "/#story" },
  { label: "Back to top", href: "#top" },
] as const;
