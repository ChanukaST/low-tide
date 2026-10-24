import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { getNewArrivals } from "@/lib/catalog";
import { formatLKR } from "@/lib/money";
import { SectionLabel } from "@/components/storefront/section-label";

function formatSizeRange(sizes: string[]) {
  return sizes.length === 1 ? sizes[0] : `${sizes[0]}–${sizes.at(-1)}`;
}

export function FeaturedCollection() {
  const featuredProducts = getNewArrivals(5);

  return (
    <section
      id="featured"
      className="scroll-mt-24 border-b border-paper/15 bg-ink text-paper"
    >
      <div className="shell py-20 lg:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel index="01" tone="light">
              Featured collection
            </SectionLabel>
            <h2 className="mt-7 font-display text-[clamp(3.9rem,9.3vw,8.5rem)] leading-[0.8] tracking-[-0.035em] uppercase">
              <span className="block">The first</span>
              <span className="mt-1 flex flex-wrap items-baseline gap-x-4">
                <span className="font-editorial text-[0.74em] leading-none font-normal tracking-[-0.02em] text-paper/70 lowercase italic">
                  drop
                </span>
                <span className="text-accent">.</span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-md text-[0.95rem] leading-[1.65] text-paper-soft">
              Five provisional pieces mark the beginning of LOW TIDE: a quiet
              study in proportion, texture, and the space between city and sea.
            </p>
            <Link
              href="/collections/first-studies"
              className="group mt-7 inline-flex items-center gap-3 border-b border-paper/30 pb-2 text-[0.68rem] font-semibold tracking-[0.18em] uppercase transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink focus-visible:outline-none"
            >
              See all five pieces
              <ArrowDown
                className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={1.6}
              />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid border-t border-paper/15 lg:mt-16 lg:grid-cols-12">
          <div className="relative min-h-[28rem] overflow-hidden border-b border-paper/15 sm:min-h-[38rem] lg:col-span-7 lg:min-h-[42rem] lg:border-r lg:border-b-0">
            <Link
              href="/collections/first-studies"
              className="group/visual absolute inset-0 block focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink focus-visible:outline-none"
            >
              <span className="sr-only">View the First studies collection</span>
              <Image
                src="/images/campaign-hero.jpg"
                alt="Placeholder campaign image of a model in streetwear against a wall of event posters."
                fill
                quality={85}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-[52%_31%] brightness-[0.82] contrast-[1.12] grayscale transition-transform duration-700 group-hover/visual:scale-[1.015]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,9,0.08)_0%,rgba(10,10,9,0.43)_100%)]"
              />
              <div
                aria-hidden="true"
                className="grain absolute inset-0 opacity-[0.13] mix-blend-screen"
              />
              <div className="absolute top-5 left-5 flex items-center gap-2 border border-paper/30 bg-ink/55 px-3 py-2 text-[0.625rem] font-semibold tracking-[0.16em] text-paper uppercase backdrop-blur-sm sm:top-6 sm:left-6">
                <span aria-hidden="true" className="block size-1.5 bg-accent" />
                Visual study / 001
              </div>
              <div className="absolute right-5 bottom-5 left-5 flex items-end justify-between gap-6 sm:right-6 sm:bottom-6 sm:left-6">
                <p className="max-w-[12rem] font-editorial text-[1.45rem] leading-[1.05] italic sm:max-w-[15rem] sm:text-[1.7rem]">
                  A wardrobe in repose.
                </p>
                <span className="border border-paper/25 bg-ink/65 px-2.5 py-1.5 text-[0.625rem] font-semibold tracking-[0.16em] text-paper/80 uppercase backdrop-blur-sm">
                  Demo image
                </span>
              </div>
            </Link>
          </div>

          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="flex items-center justify-between border-b border-paper/15 py-4 text-[0.625rem] font-semibold tracking-[0.16em] text-paper-soft uppercase">
              <span>SS26 / Capsule index</span>
              <span>
                {String(featuredProducts.length).padStart(2, "0")} pieces
              </span>
            </div>

            <ol className="border-b border-paper/15">
              {featuredProducts.map((product, index) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-paper/10 py-4 last:border-b-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink focus-visible:outline-none"
                  >
                    <span className="text-[0.625rem] font-semibold tracking-[0.14em] text-paper-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[0.85rem] font-medium tracking-[-0.01em] transition-colors group-hover:text-accent">
                        {product.name}
                      </span>
                      <span className="mt-1 block text-[0.625rem] tracking-[0.12em] text-paper-soft uppercase">
                        {formatSizeRange(product.sizes)} /{" "}
                        {product.colors[0]?.name}
                      </span>
                    </span>
                    <span className="flex items-center gap-3 text-[0.68rem] text-paper-soft tabular-nums">
                      {formatLKR(product.priceCents)}
                      <ArrowUpRight
                        className="size-3.5 text-paper-soft transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            <div className="mt-8 border border-paper/15 p-5 lg:mt-0">
              <p className="text-[0.65rem] font-semibold tracking-[0.17em] text-accent uppercase">
                Please note
              </p>
              <p className="mt-3 max-w-sm text-[0.76rem] leading-relaxed text-paper-soft">
                This is a design prototype. Products, prices, stock and
                photography are placeholders and cannot be purchased.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
