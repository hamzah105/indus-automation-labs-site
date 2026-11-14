// QA tooling only; Playwright is supplied externally, not an app dependency.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
const path = require('node:path');
const out = path.resolve(__dirname, '..');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + '/labs');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(out, 'labs-desktop.png'), fullPage: true });
    console.log('Labs desktop:', await page.title());
    if (process.env.GENERATE_OG === '1') {
      await page.setViewportSize({ width: 1200, height: 630 });
      await page.goto(base + '/labs/og.svg');
      await page.screenshot({ path: path.resolve('public/labs/og.png') });
    }
    for (const width of [320, 360, 430]) {
      await page.setViewportSize({ width, height: 850 });
      await page.goto(base + '/labs/oomp#memory-constellation');
      const frame = page.locator('#memory-constellation [data-story-stage]');
      await frame.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await frame.screenshot({ path: path.join(out, `graph-${width}px.png`) });
      console.log(JSON.stringify(await page.locator('#memory-constellation [data-memory-node]').evaluateAll(nodes => nodes.map(node => {
        const r = node.getBoundingClientRect();
        const canvas = node.closest('[class*="graphCanvas"]').getBoundingClientRect();
        return { id: node.dataset.memoryNode, width: r.width, height: r.height, within: r.left >= canvas.left - 1 && r.right <= canvas.right + 1 && r.top >= canvas.top && r.bottom <= canvas.bottom, labelFont: getComputedStyle(node.querySelector('strong')).fontSize };
      }))));
      if (width === 360) {
        await page.goto(base + '/labs');
        await page.screenshot({ path: path.join(out, 'labs-mobile.png'), fullPage: true });
      }
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
