"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import type { ProjectChallengeContent } from "@/features/projects/data/projects";

export function ProjectChallenge({ challenge }: { challenge: ProjectChallengeContent }) {
  return (
    <section
      aria-labelledby="project-challenge-heading"
      className="bg-brand-primary py-14 lg:py-20"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,52%)_minmax(0,48%)] lg:gap-6"
        >
          <div>
            <motion.p
              variants={fadeInUp}
              className="flex items-center gap-4 text-[11px] tracking-[0.25em] text-white uppercase"
            >
              <span aria-hidden className="h-px w-10 bg-white/70" />
              The challenge
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              id="project-challenge-heading"
              className="text-brand-secondary mt-8 font-sans text-[clamp(2rem,4.6vw,4rem)] leading-[1.1] font-light tracking-tight uppercase"
            >
              {challenge.heading}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-8 max-w-[52ch] text-[13px] leading-relaxed text-white/70"
            >
              {challenge.body}
            </motion.p>
          </div>

          {/* Swapped per project — see `challenge.image` in the project data. */}
          <motion.div
            variants={fadeInUp}
            className="relative aspect-[4/3] w-full"
          >
            <Image
              src={challenge.image}
              alt={challenge.imageAlt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              loading="lazy"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
