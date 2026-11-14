**OOMP website — Phase 3 publication review, 14 November 2026**

The local release candidate is ready for founder review. It integrates the accepted OOMP page into a central Labs directory, improves phone readability, adds accessible installation copying, and provides verified source and release references. The animated hero and complete five-chapter narrative remain in place.

All three phases remain **uncommitted** on `feature/oomp-phase1`. Nothing was staged, committed, pushed, merged or deployed. The Phase 3 brief explicitly requires: “Stop for founder review before committing, pushing, merging or deploying.” The public `/labs` and `/labs/oomp` routes still return 404, as expected before publication. The older Phase 1/2 reports retain their historical approval gates; this report covers the separately requested Phase 3 implementation.

Local production preview: [Labs](http://127.0.0.1:3000/labs) and [OOMP](http://127.0.0.1:3000/labs/oomp). These URLs are local to this machine. Restart with `npm.cmd run start -- --hostname 127.0.0.1` after `npm.cmd run build` if the review server is no longer running.

The exact proposed publication files across **all three phases**, including screenshots, source, font licenses and QA drivers, are listed individually with SHA-256 checksums in [release-files.json](oomp-phase3/release-files.json). Its own checksum is omitted to avoid a self-reference. Use that list as the review allowlist. `indus_site_context.md` is an unrelated pre-existing untracked file and is excluded; its original checksum is unchanged. Environment files, local profiles, build output, credentials and temporary installation environments are excluded.

The application changes are concentrated in these files:

| Files | Result |
| --- | --- |
| `app/labs/page.tsx`, `app/labs/labs.module.css` | A server-rendered directory with exactly MatterFlux and OOMP. Different cyan interface and violet memory graphics; no new decorative animation. |
| `lib/site.ts`, `components/Navbar.tsx`, `components/Footer.tsx` | Labs points to `/labs`; deep Labs routes retain the active section on desktop and mobile. Exact index uses `aria-current="page"`; deep routes use `location`. Footer adds Labs and OOMP while keeping MatterFlux. |
| `app/labs/oomp/page.tsx`, `lib/labs-fonts.ts` | Verified canonical/social metadata and shared, scoped, existing self-hosted Labs fonts. Surrounding site typography is unchanged. |
| `components/oomp/OompCodeBlock.tsx`, `OompSections.tsx`, `oomp.module.css` | Clipboard controls, keyboard focus, live announcements, manual selection fallback, source inspection references, release status and research directions. |
| `components/oomp/oomp-story.module.css` | Larger node/source/inspector text; 190px phone inspector below the graph. Main labels are 12px, graph source references 9px and original-source IDs 10px on phones. |
| `lib/oomp-content.ts` | Central typed version/status, pinned documentation, install commands, capabilities, research goals, roadmap entries, benchmark evidence contract, release/changelog references and limitations. |
| `app/labs/matterflux/page.tsx` | Two factual copy updates: the verified public repository replaces the old planned-repository wording and “GitHub placeholder” label. Existing URL, ZIP and demos are preserved. |
| `app/sitemap.ts`, `public/labs/og.svg`, `public/labs/og.png` | Labs/OOMP sitemap coverage and an original 1200×630 Labs sharing image. |

The remaining OOMP components, story data, original logo/OG artwork, fonts and licenses are from Phases 1/2. Their exact names also appear in the manifest. Historical implementation reports and evidence are retained unchanged.

A verified temporary backup at `%TEMP%\oomp-phase3-baseline-ad2ad169` contains the accepted Phase 1/2 files and the shared files selected for this phase. [preservation-checks.json](oomp-phase3/preservation-checks.json) compares 61 backed-up files: **51 are byte-identical; 10 have the intentional Phase 3 changes above**. The typewriter, hero, motion engine, graph interaction component, chapter content and fictional story data are unchanged. No OOMP engine or TRACE files were modified; the independent OOMP checkout remains clean.

Git evidence resolves the previously uncertain baseline:

| Reference | Verified value |
| --- | --- |
| Current local branch / HEAD | `feature/oomp-phase1` / `6365b27786630117fc355cf712fde6cc82bf4dd2` |
| Current remote `main` via GitHub | `8e3aeb3a134d038396e03fecc7cf50eae4716b33` |
| Merge base | `6365b27786630117fc355cf712fde6cc82bf4dd2` |
| Remote relationship | One merge commit ahead; zero commits behind; no tree differences against the baseline. |
| Identical tree on both refs | `7b99e4eba9e86afa0dc6d4cf79b7bb51b3caf543` |
| Local `main` and cached `origin/main` | Still `d23dce97584d22f13f4a94dd0c8a56e246150d17`; stale local refs were not fetched or rewritten. |

Remote `main` already contains the MatterFlux work through merged PR #1. Its parents are `d23dce9` and `6365b277`. There is no present source-tree conflict to resolve, but recheck remote state before integration. Evidence comes from the read-only [GitHub comparison](https://github.com/hamzah105/indus-automation-labs-site/compare/6365b27786630117fc355cf712fde6cc82bf4dd2...8e3aeb3a134d038396e03fecc7cf50eae4716b33) and current branch metadata. [source-and-deployment-checks.json](oomp-phase3/source-and-deployment-checks.json) records the relevant public responses.

OOMP source verification uses current `main` at **`bebee6194c0c5f3963b15cbbf56ebc10dd83ccf6`**, unchanged since Phase 1. Its [pyproject.toml](https://github.com/hamzah105/OOMP/blob/bebee6194c0c5f3963b15cbbf56ebc10dd83ccf6/pyproject.toml) declares `oomp-memory` 0.1.0, Alpha, Apache-2.0, Python `>=3.11`, and Python 3.11/3.12 classifiers. Core requires `pydantic>=2.9,<3`. Optional `mcp` adds `mcp>=2.3.0,<2.4` and `uvicorn>=0.31.1,<1`; `ui` adds Rich 15.0.0 and Questionary 2.1.1. The [license](https://github.com/hamzah105/OOMP/blob/bebee6194c0c5f3963b15cbbf56ebc10dd83ccf6/LICENSE), referenced docs and example all exist in the verified commit tree. GitHub currently has **no published OOMP releases**; no PyPI availability is advertised. See the [releases page](https://github.com/hamzah105/OOMP/releases).

The website recommends cloning `main` then checking out the reviewed commit, with separate PowerShell and POSIX command blocks. This resolves the README's historical feature-branch advice through the current packaging, CLI and source example. Reviewed docs are pinned to the same commit; a separately labeled moving `main` link and source history remain available. The optional local profile commands are kept behind a native disclosure and clearly describe foreground services and owner-reviewed configuration.

The Phase 1 fresh disposable Windows Python 3.11.4 installation is reused because the commit, extras and commands are unchanged; a second dependency installation would add no new evidence. In this phase its `oomp --version` and `examples/quickstart.py` were rerun successfully: version 0.1.0, schema 6, 13 synthetic events, the earlier project outside the recent eight events, source `early-project`, a 727-byte evidence packet within a 3000-byte budget, zero model calls, and persistence after reopening. The temporary database is removed afterward. These are example acceptance observations, not benchmark results. [Original fresh-install evidence](oomp-phase1/install-check.json) and the Phase 3 source checks document the boundaries.

Core OOMP requires neither TRACE nor MongoDB. No personal profiles, credentials, services, real conversations or local MCP endpoints were used. The website links to the upstream read-only memory inspection guide rather than publishing private profile paths or automatically running diagnostics against an existing store. POSIX commands were checked against the source and Python conventions; Linux/macOS execution and Python 3.12 installation were not independently performed here.

Persistent source events, derived memories, source attribution, optional local extraction/embeddings, bounded retrieval and the external host's final-answer responsibility remain explained in the page. The archive stays outside the model's finite prompt. Research goals are explicitly separated from implemented capabilities. No benchmark result, adoption number, security certification, literal infinite capacity or unsupported novelty claim is displayed. `benchmarkEvidence` is empty; any future result requires a public URL, tested version, conditions and qualification. Release tag and changelog URL fields remain null until genuine references exist. No README HTML is scraped at runtime.

For future content updates, edit `lib/oomp-content.ts`, review the new source commit and commands together, and update version, status, source-review date, limitations and evidence consistently. Update research milestones only with their evidence and appropriate status. Reverify source paths, release availability, install instructions and metadata before approving a later candidate. The stable chapter layout and motion system do not need to change for these content updates.

Metadata now follows the existing site's **apex canonical origin**, `https://indusautomationlabs.com`. Read-only public checks found HTTP apex → HTTPS apex **308**; HTTPS apex and HTTPS www both return **200**, and both HTML pages declare the apex canonical. Thus the Phase 1 OOMP www canonical was corrected; no DNS or global SEO rewrite was needed. New Labs/OOMP titles, descriptions, canonical, OG URL, Twitter card/image and actual 1200×630 PNG dimensions pass browser checks. Important content is server rendered, each route has one H1, and both pages are in the sitemap. Labs art is decorative and hidden from assistive technology; the project text supplies its meaning. No homepage hero/teaser changes were necessary.

The final engineering commands all passed:

```powershell
npm.cmd run lint
npx.cmd tsc --noEmit
npm.cmd run build
```

The final build generates 19 static outputs. See [build.txt](oomp-phase3/build.txt) and [engineering-checks.json](oomp-phase3/engineering-checks.json). The generated TypeScript incremental cache was removed from the review tree. `git diff --check` passes.

**85 production-browser validation groups pass** in installed Chrome 157.0.8103.51 using externally supplied Playwright:

- [36 story checks](oomp-phase3/story/browser-checks.json): hero; five scenes; slow native wheel movement, rapid jumps and reverse progression; source hover/focus/click/touch, clear/Escape; recall; restored scroll; static toggle; responsive fit; observer/listener cleanup across three SPA cycles; no idle animation loop; reduced motion and no-JavaScript scenes; existing routes and both MatterFlux outcomes.
- [35 integration checks](oomp-phase3/integration-checks.json): all 14 requested routes including the four legal pages; exactly two Labs projects; deep-route active states; mobile menu closure/Escape; code copying through keyboard and actual clipboard equality (normalizing Windows CRLF); announced success; denied-clipboard selection/focus fallback; direct section URLs; native setup disclosures without JavaScript; image/SEO/sitemap checks; local ZIP/PDF downloads; contact preview with no POST; coming-soon login.
- [14 final-build checks](oomp-phase3/final-smoke.json): both MatterFlux outcomes after the last copy correction; all five scenes individually at 1280×720 and 1280×900; 430×932 → 932×430 → 360×800 resizing; inspector below the graph and no main-content overflow.

The story suite was reused from Phase 2 and adapted for the verified canonical and Phase 3 output folder; historical evidence was not overwritten. A 6px decorative Labs orbit overflow at 320px was corrected and rechecked. Phone graph targets measure 111×73–89px and source targets 94×52px. Labels/source IDs were enlarged while keeping the inspector outside the canvas. Runtime, hydration, console and unexpected network error arrays are empty.

The current evidence is linked here:

| Evidence | Local artifact |
| --- | --- |
| Labs directory, desktop / phone | [Desktop](oomp-phase3/labs-desktop.png), [phone](oomp-phase3/labs-mobile.png) |
| Phone constellation at 320 / 360 / 430px | [320px](oomp-phase3/graph-320px.png), [360px](oomp-phase3/graph-360px.png), [430px](oomp-phase3/graph-430px.png) |
| Installation with copy controls | [Desktop](oomp-phase3/install-desktop.png), [phone](oomp-phase3/install-mobile.png) |
| Full story and source selection | [Scene 1](oomp-phase3/story/scene-1.png), [scene 2](oomp-phase3/story/scene-2.png), [scene 3](oomp-phase3/story/scene-3.png), [scene 4](oomp-phase3/story/scene-4.png), [scene 5](oomp-phase3/story/scene-5.png), [selected source](oomp-phase3/story/source-selected.png) |
| Compact desktop / host handoff | [720px persistence](oomp-phase3/desktop-720-scene-2.png), [720px recall](oomp-phase3/desktop-720-scene-4.png), [900px host](oomp-phase3/desktop-900-scene-5.png); all ten height/scene captures are in the manifest. |
| Static fallbacks | [Reduced motion](oomp-phase3/story/reduced-motion.png), [no JavaScript](oomp-phase3/story/no-javascript.png) |
| Actual native-wheel recording | [40-frame GIF](oomp-phase3/scroll-progression.gif), [capture data](oomp-phase3/scroll-capture.json) |

The GIF contains actual current Chrome captures over 12.56 seconds, with all five scenes and short first/last holds. It is review media stored under `docs`, not a page asset or substitute for the live experience. QA drivers are in `docs/oomp-phase3/qa/`; supply `PLAYWRIGHT_MODULE` externally to run them. No Playwright dependency was added to the app. The broader story run preceded only a MatterFlux wording correction; final smoke verifies that correction and every scene against the last production build.

OOMP route JavaScript is **6.52 kB / 103 kB first load**, versus Phase 2's 6.05 / 102 kB. Labs is **725 bytes / 96.7 kB first load**. The unchanged deferred motion module is **2,784 bytes raw / 1,164 bytes gzip**; cold phone and reduced-motion runs do not request it. `package.json` and `package-lock.json` are byte-identical to the preserved baseline. Existing fonts are reused and no animation framework, dependency upgrade or application analytics was added.

Local, unthrottled story observations were LCP **560ms**, CLS approximately **0.00060**, no recorded >50ms task in that run, and zero idle story scroll listeners/pending frames outside the narrative. The separate scroll recording observed CLS approximately **0.00009**, one **72ms startup task before capture**, and about **12ms cumulative script / 12ms layout time during capture**. Screenshot instrumentation adds overhead. These are local QA observations, not field Core Web Vitals, an FPS test, or an OOMP retrieval benchmark. Global pre-existing star pseudo-elements can expand document screenshot bounds; Labs and OOMP main content fit their tested viewports. Physical-device, dedicated screen-reader, Safari/Firefox and production field-performance testing are not claimed by this Chrome run.

Download verification covers the served MatterFlux ZIP (`PK` signature), prospectus (`%PDF` signature), real MatterFlux public GitHub repository, and OOMP's public repository/tree/docs/license/release/history references. The current AutoChat 1.1.0 installer resolves through GitHub to **HEAD 200**, `application/octet-stream`, 406,266,805 bytes. The existing 0.1.1 installer likewise returns HEAD 200 (406,183,510 bytes), and the pilot-release page returns HEAD 200. Installer binaries were not downloaded or executed. AutoChat, pricing, contact, login and legal content were not edited.

Selected-file review and a scan for common credential/private-key patterns found no sensitive paths or matching secrets. This is a targeted publication check, not a comprehensive security certification. Clipboard copying is initiated by the visitor and copies only visible public setup commands. The fictional graph stays entirely local in UI state; there is no engine, model, database, credential or private conversation connection. React-rendered content is used throughout; no arbitrary HTML injection or runtime GitHub scraping was introduced.

The verified hosting target is the existing Vercel project **`indusautomationlabs/indus-automation-labs-site`**. GitHub deployment **5649328483** is labeled `Production`, reports success at SHA `8e3aeb3a`, and links to [the current deployment](https://indus-automation-labs-site-29vcnlk0l-indusautomationlabs.vercel.app) and [Vercel overview](https://vercel.com/indusautomationlabs/indus-automation-labs-site/66tVYRgFujSdZUDH98oJbGCMYxBN). Its recorded completion time is 28 July 2026, 23:47:11 UTC. The private project settings and production-branch field were not accessible. **`main` is the evidence-backed recommended PR target because the current successful Production SHA equals current remote main; confirm the private setting before publication.** No hosting configuration was changed.

After the founder approves this exact candidate, use this integration sequence:

1. Recheck remote main, the Vercel production-branch setting and the reviewed file checksums. Preserve the original dirty branch and backup.
2. Create a dedicated review branch such as `feature/oomp-launch-review` from freshly fetched production main in a separate clean worktree. If main is still `8e3aeb3a`, its source tree is identical to this implementation's baseline. If it moved, inspect the new diff before copying or resolving anything.
3. Apply only the files in `release-files.json`. Exclude `indus_site_context.md`, environment files, temporary stores and caches. Inspect the staged diff against the manifest, run the relevant checks, then commit the approved website candidate.
4. Push that dedicated branch and open a PR to the confirmed production branch. Inspect the Vercel preview, both new routes, all five scenes, phone layouts, installation links and both MatterFlux outcomes. Preserve existing Vercel audience/settings.
5. Merge only after checks and founder approval. Verify the real public apex and www pages externally, including canonical metadata, links, mobile/story behavior and downloads. A Git push alone is not launch acceptance.
6. Only after successful deployment, update `indus_site_context.md` with the real website commit SHA, deployment date and external verification evidence. Do not invent those values in advance.

Rollback should preserve history. Before merging, retain the current successful Vercel deployment above. If the new deployment fails, an authorized owner can promote that prior deployment to restore the known production site, verify existing routes/MatterFlux/AutoChat downloads, and then revert the reviewed release commit through a normal PR to the production branch. Do not reset or force-push main. This website change has no database migration or engine state to reverse. Review-media and source backups remain available for correction.

The release candidate is prepared for review. **Stopped at the requested founder-review gate before commit, push, merge and deployment.**
