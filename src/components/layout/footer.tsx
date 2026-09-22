import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/shared";
import { Container } from "@/components/ui";
import { footerNav, footerServices } from "@/config/navigation";
import { siteConfig } from "@/config/site";

type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>;

const socials: { label: string; href: string; icon: SocialIcon }[] = [
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon },
  { label: "Instagram", href: siteConfig.links.instagram, icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.links.facebook, icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.links.youtube, icon: YoutubeIcon },
];

const photos = [
  { src: "/images/about3.png", alt: "Yuni Solution office" },
  { src: "/images/about4.png", alt: "Team working together" },
  { src: "/images/about2.png", alt: "Team celebration" },
];

export function Footer() {
  return (
    <footer className="bg-brand-primary px-4 pt-10 pb-6 sm:px-6 lg:px-10 lg:pt-16 lg:pb-8">
      <div className="bg-brand-secondary text-brand-primary mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] lg:rounded-[2.5rem]">
        <Container className="grid gap-12 pt-12 pb-4 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:gap-8 lg:pt-16">
          {/* Services */}
          <div>
            <h2 className="text-sm font-bold tracking-wide uppercase">
              Services
            </h2>
            <ul className="mt-6 space-y-3.5">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs tracking-wide uppercase transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[11px]">
              © {new Date().getFullYear()} Yuni Solution. All Rights Reserved.
            </p>
            <p className="mt-4 max-w-[230px] text-[11px] leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Main nav + offices + socials */}
          <div className="flex flex-col lg:pt-8">
            <nav aria-label="Footer">
              <ul className="space-y-4">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-base tracking-wide uppercase transition-opacity hover:opacity-70"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <address className="mt-12 not-italic lg:mt-auto">
              <p className="flex flex-wrap items-baseline gap-x-2 text-base tracking-wide uppercase">
                {siteConfig.offices.map((office, i) => (
                  <span
                    key={office.city}
                    className={i === 0 ? "font-bold" : ""}
                  >
                    {office.city}
                  </span>
                ))}
              </p>
              <p className="mt-1 text-[11px]">
                {siteConfig.offices[0].address}
              </p>
            </address>

            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="bg-brand-primary text-brand-secondary grid size-10 place-items-center rounded-full transition-transform hover:scale-105"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="lg:pt-8">
            <h2 className="text-2xl font-medium tracking-tight uppercase sm:text-3xl">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-1 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="hover:underline"
                >
                  {siteConfig.links.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.links.supportEmail}`}
                  className="hover:underline"
                >
                  {siteConfig.links.supportEmail}
                </a>
              </li>
            </ul>

            <ul className="mt-8 grid max-w-[220px] grid-cols-3 gap-1.5">
              {photos.map((photo) => (
                <li
                  key={photo.src}
                  className="aspect-square overflow-hidden rounded-sm"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={140}
                    height={140}
                    className="size-full object-cover"
                  />
                </li>
              ))}
            </ul>

            <p className="mt-6 max-w-[240px] text-2xl leading-tight font-bold sm:text-[1.75rem]">
              Ready to start your next digital project?
            </p>

            <div className="mt-5 flex items-center gap-2">
              <Link
                href="/contact"
                className="bg-brand-primary text-brand-secondary hover:bg-brand-primary-light inline-flex h-11 items-center rounded-full px-6 text-xs font-medium tracking-wider uppercase transition-colors"
              >
                Let&apos;s build together
              </Link>
              <Link
                href="/contact"
                aria-label="Contact us"
                className="bg-brand-primary text-brand-secondary hover:bg-brand-primary-light grid size-11 place-items-center rounded-full transition-colors"
              >
                <ArrowUpLeft className="size-5" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>

        {/* Giant wordmark */}
        <Container className="overflow-hidden pb-2 lg:pb-4">
          <div
            aria-hidden
            className="font-heading flex items-center gap-1 text-[clamp(3rem,12.5vw,10rem)] leading-none font-normal tracking-[-0.02em] whitespace-nowrap"
          >
            <Image
              src="/images/logo.png"
              alt=""
              width={45}
              height={51}
              unoptimized
              className="h-[0.9em] w-auto"
            />
            <span>Yuni Tech</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
