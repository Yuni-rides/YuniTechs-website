import { SectionHeading } from "@/components/shared";
import { Container } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Projects from Yuni Solutions.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Projects" title="Coming soon" />
      </Container>
    </section>
  );
}
