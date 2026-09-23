import { notFound } from "next/navigation";
import { ProjectDetail } from "@/features/projects";
import {
  getProjectBySlug,
  getRelatedProjects,
  projects,
} from "@/features/projects/data/projects";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({ title: "Project not found", noIndex: true });
  }

  return buildMetadata({
    title: project.title,
    description: project.excerpt,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} related={getRelatedProjects(slug)} />;
}
