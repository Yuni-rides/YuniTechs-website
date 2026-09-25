import { Faq } from "@/components/shared";
import {
  ServicesAccordion,
  ServicesBanner,
  ServicesCta,
} from "@/features/services";
import { buildMetadata } from "@/lib/seo";
import { homeFaqs } from "@/features/home/data/faqs";
import { KeyTechnologies, MoveTogether } from "@/features/home";

export const metadata = buildMetadata({
  title: "Services",
  description: "Web, mobile, cloud, and design services from Yuni Techs.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <ServicesBanner />
      <ServicesAccordion />

      <Faq
        items={homeFaqs}
        intro={
          <p>
            <strong>Yuni Tech</strong> delivers custom software, AI-powered
            applications, modern websites, and scalable digital solutions
            designed to help businesses innovate, grow, and stay ahead in an
            ever-evolving digital landscape. Operating from{" "}
            <strong>San Francisco</strong> and <strong>Karachi</strong>, we
            serve clients across the globe with a commitment to quality and
            excellence.
          </p>
        }
      />
      <MoveTogether />
      <KeyTechnologies />
      <ServicesCta />
    </>
  );
}
