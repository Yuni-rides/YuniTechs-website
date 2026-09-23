import { CtaBanner } from "@/features/home";
import { ProjectsBanner, ProjectsGrid } from "@/features/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Selected work from Yuni Solutions across AI, automation, design, and development.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <ProjectsBanner />
      <ProjectsGrid />
      <CtaBanner/>
    </>
  );
}
