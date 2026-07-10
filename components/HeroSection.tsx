import { ButtonLink } from "@/components/ButtonLink";
import { AutoChatDashboardPreview } from "@/components/AutoChatDashboardPreview";
import { Icon } from "@/components/Icon";
import { StatusPill } from "@/components/StatusPill";
import { site } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative isolate mx-auto grid min-h-[calc(100vh-76px)] max-w-[90rem] items-center gap-12 overflow-hidden px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20 xl:gap-16">
      <div className="hero-orb hero-orb-cyan" aria-hidden="true" />
      <div className="hero-orb hero-orb-violet" aria-hidden="true" />
      <div className="relative z-10 reveal-up">
        <div className="flex flex-wrap gap-2">
          <StatusPill tone="mint">Working desktop pilot</StatusPill>
          <StatusPill tone="violet">Approval mode</StatusPill>
        </div>
        <h1 className="mt-7 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.35rem] xl:text-[4.8rem]">
          AI automation for <span className="gradient-text">customer conversations</span> and SME operations.
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-300 sm:text-lg">
          Indus Automation Labs builds practical automation tools for small and medium businesses. Our first product,
          AutoChat, brings customer support, product knowledge, and approval-based AI replies into one Windows desktop app.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={site.releaseUrl} showArrow>
            Download AutoChat v1.0.0
          </ButtonLink>
          <ButtonLink href="/products/autochat" variant="secondary" showArrow>
            Explore AutoChat
          </ButtonLink>
          <ButtonLink href={site.tutorialUrl} variant="secondary">
            <span className="inline-flex items-center gap-2"><Icon name="play" className="h-4 w-4" />Watch Tutorial</span>
          </ButtonLink>
          <ButtonLink href={site.adUrl} variant="quiet">
            Watch Product Ad
          </ButtonLink>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-2"><Icon name="shield" className="h-4 w-4 text-mint" />Human-in-the-loop</span>
          <span className="inline-flex items-center gap-2"><Icon name="memory" className="h-4 w-4 text-solar" />Customer memory isolation</span>
          <span className="inline-flex items-center gap-2"><Icon name="license" className="h-4 w-4 text-violetGlow" />NEWCOM launch offer</span>
        </div>
      </div>

      <div className="relative z-10 reveal-up reveal-delay-2 lg:-mr-10 xl:-mr-14">
        <AutoChatDashboardPreview />
      </div>
    </section>
  );
}
