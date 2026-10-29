import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://albinomice.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: `${base}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/feeder`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/pet`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/order`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/care`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${base}/shipping`, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/about`, priority: 0.5, changeFrequency: "yearly" },
    { url: `${base}/faq`, priority: 0.5, changeFrequency: "monthly" },
    ...articles.map((a) => ({
      url: `${base}/care/${a.slug}`,
      lastModified: new Date(a.publishedAt),
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
  ];
}
