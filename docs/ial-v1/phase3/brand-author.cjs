// Faithful, deterministic derivatives of the founder-supplied official artwork.
// The SVG was manually traced in original image coordinates; no AI recreation.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto'), http = require('node:http');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const source = path.resolve('766072071_1829140668458152_6728250225232666006_n (1).webp');
const output = path.resolve('public/ial-v1/brand');
const expected = '8352eff6e1e2def1dfb2c773a4254ec0baa529c601b25054f7895c35bb90eeb1';
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
if (hash(source) !== expected) throw Error('Unexpected official source artwork');
const mark = fs.readFileSync(path.join(output, 'mark.svg'), 'utf8');
const compact = mark.replace(/stroke-width="4"/g, 'stroke-width="11"').replace(/stroke-width="2\.2"/g, 'stroke-width="5"');
const inside = compact.slice(compact.indexOf('>') + 1, compact.lastIndexOf('</svg>')).replace(/<title[^>]*>[\s\S]*?<\/title>/, '');
const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="ial-icon-title"><title id="ial-icon-title">Indus Automation Labs</title><rect width="64" height="64" rx="12" fill="#110b1c"/><svg x="4" y="3" width="56" height="58" viewBox="240 180 1120 1240" fill="none">' + inside + '</svg></svg>\n';
fs.writeFileSync(path.join(output, 'favicon.svg'), icon.replace(/[ \t]+$/gm, ''));
const server = http.createServer((req, res) => {
  const name = new URL(req.url, 'http://localhost').pathname.slice(1);
  if (name === 'source.webp') { res.setHeader('Content-Type', 'image/webp'); res.end(fs.readFileSync(source)); }
  else if (['mark.svg', 'favicon.svg'].includes(name)) { res.setHeader('Content-Type', 'image/svg+xml'); res.end(fs.readFileSync(path.join(output, name))); }
  else { res.setHeader('Content-Type', 'text/html'); res.end('<!doctype html><html><body style="margin:0"><canvas></canvas></body></html>'); }
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage(); await page.goto(origin);
    for (const item of [
      { name: 'mark-96.png', width: 96, svg: 'mark.svg' },
      { name: 'favicon-16.png', width: 16, svg: 'favicon.svg' },
      { name: 'favicon-32.png', width: 32, svg: 'favicon.svg' },
      { name: 'favicon-48.png', width: 48, svg: 'favicon.svg' },
      { name: 'apple-touch-icon.png', width: 180, svg: 'favicon.svg', opaque: true }
    ]) {
      const data = await page.evaluate(async ({ item, origin }) => {
        const img = new Image(); img.src = origin + '/' + item.svg; await img.decode();
        const canvas = document.querySelector('canvas'); canvas.width = item.width; canvas.height = item.width;
        const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, item.width, item.width);
        if (item.opaque) { ctx.fillStyle = '#110b1c'; ctx.fillRect(0, 0, item.width, item.width); }
        ctx.drawImage(img, 0, 0, item.width, item.width);
        return canvas.toDataURL('image/png').split(',')[1];
      }, { item, origin });
      fs.writeFileSync(path.join(output, item.name), Buffer.from(data, 'base64'));
    }
    // Full original background is retained; no crop or segmentation is used.
    for (const width of [480, 960]) {
      const artwork = await page.evaluate(async ({ origin, width }) => {
        const img = new Image(); img.src = origin + '/source.webp'; await img.decode();
        const canvas = document.querySelector('canvas'); canvas.width = width; canvas.height = width;
        canvas.getContext('2d').drawImage(img, 0, 0, width, width);
        return canvas.toDataURL('image/webp', .88).split(',')[1];
      }, { origin, width });
      fs.writeFileSync(path.join(output, `artwork-${width}.webp`), Buffer.from(artwork, 'base64'));
    }
    const sizes = [16, 32, 40, 44, 64];
    const proof = `<!doctype html><html><meta charset="utf-8"><body style="margin:0;background:#08070f;color:#f4eaff;font:16px system-ui;padding:30px"><h1 style="font-size:28px;font-weight:500">Official IAL brand derivative review</h1><p>Original artwork / transparent geometric trace. Actual-size icon checks below.</p><div style="display:flex;gap:24px"><figure style="margin:0"><img src="${origin}/source.webp" width="440" height="440"><figcaption>Founder original, uncropped</figcaption></figure><figure style="margin:0"><div style="background:#0d0917;width:440px;height:440px;display:grid;place-items:center"><img src="${origin}/mark.svg" width="350" height="390"></div><figcaption>Faithful traced mark, background excluded</figcaption></figure></div><div style="display:flex;gap:16px;margin-top:30px">${sizes.map(s=>`<div style="padding:16px;border:1px solid #77568e;min-width:110px"><div style="height:75px"><img src="${origin}/mark.svg" width="${s}" height="${s}"></div><span>${s}px mark</span></div>`).join('')}</div><div style="display:flex;gap:16px;margin-top:20px">${sizes.map(s=>`<div style="padding:16px;background:#f4f0fa;color:#21152f;min-width:110px"><div style="height:75px"><img src="${origin}/favicon.svg" width="${s}" height="${s}"></div><span>${s}px icon</span></div>`).join('')}</div></body></html>`;
    await page.setViewportSize({ width: 1000, height: 970 }); await page.setContent(proof); await page.evaluate(() => Promise.all([...document.images].map(i => i.decode())));
    await page.screenshot({ path: path.resolve('docs/ial-v1/phase3/brand-proof.png'), fullPage: true });
    if (hash(source) !== expected) throw Error('Original artwork changed');
  } finally { await browser.close(); server.close(); }
  const provenance = {
    date: '2026-11-17', source: { file: path.basename(source), dimensions: [1600, 1600], format: 'RGB opaque WebP', bytes: fs.statSync(source).size, sha256: expected, preserved: true },
    authority: 'Founder-supplied official company artwork; identity and derivative work explicitly requested in the Phase 3 brief.',
    mark: { file: 'mark.svg', method: 'Manual geometric trace of the visible luminous face boundaries in the original 1600px coordinate system.', viewBox: [240, 180, 1120, 1240], approximateArtworkMarkBounds: [298, 218, 1304, 1396], preserved: ['Open hexagonal frame', 'Central A apex and leg angles', 'Crossbar shape', 'Frame breaks', 'Lavender/violet face hierarchy', 'Fine bright edges'], simplified: ['Cosmic raster background', 'Cloud texture', 'Grain and small decorative stars'], reason: 'A transparent vector is legible at normal navigation dimensions without shrinking the entire opaque 1600px background into a small rectangle.' },
    compact: { file: 'favicon.svg', viewBox: [0, 0, 64, 64], placement: 'Same traced mark fitted inside a dark-backed 64px icon, with modest edge strengthening for subpixel legibility.', geometryChanged: false, strokeAdjustment: 'Primary trace edge 4 to 11 source-coordinate units; internal bevel 2.2 to 5. Shape vertices are unchanged.' },
    rasterization: 'Headless Chrome vector rasterization through Canvas 2D. No generative image recreation or automatic segmentation.',
    artwork960: 'Uncropped downsample of the complete original opaque artwork, encoded WebP quality 0.88. Original root file remains unchanged.',
    artwork480: 'Uncropped 480px phone derivative from the same complete original opaque artwork, encoded WebP quality 0.88; same framing as the 960px derivative.',
    reproduction: 'Run docs/ial-v1/phase3/brand-author.cjs with PLAYWRIGHT_MODULE pointing to an external installation; no app dependency.',
    assets: fs.readdirSync(output).filter(n => n !== 'provenance.json').map(name => ({ file: name, bytes: fs.statSync(path.join(output, name)).size, sha256: hash(path.join(output, name)) }))
  };
  fs.writeFileSync(path.join(output, 'provenance.json'), JSON.stringify(provenance, null, 2) + '\n');
  fs.writeFileSync(path.resolve('docs/ial-v1/phase3/brand-provenance.json'), JSON.stringify(provenance, null, 2) + '\n');
  console.log(JSON.stringify({ status: 'PASS', sourcePreserved: true, assets: provenance.assets }));
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
