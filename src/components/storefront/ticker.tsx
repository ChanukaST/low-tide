"use client";

import { motion, useReducedMotion } from "motion/react";

const phrases = [
  "SS26 — First studies",
  "Independent streetwear",
  "Colombo, Sri Lanka",
  "Five demo pieces",
  "Cash on delivery / planned",
];

function TickerRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {phrases.map((phrase) => (
        <span
          key={phrase}
          className="flex items-center gap-6 px-6 text-[0.65rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase sm:px-8"
        >
          {phrase}
          <span
            aria-hidden="true"
            className="block size-1.5 shrink-0 bg-accent"
          />
        </span>
      ))}
    </div>
  );
}

export function Ticker() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden border-y border-paper/10 bg-ink py-3.5 text-paper">
      <p className="sr-only">
        SS26 first studies. Independent streetwear from Colombo, Sri Lanka. Five
        demo pieces. Cash on delivery planned.
      </p>
      <motion.div
        className="flex w-max"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 36,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }
        }
      >
        <TickerRow ariaHidden />
        <TickerRow ariaHidden />
      </motion.div>
    </div>
  );
}
