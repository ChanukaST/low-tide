import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getNewArrivals } from "@/lib/catalog";
import { ProductCard } from "@/components/storefront/product-card";
import { SectionLabel } from "@/components/storefront/section-label";

export function NewArrivals() {
  const newArrivals = getNewArrivals(5);

  return (
    <section
      id="new-arrivals"
      className="scroll-mt-24 border-b border-ink/15 bg-paper"
    >
      <div className="shell py-20 lg:py-28">
        <div className="grid gap-10 border-b border-ink/15 pb-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel index="02">New arrivals</SectionLabel>
            <h2 className="mt-7 font-display text-[clamp(3.8rem,9vw,8.2rem)] leading-[0.8] tracking-[-0.035em] uppercase">
              <span className="block">New</span>
              <span className="mt-1 flex items-baseline gap-3">
                <span className="text-accent">/</span>
                <span>Arrivals</span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-[0.95rem] leading-[1.65] text-ink-soft">
              The opening capsule. Five pieces, treated as studies in volume and
              restraint — from the oversized tee to the everyday cap.
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-ink/15 pt-4 text-[0.625rem] font-semibold tracking-[0.16em] text-ink-soft uppercase">
              <span>Demo catalogue</span>
              <span>{String(newArrivals.length).padStart(2, "0")} pieces</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-4 md:grid-cols-3 lg:mt-12 lg:grid-cols-5 lg:gap-x-5 lg:gap-y-0">
          {newArrivals.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
          <Link
            href="/collections/first-studies"
            className="group flex min-h-full flex-col justify-between border border-ink bg-ink p-4 text-paper transition-colors hover:bg-[#1a1a17] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper focus-visible:outline-none lg:hidden"
          >
            <span className="sr-only">View all pieces in the first study</span>
            <div className="flex items-center justify-between text-[0.625rem] font-semibold tracking-[0.15em] text-paper-soft uppercase">
              <span>End note</span>
              <span>05 / 05</span>
            </div>
            <p className="max-w-[12rem] py-10 font-editorial text-[1.45rem] leading-[1.05] italic">
              The first study ends at the waterline.
            </p>
            <div className="flex items-end justify-between gap-4 border-t border-paper/15 pt-4">
              <span className="text-[0.625rem] font-semibold tracking-[0.15em] text-paper-soft uppercase">
                SS26 / Demo capsule
              </span>
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </Link>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink/15 pt-5 text-[0.65rem] font-semibold tracking-[0.15em] text-ink-soft uppercase sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <span>All products are demo concepts / not live inventory</span>
          <Link
            href="/collections/first-studies"
            className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Browse all five pieces
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
