import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Centred label flanked by short rules. `tone` picks the pairing: "dark" for
 * the blue panels, "light" for the navy sections.
 */
export function SectionEyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-3 text-[10px] tracking-[0.25em] uppercase",
        tone === "dark" ? "text-brand-primary/80" : "text-brand-secondary",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-8",
          tone === "dark" ? "bg-brand-primary/40" : "bg-brand-secondary/60",
        )}
      />
      {children}
      <span
        aria-hidden
        className={cn(
          "h-px w-8",
          tone === "dark" ? "bg-brand-primary/40" : "bg-brand-secondary/60",
        )}
      />
    </p>
  );
}
