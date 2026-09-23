import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { Container } from "@/components/ui";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/shared";
import { ArticleCard } from "@/features/articles/components/article-card";
import {
  getFilterLabel,
  type Article,
} from "@/features/articles/data/articles";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const socials = [
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.links.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: siteConfig.links.youtube, Icon: YoutubeIcon },
];

export function ArticleDetail({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const published = new Date(article.publishedAt);

  return (
    <article className="bg-brand-primary">
      <header className="bg-brand-secondary text-brand-primary pt-12 lg:pt-16">
        <Container className="flow-root">
          <p className="text-brand-primary/70 flex items-center gap-2 text-[11px] tracking-wider uppercase">
            <span>By {article.author}</span>
            <span aria-hidden>•</span>
            <span>{article.readingMinutes} minutes read</span>
            <time className="sr-only" dateTime={article.publishedAt}>
              {published.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>

          <h1 className="font-heading mt-4 max-w-5xl text-3xl leading-[1.05] font-bold tracking-tight uppercase sm:text-5xl lg:text-[4.5rem]">
            {article.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ul className="flex gap-2" aria-label="Share this article">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.name} on ${label}`}
                      className="bg-brand-primary text-brand-secondary grid size-9 place-items-center rounded-full transition-transform hover:scale-105"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
              <span className="text-[11px] tracking-wider uppercase">
                Share
              </span>
            </div>

            <div className="group flex items-center gap-2">
              <Link
                href="/articles"
                className="bg-brand-primary hover:bg-brand-primary-light inline-flex h-9 items-center rounded-full px-6 text-[11px] font-medium tracking-wider text-white uppercase transition-colors"
              >
                Back
              </Link>
              <Link
                href="/articles"
                aria-label="Back to all articles"
                className="bg-brand-primary hover:bg-brand-primary-light grid size-9 place-items-center rounded-full text-white transition-colors"
              >
                <ArrowUpLeft
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          <div className="bg-brand-secondary relative z-10 mx-auto mt-10 mb-[-14%] w-[90%] rounded-xl p-2 shadow-xl lg:p-8">
            <div className="relative aspect-[430/267] overflow-hidden rounded-lg">
              <Image
                src={article.image}
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
        <div className="grid gap-8 pt-[calc(18%+2rem)] pb-14 lg:grid-cols-[minmax(0,30%)_minmax(0,70%)] lg:gap-10 lg:pb-20">
          {/* Topic — the filter tab this article belongs to */}
          <p className="bg-brand-secondary text-brand-primary flex h-fit w-full flex-wrap items-center gap-4 rounded-lg px-6 py-4 shadow-[0_10px_28px_-8px_rgb(0_0_0_/_0.65)]">
            <span className="text-sm font-bold tracking-wide uppercase">
              Topic:
            </span>
            <span className="text-[13px] tracking-wide uppercase">
              {getFilterLabel(article.filter)}
            </span>
          </p>

          <div>
            {article.sections.map((section, index) => (
              <section key={section.heading} className="mt-12 first:mt-0">
                <h2 className="text-2xl leading-snug tracking-tight text-white uppercase sm:text-[2rem]">
                  {index + 1}. {section.heading}
                </h2>

                {section.body.map((paragraph, i) => (
                  <p
                    key={paragraph}
                    className={cn(
                      "text-[13px] leading-relaxed text-white/75 sm:text-justify",
                      i === 0 ? "mt-6" : "mt-1",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-1 pl-4">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-[13px] leading-relaxed text-white/75 sm:text-justify"
                      >
                        <span aria-hidden className="mr-2">
                          ·
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section
          aria-labelledby="related-articles-heading"
          className="pb-16 lg:pb-24"
        >
          <Container>
            <h2
              id="related-articles-heading"
              className="text-brand-secondary font-sans text-3xl font-light tracking-tight uppercase sm:text-4xl lg:text-5xl"
            >
              Related articles
            </h2>

            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </article>
  );
}
