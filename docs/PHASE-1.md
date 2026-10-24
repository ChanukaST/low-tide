# Phase 1 — Visual prototype and storefront foundation

**Status:** Complete, awaiting design approval.  
**Date:** 25 October 2026  
**Scope:** Storefront visual foundation only. No backend, database, authentication, cart, checkout, or payments.

## Objective delivered

Establish a distinctive brand direction and a responsive, maintainable homepage that can carry the real catalogue in later phases. The prototype must look intentional at mobile, tablet, and desktop sizes and stay easy to replace with final brand assets.

## Implemented components

| Component            | Location                                    | Purpose                                                                |
| -------------------- | ------------------------------------------- | ---------------------------------------------------------------------- |
| `SiteHeader`         | `src/components/storefront/site-header.tsx` | Sticky header, desktop navigation, demo status, disabled bag indicator |
| `AnnouncementBar`    | `announcement-bar.tsx`                      | Demo phase and location strip                                          |
| `MobileNav`          | `mobile-nav.tsx`                            | Accessible Radix Dialog/Sheet navigation                               |
| `Wordmark`           | `wordmark.tsx`                              | Central provisional typographic mark                                   |
| `Hero`               | `hero.tsx`                                  | Editorial headline, campaign artwork, primary CTAs                     |
| `Ticker`             | `ticker.tsx`                                | Motion loop with reduced-motion fallback                               |
| `FeaturedCollection` | `featured-collection.tsx`                   | Capsule introduction and product index                                 |
| `ProductCard`        | `product-card.tsx`                          | Reusable demo product tile                                             |
| `ProductArt`         | `product-art.tsx`                           | Original inline SVG garment studies                                    |
| `NewArrivals`        | `new-arrivals.tsx`                          | Five-product presentation and mobile end-cap                           |
| `BrandStory`         | `brand-story.tsx`                           | Provisional point of view and campaign image                           |
| `SiteFooter`         | `site-footer.tsx`                           | Closing brand block and secondary navigation                           |
| `SectionLabel`       | `section-label.tsx`                         | Consistent numbered editorial section labels                           |
| `Button`, `Sheet`    | `src/components/ui/`                        | shadcn/ui-style reusable primitives                                    |

## Design system

- **Palette:** bone `#f3efe5`, ink `#111110`, safety orange `#ff4b1f`
- **Accessible secondary text tokens:** `ink-soft` (65% ink on paper) and `paper-soft` (60% paper on ink)
- **Display type:** Anton
- **UI/body type:** Archivo
- **Editorial accents:** Instrument Serif, italic
- **Layout:** max-width 1600 px shell with responsive gutters; asymmetric 12-column editorial grids
- **Motion:** CSS entrance/reveal animations with reduced-motion guards; Motion used only for the running ticker
- **Radii:** square corners throughout; no generic card treatment
- **Imagery:** locally hosted stock campaign placeholders and original vector garment studies

## Routes

Only `/` exists in Phase 1. Header/footer navigation uses in-page anchors until the catalogue routes are introduced in Phase 2.

## Verification

### Automated checks

| Check                                                         | Result                         |
| ------------------------------------------------------------- | ------------------------------ |
| `prettier --check .`                                          | Passed                         |
| `tsc --noEmit`                                                | Passed                         |
| ESLint                                                        | Passed                         |
| Vitest (`src/lib/money.test.ts`, `src/data/products.test.ts`) | 6/6 passed                     |
| Next.js production build                                      | Passed; `/` prerendered static |
| Playwright suite                                              | 9/9 passed                     |

### Responsive checks

- Screenshots captured at 390×844, 768×1024, and 1440×900.
- No document-level horizontal overflow at 390, 768, 1440, 360, or 320 px.
- Skip link is the first keyboard stop and moves focus to main content.
- Mobile menu tested at 390 px: opens via keyboard, keeps focus inside the dialog, Escape closes it, and focus returns to the menu trigger.
- Desktop primary navigation tested, including anchor navigation.
- Mobile menu screenshot captured.

Review screenshots:

- [Desktop](../screenshots/phase-1/desktop.png)
- [Tablet](../screenshots/phase-1/tablet.png)
- [Mobile](../screenshots/phase-1/mobile.png)
- [Mobile menu](../screenshots/phase-1/mobile-menu.png)

### Accessibility checks

Automated Axe scans report no critical or serious violations:

- Homepage at desktop width
- Homepage at mobile width
- Open mobile navigation dialog

The sheet is keyboard-operable, retains Radix focus management, and has an accessible title/description. A visible skip link is the first keyboard stop. All page images have descriptive alt text; demo labels are explicit. Focus-visible styling is present on interactive elements.

**Caveat:** Automated scans do not replace manual screen-reader testing, full keyboard traversal, contrast verification over photographic areas, or a complete WCAG audit. Those should be completed before launch.

## Known limitations

1. All products, prices, colourways, sizes, and inventory language are demo content.
2. Product cards are not yet navigable; product detail routes start in Phase 2.
3. The bag is a disabled display element because cart functionality belongs to Phase 3.
4. Navigation uses anchors on the single homepage, not catalogue routes.
5. Campaign photography is Unsplash placeholder imagery, not brand-owned photography. It must be replaced before launch; model/property releases are not verified.
6. Product images are intentional vector studies rather than photographs of physical samples.
7. Footer does not yet link to policies, contact, shipping, or returns.
8. Root metadata deliberately sets `robots: noindex, nofollow` while this is a prototype.
9. No backend, auth, admin, cart, checkout, or payment integration exists.
10. No customer accounts are planned for v1; checkout will be guest-only.

## Phase 2 entry criteria

Design approval of the Phase 1 storefront direction, including:

- provisional wordmark and LOW TIDE working name
- typography and monochrome/orange palette
- hero composition and campaign tone
- product-card art direction
- section rhythm and footer treatment
- desktop/tablet/mobile layouts

Phase 2 will introduce typed catalogue data, collection pages, product detail pages, galleries, size/colour variants, stock states, size guide, search, filtering, sorting, and related products. It will not add a backend yet.
