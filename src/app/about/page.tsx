import {
  AboutBanner,
  AboutProcess,
  AboutTeam,
  AboutTeamMembers,
} from "@/features/about";
import {
  ClientReviews,
  CtaBanner,
  FeaturedProjects,
  TrustedBy,
} from "@/features/home";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Yuni Solutions is a team of developers, designers, and strategists building software that moves businesses forward.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutBanner />
      <AboutTeam />
      <AboutTeamMembers />
      <AboutProcess />
      <FeaturedProjects />
      <TrustedBy />
      <ClientReviews />
      <CtaBanner />
    </>
  );
}
