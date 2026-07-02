import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { Section } from "@/components/Section";

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
      <Section
        eyebrow="About"
        title="Founder-led AI automation for practical business workflows."
        description="Indus Automation Labs is a Pakistan-based software and AI automation direction founded by Muhammad Hamza Shoaib. The company direction focuses on practical automation systems for small and medium businesses, including customer support automation, business messaging, workflow tools, and future local AI vision systems."
        className="pt-20"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold text-white">First product: AutoChat</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The first product is AutoChat, a working desktop pilot for WhatsApp business messaging automation. It is
              designed for controlled pilot testing, owner-approved training, customer-specific memory, supplier
              workflows, and voice-note support.
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold text-white">Long-term direction</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The broader direction is to build useful AI systems that match real business operations: support inboxes,
              catalog questions, lead handling, reporting, local language support, and future AI vision workflows.
            </p>
          </div>
        </div>
      </Section>
      <CTASection title="Start with a controlled AutoChat pilot." />
    </main>
  );
}
