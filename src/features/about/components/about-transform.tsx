"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

const MEDIA = "/images/webService.png";

export function AboutTransform() {
  return (
    <section
      aria-labelledby="about-transform-heading"
      className="bg-brand-primary py-16 lg:py-24"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-stretch gap-10 lg:grid-cols-[1.383fr_1fr] lg:gap-x-[2%] lg:gap-y-0"
        >
          <motion.div
            variants={fadeInUp}
            aria-hidden
            className="relative aspect-[563/392] overflow-hidden rounded-sm"
          >
            <Image
              src={MEDIA}
              alt=""
              fill
              sizes="(min-width: 1024px) 57vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </motion.div>

          <div className="flex flex-col justify-between gap-10">
            <motion.h2
              variants={fadeInUp}
              id="about-transform-heading"
              className="font-heading text-[clamp(1.5rem,3.15vw,2.6rem)] leading-[1.24] font-bold tracking-tight text-white uppercase"
            >
              Yuni Solutions doesn&rsquo;t just create digital products &ndash;
              we transform businesses.
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <p className="max-w-[34ch] text-[15px] leading-[1.45] text-white/85">
                We don&rsquo;t just ship code or check off tasks; we engineer
                high-impact digital ecosystems tailored to scale your business
                and captivate your audience.
              </p>

              <div className="group mt-8 flex items-center gap-2">
                <Link
                  href="/services"
                  className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-14 items-center rounded-full bg-white px-8 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)]"
                >
                  View service
                </Link>
                <Link
                  href="/services"
                  aria-label="View services"
                  className="text-brand-primary group-hover:bg-brand-tertiary grid size-14 place-items-center rounded-full bg-white transition-all duration-300"
                >
                  <ArrowUpLeft
                    className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
