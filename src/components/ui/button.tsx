import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 border text-center text-[0.76rem] font-semibold tracking-[0.16em] whitespace-nowrap uppercase transition-[background-color,border-color,color] duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid:
          "border-ink bg-ink text-paper hover:border-accent hover:bg-accent hover:text-ink",
        outline:
          "border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
        inverse:
          "border-paper bg-paper text-ink hover:border-accent hover:bg-accent hover:text-ink",
        ghost:
          "border-transparent bg-transparent text-ink hover:border-ink/20 hover:bg-ink/[0.04]",
      },
      size: {
        sm: "h-10 px-4",
        default: "h-12 px-6",
        lg: "h-14 px-7",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
