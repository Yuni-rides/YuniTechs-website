"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MotionInView } from "@/components/shared";
import { Container } from "@/components/ui";
import { testimonials } from "@/features/home/data/testimonials";
import type { Testimonial } from "@/types";

/** px per second the track auto-scrolls */
const AUTO_SPEED = 40;
/** Render the list this many times so dragging never reveals an edge */
const COPIES = 3;

export function ClientReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidth = useRef(0);
  const dragging = useRef(false);
  const x = useMotionValue(0);

  // Measure the width of ONE set of cards (track holds COPIES sets).
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

  // Keep x within one set's range so the loop is seamless.
  const wrap = (value: number) => {
    const w = setWidth.current;
    if (!w) return value;
    if (value <= -w) return value + w;
    if (value > 0) return value - w;
    return value;
  };

  // Safety net: if a drag ends outside the track (or the pointer is
  // cancelled), make sure auto-scroll resumes.
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

  useAnimationFrame((_, delta) => {
    if (dragging.current) return;
    x.set(wrap(x.get() - (AUTO_SPEED * delta) / 1000));
  });

  // Custom "DRAG" cursor that follows the pointer inside the slider.
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorX = useSpring(useMotionValue(0), { stiffness: 400, damping: 40 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 400, damping: 40 });
  const sliderRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    dragging.current = false;
    // Small nudge in the drag direction so the release feels natural.
    x.set(wrap(x.get() + info.velocity.x * 0.1));
  };

  const items = Array.from({ length: COPIES }, () => testimonials).flat();

  return (
    <section
      aria-labelledby="client-reviews-heading"
      className="overflow-hidden bg-brand-primary py-16 lg:py-24"
    >
      <Container>
        <MotionInView>
          <h2
            id="client-reviews-heading"
            className="font-sans text-5xl font-light uppercase tracking-tight text-brand-secondary sm:text-6xl lg:text-7xl"
          >
            Client reviews
          </h2>
        </MotionInView>
      </Container>

      <div
        ref={sliderRef}
        onPointerEnter={(e) => e.pointerType === "mouse" && setCursorVisible(true)}
        onPointerLeave={() => setCursorVisible(false)}
        onPointerMove={onPointerMove}
        className="relative mt-10 cursor-none select-none lg:mt-14"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragMomentum={false}
          onDragStart={() => {
            dragging.current = true;
          }}
          onDragEnd={onDragEnd}
          style={{ x }}
          className="flex w-max gap-4 px-4 lg:gap-5"
          aria-label="Client testimonials"
          role="list"
        >
          {items.map((t, i) => (
            <ReviewCard
              key={`${t.id}-${i}`}
              testimonial={t}
              ariaHidden={i >= testimonials.length}
            />
          ))}
        </motion.div>

        {/* Green DRAG cursor */}
        <motion.div
          aria-hidden
          style={{ x: cursorX, y: cursorY }}
          animate={{ opacity: cursorVisible ? 1 : 0, scale: cursorVisible ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute left-0 top-0 z-20 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-tertiary text-brand-primary"
        >
          <span className="flex flex-col items-center gap-0.5 text-[10px] font-medium uppercase tracking-wider">
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
            Drag
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function ReviewCard({
  testimonial,
  ariaHidden,
}: {
  testimonial: Testimonial;
  ariaHidden: boolean;
}) {
  return (
    <article
      role="listitem"
      aria-hidden={ariaHidden || undefined}
      className="flex h-[260px] w-[250px] shrink-0 flex-col justify-between rounded-2xl bg-white p-5 text-brand-primary transition-all duration-300 hover:shadow-[-6px_6px_0_0_var(--color-brand-secondary)] hover:ring-1 hover:ring-brand-secondary sm:w-[270px] lg:h-[280px]"
    >
      <p className="text-[11px] leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <p className="text-[11px] font-medium text-brand-secondary">
        {testimonial.company}
      </p>
    </article>
  );
}
