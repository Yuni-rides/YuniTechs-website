import { SectionHeading } from "@/components/shared";
import { Container } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Yuni Solutions to start your project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description="Contact form coming soon."
        />
      </Container>
    </section>
  );
}
