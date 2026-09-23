import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/features/projects/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  /** Eager-load the first row of thumbnails */
  eager?: boolean;
  className?: string;
};

export function ProjectCard({ project, eager, className }: ProjectCardProps) {
  return (
    <article className={cn("group relative", className)}>
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="ring-brand-secondary relative overflow-hidden rounded-lg ring-0 transition-all duration-300 group-hover:shadow-[0_0_35px_-6px_var(--color-brand-secondary)] group-hover:ring-2">
          <div className="relative aspect-[368/322]">
            <Image
              src={project.image}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              loading={eager ? "eager" : "lazy"}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Hover: dim the image and reveal the green "view case study" badge */}
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

        <h3 className="group-hover:text-brand-secondary mt-4 text-sm text-white transition-colors">
          {project.name}
        </h3>
      </Link>

      <p className="mt-2 text-[10px] tracking-wider text-white/55 uppercase">
        {project.service}
      </p>
    </article>
  );
}
