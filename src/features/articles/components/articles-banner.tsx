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
 * Articles hero: "OUR" on the left, "BLOGS" stepping to the right, with the
 * figure and its glow behind them.
 *
 * The reveal is driven by one IntersectionObserver on the section rather than
 * per-element `whileInView`: the headline lines start translated inside an
 * `overflow-hidden` mask, and a fully clipped element never reports as
 * intersecting, so they would otherwise stay invisible.
 */
export function ArticlesBanner() {
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

  // Subtle pointer parallax on the figure.
  const tilt = useMotionValue(0);
  const smoothTilt = useSpring(tilt, { stiffness: 120, damping: 20 });
  const figureShiftX = useTransform(smoothTilt, (v) => v * 16);

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
  const figureY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="articles-banner-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={() => tilt.set(0)}
      className="bg-brand-primary relative overflow-hidden py-16 lg:py-24"
    >
      <Container>
        <div className="relative mx-auto max-w-4xl">
          {/* Glow + figure, behind the type */}
          <motion.div
            style={{ y: figureY, x: figureShiftX }}
            className="pointer-events-none absolute top-0 left-1/2 w-[70%] -translate-x-1/2 sm:w-[66%] lg:w-[64%]"
          >
            <div className="relative aspect-[630/680]">
              <motion.div
                aria-hidden
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [1, 1.08, 1], opacity: [0.55, 0.85, 0.55] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-brand-secondary/40 absolute top-[34%] left-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] lg:blur-[90px]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={inView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative size-full [mask-image:linear-gradient(to_bottom,#000_82%,transparent_98%)]"
                >
                  <Image
                    src="/images/avatar-standing.png"
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 1024px) 574px, 70vw"
                    loading="eager"
                    className="object-contain object-top"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Headline */}
          <h1
            id="articles-banner-heading"
            className="font-heading relative z-20 pt-28 text-[clamp(2.75rem,9.5vw,8.5rem)] leading-[0.95] font-bold tracking-tight uppercase sm:pt-32 lg:pt-36"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : undefined}
                transition={{
                  duration: 0.9,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block text-white [text-shadow:0_2px_36px_rgb(9_29_64_/_0.85)]"
              >
                Our
              </motion.span>
            </span>
            <span className="block overflow-hidden text-right">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : undefined}
                transition={{
                  duration: 0.9,
                  delay: 0.37,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-brand-secondary block [text-shadow:0_2px_36px_rgb(9_29_64_/_0.85)]"
              >
                Blogs
              </motion.span>
            </span>
          </h1>

          {/* Copy + CTA, right-aligned under the headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mt-5 ml-auto w-full max-w-[260px] sm:max-w-[330px] lg:mt-6"
          >
            <p className="text-sm leading-relaxed text-white/85">
              Explore the latest in AI, automation, design, development, and
              digital growth — all in one place.
            </p>

            <div className="group mt-6 flex items-center justify-end gap-2">
              <Link
                href="#articles"
                className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-12 items-center rounded-full bg-white px-11 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)]"
              >
                Future insights
              </Link>
              <Link
                href="#articles"
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
      </Container>
    </section>
  );
}
