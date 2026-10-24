import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";

import type { SearchParamsRecord } from "@/types/catalog";
import {
  buildSearchHref,
  getCollections,
  getNewArrivals,
  searchCatalog,
} from "@/lib/catalog";
import { Breadcrumbs } from "@/components/storefront/breadcrumbs";
import { SearchSkeleton } from "@/components/storefront/catalog-skeleton";
import { ProductGrid } from "@/components/storefront/product-grid";
import { SearchForm } from "@/components/storefront/search-form";
import { SectionLabel } from "@/components/storefront/section-label";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search the LOW TIDE demo catalogue by piece, colour, collection or design note.",
};

const suggestedQueries = [
  { label: "Oversized tee", query: "oversized" },
  { label: "Hoodie", query: "hoodie" },
  { label: "Fleece", query: "fleece" },
  { label: "Cap", query: "cap" },
];

function getQuery(searchParams: SearchParamsRecord) {
  const raw = searchParams.q;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return String(value ?? "")
    .trim()
    .slice(0, 80);
}

async function SearchContent({
  searchParams,
}: {
  searchParams: Promise<SearchParamsRecord>;
}) {
  const query = getQuery(await searchParams);
  const results = searchCatalog(query);
  const showResults = query.length > 0;

  return (
    <div className="border-t border-ink/15 py-10 lg:py-12">
      <div className="max-w-3xl">
        <SearchForm query={query} />
      </div>

      {showResults ? (
        <div className="mt-16">
          <div className="flex flex-col gap-4 border-b border-ink/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.6rem] font-semibold tracking-[0.16em] text-ink-soft uppercase">
                Search results
              </p>
              <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.88] tracking-[-0.03em] text-balance uppercase">
                “{query}”<span className="text-accent">.</span>
              </h2>
            </div>
            <p
              className="text-[0.62rem] font-semibold tracking-[0.14em] text-ink-soft uppercase"
              role="status"
              aria-live="polite"
            >
              {String(results.length).padStart(2, "0")}{" "}
              {results.length === 1 ? "piece" : "pieces"} found
            </p>
          </div>

          {results.length ? (
            <div className="mt-10">
              <ProductGrid products={results} />
            </div>
          ) : (
            <div className="mt-10 border border-ink/15 px-6 py-16 text-center sm:py-24">
              <Search
                className="mx-auto size-6 text-ink-soft"
                strokeWidth={1.3}
                aria-hidden="true"
              />
              <p className="mt-5 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[0.9] tracking-[-0.03em] uppercase">
                No match<span className="text-accent">.</span>
              </p>
              <p className="mx-auto mt-4 max-w-md text-[0.9rem] leading-relaxed text-ink-soft">
                Try a shorter search, a colour, or one of the suggested pieces
                below. The demo catalogue currently has five items.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {suggestedQueries.map((suggestion) => (
                  <Link
                    key={suggestion.query}
                    href={buildSearchHref(suggestion.query)}
                    className="inline-flex h-9 items-center border border-ink/20 px-3 text-[0.6rem] font-semibold tracking-[0.1em] text-ink-soft uppercase transition-colors hover:border-ink hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
                  >
                    {suggestion.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-16 grid gap-12 border-t border-ink/15 pt-12 lg:grid-cols-12 lg:gap-8">
          <h2 className="sr-only">Search suggestions</h2>
          <div className="lg:col-span-5">
            <SectionLabel index="01">Start somewhere</SectionLabel>
            <p className="mt-6 max-w-md font-editorial text-[1.8rem] leading-[1.1] tracking-[-0.015em] text-ink-soft italic sm:text-[2.2rem]">
              Five pieces, one small study. Try a word, a colour, or a
              silhouette.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {suggestedQueries.map((suggestion) => (
                <Link
                  key={suggestion.query}
                  href={buildSearchHref(suggestion.query)}
                  className="inline-flex h-9 items-center border border-ink/20 px-3 text-[0.6rem] font-semibold tracking-[0.1em] text-ink-soft uppercase transition-colors hover:border-ink hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
                >
                  {suggestion.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel index="02">Browse by collection</SectionLabel>
            <div className="mt-6 border-t border-ink/15">
              {getCollections().map((collection) => (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="group flex items-center justify-between gap-5 border-b border-ink/15 py-5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  <span>
                    <span className="block text-[0.85rem] font-medium">
                      {collection.name}
                    </span>
                    <span className="mt-1 block text-[0.6rem] tracking-[0.1em] text-ink-soft uppercase">
                      {collection.tagline}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-ink-soft transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
            <p className="mt-6 text-[0.62rem] leading-relaxed text-ink-soft">
              Looking for a specific piece?{" "}
              <Link
                href="/collections/first-studies"
                className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
              >
                Browse the full first study
              </Link>
              .
            </p>
          </div>
        </div>
      )}

      {!showResults && getNewArrivals(3).length ? (
        <div className="mt-16 border-t border-ink/15 pt-10">
          <div className="flex items-end justify-between gap-6">
            <SectionLabel index="03">A few studies</SectionLabel>
            <Link
              href="/collections/first-studies"
              className="text-[0.6rem] font-semibold tracking-[0.12em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              View all
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={getNewArrivals(3)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsRecord>;
}) {
  return (
    <>
      <header className="border-b border-ink/15">
        <div className="shell pt-6 pb-12 lg:pb-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Search" }]}
          />
          <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionLabel index="Search">The catalogue</SectionLabel>
              <h1 className="mt-7 font-display text-[clamp(3.9rem,9.5vw,8.5rem)] leading-[0.8] tracking-[-0.035em] text-balance uppercase">
                Search
                <br />
                the{" "}
                <span className="font-editorial text-[0.8em] leading-none font-normal tracking-[-0.02em] lowercase italic">
                  study
                </span>
                <span className="text-accent">.</span>
              </h1>
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="max-w-sm text-[0.95rem] leading-[1.65] text-ink-soft">
                A small catalogue, a narrow set of ideas. Search by piece,
                colour or the notes behind it.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="shell">
        <Suspense fallback={<SearchSkeleton />}>
          <SearchContent searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
