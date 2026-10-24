# Phase 2 — Catalogue and product experience

**Status:** Complete, awaiting design approval.  
**Date:** 25 October 2026  
**Scope:** Catalogue, collection pages, product detail pages, search, filtering/sorting, variant display, stock states, related products, and size guide. The backend, cart, checkout, authentication, admin, and payments remain out of scope.

## Objective delivered

Turn the Phase 1 visual foundation into a navigable demo storefront. The catalogue must remain a single typed data source, collections and products must be directly linkable, URL state must describe filters and sorting, and unavailable inventory must be handled honestly.

## Implemented routes

| Route                               | Purpose                                         |
| ----------------------------------- | ----------------------------------------------- |
| `/collections/first-studies`        | Full five-piece capsule, filterable/sortable    |
| `/collections/tees`                 | Tees and graphic tees                           |
| `/collections/fleece`               | Hoodie and sweatshirt                           |
| `/collections/accessories`          | Cap                                             |
| `/products/essential-oversized-tee` | Product detail                                  |
| `/products/heavyweight-graphic-tee` | Product detail                                  |
| `/products/core-hoodie`             | Product detail                                  |
| `/products/relaxed-fit-sweatshirt`  | Fully sold-out state                            |
| `/products/everyday-streetwear-cap` | Product detail                                  |
| `/search`                           | Search start state, query results, empty states |
| `/size-guide`                       | Tees, fleece, and headwear demo measurements    |

`/collections/[slug]` and `/products/[slug]` are generated from the local catalogue via `generateStaticParams`. Unknown slugs call `notFound()`.

## Implemented components

| Component                           | Location                                          | Purpose                                                           |
| ----------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------- |
| `CollectionHeader`                  | `src/components/storefront/collection-header.tsx` | Collection hero, featured study, counts                           |
| `CollectionBrowser`                 | `collection-browser.tsx`                          | Server-rendered filtering/sorting results                         |
| `CollectionControls`                | `collection-controls.tsx`                         | Size, colour, availability filters, active chips, sort links      |
| `ProductGrid`                       | `product-grid.tsx`                                | Reusable responsive catalogue grid with heading-level control     |
| `ProductCard`                       | `product-card.tsx`                                | Linked product tile, colourways, price, sold-out overlay          |
| `ProductGallery`                    | `product-gallery.tsx`                             | Client-side three-image study gallery with captions               |
| `ProductVariantSelector`            | `product-variant-selector.tsx`                    | Colour/size fieldsets, stock messages, SKU, disabled purchase CTA |
| `Breadcrumbs`                       | `breadcrumbs.tsx`                                 | Semantic route context                                            |
| `SearchForm`                        | `search-form.tsx`                                 | Accessible GET search form                                        |
| `CatalogSkeleton`, `SearchSkeleton` | `catalog-skeleton.tsx`                            | Streaming fallbacks                                               |

## Data model

The local source in `src/types/catalog.ts` and `src/data/products.ts` includes:

- `Product`: slug, name, subtitle, descriptions, design notes, LKR price in cents, sequence, publication date, collections, demo flag, publication state, garment-art kind, colours, sizes, variants, images, size-guide reference.
- `ProductVariant`: unique id and SKU, colour, size, integer stock, active state.
- `ProductImage`: label, alt text, full/detail/colour study kind, artwork colours, zoom/focus values.
- `Collection`: slug, display name, label, tagline, description, sequence, featured product.
- `SizeGuideTable`: rows, columns, units, notes.

Stock helpers in `src/lib/variants.ts` calculate product stock, colour stock, available sizes, low-stock thresholds, and stock labels. The `Relaxed Fit Sweatshirt` intentionally has zero stock in every variant to exercise product-level unavailability.

## Filtering and sorting behaviour

- URL parameters: `size`, `color`, `availability=in-stock`, and `sort`.
- Sort values: `featured` (default), `price-asc`, `price-desc`, `newest`.
- Size/colour filters require a matching in-stock variant, so filters cannot surface a product that has no purchasable variant for that selection.
- Active filters are removable individually or all at once.
- Filters preserve the current sort; sorting preserves the current filters.
- Empty results show a clear state and a link to reset the collection.
- All controls are real links and work without client-side JavaScript.

## Product detail behaviour

