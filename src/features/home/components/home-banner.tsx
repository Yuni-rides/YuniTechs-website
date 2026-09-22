"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LetsTalk } from "@/components/layout";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function HomeBanner() {
  return (
    <section className="bg-brand-primary pb-16 pt-10 lg:pb-24 lg:pt-14">
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-heading text-[2.75rem] font-bold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[6.5rem] xl:text-[7.5rem]">
            <motion.span variants={fadeInUp} className="block">
              Integrated
            </motion.span>
            <motion.span variants={fadeInUp} className="block">
              Platforms Future
            </motion.span>
          </h1>

          <div className="mt-2 grid items-center gap-8 lg:grid-cols-[minmax(0,280px)_1fr_minmax(0,220px)] lg:gap-6">
            {/* Banner image with "UN MUTED" badge */}
            <motion.div
              variants={fadeInUp}
              className="relative order-2 w-fit lg:order-1"
            >
              <Image
                src="/images/homeBanner.png"
                alt="Scientist analysing a sample in a laboratory"
                width={271}
                height={182}
                priority
                className="h-auto w-[200px] rounded-md object-cover sm:w-[240px] lg:w-[271px]"
              />
              <span className="absolute -bottom-10 left-1/2 grid size-[104px] place-items-center rounded-full bg-brand-tertiary text-[11px] font-medium uppercase tracking-wider text-brand-primary sm:left-[60%]">
                Un Muted
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="order-1 font-heading text-[2.75rem] font-bold uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:order-2 lg:text-center lg:text-[6.5rem] xl:text-[7.5rem]"
            >
              Cohesion
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="order-3 flex flex-col gap-5 lg:pt-4"
            >
              <p className="max-w-[220px] text-[11px] leading-relaxed text-white/85">
                stop settling for average. Yuni solution is your fast-track
                partner to scale your business with unified, robust software.
                Join Kilo. Health, Eskimi, and 50+ partners already ahead of
                the curve.
              </p>
              <LetsTalk />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
