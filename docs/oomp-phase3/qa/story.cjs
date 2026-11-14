const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = 'http://127.0.0.1:3000';
const out = path.resolve('docs/oomp-phase3/story');
fs.mkdirSync(out, { recursive: true });
const report = { browser: 'Installed Chrome, Playwright 1.63.0', build: 'production', checks: [], errors: [], consoleErrors: [], failedRequests: [], navigationAborts: [] };
const record = (name, detail = true) => { report.checks.push({ name, detail }); console.log('PASS ' + name + ': ' + JSON.stringify(detail)); };
const ids = ['the-problem', 'what-oomp-does', 'memory-constellation', 'selective-recall', 'finite-context'];
const chunkDir = '.next/static/chunks';
const motionChunks = fs.readdirSync(chunkDir).filter(f => f.endsWith('.js') && fs.readFileSync(path.join(chunkDir, f), 'utf8').includes('observing-scroll'));

async function instrument(context) {
  context.on('page', p => {
    p.on('pageerror', e => report.errors.push({ url: p.url(), message: e.message }));
    p.on('console', m => { if (m.type() === 'error') report.consoleErrors.push({ url: p.url(), message: m.text() }); });
    p.on('requestfailed', r => {
      const detail = { url: r.url(), reason: r.failure()?.errorText };
      if (detail.reason === 'net::ERR_ABORTED') report.navigationAborts.push(detail);
      else report.failedRequests.push(detail);
    });
  });
  await context.addInitScript(() => {
    const scrollListeners = new Set();
    const sceneListeners = new Set();
    const observers = new Map();
    const sizes = new Map();
    const pending = new Set();
    const data = { cls: 0, lcp: 0, longTasks: [], frameCallbacks: 0 };
    const add = EventTarget.prototype.addEventListener;
    const remove = EventTarget.prototype.removeEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (this === window && type === 'scroll') scrollListeners.add(listener);
      if (type === 'oomp:scenechange') sceneListeners.add(listener);
      return add.call(this, type, listener, options);
    };
    EventTarget.prototype.removeEventListener = function(type, listener, options) {
      if (this === window && type === 'scroll') scrollListeners.delete(listener);
      if (type === 'oomp:scenechange') sceneListeners.delete(listener);
      return remove.call(this, type, listener, options);
    };
    const NativeIO = IntersectionObserver;
    window.IntersectionObserver = class extends NativeIO {
      observe(target) { if (target.id === 'architecture') { if (!observers.has(this)) observers.set(this, new Set()); observers.get(this).add(target); } return super.observe(target); }
      unobserve(target) { observers.get(this)?.delete(target); return super.unobserve(target); }
      disconnect() { observers.delete(this); return super.disconnect(); }
    };
    const NativeRO = ResizeObserver;
    window.ResizeObserver = class extends NativeRO {
      observe(target, options) { if (target.hasAttribute('data-story-rail')) { if (!sizes.has(this)) sizes.set(this, new Set()); sizes.get(this).add(target); } return super.observe(target, options); }
      unobserve(target) { sizes.get(this)?.delete(target); return super.unobserve(target); }
      disconnect() { sizes.delete(this); return super.disconnect(); }
    };
    const raf = window.requestAnimationFrame.bind(window);
    const cancel = window.cancelAnimationFrame.bind(window);
    window.requestAnimationFrame = cb => { const id = raf(t => { pending.delete(id); data.frameCallbacks++; cb(t); }); pending.add(id); return id; };
    window.cancelAnimationFrame = id => { pending.delete(id); return cancel(id); };
    try {
      new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) data.cls += e.value; })).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver(l => l.getEntries().forEach(e => { data.lcp = e.startTime; })).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(l => l.getEntries().forEach(e => data.longTasks.push({ start: e.startTime, duration: e.duration }))).observe({ type: 'longtask', buffered: true });
    } catch (_) {}
    window.__oompQa = () => ({ ...data, pendingRaf: pending.size, windowScrollListeners: scrollListeners.size, sceneListeners: sceneListeners.size, storyObservers: [...observers.values()].reduce((n, s) => n + s.size, 0), storySizeObservers: [...sizes.values()].reduce((n, s) => n + s.size, 0), usedHeap: performance.memory?.usedJSHeapSize });
  });
}

