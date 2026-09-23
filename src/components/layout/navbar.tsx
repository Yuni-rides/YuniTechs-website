"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpLeft, Menu, X } from "lucide-react";
import { Container } from "@/components/ui";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-brand-primary sticky top-0 z-50 pt-4 lg:pt-6">
      <Container>
        <div className="flex h-16 items-center justify-between rounded-full border border-white/70 px-3 pl-4 lg:h-[72px] lg:px-4 lg:pl-6">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={45}
              height={51}
              priority
              className="h-8 w-auto lg:h-9"
            />
            <span className="text-xl font-medium text-white lg:text-2xl">
              Yunitechs
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "hover:text-brand-tertiary text-xs font-medium tracking-wider uppercase transition-colors",
                    active ? "text-brand-tertiary" : "text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LetsTalk />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="text-brand-primary grid size-10 place-items-center rounded-full bg-white lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium tracking-wider uppercase hover:bg-white/5",
                    pathname === item.href
                      ? "text-brand-tertiary"
                      : "text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-2 px-3">
                <LetsTalk />
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function LetsTalk({
  className,
  label = "Lets Talk",
  href = "/contact",
}: {
  className?: string;
  /** Button copy - e.g. "Future Insights" on the services banner. */
  label?: string;
  href?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link
        href={href}
        className="text-brand-primary hover:bg-brand-tertiary inline-flex h-11 items-center rounded-full bg-white px-6 text-xs font-medium tracking-wider uppercase transition-colors"
      >
        {label}
      </Link>
      <Link
        href={href}
        aria-label={label}
        className="text-brand-primary hover:bg-brand-tertiary grid size-11 place-items-center rounded-full bg-white transition-colors"
      >
        <ArrowUpLeft className="size-5" aria-hidden />
      </Link>
    </div>
  );
}
