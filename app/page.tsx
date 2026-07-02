import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroSection } from "@/components/HeroSection";
import { Section } from "@/components/Section";
import { productFeatures } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Automation Software for Modern Businesses",
  description:
    "Indus Automation Labs builds practical AI automation tools for small and medium businesses, starting with AutoChat for business messaging automation.",
  openGraph: {
    title: "Indus Automation Labs - AI Automation Software",
    description:
      "Explore AutoChat, a working desktop pilot for WhatsApp business messaging automation and business-safe support workflows."
  }
};

const buildAreas = [
  ["Customer support automation", "AI-assisted replies and owner-controlled workflows for repetitive customer questions."],
  ["Sales and lead workflows", "Tools that help businesses organize inquiries, follow-ups, and lead handling."],
  ["Business messaging", "Messaging automation designed for real local business conversations and support patterns."],
  ["Local business operations", "Practical systems for catalog, policy, delivery, and supplier-dependent tasks."],
  ["Future vision tools", "A planned direction for CCTV event intelligence and structured business alerts."],
  ["Custom automation systems", "Automation foundations for industry-specific workflows as the platform matures."]
];

const responsibleItems = [
  "Human approval mode for pilots and sensitive conversations",
  "No hallucinated stock, availability, or prices",
  "Customer memory isolation by contact",
  "Owner-approved training and knowledge updates",
  "Supplier privacy for hidden fulfillment details",
  "Safe pilot deployment with local language support including English, Urdu, and Roman Urdu"
];

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <Section
        eyebrow="What we build"
        title="Practical AI automation for business operators."
        description="Indus Automation Labs focuses on tools that help small and medium businesses respond faster, reduce repetitive work, and keep owners in control of automation."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {buildAreas.map(([title, description], index) => (
            <FeatureCard key={title} title={title} description={description} icon={String(index + 1)} />
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
              icon={String(index + 1)}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Why AutoChat exists"
        title="Repetitive customer questions should not consume the whole day."
        description="Small businesses receive repeated WhatsApp questions about stock, price, delivery, product variations, availability, and order follow-ups. Manual replies are slow and inconsistent. Generic chatbots often fail because they do not understand the business catalog, owner preferences, local language patterns, or supplier-dependent details. AutoChat is designed for business-safe automation with human control."
      />

      <Section
        eyebrow="Responsible automation"
        title="Designed for careful pilots before full automation."
        description="The product direction favors human oversight, scoped memory, owner training, and cautious deployment over uncontrolled messaging."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {responsibleItems.map((item) => (
            <div key={item} className="glass rounded-2xl p-5 text-sm leading-6 text-slate-300">
              <span className="mr-3 inline-block h-2 w-2 rounded-full bg-mint" />
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Platform direction"
        title="A broader automation suite is planned."
        description="Indus Automation Labs plans to expand into AutoChat for business messaging automation, future AutoVision/CCTV event intelligence, workflow automation tools, and AI agents for customer support, sales operations, and local business productivity."
      />

      <CTASection />
    </main>
  );
}
