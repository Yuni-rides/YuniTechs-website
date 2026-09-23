import {
  AiAutomation,
  ClientReviews,
  CtaBanner,
  HomeBanner,
  HomeBlog,
  KeyTechnologies,
  OurWork,
  TrustedBy,
} from "@/features/home";
import { homeFaqs } from "@/features/home/data/faqs";
import { ServicesAccordion } from "@/features/services";
import { Faq } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <HomeBanner />
      <TrustedBy />
      <OurWork />
      <ServicesAccordion />
      <ClientReviews />
      <KeyTechnologies />
      <HomeBlog />
      <AiAutomation />
      <Faq
        items={homeFaqs}
        intro={
          <p>
            <strong>Yuni Solution</strong> delivers custom software, AI-powered
            applications, modern websites, and scalable digital solutions
            designed to help businesses innovate, grow, and stay ahead in an
            ever-evolving digital landscape. Operating from{" "}
            <strong>San Francisco</strong> and <strong>Karachi</strong>, we
            serve clients across the globe with a commitment to quality and
            excellence.
          </p>
        }
      />
      <CtaBanner />
    </>
  );
}
