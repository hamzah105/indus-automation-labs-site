import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/products",
  "/products/autochat",
  "/pricing",
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
    url: `${site.url}${route}`,
    lastModified: new Date("2026-07-01"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
