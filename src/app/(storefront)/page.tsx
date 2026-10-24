import { BrandStory } from "@/components/storefront/brand-story";
import { FeaturedCollection } from "@/components/storefront/featured-collection";
import { Hero } from "@/components/storefront/hero";
import { NewArrivals } from "@/components/storefront/new-arrivals";
import { Ticker } from "@/components/storefront/ticker";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <FeaturedCollection />
      <NewArrivals />
      <BrandStory />
    </>
  );
}
