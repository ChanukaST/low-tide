import type { ReactNode } from "react";

import { SiteFooter } from "@/components/storefront/site-footer";
import { SiteHeader } from "@/components/storefront/site-header";

export default function StorefrontLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div id="top">
      <a
        href="#main-content"
        className="skip-link fixed top-3 left-3 z-[100] bg-ink px-4 py-3 text-[0.65rem] font-semibold tracking-[0.16em] text-paper uppercase"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
