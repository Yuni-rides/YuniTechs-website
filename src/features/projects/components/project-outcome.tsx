"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import type { ProjectOutcomeContent } from "@/features/projects/data/projects";

/**
 * Every size here is a share of the container width, read off the design:
 * columns 52.2% / 5.5% gap / 42.4%, tiles 42.4% of the grid on a 0.86 aspect
 * with a 14.6% column gap and a 7.4% row gap, and type at 5.19% (heading),
 * 7.78% (figure) and 1.95% (tile label) of the container.
 */
export function ProjectOutcome({ outcome }: { outcome: ProjectOutcomeContent }) {
  return (
    <section
      aria-labelledby="project-outcome-heading"
      className="bg-brand-primary"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-12 pt-[6.9%] pb-[8.3%] lg:grid-cols-[52.2fr_42.4fr] lg:gap-x-[5.5%] lg:gap-y-0"
        >
          <div>
            <motion.p
              variants={fadeInUp}
              className="flex items-center gap-4 text-[11px] tracking-[0.2em] text-white uppercase lg:text-[clamp(0.6875rem,1.1vw,1rem)]"
            >
              <span aria-hidden className="h-px w-8 bg-white" />
              The outcome
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              id="project-outcome-heading"
              className="text-brand-secondary mt-[7.7%] font-display text-[clamp(1.75rem,4.92vw,4.5rem)] leading-none font-light tracking-normal uppercase"
            >
              {outcome.heading}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-[10%] max-w-[84%] text-[13px] leading-[1.45] text-white/75 lg:mt-[38.4%] lg:text-[clamp(0.8125rem,1.3vw,1.125rem)]"
            >
              {outcome.body}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="group mt-[6%] flex items-center gap-[0.6%] lg:mt-[6.7%]"
            >
              <Link
                href="/projects"
                className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-12 items-center rounded-full bg-white px-8 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)] lg:h-[clamp(3rem,4.46vw,4.5rem)] lg:px-[clamp(1.5rem,3vw,3rem)] lg:text-[clamp(0.6875rem,1.2vw,1.125rem)]"
              >
                View more projects
              </Link>
              <Link
                href="/projects"
                aria-label="View more projects"
                className="text-brand-primary group-hover:bg-brand-tertiary grid aspect-square h-12 place-items-center rounded-full bg-white transition-all duration-300 lg:h-[clamp(3rem,4.46vw,4.5rem)]"
              >
                <ArrowUpLeft
                  className="size-[36%] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </motion.div>
          </div>

          <ul className="grid grid-cols-2 gap-x-[14.6%] gap-y-[7.4%]">
            {outcome.stats.slice(0, 4).map((stat) => (
              <motion.li
                variants={fadeInUp}
                key={stat.label}
                className="bg-brand-secondary text-brand-primary flex aspect-[154/179] flex-col items-center justify-center rounded-3xl px-[8%] text-center"
              >
                <p className="font-display text-[clamp(2.5rem,7.38vw,6.5rem)] leading-none font-bold">
                  {stat.value}
                </p>
                <p className="font-display mt-[31.8%] text-[clamp(0.75rem,1.85vw,1.625rem)] leading-[1.15] font-medium tracking-normal uppercase">
                  {stat.label}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
