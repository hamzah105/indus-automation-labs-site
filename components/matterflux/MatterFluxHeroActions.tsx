"use client";

import { useMatterFlux } from "@/packages/matterflux/src/react";

const buttonBase =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 text-center text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:cursor-wait disabled:opacity-60 sm:w-auto";

export function MatterFluxHeroActions() {
  const { isActive, runMatterFlux } = useMatterFlux();

  return (
    <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        disabled={isActive}
        onClick={(event) =>
          runMatterFlux({
            event,
            label: "Running success demo",
            mode: "success",
            intensity: "medium",
            successMessage: "Success demo complete"
          })
        }
        className={`${buttonBase} border border-violet-300/30 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-[0_14px_50px_rgba(168,85,247,0.24)]`}
      >
        Run Success Demo
      </button>
      <button
        type="button"
        disabled={isActive}
        onClick={(event) =>
          runMatterFlux({
            event,
            label: "Running failure demo",
            mode: "failure",
            intensity: "medium",
            failureMessage: "Failure demo complete; the interface was restored"
          })
        }
        className={`${buttonBase} border border-white/[0.14] bg-white/[0.055] text-white hover:border-violet-300/45 hover:bg-violet-400/[0.09]`}
      >
        Run Failure Demo
      </button>
      <a
        className={`${buttonBase} border border-cyan-300/30 bg-cyan-300/[0.09] text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/[0.14]`}
        href="/downloads/matterflux-v0.1.0.zip"
        download
      >
        Download Plugin ZIP
      </a>
      <a
        className={`${buttonBase} border border-white/[0.12] bg-transparent text-slate-200 hover:border-white/30 hover:text-white`}
        href="https://github.com/hamzah105/matterflux"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub
      </a>
    </div>
  );
}
