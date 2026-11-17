// Reproducible original artwork: compile our procedural renderer and capture it.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const ts = require('typescript');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const source = path.resolve('lib/ial-v1');
const output = path.resolve('public/ial-v1');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'ial-scene-author-'));
fs.mkdirSync(output, { recursive: true });
for (const name of ['galaxy-data', 'galaxy-renderer']) {
  const result = ts.transpileModule(fs.readFileSync(path.join(source, name + '.ts'), 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ES2020 } });
  fs.writeFileSync(path.join(temporary, name + '.js'), result.outputText.replace(/from "\.\/([a-z-]+)"/g, 'from "./$1.js"'));
}
const server = http.createServer((req, res) => {
  const name = (req.url || '/').slice(1);
  if (name === 'space.woff2' || name === 'inter.woff2') { res.setHeader('Content-Type', 'font/woff2'); res.end(fs.readFileSync(path.resolve('public/oomp/fonts', name === 'space.woff2' ? 'space-grotesk-latin.woff2' : 'inter-latin.woff2'))); return; }
  if (name === 'galaxy-desktop.webp') { res.setHeader('Content-Type', 'image/webp'); res.end(fs.readFileSync(path.join(output, name))); return; }
  if (['galaxy-data.js', 'galaxy-renderer.js'].includes(name)) { res.setHeader('Content-Type', 'application/javascript'); res.end(fs.readFileSync(path.join(temporary, name))); }
  else { res.setHeader('Content-Type', 'text/html'); res.end('<!doctype html><html><body style="margin:0;background:#05040c"><canvas style="width:100vw;height:100vh;display:block"></canvas></body></html>'); }
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    for (const item of [{ name: 'galaxy-desktop', width: 1440, height: 560, mobile: false, count: 22000 }, { name: 'galaxy-mobile', width: 780, height: 600, mobile: true, count: 6800 }]) {
      await page.setViewportSize({ width: item.width, height: item.height });
      await page.goto(base);
      const data = await page.evaluate(async ({ item, base }) => {
        const { createGalaxyRenderer } = await import(base + '/galaxy-renderer.js');
        const canvas = document.querySelector('canvas');
        const renderer = createGalaxyRenderer(canvas, item.count, item.mobile);
        renderer.resize(item.width, item.height, 1);
        renderer.render({ time: 0, formation: 1, reveal: 1, scroll: 0, pointerX: 0, pointerY: 0 });
        const result = canvas.toDataURL('image/webp', .88).split(',')[1];
        renderer.dispose();
        return result;
      }, { item, base });
      fs.writeFileSync(path.join(output, item.name + '.webp'), Buffer.from(data, 'base64'));
      console.log(JSON.stringify({ name: item.name, bytes: fs.statSync(path.join(output, item.name + '.webp')).size, particles: item.count }));
    }
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.goto(base);
    const og = await page.evaluate(async base => {
      const font = new FontFace('IAL Space', `url(${base}/space.woff2)`); document.fonts.add(font); await font.load();
      const image = new Image(); image.src = base + '/galaxy-desktop.webp'; await image.decode();
      const canvas = document.querySelector('canvas'); canvas.width = 1200; canvas.height = 630;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#05040c'; ctx.fillRect(0, 0, 1200, 630);
      ctx.drawImage(image, 0, -10, 1200, 467);
      ctx.fillStyle = '#bc9de1'; ctx.font = '12px monospace'; ctx.fillText('INDUS AUTOMATION LABS / GENESIS', 65, 43);
      ctx.fillStyle = '#f5f0ff'; ctx.font = '48px "IAL Space"'; ctx.fillText('Introducing IAL 1.0', 65, 522);
      ctx.fillStyle = '#c4b5dc'; ctx.font = '23px "IAL Space"'; ctx.fillText('Building intelligence for the real world.', 65, 566);
      ctx.fillStyle = '#9987ad'; ctx.font = '11px monospace'; ctx.fillText('IAL 1.0 / WEBSITE EDITION', 65, 607);
      return canvas.toDataURL('image/png').split(',')[1];
    }, base);
    fs.writeFileSync(path.join(output, 'og.png'), Buffer.from(og, 'base64'));
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
