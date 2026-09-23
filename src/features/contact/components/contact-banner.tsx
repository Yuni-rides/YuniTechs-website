"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

const headingLines = ["Let's turn", "Your vision", "Into code."];

/**
 * Contact page banner: the headline on the left, a looping clip on the right.
 * The video is decorative, so it is muted, unlabelled, and paused entirely for
 * visitors who prefer reduced motion.
 */
export function ContactBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
    } else {
      // Autoplay can be rejected (e.g. a power-saving tab); ignore the failure.
      void video.play().catch(() => {});
    }
  }, [reduceMotion]);

  return (
    <section
      aria-labelledby="contact-banner-heading"
      className="bg-brand-primary overflow-hidden py-16 lg:py-24"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-start gap-10 lg:grid-cols-[minmax(0,68%)_minmax(0,32%)] lg:gap-10"
        >
          <motion.h1
            variants={fadeInUp}
            id="contact-banner-heading"
            className="font-heading text-[2.25rem] leading-[1.08] font-bold tracking-tight text-white uppercase sm:text-5xl lg:text-[7rem] xl:text-[8.5rem]"
          >
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="w-full max-w-[420px] overflow-hidden rounded-2xl lg:mt-2 lg:max-w-none"
          >
            <video
              ref={videoRef}
              src="/images/contactBanner.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              tabIndex={-1}
              className="aspect-[8/5] size-full object-cover"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
