import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/15">
      <div className="grid lg:grid-cols-[0.96fr_1.04fr]">
        <div className="relative flex flex-col px-5 pt-10 pb-8 sm:px-8 lg:min-h-[calc(100svh-7.25rem)] lg:px-12 lg:pt-12 lg:pb-9 xl:px-16">
          <div className="flex items-start justify-between text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
            <span className="flex items-center gap-2.5 text-ink-soft">
              <span aria-hidden="true" className="block size-1.5 bg-accent" />
              Independent streetwear / LK
            </span>
            <span className="text-ink-soft">{siteConfig.season}</span>
          </div>

          <div className="mt-16 sm:mt-20 lg:mt-auto lg:pt-12">
            <p className="animate-rise text-[0.68rem] font-semibold tracking-[0.2em] text-ink-soft uppercase">
              A first study in island streetwear
            </p>

            <h1 className="mt-5 font-display text-[clamp(4rem,10vw,9.8rem)] leading-[0.8] tracking-[-0.035em] uppercase">
              <span className="animate-rise block">Move</span>
              <span className="animate-rise animate-delay-1 mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-0">
                <span className="font-editorial text-[0.46em] leading-none font-normal tracking-[-0.01em] text-ink-soft lowercase italic">
                  like
                </span>
                <span className="whitespace-nowrap">
                  Water<span className="text-accent">.</span>
                </span>
              </span>
            </h1>

            <div className="animate-rise animate-delay-2 mt-8 grid gap-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-10">
              <p className="max-w-[26rem] text-[0.95rem] leading-[1.65] text-ink-soft sm:text-[1rem]">
                Loose silhouettes, weathered tones, and the long way home. A
                provisional collection of five pieces, built around volume,
                restraint, and room to move.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-stretch">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href="#new-arrivals">
                    Explore the first drop
                    <ArrowDown
                      className="size-4 transition-transform duration-300 group-hover/button:translate-y-1"
                      strokeWidth={1.6}
                    />
                  </a>
                </Button>
                <a
                  href="#story"
                  className="group inline-flex h-11 items-center justify-center gap-2 text-[0.68rem] font-semibold tracking-[0.16em] uppercase underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  Read the story
                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.6}
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 border-t border-ink/15 pt-5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase lg:mt-14">
            <div>
              <p className="text-ink-soft">Capsule</p>
              <p className="mt-1.5">05 pieces</p>
            </div>
            <div>
              <p className="text-ink-soft">Status</p>
              <p className="mt-1.5">Design demo</p>
            </div>
            <div>
              <p className="text-ink-soft">Fulfilment</p>
              <p className="mt-1.5">COD / planned</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[31rem] overflow-hidden border-t border-ink/15 sm:min-h-[42rem] lg:min-h-0 lg:border-t-0 lg:border-l">
          <Image
            src="/images/campaign-collection.jpg"
            alt="Placeholder campaign photograph of a model in a cropped hoodie and relaxed track pants on an outdoor court."
            fill
            preload
            quality={85}
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="animate-image-reveal object-cover object-[50%_42%] brightness-[0.88] contrast-[1.07] grayscale sm:object-[50%_18%] lg:object-[50%_42%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,9,0.10)_0%,rgba(10,10,9,0)_36%,rgba(10,10,9,0.4)_100%)]"
          />
          <div
            aria-hidden="true"
            className="grain absolute inset-0 opacity-[0.12] mix-blend-screen"
          />

          <div className="absolute top-5 left-5 flex items-center gap-2 border border-paper/40 bg-ink/55 px-3 py-2 text-[0.625rem] font-semibold tracking-[0.18em] text-paper uppercase backdrop-blur-sm sm:top-6 sm:left-6">
            <span aria-hidden="true" className="block size-1.5 bg-accent" />
            Campaign / 001
          </div>

          <div className="absolute top-5 right-5 hidden h-16 w-16 flex-col justify-between bg-accent p-2.5 text-ink sm:top-6 sm:right-6 sm:flex">
            <span className="text-[0.625rem] font-semibold tracking-[0.16em] uppercase">
              SS26
            </span>
            <span className="font-display text-xl leading-none">01</span>
          </div>

          <div className="absolute right-5 bottom-5 left-5 border border-paper/25 bg-ink/80 p-5 text-paper backdrop-blur-sm sm:right-6 sm:bottom-6 sm:left-6 sm:max-w-[22rem] sm:p-6">
            <p className="font-editorial text-[1.55rem] leading-[1.05] tracking-[-0.01em] italic sm:text-[1.8rem]">
              A study in heat, movement and quiet confidence.
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-paper/15 pt-3 text-[0.625rem] font-semibold tracking-[0.18em] text-paper-soft uppercase">
              <span>Placeholder campaign</span>
              <span>Colombo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
