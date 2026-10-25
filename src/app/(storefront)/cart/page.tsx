import type { Metadata } from "next";

import { getCartCatalog } from "@/lib/cart-catalog";
import { CartView } from "@/components/cart/cart-view";
import { Breadcrumbs } from "@/components/storefront/breadcrumbs";
import { SectionLabel } from "@/components/storefront/section-label";

export const metadata: Metadata = {
  title: "Bag",
  description:
    "Review the pieces in your LOW TIDE demo bag and continue to checkout.",
};

export default function CartPage() {
  const catalog = getCartCatalog();

  return (
    <>
      <header className="border-b border-ink/15">
        <div className="shell pt-6 pb-12 lg:pb-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Bag" }]}
          />

          <div className="mt-10 grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <SectionLabel index="Bag">Your selection</SectionLabel>
              <h1 className="mt-6 font-display text-[clamp(3.4rem,9vw,8.4rem)] leading-[0.78] tracking-[-0.045em] uppercase">
                Your bag
                <span className="text-accent">.</span>
              </h1>
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="max-w-xs text-[0.82rem] leading-[1.7] text-ink-soft">
                Pieces are held in this browser. Checkout, payment and final
                stock validation arrive in Phase 5.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="shell py-10 lg:py-14">
        <CartView catalog={catalog} />
      </section>
    </>
  );
}
