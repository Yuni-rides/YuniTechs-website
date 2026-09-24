"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function AboutTeam() {
  return (
    <section
      aria-labelledby="about-team-heading"
      className="bg-brand-primary py-16 lg:py-24"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2
            variants={fadeInUp}
            id="about-team-heading"
            className="text-brand-secondary font-sans text-[clamp(1.75rem,6.4vw,5.75rem)] leading-[1.15] font-normal tracking-tight uppercase"
          >
            The minds behind
            <br />
            your software
          </motion.h2>

          {/* Team photo in its blue frame */}
          <motion.div
            variants={fadeInUp}
            className="border-brand-secondary mt-8 overflow-hidden rounded-2xl border-4 lg:mt-10"
          >
            <div className="relative aspect-[1270/592]">
              <Image
                src="/images/teamBanner.png"
                alt="The Yuni Solutions team"
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-8 ml-auto max-w-[475px] text-[11px] leading-relaxed text-white/85 lg:mt-10"
          >
            <span className="text-brand-secondary font-semibold">
              Yuni Solutions
            </span>{" "}
            brings together a powerful collective of software architects, UI/UX
            strategists, and product minds dedicated to engineering high-impact
            digital systems. Specializing in scalable web and mobile ecosystems,
            custom SaaS platforms, and cutting-edge AI automation, we strip away
            complexity to deliver premium, future-proof software at speed. For
            us, it&rsquo;s not just about writing code — it&rsquo;s about
            building the invisible infrastructure that drives tangible business
            growth. If you are looking for a precision-driven technology partner
            to design, deploy, and scale your operations, we are ready to build
            with you.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