- Three original demo image studies per product: full garment, zoomed detail, and alternate tonal study.
- Thumbnail buttons switch the active image and expose `aria-pressed`.
- Colour and size controls use native fieldsets and disabled states.
- Selecting a size updates availability and SKU through an `aria-live` status region.
- Low stock is surfaced as `Only N left — demo inventory`.
- The sold-out sweatshirt disables colour and size controls and renders a `Sold out` CTA.
- `Add to bag` remains disabled for every product until Phase 3.
- Product notes are shown in an editorial detail band; sizing/prototype notes are expandable with native `<details>`.
- Size-guide links go to `/size-guide#tees`, `/size-guide#fleece`, or `/size-guide#headwear`.

## Search behaviour

- Native GET form at `/search`.
- Matches normalized text across names, subtitles, descriptions, design notes, colours, sizes, and collection names.
- Results and zero-result states.
- Start state offers suggested searches and collection links, plus a small set of studies.
- Query values are trimmed and length-limited.

## Verification

| Check                    | Result                     |
| ------------------------ | -------------------------- |
| Prettier                 | Passed                     |
| TypeScript `--noEmit`    | Passed                     |
| ESLint                   | Passed                     |
| Vitest                   | **28/28 passed**           |
| Playwright               | **20/20 passed**           |
| Next.js production build | Passed; 17 pages generated |

Unit coverage includes money formatting, catalogue shape, unique SKUs and variant completeness, stock classification, collection queries, filters, sorting, search, URL construction, and related products.

Playwright coverage includes:

- Homepage-to-product navigation
- Collection filters, active filter state, sorting, availability filter, and empty state
- Low-stock and sold-out variant selection
- Fully sold-out product
- Gallery thumbnails and `aria-pressed`
- Search results and no results
- Size-guide deep link
- No horizontal page overflow at 1024, 768, 390, 360, and 320 px for collection, product, search, and size guide routes
- Automated Axe scans across seven catalogue states plus the homepage at desktop/mobile and the open mobile menu

**Browser/tooling caveat:** Playwright ran in Chromium only. Axe caught no critical or serious issues, but this is not a complete WCAG audit or real screen-reader test.

**Build note:** Next.js reports the URL-dependent collection/search routes and some product fallback routes as Partial Prerender. Product detail pages are generated from static params; collection/search content streams behind Suspense. `instant = false` is intentionally set on collection/product pages while params are read at the page boundary.

## Screenshots

- [Collection — desktop](../screenshots/phase-2/collection-desktop.png)
- [Collection — mobile](../screenshots/phase-2/collection-mobile.png)
- [Category page — desktop](../screenshots/phase-2/collection-tees-desktop.png)
- [Product — desktop](../screenshots/phase-2/product-desktop.png)
- [Product — mobile](../screenshots/phase-2/product-mobile.png)
- [Search results — desktop](../screenshots/phase-2/search-desktop.png)
- [Search start — desktop](../screenshots/phase-2/search-start-desktop.png)
- [Size guide — desktop](../screenshots/phase-2/size-guide-desktop.png)
- [Size guide — mobile](../screenshots/phase-2/size-guide-mobile.png)
- [Mobile menu](../screenshots/phase-2/mobile-menu.png)

## Known limitations and follow-ups

1. Local seed data only; no PostgreSQL, storage, admin, or image upload until Phase 4.
2. No cart, checkout, order creation, payments, customer accounts, or admin auth yet.
3. Filters are single-select per dimension and do not support multi-size or multi-colour query arrays.
4. Gallery image selection is independent of colour-variant selection.
5. Product imagery is original vector artwork; final product photography and model releases are still required.
6. Measurements, material descriptions, and stock are demo values.
7. Search uses simple normalized matching without typo tolerance, synonyms, or relevance ranking.
8. No pagination, recently viewed products, or saved items.
9. No branded 404/error/loading experiences yet.
10. SEO remains intentionally `noindex`; structured data, canonical strategy, sitemap, and robots are Phase 7.
11. `instant = false` on collection/product routes should be revisited with loading skeletons before production.
12. Only Chromium automated testing has run so far.

## Phase 3 entry criteria

Approval of:

- collection page composition and filter/sort controls
- product card treatment and link behaviour
- product gallery and variant selector
- stock-state language and sold-out treatment
- search page and result presentation
- size-guide structure and responsive table treatment
- expanded global navigation and footer

Phase 3 will add the persistent client cart and checkout navigation. It will not add backend price authority, order creation, authentication, or payments; those remain in later phases.
