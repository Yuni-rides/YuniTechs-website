"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

type Milestone = {
  number: string;
  title: string;
  body: string;
  image: string;
};

const milestones: Milestone[] = [
  {
    number: "01",
    title: "The vision",
    body: "Founded in 2020 by Yousuf Taj, Yuni Tech was built with a clear ambition — to help businesses embrace digital transformation through precision technology, intelligent systems, and future-ready solutions. From the beginning, our mission has been clear: strip away complexity, deliver premium software, and build the invisible infrastructure that drives real growth.",
    image: "/images/journey1.png",
  },
  {
    number: "02",
    title: "Early momentum",
    body: "What started as a small, focused practice quickly evolved into a high-performance team. We expanded our capabilities, invested in talent, and delivered projects across industries — from startups finding their footing to established businesses modernising decades-old systems. Every engagement sharpened how we build.",
    image: "/images/journey2.png",
  },
  {
    number: "03",
    title: "Global expansion",
    body: "As our expertise expanded, so did our reach. Yuni Tech now works with clients across continents, delivering CRM systems, SaaS platforms, AI automation, and custom software. Our distributed team keeps delivery moving around the clock, turning time zones into an advantage rather than an obstacle.",
    image: "/images/journey3.png",
  },
  {
    number: "04",
    title: "Future forward",
    body: "Today, Yuni Tech stands as a trusted technology partner for startups, enterprises, and ambitious founders alike. We continue building digital ecosystems that blend growth, automation, and design — shaping the future of intelligent software, one partnership at a time.",
    image: "/images/journey4.png",
  },
];

export function AboutJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const [pinned, setPinned] = useState(false);
  const [measured, setMeasured] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );

    const sync = () => {
      const shouldPin = mq.matches;
      setPinned(shouldPin);

      const track = trackRef.current;
      if (shouldPin && track) {
        setMeasured(Math.max(0, track.scrollWidth - window.innerWidth));
      }
    };

    sync();
    mq.addEventListener("change", sync);

    const ro = new ResizeObserver(sync);
    ro.observe(document.documentElement);
    if (trackRef.current) ro.observe(trackRef.current);

    return () => {
      mq.removeEventListener("change", sync);
      ro.disconnect();
    };
  }, []);

  const distance = pinned ? measured : 0;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-journey-heading"
      className="bg-brand-primary relative"
      // Extra height is what the pinned stage scrolls through.
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={cn(
          "bg-brand-secondary text-brand-primary overflow-hidden [clip-path:polygon(0_3%,100%_0,100%_97%,0_100%)]",
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center"
            : "py-16 lg:py-20",
        )}
      >
        <Container>
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h2
              id="about-journey-heading"
              className="font-sans text-[clamp(1.75rem,4.5vw,3.75rem)] leading-none font-normal tracking-tight uppercase"
            >
              Our journey
            </h2>
            <p className="text-brand-primary/70 text-[11px] tracking-[0.2em] uppercase">
              Key milestones
            </p>
          </div>
        </Container>

        <div className={cn("mt-10 lg:mt-14", !pinned && "overflow-x-auto")}>
          <motion.ul
            ref={trackRef}
            style={pinned ? { x } : undefined}
            className="flex w-max gap-10 px-4 sm:px-6 lg:gap-16 lg:px-8"
          >
            {milestones.map((item) => (
              <li
                key={item.number}
                className="flex w-[320px] shrink-0 gap-5 sm:w-[420px] lg:w-[560px] lg:gap-7"
              >
                <div className="relative aspect-square w-[42%] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 1024px) 240px, 40vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[clamp(2rem,4vw,3.5rem)] leading-none font-bold">
                    {item.number}
                  </p>
                  <h3 className="mt-3 text-sm font-semibold tracking-wide uppercase sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-brand-primary/80 mt-3 text-[11px] leading-relaxed">
                    {item.body}
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
