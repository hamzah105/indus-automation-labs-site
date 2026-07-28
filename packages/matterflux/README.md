# MatterFlux

**A cinematic matter-to-energy transition for important UI actions.**

MatterFlux darkens the page, draws particles from the viewport edges into a glowing purple singularity near the trigger point, and resolves with either a success burst or a failure fade. It is framework-independent at its core and includes first-class React and Next.js bindings.

Version: `0.1.0` (experimental)

## What it does

MatterFlux gives a final or high-value action a clear visual lifecycle:

1. The interface darkens without shifting layout.
2. A controlled particle field collapses toward the click or configured coordinates.
3. The transition resolves as a success burst or a failure fade.
4. Optional navigation occurs only after a successful transition completes.

## Use cases

- Installer and release downloads
- Deployment completion
- Checkout confirmation
- Important dashboard operations
- Developer-tool workflows
- Other final actions that deserve more feedback than a routine link

MatterFlux is intentionally not designed for every navigation or button press.

## Installation

The npm package name is reserved in the package metadata for a future publication:

```bash
npm install @indusautomationlabs/matterflux
```

Until the npm release is published, download the release ZIP from the future GitHub repository or from:

- [indusautomationlabs.com/labs/matterflux](https://indusautomationlabs.com/labs/matterflux)
- [github.com/hamzah105/matterflux](https://github.com/hamzah105/matterflux) (repository will be published soon)

The ZIP includes ESM, CommonJS, IIFE, type declarations, CSS, examples, this README, and the MIT license.

## Vanilla JavaScript

```html
<link rel="stylesheet" href="./matterflux.css" />
<script src="./matterflux.iife.js"></script>

<button id="download">Download</button>

<script>
  const flux = MatterFlux.create();

  document.getElementById("download").addEventListener("click", async (event) => {
    await flux.run({
      event,
      label: "Preparing download",
      mode: "success"
    });
  });
</script>
```

With ESM:

```js
import { createMatterFlux } from "@indusautomationlabs/matterflux";
import "@indusautomationlabs/matterflux/styles.css";

const flux = createMatterFlux({ intensity: "medium" });
await flux.run({ x: 320, y: 240, label: "Completing action" });
flux.destroy();
```

Call `destroy()` when a long-lived integration is permanently removed. An instance safely ignores a new `run()` call while its current transition is active.

## React

Import the stylesheet once near the application root, then mount the provider above components that use the hook.

```tsx
import "@indusautomationlabs/matterflux/styles.css";
import { MatterFluxProvider, useMatterFlux } from "@indusautomationlabs/matterflux/react";

function DownloadButton() {
  const { isActive, runMatterFlux } = useMatterFlux();

  return (
    <button
      disabled={isActive}
      onClick={(event) =>
        runMatterFlux({
          event,
          label: "Downloading",
          mode: "success"
        })
      }
    >
      Download
    </button>
  );
}

export function App() {
  return (
    <MatterFluxProvider>
      <DownloadButton />
    </MatterFluxProvider>
  );
}
```

`useMatterFlux()` returns `runMatterFlux(options)` and `isActive`.

## Next.js

MatterFlux uses browser APIs and Canvas. The provider, components, and hooks must therefore be used from client components only. Import the global CSS from the root layout.

```tsx
// app/layout.tsx
import "@indusautomationlabs/matterflux/styles.css";
import { MatterFluxProvider } from "@indusautomationlabs/matterflux/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <MatterFluxProvider>{children}</MatterFluxProvider>;
}
```

```tsx
// app/DownloadButton.tsx
"use client";

import { useMatterFlux } from "@indusautomationlabs/matterflux/react";

export function DownloadButton() {
  const { runMatterFlux } = useMatterFlux();

  return (
    <button onClick={(event) => runMatterFlux({ event, label: "Downloading" })}>
      Download
    </button>
  );
}
```

## Options

| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `event` | mouse-like event | - | Uses `clientX` and `clientY` as the singularity position. React mouse events are accepted structurally. |
| `x`, `y` | `number` | viewport center | Explicit singularity coordinates. Both values are required. |
| `origin` | `Element` | - | Uses the center of an element when coordinates are not supplied. |
| `label` | `string` | `"Resolving action"` | In-progress visible and accessible status. |
| `mode` | `"success" \| "failure"` | `"success"` | Visual resolution when the optional action succeeds. |
| `href` | `string` | - | Navigates after a successful resolution. |
| `target` | `"_self" \| "_blank"` | `"_self"` | Navigation target for `href`. |
| `duration` | `number` | `1400` | Duration in milliseconds, clamped from 650 to 3000. |
| `intensity` | `"low" \| "medium" \| "high"` | `"medium"` | Selects a sensible device-aware particle budget. |
| `particleCount` | `number` | intensity budget | Explicit override, clamped from 0 to 200. |
| `primaryColor` | CSS color | `#a855f7` | Main energy color. |
| `secondaryColor` | CSS color | `#22d3ee` | Secondary particle color. |
| `coreColor` | CSS color | `#f5d0fe` | Singularity core color. |
| `backgroundColor` | CSS color | `#020617` | Overlay background color. |
| `overlayOpacity` | `number` | `0.88` | Overlay opacity from 0 to 1. |
| `reducedMotion` | `boolean` | system preference | Forces the low-motion path when true. The system preference is always respected. |
| `action` | function | - | Synchronous or asynchronous work. Rejection produces a failure transition. |
| `successMessage` | `string` | `"Action complete"` | Success status label. |
| `failureMessage` | `string` | failure copy | Failure status and React live-region message. |
| `onStart` | function | - | Runs immediately before the overlay mounts. |
| `onComplete` | function | - | Runs after either resolution finishes and cleanup completes. |
| `onError` | function | - | Receives action or consumer-callback errors. |

The CSS exposes `--matterflux-primary`, `--matterflux-secondary`, `--matterflux-core`, `--matterflux-bg`, and `--matterflux-overlay-opacity` on the overlay. JavaScript color options set those variables for each run.

## Success transition

```ts
const succeeded = await flux.run({
  event,
  label: "Preparing release",
  mode: "success",
  href: "/downloads/release.zip",
  onComplete: () => console.log("Transition complete")
});
```

Navigation waits for the success burst. The promise resolves to `true`.

## Failure transition

```ts
const succeeded = await flux.run({
  event,
  label: "Deploying workspace",
  action: async () => deployWorkspace(),
  failureMessage: "Deployment failed; the interface was restored",
  onError: (error) => console.error(error)
});
```

If `action` rejects, MatterFlux uses the failure fade, skips navigation, and resolves to `false`. Set `mode: "failure"` to demonstrate the failure path without throwing an error.

## Accessibility and reduced motion

MatterFlux checks `prefers-reduced-motion: reduce` on every run. In reduced-motion mode it skips Canvas particles and rotating rings, renders a short dark overlay with a small glowing orb, and completes quickly. Passing `reducedMotion: true` forces this behavior; passing `false` does not override the user's system preference.

Status text uses an assertive live region. The transition does not move focus or cause layout shift. Reserve the effect for user-initiated, important actions so it remains understandable and predictable.

## Performance

The default intensity is `medium`. Particle budgets are intentionally conservative:

| Intensity | Desktop | Mobile |
| --- | ---: | ---: |
| `low` | 50 | 25 |
| `medium` | 90 | 45 |
| `high` | 140 | 70 |

The renderer caps device pixel ratio at 1.5, caps drawing around 60 FPS, stops drawing when the collapse is visually settled, pauses requestAnimationFrame work while the document is hidden, and cancels frames, timers, and listeners during cleanup. Only one transition can run per instance or provider at a time. Older or integrated GPUs should use `low` or `medium`.

## Browser support

MatterFlux targets current evergreen versions of Chrome, Edge, Firefox, and Safari. It requires Canvas 2D, `requestAnimationFrame`, CSS custom properties, and `color-mix()`. A missing Canvas context falls back to a short CSS-only resolution rather than leaving the page blocked. Internet Explorer is not supported.

## Development

From the Indus Automation Labs site repository:

```bash
npm run matterflux:build
npm run matterflux:zip
```

Package output is written to `packages/matterflux/dist`. The release ZIP is written to `public/downloads/matterflux-v0.1.0.zip`.

## License

MatterFlux is available under the [MIT License](./LICENSE).

Created by [Indus Automation Labs](https://indusautomationlabs.com). MatterFlux is experimental open-source software; evaluate it in the browsers and devices relevant to your project before production use.
