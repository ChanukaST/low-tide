# Asset licences

This document records the provenance of current Phase 1 assets. It is not legal advice. Re-check every licence before commercial launch.

## Campaign photography (placeholder)

The following photographs are local copies served from `public/images/`. They were downloaded on 25 October 2026 and are used under the [Unsplash License](https://unsplash.com/license), which permits free commercial and non-commercial use. Attribution is not required by the licence but is recorded here for traceability.

| Local file                | Source image ID                    | Source URL                                                                          | Use                             |
| ------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------- |
| `campaign-collection.jpg` | `photo-1515886657613-9f3515b0c78f` | [images.unsplash.com](https://images.unsplash.com/photo-1515886657613-9f3515b0c78f) | Hero campaign placeholder       |
| `campaign-hero.jpg`       | `photo-1523398002811-999ca8dec234` | [images.unsplash.com](https://images.unsplash.com/photo-1523398002811-999ca8dec234) | Featured collection placeholder |
| `campaign-story.jpg`      | `photo-1520975954732-35dd22299614` | [images.unsplash.com](https://images.unsplash.com/photo-1520975954732-35dd22299614) | Brand story placeholder         |

**Important:** these are stock placeholder photographs. They are not original brand campaign imagery and do not depict the demo garments. The Unsplash License does not grant rights to imply that depicted people endorse LOW TIDE. Replace all three images with an original campaign shoot before launch and verify model/property releases.

## Original vector artwork

All garment illustrations in `src/components/storefront/product-art.tsx` and the provisional favicon at `src/app/icon.svg` were created for this project. They are demo design studies, not technical product renderings.

## Fonts

Fonts are self-hosted at build time through `next/font/google`:

| Font             | Use                            | Licence                                                  |
| ---------------- | ------------------------------ | -------------------------------------------------------- |
| Anton            | Display headlines and wordmark | [SIL Open Font License 1.1](https://openfontlicense.org) |
| Archivo          | Body and interface             | [SIL Open Font License 1.1](https://openfontlicense.org) |
| Instrument Serif | Editorial italic accents       | [SIL Open Font License 1.1](https://openfontlicense.org) |

Source specimens:

- https://fonts.google.com/specimen/Anton
- https://fonts.google.com/specimen/Archivo
- https://fonts.google.com/specimen/Instrument+Serif

## Runtime policy

No image or font hotlinks are used at runtime. Campaign images are stored in the repository and optimized by Next.js; font files are self-hosted by the framework.
