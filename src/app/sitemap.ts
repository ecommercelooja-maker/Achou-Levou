import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: agora, changeFrequency: "daily", priority: 1 },
    ...["sobre", "contato", "privacidade", "termos", "cookies", "afiliados"].map((p) => ({
      url: `${SITE_URL}/${p}`,
      lastModified: agora,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
