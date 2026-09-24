"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

type Step = {
  title: string;
  body: string;
  image: string;
};

const steps: Step[] = [
  {
    title: "Audit",
    body: "Our expert team conducts deep technological and structural audits to evaluate your existing digital ecosystem. We identify bottlenecks, security vulnerabilities, and performance gaps, providing a strategic roadmap to optimize your system for seamless scalability.",
    image: "/images/audit.png",
  },
  {
    title: "Development",
    body: "We engineer high-performance, custom software solutions designed to solve complex business challenges. From robust backends to scalable web applications, every line of code is meticulously written to ensure maximum functionality, speed, and long-term reliability for your operations.",
    image: "/images/development.png",
  },
  {
    title: "Design",
    body: "We craft minimalist, tech-forward user experiences that bridge the gap between complex functionality and intuitive interaction. By focusing on pixel-perfect user interfaces and predictive layouts, we ensure your digital products are visually striking, engaging, and effortless to navigate.",
    image: "/images/design.png",
  },
  {
    title: "Support",
    body: "Our commitment doesn't end at deployment. We provide dedicated, proactive maintenance and technical support to ensure your software infrastructure runs flawlessly around the clock, allowing your business to scale confidently without downtime.",
    image: "/images/support.png",
  },
];

export function AboutProcess() {
  return (
    <section
      aria-labelledby="about-process-heading"
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
            id="about-process-heading"
            className="text-brand-secondary mx-auto text-center font-sans text-[clamp(1.5rem,5.7vw,5.25rem)] leading-[1.2] font-normal tracking-tight uppercase"
          >
            {/* Explicit breaks so the three lines match the design */}
            Web solution
            <br />
            development for
            <br />
            your business.
          </motion.h2>

          <ul className="mt-14 grid gap-x-16 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:gap-x-24 lg:gap-y-20">
            {steps.map((step) => (
              <motion.li
                key={step.title}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="relative aspect-[3/2] w-full max-w-[280px]">
                  <Image
                    src={step.image}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 640px) 280px, 70vw"
                    loading="lazy"
                    className="object-contain"
                  />
                </div>

                <h3 className="mt-6 text-[clamp(1.25rem,2.6vw,2.25rem)] tracking-wide text-white uppercase">
                  {step.title}
                </h3>

                <p className="mt-4 max-w-[34em] text-[11px] leading-relaxed text-white/70">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
