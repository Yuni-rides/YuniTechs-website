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

export function AiAutomation() {
  return (
    <section
      aria-labelledby="ai-automation-heading"
      className="relative overflow-hidden bg-brand-primary py-20 lg:py-28"
    >
      {/* Ambient blue glows — bottom-left behind the figure, right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 size-[520px] rounded-full bg-brand-secondary/40 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-1/2 size-[560px] -translate-y-1/2 rounded-full bg-brand-secondary/55 blur-[140px]"
      />

      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* Figure */}
          <motion.div
            variants={fadeInUp}
            className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:max-w-[560px]"
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
          <div className="lg:pl-4">
            <motion.h2
              variants={fadeInUp}
              id="ai-automation-heading"
              className="font-sans text-2xl font-normal tracking-normal text-white sm:text-3xl"
            >
              AI &amp; Automation Services
            </motion.h2>

            <motion.ul
              variants={fadeInUp}
              className="mt-6 space-y-1 text-xl text-white/60 sm:text-2xl"
            >
              {services.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="select-none">
                    •
                  </span>
                  <span className="max-w-[260px] leading-snug">{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.p
              variants={fadeInUp}
              className="mt-10 max-w-[280px] text-2xl leading-snug text-white sm:text-[1.75rem]"
            >
              Powering innovation through intelligent technology.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-2">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center rounded-full bg-white px-8 text-[10px] font-medium uppercase tracking-wider text-brand-primary transition-colors hover:bg-brand-tertiary"
              >
                Discuss the vision
              </Link>
              <Link
                href="/contact"
                aria-label="Discuss the vision"
                className="grid size-14 place-items-center rounded-full bg-white text-brand-primary transition-colors hover:bg-brand-tertiary"
              >
                <ArrowUpLeft className="size-5" strokeWidth={1.75} aria-hidden />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
