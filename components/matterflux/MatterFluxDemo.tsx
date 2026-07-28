"use client";

import { useState } from "react";
import { useMatterFlux } from "@/packages/matterflux/src/react";

export function MatterFluxDemo() {
  const { isActive, runMatterFlux } = useMatterFlux();
  const [lastResult, setLastResult] = useState<string>("Ready for a controlled test.");

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violetGlow/[0.13] blur-3xl" aria-hidden="true" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-violetGlow shadow-[0_0_18px_#a78bfa]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">Interactive test chamber</p>
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Resolve the same action in two ways.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            The success path concentrates into a bright shockwave. The failure path loses energy, restores the interface, and reports the issue without navigating away.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-ink/[0.55] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Last signal</p>
          <p className="mt-2 text-sm text-slate-200" aria-live="polite">{lastResult}</p>
        </div>
      </div>

      <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={isActive}
          onClick={async (event) => {
            setLastResult("Running success transition...");
            const succeeded = await runMatterFlux({
              event,
              label: "Running success transition",
              mode: "success",
              intensity: "medium",
              duration: 1600,
              successMessage: "MatterFlux resolved successfully"
            });
            setLastResult(succeeded ? "Success transition completed." : "Success transition could not complete.");
          }}
          className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-violet-300/30 bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_50px_rgba(168,85,247,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(168,85,247,0.36)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:cursor-wait disabled:opacity-60"
        >
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_14px_white] transition group-hover:scale-125" aria-hidden="true" />
          Run Success Demo
        </button>
        <button
          type="button"
          disabled={isActive}
          onClick={async (event) => {
            setLastResult("Running failure transition...");
            await runMatterFlux({
              event,
              label: "Running failure transition",
              mode: "failure",
              intensity: "medium",
              duration: 1700,
              failureMessage: "Demo failure: the interface has been safely restored"
            });
            setLastResult("Failure transition completed; normal interaction restored.");
          }}
          className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/[0.14] bg-white/[0.055] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-violetGlow/45 hover:bg-violetGlow/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:cursor-wait disabled:opacity-60"
        >
          <span className="h-2 w-2 rounded-full border border-violet-300 bg-violet-400/30" aria-hidden="true" />
          Run Failure Demo
        </button>
      </div>
    </div>
  );
}
