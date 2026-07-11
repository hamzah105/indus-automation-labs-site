import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { StatusPill } from "@/components/StatusPill";
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

const suiteLayers = [
  {
    number: "01",
    title: "Conversation intelligence",
    description: "Customer support, catalog answers, training, and approval-based replies through AutoChat."
  },
  {
    number: "02",
    title: "Operational intelligence",
    description: "Planned workflow tools for business reporting, notifications, and repeatable internal processes."
  },
  {
    number: "03",
    title: "Visual intelligence",
    description: "A research direction for structured CCTV events and business-aware local alerts."
  }
];

export default function ProductsPage() {
  return (
    <main>
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pb-12 lg:pt-28">
        <div className="hero-orb hero-orb-cyan" aria-hidden="true" />
        <div className="relative max-w-4xl reveal-up">
          <p className="eyebrow-label">Product suite</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-6xl">
            Practical automation products, <span className="gradient-text">built to grow with operators.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-slate-300">
            We are building a suite of AI-powered tools for customer support, business operations, and local automation—starting with Windows desktop automation software businesses can use today.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <StatusPill tone="mint">1 product available</StatusPill>
            <StatusPill tone="violet">2 planned directions</StatusPill>
            <StatusPill tone="cyan">Desktop-first foundation</StatusPill>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Products"
        title="A focused first product, with a wider platform direction."
        description="AutoChat is available as Windows desktop automation software. AutoVision and broader workflow tools remain clearly labeled as planned product directions."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <ProductCard
            title="AutoChat"
            eyebrow="Available now"
            status="Windows desktop software"
            featured
            icon={<Icon name="message" />}
            description="AI-powered business messaging automation desktop app for WhatsApp customer support, product questions, customer memory, supplier workflows, and voice-note transcription."
            actions={[
              { label: "Explore AutoChat", href: "/products/autochat", variant: "primary" },
              { label: "Download v1.0.0", href: site.releaseUrl, variant: "secondary" },
              { label: "Watch Tutorial", href: site.tutorialUrl, variant: "quiet" }
            ]}
          />
          <ProductCard
            title="AutoVision / CCTV Intelligence"
            eyebrow="Research direction"
            status="Planned"
            planned
            icon={<Icon name="camera" />}
            description="Future local video-intelligence platform for CCTV event detection, structured JSON alerts, and business workflow integration."
            actions={[{ label: "Coming Soon", href: "#", disabled: true }]}
          />
          <ProductCard
            title="Workflow Automation Tools"
            eyebrow="Platform direction"
            status="Planned"
            planned
            icon={<Icon name="workflow" />}
            description="Future tools for sales operations, reporting, notifications, and business process automation."
            actions={[{ label: "Coming Soon", href: "#", disabled: true }]}
          />
        </div>
      </Section>

      <Section
        eyebrow="Platform map"
        title="One automation direction, built in deliberate layers."
        description="The roadmap starts with a real customer-support workflow and expands toward operational and visual intelligence only as the foundations mature."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {suiteLayers.map((layer) => (
            <article key={layer.number} className="premium-card relative overflow-hidden rounded-3xl p-6">
              <p className="font-display text-4xl font-semibold text-white/[0.08]">{layer.number}</p>
              <h2 className="mt-5 font-display text-xl font-semibold text-white">{layer.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{layer.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <CTASection title="Start with AutoChat, our Windows desktop automation software." />
    </main>
  );
}
