import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Indus Automation Labs for AutoChat pilot access, support, and business automation inquiries.",
  openGraph: {
    title: "Contact Indus Automation Labs",
    description: "Reach support for AutoChat and business automation inquiries."
  }
};

export default function ContactPage() {
  return (
    <main>
      <Section
        eyebrow="Contact"
        title="Talk to Indus Automation Labs"
        description="For AutoChat pilot access, product questions, support, or business automation inquiries, contact the team by email or use the inquiry form."
        className="pt-20"
      >
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-white">Business support</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Email is the active support channel while the website contact system is being configured.
            </p>
            <a className="mt-5 block break-words text-lg font-semibold text-cyanGlow hover:text-white" href={site.generalContactMailto}>
              {site.email}
            </a>
            <ButtonLink href={site.generalContactMailto} className="mt-8">
              Email Support
            </ButtonLink>
          </div>
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
