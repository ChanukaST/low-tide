import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SearchForm({ query }: { query: string }) {
  return (
    <form action="/search" method="get" role="search" className="w-full">
      <label
        htmlFor="catalog-search"
        className="text-[0.62rem] font-semibold tracking-[0.18em] text-ink uppercase"
      >
        Search the catalogue
      </label>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <input
            id="catalog-search"
            name="q"
            type="search"
            defaultValue={query}
            maxLength={80}
            placeholder="Try “oversized tee”, “fleece” or “ink”"
            autoComplete="off"
            className="h-14 w-full border border-ink/25 bg-transparent pr-4 pl-11 text-base text-ink placeholder:text-ink-soft/80 focus:border-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
          />
        </div>
        <Button type="submit" size="lg" className="h-14 sm:min-w-28">
          Search
        </Button>
      </div>
      <p className="mt-3 text-[0.6rem] leading-relaxed text-ink-soft">
        Search the demo catalogue by piece, colour, collection or design note.
      </p>
    </form>
  );
}
