# LOW TIDE — Phase 1 storefront

A premium, editorial streetwear storefront prototype for an independent Sri Lankan label. It is built incrementally; this repository currently contains **Phase 1 only**.

> **Status:** Phase 1 awaiting design approval. The storefront is a visual prototype. There is no cart, checkout, customer account, database, admin panel, or payment integration yet. All products, prices, and campaign imagery are demo material.

## Current scope

- Responsive announcement bar, sticky header, desktop navigation, and mobile menu
- Editorial hero with a campaign image and custom type treatment
- Running collection ticker with reduced-motion support
- Featured collection with capsule index
- Five labelled demo product cards with original garment artwork
- Brand story section
- Full footer with demo/status disclosures
- Central brand configuration and design tokens
- Responsive and accessibility checks

See [Phase 1 notes](docs/PHASE-1.md) for the component inventory, test results, and known limitations.

## Stack

- Next.js 16 App Router + React 19
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui-style primitives (Radix Dialog/Sheet, local component source)
- Motion for React
- Lucide icons
- Playwright + Axe for end-to-end and accessibility checks
- Vitest for unit tests

No backend service is connected in Phase 1.

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

The Playwright config starts/reuses a local dev server and writes review screenshots to `screenshots/phase-1/`.

## Project structure

```text
src/
├─ app/
│  ├─ (storefront)/        # Storefront layout and homepage
│  ├─ globals.css          # Design tokens, shell, motion, sheet animation
│  ├─ icon.svg             # Original provisional favicon
│  └─ layout.tsx           # Fonts and root metadata
├─ components/
│  ├─ storefront/          # Homepage sections and brand components
│  └─ ui/                  # shadcn/ui-style Button and Sheet
├─ config/site.ts          # Brand, navigation, location, canonical URL
├─ data/products.ts        # Phase 1 demo catalogue
├─ lib/                    # Money formatting and class utilities
└─ types/product.ts        # Catalogue types
e2e/                       # Playwright storefront checks
docs/                      # Phase notes and asset licensing
public/images/             # Local licensed demo campaign imagery
screenshots/phase-1/       # Review screenshots
```

## Design and content replacement

- **Brand name / location / URL:** `src/config/site.ts`
- **Colour palette and typography variables:** `src/app/globals.css`
- **Fonts:** `src/app/layout.tsx`
- **Demo products and LKR prices:** `src/data/products.ts`
- **Product illustrations:** `src/components/storefront/product-art.tsx`
- **Campaign placeholders:** `public/images/` (see [asset licences](docs/ASSET-LICENSES.md))

The wordmark is typographic, so the provisional name and favicon can be replaced without changing layout components. Final logo assets, photography, product copy, contact details, and policy pages must be supplied before launch.

## Verification status

All of the following were run on 25 October 2026:

- ESLint: passed
- TypeScript `--noEmit`: passed
- Vitest: **6/6 tests passed**
- Playwright: **9/9 tests passed**
  - Mobile, tablet, and desktop screenshots
  - No horizontal overflow at 390, 768, 1440, 360, or 320 px
  - Skip link is the first keyboard stop
  - Mobile menu opens with the keyboard, keeps focus inside, and restores focus on Escape
  - Desktop navigation
  - No critical or serious Axe violations at desktop, mobile, or in the open mobile menu
- Next.js production build: passed; `/` and `/icon.svg` prerender as static routes

Automated Axe checks are not a substitute for a full manual WCAG audit, keyboard-only testing, or testing with assistive technology.

## Known Phase 1 limitations

- Navigation links are homepage anchors until Phase 2 adds real collection and product routes.
- Product cards and colour swatches are display-only.
- The bag indicator is intentionally disabled; cart behaviour begins in Phase 3.
- No product search, collection filtering, size selection, cart, checkout, or order creation.
- No customer or admin authentication.
- No policy, contact, shipping, or returns pages yet.
- Campaign photography is licensed stock placeholder material, not the brand's own shoot. Product artwork is original demo illustration.
- SEO is deliberately `noindex` at this stage; final metadata, structured data, sitemap, robots, and canonical strategy belong to Phase 7.

## Next phase

Phase 2 will add collection routes, product detail pages, image galleries, variant selection, stock states, size guidance, search, filtering, sorting, and related products using a typed catalogue model. Work will not begin until Phase 1 design approval.
