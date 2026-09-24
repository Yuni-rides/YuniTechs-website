"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpLeft,
  Atom,
  Bird,
  Bot,
  Box,
  Brain,
  Cloud,
  CloudCog,
  CloudLightning,
  Code2,
  Coffee,
  Container as ContainerIcon,
  Cuboid,
  Database,
  Feather,
  Flame,
  Gamepad2,
  GitBranch,
  HardDrive,
  Hexagon,
  Layers,
  LayoutTemplate,
  Leaf,
  Plug,
  RefreshCw,
  Rocket,
  Server,
  Share2,
  Shield,
  Ship,
  Shuffle,
  Smartphone,
  Sparkles,
  Triangle,
  Wind,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { MotionInView } from "@/components/shared";
import { Container } from "@/components/ui";
import { techCategories } from "@/features/home/data/technologies";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Atom,
  Bird,
  Bot,
  Box,
  Brain,
  Cloud,
  CloudCog,
  CloudLightning,
  Code2,
  Coffee,
  Container: ContainerIcon,
  Cuboid,
  Database,
  Feather,
  Flame,
  Gamepad2,
  GitBranch,
  HardDrive,
  Hexagon,
  Layers,
  LayoutTemplate,
  Leaf,
  Plug,
  RefreshCw,
  Rocket,
  Server,
  Share2,
  Shield,
  Ship,
  Shuffle,
  Smartphone,
  Sparkles,
  Triangle,
  Wind,
  Workflow,
  Zap,
};

function iconFor(name: string): LucideIcon {
  return iconMap[name] ?? Code2;
}

export function KeyTechnologies() {
  const [activeId, setActiveId] = useState(techCategories[0].id);
  const active =
    techCategories.find((c) => c.id === activeId) ?? techCategories[0];

  return (
    <section
      aria-labelledby="technologies-heading"
      className="bg-brand-primary relative"
    >
      <div className="bg-brand-secondary text-brand-primary py-20 [clip-path:polygon(0_4%,100%_0,100%_92%,0_100%)] sm:py-24 lg:py-32 lg:[clip-path:polygon(0_7%,100%_0,100%_90%,0_100%)]">
        <Container className="pt-6 pb-10 lg:pt-10 lg:pb-16">
          <MotionInView>
            <h2
              id="technologies-heading"
              className="font-sans text-5xl leading-[1.02] font-light tracking-tight uppercase sm:text-6xl lg:text-[4.5rem]"
            >
              Our key
              <br />
              technologies
            </h2>
          </MotionInView>

          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10">
            <MotionInView className="order-3 flex flex-col justify-end lg:order-1">
              <p className="max-w-[220px] text-[11px] leading-relaxed">
                Leveraging modern technologies to build scalable, innovative,
                and future-ready digital solutions.
              </p>
              <div className="group mt-5 flex items-center gap-2">
                <Link
                  href="/contact"
                  className="text-brand-primary group-hover:bg-brand-primary inline-flex h-10 items-center rounded-full bg-white px-5 text-[10px] font-medium tracking-wider uppercase transition-colors group-hover:text-white"
                >
                  Become a client
                </Link>
                <Link
                  href="/contact"
                  aria-label="Become a client"
                  className="text-brand-primary group-hover:bg-brand-primary grid size-10 place-items-center rounded-full bg-white transition-colors group-hover:text-white"
                >
                  <ArrowUpLeft
                    className="size-4"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </div>
            </MotionInView>

            <MotionInView delay={0.05} className="order-1 lg:order-2">
              <ul
                role="tablist"
                aria-label="Technology categories"
                className="flex flex-wrap gap-x-4 gap-y-3 lg:flex-col lg:items-start lg:gap-3"
              >
                {techCategories.map((cat) => {
                  const selected = cat.id === active.id;
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        aria-controls="technologies-panel"
                        onClick={() => setActiveId(cat.id)}
                        className={cn(
                          "rounded-full px-4 py-1 text-sm tracking-wide uppercase transition-colors lg:text-base cursor-pointer",
                          selected
                            ? "bg-brand-primary text-white ring-2 ring-white"
                            : "hover:bg-brand-primary/10",
                        )}
                      >
                        {cat.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </MotionInView>

            <div
              id="technologies-panel"
              role="tabpanel"
              className="order-2 lg:order-3 "
            >
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {active.groups.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-base font-normal tracking-wide uppercase ">
                      {group.title}
                    </h3>
                    <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                      {group.items.map((item) => {
                        const Icon = iconFor(item.icon);
                        return (
                          <li key={item.name} className="w-fit">
                            <span className="group border-brand-primary/50 hover:bg-brand-primary flex cursor-default items-center gap-2 rounded-full border-b px-2 py-1 text-[11px] transition-all duration-200 hover:border-transparent hover:text-white hover:ring-2 hover:ring-white cursor-pointer">
                              <Icon
                                className="size-3.5 shrink-0"
                                strokeWidth={2}
                                aria-hidden
                              />
                              {item.name} 
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
