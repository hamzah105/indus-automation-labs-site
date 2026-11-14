import type { Metadata } from "next";
import { MatterFluxDemo } from "@/components/matterflux/MatterFluxDemo";
import { MatterFluxHeroActions } from "@/components/matterflux/MatterFluxHeroActions";

export const metadata: Metadata = {
  title: "MatterFlux - Open-source UI Transition",
  description: "MatterFlux is a cinematic matter-to-energy transition for important UI actions by Indus Automation Labs."
};

const useCases = [
  ["Downloads", "Give installers and release files a clear moment of completion."],
  ["Deployments", "Resolve a developer-tool deployment with focused success or failure feedback."],
  ["Checkout confirmations", "Reserve the effect for the final confirmation in a purchase flow."],
  ["Dashboard actions", "Mark high-value or irreversible actions in operator interfaces."],
  ["Developer workflows", "Add cinematic feedback to the final step of a controlled workflow."],
  ["Product launches", "Create a memorable final interaction for release and package pages."]
];

const examples = [
  {
    label: "Vanilla JavaScript",
    filename: "index.html",
    code: `<link rel="stylesheet" href="./matterflux.css" />
<script src="./matterflux.iife.js"></script>

<button id="download">Download</button>

<script>
  const flux = MatterFlux.create();
  download.addEventListener("click", (event) =>
    flux.run({ event, label: "Preparing download" })
  );
</script>`
  },
  {
    label: "React",
    filename: "DownloadButton.tsx",
    code: `import { useMatterFlux } from
  "@indusautomationlabs/matterflux/react";

export function DownloadButton() {
  const { runMatterFlux } = useMatterFlux();
  return (
    <button onClick={(event) => runMatterFlux({
      event,
      label: "Downloading",
      mode: "success"
    })}>
      Download
    </button>
  );
}`
  },
  {
    label: "Next.js",
    filename: "CompleteAction.tsx",
    code: `"use client";

import { useMatterFlux } from
  "@indusautomationlabs/matterflux/react";

export function CompleteAction() {
  const { runMatterFlux } = useMatterFlux();
  return (
    <button onClick={(event) => runMatterFlux({
      event,
      label: "Completing action",
      intensity: "medium"
    })}>
      Complete
    </button>
  );
}`
  }
];

const performanceModes = [
  ["Low", "50 desktop / 25 mobile", "Best for older, integrated, or constrained GPUs."],
  ["Medium", "90 desktop / 45 mobile", "The balanced default for most product interfaces."],
  ["High", "140 desktop / 70 mobile", "A denser field for capable devices and short transitions."]
];

export default function MatterFluxPage() {
  return (
    <main>
      <section className="relative mx-auto min-h-[76vh] max-w-[90rem] overflow-hidden px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="absolute left-1/2 top-16 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet-600/[0.14] blur-[110px]" aria-hidden="true" />
        <div className="mx-auto max-w-5xl text-center reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-400/[0.07] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_#c4b5fd]" aria-hidden="true" />
            Open-source interaction plugin · v0.1.0
          </div>
          <h1 className="mt-8 text-balance font-display text-6xl font-semibold leading-none tracking-[-0.06em] text-white sm:text-8xl lg:text-[8.5rem]">
            Matter<span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">Flux</span>
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-balance font-display text-2xl font-medium leading-tight tracking-[-0.025em] text-slate-200 sm:text-3xl">
            A cinematic matter-to-energy transition for important UI actions.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-400">
            Darken the interface, collapse particles into a purple singularity near the action point, and resolve with a success burst or failure fade.
          </p>
          <MatterFluxHeroActions />
          <p className="mt-4 text-xs text-slate-500">The dedicated GitHub repository will be published soon.</p>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-ink/[0.38] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow-label">What it does</p>
              <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">A complete visual lifecycle for final actions.</h2>
              <p className="mt-5 text-sm leading-7 text-slate-400">
                MatterFlux creates cinematic action transitions for downloads, deployment completions, checkout confirmations, dashboard actions, and developer-tool workflows. It stays opt-in so routine navigation remains fast and quiet.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map(([title, description], index) => (
                <article key={title} className="premium-card rounded-3xl p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/[0.07] font-display text-xs font-semibold text-violet-200">0{index + 1}</div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="matterflux-demo" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="eyebrow-label">Live demo</p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">See both outcomes in the browser.</h2>
          </div>
          <MatterFluxDemo />
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-ink/[0.38] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="eyebrow-label">Integration examples</p>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Use the same API across your stack.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">The release includes framework-free, React, and Next.js entry points plus TypeScript declarations. Import the stylesheet once and mount the React provider at the application root.</p>
          </div>
          <div className="mt-10 grid gap-5 xl:grid-cols-3">
            {examples.map((example) => (
              <article key={example.label} className="overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-[#030612]/90 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                  <span className="text-xs font-semibold text-violet-200">{example.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-slate-600">{example.filename}</span>
                </div>
                <pre className="overflow-x-auto p-5 text-[12px] leading-6 text-slate-300"><code>{example.code}</code></pre>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="eyebrow-label">Performance modes</p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Cinematic without an extreme default.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">MatterFlux defaults to medium, lowers particle counts on mobile, caps rendering around 60 FPS, and pauses drawing in hidden tabs. Older GPUs should use low or medium mode.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {performanceModes.map(([mode, count, description]) => (
              <article key={mode} className="premium-card rounded-3xl p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">{mode}</p>
                <p className="mt-5 font-display text-xl font-semibold text-white">{count}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="glass rounded-3xl p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyanGlow">Accessibility</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">Reduced motion is built in.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">When reduced motion is preferred, MatterFlux skips the particle storm and rotating rings. It uses a quick dark overlay with a compact glowing orb, announces status changes, preserves focus, and cleans up immediately after resolution.</p>
          </article>
          <article className="glass rounded-3xl p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">Open-source status</p>
            <h2 className="mt-4 font-display text-2xl font-semibold text-white">Experimental, reusable, and MIT licensed.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">MatterFlux is an experimental open-source interaction plugin by Indus Automation Labs. Version 0.1.0 is available as a site-hosted ZIP; explore its source in the public GitHub repository.</p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
              <a className="text-cyan-200 transition hover:text-white" href="/downloads/matterflux-v0.1.0.zip" download>Download v0.1.0 ZIP</a>
              <a className="text-violet-200 transition hover:text-white" href="https://github.com/hamzah105/matterflux" target="_blank" rel="noopener noreferrer">GitHub source</a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
