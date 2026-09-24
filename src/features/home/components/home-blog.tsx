"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { MotionInView } from "@/components/shared";
import { Container } from "@/components/ui";
import { ArticleCard } from "@/features/articles/components/article-card";
import { articles } from "@/features/articles/data/articles";

const AUTO_SPEED = 40;
const COPIES = 3;

export function HomeBlog() {
  const trackRef = useRef<HTMLUListElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const setWidth = useRef(0);
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      setWidth.current = el.scrollWidth / COPIES;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const release = () => {
      dragging.current = false;
    };
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, []);

  const wrap = (value: number) => {
    const w = setWidth.current;
    if (!w) return value;
    if (value <= -w) return value + w;
    if (value > 0) return value - w;
    return value;
  };

  useAnimationFrame((_, delta) => {
    if (dragging.current || reduceMotion) return;
    x.set(wrap(x.get() - (AUTO_SPEED * delta) / 1000));
  });

  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorX = useSpring(useMotionValue(0), { stiffness: 400, damping: 40 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 400, damping: 40 });

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    dragging.current = false;
    x.set(wrap(x.get() + info.velocity.x * 0.1));
    setTimeout(() => {
      didDrag.current = false;
    }, 60);
  };

  const items = Array.from({ length: COPIES }, () => articles).flat();

  return (
    <section
      aria-labelledby="home-blog-heading"
      className="bg-brand-primary overflow-hidden py-16 lg:py-24"
    >
      <Container>
        <MotionInView className="flex flex-wrap items-center justify-between gap-6">
          <h2
            id="home-blog-heading"
            className="text-brand-secondary font-sans text-4xl font-light tracking-tight uppercase sm:text-5xl lg:text-6xl"
          >
            Our blog
          </h2>

          <div className="group flex items-center gap-2">
            <Link
              href="/articles"
              className="text-brand-primary group-hover:bg-brand-tertiary inline-flex h-12 items-center rounded-full bg-white px-7 text-[11px] font-medium tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_30px_-4px_var(--color-brand-tertiary)]"
            >
              View all blogs
            </Link>
            <Link
              href="/articles"
              aria-label="View all blogs"
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
      </Container>

      <div
        ref={sliderRef}
        onPointerEnter={(e) =>
          e.pointerType === "mouse" && setCursorVisible(true)
        }
        onPointerLeave={() => setCursorVisible(false)}
        onPointerMove={onPointerMove}
        onClickCapture={(e) => {
          if (didDrag.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        className="relative mt-10 cursor-none select-none lg:mt-14"
      >
        <motion.ul
          ref={trackRef}
          drag="x"
          dragDirectionLock
          dragMomentum={false}
          onDragStart={() => {
            dragging.current = true;
            didDrag.current = true;
          }}
          onDragEnd={onDragEnd}
          style={{ x }}
          className="flex w-max gap-5 px-4"
          aria-label="Latest articles"
        >
          {items.map((article, i) => (
            <li
              key={`${article.slug}-${i}`}
              aria-hidden={i >= articles.length || undefined}
              className="w-[280px] shrink-0 sm:w-[320px]"
            >
              <ArticleCard article={article} eager={i < 4} />
            </li>
          ))}
        </motion.ul>

        {/* Green DRAG badge */}
        <motion.div
          aria-hidden
          style={{ x: cursorX, y: cursorY }}
          animate={{
            opacity: cursorVisible ? 1 : 0,
            scale: cursorVisible ? 1 : 0.6,
          }}
          transition={{ duration: 0.2 }}
          className="bg-brand-tertiary text-brand-primary pointer-events-none absolute top-0 left-0 z-20 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        >
          <span className="flex flex-col items-center gap-0.5 text-[10px] font-medium tracking-wider uppercase">
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            Drag
          </span>
        </motion.div>
      </div>
    </section>
  );
}
