"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import type { ProjectStat } from "@/features/projects/data/projects";

/**
 * Read off the design, as shares of the card row: card 22.63% wide on a 0.908
 * aspect with a 3.39% gap. Inside each card the type is sized against the card
 * itself (container query units) — figure 34.1%, label 10%, note 5.6% — so the
 * proportions survive every breakpoint.
 *
 * Resting state is an outlined card with blue type; hovering fills it with the
 * same blue and flips the type to navy.
 */
export function ProjectStats({ stats }: { stats: ProjectStat[] }) {
  if (stats.length === 0) return null;

  return (
    <section
      aria-label="Results at a glance"
      className="bg-brand-primary py-12 lg:py-16"
    >
      <Container>
        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4 lg:gap-[3.39%]"
        >
          {stats.map((stat) => (
            <motion.li
              variants={fadeInUp}
              key={stat.label}
              // The padding lives on the inner box, not here: container query
              // units resolve against the container's content width, so padding
              // on the card itself would shrink every type size with it.
              className="border-brand-secondary/60 text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary @container flex rounded-2xl border transition-colors duration-300"
            >
              <div className="flex flex-1 flex-col items-center px-[10%] pt-[18.75%] pb-[14.2%] text-center">
                <p className="text-[clamp(1.75rem,34.1cqw,7rem)] leading-[0.8] font-bold tracking-tight">
                  {stat.value}
                </p>

                <p className="mt-[12.75%] text-[clamp(0.75rem,10cqw,2rem)] leading-[1.15] font-medium">
                  {stat.label}
                </p>

                <p className="mt-[12%] text-[clamp(0.625rem,5.6cqw,1.125rem)] leading-[1.45]">
                  {stat.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
