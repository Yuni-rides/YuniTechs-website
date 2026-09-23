"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

const services = [
  "Smart Content Generation",
  "Creative AI Visuals",
  "Business Process Optimization",
];

const figureMask =
  "linear-gradient(to bottom, #000 68%, transparent 100%), linear-gradient(to right, transparent 0%, #000 16%)";

export function AiAutomation() {
  return (
    <section
      aria-labelledby="ai-automation-heading"
      className="bg-brand-primary relative overflow-hidden py-20 lg:py-28"
    >
      {/* Left glow — left edge, upper-middle */}
      <div
        aria-hidden
        className="bg-brand-secondary/50 pointer-events-none absolute top-[38%] -left-[14%] size-[clamp(260px,34vw,560px)] -translate-y-1/2 rounded-full blur-[100px]"
      />
      {/* Right glow — top-right corner, brighter */}
      <div
        aria-hidden
        className="bg-brand-secondary/80 pointer-events-none absolute top-[18%] -right-[10%] size-[clamp(260px,32vw,540px)] -translate-y-1/2 rounded-full blur-[100px]"
      />

      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          // Sab kuch `em` mein hai, isliye poora group font-size ke sath scale hota hai
          className="relative mx-auto text-xl lg:grid lg:max-w-[33em] lg:grid-cols-[17.75em_1fr] lg:items-center lg:text-[clamp(1.25rem,1.9vw,1.75rem)]"
        >
          {/* Figure */}
          <motion.div
            variants={fadeInUp}
            className="pointer-events-none relative mx-auto w-full max-w-[460px] lg:mx-0 lg:ml-[2em] lg:w-[20.3em] lg:max-w-none"
            style={{
              WebkitMaskImage: figureMask,
              maskImage: figureMask,
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          >
            <Image
              src="/images/Automation.png"
              alt="Futuristic humanoid figure with a glowing blue visor"
              width={985}
              height={739}
              className="h-auto w-full"
            />
          </motion.div>

          {/* Copy */}
          <div className="relative z-10 mt-10 lg:mt-0">
            <motion.h2
              variants={fadeInUp}
              id="ai-automation-heading"
              className="font-sans leading-[1.2] font-normal tracking-normal text-white"
            >
              AI &amp; Automation Services
            </motion.h2>

            <motion.ul
              variants={fadeInUp}
              className="mt-[1em] leading-[1.2] text-white/50"
            >
              {services.map((item) => (
                <li key={item} className="flex max-w-[13.5em] gap-[0.3em]">
                  <span aria-hidden className="select-none">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.p
              variants={fadeInUp}
              className="mt-[1.1em] max-w-[10.5em] leading-[1.2] text-white"
            >
              Powering innovation through intelligent technology.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-[0.9em] flex items-center gap-[0.12em]"
            >
              <Link
                href="/contact"
                className="text-brand-primary hover:bg-brand-tertiary inline-flex h-[2.1em] items-center rounded-full bg-white px-[1em] font-medium tracking-wider uppercase transition-colors"
              >
                <span className="text-[max(0.38em,10px)]">
                  Discuss the vision
                </span>
              </Link>
              <Link
                href="/contact"
                aria-label="Discuss the vision"
                className="text-brand-primary hover:bg-brand-tertiary grid size-[2.1em] place-items-center rounded-full bg-white transition-colors"
              >
                <ArrowUpLeft
                  className="size-[0.6em]"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
