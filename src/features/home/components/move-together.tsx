"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function MoveTogether() {
  return (
    <section
      aria-labelledby="move-together-heading"
      className="bg-brand-primary py-16"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative grid text-[clamp(2.5rem,9.96vw,9rem)]"
        >
          <h2
            id="move-together-heading"
            className="font-heading leading-[1.31] font-bold tracking-tight text-white uppercase lg:col-start-1 lg:row-start-1"
          >
            <motion.span variants={fadeInUp} className="block">
              Let&rsquo;s move
            </motion.span>
            <motion.span variants={fadeInUp} className="block">
              The world
            </motion.span>
            {/* Indented to clear the CTA that sits on this line in the design. */}
            <motion.span variants={fadeInUp} className="block lg:pl-[34.3%]">
              Together
            </motion.span>
          </h2>

          {/* Work samples — vertically centred on the first two lines */}
          <motion.div
            variants={fadeInUp}
            aria-hidden
            className="pointer-events-none mt-8 lg:absolute lg:top-[1.31em] lg:right-0 lg:mt-0 lg:w-[32.2%] lg:-translate-y-1/2"
          >
            <div className="relative aspect-[248/177] overflow-hidden rounded-lg">
              <Image
                src="/images/webService.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* CTA — sits on the last line, to the left of "Together" */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex items-center gap-[0.62vw] lg:col-start-1 lg:row-start-1 lg:mt-0 lg:h-[1.31em] lg:self-end"
          >
            <div className="group flex items-center gap-[clamp(0.375rem,0.62vw,0.75rem)]">
              <Link
                href="/contact"
                className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-[clamp(3rem,6.92vw,6.25rem)] w-[clamp(11rem,20.2vw,18.25rem)] items-center justify-center rounded-full bg-white text-[clamp(0.6875rem,1.36vw,1.25rem)] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)]"
              >
                Become a client
              </Link>
              <Link
                href="/contact"
                aria-label="Become a client"
                className="text-brand-primary group-hover:bg-brand-tertiary grid aspect-square h-[clamp(3rem,6.92vw,6.25rem)] place-items-center rounded-full bg-white transition-all duration-300"
              >
                <ArrowUpLeft
                  className="size-[36%] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
