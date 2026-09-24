"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { MotionInView } from "@/components/shared";
import { Container } from "@/components/ui";
import { projects, type Project } from "@/features/projects/data/projects";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

const FEATURED_COUNT = 3;

export function FeaturedProjects() {
  const featured = projects.slice(0, FEATURED_COUNT);

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="bg-brand-primary py-16 lg:py-24"
    >
      <Container>
        <MotionInView className="flex flex-wrap items-center justify-between gap-6">
          <h2
            id="featured-projects-heading"
            className="text-brand-secondary font-sans text-[clamp(1.75rem,6.6vw,6rem)] leading-[1.1] font-normal tracking-tight uppercase"
          >
            Featured projects
          </h2>

          <div className="group flex items-center gap-2">
            <Link
              href="/projects"
              className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-12 items-center rounded-full bg-white px-7 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)]"
            >
              View all projects
            </Link>
            <Link
              href="/projects"
              aria-label="View all projects"
              className="text-brand-primary group-hover:bg-brand-tertiary grid size-12 place-items-center rounded-full bg-white transition-all duration-300"
            >
              <ArrowUpLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
                aria-hidden
              />
            </Link>
          </div>
        </MotionInView>

        <motion.ul
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {featured.map((project) => (
            <motion.li key={project.slug} variants={fadeInUp}>
              <FeaturedProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="ring-brand-secondary relative overflow-hidden rounded-lg ring-0 transition-all duration-300 group-hover:shadow-[0_0_35px_-6px_var(--color-brand-secondary)] group-hover:ring-2">
          <div className="relative aspect-[235/205]">
            <Image
              src={project.image}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Category badge */}
          <span className="bg-brand-primary/85 absolute bottom-3 left-3 rounded-md px-3 py-1.5 text-[11px] text-white backdrop-blur-sm">
            {project.category}
          </span>

          {/* Hover: dim the image and reveal the green badge */}
          <span
            aria-hidden
            className="bg-brand-primary/45 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span
            aria-hidden
            className="bg-brand-tertiary text-brand-primary absolute top-1/2 left-1/2 flex aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2 scale-75 flex-col items-center justify-center gap-1 rounded-full px-3 text-center text-[10px] leading-tight font-medium tracking-wider uppercase opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
          >
            <ArrowRight className="size-4" strokeWidth={1.75} />
            <span>
              View case
              <br />
              study
            </span>
          </span>
        </div>

        <h3 className="group-hover:text-brand-secondary mt-5 text-[15px] leading-snug text-white transition-colors">
          {project.title}
        </h3>
      </Link>

      <p className="mt-4 text-[11px] tracking-wider text-white/85 uppercase">
        {project.service}
      </p>
      <p className="mt-1.5 text-[11px] text-white/55">{project.name}</p>
    </article>
  );
}
