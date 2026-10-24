import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { SearchParamsRecord } from "@/types/catalog";
import {
  getCollectionBySlug,
  getCollections,
  getProductsForCollection,
  getProductBySlug,
} from "@/lib/catalog";
import { CatalogSkeleton } from "@/components/storefront/catalog-skeleton";
import { CollectionBrowser } from "@/components/storefront/collection-browser";
import { CollectionHeader } from "@/components/storefront/collection-header";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParamsRecord>;
};

// Params are read to render the collection header while URL-specific filters
// stream inside Suspense. Opt out of instant-shell validation for this route
// until its loading skeleton is implemented.
export const instant = false;

export function generateStaticParams() {
  return getCollections().map((collection) => ({
    slug: collection.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return { title: "Collection not found" };
  }

  return {
    title: collection.name,
    description: collection.description,
    alternates: {
      canonical: `/collections/${collection.slug}`,
    },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  const collectionProducts = getProductsForCollection(collection.slug);
  const featuredProduct =
    getProductBySlug(collection.featuredProductSlug) ?? collectionProducts[0];

  return (
    <>
      <CollectionHeader
        collection={collection}
        productCount={collectionProducts.length}
        featuredProduct={featuredProduct}
      />

      <div className="shell">
        <Suspense fallback={<CatalogSkeleton />}>
          <CollectionBrowser
            collection={collection}
            products={collectionProducts}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </>
  );
}
