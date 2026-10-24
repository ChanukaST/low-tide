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
  { label: "New arrivals", href: "#new-arrivals" },
  { label: "The drop", href: "#featured" },
  { label: "Our story", href: "#story" },
] as const;

export const footerNavigation = [
  { label: "The drop", href: "#featured" },
  { label: "New arrivals", href: "#new-arrivals" },
  { label: "Our story", href: "#story" },
  { label: "Back to top", href: "#top" },
] as const;
