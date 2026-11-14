import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { oompContent } from "@/lib/oomp-content";

const routes = [
  "",
  "/products",
  "/products/autochat",
  "/pricing",
  "/labs",
  "/labs/matterflux",
  "/labs/oomp",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
  "/refund-policy",
  "/acceptable-use",
  "/login"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: route === "/labs/oomp" ? oompContent.canonical : `${site.url}${route}`,
    lastModified: new Date(route === "/labs" || route === "/labs/oomp" ? oompContent.source.verified : "2026-07-01"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
