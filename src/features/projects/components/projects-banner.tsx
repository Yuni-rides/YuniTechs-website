"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";

/**
 * The artwork's laptop screen is dark; the design lights it up in brand blue.
 * These are the screen's four corners as a share of the image box — verified
 * against the PNG's pixels, so the overlay never spills onto the bezel or the
 * hand resting on the keyboard.
 */

export function ProjectsBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    // Safety net in case the observer never fires (e.g. a backgrounded tab).
    const fallback = setTimeout(() => setInView(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const tilt = useMotionValue(0);
  const smoothTilt = useSpring(tilt, { stiffness: 120, damping: 20 });
  const figureShiftX = useTransform(smoothTilt, (v) => v * 12);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    tilt.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const figureY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="projects-banner-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={() => tilt.set(0)}
      className="bg-brand-primary relative overflow-hidden py-16 lg:py-24"
    >
      <Container>
        {/* Headline */}
        <h1
          id="projects-banner-heading"
          className="font-heading relative z-20 overflow-hidden text-center text-[clamp(2rem,9.25vw,8.3rem)] leading-[1] font-bold tracking-tight uppercase"
        >
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block [text-shadow:0_2px_36px_rgb(9_29_64_/_0.85)]"
          >
            <span className="text-white">Our </span>
            <span className="text-brand-secondary">Projects</span>
          </motion.span>
        </h1>

        <div className="mx-auto max-w-5xl">
          <div className="relative mt-6 lg:mt-2">
            {/* Figure */}
            <motion.div
              style={{ y: figureY, x: figureShiftX }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none relative mx-auto w-full max-w-[560px] lg:mx-0 lg:w-[95%] lg:max-w-none"
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative aspect-[1094/729]"
              >
                <Image
                  src="/images/projectBanner.png"
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  loading="eager"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>

            {/* Copy + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-20 mt-8 w-full max-w-[300px] sm:mx-auto lg:absolute lg:top-[6%] lg:right-0 lg:mt-0 lg:max-w-[33%]"
            >
              <p className="text-[13px] leading-relaxed text-white/85">
                Explore the latest in AI, automation, design, development, and
                digital growth — all in one place.
              </p>

              <div className="group mt-6 flex items-center gap-2">
                <Link
                  href="#projects"
                  className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-12 items-center rounded-full bg-white px-8 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)]"
                >
                  Future insights
                </Link>
                <Link
                  href="#projects"
                  aria-label="Future insights"
                  className="text-brand-primary group-hover:bg-brand-tertiary grid size-12 place-items-center rounded-full bg-white transition-all duration-300"
                >
                  <ArrowUpLeft
                    className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
