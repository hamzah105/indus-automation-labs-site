import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";

const mockupCards = [
  { label: "WhatsApp Connected", value: "Online", tone: "text-mint" },
  { label: "Approval Mode", value: "Active", tone: "text-cyanGlow" },
  { label: "Product Catalog", value: "Indexed", tone: "text-violetGlow" },
  { label: "Customer Memory", value: "Isolated", tone: "text-solar" },
  { label: "Training Inbox", value: "6 items", tone: "text-cyanGlow" },
  { label: "Supplier Desk", value: "Private", tone: "text-mint" }
];

export function HeroSection() {
  return (
    <section className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
      <div>
        <div className="inline-flex rounded-full border border-cyanGlow/25 bg-cyanGlow/10 px-4 py-2 text-sm text-cyanGlow">
          AutoChat is in controlled working desktop pilot
        </div>
        <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
          AI-powered automation software for modern businesses.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Indus Automation Labs builds practical automation tools for small and medium businesses. Our first product,
          AutoChat, helps businesses automate customer conversations, support workflows, product questions, and lead
          handling through an AI-powered messaging automation platform.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="/products/autochat">Explore AutoChat</ButtonLink>
          <ButtonLink href={site.releaseUrl} variant="secondary">
            Download Latest Release
          </ButtonLink>
          <ButtonLink href={site.prospectusPath} variant="secondary" download>
            Download AutoChat Prospectus
          </ButtonLink>
        </div>
      </div>

      <div className="glass relative overflow-hidden rounded-3xl p-4 shadow-violet">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyanGlow/15 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-violetGlow/15 blur-3xl" aria-hidden="true" />
        <div className="relative rounded-2xl border border-white/10 bg-ink/72">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">AutoChat Control</p>
              <p className="mt-1 font-display text-lg font-semibold text-white">Business Messaging Lab</p>
            </div>
            <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">Live pilot</span>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {mockupCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs text-slate-500">{card.label}</p>
                <p className={`mt-2 font-display text-xl font-semibold ${card.tone}`}>{card.value}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 p-4">
            <div className="rounded-2xl border border-cyanGlow/20 bg-cyanGlow/10 p-4">
              <p className="text-sm font-semibold text-white">AI draft ready for approval</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Customer asked about stock, price, delivery, and product variations. Owner can edit, approve, train, or
                save as customer-specific memory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
