import { ContactBanner, ContactForm } from "@/features/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Yuni Tech to start your project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactBanner />

      <ContactForm />
    </>
  );
}
