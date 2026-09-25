"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MotionInView } from "@/components/shared";
import { Container } from "@/components/ui";
import {
  workCategories,
  workItems,
  type WorkCategoryId,
  type WorkItem,
} from "@/features/home/data/work";
import { cn } from "@/lib/utils";
import { WhoWeAre } from "./who-we-are";
import { OurProduct } from "./our-product";

export function OurWork() {
  const [active, setActive] = useState<WorkCategoryId>("website");
  const items = workItems.filter((item) => item.category === active);

  return (
    <section
      aria-labelledby="our-work-heading"
      className="bg-brand-primary relative"
    >
      <div className="bg-brand-secondary py-20 [clip-path:polygon(0_3%,100%_0,100%_100%,0_100%)] sm:py-24 lg:pt-46 lg:[clip-path:polygon(0_6%,100%_0,100%_100%,0_100%)]">
        <Container>
          <WhoWeAre />
          <MotionInView className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <h2
              id="our-work-heading"
              className="font-heading text-brand-primary text-5xl font-medium tracking-tight uppercase sm:text-6xl lg:text-7xl"
            >
              Our work
            </h2>

            <div
              role="tablist"
              aria-label="Filter work by category"
              className="no-scrollbar -mx-4 flex gap-6 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0"
            >
              {workCategories.map((cat) => {
                const selected = cat.id === active;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="our-work-panel"
                    onClick={() => setActive(cat.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 text-[11px] font-medium tracking-wider uppercase transition-colors",
                      selected
                        ? "text-brand-primary"
                        : "text-brand-primary/60 hover:text-brand-primary",
                    )}
                  >
                    {selected && <ArrowRight className="size-3" aria-hidden />}
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </MotionInView>

          <div
            id="our-work-panel"
            role="tabpanel"
            className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-2 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {items.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-brand-primary/80 text-sm lg:col-span-2"
                >
                  Case studies for this category are coming soon.
                </motion.p>
              ) : (
                items.map((item, i) => (
                  <WorkCard key={item.id} item={item} index={i} />
                ))
              )}
            </AnimatePresence>
          </div>
          <OurProduct />
        </Container>
      </div>

      <div
        aria-hidden
        className="bg-brand-primary h-16 [clip-path:polygon(0_0,100%_60%,100%_100%,0_100%)] sm:h-24 lg:h-32"
        style={{ marginTop: "-1px" }}
      />
    </section>
  );
}

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "text-brand-primary overflow-hidden rounded-xl bg-white p-5 sm:p-6",
        item.wide && "lg:col-span-2",
      )}
    >
      <div
        className={cn(
          "grid gap-6",
          item.wide
            ? "lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-10"
            : "sm:grid-cols-2",
        )}
      >
        <div>
          <p className="text-brand-primary/60 text-[10px] font-medium tracking-wider uppercase">
            {item.eyebrow}
          </p>
          <h3 className="font-heading text-brand-secondary mt-2 text-base leading-tight font-bold uppercase">
            {item.title}
          </h3>
          <p className="text-brand-primary/80 mt-3 text-[11px] leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="relative">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            className="h-auto w-full rounded-md object-cover"
          />
          {item.caseStudyHref && (
            <Link
              href={item.caseStudyHref}
              className="bg-brand-tertiary text-brand-primary absolute top-1/2 left-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center text-[10px] leading-tight font-medium tracking-wider uppercase transition-transform hover:scale-105"
            >
              View case
              <br />
              study
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
