# LOW TIDE — Phase 2 storefront

A premium, editorial streetwear storefront prototype for an independent Sri Lankan label. It is built incrementally; the repository currently contains **Phase 1 and Phase 2**.

> **Status:** Phase 2 awaiting design approval. Products, inventory, prices, measurements, and imagery are demo material. There is no cart, checkout, customer account, database, admin panel, or payment integration yet.

## Current scope

- Responsive announcement bar, sticky header, desktop navigation, mobile menu, and header search
- Editorial homepage with featured collection, new arrivals, brand story, and footer
- Typed five-product demo catalogue with collections
- Collection pages with URL-based filtering, availability filtering, and sorting
- Product pages with a three-view original artwork gallery
- Colour and size selector with variant-level stock states
- Fully sold-out product state and disabled/add-to-bag placeholder
- Product notes, related products, and a size-guide deep link
- Catalogue search with results, empty states, and collection suggestions
- Responsive size-guide tables for tees, fleece, and headwear
- Unit, end-to-end, responsive, keyboard, and automated accessibility checks

See [Phase 1 notes](docs/PHASE-1.md) and [Phase 2 notes](docs/PHASE-2.md).

## Routes

| Route                 | Status                                                                  |
| --------------------- | ----------------------------------------------------------------------- |
| `/`                   | Homepage                                                                |
| `/collections/[slug]` | Catalogue collections: `first-studies`, `tees`, `fleece`, `accessories` |
| `/products/[slug]`    | Product detail pages for all five demo products                         |
| `/search`             | Catalogue search and start state                                        |
| `/size-guide`         | Demo measurement tables                                                 |
| `/cart`               | Not implemented until Phase 3                                           |
| `/checkout`           | Not implemented until Phase 5                                           |

Collection filtering and sorting are represented in shareable URLs, for example:

```text
/collections/tees?size=M&color=ink&availability=in-stock&sort=price-asc
```

## Stack

- Next.js 16 App Router + React 19
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui-style primitives (Radix Dialog/Sheet, local component source)
- Motion for React
- Lucide icons
- Playwright + Axe for end-to-end and accessibility checks
- Vitest for unit tests

No backend service is connected yet.

## Run locally

Requirements: Node.js 20.9 or newer, and pnpm 11.15.1 (pinned in `package.json`).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The app does not require environment variables yet. To set a future canonical URL:

```powershell
Copy-Item .env.example .env.local
```

> **Tooling note:** `pnpm-workspace.yaml` sets `nodeLinker: hoisted`. This avoids an ESLint 9 ESM resolution problem with pnpm's isolated symlink layout on Node 26. Keep the setting unless you verify the full toolchain under another Node/pnpm version.

## Commands

```bash
pnpm dev             # Development server
pnpm build           # Production build
pnpm start           # Serve the production build
pnpm lint            # ESLint
pnpm typecheck       # TypeScript, no emit
pnpm test            # Vitest unit tests
pnpm test:e2e        # Playwright browser checks
pnpm format          # Prettier write
pnpm format:check    # Prettier check
```

Before the first Playwright run on a new machine:

```bash
pnpm exec playwright install chromium
```

The Playwright config starts/reuses a local dev server and writes current review screenshots to `screenshots/phase-2/`. Phase 1 screenshots remain in `screenshots/phase-1/` as a historical record.

## Project structure

```text
src/
├─ app/
│  ├─ (storefront)/
│  │  ├─ page.tsx
│  │  ├─ collections/[slug]/page.tsx
│  │  ├─ products/[slug]/page.tsx
│  │  ├─ search/page.tsx
│  │  └─ size-guide/page.tsx
│  ├─ globals.css
│  ├─ icon.svg
│  └─ layout.tsx
├─ components/
│  ├─ storefront/          # Header, footer, hero, catalogue, gallery, selectors
│  └─ ui/                  # shadcn/ui-style Button and Sheet
├─ config/site.ts          # Brand, navigation, location, canonical URL
├─ data/
│  ├─ products.ts          # Five demo products and variant inventory
│  ├─ collections.ts       # Demo collections
│  └─ size-guides.ts       # Demo measurement tables
├─ lib/
│  ├─ catalog.ts           # Queries, filters, sorting, search, related products
│  ├─ variants.ts          # Variant and stock helpers
│  ├─ money.ts
│  └─ utils.ts
└─ types/catalog.ts
e2e/                       # Playwright checks and helpers
docs/                      # Phase notes and asset licensing
public/images/             # Local licensed campaign placeholders
screenshots/phase-2/       # Current review screenshots
```

