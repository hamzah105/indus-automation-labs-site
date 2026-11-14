const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
const out = path.resolve(__dirname, '..');
const report = { build: 'final production build', checks: [], errors: [], consoleErrors: [] };
function pass(name, detail) { report.checks.push({ name, detail }); console.log('PASS ' + name); }
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    report.browser = await browser.version();
    page.on('pageerror', e => report.errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') report.consoleErrors.push(m.text()); });
    await page.goto(base + '/labs/matterflux');
    assert((await page.locator('main').innerText()).includes('public GitHub repository'));
    await page.locator('#matterflux-demo').getByRole('button', { name: 'Run Success Demo', exact: true }).click();
    await page.getByText('Success transition completed.', { exact: true }).waitFor();
    await page.locator('#matterflux-demo').getByRole('button', { name: 'Run Failure Demo', exact: true }).click();
    await page.getByText('Failure transition completed; normal interaction restored.', { exact: true }).waitFor();
    pass('MatterFlux final-build source copy and both demo outcomes', true);
    await page.goto(base + '/labs/oomp');
    for (const height of [720, 900]) {
      await page.setViewportSize({ width: 1280, height });
      for (let i = 0; i < 5; i++) {
        await page.locator('[data-story-chapter]').nth(i).evaluate(e => {
          document.documentElement.style.scrollBehavior = 'auto';
          scrollTo(0, scrollY + e.getBoundingClientRect().top + e.getBoundingClientRect().height * .7 - innerHeight * .49);
        });
        await page.waitForFunction(i => document.querySelector('#architecture').dataset.activeScene === String(i), i);
        await page.waitForTimeout(500);
        const frame = page.locator('[data-desktop-stage]');
        const geometry = await frame.evaluate(e => ({ top: e.getBoundingClientRect().top, bottom: e.getBoundingClientRect().bottom, height: innerHeight }));
        assert(geometry.top >= 72 && geometry.bottom <= height + 1);
        await page.screenshot({ path: path.join(out, `desktop-${height}-scene-${i + 1}.png`) });
        pass(`Every scene fits final desktop viewport: ${height}px / scene ${i + 1}`, geometry);
      }
    }
    for (const viewport of [{ width: 430, height: 932 }, { width: 932, height: 430 }, { width: 360, height: 800 }]) {
      await page.setViewportSize(viewport);
      const graph = page.locator('#memory-constellation [data-graph-ready]');
      await graph.scrollIntoViewIfNeeded();
      const geometry = await graph.evaluate(e => {
        const canvas = e.querySelector('[class*="graphCanvas"]').getBoundingClientRect();
        const inspector = e.querySelector('[role=region]').getBoundingClientRect();
        const node = e.querySelector('[data-memory-node=project]');
        return { canvasBottom: canvas.bottom, inspectorTop: inspector.top, labelFont: getComputedStyle(node.querySelector('strong')).fontSize, categoryFont: getComputedStyle(node.querySelector('[class*=nodeCategory]')).fontSize, sourceFont: getComputedStyle(node.querySelector('[class*=nodeSource]')).fontSize, mainWidth: document.querySelector('main').clientWidth, mainScroll: document.querySelector('main').scrollWidth };
      });
      assert(geometry.inspectorTop >= geometry.canvasBottom - 1);
      assert.equal(geometry.mainWidth, geometry.mainScroll);
      assert.equal(geometry.labelFont, '12px');
      pass('Portrait/landscape resize keeps inspector below graph ' + viewport.width + '×' + viewport.height, geometry);
    }
    assert.deepEqual(report.errors, []); assert.deepEqual(report.consoleErrors, []);
    report.status = 'PASS';
  } catch (error) { report.status = 'FAIL'; report.failure = error.stack; console.error(error); process.exitCode = 1; }
  finally { fs.writeFileSync(path.join(out, 'final-smoke.json'), JSON.stringify(report, null, 2) + '\n'); await browser.close(); }
})();
