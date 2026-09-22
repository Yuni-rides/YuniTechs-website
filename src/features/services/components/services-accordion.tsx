"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpLeft } from "lucide-react";
import { MotionInView } from "@/components/shared";
import { Container } from "@/components/ui";
import { services } from "@/features/services/data/services";
import { cn } from "@/lib/utils";

const rowBase =
  "group relative rounded-xl " +
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:gradient-ring before:opacity-0 before:transition-opacity before:duration-300 " +
  "after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:bg-[radial-gradient(ellipse_at_bottom_right,rgb(41_121_255_/_0.45),transparent_55%)] after:opacity-0 after:transition-opacity after:duration-300";

const rowOn = "before:opacity-100 after:opacity-100";
const rowHover = "hover:before:opacity-100 hover:after:opacity-100";

export function ServicesAccordion() {
  const [openSlug, setOpenSlug] = useState<string | null>(
    services[0]?.slug ?? null,
  );

  return (
    <section
      aria-labelledby="services-heading"
      className="bg-brand-primary overflow-hidden py-16 lg:py-24"
    >
      <Container>
        <MotionInView>
          <h2
            id="services-heading"
            className="text-brand-secondary font-sans text-5xl font-light tracking-tight uppercase sm:text-6xl lg:text-7xl"
          >
            Services
          </h2>
        </MotionInView>

        <MotionInView delay={0.1} className="mt-10 lg:mt-14">
          {services.map((service, index) => {
            const open = service.slug === openSlug;
            const panelId = `service-panel-${service.slug}`;
            const buttonId = `service-button-${service.slug}`;

            return (
              <div
                key={service.slug}
                className={cn(rowBase, open ? rowOn : rowHover)}
              >
                {/* Hairline divider between rows */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px bg-white/15"
                />

                <h3 className="relative z-10 font-sans font-light tracking-normal">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenSlug(open ? null : service.slug)}
                    className="flex w-full items-center gap-5 px-4 py-5 text-left text-white sm:px-6 lg:gap-8 lg:px-7 lg:py-6"
                  >
                    <span className="grid size-7 shrink-0 place-items-center">
                      {open ? (
                        <ArrowDown
                          className="size-7"
                          strokeWidth={1.25}
                          aria-hidden
                        />
                      ) : (
                        <ArrowRight
                          className="size-7 transition-transform duration-300 group-hover:translate-x-1"
                          strokeWidth={1.25}
                          aria-hidden
                        />
                      )}
                    </span>
                    <span className="flex-1 text-2xl font-light tracking-wide uppercase sm:text-[1.75rem] lg:text-[2rem]">
                      {service.title}
                    </span>
                    <span className="text-3xl font-light tabular-nums sm:text-4xl lg:text-[2.5rem]">
                      {index + 1}
                    </span>
                    <ClockMark index={index} />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transitionEnd: { overflow: "visible" },
                      }}
                      exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10"
                    >
                      <div className="grid gap-8 px-4 pt-4 pb-8 sm:px-6 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-10 lg:px-7 lg:pt-6 lg:pb-7">
                        <div className="lg:pl-[3.75rem]">
                          <ul className="grid gap-x-10 gap-y-7 text-sm font-light text-white sm:grid-cols-2">
                            {service.items.map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <span
                                  aria-hidden
                                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-white"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>

                          <div className="mt-12 flex items-center gap-2">
                            <Link
                              href={service.href}
                              className="text-brand-primary hover:bg-brand-tertiary inline-flex h-11 items-center rounded-full bg-white px-7 text-xs tracking-wider uppercase transition-colors"
                            >
                              View service details
                            </Link>
                            <Link
                              href={service.href}
                              aria-label={`${service.title} details`}
                              className="text-brand-primary hover:bg-brand-tertiary grid size-11 place-items-center rounded-full bg-white transition-colors"
                            >
                              <ArrowUpLeft
                                className="size-4"
                                strokeWidth={1.5}
                                aria-hidden
                              />
                            </Link>
                          </div>
                        </div>

                        {/* Image sits flush to the bottom, nudged past the right edge */}
                        <div className="relative self-end lg:-mr-3">
                          <div
                            aria-hidden
                            className="bg-brand-secondary/50 absolute -right-6 -bottom-6 size-40 rounded-full blur-3xl"
                          />
                          <Image
                            src={service.image.src}
                            alt={service.image.alt}
                            width={service.image.width}
                            height={service.image.height}
                            className="relative h-auto w-full rounded-lg"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </MotionInView>
      </Container>
    </section>
  );
}

/** Thin clock glyph — hand angle steps per row, as in the Figma. */
function ClockMark({ index }: { index: number }) {
  const angle = (index * 45) % 360;
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className="size-10 shrink-0 text-white transition-transform duration-500 group-hover:rotate-45"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
    >
      {/* hands */}
      <g transform={`rotate(${angle} 16 16)`}>
        <line x1="16" y1="16" x2="16" y2="3" />
        <line x1="16" y1="16" x2="24" y2="16" strokeOpacity="0.55" />
      </g>
      <circle cx="16" cy="16" r="1.4" fill="currentColor" stroke="none" />
      {/* tick marks */}
      <g strokeOpacity="0.45">
        <path d="M16 1v2M31 16h-2M16 31v-2M1 16h2" />
        <path d="M5.4 5.4l1.4 1.4M26.6 5.4l-1.4 1.4M26.6 26.6l-1.4-1.4M5.4 26.6l1.4-1.4" />
      </g>
    </svg>
  );
}
