import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";

import {
  footerMoreNavigation,
  footerShopNavigation,
  siteConfig,
} from "@/config/site";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-[0.76rem] text-paper-soft transition-colors hover:text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink focus-visible:outline-none"
    >
      {children}
      <ArrowUpRight
        className="size-3 text-paper-soft transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="shell">
        <div className="flex items-center justify-between gap-6 border-b border-paper/15 py-6">
          <div className="flex items-center gap-2.5 text-[0.65rem] font-semibold tracking-[0.18em] text-paper-soft uppercase">
            <span aria-hidden="true" className="block size-1.5 bg-accent" />
            SS26 / First studies
          </div>
          <Link
            href="#top"
            className="group flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.16em] text-paper-soft uppercase transition-colors hover:text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink focus-visible:outline-none"
          >
            Back to top
            <ArrowUp
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="lg:col-span-8">
            <p className="max-w-xl font-editorial text-[1.6rem] leading-[1.15] tracking-[-0.015em] text-paper/70 italic sm:text-[2.05rem]">
              A slower kind of streetwear, for the long way home.
            </p>
            <p className="mt-5 text-[0.625rem] font-semibold tracking-[0.15em] text-paper-soft uppercase">
              {siteConfig.location} / {siteConfig.coordinates}
            </p>
            <p className="mt-10 font-display text-[clamp(4.5rem,14.6vw,14rem)] leading-[0.74] tracking-[-0.045em] uppercase">
              <span aria-hidden="true">
                {siteConfig.name}
                <span className="ml-[0.04em] inline-block size-[0.1em] bg-accent align-baseline" />
              </span>
              <span className="sr-only">{siteConfig.name}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:col-start-10">
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-paper-soft uppercase">
                Shop
              </p>
              <ul className="mt-5 space-y-3.5">
                {footerShopNavigation.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-paper-soft uppercase">
                More
              </p>
              <ul className="mt-5 space-y-3.5">
                {footerMoreNavigation.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-paper/15 py-6 text-[0.625rem] leading-relaxed tracking-[0.1em] text-paper-soft uppercase lg:grid-cols-3">
          <p>© 2026 Low Tide / Working name</p>
          <p className="lg:text-center">
            Design prototype / No orders are being taken
          </p>
          <p className="lg:text-right">
            <a
              href="https://unsplash.com/license"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-paper/20 underline-offset-4 transition-colors hover:text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              Placeholder photography via Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
