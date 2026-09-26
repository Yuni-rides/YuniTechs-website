"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionEyebrow } from "./section-eyebrow";

/**
 * The four marks are the same on every project — only the copy beside them
 * changes — so they live here rather than in the per-project data.
 *
 * The design sets each icon at its own size rather than fitting them all to
 * one box, and each PNG carries a different amount of transparent margin.
 * `width` is therefore the width of the *file* needed to land the visible art
 * on the design's size, as a share of the card: art% / (artWidth / fileWidth).
 * The transparent margins are centred in every file, so no further nudging is
 * needed to keep the art centred.
 */
const ICONS = [
  { src: "/images/approchIcon1.png", width: "95%" }, // art 68.3% of card
  { src: "/images/approchIcon2.png", width: "52.1%" }, // art 37.8%
  { src: "/images/approchIcon3.png", width: "47%" }, // art 39.0%
  { src: "/images/approchIcon4.png", width: "49%" }, // art 45.1%
];

/** Where the copy starts, as a share of the card height. */
const TEXT_TOP = "56.6%";

export function ProjectApproach({ steps }: { steps: string[] }) {
  if (steps.length === 0) return null;

  return (
    <section
      aria-labelledby="project-approach-heading"
      className="bg-brand-secondary"
    >
      {/* Spacing is a share of the container width so the design's proportions
          hold at every breakpoint — percentages resolve against this box. */}
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="pt-[7.1%]"
        >
          <motion.div variants={fadeInUp}>
            <SectionEyebrow>Our approach</SectionEyebrow>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            id="project-approach-heading"
            className="text-brand-primary mt-[2.6%] text-center font-sans text-[clamp(1.75rem,4.67vw,4.25rem)] leading-none font-normal tracking-tight uppercase"
          >
            How we did it.
          </motion.h2>

          <ul className="mt-[5.9%] grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[7.6%]">
            {steps.slice(0, ICONS.length).map((step, index) => (
              <motion.li
                variants={fadeInUp}
                key={step}
                className="bg-brand-primary relative flex flex-col items-center gap-6 rounded-2xl p-6 lg:block lg:aspect-[82/106] lg:gap-0 lg:p-0"
              >
                {/* Icon sits centred in the band above the copy. */}
                <span className="flex w-full items-center justify-center lg:absolute lg:inset-x-0 lg:top-0 lg:h-[56.6%]">
                  <Image
                    src={ICONS[index].src}
                    alt=""
                    aria-hidden
                    width={224}
                    height={149}
                    style={{ width: ICONS[index].width }}
                    sizes="200px"
                    loading="lazy"
                    className="h-auto max-w-[60%] lg:max-w-none"
                  />
                </span>

                <p
                  style={{ top: TEXT_TOP }}
                  className="text-brand-secondary text-center text-[13px] leading-relaxed lg:absolute lg:inset-x-0 lg:px-[6%] lg:text-[clamp(0.8125rem,1.42vw,1.25rem)]"
                >
                  {step}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
