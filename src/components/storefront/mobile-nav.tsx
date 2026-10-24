"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { navigation, siteConfig } from "@/config/site";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "@/components/storefront/wordmark";

const utilityLinks = [
  { label: "Search", href: "/search" },
  { label: "Size guide", href: "/size-guide" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex size-10 items-center justify-center border border-ink/15 transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" strokeWidth={1.5} />
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader className="border-b border-ink/15 p-6 pr-20 pb-8">
          <Wordmark className="text-2xl" />
          <SheetTitle className="sr-only">Site navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate to sections of the {siteConfig.name} storefront.
          </SheetDescription>
          <p className="mt-6 text-[0.65rem] font-semibold tracking-[0.2em] text-ink-soft uppercase">
            {siteConfig.season} / Index
          </p>
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="flex flex-col px-6">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-ink/15 py-5 transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <span className="flex items-baseline gap-4">
                <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-ink-soft">
                  0{index + 1}
                </span>
                <span className="font-display text-[clamp(2.35rem,8.5vw,3.5rem)] leading-[0.9] tracking-[-0.035em] uppercase">
                  {item.label}
                </span>
              </span>
              <ArrowUpRight
                className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.4}
              />
            </Link>
          ))}
        </nav>

        <div className="flex gap-6 px-6 py-5">
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-[0.65rem] font-semibold tracking-[0.16em] text-ink-soft uppercase underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t border-ink/15 p-6">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-ink-soft uppercase">
                Location
              </p>
              <p className="mt-2 text-sm">{siteConfig.location}</p>
            </div>
            <div className="text-right">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-ink-soft uppercase">
                Status
              </p>
              <p className="mt-2 text-sm">Design prototype</p>
            </div>
          </div>
          <p className="mt-8 border-t border-ink/10 pt-4 text-[0.68rem] leading-relaxed tracking-[0.04em] text-ink-soft">
            No orders are being taken. Products, prices and imagery are
            placeholders.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
