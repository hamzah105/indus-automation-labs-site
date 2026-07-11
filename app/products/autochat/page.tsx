import type { Metadata } from "next";
import { AutoChatDashboardPreview } from "@/components/AutoChatDashboardPreview";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { FeatureCard } from "@/components/FeatureCard";
import { Icon, type IconName } from "@/components/Icon";
import { Section } from "@/components/Section";
import { StatusPill } from "@/components/StatusPill";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AutoChat - AI Business Messaging Automation",
  description:
    "AutoChat is a Windows desktop app for business messaging automation, approval workflows, training inboxes, customer memory, supplier cases, and voice-note transcription.",
  openGraph: {
    title: "AutoChat - AI Business Messaging Automation",
    description:
      "AutoChat v1.0.0 is a Windows desktop application for business messaging and customer-support automation."
  }
};

const capabilities = [
  {
    title: "WhatsApp QR connection",
    description: "Connect a business WhatsApp session through the Windows desktop app."
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
    description: "Support license activation and voucher-based launch onboarding inside the desktop app."
  },
  {
    title: "Windows app packaging",
    description: "Ship AutoChat v1.0.0 as a Windows desktop build for practical small-business use."
  }
];

const capabilityIcons: IconName[] = [
  "connected",
  "message",
  "catalog",
  "spark",
  "modes",
  "shield",
  "automation",
  "memory",
  "training",
  "supplier",
  "voice",
  "license",
  "windows"
];

const processSteps = [
  {
    number: "01",
    title: "Connect the workspace",
    description: "Link the business WhatsApp session and prepare the Windows desktop app for controlled business use.",
    icon: "connected" as IconName
  },
  {
    number: "02",
    title: "Add business knowledge",
    description: "Set up catalog data, policies, product details, and owner-approved answers that ground each response.",
    icon: "catalog" as IconName
  },
  {
    number: "03",
    title: "Review AI drafts",
    description: "Start in manual or approval mode so the owner can edit, approve, train, or reject each suggested reply.",
    icon: "shield" as IconName
  },
  {
    number: "04",
    title: "Increase automation carefully",
    description: "Move toward automatic replies only after the knowledge base and business confidence are ready.",
    icon: "automation" as IconName
  }
];

const modes = [
  {
    title: "Manual Mode",
    code: "M",
    description: "Incoming messages are saved, but AutoChat does not send replies automatically.",
    tone: "border-white/[0.1] bg-white/[0.035]"
  },
  {
    title: "Approval Mode",
    code: "A",
    description: "AutoChat generates editable AI drafts and waits for the owner to approve before sending. Recommended for new businesses and sensitive conversations.",
    tone: "border-cyanGlow/25 bg-cyanGlow/[0.07] shadow-[0_18px_60px_rgba(34,211,238,0.08)]"
  },
  {
    title: "Auto Mode",
    code: "O",
    description: "AutoChat sends replies automatically after enough training and confidence.",
    tone: "border-violetGlow/20 bg-violetGlow/[0.055]"
  }
];

