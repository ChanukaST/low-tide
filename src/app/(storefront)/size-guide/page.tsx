import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { sizeGuides } from "@/data/size-guides";
import { Breadcrumbs } from "@/components/storefront/breadcrumbs";
import { SectionLabel } from "@/components/storefront/section-label";

export const metadata: Metadata = {
  title: "Size guide",
  description:
    "Demo garment measurements for LOW TIDE tees, fleece, and headwear. Replace with production measurements before launch.",
};

const measurementNotes = [
  {
    index: "01",
    title: "Measure flat",
    copy: "Lay a garment you already own flat on a table. Close any buttons and smooth the fabric without stretching it.",
  },
  {
    index: "02",
    title: "Chest",
    copy: "Measure straight across the chest, from underarm to underarm. This is a flat measurement, not a body circumference.",
  },
  {
    index: "03",
    title: "Length",
    copy: "Measure from the highest point of the shoulder down to the hem. For headwear, measure around the widest part of the head.",
  },
];

export default function SizeGuidePage() {
  return (
    <>
      <header className="border-b border-ink/15">
        <div className="shell pt-6 pb-12 lg:pb-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Size guide" }]}
          />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionLabel index="Fit">Measurements</SectionLabel>
              <h1 className="mt-7 font-display text-[clamp(3.8rem,9vw,8.2rem)] leading-[0.8] tracking-[-0.035em] uppercase">
                Size
                <br />
                <span className="font-editorial text-[0.82em] leading-none font-normal tracking-[-0.02em] lowercase italic">
                  guide
                </span>
                <span className="text-accent">.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="max-w-sm text-[0.95rem] leading-[1.7] text-ink-soft">
                Garment measurements for the first study. These are demo values,
                not production specifications.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {sizeGuides.map((guide) => (
                  <a
                    key={guide.id}
                    href={`#${guide.id}`}
                    className="inline-flex h-9 items-center border border-ink/20 px-3 text-[0.6rem] font-semibold tracking-[0.1em] text-ink-soft uppercase transition-colors hover:border-ink hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper focus-visible:outline-none"
                  >
                    {guide.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="shell py-16 lg:py-24">
        <section aria-labelledby="how-to-measure">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel index="01">How to measure</SectionLabel>
              <h2
                id="how-to-measure"
                className="mt-5 font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.85] tracking-[-0.03em] uppercase"
              >
                Start with a{" "}
                <span className="font-editorial text-[0.9em] leading-none font-normal tracking-[-0.02em] lowercase italic">
                  garment
                </span>
                .
              </h2>
            </div>
            <p className="max-w-sm text-[0.85rem] leading-relaxed text-ink-soft">
              Measurements are taken flat. Allow a small tolerance for
              hand-measured demo garments.
            </p>
          </div>

          <div className="mt-10 grid border-t border-ink/15 md:grid-cols-3">
            {measurementNotes.map((note) => (
              <div
                key={note.index}
                className="border-b border-ink/15 py-5 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
                    {note.title}
                  </h3>
                  <span className="text-[0.6rem] tracking-[0.12em] text-ink-soft">
                    {note.index}
                  </span>
                </div>
                <p className="mt-3 text-[0.8rem] leading-[1.65] text-ink-soft">
                  {note.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20 space-y-20 lg:mt-28 lg:space-y-28">
          {sizeGuides.map((guide, index) => (
            <section
              key={guide.id}
              id={guide.id}
              aria-labelledby={`${guide.id}-title`}
              className="scroll-mt-24 border-t border-ink/15 pt-8 lg:pt-12"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <SectionLabel index={`0${index + 2}`}>
                    Measurements
                  </SectionLabel>
                  <h2
                    id={`${guide.id}-title`}
                    className="mt-4 font-display text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[0.85] tracking-[-0.03em] uppercase"
                  >
                    {guide.name}
                    <span className="text-accent">.</span>
                  </h2>
                  <p className="mt-4 max-w-xl text-[0.88rem] leading-relaxed text-ink-soft">
                    {guide.description}
                  </p>
                </div>
                <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
                  <p className="text-[0.6rem] font-semibold tracking-[0.14em] text-ink-soft uppercase">
                    {guide.unit} 1 in = 2.54 cm
                  </p>
                </div>
              </div>

              <p className="mt-6 flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.12em] text-ink-soft uppercase md:hidden">
                Swipe the table to see all measurements
                <span aria-hidden="true">→</span>
              </p>

              <div
                className="mt-2 overflow-x-auto border border-ink/15 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none md:mt-8"
                role="region"
                aria-label={`${guide.name} measurements`}
                tabIndex={0}
              >
                <table className="w-full min-w-[40rem] border-collapse text-left">
                  <caption className="sr-only">
                    {guide.name} garment measurements in inches
                  </caption>
                  <thead>
                    <tr className="border-b border-ink/20 bg-ink/[0.025]">
                      {guide.columns.map((column) => (
                        <th
                          key={column}
                          scope="col"
                          className="px-4 py-3 text-[0.6rem] font-semibold tracking-[0.12em] text-ink-soft uppercase"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guide.rows.map((row) => (
                      <tr
                        key={row.label}
                        className="border-b border-ink/10 last:border-b-0"
                      >
                        <th
                          scope="row"
                          className="px-4 py-4 text-[0.7rem] font-semibold tracking-[0.1em] uppercase"
                        >
                          {row.label}
                        </th>
                        {row.values.map((value, valueIndex) => (
                          <td
                            key={`${row.label}-${valueIndex}`}
                            className="px-4 py-4 text-[0.78rem] text-ink-soft tabular-nums"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="mt-5 grid gap-2 text-[0.8rem] leading-relaxed text-ink-soft sm:grid-cols-2">
                {guide.notes.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 block size-1 shrink-0 bg-accent"
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-20 border border-ink/15 bg-ink p-6 text-paper sm:p-8 lg:mt-28">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.6rem] font-semibold tracking-[0.16em] text-accent uppercase">
                Demo notice
              </p>
              <p className="mt-3 max-w-xl text-[0.92rem] leading-relaxed text-paper-soft">
                These measurements are placeholders for the design prototype.
                Confirm every value against production samples before publishing
                the store or accepting orders.
              </p>
            </div>
            <Link
              href="/collections/first-studies"
              className="group inline-flex shrink-0 items-center gap-2 border border-paper/30 px-4 py-3 text-[0.62rem] font-semibold tracking-[0.14em] text-paper uppercase transition-colors hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink focus-visible:outline-none"
            >
              Back to the collection
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
