import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "AutoChat launch pricing with the NEWCOM launch voucher for early pilot customers of Indus Automation Labs.",
  openGraph: {
    title: "AutoChat launch pricing",
    description:
      "Claim the NEWCOM launch voucher for 50% off the AutoChat Pilot License during the early pilot offer."
  }
};

const features = [
  "Windows desktop AutoChat pilot build",
  "WhatsApp business messaging automation",
  "Product catalog and smart product matching",
  "Manual, approval, and auto reply modes",
  "Customer-specific memory isolation",
  "Live training inbox",
  "Supplier desk workflow",
  "Voice-note transcription support",
  "In-app license section with voucher support",
  "Email support during pilot period"
];

const onboardingSteps = [
  "Download the latest AutoChat pilot release.",
  "Install and open the AutoChat desktop app.",
  "Go to the License section.",
  "Enter voucher code NEWCOM.",
  "Complete the pilot licensing process or contact support for onboarding."
];

export default function PricingPage() {
  return (
    <main>
      <Section
        eyebrow="Pricing"
        title="AutoChat launch pricing"
        description="Public website checkout is not active yet. AutoChat pilot licensing is currently available through the AutoChat desktop app License section and approved pilot onboarding."
        className="pt-20"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass relative overflow-hidden rounded-3xl p-6 shadow-glow sm:p-8">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyanGlow/15 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-violetGlow/15 blur-3xl" aria-hidden="true" />

            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanGlow">
                    AutoChat Pilot License
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-white">Early launch license</h2>
                </div>
                <span className="rounded-full border border-mint/25 bg-mint/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-mint">
                  NEWCOM Launch Offer
                </span>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
                For early businesses testing AutoChat as a Windows desktop business messaging automation tool.
              </p>

              <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Regular price</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-slate-200">PKR 20,000</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">NEWCOM voucher</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-cyanGlow">50% off</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Final price</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-white">PKR 10,000</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-cyanGlow/20 bg-cyanGlow/10 p-4 text-sm font-semibold text-cyanGlow">
                Voucher Code: NEWCOM
              </div>

              <ul className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyanGlow shadow-glow" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={site.releaseUrl}>
                  Download AutoChat & Apply Voucher
                </ButtonLink>
                <ButtonLink href={site.newcomVoucherMailto} variant="secondary">
                  Contact Support
                </ButtonLink>
              </div>
            </div>
          </article>

          <aside className="grid gap-5">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-2xl font-semibold text-white">How to claim the NEWCOM offer</h2>
              <ol className="mt-5 grid gap-4 text-sm leading-6 text-slate-300">
                {onboardingSteps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-cyanGlow/30 bg-cyanGlow/10 text-xs font-semibold text-cyanGlow">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass rounded-2xl p-6 text-sm leading-7 text-slate-300">
              This launch offer is intended for early pilot customers and may change before public rollout. Final
              subscription, renewal, and commercial licensing terms may be updated as AutoChat develops.
            </div>

            <div className="glass rounded-2xl p-6 text-sm leading-7 text-slate-300">
              Public website checkout is not active yet. Pilot licensing is currently handled through the AutoChat
              desktop app License section and approved onboarding. For pilot access, licensing, billing questions, or
              custom setup, contact{" "}
              <a className="font-semibold text-cyanGlow hover:text-white" href={site.newcomVoucherMailto}>
                {site.email}
              </a>
              .
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold text-white">Future SaaS Subscription</h2>
              <span className="rounded-full border border-white/12 px-3 py-1 text-xs font-semibold text-slate-400">
                Coming Soon
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Subscription, renewal, and hosted service options may be introduced after pilot testing and commercial
              readiness.
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold text-white">Custom Business Setup</h2>
              <span className="rounded-full border border-cyanGlow/25 bg-cyanGlow/10 px-3 py-1 text-xs font-semibold text-cyanGlow">
                Contact Support
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Businesses that need onboarding, catalog setup, or workflow configuration can contact support for pilot
              guidance.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
