// Original code-authored social artwork. No reference art or application dependency.
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const server = http.createServer((req, res) => {
  if (req.url === '/space.woff2') { res.setHeader('Content-Type', 'font/woff2'); res.end(fs.readFileSync('public/oomp/fonts/space-grotesk-latin.woff2')); }
  else { res.setHeader('Content-Type', 'text/html'); res.end('<!doctype html><html><body><canvas width="1200" height="630"></canvas></body></html>'); }
});
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage(); await page.goto(origin);
    for (const type of ['products', 'autochat']) {
      const data = await page.evaluate(async ({ origin, type }) => {
        const font = new FontFace('IAL Space', `url(${origin}/space.woff2)`); document.fonts.add(font); await font.load();
        const c = document.querySelector('canvas'), x = c.getContext('2d'); x.fillStyle = type === 'products' ? '#090910' : '#080b12'; x.fillRect(0, 0, 1200, 630);
        x.strokeStyle = '#2c2339'; x.lineWidth = 1;
        if (type === 'products') { for (let i = 0; i < 1200; i += 72) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 630); x.stroke(); } for (let i = 0; i < 630; i += 72) { x.beginPath(); x.moveTo(0, i); x.lineTo(1200, i); x.stroke(); } }
        x.fillStyle = '#baa1d1'; x.font = '13px monospace'; x.fillText(type === 'products' ? 'INDUS AUTOMATION LABS / PRODUCT EXHIBITION' : 'AUTOCHAT / WINDOWS DESKTOP', 65, 65);
        x.fillStyle = '#f5f0ff'; x.font = '68px "IAL Space"'; x.fillText(type === 'products' ? 'Engineering that' : 'From inquiry', 65, 224);
        x.fillStyle = '#bea1dc'; x.fillText(type === 'products' ? 'becomes useful.' : 'to controlled action.', 65, 305);
        if (type === 'products') {
          x.strokeStyle = '#bda0dd'; x.strokeRect(880, 178, 190, 190); x.strokeStyle = '#695178'; x.strokeRect(898, 196, 190, 190); x.strokeRect(916, 214, 190, 190);
          x.fillStyle = '#dec5f4'; x.font = '64px "IAL Space"'; x.fillText('AC', 930, 297);
        } else {
          const names = ['INQUIRY', 'CONTEXT', 'DRAFT', 'HUMAN', 'OUTCOME'];
          x.strokeStyle = '#9471b4'; x.beginPath(); x.moveTo(90, 445); x.lineTo(1090, 445); x.stroke();
          names.forEach((name, i) => { const px = 95 + i * 245; x.fillStyle = i === 3 ? '#c5a1ed' : '#15101e'; x.strokeStyle = '#b292d0'; x.beginPath(); x.arc(px, 445, 20, 0, Math.PI * 2); x.fill(); x.stroke(); x.fillStyle = '#cbb0e3'; x.font = '12px monospace'; x.fillText(name, px - 26, 497); });
        }
        x.fillStyle = '#b5a0ca'; x.font = '18px "IAL Space"'; x.fillText(type === 'products' ? 'Available software. Independent lab experiments.' : 'Useful context. Visible human authorization.', 65, 572);
        return c.toDataURL('image/png').split(',')[1];
      }, { origin, type });
      fs.writeFileSync(path.join('public/ial-v1', type + '-og.png'), Buffer.from(data, 'base64'));
    }
    console.log('Authored products-og.png and autochat-og.png');
  } finally { await browser.close(); server.close(); }
})().catch(e => { console.error(e); server.close(); process.exitCode = 1; });
