import Image from "next/image";

import { SectionLabel } from "@/components/storefront/section-label";

const principles = [
  {
    index: "01",
    title: "Volume",
    copy: "Room to move, with silhouettes that hold their own space.",
  },
  {
    index: "02",
    title: "Restraint",
    copy: "Ink, stone and bone. A palette that leaves the noise outside.",
  },
  {
    index: "03",
    title: "Repetition",
    copy: "A small wardrobe of pieces designed to live together.",
  },
];

export function BrandStory() {
  return (
    <section
      id="story"
      className="scroll-mt-24 overflow-hidden border-b border-ink/15 bg-paper"
    >
      <div className="shell py-20 lg:py-28">
        <div className="flex items-center justify-between gap-6 border-b border-ink/15 pb-5">
          <SectionLabel index="03">Point of view</SectionLabel>
          <span className="hidden text-[0.625rem] font-semibold tracking-[0.16em] text-ink-soft uppercase sm:block">
            An independent study / not yet in production
          </span>
        </div>

        <div className="grid gap-14 pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-16">
          <div className="lg:col-span-7 lg:pr-8">
            <p className="max-w-xl font-editorial text-[1.65rem] leading-[1.15] tracking-[-0.015em] text-ink/70 italic sm:text-[2rem]">
              Between the city and the sea, there is a slower rhythm.
            </p>

            <h2 className="mt-8 font-display text-[clamp(3.5rem,7.3vw,6.9rem)] leading-[0.82] tracking-[-0.035em] uppercase">
              <span className="block">Dress for</span>
              <span className="block">
                the{" "}
                <span className="font-editorial text-[0.82em] leading-none font-normal tracking-[-0.02em] lowercase italic">
                  long
                </span>
              </span>
              <span className="block">
                Way home<span className="text-accent">.</span>
              </span>
            </h2>

            <div className="mt-10 grid max-w-2xl gap-5 text-[0.95rem] leading-[1.75] text-ink-soft sm:grid-cols-2 sm:gap-8">
              <p>
                LOW TIDE is a working name and a question: what does a wardrobe
                look like when it is designed for heat, movement, and the long
                way home?
              </p>
              <p>
                The first study is deliberately small. Five pieces, drawn from
                ink, stone and bone. Generous proportions, quiet graphics, and
                room for the day to happen.
              </p>
            </div>

            <div className="mt-12 grid border-t border-ink/15 sm:grid-cols-3">
              {principles.map((principle) => (
                <div
                  key={principle.index}
                  className="border-b border-ink/15 py-5 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[0.68rem] font-semibold tracking-[0.17em] uppercase">
                      {principle.title}
                    </h3>
                    <span className="text-[0.625rem] tracking-[0.16em] text-ink-soft">
                      {principle.index}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.76rem] leading-[1.6] text-ink-soft">
                    {principle.copy}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-md text-[0.65rem] leading-relaxed font-medium tracking-[0.08em] text-ink-soft uppercase">
              This is a design prototype. The collection is not in production
              and the campaign imagery is placeholder material.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative min-h-[30rem] overflow-hidden bg-ink sm:min-h-[42rem] lg:min-h-[47rem]">
              <Image
                src="/images/campaign-story.jpg"
                alt="Placeholder campaign image of a model in a leather jacket against a brick building."
                fill
                quality={85}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_35%] brightness-[0.9] contrast-[1.05] grayscale"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,9,0.12)_0%,rgba(10,10,9,0)_40%,rgba(10,10,9,0.6)_100%)]"
              />
              <div
                aria-hidden="true"
                className="grain absolute inset-0 opacity-[0.12] mix-blend-screen"
              />
              <div className="absolute top-5 left-5 flex items-center gap-2 border border-paper/35 bg-ink/55 px-3 py-2 text-[0.625rem] font-semibold tracking-[0.16em] text-paper uppercase backdrop-blur-sm lg:top-6 lg:left-6">
                <span aria-hidden="true" className="block size-1.5 bg-accent" />
                Campaign / 002
              </div>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 border-t border-paper/25 pt-4 text-paper lg:inset-x-6 lg:bottom-6">
                <div>
                  <p className="text-[0.625rem] font-semibold tracking-[0.16em] text-paper/80 uppercase">
                    Study 02 / Placeholder imagery
                  </p>
                  <p className="mt-2 font-editorial text-[1.55rem] leading-none italic sm:text-[1.8rem]">
                    The long way home.
                  </p>
                </div>
                <span
                  className="mb-1 block size-8 shrink-0 bg-accent"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-8 text-[0.625rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">
              <span>Colombo / after hours</span>
              <span className="text-right">Demo visual</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
