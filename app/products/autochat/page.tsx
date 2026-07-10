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
  {
    title: "WhatsApp QR connection",
    description: "Connect a business WhatsApp session through the Windows desktop pilot app."
  },
  {
    title: "Incoming/outgoing message handling",
    description: "Review customer conversations and reply workflows from a controlled operator dashboard."
  },
  {
    title: "Product catalog management",
    description: "Maintain product names, prices, stock status, descriptions, tags, and product links."
  },
  {
    title: "Smart product matching",
    description: "Match customer questions to catalog entries so replies stay closer to real business data."
  },
  {
    title: "Manual mode",
    description: "Keep AutoChat quiet while messages are captured and the business knowledge base is trained."
  },
  {
    title: "Approval mode",
    description: "Generate AI drafts that the owner can edit, approve, train, or reject before sending."
  },
  {
    title: "Auto mode",
    description: "Move toward automatic replies only after enough training and business confidence."
  },
  {
    title: "Customer memory panel",
    description: "Store customer-specific notes and preferences without mixing one contact's context into another."
  },
  {
    title: "Live training inbox",
    description: "Turn unknown questions into owner-approved FAQ, product knowledge, policy, or memory entries."
  },
  {
    title: "Supplier desk",
    description: "Handle supplier-dependent questions internally while keeping costs and procurement details private."
  },
  {
    title: "Voice-note transcription",
    description: "Transcribe customer voice notes and pass the transcript into the same AI response pipeline."
  },
  {
    title: "In-app license section",
    description: "Support pilot license activation and voucher-based early onboarding inside the desktop app."
  },
  {
    title: "Windows app packaging",
    description: "Ship the pilot as a Windows desktop build for practical small-business testing."
  }
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={site.releaseUrl}>Download Latest Release</ButtonLink>
            <ButtonLink href={site.prospectusPath} variant="secondary" download>
              Download AutoChat Prospectus
            </ButtonLink>
            <ButtonLink href={site.newcomVoucherMailto} variant="secondary">
              Contact Support
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

      <Section
        eyebrow="Pilot licensing"
        title="Download the pilot build and apply the NEWCOM voucher in-app."
        description="Users can download the latest AutoChat pilot release from GitHub, install the Windows desktop app, open the in-app License section, and apply voucher code NEWCOM. The regular pilot license price is PKR 20,000, and the NEWCOM launch voucher reduces the pilot price to PKR 10,000. Public website checkout is not active yet."
      >
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display text-2xl font-semibold text-white">AutoChat Pilot License</h2>
            <div className="mt-5 grid gap-4 text-sm text-slate-300">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <span>Regular Price</span>
                <strong className="text-white">PKR 20,000</strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-cyanGlow/20 bg-cyanGlow/10 p-4">
                <span>NEWCOM Voucher</span>
                <strong className="text-cyanGlow">50% OFF</strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-mint/25 bg-mint/10 p-4">
                <span>Final Pilot Price</span>
                <strong className="text-mint">PKR 10,000</strong>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 font-semibold text-white">
                Voucher Code: NEWCOM
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={site.releaseUrl}>Download AutoChat & Apply Voucher</ButtonLink>
              <ButtonLink href={site.newcomVoucherMailto} variant="secondary">
                Contact Support
              </ButtonLink>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 text-sm leading-7 text-slate-300">
            <h2 className="font-display text-2xl font-semibold text-white">Important pilot notes</h2>
            <p className="mt-4">
              Pilot licensing is currently handled through the AutoChat desktop app License section and approved pilot
              onboarding. Do not treat the website as a public card checkout flow yet.
            </p>
            <p className="mt-4">
              Before public launch, confirm that the GitHub release includes a downloadable Windows installer asset, not
              only release notes.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Core capabilities" title="The pilot foundation covers the full reply workflow.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
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
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={site.releaseUrl}>Download AutoChat v1.0.0</ButtonLink>
          <ButtonLink href={site.prospectusPath} variant="secondary" download>
            Download AutoChat Prospectus
          </ButtonLink>
          <ButtonLink href={site.tutorialUrl} variant="secondary">
            Watch Tutorial
          </ButtonLink>
          <ButtonLink href={site.adUrl} variant="secondary">
            Watch Product Ad
          </ButtonLink>
          <ButtonLink href={site.newcomVoucherMailto} variant="secondary">
            Contact Support
          </ButtonLink>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-500">
          Video links will be updated after the official tutorial and product ad are published.
        </p>
        <div className="mt-8 border-t border-white/10 pt-6">
          <h3 className="font-display text-xl font-semibold text-white">Previous versions</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Legacy builds are provided for reference or compatibility. New users should download the latest v1.0.0
            installer.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {site.legacyDownloads.map((download) => (
              <a
                key={download.version}
                href={download.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyanGlow/50 hover:bg-cyanGlow/10"
              >
                <span className="block font-semibold text-white">{download.name}</span>
                <span className="mt-1 block text-sm text-slate-400">{download.type}</span>
              </a>
            ))}
          </div>
          <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-500">
            For most users, the latest v1.0.0 installer is recommended. Previous builds may lack newer fixes, pricing
            updates, licensing improvements, or security-related changes.
          </p>
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
