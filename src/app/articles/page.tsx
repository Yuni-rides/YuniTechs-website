import { ArticlesBanner, ArticlesCta, ArticlesGrid } from "@/features/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Articles",
  description:
    "Explore the latest in AI, automation, design, development, and digital growth from Yuni Solutions.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <>
      <ArticlesBanner />
      <ArticlesGrid />
      <ArticlesCta />
    </>
  );
}
