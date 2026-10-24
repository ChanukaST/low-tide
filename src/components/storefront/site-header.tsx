import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { navigation } from "@/config/site";
import { AnnouncementBar } from "@/components/storefront/announcement-bar";
import { MobileNav } from "@/components/storefront/mobile-nav";
import { Wordmark } from "@/components/storefront/wordmark";

export function SiteHeader() {
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur-md">
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="w-fit justify-self-start focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper focus-visible:outline-none"
            aria-label="LOW TIDE home"
          >
            <Wordmark className="text-[1.45rem] lg:text-[1.65rem]" />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-2 text-[0.68rem] font-semibold tracking-[0.18em] uppercase focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper focus-visible:outline-none"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 justify-self-end lg:gap-6">
            <span className="hidden text-[0.65rem] font-semibold tracking-[0.18em] text-ink-soft uppercase sm:block">
              Demo / 01
            </span>
            <button
              type="button"
              disabled
              title="Cart functionality arrives in Phase 3"
              className="flex cursor-not-allowed items-center gap-2 text-[0.68rem] font-semibold tracking-[0.16em] uppercase"
              aria-label="Shopping bag, empty. Cart functionality will be added in Phase 3."
            >
              <ShoppingBag
                className="size-[1.1rem]"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <span className="hidden sm:inline">Bag</span>
              <span className="text-ink-soft">(0)</span>
            </button>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
