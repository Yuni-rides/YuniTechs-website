"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { SectionEyebrow } from "./section-eyebrow";

const CARDS = [
  { title: "Strength", image: "/images/Strength.png" },
  { title: "Weakness", image: "/images/Weakness.png" },
  { title: "Opportunity", image: "/images/Opportunity.png" },
  { title: "Threat", image: "/images/Threat.png" },
];

export function ProjectSwot({ points }: { points: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const [pinned, setPinned] = useState(false);
  const [measured, setMeasured] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setPinned(mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!pinned) return;

    let raf = 0;
    let last = -1;
    let settled = 0;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return 0;
      const next = Math.max(0, track.scrollWidth - window.innerWidth);
      setMeasured(next);
      return next;
    };

    const poll = () => {
      const next = measure();
      settled = next === last ? settled + 1 : 0;
      last = next;
      if (settled < 5) raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);

    const timers = [0, 60, 200, 600, 1500].map((ms) =>
      window.setTimeout(measure, ms),
    );

    window.addEventListener("load", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    if (trackRef.current) ro.observe(trackRef.current);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("load", measure);
      ro.disconnect();
    };
  }, [pinned]);

  const distance = pinned ? measured : 0;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="project-swot-heading"
      className="bg-brand-primary relative"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={cn(
          "overflow-hidden",
          pinned ? "sticky top-0 flex h-screen flex-col" : "py-14 lg:py-20",
        )}
      >
        <Container className="shrink-0 pt-10 pb-6 text-center lg:pt-12 lg:pb-8">
          <SectionEyebrow tone="light">Strategic snapshot</SectionEyebrow>

          <h2
            id="project-swot-heading"
            className="text-brand-secondary font-display mt-3 text-[clamp(1.5rem,3.1vw,3rem)] leading-none font-normal tracking-normal uppercase"
          >
            SWOT, at a glance
          </h2>

          <p className="mx-auto mt-3 max-w-[46ch] text-[clamp(0.75rem,1.05vw,0.9375rem)] leading-[1.45] text-white/70">
            A quick look at the key internal and external factors that shaped
            the project and informed our strategy.
          </p>
        </Container>

        <div
          className={cn(
            "min-h-0 flex-1",
            !pinned && "no-scrollbar overflow-x-auto",
          )}
        >
          <motion.ul
            ref={trackRef}
            style={pinned ? { x } : undefined}
            className="flex h-full w-max px-2"
          >
            {CARDS.map((card, index) => (
              <li
                key={card.title}
                className="@container relative aspect-[4/5] w-[78vw] shrink-0 overflow-hidden rounded-sm sm:aspect-square sm:w-[58vw] lg:aspect-auto lg:h-full lg:w-[49.4vw]"
              >
                <Image
                  src={card.image}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 50vw, 78vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="from-brand-primary/95 absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t via-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 px-[7.5%] pb-[7%]">
                  <h3 className="font-display text-[clamp(1.75rem,7.8cqw,4.5rem)] leading-none font-bold tracking-normal text-white uppercase">
                    {card.title}
                  </h3>
                  <p className="bg-brand-primary/55 mt-[3%] rounded-lg p-[4%] text-center text-[clamp(0.6875rem,1.5cqw,0.9375rem)] leading-[1.45] text-white/85 backdrop-blur-[2px]">
                    {points[index]}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
