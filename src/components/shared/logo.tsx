import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("flex items-center gap-2 text-xl font-bold", className)}
    >
      <span className="grid size-8 place-items-center rounded-lg bg-brand-primary text-brand-tertiary">
        Y
      </span>
      <span className="text-brand-primary">{siteConfig.name}</span>
    </Link>
  );
}
