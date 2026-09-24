"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUpLeft } from "lucide-react";
import { MotionInView } from "@/components/shared";
import { Container } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const SERVICES = [
  "Ai Integration & Automation",
  "Dedicated Development Team",
  "Mobile App Development",
  "Creating Intuitive UI/UX Design",
  "Conversion Optimized Website",
  "Custom Web App Development",
] as const;

const inputClass =
  "w-full rounded-md border border-brand-primary/20 bg-white px-4 py-3 text-sm text-brand-primary placeholder:text-brand-primary/40 focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary focus:outline-none";

const labelClass = "mb-2 block text-sm text-brand-primary";

export function ContactForm() {
  const [selected, setSelected] = useState<string[]>([SERVICES[0]]);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const toggle = (service: string) =>
    setSelected((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      services: selected,
      budget: data.get("budget"),
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      company: data.get("company"),
      message: data.get("message"),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      event.currentTarget.reset();
      setSelected([SERVICES[0]]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      aria-labelledby="get-in-touch-heading"
      className="bg-brand-primary relative overflow-hidden py-16 lg:py-24"
    >
      <div
        aria-hidden
        className="bg-brand-secondary/30 pointer-events-none absolute top-1/3 -left-40 size-[420px] rounded-full blur-[130px]"
      />

      <Container>
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,34%)_minmax(0,66%)] lg:gap-12">
          <MotionInView className="flex flex-col">
            <h2
              id="get-in-touch-heading"
              className="text-brand-secondary font-sans text-5xl leading-[1.05] font-light tracking-tight uppercase sm:text-6xl lg:text-[6rem]"
            >
              Get in
              <br />
              touch
            </h2>

            {/* The artwork is 582x900 but the figure only occupies 18%-82% of
                that height, with a drop-shadow ellipse from ~65% down. The box
                crops to the figure and flexes to fill the column, so the
                contact details below line up with the bottom of the form. */}
            <div className="relative my-6 min-h-[200px] w-[300px] flex-1 overflow-hidden lg:min-h-[240px] lg:w-[430px]">
              <Image
                src="/images/contact-avatar.png"
                alt=""
                aria-hidden
                fill
                sizes="(min-width: 1024px) 430px, 300px"
                loading="lazy"
                className="figure-fade object-cover object-[50%_38%]"
              />
            </div>

            <dl className="space-y-7 text-white">
              <div>
                <dt className="text-lg tracking-wide uppercase">Email</dt>
                <dd className="mt-2 space-y-0.5 text-[11px] text-white/85">
                  <a
                    href={`mailto:${siteConfig.links.email}`}
                    className="block hover:underline"
                  >
                    {siteConfig.links.email}
                  </a>
                  <a
                    href={`mailto:${siteConfig.links.supportEmail}`}
                    className="block hover:underline"
                  >
                    {siteConfig.links.supportEmail}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-lg tracking-wide uppercase">Phone</dt>
                <dd className="mt-2 text-[11px] text-white/85">
                  <a
                    href={`tel:${siteConfig.links.phone.replace(/[^+\d]/g, "")}`}
                    className="hover:underline"
                  >
                    {siteConfig.links.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-lg tracking-wide uppercase">Address</dt>
                <dd className="mt-2 space-y-0.5 text-[11px] text-white/85">
                  {[...siteConfig.offices].reverse().map((office) => (
                    <span key={office.city} className="block">
                      {office.address}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </MotionInView>

          <MotionInView delay={0.1} className="space-y-5">
            <div className="text-brand-primary flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5">
              <div>
                <p className="font-medium">{siteConfig.name}</p>
                <p className="text-brand-primary/70 text-xs">
                  Ready to solve your challenge
                </p>
              </div>
              <div className="group flex items-center gap-2">
                <Link
                  href="/contact#get-in-touch-heading"
                  className="bg-brand-secondary group-hover:bg-brand-secondary-dark inline-flex h-11 items-center rounded-full px-6 text-[11px] font-medium tracking-wider text-white uppercase transition-colors"
                >
                  Book meeting
                </Link>
                <Link
                  href="/contact#get-in-touch-heading"
                  aria-label="Book a meeting"
                  className="bg-brand-secondary group-hover:bg-brand-secondary-dark grid size-11 place-items-center rounded-full text-white transition-colors"
                >
                  <ArrowUpLeft
                    className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </Link>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="text-brand-primary rounded-2xl bg-white p-6 lg:p-8"
            >
              <fieldset>
                <legend className="text-sm tracking-wide uppercase">
                  What can we do for you?
                </legend>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2.5">
                  {SERVICES.map((service) => {
                    const active = selected.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggle(service)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-[11px] transition-colors",
                          active
                            ? "border-brand-secondary text-brand-primary shadow-[0_0_0_1px_var(--color-brand-secondary)]"
                            : "hover:border-brand-primary/20 border-transparent",
                        )}
                      >
                        {service} <span aria-hidden>+</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8">
                <label htmlFor="budget" className={labelClass}>
                  Estimate Budget
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="text"
                  placeholder="Enter your budget"
                  className={inputClass}
                />
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Email"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone number"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company (optional)
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Enter brief message"
                  className={cn(inputClass, "resize-y")}
                />
              </div>

              {status === "error" && (
                <p role="alert" className="mt-4 text-xs text-red-600">
                  Something went wrong sending your message. Please email us at{" "}
                  <a
                    href={`mailto:${siteConfig.links.email}`}
                    className="underline"
                  >
                    {siteConfig.links.email}
                  </a>
                  .
                </p>
              )}

              <div className="group mt-8 flex items-center justify-end gap-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-brand-secondary group-hover:bg-brand-secondary-dark inline-flex h-11 items-center rounded-full px-7 text-[11px] font-medium tracking-wider text-white uppercase transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Submit"}
                </button>
                <span
                  aria-hidden
                  className="bg-brand-secondary grid size-11 place-items-center rounded-full text-white"
                >
                  <ArrowUpLeft
                    className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </span>
              </div>
            </form>
          </MotionInView>
        </div>
      </Container>
    </section>
  );
}
