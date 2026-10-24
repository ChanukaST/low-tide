export function CatalogSkeleton() {
  return (
    <div aria-hidden="true" className="py-8 motion-reduce:animate-none">
      <div className="h-20 animate-pulse border-y border-ink/10 bg-ink/[0.025] motion-reduce:animate-none" />
      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="aspect-[4/5] animate-pulse bg-ink/[0.06] motion-reduce:animate-none" />
            <div className="h-4 w-3/4 animate-pulse bg-ink/[0.06] motion-reduce:animate-none" />
            <div className="h-3 w-1/2 animate-pulse bg-ink/[0.06] motion-reduce:animate-none" />
          </div>
        ))}
      </div>
      <p className="sr-only" role="status">
        Loading the catalogue.
      </p>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div aria-hidden="true" className="py-8 motion-reduce:animate-none">
      <div className="h-16 w-full max-w-2xl animate-pulse bg-ink/[0.06] motion-reduce:animate-none" />
      <p className="sr-only" role="status">
        Loading search.
      </p>
    </div>
  );
}
