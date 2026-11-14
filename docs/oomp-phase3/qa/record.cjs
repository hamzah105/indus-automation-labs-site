const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.join(require('node:os').tmpdir(),'oomp-phase3-scroll-frames');
fs.mkdirSync(root,{recursive:true});
(async()=>{
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const page = await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
    window.__recordMetrics={cls:0,longTasks:[]};
    try {
      new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__recordMetrics.cls+=e.value})).observe({type:'layout-shift',buffered:true});
      new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__recordMetrics.longTasks.push({start:e.startTime,duration:e.duration}))).observe({type:'longtask',buffered:true});
    }catch(_){}
  });
  await page.goto('http://127.0.0.1:3000/labs/oomp');
  await page.locator('[data-story-chapter]').first().evaluate(e=>{
    document.documentElement.style.scrollBehavior='auto';
    scrollTo(0,scrollY+e.getBoundingClientRect().top+e.clientHeight*.12-innerHeight*.49);
  });
  await page.waitForFunction(()=>document.querySelector('#architecture').dataset.activeScene==='0');
  await page.waitForTimeout(700);
  const distance = await page.locator('[data-story-chapter]').last().evaluate(e=>scrollY+e.getBoundingClientRect().top+e.clientHeight*.74-innerHeight*.49-scrollY);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Performance.enable');
  await cdp.send('HeapProfiler.enable');
  await cdp.send('HeapProfiler.collectGarbage');
  const first=(await cdp.send('Performance.getMetrics')).metrics;
  const samples=[];
  for(let i=0;i<39;i++){
    if(i)await page.mouse.wheel(0,distance/38);
    await page.waitForTimeout(130);
    await page.screenshot({path:path.join(root,String(i).padStart(3,'0')+'.png')});
    samples.push(await page.evaluate(()=>({y:scrollY,scene:document.querySelector('#architecture').dataset.activeScene,progress:document.querySelector('[data-desktop-stage] [data-story-stage]').style.getPropertyValue('--scene-progress'),time:performance.now(),nodes:document.querySelector('#architecture').querySelectorAll('*').length})));
  }
  await page.waitForTimeout(700);
  await page.screenshot({path:path.join(root,'039.png')});
  const last=(await cdp.send('Performance.getMetrics')).metrics;
  const get=(items,n)=>items.find(m=>m.name===n)?.value;
  const delta={};
  for(const n of ['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration','LayoutCount','RecalcStyleCount'])delta[n]=get(last,n)-get(first,n);
  const metrics=await page.evaluate(()=>window.__recordMetrics);
  const heap={before:get(first,'JSHeapUsedSize'),after:get(last,'JSHeapUsedSize')};
  const scenes=[...new Set(samples.map(s=>s.scene))];
  const result={method:'Actual Chrome viewport captures during native mouse-wheel scrolling; GIF is review evidence, not UI media',viewport:{width:1280,height:900},frames:40,scenes,samples,metrics,delta,heap,errors};
  fs.writeFileSync('docs/oomp-phase3/scroll-capture.json',JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify({frames:40,scenes,metrics,delta,heap,errors,frameDirectory:root}));
  await browser.close();
  if(errors.length||scenes.join(',')!=='0,1,2,3,4')process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});

