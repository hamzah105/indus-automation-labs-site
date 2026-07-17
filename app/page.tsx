import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroSection } from "@/components/HeroSection";
import { Icon, type IconName } from "@/components/Icon";
import { Section } from "@/components/Section";
import { StatusPill } from "@/components/StatusPill";
import { productFeatures } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Automation Software for Modern Businesses",
  description:
    "Indus Automation Labs builds practical AI automation tools for small and medium businesses, starting with AutoChat for business messaging automation.",
  openGraph: {
    title: "Indus Automation Labs - AI Automation Software",
    description:
      "Explore AutoChat v1.1.0, a Windows desktop application for business messaging and customer-support automation."
  }
};

const buildAreas: Array<{
  title: string;
  description: string;
  icon: IconName;
  accent: "cyan" | "violet" | "mint" | "solar";
  tag: string;
}> = [
  {
    title: "Customer support automation",
    description: "AI-assisted replies and owner-controlled workflows for repetitive customer questions.",
    icon: "message",
    accent: "cyan",
    tag: "Conversations"
  },
  {
    title: "Sales and lead workflows",
    description: "Tools that help businesses organize inquiries, follow-ups, and lead handling.",
    icon: "workflow",
    accent: "violet",
    tag: "Operations"
  },
  {
    title: "Business messaging",
    description: "Messaging automation designed for real local business conversations and support patterns.",
    icon: "connected",
    accent: "mint",
    tag: "Support"
  },
  {
    title: "Local business operations",
    description: "Practical systems for catalog, policy, delivery, and supplier-dependent tasks.",
    icon: "supplier",
    accent: "solar",
    tag: "SME workflows"
  },
  {
    title: "Future vision tools",
    description: "A planned direction for CCTV event intelligence and structured business alerts.",
    icon: "camera",
    accent: "violet",
    tag: "Research"
  },
  {
    title: "Custom automation systems",
    description: "Automation foundations for industry-specific workflows as the platform matures.",
    icon: "automation",
    accent: "cyan",
    tag: "Platform"
  }
];

const featureIcons: IconName[] = [
  "message",
  "catalog",
  "modes",
  "memory",
  "training",
  "supplier",
  "voice",
  "license",
  "windows"
];

const responsibleItems = [
  "Human approval mode for sensitive conversations",
  "No hallucinated stock, availability, or prices",
  "Customer memory isolation by contact",
  "Owner-approved training and knowledge updates",
  "Supplier privacy for hidden fulfillment details",
  "Safe desktop deployment with local language support including English, Urdu, and Roman Urdu"
];

const previewModules: Array<{ label: string; detail: string; icon: IconName; tone: string }> = [
  { label: "WhatsApp Connected", detail: "Session online", icon: "connected", tone: "text-mint" },
  { label: "Approval Mode Active", detail: "Owner review enabled", icon: "shield", tone: "text-cyanGlow" },
  { label: "Product Catalog", detail: "Business data indexed", icon: "catalog", tone: "text-violetGlow" },
  { label: "Training Inbox", detail: "Unknown answers captured", icon: "training", tone: "text-cyanGlow" },
  { label: "Supplier Desk", detail: "Private fulfillment flow", icon: "supplier", tone: "text-mint" },
  { label: "Voice Note Transcription", detail: "Audio enters reply flow", icon: "voice", tone: "text-solar" },
  { label: "License Section", detail: "License activation in-app", icon: "license", tone: "text-violetGlow" }
];

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-white/[0.08] bg-ink/[0.6] sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Desktop-first", "Windows desktop deployment"],
            ["Human-controlled", "Manual and approval modes"],
            ["Business-aware", "Catalog and policy context"],
            ["Privacy-minded", "Memory isolated per customer"]
          ].map(([title, detail], index) => (
            <div key={title} className={`p-5 ${index ? "border-t border-white/[0.07] sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 sm:border-t lg:border-l lg:border-t-0" : ""}`}>
              <p className="font-display text-sm font-semibold text-white">{title}</p>
              <p className="mt-1.5 text-xs text-slate-500">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Inside AutoChat"
        title="One workspace for the complete support workflow."
        description="AutoChat connects the operational pieces behind a customer reply—from the business catalog and training inbox to approval, memory, supplier coordination, and licensing."
        centered
      >
        <div className="premium-card relative overflow-hidden rounded-[2rem] p-5 sm:p-8">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violetGlow/[0.08] blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col justify-between gap-5 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">AutoChat module map</p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-white">Built around real operator decisions</h3>
            </div>
            <StatusPill tone="mint">7 workflow modules ready</StatusPill>
          </div>
          <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {previewModules.map((module, index) => (
              <div key={module.label} className={`group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition duration-300 hover:border-cyanGlow/25 hover:bg-cyanGlow/[0.05] ${index === previewModules.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] ${module.tone}`}>
                  <Icon name={module.icon} className="h-4 w-4" />
                </div>
                <p className="mt-4 text-sm font-semibold text-white">{module.label}</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">{module.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="What we build"
        title="Practical AI automation for business operators."
        description="Indus Automation Labs focuses on tools that help small and medium businesses respond faster, reduce repetitive work, and keep owners in control of automation."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buildAreas.map((area) => (
            <FeatureCard
              key={area.title}
              title={area.title}
              description={area.description}
              icon={<Icon name={area.icon} />}
              tag={area.tag}
              accent={area.accent}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="First product"
        title="AutoChat brings controlled AI replies into a Windows desktop app."
        description="AutoChat helps businesses connect WhatsApp, manage customer messages, create AI replies, approve drafts, train business knowledge, manage product catalog data, remember customer-specific details safely, and coordinate supplier-dependent requests."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={<Icon name={featureIcons[index]} />}
              accent={index % 4 === 1 ? "violet" : index % 4 === 2 ? "mint" : index % 4 === 3 ? "solar" : "cyan"}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Why AutoChat exists"
        title="Repetitive customer questions should not consume the whole day."
        description="Small businesses receive repeated WhatsApp questions about stock, price, delivery, product variations, availability, and order follow-ups. Manual replies are slow and inconsistent. Generic chatbots often fail because they do not understand the business catalog, owner preferences, local language patterns, or supplier-dependent details. AutoChat is designed for business-safe automation with human control."
      >
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <p className="eyebrow-label">Responsible automation</p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.02em] text-white">Designed for careful rollout before full automation.</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              The product direction favors human oversight, scoped memory, owner training, and cautious deployment over uncontrolled messaging.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <StatusPill tone="cyan">Manual mode</StatusPill>
              <StatusPill tone="violet">Approval mode</StatusPill>
              <StatusPill tone="mint">Auto mode when ready</StatusPill>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {responsibleItems.map((item) => (
              <div key={item} className="premium-card flex items-start gap-3 rounded-2xl p-5 text-sm leading-6 text-slate-300">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-mint/20 bg-mint/[0.07] text-mint">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Platform direction"
        title="A broader automation suite is planned."
        description="Indus Automation Labs plans to expand into AutoChat for business messaging automation, future AutoVision/CCTV event intelligence, workflow automation tools, and AI agents for customer support, sales operations, and local business productivity."
      >
        <div className="flex flex-wrap gap-3">
          <StatusPill tone="mint">AutoChat · v1.1.0</StatusPill>
          <StatusPill tone="violet">AutoVision · planned</StatusPill>
          <StatusPill tone="cyan">Workflow tools · planned</StatusPill>
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
