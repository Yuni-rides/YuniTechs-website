"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { ProjectCard } from "@/features/projects/components/project-card";
import {
  projectFilters,
  projects,
  type ProjectFilterId,
} from "@/features/projects/data/projects";
import { cn } from "@/lib/utils";

export function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("website");

  const visible = useMemo(
    () => projects.filter((project) => project.filter === activeFilter),
    [activeFilter],
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-grid-heading"
      className="bg-brand-primary py-12 lg:py-16"
    >
      <h2 id="projects-grid-heading" className="sr-only">
        All projects
      </h2>

      <Container>
        {/* Filter tabs, wrapped in the outlined pill from the design */}
        <div
          role="tablist"
          aria-label="Filter projects by service"
          className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-[2rem] border border-white/20 px-6 py-4 lg:rounded-full lg:px-8"
        >
          {projectFilters.map((filter) => {
            const selected = filter.id === activeFilter;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="projects-grid-panel"
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "cursor-pointer rounded-full px-4 py-1.5 text-[11px] tracking-wider uppercase transition-colors",
                  selected
                    ? "text-brand-secondary ring-brand-secondary ring-1"
                    : "text-white/80 hover:text-white",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div
          id="projects-grid-panel"
          role="tabpanel"
          className="mt-10 lg:mt-14"
        >
          {visible.length === 0 ? (
            <p className="py-16 text-center text-sm text-white/70">
              No projects in this category yet.
            </p>
          ) : (
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* No exit animation: filtered-out cards must unmount straight
                  away rather than waiting on an animation to finish. */}
              {visible.map((project, i) => (
                <motion.li
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProjectCard project={project} eager={i < 3} />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
