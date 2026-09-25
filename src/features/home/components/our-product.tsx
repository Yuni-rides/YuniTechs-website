"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

type Feature = {
  label: string;
  image: string;
  width: string;
};

const features: Feature[] = [
  {
    label: "Live Ride\nTracking",
    image: "/images/liveTracking.png",
    width: "66%",
  },
  {
    label: "Driver Platform",
    image: "/images/driverPlatform.png",
    width: "61%",
  },
  {
    label: "Smart Dispatch",
    image: "/images/smartDispatch.png",
    width: "57%",
  },
  {
    label: "Family\nExperience",
    image: "/images/familyExperience.png",
    width: "67%",
  },
];

const tile =
  "rounded-xl border border-white/12 bg-white/[0.03] transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.06]";

export function OurProduct() {
  return (
    <section
      aria-labelledby="our-product-heading"
      className="pt-16"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-brand-primary relative rounded-2xl p-6 lg:rounded-[2rem] lg:p-[4%]"
        >
          <motion.h2
            variants={fadeInUp}
            id="our-product-heading"
            className="text-brand-secondary font-sans text-[clamp(2.25rem,7.97vw,7.25rem)] leading-none font-light tracking-tight uppercase"
          >
            Our product
          </motion.h2>

          <div className="mt-8 grid gap-10 lg:mt-[2.6%] lg:grid-cols-[38.8%_1fr] lg:items-center lg:gap-x-[7.2%] lg:gap-y-0">
            <div>
              <motion.div
                variants={fadeInUp}
                className={`${tile} relative aspect-[233/70] overflow-hidden`}
              >
                <Image
                  src="/images/productLogo.png"
                  alt="Yuni Rides"
                  width={245}
                  height={153}
                  className="absolute top-1/2 left-1/2 w-[59.5%] -translate-x-1/2 -translate-y-1/2"
                />
              </motion.div>

              <ul className="mt-[4.3%] grid grid-cols-2 gap-x-[8.6%] gap-y-[4.3%]">
                {features.map((feature) => (
                  <motion.li
                    variants={fadeInUp}
                    key={feature.label}
                    className={`${tile} flex aspect-[106/110] flex-col items-center justify-center gap-[7%] px-2 text-center`}
                  >
                    <Image
                      src={feature.image}
                      alt=""
                      aria-hidden
                      width={138}
                      height={92}
                      style={{ width: feature.width }}
                      className="h-auto"
                    />
                    <span className="text-[clamp(0.75rem,1.64vw,1.5rem)] leading-tight whitespace-pre-line text-white">
                      {feature.label}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.p
                variants={fadeInUp}
                className="mt-[20.6%] text-[clamp(0.75rem,1.51vw,1.375rem)] leading-[1.5] text-white/70"
              >
                A technology-powered student transportation ecosystem built for
                safer, smarter and more connected journeys.
              </motion.p>
            </div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-brand-secondary text-[clamp(1.125rem,2.99vw,2.75rem)] leading-none tracking-tight uppercase">
                Our flagship product
              </h3>
              <div className="relative mt-[3%] aspect-[812/460] lg:-mr-[13.1%] lg:-ml-[7.6%]">
                <Image
                  src="/images/productMainImage.png"
                  alt="The Yuni Rides platform shown on a laptop and a phone"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  loading="lazy"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="bg-brand-secondary mt-8 flex items-center justify-center gap-[1.2%] rounded-xl py-6 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-[43%] lg:rounded-none lg:rounded-tl-[2.75rem] lg:rounded-br-[2rem] lg:py-[4%]"
          >
            <div className="group flex items-center gap-[2%] lg:gap-[1.8%]">
              <Link
                href="/projects"
                className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-[clamp(3rem,6.98vw,6.25rem)] shrink-0 items-center rounded-full bg-white px-6 text-[clamp(0.6875rem,1.38vw,1.25rem)] font-medium tracking-wider whitespace-nowrap uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)] sm:px-8 lg:px-12"
              >
                View case study
              </Link>
              <Link
                href="/projects"
                aria-label="View the Yuni Rides case study"
                className="text-brand-primary group-hover:bg-brand-tertiary grid aspect-square h-[clamp(3rem,6.98vw,6.25rem)] place-items-center rounded-full bg-white transition-all duration-300"
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