async function settle(p, ms = 680) { await p.waitForTimeout(ms); }
async function go(p, i, fraction = .68) {
  await p.locator('[data-story-chapter]').nth(i).evaluate((e, fraction) => {
    document.documentElement.style.scrollBehavior = 'auto';
    scrollTo(0, scrollY + e.getBoundingClientRect().top + e.getBoundingClientRect().height * fraction - innerHeight * .49);
  }, fraction);
  await p.waitForFunction(i => document.querySelector('#architecture')?.dataset.activeScene === String(i), i);
  await settle(p);
}
async function capture(p, name) { await p.screenshot({ path: path.join(out, name + '.png') }); }
async function inlineFrame(p, i) {
  const frame = p.locator('#' + ids[i] + ' [data-story-stage]');
  await frame.evaluate(e => { document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, scrollY + e.getBoundingClientRect().top - 90); });
  await settle(p);
  return frame;
}
async function nodeGeometry(p, locator) {
  return locator.evaluateAll(nodes => {
    const results = nodes.map(n => {
      const a = n.getBoundingClientRect();
      const c = n.closest('[class*="graphCanvas"]').getBoundingClientRect();
      return { id: n.dataset.memoryNode, x: a.x, y: a.y, right: a.right, bottom: a.bottom, width: a.width, height: a.height, within: a.left >= c.left - 1 && a.right <= c.right + 1 && a.top >= c.top - 1 && a.bottom <= c.bottom + 1, opacity: getComputedStyle(n).opacity };
    });
    const overlaps = [];
    results.forEach((a, i) => results.slice(i + 1).forEach(b => { if (Math.min(a.right, b.right) - Math.max(a.x, b.x) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y) > 1) overlaps.push([a.id, b.id]); }));
    return { nodes: results, overlaps };
  });
}

