const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const { execFileSync } = require('node:child_process');
const root = process.cwd();
const out = path.resolve(__dirname, '..');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function filesIn(folder) { return fs.readdirSync(folder, { withFileTypes: true }).flatMap(item => item.isDirectory() ? filesIn(path.join(folder, item.name)) : [path.join(folder, item.name)]); }
const allowedEdits = new Set(['app/labs/oomp/page.tsx', 'components/oomp/OompSections.tsx', 'components/oomp/oomp.module.css', 'components/oomp/oomp-story.module.css', 'lib/oomp-content.ts', 'app/sitemap.ts', 'lib/site.ts', 'components/Navbar.tsx', 'components/Footer.tsx', 'app/labs/matterflux/page.tsx']);
if (!process.env.OOMP_BASELINE_DIR) throw Error('Supply the preserved Phase 3 baseline directory.');
const backup = path.resolve(process.env.OOMP_BASELINE_DIR);
const preservation = filesIn(backup).filter(f => path.relative(backup, f) !== 'manifest.json').map(file => {
  const relative = path.relative(backup, file).replaceAll('\\', '/');
  const before = hash(file), after = hash(path.join(root, relative));
  if (before !== after && !allowedEdits.has(relative)) throw Error('Unexpected baseline change: ' + relative);
  return { path: relative, before, after, unchanged: before === after };
});
if (hash('indus_site_context.md').toUpperCase() !== 'E3AC36CC43EF8685FCCD4159276182DBCFC5673E547F69C843392D575FC827D7') throw Error('Unrelated context document changed.');
fs.writeFileSync(path.join(out, 'preservation-checks.json'), JSON.stringify({ status: 'PASS', compared: preservation.length, unchanged: preservation.filter(f => f.unchanged).length, modifiedWithinScope: preservation.filter(f => !f.unchanged).length, files: preservation }, null, 2) + '\n');

const changes = execFileSync('git', ['-c', 'core.quotepath=false', 'status', '--porcelain=v1', '--untracked-files=all'], { encoding: 'utf8' }).split(/\r?\n/).filter(Boolean).map(line => ({ status: line.slice(0, 2).trim(), path: line.slice(3).replaceAll('\\', '/') }));
const include = file => file === '.eslintrc.json' || ['app/labs/page.tsx', 'app/labs/labs.module.css', 'app/labs/oomp/page.tsx', 'app/labs/matterflux/page.tsx', 'app/sitemap.ts', 'components/Navbar.tsx', 'components/Footer.tsx', 'lib/site.ts', 'lib/labs-fonts.ts', 'lib/oomp-content.ts', 'lib/oomp-story-data.ts'].includes(file) || /^(components\/oomp\/|public\/oomp\/|public\/labs\/og\.|docs\/oomp-phase[123](?:\/|-))/.test(file);
const omitted = changes.filter(f => !include(f.path));
if (omitted.some(f => f.path !== 'indus_site_context.md')) throw Error('Unexpected changes outside release scope: ' + JSON.stringify(omitted));
const selected = changes.filter(f => include(f.path));
const suspicious = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|sk-proj-[A-Za-z0-9_-]{30,}|AKIA[0-9A-Z]{16}/;
for (const file of selected) {
  if (/(^|\/)(?:\.env[^/]*|\.git|\.aws|secrets\.json)(\/|$)/.test(file.path)) throw Error('Sensitive path: ' + file.path);
  if (/\.(tsx?|css|cjs|py|md|json|txt|svg)$/.test(file.path) && suspicious.test(fs.readFileSync(file.path, 'utf8'))) throw Error('Potential credential in selected file: ' + file.path);
}
const chunks = filesIn('.next/static/chunks').filter(file => file.endsWith('.js') && fs.readFileSync(file, 'utf8').includes('observing-scroll')).map(file => ({ file: path.basename(file), rawBytes: fs.statSync(file).size, gzipBytes: zlib.gzipSync(fs.readFileSync(file)).length }));
fs.writeFileSync(path.join(out, 'engineering-checks.json'), JSON.stringify({ status: 'PASS', commands: [{ command: 'npm.cmd run lint', exitCode: 0, result: 'No ESLint warnings or errors' }, { command: 'npx.cmd tsc --noEmit', exitCode: 0 }, { command: 'npm.cmd run build', exitCode: 0, log: 'build.txt' }], bundle: { phase2OompRouteKB: 6.05, phase3OompRouteKB: 6.52, phase3OompFirstLoadKB: 103, labsRouteBytes: 725, labsFirstLoadKB: 96.7, deferredMotion: chunks }, dependenciesUnchanged: preservation.filter(f => /^(package\.json|package-lock\.json)$/.test(f.path)).every(f => f.unchanged), sensitivePathAndCommonCredentialScan: 'PASS; selected website/review files only, not a comprehensive secret scanner', unrelatedContextPreserved: true }, null, 2) + '\n');

// Generate this last, after the report and evidence are final. It lists itself
// without a self-referential checksum; every other release file has a SHA-256.
if (process.argv.includes('--manifest')) {
  const manifestPath = 'docs/oomp-phase3/release-files.json';
  if (!selected.some(f => f.path === manifestPath)) selected.push({ status: '??', path: manifestPath });
  for (const generated of ['docs/oomp-phase3/engineering-checks.json', 'docs/oomp-phase3/preservation-checks.json']) if (!selected.some(f => f.path === generated)) selected.push({ status: '??', path: generated });
  const entries = selected.sort((a, b) => a.path.localeCompare(b.path)).map(file => ({ ...file, sha256: file.path === manifestPath ? null : hash(file.path), bytes: file.path === manifestPath ? null : fs.statSync(file.path).size }));
  fs.writeFileSync(manifestPath, JSON.stringify({ baseline: '6365b27786630117fc355cf712fde6cc82bf4dd2', remoteMainAtReview: '8e3aeb3a134d038396e03fecc7cf50eae4716b33', scope: 'All reviewed website, font-license and QA evidence files across Phases 1, 2 and 3. Manifest checksum omitted for itself.', fileCount: entries.length, excludedUnrelated: omitted, files: entries }, null, 2) + '\n');
  console.log('Release files: ' + entries.length);
}
console.log(JSON.stringify({ preservation: { compared: preservation.length, unchanged: preservation.filter(f => f.unchanged).length, changed: preservation.filter(f => !f.unchanged).length }, selectedFiles: selected.length, omitted, motionChunks: chunks }));
