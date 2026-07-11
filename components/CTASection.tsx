import { ButtonLink } from "@/components/ButtonLink";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

type CTASectionProps = {
  title?: string;
  description?: string;
};

export function CTASection({
  title = "Ready to use AutoChat?",
  description = "Download AutoChat v1.0.0, review the product prospectus, or contact Indus Automation Labs for onboarding support."
}: CTASectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="cta-panel relative isolate overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-12">
        <div className="cta-orb" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="eyebrow-label">Next step</p>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
        </div>
        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={site.releaseUrl} showArrow>Download AutoChat v1.0.0</ButtonLink>
          <ButtonLink href={site.tutorialUrl} variant="secondary">
            <span className="inline-flex items-center gap-2"><Icon name="play" className="h-4 w-4" />Watch Tutorial</span>
          </ButtonLink>
          <ButtonLink href={site.prospectusPath} variant="secondary" download>
            Download AutoChat Prospectus
          </ButtonLink>
          <ButtonLink href={site.generalContactMailto} variant="secondary">
            Contact Support
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
