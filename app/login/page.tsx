import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Icon } from "@/components/Icon";
import { StatusPill } from "@/components/StatusPill";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Customer dashboard placeholder for approved AutoChat pilot customers.",
  openGraph: {
    title: "Customer Dashboard Coming Soon",
    description: "AutoChat dashboard access will be available for approved pilot customers."
  }
};

export default function LoginPage() {
  return (
    <main className="relative mx-auto grid min-h-[78vh] max-w-6xl items-center gap-8 overflow-hidden px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.82fr] lg:px-8 lg:py-28">
      <div className="hero-orb hero-orb-cyan" aria-hidden="true" />
      <section className="relative reveal-up">
        <StatusPill tone="violet">Pilot access</StatusPill>
        <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl">
          Customer dashboard <span className="gradient-text">coming soon.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          AutoChat dashboard access will be available for approved pilot customers.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
          Current pilot licensing and activation are handled through the AutoChat desktop app License section and approved onboarding.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={site.generalContactMailto} showArrow>Contact Support</ButtonLink>
          <ButtonLink href={site.releaseUrl} variant="secondary">Download AutoChat v1.0.0</ButtonLink>
        </div>
      </section>

      <section className="glass relative overflow-hidden rounded-[2rem] p-6 reveal-up reveal-delay-2 sm:p-8" aria-label="Customer dashboard preview status">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violetGlow/[0.1] blur-3xl" aria-hidden="true" />
        <div className="relative flex items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyanGlow/20 bg-cyanGlow/[0.08] text-cyanGlow"><Icon name="lock" /></span>
            <div>
              <p className="font-display text-lg font-semibold text-white">Pilot portal</p>
              <p className="text-xs text-slate-500">Access is not open yet</p>
            </div>
          </div>
          <StatusPill tone="solar">In development</StatusPill>
        </div>
        <div className="relative mt-6 grid gap-3">
          {[
            ["Approved customer access", "Planned"],
            ["License and account overview", "Planned"],
            ["Pilot support resources", "Planned"]
          ].map(([label, status]) => (
            <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <span className="text-sm text-slate-300">{label}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{status}</span>
            </div>
          ))}
        </div>
        <div className="relative mt-5 rounded-2xl border border-cyanGlow/15 bg-cyanGlow/[0.055] p-4 text-sm leading-6 text-slate-300">
          Need help now? Email <a href={site.generalContactMailto} className="font-semibold text-cyanGlow hover:text-white">{site.email}</a>.
        </div>
      </section>
    </main>
  );
}
