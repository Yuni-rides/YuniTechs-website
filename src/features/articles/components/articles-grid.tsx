"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui";
import { ArticleCard } from "@/features/articles/components/article-card";
import {
  articles,
  filters,
  type FilterId,
} from "@/features/articles/data/articles";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

export function ArticlesGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [page, setPage] = useState(1);

  const visible = useMemo(
    () =>
      activeFilter === "all"
        ? articles
        : articles.filter((article) => article.filter === activeFilter),
    [activeFilter],
  );

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = visible.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const selectFilter = (id: FilterId) => {
    setActiveFilter(id);
    setPage(1);
  };

  return (
    <section
      id="articles"
      aria-labelledby="articles-grid-heading"
      className="bg-brand-primary py-12 lg:py-16"
    >
      <h2 id="articles-grid-heading" className="sr-only">
        All articles
      </h2>

      <Container>
        {/* Filter tabs, wrapped in the outlined pill from the design */}
        <div
          role="tablist"
          aria-label="Filter articles by category"
          className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-[2rem] border border-white/20 px-6 py-4 lg:rounded-full lg:px-8"
        >
          {filters.map((filter) => {
            const selected = filter.id === activeFilter;
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="articles-grid-panel"
                onClick={() => selectFilter(filter.id)}
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
          id="articles-grid-panel"
          role="tabpanel"
          className="mt-10 lg:mt-14"
        >
          {pageItems.length === 0 ? (
            <p className="py-16 text-center text-sm text-white/70">
              No articles in this category yet.
            </p>
          ) : (
            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* No exit animation: filtered-out cards must unmount straight
                  away rather than waiting on an animation to finish. */}
              {pageItems.map((article, i) => (
                <motion.li
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ArticleCard article={article} eager={i < 3} />
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Articles pagination"
            className="mt-14 flex items-center justify-center gap-3"
          >
            <PageArrow
              direction="prev"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Page ${n}`}
                aria-current={n === currentPage ? "page" : undefined}
                onClick={() => setPage(n)}
                className={cn(
                  "grid size-10 cursor-pointer place-items-center rounded-full text-[11px] transition-colors",
                  n === currentPage
                    ? "bg-brand-secondary text-white"
                    : "text-white/70 ring-1 ring-white/20 hover:text-white",
                )}
              >
                {String(n).padStart(2, "0")}
              </button>
            ))}

            <PageArrow
              direction="next"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          </nav>
        )}
      </Container>
    </section>
  );
}

function PageArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className="grid size-10 cursor-pointer place-items-center rounded-full text-white transition-opacity hover:opacity-70 disabled:opacity-30"
    >
      <Icon className="size-5" strokeWidth={1.5} aria-hidden />
    </button>
  );
}
