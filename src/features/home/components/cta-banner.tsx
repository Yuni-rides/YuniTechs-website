"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function CtaBanner() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="overflow-hidden bg-brand-primary py-20 lg:py-28"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative"
        >
          <h2
            id="cta-heading"
            className="font-heading text-[2.75rem] font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[6rem] xl:text-[6.75rem]"
          >
            <motion.span variants={fadeInUp} className="block">
              Let&rsquo;s move
            </motion.span>
            <motion.span variants={fadeInUp} className="block">
              The world
            </motion.span>
            <motion.span
              variants={fadeInUp}
              className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8 lg:gap-10"
            >
              <span className="order-2 sm:order-1">
                <BecomeAClient />
              </span>
              <span className="order-1 sm:order-2">Together</span>
            </motion.span>
          </h2>

          {/* Image — top-right, sitting between the first two lines on desktop */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 w-full max-w-[280px] overflow-hidden rounded-lg lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:max-w-[300px] xl:max-w-[340px]"
          >
            <Image
              src="/images/webService.png"
              alt="Collage of website designs built by Yuni Solution"
              width={504}
              height={355}
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/** "BECOME A CLIENT" pill + circular arrow, in the heading's flow. */
function BecomeAClient() {
  return (
    <span className="inline-flex items-center gap-2 align-middle font-sans font-normal normal-case tracking-normal">
      <Link
        href="/contact"
        className="inline-flex h-14 items-center rounded-full bg-white px-9 text-xs font-medium uppercase tracking-wider text-brand-primary transition-colors hover:bg-brand-tertiary lg:h-16 lg:px-10"
      >
        Become a client
      </Link>
      <Link
        href="/contact"
        aria-label="Become a client"
        className="grid size-14 place-items-center rounded-full bg-white text-brand-primary transition-colors hover:bg-brand-tertiary lg:size-16"
      >
        <ArrowUpLeft className="size-5" strokeWidth={1.75} aria-hidden />
      </Link>
    </span>
  );
}
