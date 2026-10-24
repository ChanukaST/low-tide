import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
};

export function SectionLabel({
  index,
  children,
  className,
  tone = "dark",
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.2em] uppercase",
        tone === "dark" ? "text-ink-soft" : "text-paper-soft",
        className,
      )}
    >
      <span className="block size-1.5 shrink-0 bg-accent" aria-hidden="true" />
      <span>{index}</span>
      <span
        className={cn(
          "h-px w-8",
          tone === "dark" ? "bg-ink/20" : "bg-paper/20",
        )}
        aria-hidden="true"
      />
      <span>{children}</span>
    </div>
  );
}
