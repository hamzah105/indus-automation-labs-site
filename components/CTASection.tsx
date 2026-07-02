import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";

type CTASectionProps = {
  title?: string;
  description?: string;
};

export function CTASection({
  title = "Ready to test AutoChat?",
  description = "Download the working desktop pilot, review the product prospectus, or contact Indus Automation Labs for controlled pilot access."
}: CTASectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass overflow-hidden rounded-3xl p-8 sm:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyanGlow">Next step</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.githubRelease}>Download AutoChat Release</ButtonLink>
          <ButtonLink href={site.prospectusPath} variant="secondary" download>
            Download Product Prospectus
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
