"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function ServicesCta() {
  return (
    <section
      aria-labelledby="services-cta-heading"
      className="bg-brand-primary relative overflow-hidden"
    >
      <Container>
        <div className="relative py-14 lg:min-h-[700px] lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-8 w-[260px] sm:w-[340px] lg:absolute lg:bottom-0 lg:left-0 lg:mx-0 lg:mb-0 lg:w-[54%]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="motion-reduce:animate-none"
            >
              <Image
                src="/images/avatar-working-right.png"
                alt="Yuni Solution AI avatar working at a laptop"
                width={1356}
                height={1288}
                loading="lazy"
                className="h-auto w-full"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative z-20 lg:pl-[34%]"
          >
            <motion.h2
              variants={fadeInUp}
              id="services-cta-heading"
              className="font-heading text-[2.25rem] leading-[0.95] font-bold tracking-tight uppercase sm:text-5xl lg:text-[5.5rem] xl:text-[6rem]"
            >
              <span className="block text-white">Create bold</span>
              <span className="text-brand-secondary block">Grow beyond</span>
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="mt-8 lg:mt-10 lg:pl-[50%]"
            >
              <p className="max-w-[260px] text-[11px] leading-relaxed text-white/85">
                From strategy to execution, we build future-ready digital
                experiences that drive performance and lasting impact.
              </p>

              <div className="group mt-6 flex items-center gap-2">
                <Link
                  href="/contact"
                  className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-12 items-center rounded-full bg-white px-7 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)]"
                >
                  Let&rsquo;s get started
                </Link>
                <Link
                  href="/contact"
                  aria-label="Let's get started"
                  className="text-brand-primary group-hover:bg-brand-tertiary grid size-12 place-items-center rounded-full bg-white transition-all duration-300"
                >
                  <ArrowUpLeft
                    className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
