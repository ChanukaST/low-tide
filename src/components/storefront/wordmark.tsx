import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

type WordmarkProps = {
  className?: string;
  markClassName?: string;
};

export function Wordmark({ className, markClassName }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-start gap-1 font-display text-[1.55rem] leading-none tracking-[-0.035em] whitespace-nowrap uppercase",
        className,
      )}
    >
      <span>{siteConfig.name}</span>
      <span
        aria-hidden="true"
        className={cn("mt-1 block size-1.5 bg-accent", markClassName)}
      />
    </span>
  );
}
