import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper">
      <div className="shell flex h-9 items-center justify-between gap-4 text-[0.65rem] font-medium tracking-[0.15em] uppercase sm:tracking-[0.18em]">
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="block size-1.5 bg-accent" />
          Phase 02 / Demo storefront
        </span>
        <span className="hidden text-paper-soft md:block">
          {siteConfig.season} — First studies
        </span>
        <span className="hidden text-paper-soft sm:block">
          {siteConfig.location}
        </span>
        <span className="text-paper-soft sm:hidden">SS26</span>
      </div>
    </div>
  );
}