(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const c = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    await instrument(c);
    const p = await c.newPage();
    assert.equal((await p.goto(base + '/labs/oomp')).status(), 200);
    await p.waitForFunction(() => [...document.querySelectorAll('h1 span[style]')].every(e => getComputedStyle(e).opacity === '1'));
    await settle(p, 3100);
    assert.equal(await p.getByRole('heading', { level: 1, name: 'Introducing OOMP', exact: true }).count(), 1);
    await capture(p, 'desktop-hero');
    record('Phase 1 accessible typewriter hero remains intact');
    const metadata = await p.evaluate(() => ({ title: document.title, canonical: document.querySelector('link[rel=canonical]').href, og: document.querySelector('meta[property="og:url"]').content, image: document.querySelector('meta[property="og:image"]').content }));
    assert.equal(metadata.canonical, 'https://indusautomationlabs.com/labs/oomp');
    assert.equal(metadata.og, metadata.canonical);
    assert.equal(metadata.image, 'https://indusautomationlabs.com/oomp/og.png');
    assert.equal(await p.getByRole('link', { name: 'View on GitHub', exact: true }).getAttribute('href'), 'https://github.com/hamzah105/OOMP');
    record('metadata matches verified apex canonical and GitHub target', metadata);

    for (let i = 0; i < 5; i++) {
      await go(p, i);
      const bounds = await p.locator('[data-desktop-stage]').evaluate(e => ({ top: e.getBoundingClientRect().top, bottom: e.getBoundingClientRect().bottom, viewport: innerHeight }));
      assert(bounds.top >= 72 && bounds.bottom <= bounds.viewport + 1, 'Desktop stage must stay clear of navbar and viewport edge in scene ' + i);
      assert.equal(await p.locator('[data-desktop-stage] [data-story-jump][aria-current=step]').getAttribute('data-story-jump'), String(i));
      await capture(p, 'scene-' + (i + 1));
      record('desktop scene ' + (i + 1), { stage: bounds, progress: await p.locator('[data-desktop-stage] [data-story-stage]').evaluate(e => e.style.getPropertyValue('--scene-progress')) });
    }
    await go(p, 0, .22);
    const before = await p.locator('[data-desktop-stage] [class*=conversationTrack]').evaluate(e => getComputedStyle(e).transform);
    await p.mouse.wheel(0, 130);
    await settle(p);
    const after = await p.locator('[data-desktop-stage] [class*=conversationTrack]').evaluate(e => getComputedStyle(e).transform);
    assert.notEqual(after, before);
    record('native wheel advances the bounded conversation', { before, after });
    for (let i = 4; i >= 0; i--) await go(p, i);
    await go(p, 0, .22);
    assert.equal(await p.locator('[data-desktop-stage] [class*=conversationTrack]').evaluate(e => getComputedStyle(e).transform), before);
    record('five scenes reverse deterministically');
    const boundaries = [];
    for (let i = 0; i < 4; i++) { await go(p, i, .985); boundaries.push(await p.locator('#architecture').getAttribute('data-active-scene')); await go(p, i + 1, .015); boundaries.push(await p.locator('#architecture').getAttribute('data-active-scene')); }
    assert.deepEqual(boundaries, ['0','1','1','2','2','3','3','4']);
    record('scene boundary transitions', boundaries);

    await p.evaluate(() => {
      const chapters = [...document.querySelectorAll('[data-story-chapter]')];
      for (const i of [4, 0, 3, 1, 4, 0, 2]) { const e = chapters[i]; scrollTo(0, scrollY + e.getBoundingClientRect().top + e.getBoundingClientRect().height * .8 - innerHeight * .49); }
    });
    await p.waitForFunction(() => document.querySelector('#architecture').dataset.activeScene === '2');
    await settle(p);
    const desktopNodes = p.locator('[data-desktop-stage] [data-memory-node]');
    const geometry = await nodeGeometry(p, desktopNodes);
    assert(geometry.nodes.every(n => n.within && n.opacity === '1'));
    assert.deepEqual(geometry.overlaps, []);
    record('rapid scroll leaves every graph node visible without overlaps', geometry);
    const project = p.locator('[data-desktop-stage] [data-memory-node=project]');
    await project.hover();
    assert((await p.locator('[data-desktop-stage] [role=region]').innerText()).includes('I’m developing a project called Lumen.'));
    await project.click();
    assert.equal(await project.getAttribute('aria-pressed'), 'true');
    await p.mouse.move(12, 80);
    assert((await p.locator('[data-desktop-stage] [role=region]').innerText()).includes('SELECTED SOURCE'));
    await capture(p, 'source-selected');
    await p.locator('[data-desktop-stage]').getByRole('button', { name: 'Clear selection', exact: true }).click();
    assert.equal(await project.getAttribute('aria-pressed'), 'false');
    const plan = p.locator('[data-desktop-stage] [data-memory-node=plan]');
    await plan.focus();
    assert((await p.locator('[data-desktop-stage] [role=region]').innerText()).includes('planned, not completed'));
    await p.keyboard.press('Enter');
    assert.equal(await plan.getAttribute('aria-pressed'), 'true');
    await p.keyboard.press('Escape');
    assert.equal(await plan.getAttribute('aria-pressed'), 'false');
    for (const node of await desktopNodes.all()) { await node.focus(); assert.notEqual(await node.evaluate(e => getComputedStyle(e).outlineStyle), 'none'); }
    await p.evaluate(() => document.activeElement.blur());
    await p.mouse.move(12, 80);
    record('pointer, keyboard, persistent selection, clear and Escape source inspection');
    await plan.click();
    await p.mouse.move(12,80);
    await go(p, 3);
    assert((await p.locator('[data-desktop-stage] [role=region]').innerText()).includes('Project Lumen'));
    assert.equal(await p.locator('[data-desktop-stage] [data-graph-ready] > div').first().evaluate(e=>e.inert),true);
    await p.locator('[data-desktop-stage] [role=region]').focus();
    await p.keyboard.press('Escape');
    assert((await p.locator('[data-desktop-stage] [role=region]').innerText()).includes('Project Lumen'));
    assert.equal(await p.locator('[data-desktop-stage]').getByRole('button',{name:'Clear selection',exact:true}).count(),0);
    const recall = await desktopNodes.evaluateAll(es => es.map(e => ({ id: e.dataset.memoryNode, match: e.dataset.recallMatch, opacity: Number(getComputedStyle(e).opacity) })));
    assert(recall.filter(n => n.match === 'true').every(n => n.opacity === 1));
    assert(recall.filter(n => n.match !== 'true').every(n => n.opacity > .5 && n.opacity < 1));
    record('recall highlights project/source while unrelated objects remain present', recall);

    await go(p, 2, .65);
    const oldY = await p.evaluate(() => scrollY);
    await p.reload();
    await p.waitForFunction(() => document.querySelector('#architecture')?.dataset.activeScene === '2');
    await p.waitForFunction(y => Math.abs(scrollY - y) < 4, oldY);
    await settle(p);
    assert(Math.abs((await p.evaluate(() => scrollY)) - oldY) < 4);
    record('mid-story reload restores the correct scene', { y: oldY, restored: await p.evaluate(() => scrollY) });
    await p.getByRole('button', { name: 'Use static view', exact: true }).click();
    assert.equal(await p.locator('#architecture').getAttribute('data-layout'), 'static');
    assert.equal(await p.locator('[data-desktop-stage]').evaluate(e => getComputedStyle(e).display), 'none');
    assert.equal(await p.locator('[data-story-chapter] [data-story-stage]:visible').count(), 5);
    await p.getByRole('button', { name: 'Use scroll view', exact: true }).click();
    await p.waitForFunction(() => document.querySelector('#architecture').dataset.layout === 'scroll');
    await go(p, 2);
    assert.equal(await p.locator('[data-story-jump="2"][aria-current=step]').count(), 1);
    record('explicit static view and return to scroll view');

    for (const viewport of [{width:1024,height:768},{width:1280,height:720},{width:1280,height:900}]) {
      await p.setViewportSize(viewport);
      for (const scene of [0,2,3,4]) {
        await go(p, scene);
        const r = await p.locator('[data-desktop-stage] [data-story-stage]').evaluate(e => ({ top: e.getBoundingClientRect().top, bottom: e.getBoundingClientRect().bottom, viewport: innerHeight }));
        assert(r.top >= 72 - 1 && r.bottom <= r.viewport + 1, 'Compact desktop stage outside usable viewport');
        if(scene===2){const g=await nodeGeometry(p,p.locator('[data-desktop-stage] [data-memory-node]'));assert(g.nodes.every(n=>n.within));assert.deepEqual(g.overlaps,[]);}
        if(scene===3){const g=await p.locator('[data-desktop-stage]').evaluate(e=>{const q=e.querySelector('[class*=recallQuestion]').getBoundingClientRect(),n=e.querySelector('[data-memory-node=preference]').getBoundingClientRect(),a=e.querySelector('[class*=recallPacket]').getBoundingClientRect(),b=e.querySelector('[class*=recallBudget]').getBoundingClientRect();return{queryBottom:q.bottom,nodeTop:n.top,packetBottom:a.bottom,budgetTop:b.top}});assert(g.queryBottom<=g.nodeTop+1,JSON.stringify(g));assert(g.packetBottom<=g.budgetTop+1,JSON.stringify(g));}
        if(scene===4){const h=await p.locator('[data-desktop-stage] [class*=modelBoundary]').evaluate(e=>({bottom:e.getBoundingClientRect().bottom,canvasBottom:e.parentElement.getBoundingClientRect().bottom}));assert(h.bottom<=h.canvasBottom+1,JSON.stringify(h));}
      }
      record('compact desktop stages ' + viewport.width + '×' + viewport.height);
    }
    for (const width of [320,360,430,768,834,1023]) {
      await p.setViewportSize({ width, height: 900 });
      await settle(p, 100);
      assert.equal(await p.locator('[data-desktop-stage]').evaluate(e => getComputedStyle(e).display), 'none');
      assert.equal(await p.locator('[data-story-chapter] [data-story-stage]:visible').count(), 5);
      const dimensions = await p.locator('main').evaluate(e => ({ width: e.clientWidth, scroll: e.scrollWidth, story: document.querySelector('#architecture').scrollWidth, storyWidth: document.querySelector('#architecture').clientWidth }));
      assert.equal(dimensions.width, dimensions.scroll);
      assert.equal(dimensions.story, dimensions.storyWidth);
      const graph = p.locator('#memory-constellation [data-memory-node]');
      const g = await nodeGeometry(p, graph);
      assert(g.nodes.every(n => n.within && n.height >= 44));
      assert.deepEqual(g.overlaps, []);
      const host = await p.locator('#finite-context [class*=modelBoundary]').evaluate(e => ({ bottom: e.getBoundingClientRect().bottom, canvasBottom: e.parentElement.getBoundingClientRect().bottom }));
      assert(host.bottom <= host.canvasBottom + 1, 'External host boundary clipped at ' + width);
      const query = p.locator('#selective-recall [class*=recallQuestion]');
      assert(await query.isVisible());
      if ([320,360,430,768].includes(width)) {
        await inlineFrame(p, 2);
        await capture(p, 'graph-' + width + 'px');
      }
      if (width === 360) {
        for (const scene of [0,1,3,4]) { await inlineFrame(p, scene); await capture(p, 'mobile-scene-' + (scene + 1)); }
        await inlineFrame(p, 2);
        const touchNode = p.locator('#memory-constellation [data-memory-node=preference]');
        await touchNode.click();
        assert.equal(await touchNode.getAttribute('aria-pressed'), 'true');
        await capture(p, 'mobile-source-selected');
        await p.locator('#memory-constellation').getByRole('button', { name: 'Clear selection', exact:true }).click();
      }
      record('stacked tablet/mobile ' + width + 'px', { dimensions, nodes: g.nodes.map(n => ({id:n.id,width:n.width,height:n.height})), host });
    }
    await p.setViewportSize({ width:1440, height:1000 });
    await go(p, 2);
    const activeStats = await p.evaluate(() => window.__oompQa());
    await p.locator('#get-started').evaluate(e => scrollTo(0, scrollY + e.getBoundingClientRect().top - 104));
    await settle(p, 300);
    assert.equal(await p.locator('#architecture').getAttribute('data-motion'), 'idle');
    const idleA = await p.evaluate(() => window.__oompQa());
    await settle(p, 500);
    const idleB = await p.evaluate(() => window.__oompQa());
    assert.equal(idleB.windowScrollListeners, 0);
    assert.equal(idleB.pendingRaf, 0);
    assert.equal(idleA.frameCallbacks, idleB.frameCallbacks);
    record('scroll work pauses outside story; no idle animation loop', { active:activeStats, idle:idleB });
    for (let i=0;i<3;i++) {
      await p.getByRole('navigation', {name:'Primary navigation'}).getByRole('link',{name:'Products',exact:true}).click();
      await p.waitForURL('**/products');
      await settle(p,150);
      const clean = await p.evaluate(() => window.__oompQa());
      assert.equal(clean.windowScrollListeners,0);
      assert.equal(clean.storyObservers,0);
      assert.equal(clean.storySizeObservers,0);
      assert.equal(clean.sceneListeners,0);
      await p.goBack();
      await go(p,2);
      const resumed = await p.evaluate(() => window.__oompQa());
      assert.equal(resumed.windowScrollListeners,1);
      assert.equal(resumed.storyObservers,1);
      assert.equal(resumed.storySizeObservers,1);
    }
    record('three SPA navigation cycles clean up observers/listeners and avoid duplicate subscriptions');

    const reducedContext = await b.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
    await instrument(reducedContext);
    const reduced = await reducedContext.newPage();
    await reduced.goto(base+'/labs/oomp');
    await inlineFrame(reduced,2);
    assert.equal(await reduced.locator('[data-story-chapter] [data-story-stage]:visible').count(),5);
    assert.equal(await reduced.locator('[data-desktop-stage]').evaluate(e=>getComputedStyle(e).display),'none');
    const motion = await reduced.locator('#architecture').evaluate(e=>({running:e.getAnimations({subtree:true}).filter(a=>a.playState==='running').length,position:getComputedStyle(e.querySelector('[data-desktop-stage]')).position}));
    assert.equal(motion.running,0);
    const reducedResources = await reduced.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name));
    assert(!motionChunks.some(chunk=>reducedResources.some(r=>r.endsWith(chunk))));
    await capture(reduced,'reduced-motion');
    record('reduced motion: complete static scenes, no choreography or motion chunk',motion);
    for (const width of [1440,360]) {
      const nj = await b.newContext({viewport:{width,height:1000},javaScriptEnabled:false});
      const staticPage = await nj.newPage();
      await staticPage.goto(base+'/labs/oomp');
      assert.equal(await staticPage.locator('[data-story-chapter] [data-story-stage]:visible').count(),5);
      assert.equal(await staticPage.locator('[data-desktop-stage]').evaluate(e=>getComputedStyle(e).display),'none');
      await staticPage.locator('#memory-constellation summary').click();
      assert.equal(await staticPage.locator('#memory-constellation details').evaluate(e=>e.open),true);
      assert((await staticPage.locator('#memory-constellation details').innerText()).includes('I’m developing a project called Lumen.'));
      assert((await staticPage.locator('#get-started pre').first().textContent()).includes('bebee6194c0c5f3963b15cbbf56ebc10dd83ccf6'));
      await inlineFrame(staticPage,2);
      if(width===1440) await capture(staticPage,'no-javascript');
      record('no-JavaScript source details and five static diagrams '+width+'px');
    }
    const mobileColdContext = await b.newContext({viewport:{width:360,height:800},isMobile:true,hasTouch:true});
    await instrument(mobileColdContext);
    const mobileCold = await mobileColdContext.newPage();
    await mobileCold.goto(base+'/labs/oomp');
    await inlineFrame(mobileCold,2);
    await mobileCold.locator('#memory-constellation [data-memory-node=project]').tap();
    assert.equal(await mobileCold.locator('#memory-constellation [data-memory-node=project]').getAttribute('aria-pressed'),'true');
    const mobileResources=await mobileCold.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name));
    assert(!motionChunks.some(chunk=>mobileResources.some(r=>r.endsWith(chunk))));
    record('touch selection works without loading desktop motion module');

    for (const route of ['/', '/products/autochat', '/labs/matterflux']) {
      const response = await p.goto(base+route);
      assert.equal(response.status(),200);
      record('existing route '+route,{status:response.status(),heading:await p.locator('h1').innerText()});
    }
    await p.locator('#matterflux-demo').getByRole('button',{name:'Run Success Demo',exact:true}).click();
    await p.getByText('Success transition completed.',{exact:true}).waitFor();
    await p.locator('#matterflux-demo').getByRole('button',{name:'Run Failure Demo',exact:true}).click();
    await p.getByText('Failure transition completed; normal interaction restored.',{exact:true}).waitFor();
    record('MatterFlux success and failure demos');
    const zip=await p.request.get(base+'/downloads/matterflux-v0.1.0.zip');
    assert.equal(zip.status(),200); assert.equal((await zip.body()).subarray(0,2).toString(),'PK');
    const html=await (await p.request.get(base+'/labs/oomp')).text();
    assert(html.includes('Illustrative demo — fictional data'));
    assert(!html.includes("World's first infinite context")&&!html.includes('World&#x27;s first infinite context'));
    const sitemap=await (await p.request.get(base+'/sitemap.xml')).text();
    assert(sitemap.includes('https://indusautomationlabs.com/labs/oomp'));
    record('fictional-data labeling, alpha-claim boundaries, sitemap and server rendering');
    assert.deepEqual(report.errors,[]);
    assert.deepEqual(report.consoleErrors,[]);
    assert.deepEqual(report.failedRequests,[]);
    record('zero runtime, hydration, console or unexpected network errors');
    report.status='PASS';
  } catch(e) { report.status='FAIL';report.failure=e.stack;process.exitCode=1;console.error(e); }
  finally { fs.writeFileSync(path.join(out,'browser-checks.json'),JSON.stringify(report,null,2)+'\n');await b.close(); }
})();

