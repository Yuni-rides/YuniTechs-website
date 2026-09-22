import Image from "next/image";
import { MotionInView } from "@/components/shared";
import { Container } from "@/components/ui";
import { trustedBrands, type TrustedBrand } from "@/features/home/data/trusted-brands";
import { cn } from "@/lib/utils";

export function TrustedBy() {
  const firstRow = trustedBrands.slice(0, 5);
  const secondRow = trustedBrands.slice(5);

  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="overflow-hidden bg-brand-primary py-16 lg:py-24"
    >
      <Container>
        <MotionInView className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <h2
            id="trusted-by-heading"
            className="font-heading text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-brand-secondary sm:text-5xl lg:text-6xl"
          >
            Trusted by
            <br />
            visionaries
          </h2>
          <p className="max-w-[240px] text-[11px] leading-relaxed text-white/85 lg:pb-2">
            Building long-term relationships through innovation and results.
            Helping businesses transform ideas into scalable digital solutions.
          </p>
        </MotionInView>
      </Container>

      <div className="mt-10 flex flex-col gap-4 lg:mt-14 lg:gap-5">
        <MarqueeRow brands={firstRow} />
        <MarqueeRow brands={secondRow} reverse />
      </div>
    </section>
  );
}

type MarqueeRowProps = {
  brands: TrustedBrand[];
  reverse?: boolean;
};

function MarqueeRow({ brands, reverse = false }: MarqueeRowProps) {
  // Two copies of the row so the -50% translate loops seamlessly.
  const items = [...brands, ...brands];

  return (
    <div className="group relative w-full overflow-hidden">
      <ul
        aria-label="Trusted partner logos"
        className={cn(
          "flex w-max gap-4 will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none lg:gap-5",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ "--marquee-duration": "35s" } as React.CSSProperties}
      >
        {items.map((brand, i) => (
          <li
            key={`${brand.src}-${i}`}
            aria-hidden={i >= brands.length || undefined}
            className="grid size-28 shrink-0 place-items-center rounded-full bg-brand-secondary sm:size-32 lg:size-36"
          >
            <Image
              src={brand.src}
              alt={i < brands.length ? brand.name : ""}
              width={brand.width}
              height={brand.height}
              className="h-auto max-h-12 w-auto max-w-[70%] object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
