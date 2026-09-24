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

const HEAD_FRAMES = [
  "/images/avatar-head-back.png",
  "/images/avatar-head-right-90.png",
  "/images/avatar-head-right-45.png",
  "/images/avatar-head-front.png",
  "/images/avatar-head-left-45.png",
] as const;

const FRONT = 3;

/**
 * First-view turn: the head sweeps from facing away, past the profile, all the
 * way to the front. Each step carries its own duration so the rotation eases
 * out instead of ticking at a fixed rate.
 */
const REVEAL_SEQUENCE: { frame: number; hold: number }[] = [
  { frame: 0, hold: 220 },
  { frame: 1, hold: 200 },
  { frame: 2, hold: 220 },
  { frame: 4, hold: 260 },
  { frame: FRONT, hold: 0 },
];

/** Crossfade between frames - long enough to read as a turn, short enough to stay crisp. */
const FRAME_FADE_MS = 240;

/** Stacking: glow behind the avatar, avatar behind the headline. */
const AVATAR_BOX =
  "pointer-events-none absolute top-0 left-1/2 w-[300px] -translate-x-1/2 sm:w-[420px] lg:w-[540px]";

const headingLines = [
  { text: "Let's create", className: "text-white" },
  {
    text: "The future",
    className:
      "bg-gradient-to-r from-white from-15% to-brand-secondary to-70% bg-clip-text text-transparent",
  },
  { text: "Together", className: "text-brand-secondary" },
];

export function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  const [frame, setFrame] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const displayFrame = reduceMotion ? FRONT : frame;
  const isRevealed = reduceMotion ? true : revealed;

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
      { threshold: 0.35 },
    );
    io.observe(el);

    const fallback = setTimeout(() => setInView(true), 3000);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  // Play the turn once, the first time the section is seen.
  useEffect(() => {
    if (!inView || reduceMotion) return;

    let step = 0;
    let timer: ReturnType<typeof setTimeout>;

    const next = () => {
      const current = REVEAL_SEQUENCE[step];
      setFrame(current.frame);

      if (step === REVEAL_SEQUENCE.length - 1) {
        setRevealed(true);
        return;
      }

      step += 1;
      timer = setTimeout(next, current.hold);
    };

    next();
    return () => clearTimeout(timer);
  }, [inView, reduceMotion]);

  const tiltX = useMotionValue(0);
  const smoothTilt = useSpring(tiltX, { stiffness: 120, damping: 20 });

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isRevealed || reduceMotion || e.pointerType !== "mouse") return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const ratio = (e.clientX - rect.left) / rect.width;
    tiltX.set((ratio - 0.5) * 2);

    if (ratio < 0.3) setFrame(4);
    else if (ratio < 0.68) setFrame(FRONT);
    else if (ratio < 0.88) setFrame(2);
    else setFrame(1);
  };

  const onPointerLeave = () => {
    if (!isRevealed) return;
    tiltX.set(0);
    setFrame(FRONT);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const avatarY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const avatarShiftX = useTransform(smoothTilt, (v) => v * 14);
  const avatarRotate = useTransform(smoothTilt, (v) => v * 4);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cta-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="bg-brand-primary relative overflow-hidden py-16 lg:py-24"
    >
      <Container>
        <div className="relative mx-auto max-w-5xl">
          {/* ---------------------------------------------------------------
           * Halo behind the figure (z-0). Two layers: a wide ambient bloom and
           * a tighter core, so the silhouette reads against the navy.
           * --------------------------------------------------------------- */}
          <motion.div
            aria-hidden
            style={{ y: avatarY, x: avatarShiftX }}
            className={`${AVATAR_BOX} z-0`}
          >
            <div className="relative aspect-[4/3]">
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [1, 1.09, 1], opacity: [0.55, 0.85, 0.55] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-brand-secondary/55 absolute top-[34%] left-1/2 size-[96%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] lg:blur-[120px]"
              />
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="bg-brand-secondary/70 absolute top-[32%] left-1/2 size-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] lg:blur-[80px]"
              />
            </div>
          </motion.div>

          {/* ---------------------------------------------------------------
           * The figure (z-10) - sits BEHIND the headline so every word stays
           * readable where they overlap.
           * --------------------------------------------------------------- */}
          <motion.div
            style={{ y: avatarY, x: avatarShiftX }}
            className={`${AVATAR_BOX} z-10`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotateY: 18 }}
              animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : undefined}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ rotate: avatarRotate, transformPerspective: 1200 }}
              className="relative"
            >
              {/* Idle float */}
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative aspect-[4/3] [mask-image:linear-gradient(to_bottom,#000_55%,transparent_93%)]"
              >
                {/* All frames are stacked so switching never flashes */}
                {HEAD_FRAMES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt={i === FRONT ? "Yuni Solution AI avatar" : ""}
                    aria-hidden={i !== FRONT}
                    width={960}
                    height={720}
                    loading="eager"
                    className="absolute inset-0 size-full object-contain ease-out"
                    style={{
                      opacity: i === displayFrame ? 1 : 0,
                      transitionProperty: "opacity",
                      transitionDuration: `${FRAME_FADE_MS}ms`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Visor scan sweep */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={
                    isRevealed
                      ? { x: ["-120%", "120%"], opacity: [0, 0.9, 0] }
                      : undefined
                  }
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    ease: "easeInOut",
                  }}
                  className="via-brand-secondary/40 absolute top-[30%] left-0 h-10 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent to-transparent blur-md"
                />
              )}
            </motion.div>
          </motion.div>

          {/* ---------------------------------------------------------------
           * Headline (z-20). Right-aligned, stepping in from the left, and
           * pulled up so the first line crosses the figure at eye level.
           * --------------------------------------------------------------- */}
          <h2
            id="cta-heading"
            className="font-heading relative z-20 pt-14 text-right text-[clamp(2.1rem,8.2vw,7.5rem)] leading-[0.92] font-bold tracking-tight uppercase sm:pt-16 lg:pt-16"
          >
            {headingLines.map((line, i) => (
              <span key={line.text} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : undefined}
                  transition={{
                    duration: 0.9,
                    delay: 0.3 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`block ${line.className} [text-shadow:0_2px_28px_rgb(9_29_64_/_0.95),0_0_70px_rgb(9_29_64_/_0.8)]`}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Copy + CTA, tucked under the headline on the right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 mt-8 flex flex-col items-end gap-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-end lg:mt-28"
          >
            <p className="max-w-[230px] text-right text-[11px] leading-relaxed text-white/85 sm:text-left">
              From{" "}
              <span className="text-brand-secondary font-medium">
                innovative websites
              </span>{" "}
              to{" "}
              <span className="text-brand-secondary font-medium">
                AI-powered
              </span>{" "}
              applications, we build solutions that drive measurable results.
            </p>

            <div className="group flex items-center gap-2">
              <Link
                href="/contact"
                className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-14 items-center rounded-full bg-white px-9 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)]"
              >
                Let&rsquo;s get started
              </Link>
              <Link
                href="/contact"
                aria-label="Let's get started"
                className="text-brand-primary group-hover:bg-brand-tertiary grid size-14 place-items-center rounded-full bg-white transition-all duration-300"
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
