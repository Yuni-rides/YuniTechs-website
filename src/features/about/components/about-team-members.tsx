"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

const team: TeamMember[] = [
  { name: "Yousuf Taj", role: "CEO / Founder", image: "/images/owner.png" },
  {
    name: "Rami Abuarafeh",
    role: "Marketing Director",
    image: "/images/marketing-manager.png",
  },
  {
    name: "Faizan Abdul Latif",
    role: "CTO / Project Manager",
    image: "/images/hod.png",
  },
];

export function AboutTeamMembers() {
  return (
    <section
      aria-labelledby="about-team-members-heading"
      className="bg-brand-primary py-16 lg:py-24"
    >
      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2
            variants={fadeInUp}
            id="about-team-members-heading"
            className="text-brand-secondary font-sans text-[clamp(1.75rem,6.6vw,6rem)] leading-[1.1] font-normal tracking-tight uppercase"
          >
            The team
          </motion.h2>

          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-12">
            {team.map((member, i) => (
              <motion.li key={member.name} variants={fadeInUp} custom={i}>
                <div className="border-brand-secondary group relative overflow-hidden rounded-xl border-2 transition-shadow duration-300 hover:shadow-[0_0_35px_-6px_var(--color-brand-secondary)]">
                  <div className="relative aspect-square">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                <p className="mt-5 text-[clamp(0.875rem,1.6vw,1.375rem)] font-bold tracking-wide text-white uppercase">
                  {member.name}
                </p>
                <p className="mt-1.5 text-[clamp(0.625rem,0.9vw,0.8125rem)] tracking-wider text-white/55 uppercase">
                  {member.role}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
