import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { Icon, type IconName } from "@/components/Icon";
import { Section } from "@/components/Section";
import { StatusPill } from "@/components/StatusPill";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "AutoChat launch pricing with the NEWCOM launch voucher for early AutoChat customers of Indus Automation Labs.",
  openGraph: {
    title: "AutoChat launch pricing",
    description:
      "Claim the NEWCOM launch voucher for 50% off the AutoChat launch license during the current launch offer."
  }
};

const features = [
  "Windows desktop AutoChat v1.0.0 build",
  "WhatsApp business messaging automation",
  "Product catalog and smart product matching",
  "Manual, approval, and auto reply modes",
  "Customer-specific memory isolation",
  "Live training inbox",
  "Supplier desk workflow",
  "Voice-note transcription support",
  "In-app license section with voucher support",
  "Email support during launch period"
];

const onboardingSteps: Array<{ title: string; description: string; icon: IconName }> = [
  {
    title: "Download AutoChat",
    description: "Get the latest v1.0.0 Windows installer from the official GitHub release.",
    icon: "download"
  },
  {
    title: "Open the License section",
    description: "Install the desktop app and navigate to the in-app licensing area.",
    icon: "license"
  },
  {
    title: "Enter NEWCOM",
    description: "Apply the NEWCOM voucher code to receive the current 50% launch offer.",
    icon: "spark"
  },
  {
    title: "Complete licensing",
    description: "Finish the in-app process or contact support for approved onboarding assistance.",
    icon: "check"
  }
];

export default function PricingPage() {
  return (
    <main>
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pb-12 lg:pt-28">
        <div className="hero-orb hero-orb-cyan" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl text-center reveal-up">
          <p className="eyebrow-label">Pricing</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl">
            A clear launch license for <span className="gradient-text">early AutoChat customers.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-8 text-slate-300">
            Public website checkout is not active yet. AutoChat licensing is currently available through the AutoChat desktop app License section and approved onboarding.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <StatusPill tone="mint">NEWCOM launch offer</StatusPill>
            <StatusPill tone="cyan">In-app licensing</StatusPill>
            <StatusPill tone="violet">Approved onboarding</StatusPill>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <article className="cta-panel relative isolate overflow-hidden rounded-[2rem] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.42)] sm:p-9 lg:p-10">
            <div className="cta-orb" aria-hidden="true" />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyanGlow">AutoChat License</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Early launch license</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  For early businesses testing AutoChat as a Windows desktop business messaging automation tool.
                </p>
              </div>
              <StatusPill tone="mint">50% OFF</StatusPill>
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Regular Price</p>
                <p className="mt-3 font-display text-2xl font-semibold text-slate-200">PKR 20,000</p>
              </div>
              <div className="rounded-2xl border border-cyanGlow/20 bg-cyanGlow/[0.07] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">NEWCOM Voucher</p>
                <p className="mt-3 font-display text-2xl font-semibold text-cyanGlow">50% OFF</p>
              </div>
              <div className="rounded-2xl border border-mint/20 bg-mint/[0.07] p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Final Launch Price</p>
                <p className="mt-3 font-display text-3xl font-semibold text-mint">PKR 10,000</p>
              </div>
            </div>

            <div className="relative mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4">
              <span className="text-sm text-slate-400">Voucher Code</span>
              <strong className="rounded-lg border border-cyanGlow/20 bg-cyanGlow/[0.08] px-3 py-1.5 font-display text-lg tracking-[0.08em] text-cyanGlow">NEWCOM</strong>
            </div>

            <div className="relative mt-8 border-t border-white/[0.08] pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Included</p>
              <ul className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-mint/20 bg-mint/[0.07] text-mint"><Icon name="check" className="h-3 w-3" /></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={site.releaseUrl} showArrow>Download AutoChat &amp; Apply Voucher</ButtonLink>
              <ButtonLink href={site.newcomVoucherMailto} variant="secondary">Contact Support</ButtonLink>
            </div>
          </article>

          <aside className="grid content-start gap-5">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violetGlow/20 bg-violetGlow/[0.07] text-violetGlow"><Icon name="license" /></div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-white">Licensing stays inside AutoChat</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Public website checkout is not active yet. Licensing is currently handled through the AutoChat desktop app License section and approved onboarding.
              </p>
            </div>

            <div className="premium-card rounded-3xl p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Launch terms</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                This launch offer is intended for early AutoChat customers and may change before public rollout. Final subscription, renewal, and commercial licensing terms may be updated as AutoChat develops.
              </p>
            </div>

            <div className="premium-card rounded-3xl p-6 sm:p-8">
              <p className="text-sm leading-7 text-slate-300">
                For product access, licensing, billing questions, or custom setup, contact{" "}
                <a className="font-semibold text-cyanGlow hover:text-white" href={site.newcomVoucherMailto}>{site.email}</a>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Section
        eyebrow="Claim the offer"
        title="How to use the NEWCOM voucher."
        description="The current licensing flow takes place through the desktop app and approved onboarding—not through a public website checkout."
      >
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {onboardingSteps.map((step, index) => (
            <li key={step.title} className="premium-card relative rounded-3xl p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyanGlow/20 bg-cyanGlow/[0.07] text-cyanGlow"><Icon name={step.icon} /></span>
                <span className="font-display text-2xl font-semibold text-white/[0.09]">0{index + 1}</span>
              </div>
              <h2 className="mt-5 font-display text-xl font-semibold text-white">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Future options"
        title="Commercial models may expand over time."
        description="These directions are not active checkout products today and remain clearly separated from the current AutoChat launch license."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="premium-card rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold text-white">Future SaaS Subscription</h2>
              <StatusPill tone="violet">Coming soon</StatusPill>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Subscription, renewal, and hosted service options may be introduced after further testing and commercial readiness.
            </p>
          </div>
          <div className="premium-card rounded-3xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold text-white">Custom Business Setup</h2>
              <StatusPill tone="cyan">Contact Support</StatusPill>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Businesses that need onboarding, catalog setup, or workflow configuration can contact support for onboarding guidance.
            </p>
          </div>
        </div>
      </Section>

      <CTASection title="Ready to apply the NEWCOM launch offer?" description="Download AutoChat v1.0.0, open the in-app License section, and use NEWCOM—or contact support for approved onboarding." />
    </main>
  );
}
