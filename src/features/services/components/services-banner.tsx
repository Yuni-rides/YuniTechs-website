"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LetsTalk } from "@/components/layout";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function ServicesBanner() {
  return (
    <section className="bg-brand-primary pt-10 pb-16 lg:pt-14 lg:pb-24">
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-heading text-[clamp(2.75rem,9.5vw,8rem)] leading-[0.95] font-bold tracking-tight text-white uppercase"
          >
            Our <span className="text-brand-secondary">Services</span>
          </motion.h1>

          {/* Work collage on the left, copy + CTA tucked to its bottom-right */}
          <div className="mt-8 grid items-end gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,240px)] lg:gap-12">
            <motion.div variants={fadeInUp}>
              <Image
                src="/images/webService.png"
                alt="A selection of websites and product interfaces built by Yuni Solution"
                width={1008}
                height={410}
                priority
                // sizes="(min-width: 1024px) 66vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-5 lg:pb-10"
            >
              <p className="max-w-[230px] text-[11px] leading-relaxed text-white/85">
                Empowering Businesses Through Smart Technology &amp; Innovation.
              </p>
              <LetsTalk label="Future Insights" href="/contact" />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
