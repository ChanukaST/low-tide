"use client";

import { useState } from "react";

import type { GarmentArtKind, ProductImage } from "@/types/catalog";
import { cn } from "@/lib/utils";
import { ProductArt } from "@/components/storefront/product-art";

type ProductGalleryProps = {
  productName: string;
  artKind: GarmentArtKind;
  images: ProductImage[];
};

function GalleryArt({
  artKind,
  image,
  decorative = false,
}: {
  artKind: GarmentArtKind;
  image: ProductImage;
  decorative?: boolean;
}) {
  const isDetail = image.kind === "detail";
  const style = isDetail
    ? {
        transform: `scale(${image.zoom ?? 1.8})`,
        transformOrigin: `${image.focusX ?? 50}% ${image.focusY ?? 50}%`,
      }
    : undefined;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: image.background }}
    >
      <div className="absolute inset-0" style={style}>
        <ProductArt
          artKind={artKind}
          background={image.background}
          foreground={image.foreground}
          name={image.alt}
          minimal={isDetail}
          decorative={decorative}
        />
      </div>
    </div>
  );
}

export function ProductGallery({
  productName,
  artKind,
  images,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] ?? images[0];

  if (!selectedImage) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-[4.75rem_minmax(0,1fr)] lg:items-start">
      <div
        role="group"
        aria-label={`${productName} images`}
        className="order-2 grid grid-cols-3 gap-2 lg:order-1 lg:flex lg:flex-col lg:gap-3"
      >
        {images.map((image, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-pressed={isActive}
              aria-controls="product-gallery-panel"
              className="group/thumb block w-full text-left focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
            >
              <div
                className={cn(
                  "relative aspect-[4/5] w-full overflow-hidden border-2 transition-[border-color,opacity]",
                  isActive
                    ? "border-ink"
                    : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <GalleryArt artKind={artKind} image={image} decorative />
                <span
                  className={cn(
                    "absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-[0.14em] uppercase backdrop-blur-sm",
                    isActive
                      ? "bg-ink text-paper"
                      : "bg-paper/85 text-ink-soft",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <span
                className={cn(
                  "mt-1.5 block px-0.5 text-[0.55rem] font-semibold tracking-[0.1em] uppercase",
                  isActive ? "text-ink" : "text-ink-soft",
                )}
              >
                {image.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="product-gallery-panel"
        className="relative order-1 aspect-[4/5] overflow-hidden border border-ink/15 bg-paper lg:order-2"
        data-testid="product-gallery"
        data-gallery-image={selectedImage.id}
      >
        <div key={selectedImage.id} className="gallery-image absolute inset-0">
          <GalleryArt artKind={artKind} image={selectedImage} />
        </div>

        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-4 sm:inset-x-5 sm:top-5">
          <span className="border border-ink/15 bg-paper/90 px-2.5 py-1.5 text-[0.625rem] font-semibold tracking-[0.15em] text-ink uppercase backdrop-blur-sm">
            {String(selectedIndex + 1).padStart(2, "0")} / {selectedImage.label}
          </span>
          <span className="bg-accent px-2.5 py-1.5 text-[0.55rem] font-semibold tracking-[0.15em] text-ink uppercase">
            Demo artwork
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 border-t border-ink/15 pt-3 text-[0.55rem] font-semibold tracking-[0.15em] text-ink-soft uppercase sm:inset-x-5 sm:bottom-5">
          <span>LOW TIDE / SS26</span>
          <span>Study / {String(images.length).padStart(2, "0")}</span>
        </div>

        <p aria-live="polite" className="sr-only">
          Viewing {selectedImage.label}.
        </p>
      </div>
    </div>
  );
}
