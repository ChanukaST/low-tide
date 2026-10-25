import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Breadcrumbs } from "@/components/storefront/breadcrumbs";
import { SectionLabel } from "@/components/storefront/section-label";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Checkout is not active in the LOW TIDE Phase 3 prototype. No order can be placed yet.",
};

export default function CheckoutPage() {
  return (
    <>
      <header className="border-b border-ink/15">
        <div className="shell pt-6 pb-12 lg:pb-16">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Bag", href: "/cart" },
              { label: "Checkout" },
            ]}
          />

          <div className="mt-10">
            <SectionLabel index="Checkout">Phase 5</SectionLabel>
            <h1 className="mt-6 font-display text-[clamp(3.4rem,9vw,8.4rem)] leading-[0.78] tracking-[-0.045em] uppercase">
              Checkout
              <span className="text-accent">.</span>
            </h1>
          </div>
        </div>
      </header>

      <section className="shell py-12 lg:py-20">
        <div className="mx-auto max-w-2xl border border-ink/15 px-6 py-14 text-center sm:px-12 sm:py-20">
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-accent uppercase">
            Not open yet
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.88] tracking-[-0.03em] uppercase">
            No order
            <br />
            <span className="font-editorial lowercase italic">
              can be placed
            </span>
            <span className="text-accent">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[0.92rem] leading-[1.75] text-ink-soft">
            The bag is active in this phase, but checkout is intentionally a
            Phase 3 placeholder. Order capture, delivery details, cash on
            delivery, and authoritative price and stock validation arrive in
            Phase 5.
          </p>
          <p className="mt-4 text-[0.68rem] leading-relaxed text-ink-soft">
            No payment details are requested. No order has been created.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/cart">
                Return to bag
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
            </Button>
            <Link
              href="/collections/first-studies"
              className="group inline-flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.14em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              Continue browsing
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
