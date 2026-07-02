import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { FeatureCard } from "@/components/FeatureCard";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AutoChat - AI Business Messaging Automation",
  description:
    "AutoChat is a Windows desktop app for business messaging automation, approval workflows, training inboxes, customer memory, supplier cases, and voice-note transcription.",
  openGraph: {
    title: "AutoChat - AI Business Messaging Automation",
    description:
      "A working desktop pilot that helps businesses automate WhatsApp customer conversations while keeping owners in control."
  }
};

const capabilities = [
  "WhatsApp QR connection",
  "Incoming/outgoing message handling",
  "Product catalog management",
  "Smart product matching",
  "Manual mode",
  "Approval mode",
  "Auto mode",
  "Customer memory panel",
  "Live training inbox",
  "Supplier desk",
  "Voice-note transcription",
  "Trial/license system",
  "Windows app packaging"
];

const architecture = [
  "Electron desktop app",
  "WhatsApp adapter using QR/session-based linking",
  "AI reply engine compatible with API-based LLMs",
  "Local storage during MVP",
  "Product/catalog logic",
  "Supplier cases",
  "Licensing foundation",
  "Windows .exe packaging path"
];

export default function AutoChatPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.78fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanGlow">AutoChat</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-normal text-white sm:text-6xl">
            AutoChat - AI Business Messaging Automation
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            A Windows desktop app that helps businesses automate WhatsApp customer conversations while keeping owners in
            control.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.githubRelease}>Download Latest Release</ButtonLink>
            <ButtonLink href={site.prospectusPath} variant="secondary" download>
              Download AutoChat Prospectus
            </ButtonLink>
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <p className="text-sm font-semibold text-cyanGlow">Status notice</p>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            AutoChat is currently in working pilot stage and is being improved through controlled testing. Features,
            pricing, licensing, and supported integrations may evolve as the product develops.
          </p>
        </div>
      </section>

      <Section
        eyebrow="Overview"
        title="Built for controlled real-store testing."
        description="AutoChat is a business messaging automation desktop app developed under Indus Automation Labs. It is currently a working pilot build, not a final finished product. It is prepared for controlled real-store testing while new modules continue to be improved."
      />

      <Section eyebrow="Core capabilities" title="The pilot foundation covers the full reply workflow.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <FeatureCard
              key={item}
              title={item}
              description="Part of the AutoChat working desktop pilot and active development roadmap."
              icon=">"
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Human-in-the-loop"
        title="Three modes keep the owner in control."
        description="AutoChat is designed so businesses can start cautiously, train the system, and increase automation only when confidence is appropriate."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <FeatureCard
            title="Manual Mode"
            description="Incoming messages are saved, but AutoChat does not send replies automatically."
            icon="M"
          />
          <FeatureCard
            title="Approval Mode"
            description="AutoChat generates editable AI drafts and waits for the owner to approve before sending. Recommended for pilots and new businesses."
            icon="A"
          />
          <FeatureCard
            title="Auto Mode"
            description="AutoChat sends replies automatically after enough training and confidence."
            icon="O"
          />
        </div>
      </Section>

      <Section
        eyebrow="Live training loop"
        title="Unknown answers become owner-approved knowledge."
        description="When AutoChat does not know the answer, it creates a training item. The owner can answer once and save the response as FAQ, product knowledge, business policy, general knowledge, one-time reply, or customer-specific memory."
      />

      <Section
        eyebrow="Customer memory isolation"
        title="Personalization stays scoped to each customer."
        description="Customer memories are scoped per customer contact ID, so one customer's preferences or past context are not used for another customer. This prevents cross-customer personalization leakage."
      />

      <Section
        eyebrow="Supplier desk"
        title="Supplier-dependent work stays private."
        description="AutoChat supports supplier-dependent workflows. The owner can create supplier cases, send supplier queries, save supplier replies, and generate customer-safe updates without exposing supplier identity, cost, margin, or procurement details."
      />

      <Section
        eyebrow="Voice-note support"
        title="Useful for markets where customers prefer voice messages."
        description="AutoChat can transcribe customer voice notes and pass the transcript into the same AI reply pipeline. This is useful in Pakistan and other markets where customers commonly send voice messages."
      />

      <Section
        eyebrow="Technical architecture"
        title="Desktop-first architecture for the MVP stage."
        description="The product is organized around a local desktop dashboard, messaging adapter, AI reply pipeline, catalog logic, training flow, supplier cases, and a licensing foundation."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {architecture.map((item) => (
            <div key={item} className="glass rounded-2xl p-5 text-sm leading-6 text-slate-300">
              <span className="mb-4 block h-1 w-10 rounded-full bg-cyanGlow" />
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Download and resources"
        title="AutoChat resources for pilot customers and reviewers."
        description="Use these links for the latest desktop release, product prospectus, tutorial, product ad, and support contact."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={site.githubRelease}>Download Latest Release</ButtonLink>
          <ButtonLink href={site.prospectusPath} variant="secondary" download>
            Download AutoChat Prospectus
          </ButtonLink>
          <ButtonLink href={site.youtubeTutorial} variant="secondary">
            Watch Tutorial
          </ButtonLink>
          <ButtonLink href={site.youtubeAd} variant="secondary">
            Watch Product Ad
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            Contact Support
          </ButtonLink>
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
