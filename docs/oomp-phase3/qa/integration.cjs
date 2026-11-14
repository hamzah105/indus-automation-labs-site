const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
const origin = 'https://indusautomationlabs.com';
const out = path.resolve(__dirname, '..');
const report = { build: 'production', browser: 'Installed Chrome via externally supplied Playwright', checks: [], runtimeErrors: [], consoleErrors: [], failedRequests: [] };
function pass(name, detail = true) { report.checks.push({ name, detail }); console.log('PASS ' + name); }
async function metadata(page, route) {
  const value = await page.evaluate(() => ({ title: document.title, description: document.querySelector('meta[name=description]')?.content, canonical: document.querySelector('link[rel=canonical]')?.href, og: document.querySelector('meta[property="og:url"]')?.content, image: document.querySelector('meta[property="og:image"]')?.content, width: document.querySelector('meta[property="og:image:width"]')?.content, height: document.querySelector('meta[property="og:image:height"]')?.content, twitter: document.querySelector('meta[name="twitter:card"]')?.content, twitterImage: document.querySelector('meta[name="twitter:image"]')?.content, h1: [...document.querySelectorAll('h1')].map(e => e.textContent) }));
  assert.equal(value.canonical, origin + route); assert.equal(value.og, value.canonical);
  assert.equal(value.width, '1200'); assert.equal(value.height, '630'); assert.equal(value.twitter, 'summary_large_image');
  assert.equal(value.twitterImage, value.image); assert(value.description.length > 80); assert.equal(value.h1.length, 1);
  const image = await page.request.get(base + new URL(value.image).pathname); assert.equal(image.status(), 200);
  const bytes = await image.body(); assert.equal(bytes.toString('hex', 0, 8), '89504e470d0a1a0a');
  assert.equal(bytes.readUInt32BE(16), 1200); assert.equal(bytes.readUInt32BE(20), 630);
  pass('Canonical, social metadata, H1 and actual 1200×630 OG image ' + route, value);
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
    context.on('page', page => {
      page.on('pageerror', e => report.runtimeErrors.push(e.message));
      page.on('console', m => { if (m.type() === 'error') report.consoleErrors.push(m.text()); });
      page.on('requestfailed', r => { if (r.failure()?.errorText !== 'net::ERR_ABORTED') report.failedRequests.push({ url: r.url(), error: r.failure()?.errorText }); });
    });
    const page = await context.newPage();
    for (const route of ['/', '/labs', '/labs/oomp', '/labs/matterflux', '/products', '/products/autochat', '/pricing', '/about', '/contact', '/login', '/terms', '/privacy', '/refund-policy', '/acceptable-use']) {
      assert.equal((await page.goto(base + route)).status(), 200);
      assert.equal(await page.locator('h1').count(), 1);
      if (route.startsWith('/labs')) {
        const link = page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Labs', exact: true });
        assert.equal(await link.getAttribute('href'), '/labs');
        assert.equal(await link.getAttribute('aria-current'), route === '/labs' ? 'page' : 'location');
      }
      pass('Route and navigation ' + route, { heading: await page.locator('h1').innerText() });
    }
    await page.goto(base + '/labs');
    await metadata(page, '/labs');
    const labsMain = page.locator('main');
    assert.equal(await labsMain.locator('article').count(), 2);
    assert.equal(await labsMain.getByRole('link', { name: 'Explore MatterFlux', exact: true }).getAttribute('href'), '/labs/matterflux');
    await labsMain.getByRole('link', { name: 'Discover OOMP', exact: true }).click(); await page.waitForURL('**/labs/oomp');
    pass('Labs has exactly two projects; OOMP discovery link navigates');
    await metadata(page, '/labs/oomp');
    const sourceLinks = await page.locator('main a[href^="https://github.com/"]').evaluateAll(es => [...new Set(es.map(e => e.href))]);
    assert(sourceLinks.some(h => h.includes('/docs/memory-inspection.md')));
    assert(sourceLinks.some(h => h.includes('/examples/quickstart.py')));
    assert(sourceLinks.some(h => h.endsWith('/tree/main')));
    assert(sourceLinks.some(h => h.endsWith('/releases')));
    pass('Crawlable source, inspection, quickstart, latest-main and release references', sourceLinks);
    for (const label of ['Windows setup commands', 'POSIX setup commands', 'Optional Windows profile commands']) {
      const code = page.getByLabel(label + ', horizontally scrollable', { exact: true });
      const details = code.locator('xpath=ancestor::details');
      if (await details.count()) await details.locator('summary').click();
      const button = page.getByRole('button', { name: 'Copy ' + label, exact: true });
      await page.keyboard.press('Tab');
      await button.focus(); assert.notEqual(await button.evaluate(e => getComputedStyle(e).outlineStyle), 'none');
      await page.keyboard.press('Enter');
      const expected = await code.innerText();
      const clipboard = await page.evaluate(() => navigator.clipboard.readText());
      assert.equal(clipboard.replace(/\r\n/g, '\n'), expected);
      await page.getByRole('status').filter({ hasText: label + ' copied.' }).waitFor();
      const box = await button.boundingBox(); assert(box.width >= 44 && box.height >= 44);
      pass('Keyboard copy, clipboard equality, announced success and touch target: ' + label);
    }
    await page.locator('#get-started').screenshot({ path: path.join(out, 'install-desktop.png') });
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('QA: denied')) } }));
    await page.getByRole('button', { name: 'Copy Windows setup commands', exact: true }).click();
    await page.getByRole('status').filter({ hasText: 'Automatic copy is unavailable.' }).waitFor();
    assert((await page.evaluate(() => window.getSelection().toString())).includes('git checkout bebee6194c0c5f3963b15cbbf56ebc10dd83ccf6'));
    assert.equal(await page.locator(':focus').getAttribute('aria-label'), 'Windows setup commands, horizontally scrollable');
    pass('Denied clipboard selects visible commands, focuses code and announces manual copy');

    for (const width of [320, 360, 430, 768, 1024]) {
      await page.setViewportSize({ width, height: 850 });
      for (const route of ['/labs', '/labs/oomp']) {
        await page.goto(base + route); await page.evaluate(() => document.fonts.ready);
        const dimensions = await page.locator('main').evaluate(e => ({ width: e.clientWidth, scroll: e.scrollWidth }));
        assert.equal(dimensions.scroll, dimensions.width, route + ' content overflow at ' + width);
        const menu = page.getByRole('button', { name: 'Open navigation', exact: true });
        await menu.click();
        const labs = page.locator('#mobile-navigation').getByRole('link', { name: 'Labs', exact: true });
        assert.equal(await labs.getAttribute('aria-current'), route === '/labs' ? 'page' : 'location');
        await page.keyboard.press('Escape'); assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        await menu.click(); await page.locator('#mobile-navigation').getByRole('link', { name: 'Labs', exact: true }).click();
        await page.waitForURL('**/labs'); assert.equal(await page.locator('#mobile-navigation').count(), 0);
      }
      pass('Content fit, mobile Labs active state, Escape and menu-link close ' + width + 'px');
    }
    await page.setViewportSize({ width: 360, height: 850 });
    await page.goto(base + '/labs/oomp#get-started');
    await page.getByRole('button', { name: 'Copy Windows setup commands', exact: true }).waitFor();
    await page.locator('#get-started').screenshot({ path: path.join(out, 'install-mobile.png') });
    for (const id of ['overview', 'architecture', 'get-started', 'capabilities', 'research-vision']) {
      await page.goto(base + '/labs');
      await page.goto(base + '/labs/oomp#' + id);
      assert(await page.locator('#' + id).isVisible());
      await page.waitForFunction(id => { const top = document.getElementById(id).getBoundingClientRect().top; return top >= 60 && top < 200; }, id);
      const top = await page.locator('#' + id).evaluate(e => e.getBoundingClientRect().top);
      assert(top >= 60 && top < 200, id + ' direct anchor obscured or not reached: ' + top);
    }
    pass('Direct section URLs clear the sticky navigation');
    await page.goto(base + '/contact');
    await page.getByLabel('Name', { exact: true }).fill('Fictional QA');
    await page.getByLabel('Email', { exact: true }).fill('fictional@example.com');
    await page.getByLabel('Message', { exact: true }).fill('Fictional local preview validation.');
    let posts = 0; page.on('request', r => { if (r.method() === 'POST') posts++; });
    await page.getByRole('button', { name: 'Send inquiry' }).click();
    assert((await page.getByRole('status').innerText()).includes('Please email'));
    assert.equal(posts, 0); pass('Contact stays a local preview and sends no request');
    await page.goto(base + '/login'); assert((await page.locator('main').innerText()).includes('coming soon'));
    assert.equal(await page.locator('input[type=password]').count(), 0); pass('Login remains coming soon');
    for (const [url, signature] of [['/downloads/matterflux-v0.1.0.zip', 'PK'], ['/AutoChat_Prospectus.pdf', '%PDF']]) {
      const response = await page.request.get(base + url); assert.equal(response.status(), 200);
      assert.equal((await response.body()).subarray(0, signature.length).toString(), signature);
      pass('Actual local download ' + url);
    }
    const sitemap = await (await page.request.get(base + '/sitemap.xml')).text();
    assert(sitemap.includes('<loc>' + origin + '/labs</loc>')); assert(sitemap.includes('<loc>' + origin + '/labs/oomp</loc>'));
    assert(!sitemap.includes('https://www.')); pass('Sitemap uses the existing canonical origin for all entries');

    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 850 } });
    const staticPage = await noJS.newPage();
    await staticPage.goto(base + '/labs'); assert.equal(await staticPage.locator('main article').count(), 2);
    await staticPage.goto(base + '/labs/oomp#get-started');
    assert((await staticPage.locator('#get-started').innerText()).includes('git checkout bebee6194c0c5f3963b15cbbf56ebc10dd83ccf6'));
    assert.equal(await staticPage.getByRole('button', { name: /^Copy / }).count(), 0);
    await staticPage.locator('summary').filter({ hasText: 'POSIX shell equivalent' }).focus();
    await staticPage.keyboard.press('Enter');
    assert(await staticPage.getByLabel('POSIX setup commands, horizontally scrollable', { exact: true }).isVisible());
    pass('Labs, install commands and native setup details remain usable without JavaScript');
    assert.deepEqual(report.runtimeErrors, []); assert.deepEqual(report.consoleErrors, []); assert.deepEqual(report.failedRequests, []);
    pass('Zero runtime, hydration, console and unexpected request errors');
    report.status = 'PASS';
  } catch (error) { report.status = 'FAIL'; report.failure = error.stack; process.exitCode = 1; console.error(error); }
  finally { fs.writeFileSync(path.join(out, 'integration-checks.json'), JSON.stringify(report, null, 2) + '\n'); await browser.close(); }
})();
