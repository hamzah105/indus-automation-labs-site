import type { Metadata } from "next";
import { MatterFluxDemo } from "@/components/matterflux/MatterFluxDemo";

export const metadata: Metadata = {
  title: "MatterFlux - Cinematic UI Transition",
  description: "MatterFlux is an experimental matter-to-energy transition for critical interface actions by Indus Automation Labs."
};

const useCases = [
  ["SaaS downloads", "Give important installer and release actions a clear sense of completion."],
  ["Deploy commands", "Resolve a developer-tool deployment with a focused success or failure state."],
  ["Terminal moments", "Add cinematic feedback to final commands without obscuring routine interaction."],
  ["Checkout confirmation", "Reserve the effect for the moment a purchase or licensing flow resolves."],
  ["Dashboard actions", "Mark irreversible or high-value actions in complex operator interfaces."],
  ["Open-source launches", "Create a memorable final interaction for project and package release pages."]
];

const codeExample = `const { runMatterFlux } = useMatterFlux();

<button
  onClick={(event) =>
    runMatterFlux({
      event,
      label: "Downloading AutoChat",
      href: site.releaseUrl,
      mode: "success"
    })
  }
>
  Download
</button>`;

export default function MatterFluxPage() {
  return (
    <main>
      <section className="relative mx-auto min-h-[72vh] max-w-[90rem] overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="absolute left-1/2 top-20 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-violet-600/[0.13] blur-[110px]" aria-hidden="true" />
        <div className="mx-auto max-w-5xl text-center reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_#c4b5fd]" aria-hidden="true" />
            Experimental interface lab
          </div>
          <h1 className="mt-8 text-balance font-display text-6xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-8xl lg:text-[8.5rem]">
            Matter<span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">Flux</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-balance font-display text-2xl font-medium leading-tight tracking-[-0.025em] text-slate-200 sm:text-3xl">
            A cinematic matter-to-energy transition for important UI actions.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-400">
            MatterFlux darkens the interface, draws edge particles into a purple singularity, and resolves the result as either a bright success burst or a soft failure fade.
          </p>
          <a href="#matterflux-demo" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 transition hover:text-white">
            Enter the test chamber <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section id="matterflux-demo" className="scroll-mt-24 border-y border-white/[0.07] bg-ink/[0.38] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <MatterFluxDemo />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="eyebrow-label">How it works</p>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">One signal, three visual states.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              The provider coordinates action state and navigation while the overlay owns rendering and cleanup. Canvas carries the particles; CSS carries the vignette, core, and low-motion fallback.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Collapse", "The edges darken first while matter accelerates toward the click origin."],
              ["02", "Concentrate", "Purple and cyan energy forms a compact, luminous singularity."],
              ["03", "Resolve", "Success creates a shockwave; failure dims and safely restores the page."]
            ].map(([number, title, description]) => (
              <li key={number} className="premium-card rounded-3xl p-6">
                <span className="font-display text-sm font-semibold text-violet-300">{number}</span>
                <h3 className="mt-8 font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <p className="eyebrow-label">Designed for final actions</p>
        <h2 className="mt-5 max-w-3xl text-balance font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Memorable when it matters. Quiet everywhere else.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map(([title, description], index) => (
            <article key={title} className="premium-card rounded-3xl p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violetGlow/20 bg-violetGlow/[0.07] font-display text-xs font-semibold text-violet-200">0{index + 1}</div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#030612]/90 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/[0.08] px-5 py-4">
            <span className="h-2.5 w-2.5 rounded-full bg-violet-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400/60" />
            <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Example.tsx</span>
          </div>
          <pre className="overflow-x-auto p-5 text-[13px] leading-7 text-slate-300 sm:p-7"><code>{codeExample}</code></pre>
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow-label">Reusable by design</p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.035em] text-white">A tiny API around a complete lifecycle.</h2>
          <p className="mt-5 text-sm leading-7 text-slate-400">
            Trigger from a click or element, run an optional async action, then resolve success, failure, or deferred navigation. Color, intensity, particle count, messages, and duration are configurable.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="glass rounded-3xl p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyanGlow">Accessibility</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">Motion preference is part of the API.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">MatterFlux respects reduced-motion preferences and replaces particles and spirals with a quick dark overlay and compact progress signal. Status changes are announced, focus is not trapped, and the overlay always cleans itself up.</p>
          </article>
          <article className="glass rounded-3xl p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">Open-source direction</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">Built in the open, starting here.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">MatterFlux is an experimental, reusable interaction plugin by Indus Automation Labs. This website integration is its first proving ground before extraction into a standalone package.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
