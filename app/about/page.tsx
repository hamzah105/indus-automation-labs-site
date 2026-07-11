import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { Section } from "@/components/Section";
import { StatusPill } from "@/components/StatusPill";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Indus Automation Labs, a Pakistan-based AI automation direction founded by Muhammad Hamza Shoaib.",
  openGraph: {
    title: "About Indus Automation Labs",
    description: "Founder-led software and AI automation work for small and medium businesses."
  }
};

export default function AboutPage() {
  return (
    <main>
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="hero-orb hero-orb-cyan" aria-hidden="true" />
        <div className="relative max-w-4xl reveal-up">
          <p className="eyebrow-label">About</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl">
            Founder-led AI automation for <span className="gradient-text">practical business workflows.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-slate-300">
            Indus Automation Labs is a Pakistan-based software and AI automation direction founded by Muhammad Hamza Shoaib. The company direction focuses on practical automation systems for small and medium businesses, including customer support automation, business messaging, workflow tools, and future local AI vision systems.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <StatusPill tone="mint">Founder-led</StatusPill>
            <StatusPill tone="cyan">SME focused</StatusPill>
            <StatusPill tone="violet">Pakistan based</StatusPill>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Company direction"
        title="Start with a real workflow. Build outward carefully."
        description="The company is beginning with a working customer-support product and a deliberate release process before expanding into a broader automation suite."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="premium-card rounded-3xl p-6 sm:p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyanGlow/20 bg-cyanGlow/[0.08] text-cyanGlow"><Icon name="message" /></span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">First product</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white">AutoChat</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              AutoChat v1.0.0 is a Windows desktop application for business messaging and customer-support automation. It is designed for owner-approved training, customer-specific memory, supplier workflows, and voice-note support.
            </p>
          </article>
          <article className="premium-card rounded-3xl p-6 sm:p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-violetGlow/20 bg-violetGlow/[0.08] text-violetGlow"><Icon name="automation" /></span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Long-term direction</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white">Useful systems for real operators</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The broader direction is to build useful AI systems that match real business operations: support inboxes, catalog questions, lead handling, reporting, local language support, and future AI vision workflows.
            </p>
          </article>
        </div>
      </Section>

      <CTASection title="Start with AutoChat v1.0.0." />
    </main>
  );
}
