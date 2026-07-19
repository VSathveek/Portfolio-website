import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the private area out of search indexes.
      disallow: ["/journal", "/login"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