const deepDives: Array<{ eyebrow: string; title: string; description: string; icon: IconName; accent: string }> = [
  {
    eyebrow: "Live training loop",
    title: "Unknown answers become owner-approved knowledge.",
    description: "When AutoChat does not know the answer, it creates a training item. The owner can answer once and save the response as FAQ, product knowledge, business policy, general knowledge, one-time reply, or customer-specific memory.",
    icon: "training",
    accent: "text-cyanGlow"
  },
  {
    eyebrow: "Customer memory isolation",
    title: "Personalization stays scoped to each customer.",
    description: "Customer memories are scoped per customer contact ID, so one customer's preferences or past context are not used for another customer. This prevents cross-customer personalization leakage.",
    icon: "memory",
    accent: "text-solar"
  },
  {
    eyebrow: "Supplier desk",
    title: "Supplier-dependent work stays private.",
    description: "AutoChat supports supplier-dependent workflows. The owner can create supplier cases, send supplier queries, save supplier replies, and generate customer-safe updates without exposing supplier identity, cost, margin, or procurement details.",
    icon: "supplier",
    accent: "text-mint"
  },
  {
    eyebrow: "Voice-note support",
    title: "Useful for markets where customers prefer voice messages.",
    description: "AutoChat can transcribe customer voice notes and pass the transcript into the same AI reply pipeline. This is useful in Pakistan and other markets where customers commonly send voice messages.",
    icon: "voice",
    accent: "text-violetGlow"
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

const resourceActions = [
  { title: "Latest installer", detail: "AutoChat v1.0.0 for Windows", href: site.releaseUrl, icon: "download" as IconName },
  { title: "Product prospectus", detail: "Review the product overview", href: site.prospectusPath, icon: "catalog" as IconName, download: true },
  { title: "Video tutorial", detail: "Watch the setup walkthrough", href: site.tutorialUrl, icon: "play" as IconName },
  { title: "Product ad", detail: "See AutoChat in a short overview", href: site.adUrl, icon: "spark" as IconName }
];

export default function AutoChatPage() {
  return (
    <main>
      <section className="relative mx-auto grid max-w-[90rem] items-center gap-12 overflow-hidden px-4 py-16 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-24 xl:gap-16">
        <div className="hero-orb hero-orb-violet" aria-hidden="true" />
        <div className="relative z-10 reveal-up">
          <div className="flex flex-wrap gap-2">
            <StatusPill tone="mint">Windows desktop automation software</StatusPill>
            <StatusPill tone="cyan">Windows v1.0.0</StatusPill>
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-cyanGlow">AutoChat by Indus Automation Labs</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.35rem]">
            Business messaging automation, <span className="gradient-text">with the owner in control.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-300">
            A Windows desktop app that helps businesses automate WhatsApp customer conversations while keeping owners in control.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={site.releaseUrl} showArrow>Download AutoChat v1.0.0</ButtonLink>
            <ButtonLink href={site.prospectusPath} variant="secondary" download>Download AutoChat Prospectus</ButtonLink>
            <ButtonLink href={site.tutorialUrl} variant="secondary">
              <span className="inline-flex items-center gap-2"><Icon name="play" className="h-4 w-4" />Watch Tutorial</span>
            </ButtonLink>
            <ButtonLink href={site.adUrl} variant="quiet">Watch Product Ad</ButtonLink>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-slate-500">
            <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
            Built for controlled real-store testing with manual, approval, and carefully introduced auto modes.
          </p>
        </div>
        <div className="relative z-10 reveal-up reveal-delay-2 lg:-mr-10 xl:-mr-14">
          <AutoChatDashboardPreview />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {resourceActions.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              target={resource.href.startsWith("http") ? "_blank" : undefined}
              rel={resource.href.startsWith("http") ? "noreferrer" : undefined}
              download={resource.download || undefined}
              className="premium-card group flex items-center gap-3 rounded-2xl p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyanGlow"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyanGlow/20 bg-cyanGlow/[0.07] text-cyanGlow">
                <Icon name={resource.icon} className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{resource.title}</span>
                <span className="mt-0.5 block truncate text-xs text-slate-500">{resource.detail}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Overview"
        title="Built for real-store business workflows."
        description="AutoChat v1.0.0 is a Windows desktop application for business messaging and customer-support automation. It is prepared for controlled real-store use while modules continue to be improved."
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="premium-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyanGlow/20 bg-cyanGlow/[0.08] text-cyanGlow"><Icon name="dashboard" /></span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Desktop control center</p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-white">One place to operate, review, and train.</h2>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-300">
              The product is organized around customer conversations, business knowledge, product data, training decisions, supplier-dependent requests, and license management—without presenting the website as a live checkout flow.
            </p>
          </div>
          <aside className="glass rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-cyanGlow">Status notice</p>
              <StatusPill tone="solar">Active development</StatusPill>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              AutoChat v1.0.0 is available as Windows desktop automation software and continues to improve through controlled real-store use. Features, pricing, licensing, and supported integrations may evolve as the product develops.
            </p>
          </aside>
        </div>
      </Section>

      <Section
        eyebrow="How AutoChat works"
        title="From connection to a business-approved reply."
        description="The workflow is deliberately staged so businesses can build confidence before increasing automation."
      >
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.number} className="premium-card relative overflow-hidden rounded-3xl p-6">
              <span className="font-display text-5xl font-semibold text-white/[0.06]">{step.number}</span>
              <span className="mt-5 grid h-11 w-11 place-items-center rounded-2xl border border-cyanGlow/20 bg-cyanGlow/[0.07] text-cyanGlow"><Icon name={step.icon} /></span>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
              {index < processSteps.length - 1 ? <span className="absolute right-4 top-8 hidden text-slate-700 lg:block">→</span> : null}
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Licensing"
        title="Download AutoChat v1.0.0 and apply the NEWCOM voucher in-app."
        description="Users can download the latest AutoChat v1.0.0 release from GitHub, install the Windows desktop app, open the in-app License section, and apply voucher code NEWCOM. The regular launch license price is PKR 20,000, and the NEWCOM launch voucher reduces the launch price to PKR 10,000. Public website checkout is not active yet."
      >
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="cta-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyanGlow">AutoChat License</p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.025em] text-white">NEWCOM launch offer</h2>
              </div>
              <StatusPill tone="mint">50% off</StatusPill>
            </div>
            <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Regular Price</p>
                <strong className="mt-2 block font-display text-xl text-white">PKR 20,000</strong>
              </div>
              <div className="rounded-2xl border border-cyanGlow/20 bg-cyanGlow/[0.07] p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">NEWCOM Voucher</p>
                <strong className="mt-2 block font-display text-xl text-cyanGlow">50% OFF</strong>
              </div>
              <div className="rounded-2xl border border-mint/20 bg-mint/[0.07] p-4">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Final Launch Price</p>
                <strong className="mt-2 block font-display text-xl text-mint">PKR 10,000</strong>
              </div>
            </div>
            <div className="relative mt-4 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 font-semibold text-white">Voucher Code: NEWCOM</div>
            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={site.releaseUrl} showArrow>Download AutoChat &amp; Apply Voucher</ButtonLink>
              <ButtonLink href={site.newcomVoucherMailto} variant="secondary">Contact Support</ButtonLink>
            </div>
          </article>

          <aside className="glass rounded-3xl p-6 text-sm leading-7 text-slate-300 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violetGlow/20 bg-violetGlow/[0.07] text-violetGlow"><Icon name="license" /></div>
            <h2 className="mt-5 font-display text-2xl font-semibold text-white">Important licensing notes</h2>
            <p className="mt-4">
              Licensing is currently handled through the AutoChat desktop app License section and approved onboarding. Do not treat the website as a public card checkout flow yet.
            </p>
            <p className="mt-4">
              Before public launch, confirm that the GitHub release includes a downloadable Windows installer asset, not only release notes.
            </p>
          </aside>
        </div>
      </Section>

      <Section
        eyebrow="Core capabilities"
        title="The AutoChat foundation covers the full reply workflow."
        description="Each capability supports a specific operator need, from connection and product knowledge to review, training, privacy, and deployment."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <FeatureCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={<Icon name={capabilityIcons[index]} />}
              accent={index % 4 === 1 ? "violet" : index % 4 === 2 ? "mint" : index % 4 === 3 ? "solar" : "cyan"}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Human-in-the-loop safety"
        title="Three modes keep the owner in control."
        description="AutoChat is designed so businesses can start cautiously, train the system, and increase automation only when confidence is appropriate."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {modes.map((mode) => (
            <article key={mode.title} className={`rounded-3xl border p-6 sm:p-8 ${mode.tone}`}>
              <div className="flex items-center justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.1] bg-white/[0.045] font-display text-lg font-semibold text-white">{mode.code}</span>
                {mode.code === "A" ? <StatusPill tone="cyan">Recommended start</StatusPill> : null}
              </div>
              <h2 className="mt-6 font-display text-2xl font-semibold text-white">{mode.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{mode.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Operational depth"
        title="Context stays useful, scoped, and business-safe."
        description="The supporting workflows help owners turn repeated questions into knowledge while keeping personal and supplier context appropriately separated."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {deepDives.map((item) => (
            <article key={item.eyebrow} className="premium-card group relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.09] bg-white/[0.035] ${item.accent}`}><Icon name={item.icon} /></div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.eyebrow}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Technical architecture"
        title="Desktop-first architecture for the MVP stage."
        description="The product is organized around a local desktop dashboard, messaging adapter, AI reply pipeline, catalog logic, training flow, supplier cases, and a licensing foundation."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {architecture.map((item, index) => (
            <div key={item} className="premium-card flex items-start gap-3 rounded-2xl p-5 text-sm leading-6 text-slate-300">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyanGlow/20 bg-cyanGlow/[0.07] text-[10px] font-semibold text-cyanGlow">{String(index + 1).padStart(2, "0")}</span>
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Download and resources"
        title="Download the latest AutoChat version."
        description="Use these links for the latest desktop release, product prospectus, tutorial, product ad, and support contact."
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="cta-panel relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <StatusPill tone="mint">Recommended for most users</StatusPill>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.025em] text-white">AutoChat v1.0.0</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">The latest Windows installer includes the newest fixes, pricing updates, licensing improvements, and security-related changes available in the current release.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={site.releaseUrl} showArrow>Download AutoChat v1.0.0</ButtonLink>
              <ButtonLink href={site.newcomVoucherMailto} variant="secondary">Contact Support</ButtonLink>
            </div>
          </article>
          <div className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-white">Product resources</h2>
            <div className="mt-5 grid gap-3">
              <ButtonLink href={site.prospectusPath} variant="secondary" download className="!w-full">Download AutoChat Prospectus</ButtonLink>
              <ButtonLink href={site.tutorialUrl} variant="secondary" className="!w-full">Watch Tutorial</ButtonLink>
              <ButtonLink href={site.adUrl} variant="secondary" className="!w-full">Watch Product Ad</ButtonLink>
            </div>
          </div>
        </div>

        <div id="previous-versions" className="mt-8 scroll-mt-28 rounded-3xl border border-white/[0.09] bg-ink/[0.64] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-white">Previous versions</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Legacy builds are provided for reference or compatibility. New users should download the latest v1.0.0 installer.
              </p>
            </div>
            <StatusPill tone="solar">Legacy builds</StatusPill>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {site.legacyDownloads.map((download) => (
              <a
                key={download.version}
                href={download.href}
                target="_blank"
                rel="noreferrer"
                className="premium-card group flex items-center justify-between gap-4 rounded-2xl p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyanGlow"
              >
                <span>
                  <span className="block font-semibold text-white">{download.name}</span>
                  <span className="mt-1 block text-sm text-slate-400">{download.type}</span>
                </span>
                <Icon name="arrow" className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-cyanGlow" />
              </a>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-slate-500">
            <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-solar" />
            For most users, the latest v1.0.0 installer is recommended. Previous builds may lack newer fixes, pricing updates, licensing improvements, or security-related changes.
          </p>
        </div>
      </Section>

      <CTASection />
    </main>
  );
}
