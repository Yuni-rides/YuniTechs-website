import { AboutBanner } from "@/features/about";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Yuni Solutions is a team of developers, designers, and strategists building software that moves businesses forward.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutBanner />;
}
