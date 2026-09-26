import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectApproach } from "@/features/projects/components/project-approach";
import { ProjectChallenge } from "@/features/projects/components/project-challenge";
import { ProjectCta } from "@/features/projects/components/project-cta";
import { ProjectGallery } from "@/features/projects/components/project-gallery";
import { ProjectSwot } from "@/features/projects/components/project-swot";
import { ProjectOutcome } from "@/features/projects/components/project-outcome";
import { ProjectStats } from "@/features/projects/components/project-stats";
import type { Project } from "@/features/projects/data/projects";

export function ProjectDetail({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  return (
    <article className="bg-brand-primary">
      <header className="bg-brand-secondary text-brand-primary pt-10 lg:pt-14">
        <Container className="flow-root">
          <nav aria-label="Breadcrumb">
            <ol className="text-brand-primary/70 flex flex-wrap items-center gap-2 text-[10px] tracking-wider uppercase">
              <li>
                <Link href="/projects" className="hover:underline">
                  Projects
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page">{project.name}</li>
            </ol>
          </nav>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
            <h1 className="font-heading max-w-4xl text-3xl leading-[1.05] font-bold tracking-tight uppercase sm:text-5xl lg:text-[4rem]">
              {project.title}
            </h1>

            <div className="group flex shrink-0 items-center gap-2">
              <Link
                href="/projects"
                className="bg-brand-primary group-hover:bg-brand-primary-light inline-flex h-9 items-center rounded-full px-6 text-[11px] font-medium tracking-wider text-white uppercase transition-colors"
              >
                Back
              </Link>
              <Link
                href="/projects"
                aria-label="Back to all projects"
                className="bg-brand-primary group-hover:bg-brand-primary-light grid size-9 place-items-center rounded-full text-white transition-colors"
              >
                <ArrowUpLeft
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          <div className="bg-brand-secondary relative z-10 mx-auto mt-8 mb-[-14%] w-[93%] rounded-xl p-2 shadow-xl lg:p-6">
            <div className="relative aspect-[430/267] overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 1200px, 93vw"
                loading="eager"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </header>
      <Container>
        <div aria-hidden className="pt-[14%]" />
      </Container>

      <ProjectStats stats={project.stats} />
      <ProjectChallenge challenge={project.challenge} />
      <ProjectApproach steps={project.approach} />
      <ProjectGallery
        image={project.sample.image}
        imageAlt={project.sample.imageAlt}
      />
      <ProjectSwot points={project.swot} />
      <ProjectOutcome outcome={project.outcome} />
      <ProjectCta />

      {related.length > 0 && (
        <section
          aria-labelledby="related-projects-heading"
          className="py-16"
        >
          <Container>
            <h2
              id="related-projects-heading"
              className="text-brand-secondary font-sans text-3xl font-light tracking-tight uppercase sm:text-4xl lg:text-5xl"
            >
              More projects
            </h2>

            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProjectCard project={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </article>
  );
}
