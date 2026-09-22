import { SectionHeading } from "@/components/shared";
import { Container } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Articles",
  description: "Articles from Yuni Solutions.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Articles" title="Coming soon" />
      </Container>
    </section>
  );
}
