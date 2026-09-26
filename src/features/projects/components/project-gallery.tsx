"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { SectionEyebrow } from "./section-eyebrow";

/**
 * projectSample.png carries transparent margins — 10.1% of its height above the
 * artwork, 8.5% below, 3.4% of its width across — so the file's box is not
 * where the mockups appear. Every offset below is corrected for that and
 * describes where the *visible* artwork lands:
 *
 *   box 88%      -> artwork reads as the design's 85% of the container
 *   box -4.63%   -> artwork sits 1.3% below the heading
 *   disc -20.8%  -> disc top clears the artwork top by 20% of the container
 *
 * The disc is the panel blue darkened by 15% (measured off the design as
 * rgb(35,103,215) against rgb(41,121,255)), i.e. black at 15%, not a white tint.
 */
export function ProjectGallery({
  image,
  imageAlt,
}: {
  image: string;
  imageAlt: string;
}) {
  return (
    <section
      aria-labelledby="project-gallery-heading"
      className="bg-brand-secondary overflow-hidden"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="pt-[18.1%] pb-[12.6%]"
        >
          <motion.div variants={fadeInUp}>
            <SectionEyebrow>Content gallery</SectionEyebrow>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            id="project-gallery-heading"
            className="text-brand-primary mt-[2.6%] text-center font-sans text-[clamp(1.75rem,4.67vw,4.25rem)] leading-[1.15] font-normal tracking-tight uppercase"
          >
            A sample of
            <br />
            what shipped
          </motion.h2>

          <motion.div variants={fadeInUp} className="relative mt-[-4.63%]">
            <div
              aria-hidden
              className="absolute top-0 left-1/2 aspect-square w-[67.6%] -translate-x-1/2 -translate-y-[20.8%] rounded-full bg-black/15"
            />

            <div className="relative mx-auto aspect-[1143/762] w-[88%]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 88vw, 100vw"
                loading="lazy"
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
