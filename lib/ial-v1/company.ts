import type { Metadata } from "next";
import { site } from "@/lib/site";

export function companyMetadata(title: string, description: string, route: string): Metadata {
  return {
    title, description, alternates: { canonical: route },
    openGraph: { title: `${title} — Indus Automation Labs`, description, url: `${site.url}${route}`, images: [{ url: `${site.url}/ial-v1/company-og.png`, width: 1200, height: 630, alt: "Indus Automation Labs — the official luminous hexagonal A mark." }] },
    twitter: { card: "summary_large_image", title, description, images: [`${site.url}/ial-v1/company-og.png`] }
  };
}

export const companyMilestones = [
  { id: "origins", label: "THE STARTING POINT", title: "Real problems come first.", status: "Practical origins", description: "The company’s direction comes from real SME operations: repeated questions, scattered product information and decisions that still need an owner. Start with the workflow, then choose the technology.", href: "/products", action: "Explore the work" },
  { id: "autochat", label: "SHIPPED SOFTWARE / 16 JULY 2026", title: "A useful place to begin.", status: "AutoChat v1.1.0 · Available", description: "AutoChat brings business messaging, catalog context and operator choice into a Windows desktop application. Its current official release is v1.1.0.", href: "https://github.com/hamzah105/AutoChat-PK-Releases/releases/tag/v1.1.0", action: "Read the official release" },
  { id: "interaction", label: "INTERACTION AS AN EXPERIMENT", title: "Make an action feel intentional.", status: "MatterFlux · Experimental", description: "MatterFlux explores a controlled matter-to-energy interaction for important interface actions. The developer demo and package are experiments, separate from the commercial desktop product.", href: "/labs/matterflux", action: "Visit the experiment" },
  { id: "memory", label: "OPEN RESEARCH", title: "Give memory a structure.", status: "OOMP · Alpha research", description: "OOMP explores persistent, inspectable memory for AI systems. It is open-source alpha research, with its own source, documentation and working demonstration.", href: "/labs/oomp", action: "Explore memory research" },
  { id: "horizon", label: "THE OPEN HORIZON", title: "Keep asking better questions.", status: "Research directions", description: "Local and edge AI, intelligent agents, computer vision, robotics and spatial intelligence are directions for continued research. They are not claims of released hardware or deployed systems.", href: "/labs", action: "Enter the Labs" }
] as const;

/** Existing commercial values, explicitly reconfirmed by the founder on 17 Nov 2026. */
export const licensingOffer = {
  regular: "PKR 20,000", price: "10,000", currency: "PKR", discount: "50%", voucher: "NEWCOM",
  terms: "This launch offer is intended for early AutoChat customers and may change before public rollout. Final subscription, renewal, and commercial licensing terms may be updated as AutoChat develops.",
  confirmation: "2026-11-17"
} as const;

export const inquiryCategories = [
  { id: "product", label: "Product support", subject: "AutoChat product support", detail: "Setup, product questions, licensing or the NEWCOM voucher." },
  { id: "technical", label: "Technical inquiry", subject: "Indus Automation Labs technical inquiry", detail: "Developer tools, integration questions or a reproducible issue." },
  { id: "research", label: "Research collaboration", subject: "Indus Automation Labs research collaboration", detail: "A useful problem, an engineering idea or a research discussion." }
] as const;
