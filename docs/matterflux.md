# MatterFlux

MatterFlux is an experimental matter-to-energy transition for critical UI actions. It darkens the interface, moves edge particles into a purple singularity near the trigger point, and resolves with either a success shockwave or a recoverable failure fade.

Current status: experimental website-integrated effect by Indus Automation Labs, designed for later extraction into a standalone open-source package.

## Components

- `MatterFluxProvider` owns transition state, async action resolution, messaging, and deferred navigation.
- `MatterFluxOverlay` renders the vignette, singularity, particles, and result states using Canvas and CSS.
- `useMatterFlux` exposes `runMatterFlux` and `isActive` to client components.
- `types.ts` contains the public TypeScript API.

The root layout already includes `MatterFluxProvider`.

## Trigger an action

```tsx
"use client";

import { useMatterFlux } from "@/components/matterflux";

export function DownloadButton() {
  const { runMatterFlux } = useMatterFlux();

  return (
    <button
      onClick={(event) =>
        runMatterFlux({
          event,
          label: "Downloading AutoChat",
          href: site.releaseUrl,
          target: "_blank",
          mode: "success"
        })
      }
    >
      Download
    </button>
  );
}
```

Navigation waits until the success animation resolves. Existing important download buttons use the optional `matterFluxLabel` prop on `ButtonLink`; ordinary navigation remains unaffected.

## Async actions and failures

```tsx
const succeeded = await runMatterFlux({
  event,
  label: "Deploying workspace",
  action: async () => deployWorkspace(),
  successMessage: "Workspace deployed",
  failureMessage: "Deployment failed; no changes were applied"
});
```

If `action` resolves, MatterFlux shows the success state. If it rejects, MatterFlux restores the page, shows the failure message, and resolves the returned promise to `false`. Use `mode: "failure"` to demonstrate or explicitly render the failure path without an action.

## Options

| Option | Purpose |
| --- | --- |
| `event` / `origin` | Positions the singularity at a click or element; otherwise uses the viewport center. |
| `action` | Optional synchronous or asynchronous work to resolve. |
| `href` / `target` | Optional navigation after a successful resolve. |
| `mode` / `result` | Explicit `success` or `failure` result. |
| `duration` | Transition duration from 650–3000ms. |
| `particleCount` | Particle budget, clamped to 24–240. |
| `intensity` | `low`, `medium`, or `high` particle density. |
| `primaryColor` | Main energy color. Default `#a855f7`. |
| `secondaryColor` | Secondary energy color. Default `#22d3ee`. |
| `coreColor` | Singularity center color. Default `#f5d0fe`. |
| `backgroundColor` | Overlay color. Default `#020617`. |
| `label` | In-progress accessible status. |
| `successMessage` / `failureMessage` | Result labels and live-region messages. |

Provider props set site-wide defaults; trigger options override them for one run. Desktop defaults to 160 particles and mobile to 70 before intensity scaling.

## Accessibility and cleanup

When `prefers-reduced-motion: reduce` is active, MatterFlux skips Canvas particles and rotating rings. It uses a short, low-motion dark overlay with a small progress signal instead. Status text uses a live region, the transition does not move focus or trap it, and pointer blocking ends when the overlay unmounts.

Animation frames, media-query listeners, resize listeners, timers, and pending completion callbacks are cleaned up when their owner unmounts. A completion watchdog prevents the overlay from remaining active if Canvas is unavailable.

## Safety and rollback

MatterFlux is isolated in `components/matterflux`, global styles use the `matterflux-` prefix, and CTA integration is opt-in. It has no backend, secrets, animation dependencies, or pricing/payment logic.

To remove only the integration, remove `matterFluxLabel` from the selected `ButtonLink` instances and remove the provider wrapper from `app/layout.tsx`. To roll back the complete feature branch before merging, switch to `main` and delete `feature/matterflux-transition`.
