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

const headingLines = [
  {
    text: "Innovate today,",
    // "INNOVATE" stays white and "TODAY," fades toward blue, as in the design
    className:
      "bg-gradient-to-r from-white from-45% to-white/55 bg-clip-text text-transparent",
  },
  { text: "Transform", className: "text-brand-secondary" },
  { text: "Tomorrow", className: "text-brand-secondary" },
];

/**
 * Closing call-to-action for the articles page.
 *
 * Like the other heroes, the reveal runs off one IntersectionObserver on the
 * section: the headline lines sit inside `overflow-hidden` masks, and a fully
 * clipped element never reports as intersecting, so per-element `whileInView`
 * would leave them invisible.
 */
export function ArticlesCta() {
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
  const figureShiftX = useTransform(smoothTilt, (v) => v * 14);

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
      aria-labelledby="articles-cta-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={() => tilt.set(0)}
      className="bg-brand-primary relative overflow-hidden py-16 lg:py-24"
    >
      <Container>
        <div className="relative">
          {/* Figure with its glow, anchored to the right */}
          <motion.div
            style={{ y: figureY, x: figureShiftX }}
            className="pointer-events-none absolute top-0 right-[1.5%] hidden w-[63%] sm:block"
          >
            <div className="relative aspect-[960/720]">
              <motion.div
                aria-hidden
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-brand-secondary/45 absolute top-1/2 left-[59%] size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] lg:blur-[95px]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={inView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <motion.div
                  animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative size-full [mask-image:linear-gradient(to_bottom,#000_86%,transparent_99%)]"
                >
                  <Image
                    src="/images/avatar-head-left-45.png"
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 640px) 63vw, 0px"
                    loading="lazy"
                    className="object-contain object-top"
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Headline */}
          <h2
            id="articles-cta-heading"
            className="font-heading relative z-20 text-[clamp(2.25rem,9.2vw,8rem)] leading-[1.02] font-bold tracking-tight uppercase"
          >
            {headingLines.map((line, i) => (
              <span key={line.text} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : undefined}
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + i * 0.11,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`block ${line.className} [text-shadow:0_2px_36px_rgb(9_29_64_/_0.85)]`}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mt-10 flex flex-col gap-6 sm:flex-row sm:items-center lg:mt-14"
          >
            <p className="max-w-[300px] text-[11px] leading-relaxed text-white/85">
              Harness the power of technology to drive growth, efficiency, and
              endless possibilities.
            </p>

            <div className="group flex items-center gap-2">
              <Link
                href="/contact"
                className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-16 items-center rounded-full bg-white px-14 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)]"
              >
                Let&rsquo;s get started
              </Link>
              <Link
                href="/contact"
                aria-label="Let's get started"
                className="text-brand-primary group-hover:bg-brand-tertiary grid size-16 place-items-center rounded-full bg-white transition-all duration-300"
              >
                <ArrowUpLeft
                  className="size-5 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
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
