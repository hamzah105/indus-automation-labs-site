import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { StatusPill } from "@/components/StatusPill";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Indus Automation Labs for AutoChat product access, support, and business automation inquiries.",
  openGraph: {
    title: "Contact Indus Automation Labs",
    description: "Reach support for AutoChat and business automation inquiries."
  }
};

const contactReasons = [
  "AutoChat access and onboarding",
  "Licensing and NEWCOM voucher questions",
  "Product catalog or workflow setup",
  "General business automation inquiries"
];

export default function ContactPage() {
  return (
    <main>
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-12 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="hero-orb hero-orb-violet" aria-hidden="true" />
        <div className="relative max-w-4xl reveal-up">
          <p className="eyebrow-label">Contact</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-6xl">
            Bring us the workflow that <span className="gradient-text">slows your business down.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-slate-300">
            For AutoChat product access, product questions, support, or business automation inquiries, contact the team by email or use the inquiry form.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <StatusPill tone="mint">Active email support</StatusPill>
            <StatusPill tone="cyan">Product onboarding</StatusPill>
            <StatusPill tone="violet">SME workflow discovery</StatusPill>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="grid content-start gap-5">
            <article className="cta-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyanGlow/20 bg-cyanGlow/[0.08] text-cyanGlow"><Icon name="mail" /></div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-cyanGlow">Business support</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.025em] text-white">Start with an email.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Email is the active support channel while the website contact system is being configured.
              </p>
              <a className="mt-5 block break-all font-display text-lg font-semibold text-cyanGlow transition hover:text-white" href={site.generalContactMailto}>{site.email}</a>
              <ButtonLink href={site.generalContactMailto} className="mt-7" showArrow>Email Support</ButtonLink>
            </article>

            <article className="premium-card rounded-3xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-white">Good reasons to get in touch</h2>
              <ul className="mt-5 grid gap-3 text-sm text-slate-300">
                {contactReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-mint/20 bg-mint/[0.07] text-mint"><Icon name="check" className="h-3 w-3" /></span>
                    {reason}
                  </li>
                ))}
              </ul>
            </article>

            <article className="premium-card rounded-3xl p-6">
              <p className="text-sm leading-6 text-slate-400">Want to understand AutoChat before writing?</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
                <ButtonLink href={site.tutorialUrl} variant="secondary" className="!w-full">Watch Tutorial</ButtonLink>
                <ButtonLink href="/products/autochat" variant="quiet" className="!w-full">Explore AutoChat</ButtonLink>
              </div>
            </article>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
