import Link from "next/link";
import { Search } from "lucide-react";

import { navigation } from "@/config/site";
import { CartBagLink } from "@/components/cart/cart-bag-link";
import { AnnouncementBar } from "@/components/storefront/announcement-bar";
import { MobileNav } from "@/components/storefront/mobile-nav";
import { Wordmark } from "@/components/storefront/wordmark";

export function SiteHeader() {
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/95 backdrop-blur-md">
        <div className="shell grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-[4.5rem] lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="w-fit justify-self-start focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper focus-visible:outline-none"
            aria-label="LOW TIDE home"
          >
            <Wordmark className="text-[1.45rem] lg:text-[1.65rem]" />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-8"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-2 text-[0.68rem] font-semibold tracking-[0.18em] uppercase focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper focus-visible:outline-none"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-[width] duration-300 group-hover:w-full"
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 justify-self-end lg:gap-5">
            <Link
              href="/search"
              aria-label="Search products"
              className="flex size-10 items-center justify-center border border-transparent transition-colors hover:border-ink/15 hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
            >
              <Search
                className="size-[1.1rem]"
                strokeWidth={1.4}
                aria-hidden="true"
              />
            </Link>
            <CartBagLink />
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
