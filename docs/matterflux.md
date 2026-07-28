# MatterFlux

MatterFlux is a cinematic matter-to-energy transition for important UI actions. The page darkens, particles collapse from the viewport edges into a purple singularity near the trigger point, and the sequence resolves as a success burst or a failure fade.

Current release: `v0.1.0`

Package name: `@indusautomationlabs/matterflux`

License: MIT

Status: experimental open-source interaction plugin by Indus Automation Labs

## Repository layout

The reusable package is the source of truth:

```text
packages/matterflux/
  package.json
  README.md
  LICENSE
  src/
    index.ts
    matterflux.ts
    types.ts
    react/
      MatterFluxProvider.tsx
      MatterFluxOverlay.tsx
      useMatterFlux.ts
      index.ts
    vanilla/
      index.ts
      browser.ts
    styles/
      matterflux.css
  examples/
    vanilla.html
    react-basic.tsx
    nextjs-client.tsx
  tsconfig.json
  tsup.config.ts
```

The website's client wrapper imports the provider and hook from `packages/matterflux/src/react`, and the root layout imports the package stylesheet. This keeps the live `/labs/matterflux` demo on the same implementation that is distributed to other developers.

## Public API

### Vanilla

```ts
import { createMatterFlux } from "@indusautomationlabs/matterflux";

const flux = createMatterFlux({ intensity: "medium" });
const succeeded = await flux.run({
  event,
  label: "Preparing download",
  mode: "success"
});

flux.destroy();
```

The IIFE build exposes `MatterFlux.create()`. A vanilla instance provides `run(options)`, `destroy()`, and `isActive()`.

### React and Next.js

```tsx
"use client";

import { MatterFluxProvider, useMatterFlux } from "@indusautomationlabs/matterflux/react";
```

`useMatterFlux()` exposes `runMatterFlux(options)` and `isActive`. React bindings use browser APIs and Canvas, so they belong in client components. Import `@indusautomationlabs/matterflux/styles.css` once from the application root.

## Performance behavior

The default intensity is `medium`.

| Intensity | Desktop particles | Mobile particles |
| --- | ---: | ---: |
| `low` | 50 | 25 |
| `medium` | 90 | 45 |
| `high` | 140 | 70 |

The renderer caps its device pixel ratio, limits drawing to about 60 FPS, stops drawing while a settled collapse waits for an asynchronous action, pauses requestAnimationFrame while `document.hidden` is true, and removes frames, timers, resize listeners, visibility listeners, and overlays after completion. A provider or vanilla instance ignores overlapping transitions. Older GPUs should use `low` or `medium`.

## Accessibility

MatterFlux always honors `prefers-reduced-motion: reduce`. The fallback does not render Canvas particles or rotating rings. It uses a short dark overlay and compact glowing orb, retains the live status text, preserves focus, and completes quickly. `reducedMotion: true` can force the fallback; `false` does not override a user's system preference.

## Website integration

The root layout owns one `MatterFluxProvider`. The `matterFluxLabel` property on `ButtonLink` is opt-in and remains limited to these important AutoChat actions:

- Homepage direct AutoChat download
- AutoChat product page latest installer buttons
- Pricing page download/apply-voucher CTA

Normal navigation, legacy downloads, the prospectus, YouTube links, pricing, legal routes, support email, and Paddle-related behavior are unchanged.

The official product and live demo page is:

```text
/labs/matterflux
```

The site-hosted release asset is:

```text
/downloads/matterflux-v0.1.0.zip
```

## Build and release asset

From the repository root:

```bash
npm run matterflux:build
npm run matterflux:zip
```

The package build produces ESM, CommonJS, IIFE, source maps, type declarations, and `matterflux.css` in `packages/matterflux/dist`. The ZIP command rebuilds the package, then creates `public/downloads/matterflux-v0.1.0.zip` with `dist`, examples, README, license, and package metadata.

Run the full website validation separately:

```bash
npm run build
```

## Future GitHub release plan

1. Create a dedicated GitHub repository named `matterflux`.
2. Push `packages/matterflux` as the package source.
3. Attach `matterflux-v0.1.0.zip` as a release asset.
4. Optionally publish `@indusautomationlabs/matterflux` to npm later.

The website currently links to `https://github.com/hamzah105/matterflux` as a placeholder. The external repository is not created by this branch.

## Rollback

To remove only the website integration, revert the package imports in `app/layout.tsx` and `components/ButtonLink.tsx`, remove MatterFlux props from the selected CTA instances, and remove the lab/footer links if desired.

To discard the complete unmerged branch from a clean worktree:

```bash
git switch feature/matterflux-transition
git branch -D feature/matterflux-open-source-plugin
```

Do not run the branch deletion command with uncommitted changes. No production deployment settings are changed by this work.
