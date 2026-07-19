import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

/** Public URLs only — the private journal and login are intentionally excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const routes = ["", "/research", "/projects", "/blog", "/cv", "/contact"];

  const pages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date || undefined,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
