import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import {
  getPrimaryCollection,
  getProductBySlug,
  getPublishedProducts,
  getRelatedProducts,
} from "@/lib/catalog";
import { formatLKR } from "@/lib/money";
import { getProductStock } from "@/lib/variants";
import { Breadcrumbs } from "@/components/storefront/breadcrumbs";
import { ProductGallery } from "@/components/storefront/product-gallery";
import { ProductGrid } from "@/components/storefront/product-grid";
import { ProductVariantSelector } from "@/components/storefront/product-variant-selector";
import { SectionLabel } from "@/components/storefront/section-label";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

// Product pages are statically generated. This opts out of Next 16's
// instant-navigation validation while params are read at the page boundary.
export const instant = false;

export function generateStaticParams() {
  return getPublishedProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: `${product.subtitle} ${product.description[0] ?? ""}`.trim(),
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const primaryCollection = getPrimaryCollection(product);
  const relatedProducts = getRelatedProducts(product, 4);
  const productSoldOut = getProductStock(product) === 0;

  return (
    <>
      <div className="shell pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            primaryCollection
              ? {
                  label: primaryCollection.name,
                  href: `/collections/${primaryCollection.slug}`,
                }
              : { label: "Collection", href: "/collections/first-studies" },
            { label: product.name },
          ]}
        />
      </div>

      <section className="shell pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ProductGallery
              productName={product.name}
              artKind={product.artKind}
              images={product.images}
            />
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center justify-between gap-4 border-b border-ink/15 pb-4 text-[0.6rem] font-semibold tracking-[0.15em] uppercase">
              {primaryCollection ? (
                <Link
                  href={`/collections/${primaryCollection.slug}`}
                  className="group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  {primaryCollection.name}
                  <ArrowUpRight
                    className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              ) : (
                <span className="text-ink-soft">Collection</span>
              )}
              <span className="flex items-center gap-2 text-ink-soft">
                <span aria-hidden="true" className="block size-1.5 bg-accent" />
                {productSoldOut ? "Sold out / Demo" : "Demo / SS26"}
              </span>
            </div>

            <h1 className="mt-6 font-display text-[clamp(2.8rem,5.2vw,4.8rem)] leading-[0.82] tracking-[-0.035em] text-balance uppercase">
              {product.name}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-4 font-editorial text-[1.35rem] leading-[1.15] tracking-[-0.01em] text-ink-soft italic sm:text-[1.55rem]">
              {product.subtitle}
            </p>

            <div className="mt-7 flex items-center justify-between gap-4 border-y border-ink/15 py-4">
              <p className="text-[1.15rem] font-medium tracking-[-0.01em]">
                {formatLKR(product.priceCents)}
              </p>
              <p className="text-[0.6rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">
                LKR / demo price
              </p>
            </div>

            <p className="mt-6 text-[0.92rem] leading-[1.75] text-ink-soft">
              {product.description[0]}
            </p>

            <ProductVariantSelector
              product={product}
              colors={product.colors}
              sizes={product.sizes}
              sizeGuideId={product.sizeGuideId}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-paper/15 bg-ink text-paper">
        <div className="shell py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionLabel index="Notes" tone="light">
                The study
              </SectionLabel>
              <p className="mt-8 max-w-md font-editorial text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.02] tracking-[-0.02em] text-paper/80 italic">
                {product.subtitle}
              </p>
              <div className="mt-7 max-w-md space-y-4 text-[0.9rem] leading-[1.75] text-paper-soft">
                {product.description.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {primaryCollection ? (
                <Link
                  href={`/collections/${primaryCollection.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 border-b border-paper/30 pb-2 text-[0.62rem] font-semibold tracking-[0.16em] text-paper uppercase transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink focus-visible:outline-none"
                >
                  Back to {primaryCollection.name}
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              ) : null}
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="flex items-center justify-between gap-4 border-b border-paper/15 pb-4 text-[0.6rem] font-semibold tracking-[0.16em] text-paper-soft uppercase">
                <span>Design notes</span>
                <span>Demo detail</span>
              </div>
              <ol className="border-b border-paper/15">
                {product.designNotes.map((note, index) => (
                  <li
                    key={note}
                    className="grid grid-cols-[2rem_1fr] gap-4 border-b border-paper/10 py-5 last:border-b-0"
                  >
                    <span className="text-[0.6rem] font-semibold tracking-[0.12em] text-paper-soft">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.92rem] leading-relaxed text-paper/80">
                      {note}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 max-w-md text-[0.62rem] leading-relaxed text-paper-soft">
                All measurements, materials and stock counts are placeholders
                for the prototype. No orders can be placed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="border-b border-ink/15">
          <div className="shell py-20 lg:py-24">
            <div className="flex flex-col gap-5 border-b border-ink/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionLabel index="More">Continue the study</SectionLabel>
                <h2 className="mt-5 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.84] tracking-[-0.03em] uppercase">
                  More{" "}
                  <span className="font-editorial text-[0.86em] leading-none font-normal tracking-[-0.02em] lowercase italic">
                    studies
                  </span>
                  <span className="text-accent">.</span>
                </h2>
              </div>
              {primaryCollection ? (
                <Link
                  href={`/collections/${primaryCollection.slug}`}
                  className="inline-flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.14em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  View the collection
                  <ArrowUpRight
                    className="size-3.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              ) : null}
            </div>
            <div className="mt-10">
              <ProductGrid products={relatedProducts} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