## Catalogue model

- Products have a slug, name, subtitle, description, design notes, LKR price in integer cents, publication state, demo flag, collections, colourways, sizes, variants, image studies, and a size-guide reference.
- Variants have a unique SKU, colour, size, demo stock quantity, and active state.
- Stock is calculated from variants. The `Relaxed Fit Sweatshirt` is intentionally fully sold out to exercise unavailable-product states.
- Collections are resolved from product membership, so the same product can appear in multiple collections.
- Filtering by size or colour now requires a matching **in-stock** variant. `availability=in-stock` is an additional catalogue-wide filter.
- All filtering and sorting is server-rendered from URL search parameters; no client pricing or stock is trusted.
- Search matches product names, subtitles, descriptions, design notes, colours, sizes, and collection names using simple normalized substring matching.

## Design and content replacement

- **Brand name / location / URL / navigation:** `src/config/site.ts`
- **Colour palette and typography variables:** `src/app/globals.css`
- **Fonts:** `src/app/layout.tsx`
- **Demo products, descriptions, variants, and stock:** `src/data/products.ts`
- **Collections:** `src/data/collections.ts`
- **Demo measurements:** `src/data/size-guides.ts`
- **Product illustrations:** `src/components/storefront/product-art.tsx`
- **Campaign placeholders:** `public/images/` (see [asset licences](docs/ASSET-LICENSES.md))

The wordmark is typographic, so the provisional name and favicon can be replaced without changing layout components. Final logo assets, photography, product copy, measurements, contact details, and policy pages must be supplied before launch.

## Verification status

All of the following were run on 25 October 2026:

- Prettier: passed
- ESLint: passed
- TypeScript `--noEmit`: passed
- Vitest: **28/28 tests passed**
- Playwright: **20/20 tests passed**
  - Homepage at desktop, tablet, mobile, 360 px, and 320 px
  - Collection, product, search, and size-guide routes at 1024, 768, 390, 360, and 320 px with no page-level horizontal overflow
  - Product navigation from homepage cards
  - Filtering, sorting, availability, active filters, and empty results
  - Variant selection, low stock, sold-out variants, and a fully sold-out product
  - Gallery thumbnail switching
  - Search success and no-result states
  - Size-guide anchor navigation
  - Mobile menu, skip link, focus containment, and focus restoration
  - No critical or serious Axe violations on the homepage, mobile menu, unfiltered/filtered collection, available/sold-out product, search results/start state, or size guide
- Next.js production build: passed
  - 17 pages generated
  - Homepage and size guide are static
  - Collections, search, and some product/fallback routes use Partial Prerender for URL-dependent streaming

Automated Axe checks are not a substitute for a full manual WCAG audit, keyboard-only testing with real screen readers, or visual regression testing.

## Known Phase 2 limitations

- Catalogue data is local TypeScript seed data. There is no database, admin panel, image upload, or server-side inventory source yet.
- `Add to bag` is intentionally disabled and the header bag remains empty/disabled until Phase 3.
- Filtering supports one size and one colour at a time; it is not multi-select.
- There is no pagination because the demo catalogue has only five products.
- The product gallery's colour study does not automatically synchronise with the selected colour variant.
- Campaign photography remains licensed stock placeholder material. Product visuals are original vector studies, not photographs of physical samples.
- Measurements and materials are demo placeholders and must be replaced with production data.
- Search is intentionally simple normalized text matching; it does not yet rank results or support typo tolerance.
- Root metadata is deliberately `noindex`; sitemap, robots, structured data, social metadata, and final SEO belong to Phase 7.
- There is no branded 404 page, error boundary, or route-level loading skeleton yet.
- Product and collection routes currently opt out of Next 16 instant-navigation validation (`instant = false`) while URL data is read at the page boundary. Revisit with shell/skeleton optimisations before launch.
- No Vercel deployment or GitHub remote is configured yet.

## Next phase

Phase 3 will add a persistent shopping cart with add/remove, quantity changes, selected variants, empty state, subtotal calculations, checkout navigation, and feedback. Cart prices and stock will still be display-only until checkout/server validation in Phase 5. Work will not begin until Phase 2 approval.
