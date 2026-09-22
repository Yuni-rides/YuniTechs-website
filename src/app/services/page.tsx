import { ServicesAccordion } from "@/features/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: "Web, mobile, cloud, and design services from Yuni Solutions.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesAccordion />;
}
