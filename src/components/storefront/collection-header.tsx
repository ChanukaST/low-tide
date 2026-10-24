import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Collection, Product } from "@/types/catalog";
import { Breadcrumbs } from "@/components/storefront/breadcrumbs";
import { SectionLabel } from "@/components/storefront/section-label";
import { ProductArt } from "@/components/storefront/product-art";

export function CollectionHeader({
  collection,
  productCount,
  featuredProduct,
}: {
  collection: Collection;
  productCount: number;
  featuredProduct: Product | undefined;
}) {
  const primaryImage = featuredProduct?.images[0];

  return (
    <header className="border-b border-ink/15">
      <div className="shell pt-6 pb-12 lg:pb-16">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: collection.name }]}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-7">
            <SectionLabel index="SS26">Collection</SectionLabel>
            <h1 className="mt-7 max-w-4xl font-display text-[clamp(3.6rem,7.8vw,7.6rem)] leading-[0.82] tracking-[-0.035em] text-balance uppercase">
              {collection.name}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-7 max-w-xl font-editorial text-[1.6rem] leading-[1.15] tracking-[-0.015em] text-ink-soft italic sm:text-[2rem]">
              {collection.tagline}
            </p>

            <div className="mt-10 grid max-w-2xl gap-5 border-t border-ink/15 pt-5 text-[0.95rem] leading-[1.7] text-ink-soft sm:grid-cols-[1fr_auto] sm:gap-10">
              <p>{collection.description}</p>
              <dl className="grid min-w-[13rem] grid-cols-2 gap-x-8 gap-y-3 text-[0.65rem] font-semibold tracking-[0.14em] uppercase sm:grid-cols-1 sm:border-l sm:border-ink/15 sm:pl-6">
                <div className="flex items-baseline justify-between gap-4 sm:block">
                  <dt className="text-ink-soft">Pieces</dt>
                  <dd className="mt-1 text-ink">
                    {String(productCount).padStart(2, "0")}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 sm:block">
                  <dt className="text-ink-soft">Season</dt>
                  <dd className="mt-1 text-ink">SS26</dd>
                </div>
                <div className="col-span-2 flex items-baseline justify-between gap-4 sm:col-span-1 sm:block">
                  <dt className="text-ink-soft">Status</dt>
                  <dd className="mt-1 text-ink">Demo catalogue</dd>
                </div>
              </dl>
            </div>
          </div>

          {featuredProduct && primaryImage ? (
            <div className="lg:col-span-5">
              <Link
                href={`/products/${featuredProduct.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden border border-ink/15 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper focus-visible:outline-none"
              >
                <span className="sr-only">View product: </span>
                <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.018]">
                  <ProductArt
                    artKind={featuredProduct.artKind}
                    background={primaryImage.background}
                    foreground={primaryImage.foreground}
                    name={featuredProduct.name}
                  />
                </div>
                <div className="absolute top-4 left-4 border border-ink/15 bg-paper/85 px-2.5 py-1.5 text-[0.6rem] font-semibold tracking-[0.15em] text-ink uppercase backdrop-blur-sm sm:top-5 sm:left-5">
                  Collection study / 01
                </div>
                <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4 border border-paper/20 bg-ink/80 px-4 py-3.5 text-paper backdrop-blur-sm sm:right-5 sm:bottom-5 sm:left-5">
                  <div>
                    <p className="text-[0.55rem] font-semibold tracking-[0.15em] text-paper-soft uppercase">
                      Featured study
                    </p>
                    <p className="mt-1 text-[0.82rem] font-medium">
                      {featuredProduct.name}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
              </Link>
              <p className="mt-3 flex items-center justify-between gap-4 text-[0.58rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">
                <span>Demo vector artwork</span>
                <span>Not for sale</span>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
