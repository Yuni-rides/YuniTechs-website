"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LetsTalk } from "@/components/layout";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function WhoWeAre() {
  return (
    <section
      aria-labelledby="who-we-are-heading"
      className="bg-brand-primary pb-8 mt-6"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-12 lg:grid-cols-2 lg:gap-8"
        >
          {/* Photo collage */}
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px] lg:mx-0 lg:max-w-none">
            <motion.div
              variants={fadeInUp}
              className="absolute left-0 top-[6%] w-[52%] overflow-hidden rounded-lg"
            >
              <Image
                src="/images/about2.png"
                alt="Team celebrating a launch together"
                width={325}
                height={325}
                className="h-auto w-full"
              />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="absolute left-[22%] top-[44%] z-10 w-[46%] overflow-hidden rounded-lg"
            >
              <Image
                src="/images/about3.png"
                alt="Modern office workspace"
                width={326}
                height={324}
                className="h-auto w-full"
              />
            </motion.div>
          </div>

          {/* Copy + right-side photos */}
          <div className="relative">
            <motion.div
              variants={fadeInUp}
              className="ml-auto w-[68%] max-w-[346px] overflow-hidden rounded-lg lg:w-[62%]"
            >
              <Image
                src="/images/about1.png"
                alt="Team collaborating around a table"
                width={346}
                height={233}
                className="h-auto w-full"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6 lg:mt-8 lg:pl-[38%]">
              <h2
                id="who-we-are-heading"
                className="font-heading text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-brand-secondary sm:text-5xl lg:text-[3.5rem]"
              >
                Who
                <br />
                we are
              </h2>
              <p className="mt-4 max-w-[300px] text-[11px] leading-relaxed text-white/85">
                Yuni Tech is a team of skilled developers, UI/UX designers,
                and digital strategists dedicated to building custom software,
                SaaS platforms, AI-powered solutions, and scalable digital
                products that drive business growth.
              </p>
              <LetsTalk className="mt-6" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-8 w-[60%] max-w-[355px] overflow-hidden rounded-lg lg:absolute lg:-bottom-8 lg:left-[-12%] lg:mt-0 lg:w-[42%]"
            >
              <Image
                src="/images/about4.png"
                alt="Developers reviewing work on a laptop"
                width={355}
                height={283}
                className="h-auto w-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
