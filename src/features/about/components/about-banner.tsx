"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui";

export function AboutBanner() {
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

    const fallback = setTimeout(() => setInView(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

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
  const figureY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const lineTransition = (delay: number) => ({
    duration: 0.9,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-banner-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={() => tilt.set(0)}
      className="bg-brand-primary relative overflow-hidden"
    >
      <Container>
        <div className="relative aspect-[553/298] overflow-hidden">
          <motion.div
            style={{ y: figureY, x: figureShiftX }}
            className="pointer-events-none absolute top-[4%] left-[25%] z-30 w-[54.5%]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative aspect-[1295/1320] [mask-image:linear-gradient(to_bottom,#000_72%,transparent_90%)]"
              >
                <Image
                  src="/images/about-avatar.png"
                  alt=""
                  aria-hidden
                  fill
                  sizes="55vw"
                  loading="eager"
                  className="object-contain object-top"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <h1
            id="about-banner-heading"
            className="font-heading absolute inset-0 z-20 text-[clamp(1.25rem,8.2vw,7.5rem)] leading-[1] font-bold tracking-tight uppercase"
          >
            <span className="absolute top-[37%] left-0 block overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : undefined}
                transition={lineTransition(0.2)}
                className="block text-white [text-shadow:0_2px_36px_rgb(9_29_64_/_0.85)]"
              >
                Code
              </motion.span>
            </span>

            <span className="absolute top-[37%] right-0 block overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : undefined}
                transition={lineTransition(0.3)}
                className="block text-white [text-shadow:0_2px_36px_rgb(9_29_64_/_0.85)]"
              >
                Dominate
              </motion.span>
            </span>

            <span className="absolute top-[64%] left-0 block overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : undefined}
                transition={lineTransition(0.42)}
                className="text-brand-secondary block [text-shadow:0_2px_36px_rgb(9_29_64_/_0.85)]"
              >
                Execute
              </motion.span>
            </span>
          </h1>
        </div>
      </Container>
    </section>
  );
}
