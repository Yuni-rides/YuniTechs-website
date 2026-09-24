"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpLeft } from "lucide-react";
import { MotionInView } from "@/components/shared/motion-in-view";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  items: FaqItem[];
  /** Heading lines; defaults to the site-wide FAQ title */
  title?: ReactNode;
  /** Left-column copy under the heading */
  intro?: ReactNode;
  cta?: { label: string; href: string };
  /** Index of the item open on first render; null for all closed */
  defaultOpen?: number | null;
  /** Emit FAQPage JSON-LD for rich results */
  schema?: boolean;
  className?: string;
};

/**
 * Shared FAQ accordion — heading + intro on the left, questions on the right.
 * Open/hovered rows get the same gradient-edge + blue-glow treatment used in
 * the Services accordion so the two feel like one system.
 */
export function Faq({
  items,
  title = (
    <>
      Frequently asked
      <br />
      questions &amp; answers
    </>
  ),
  intro,
  cta = { label: "Click to connect", href: "/contact" },
  defaultOpen = 1,
  schema = true,
  className,
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <section
      aria-labelledby={`${baseId}-heading`}
      className={cn(
        "bg-brand-primary overflow-hidden py-16 lg:py-24",
        className,
      )}
    >
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }}
        />
      )}

      <Container>
        <MotionInView>
          <h2
            id={`${baseId}-heading`}
            className="text-brand-secondary font-sans text-4xl leading-[1.05] font-light tracking-tight uppercase sm:text-5xl lg:text-[4.25rem]"
          >
            {title}
          </h2>
        </MotionInView>

        <div className="mt-10 grid gap-12 lg:mt-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* Intro + CTA, bottom-aligned on desktop */}
          <MotionInView className="order-2 flex flex-col justify-end lg:order-1">
            {intro && (
              <div className="[&_strong]:text-brand-secondary max-w-[280px] text-[11px] leading-relaxed text-white [&_strong]:font-semibold">
                {intro}
              </div>
            )}
            {cta && (
              <div className="group mt-6 flex items-center gap-2">
                <Link
                  href={cta.href}
                  className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-10 items-center rounded-full bg-white px-5 text-[10px] font-medium tracking-wider uppercase transition-colors"
                >
                  {cta.label}
                </Link>
                <Link
                  href={cta.href}
                  aria-label={cta.label}
                  className="text-brand-primary group-hover:bg-brand-tertiary grid size-10 place-items-center rounded-full bg-white transition-colors"
                >
                  <ArrowUpLeft
                    className="size-4"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </div>
            )}
          </MotionInView>

          {/* Questions */}
          <MotionInView
            delay={0.05}
            className="order-1 border-t border-white/15 lg:order-2"
          >
            {items.map((item, index) => {
              const open = index === openIndex;
              const buttonId = `${baseId}-q-${index}`;
              const panelId = `${baseId}-a-${index}`;

              return (
                <div
                  key={item.question}
                  className={cn(
                    "group relative rounded-xl",
                    "before:gradient-ring before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300",
                    "after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:bg-[radial-gradient(ellipse_at_bottom_right,rgb(41_121_255_/_0.45),transparent_55%)] after:opacity-0 after:transition-opacity after:duration-300",
                    open
                      ? "before:opacity-100 after:opacity-100"
                      : "hover:before:opacity-100 hover:after:opacity-100",
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px bg-white/15"
                  />

                  <h3 className="relative z-10 font-sans font-normal tracking-normal">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-start justify-between gap-6 px-5 py-5 text-left text-white lg:px-6"
                    >
                      <span className="max-w-[340px] text-sm leading-snug uppercase sm:text-base">
                        {item.question}
                      </span>
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center">
                        {open ? (
                          <ArrowDown
                            className="size-6"
                            strokeWidth={1.25}
                            aria-hidden
                          />
                        ) : (
                          <ArrowRight
                            className="size-6 transition-transform duration-300 group-hover:translate-x-1"
                            strokeWidth={1.25}
                            aria-hidden
                          />
                        )}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10 overflow-hidden"
                      >
                        <p className="max-w-[360px] px-5 pb-6 text-[11px] leading-relaxed text-white/80 lg:px-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </MotionInView>
        </div>
      </Container>
    </section>
  );
}

function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
