import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Products by Indus Automation Labs, including AutoChat and planned automation tools for local business workflows.",
  openGraph: {
    title: "Products by Indus Automation Labs",
    description: "AI-powered tools for customer support, business operations, and local automation."
  }
};

export default function ProductsPage() {
  return (
    <main>
      <Section
        eyebrow="Products"
        title="Products by Indus Automation Labs"
        description="We are building a suite of AI-powered tools for customer support, business operations, and local automation."
        className="pt-20"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <ProductCard
            title="AutoChat"
            status="Working desktop pilot"
            description="AI-powered business messaging automation desktop app for WhatsApp customer support, product questions, customer memory, supplier workflows, and voice-note transcription."
            actions={[
              { label: "Learn More", href: "/products/autochat", variant: "primary" },
              { label: "Download Release", href: site.githubRelease, variant: "secondary" }
            ]}
          />
          <ProductCard
            title="AutoVision / CCTV Intelligence"
            status="Planned / Research direction"
            description="Future local video-intelligence platform for CCTV event detection, structured JSON alerts, and business workflow integration."
            actions={[{ label: "Coming Soon", href: "#", disabled: true }]}
          />
          <ProductCard
            title="Workflow Automation Tools"
            status="Planned"
            description="Future tools for sales operations, reporting, notifications, and business process automation."
            actions={[{ label: "Coming Soon", href: "#", disabled: true }]}
          />
        </div>
      </Section>
    </main>
  );
}
