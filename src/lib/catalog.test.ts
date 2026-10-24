import { describe, expect, it } from "vitest";

import {
  buildCollectionHref,
  filterCatalogProducts,
  getCollectionFacets,
  getCollectionBySlug,
  getProductBySlug,
  getProductsForCollection,
  getRelatedProducts,
  parseCatalogFilters,
  searchCatalog,
  sortCatalogProducts,
} from "@/lib/catalog";

describe("catalogue navigation", () => {
  it("finds collections and their published products", () => {
    expect(getCollectionBySlug("tees")?.name).toBe("Tees & graphics");
    expect(getProductsForCollection("tees").map((p) => p.slug)).toEqual([
      "essential-oversized-tee",
      "heavyweight-graphic-tee",
    ]);
    expect(getProductsForCollection("accessories")).toHaveLength(1);
    expect(getProductsForCollection("first-studies")).toHaveLength(5);
  });

  it("returns undefined for an unknown product or collection", () => {
    expect(getProductBySlug("missing-piece")).toBeUndefined();
    expect(getCollectionBySlug("missing-collection")).toBeUndefined();
  });
});

describe("catalogue filtering", () => {
  const all = getProductsForCollection("first-studies");

  it("filters by variant size and colour", () => {
    const sizeM = filterCatalogProducts(all, {
      sort: "featured",
      size: "M",
    });
    expect(sizeM).toHaveLength(3);

    const stone = filterCatalogProducts(all, {
      sort: "featured",
      color: "stone",
    });
    expect(stone.map((p) => p.slug)).toEqual(["core-hoodie"]);
  });

  it("filters out fully sold-out products when in-stock is selected", () => {
    const inStock = filterCatalogProducts(all, {
      sort: "featured",
      availability: "in-stock",
    });

    expect(inStock.map((p) => p.slug)).not.toContain("relaxed-fit-sweatshirt");
    expect(inStock).toHaveLength(4);
  });

  it("exposes collection facets in a stable order", () => {
    const facets = getCollectionFacets(all);

    expect(facets.sizes).toEqual(["S", "M", "L", "XL", "One size"]);
    expect(facets.colors.map((color) => color.id)).toEqual([
      "ink",
      "bone",
      "washed-black",
      "stone",
      "undyed",
    ]);
  });

  it("can combine filters into an empty, valid result", () => {
    const empty = filterCatalogProducts(all, {
      sort: "featured",
      size: "L",
      color: "stone",
    });

    expect(empty).toEqual([]);
  });
});

describe("catalogue sorting", () => {
  const all = getProductsForCollection("first-studies");

  it("sorts by price ascending and descending", () => {
    const ascending = sortCatalogProducts(all, "price-asc");
    const descending = sortCatalogProducts(all, "price-desc");

    expect(ascending.map((p) => p.priceCents)).toEqual(
      [...ascending.map((p) => p.priceCents)].sort((a, b) => a - b),
    );
    expect(descending.map((p) => p.priceCents)).toEqual(
      [...descending.map((p) => p.priceCents)].sort((a, b) => b - a),
    );
  });

  it("sorts newest by publication date", () => {
    const newest = sortCatalogProducts(all, "newest");

    expect(newest[0]?.slug).toBe("everyday-streetwear-cap");
  });
});

describe("catalogue search", () => {
  it("searches names, descriptions, colours and collections", () => {
    expect(searchCatalog("hoodie").map((p) => p.slug)).toContain("core-hoodie");
    expect(searchCatalog("ink").map((p) => p.slug)).toContain(
      "essential-oversized-tee",
    );
    expect(searchCatalog("circular").map((p) => p.slug)).toEqual([
      "heavyweight-graphic-tee",
    ]);
    expect(searchCatalog("fleece").map((p) => p.slug)).toEqual([
      "core-hoodie",
      "relaxed-fit-sweatshirt",
    ]);
  });

  it("is case-insensitive and returns no results for an unknown term", () => {
    expect(searchCatalog("HOODIE")).toHaveLength(2);
    expect(searchCatalog("xyz-does-not-exist")).toEqual([]);
    expect(searchCatalog("   ")).toEqual([]);
  });
});

describe("catalogue query helpers", () => {
  it("parses valid and invalid sort options", () => {
    expect(parseCatalogFilters({ sort: "price-asc" })).toEqual({
      size: undefined,
      color: undefined,
      availability: undefined,
      sort: "price-asc",
    });
    expect(parseCatalogFilters({ sort: "not-real" }).sort).toBe("featured");
    expect(parseCatalogFilters({ availability: "in-stock" }).availability).toBe(
      "in-stock",
    );
  });

  it("accepts array query values from Next.js", () => {
    const filters = parseCatalogFilters({ size: ["L", "M"], q: "ignored" });
    expect(filters.size).toBe("L");
  });

  it("builds collection URLs without default values", () => {
    const base = {
      sort: "featured" as const,
      size: "M",
      color: "ink",
    };

    expect(buildCollectionHref("tees", base)).toBe(
      "/collections/tees?size=M&color=ink",
    );
    expect(buildCollectionHref("tees", base, { size: undefined })).toBe(
      "/collections/tees?color=ink",
    );
    expect(
      buildCollectionHref("tees", base, {
        size: undefined,
        color: undefined,
      }),
    ).toBe("/collections/tees");
    expect(buildCollectionHref("tees", base, { sort: "price-asc" })).toContain(
      "sort=price-asc",
    );
  });
});

describe("related products", () => {
  it("excludes the current product and respects the limit", () => {
    const product = getProductBySlug("core-hoodie");
    expect(product).toBeDefined();

    if (!product) return;

    const related = getRelatedProducts(product, 3);

    expect(related).toHaveLength(3);
    expect(related.map((p) => p.slug)).not.toContain("core-hoodie");
  });
});
