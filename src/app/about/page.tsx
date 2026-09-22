import { SectionHeading } from "@/components/shared";
import { Container } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "Learn about the team and mission behind Yuni Solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="About us"
          title="Engineering with purpose"
          description="Content coming soon."
        />
      </Container>
    </section>
  );
}
