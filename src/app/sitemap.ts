import { newsArticles } from "@/features/news/data/articles";
import { SITE_URL } from "@/lib/constants";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/gioi-thieu", "/tin-tuc", "/lien-he"];
  const articlePages = newsArticles.map(
    (article) => `/tin-tuc/${article.slug}`,
  );

  return [...staticPages, ...articlePages].map((pathname) => ({
    url: new URL(pathname, SITE_URL).toString(),
    changeFrequency: "monthly",
    priority: pathname === "" ? 1 : 0.7,
  }));
}
