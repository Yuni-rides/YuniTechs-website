"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

/**
 * Full-bleed panel, so every percentage below resolves against the viewport —
 * which is exactly what the design's ratios are measured against: panel height
 * 34.9% of its width, heading 4.33%, body 1.29%, button 3.88% tall and 21.3%
 * wide, with 8.51% / 6.57% of breathing room top and bottom.
 */
export function ProjectCta({
  heading = (
    <>
      Want results like
      <br />
      these for your app?
    </>
  ),
  body = (
    <>
      Let&rsquo;s turn your idea into a high-performing, scalable
      <br />
      solution that delivers real impact.
    </>
  ),
}: {
  heading?: React.ReactNode;
  body?: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="project-cta-heading"
      className="bg-brand-primary relative isolate overflow-hidden"
    >
      {/* Corner glows — bottom-left and top-right, as in the design. */}
      <div
        aria-hidden
        className="bg-brand-secondary pointer-events-none absolute -bottom-[16%] -left-[8%] -z-10 aspect-square w-[42%] rounded-full opacity-70 blur-[110px]"
      />
      <div
        aria-hidden
        className="bg-brand-secondary pointer-events-none absolute -top-[22%] -right-[6%] -z-10 aspect-square w-[38%] rounded-full opacity-60 blur-[120px]"
      />
      {/* Faint dot grid across the panel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:28px_28px] text-brand-secondary"
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="px-4 pt-[7.3%] pb-[6.57%] text-center"
      >
        <motion.h2
          variants={fadeInUp}
          id="project-cta-heading"
          className="text-brand-secondary font-display text-[clamp(1.75rem,4.33vw,4.5rem)] leading-[1.08] font-normal tracking-normal uppercase"
        >
          {heading}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-[1.87%] text-[clamp(0.8125rem,1.29vw,1.25rem)] leading-[1.2] text-white/85"
        >
          {body}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="group mx-auto mt-[3.04%] flex w-full max-w-[19rem] items-center gap-[0.17%] lg:w-[21.31%] lg:max-w-none"
        >
          <Link
            href="/contact"
            className="bg-brand-secondary text-brand-primary group-hover:bg-brand-tertiary inline-flex h-[clamp(2.75rem,3.88vw,5rem)] flex-1 items-center justify-center rounded-full text-[clamp(0.6875rem,1.1vw,1.0625rem)] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_34px_-4px_var(--color-brand-tertiary)]"
          >
            Start a project
          </Link>
          <Link
            href="/contact"
            aria-label="Start a project"
            className="bg-brand-secondary text-brand-primary group-hover:bg-brand-tertiary grid aspect-square h-[clamp(2.75rem,3.88vw,5rem)] shrink-0 place-items-center rounded-full transition-all duration-300"
          >
            <ArrowUpLeft
              className="size-[36%] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
              aria-hidden
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
