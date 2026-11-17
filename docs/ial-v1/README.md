# Indus Automation Labs 1.0

The founder-approved website release combines the Genesis identity, Products/AutoChat experiences, completed company pages and final cinematic refinement. IAL 1.0 is the website edition, not a product version. Publication status must be verified against GitHub, Vercel and the official domains; source approval alone is not deployment evidence.

## Runtime and architecture

- Next.js 15.5.29 App Router, React/React DOM 19.3.1, TypeScript and the existing Tailwind/local-font setup. Node 24.x is pinned.
- `app/(genesis)/page.tsx` preserves `/` while composing the original stellar numeral, homepage motion preference and Intelligence Signal narrative.
- `lib/ial-v1/galaxy-data.ts` supplies the original immutable seeded geometry. The single WebGL 1 renderer layers slow differential orbits, drift, asynchronous twinkle and bounded damped pointer influence. Rendering stops offscreen or hidden. Touch/light tiers and system reduced motion have static alternatives.
- `components/ial-v1/home/IntelligenceStory.tsx`, `SignalStage.tsx` and `lib/ial-v1/signal-*` coordinate one bounded desktop SVG world, with portrait/static alternatives. Native scrolling remains intact. Human approval and decline remain explicit, fictional and non-sending.
- Products and AutoChat distinguish available software, alpha research and experiments. About, Pricing, Contact and Login have distinct compositions. Contact prepares an explicitly initiated email draft; the website does not submit messages, take payment, activate licenses or authenticate accounts.
- Labs, OOMP and MatterFlux retain their approved content and behavior. Shared official branding and the `GENESIS / A NEW CHAPTER` navbar subtitle are intentional updates. Legal wording remains unchanged.

The homepage motion choice is retained in memory during SPA navigation and resets on full reload. System reduced motion takes priority. No tracker, database or third-party rendering dependency was introduced.

## Build and validation

```powershell
npm.cmd ci
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd run build
npm.cmd run start
```

Run the standalone typecheck when a Next build is not simultaneously regenerating `.next/types`.

The approved local candidate passed Chrome production checks over 14 routes at seven widths, compact layouts, keyboard/touch/static alternatives, real WebGL loss/restoration, reversible story states, explicit decisions and resource cleanup. Six protected-route comparisons account for every difference through the authorized subtitle change. Same-time recovery at a deterministic 12-second fixture is pixel-identical; ordinary idle/hover recordings use the real simulation clock. Development Strict Mode releases all owned resources across three navigation cycles.

Detailed local review recordings, screenshots, machine-specific handover files and backups are deliberately excluded from publication. The public runtime source, assets, lightweight authoring tools and release records are retained. `release-source-manifest.json` describes the committed source selection using normalized Git blob content hashes.

## Asset sources

The official mark is a faithful derivative of the founder-supplied root WebP artwork, whose SHA-256 is `8352eff6e1e2def1dfb2c773a4254ec0baa529c601b25054f7895c35bb90eeb1`. Runtime derivatives and provenance live in `public/ial-v1/brand/`.

Galaxy artwork is original procedural geometry, seed 103197. Self-hosted Inter/Space Grotesk assets retain their OFL licenses. Historical authoring helpers referenced by asset provenance are kept under `qa/author-scene.cjs`, `phase2/author-og.cjs` and `phase3/brand-author.cjs`. They require an external Playwright installation and should be run in an isolated copy: checked-in final artwork is authoritative, and asset generation is not part of a normal build.

## Commercial and security notes

The founder reconfirmed PKR 20,000 regular pricing, NEWCOM at 50% off and PKR 10,000 promotional pricing on 17 November 2026. No new licensing period, tax or payment promise is implied. AutoChat's verified release remains v1.1.0; research directions are labeled accordingly.

The security remediation includes the supported Next 15 line, matching React 19 types, a same-major PostCSS override and two explicit undefined MatterFlux ref initial values. Fresh release audits are recorded separately. ESLint 8 remains EOL despite clean advisory results; Next 15 maintenance security support currently ends 31 January 2027. Plan the maintained tooling/framework follow-up before that deadline.

Safari/Firefox, dedicated assistive technology and physical low-end GPU testing remain unverified. Lab frame timings are CPU draw-submission observations, not field Core Web Vitals or GPU completion measurements. Existing Store automated-access restrictions do not establish a broken public Store destination.
