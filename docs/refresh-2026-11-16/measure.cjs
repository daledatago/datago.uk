/*
 * Measures the built site against ACCEPTANCE.md.
 *   node measure.cjs site  http://localhost:3210   (variables not set)
 *   node measure.cjs form  http://localhost:3210   (dummy variables set at build)
 * PLAYWRIGHT_PATH points at a Playwright install; it is not a dependency of the site.
 */
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const fs = require('fs');
const path = require('path');
const MODE = process.argv[2] || 'site';
const BASE = process.argv[3] || 'http://localhost:3210';
const OUT = path.join(__dirname, 'raw') + '/'; /* raw/ is not committed; the chosen images are copied to after/ */
fs.mkdirSync(OUT, { recursive: true });
const MSG = 'We bring trusted data foundations, practical governance and AI together to help organisations make better decisions and improve how they work.';
const SERVICES = ['practical-ai-applications', 'analytics-decision-support', 'governance-assurance', 'data-platforms-integration', 'secure-production-delivery'];
const PAGES = { home: '/', ...Object.fromEntries(SERVICES.map((s, i) => ['service-' + (i + 1), '/services/' + s])), bridgly: '/bridgly', about: '/about', contact: '/contact', privacy: '/privacy', terms: '/terms', accessibility: '/accessibility' };
const SHOTS = new Set(['home', 'service-1', 'service-2', 'bridgly', 'about', 'contact', 'accessibility']);

const pageFn = () => {
  const lum = c => { const a = c.map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4) }); return .2126 * a[0] + .7152 * a[1] + .0722 * a[2] };
  const parse = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[, /]+/).map(Number); return { c: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 } };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05) };
  const bgOf = el => { let e = el; while (e) { const p = parse(getComputedStyle(e).backgroundColor); if (p && p.a >= .99) return p.c; e = e.parentElement } return [255, 255, 255] };
  const vis = el => { const r = el.getBoundingClientRect(), cs = getComputedStyle(el); return r.width > 1 && r.height > 1 && cs.visibility !== 'hidden' && cs.display !== 'none' && !el.closest('[hidden],.vh,.hp,.skip') };
  const fails = []; let min = 99, minFont = 99, n = 0;
  const scan = () => { for (const el of document.querySelectorAll('body *')) {
    if (el.dataset.scanned) continue;
    if (![...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim())) continue;
    if (!vis(el) || ['OPTION', 'SCRIPT', 'NOSCRIPT', 'STYLE'].includes(el.tagName)) continue;
    el.dataset.scanned = 1;
    const cs = getComputedStyle(el), fg = parse(cs.color).c, bg = bgOf(el), r = ratio(fg, bg), fs = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
    const need = (fs >= 24 || (fs >= 18.66 && bold)) ? 3 : 4.5; n++; min = Math.min(min, r); minFont = Math.min(minFont, fs);
    if (r < need) fails.push(el.tagName + '.' + el.className + ' ' + r.toFixed(2) + ' "' + el.textContent.trim().slice(0, 30) + '"');
  } };
  const small = new Set();
  const targets = () => [...document.querySelectorAll('a,button,input,select,textarea')].filter(vis).forEach(e => { const r = e.getBoundingClientRect(); const inline = e.tagName === 'A' && getComputedStyle(e).display === 'inline'; if (!inline && (r.width < 24 || r.height < 24)) small.add(e.tagName + ' ' + e.textContent.trim().slice(0, 20)) });
  scan(); targets();
  const tabs = [...document.querySelectorAll('[role=tab]')]; const panelsVisibleEach = [];
  tabs.forEach(t => { t.click(); scan(); targets(); panelsVisibleEach.push(document.querySelectorAll('[role=tabpanel]:not([hidden])').length) });
  if (tabs[0]) tabs[0].click();
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => +h.tagName[1]); let skips = 0; for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skips++;
  const inp = document.getElementById('f-name'), ics = inp && getComputedStyle(inp);
  const txt = document.body.innerText, low = txt.toLowerCase();
  const count = re => (txt.match(re) || []).length;
  /* elements whose own text (not a child's) carries a statutory detail; scripts are not page text */
  const stat = e => [...e.childNodes].some(c => c.nodeType === 3 && /14751587|Registered office|RG14/.test(c.textContent));
  const leaf = [...document.querySelectorAll('body *')].filter(e => !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(e.tagName) && stat(e));
  const acc = document.getElementById('accelerators');
  const pes = [...document.querySelectorAll('p')].filter(p => /proven at enterprise scale/i.test(p.textContent));
  const rootCs = getComputedStyle(document.documentElement);
  const hex = s => { let v = s.trim().slice(1); if (v.length === 3) v = v.replace(/./g, c => c + c); return [0, 2, 4].map(i => parseInt(v.slice(i, i + 2), 16)) };
  const h1 = document.querySelector('h1');
  return {
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, textEls: n, contrastFails: fails, minRatio: +min.toFixed(2), minFont,
    h1: hs.filter(x => x === 1).length, h1Text: h1 ? h1.textContent.trim().replace(/\s+/g, ' ') : '', headings: hs.join(''), skips, smallTargets: [...small],
    fieldBorderVsField: inp ? +ratio(parse(ics.borderTopColor).c, parse(ics.backgroundColor).c).toFixed(2) : null,
    fieldBorderVsForm: inp ? +ratio(parse(ics.borderTopColor).c, bgOf(inp.parentElement)).toFixed(2) : null,
    focusVsBg: +ratio(hex(rootCs.getPropertyValue('--focus')), bgOf(document.body)).toFixed(2),
    fonts: ['600 20px Archivo', '400 17px "Public Sans"', '400 13px "Source Code Pro"'].map(f => document.fonts.check(f)),
    fontFamilies: [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/"/g, '')))],
    coNum: count(/14751587/g), coNumFooter: (document.querySelector('footer').innerText.match(/14751587/g) || []).length,
    registeredIn: /Registered in England and Wales/.test(document.querySelector('footer').innerText),
    statutoryEls: leaf.length, statutoryInFirstViewport: leaf.filter(e => e.getBoundingClientRect().top < innerHeight).length,
    statutoryInHeroOrMap: leaf.filter(e => e.closest('.hero,.map,header,.page-head')).length,
    revealHidden: [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity !== '1').length,
    oppDesk: count(/opportunity desk/gi), tenderNames: count(/CITB|Pearson|Zero Waste Scotland/gi), quickAnswers: count(/quick answers|answer-ready/gi),
    hype: (low.match(/ai-powered|revolutionary|unlock|seamless|cutting-edge|world-class|\bleading\b|innovative|transform(?!ation pipelines)/g) || []),
    provenTagged: pes.length ? pes.every(p => /\[CONFIRM/.test(p.textContent)) : 'n/a', provenCount: pes.length,
    accFigures: acc ? (acc.innerText.match(/\d+\s?%|\d+x\b|\d+\s?times/gi) || []) : [],
    tabs: tabs.length, panelsVisibleEach,
    areas: [...document.querySelectorAll('.area')].map(a => a.querySelector('h3').textContent + ':' + [...a.querySelectorAll('h4')].map(h => h.textContent).join('|') + ':' + (a.querySelector('a[href^="/services/"]') ? 'link' : 'nolink')),
    confirmTags: document.querySelectorAll('.confirm').length,
    confirmTexts: [...document.querySelectorAll('.confirm')].map(e => e.textContent),
    mapLabelsMin: Math.min(99, ...[...document.querySelectorAll('.map *')].filter(e => [...e.childNodes].some(c => c.nodeType === 3 && c.textContent.trim())).map(e => parseFloat(getComputedStyle(e).fontSize))),
    svgText: document.querySelectorAll('main svg text').length
  };
};

async function focusWalk(p) {
  await p.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
  await p.evaluate(() => { scrollTo(0, 0); if (document.activeElement) document.activeElement.blur(); });
  const expected = await p.evaluate(() => [...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"]')].filter(e => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return e.tabIndex >= 0 && !e.disabled && !e.closest('[hidden]') && cs.display !== 'none' && cs.visibility !== 'hidden' && (r.width > 0 || e.classList.contains('skip')) }).length);
  let stops = 0; const bad = [], seen = new Set();
  for (let i = 0; i < expected + 5; i++) {
    await p.keyboard.press('Tab'); await p.waitForTimeout(30);
    const f = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; if (!e.dataset.fid) e.dataset.fid = Math.random().toString(36).slice(2); const cs = getComputedStyle(e), r = e.getBoundingClientRect(); return { id: e.dataset.fid, t: e.tagName + ' ' + e.textContent.trim().slice(0, 20), os: cs.outlineStyle, ow: parseFloat(cs.outlineWidth), on: r.bottom > 0 && r.top < innerHeight && r.width > 0 } });
    if (!f || seen.has(f.id)) break; seen.add(f.id); stops++; if (f.os === 'none' || f.ow < 2 || !f.on) bad.push(f);
  }
  return { focusExpected: expected, focusStops: stops, focusBad: bad };
}

async function open(b, url, opts, hooks) {
  const ctx = await b.newContext(opts); const p = await ctx.newPage(); const errs = [], hosts = new Set(), api = [];
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()) }); p.on('pageerror', e => errs.push(String(e)));
  p.on('request', r => { const u = new URL(r.url()); if (u.origin !== new URL(BASE).origin && u.protocol.startsWith('http')) hosts.add(u.host); if (u.pathname === '/api/contact') api.push({ method: r.method(), body: r.postData() }) });
  if (hooks) await hooks(p);
  await p.goto(url, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  return { ctx, p, errs, hosts, api };
}

async function site(b) {
  const R = {};
  for (const pk in PAGES) for (const w of [1440, 390]) for (const theme of ['light', 'dark']) {
    const key = `${pk}-${w}-${theme}`, home = pk === 'home';
    const { ctx, p, errs, hosts, api } = await open(b, BASE + PAGES[pk], { viewport: { width: w, height: w === 1440 ? 900 : 844 }, colorScheme: theme });
    const running = home ? await p.evaluate(() => document.getElementById('map').dataset.running) : null;
    if (SHOTS.has(pk)) await p.screenshot({ path: OUT + `${key}-fold.png` });
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 500) { await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(60) }
    await p.waitForTimeout(1700); await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(200);
    const m = await p.evaluate(pageFn); m.mapRunning = running; m.theme = await p.evaluate(() => document.documentElement.dataset.theme);
    if (SHOTS.has(pk)) await p.screenshot({ path: OUT + `${key}-full.png`, fullPage: true });
    Object.assign(m, await focusWalk(p));
    await p.evaluate(() => scrollTo(0, 0));
    if (home) {
      await p.click('#pause'); await p.waitForTimeout(150); m.runningAfterPause = await p.evaluate(() => document.getElementById('map').dataset.running); await p.click('#pause');
      await p.focus('#r1'); await p.keyboard.press('ArrowDown');
      m.arrow = await p.evaluate(() => ({ focus: document.activeElement.id, selected: document.querySelector('[role=tab][aria-selected=true]').id, visible: [...document.querySelectorAll('[role=tabpanel]:not([hidden])')].map(x => x.id) }));
      await p.keyboard.press('Home');
    }
    if (home || pk === 'contact') {
      m.formState = await p.evaluate(() => { const f = document.getElementById('form'); return { state: f.dataset.state, fields: f.querySelectorAll('input,textarea,select').length, notConnected: /not yet connected/i.test(f.innerText), mailto: !!f.querySelector('a[href^="mailto:"]') } });
      m.apiRequests = api.length;
      await p.locator('#form').scrollIntoViewIfNeeded(); await p.waitForTimeout(700);
      if (pk === 'contact' || w === 1440) await p.locator('#form').screenshot({ path: OUT + `${key}-form-not-connected.png` });
    }
    if (home && w === 1440) {
      await p.addStyleTag({ content: '.header{position:static !important}' });
      for (const id of ['roles', 'work', 'public-sector', 'trust']) { await p.locator('#' + id).scrollIntoViewIfNeeded(); await p.waitForTimeout(800); await p.locator('#' + id).screenshot({ path: OUT + `${key}-${id}.png` }); }
    }
    if (w === 390 && home) { await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await p.click('.menu-btn'); await p.waitForTimeout(150); await p.screenshot({ path: OUT + `${key}-menu.png` }); }
    m.consoleErrors = errs; m.otherHosts = [...hosts]; R[key] = m; await ctx.close();
  }
  for (const pk of ['home', 'service-1']) for (const w of [1440, 390]) {
    const { ctx, p } = await open(b, BASE + PAGES[pk], { viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    R[`reduced-${pk}-${w}`] = await p.evaluate(() => { const map = document.getElementById('map'), pause = document.getElementById('pause'); return { mapRunning: map ? map.dataset.running : 'n/a', animations: document.getAnimations().filter(a => a.playState === 'running').length, revealHidden: [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity !== '1').length, pauseShown: pause ? getComputedStyle(pause).display : 'n/a' } });
    await ctx.close();
  }
  { const { ctx, p } = await open(b, BASE + '/', { viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    R['nojs-home'] = await p.evaluate(() => ({ panelsVisible: [...document.querySelectorAll('[role=tabpanel]')].filter(e => e.getBoundingClientRect().height > 0).length, revealHidden: [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity !== '1').length })); await ctx.close(); }
  /* links */
  { const ids = {}, hrefs = {}, bad = [];
    const ctx = await b.newContext(); const p = await ctx.newPage();
    for (const pk in PAGES) { await p.goto(BASE + PAGES[pk]); ids[PAGES[pk]] = await p.evaluate(() => [...document.querySelectorAll('[id]')].map(e => e.id)); hrefs[PAGES[pk]] = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'))); }
    let checked = 0; const external = new Set();
    for (const from in hrefs) for (const u of new Set(hrefs[from])) {
      if (/^mailto:/.test(u)) continue; if (/^https?:/.test(u)) { external.add(u); continue }
      checked++; const [f, frag] = u.split('#'); const target = f || from;
      if (!ids[target]) { const r = await ctx.request.get(BASE + target, { maxRedirects: 0 }); if (r.status() !== 200) bad.push(from + ' -> ' + u + ' ' + r.status()); continue }
      if (frag && !ids[target].includes(frag)) bad.push(from + ' -> ' + u);
    }
    const redirects = {}; for (const r of ['/approach', '/insights', '/lab', '/company']) { const res = await ctx.request.get(BASE + r, { maxRedirects: 0 }); redirects[r] = res.status() + ' ' + (res.headers()['location'] || ''); }
    const head = await ctx.request.get(BASE + '/'); const api = await ctx.request.post(BASE + '/api/contact', { data: { name: 'Test Person' } });
    R.links = { checked, bad, external: [...external] }; R.redirects = redirects; R.csp = head.headers()['content-security-policy'] || null;
    R.apiUnconfigured = { status: api.status(), body: await api.json() };
    await ctx.close(); }
  R.message = { expected: MSG, match: R['home-1440-light'].h1Text === MSG };
  const all = new Set(); for (const k in R) (R[k].confirmTexts || []).forEach(t => all.add(t)); R.confirmDistinct = [...all].sort();
  return R;
}

async function form(b) {
  const R = {};
  const stub = "window.turnstile={render:function(el,o){el.textContent='[security check: stubbed for this test]';window.__cb=o.callback;setTimeout(function(){o.callback('stub-token')},50);return 'w1'},reset:function(){setTimeout(function(){window.__cb('stub-token')},50)},remove:function(){}};";
  for (const w of [1440, 390]) for (const theme of ['light', 'dark']) {
    const key = `form-${w}-${theme}`; let mode = 'ok';
    const { ctx, p, errs, api } = await open(b, BASE + '/contact', { viewport: { width: w, height: w === 1440 ? 900 : 844 }, colorScheme: theme }, async p => {
      await p.route('https://challenges.cloudflare.com/**', r => r.fulfill({ contentType: 'application/javascript', body: stub }));
      await p.route('**/api/contact', r => mode === 'ok' ? r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }) : r.fulfill({ status: 502, contentType: 'application/json', body: '{"ok":false,"code":"send_failed"}' }));
    });
    const m = await p.evaluate(pageFn); Object.assign(m, await focusWalk(p));
    m.state = await p.evaluate(() => document.getElementById('form').dataset.state);
    await p.click('#form button[type=submit]'); await p.waitForTimeout(150);
    m.emptyErrors = await p.evaluate(() => document.querySelectorAll('#form [aria-invalid="true"]').length); m.emptyFocus = await p.evaluate(() => document.activeElement.id); m.emptyRequests = api.length;
    m.emptyStatus = await p.textContent('#form-status');
    await p.locator('#form').screenshot({ path: OUT + `${key}-errors.png` });
    const e2 = await p.evaluate(pageFn); m.errorStateContrastFails = e2.contrastFails;
    mode = 'fail';
    await p.fill('#f-name', 'Test Person'); await p.fill('#f-email', 'test@example.org'); await p.fill('#f-org', 'Example Council'); await p.fill('#f-msg', 'A test message for the measurement run.');
    await p.click('#form button[type=submit]'); await p.waitForTimeout(400);
    m.failStatus = await p.textContent('#form-status'); m.failHasMailto = await p.evaluate(() => !!document.querySelector('#form-status a[href^="mailto:"]')); m.failKeptMessage = await p.inputValue('#f-msg'); m.failFocus = await p.evaluate(() => document.activeElement.id);
    mode = 'ok'; await p.waitForTimeout(200);
    await p.click('#form button[type=submit]'); await p.waitForTimeout(400);
    m.okStatus = await p.textContent('#form-status'); m.okFocus = await p.evaluate(() => document.activeElement.id); m.okCleared = (await p.inputValue('#f-msg')) === '';
    m.posts = api.filter(a => a.method === 'POST').length; const last = JSON.parse(api[api.length - 1].body);
    m.lastPost = { keys: Object.keys(last).sort(), email: last.email, token: last.turnstileToken, website: last.website, startedAtIsNumber: typeof last.startedAt === 'number' };
    await p.locator('#form').screenshot({ path: OUT + `${key}-sent.png` });
    m.consoleErrors = errs; R[key] = m; await ctx.close();
  }
  return R;
}

(async () => {
  const b = await chromium.launch();
  const R = MODE === 'form' ? await form(b) : await site(b);
  const file = path.join(__dirname, 'measurements.json');
  const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  prev[MODE] = R; fs.writeFileSync(file, JSON.stringify(prev, null, 1));
  for (const k in R) { const m = R[k]; if (!m || m.overflow === undefined) { console.log(k, JSON.stringify(m)); continue }
    console.log(k, JSON.stringify({ ov: m.overflow, els: m.textEls, cf: m.contrastFails, minR: m.minRatio, minF: m.minFont, h1: m.h1, skips: m.skips, small: m.smallTargets, fb: [m.fieldBorderVsField, m.fieldBorderVsForm], fo: m.focusVsBg, fonts: m.fonts, co: [m.coNum, m.coNumFooter, m.registeredIn, m.statutoryInFirstViewport, m.statutoryInHeroOrMap], rev: m.revealHidden, claims: [m.oppDesk, m.tenderNames, m.quickAnswers, m.hype, m.provenCount, m.provenTagged, m.accFigures], tabs: m.tabs, pv: m.panelsVisibleEach, areas: m.areas.length, run: [m.mapRunning, m.runningAfterPause], arrow: m.arrow, focus: [m.focusExpected, m.focusStops, m.focusBad], form: m.formState, api: m.apiRequests, err: m.consoleErrors, hosts: m.otherHosts, theme: m.theme, confirm: m.confirmTags, mapMin: m.mapLabelsMin, svgText: m.svgText,
      f: MODE === 'form' ? { state: m.state, empty: [m.emptyErrors, m.emptyFocus, m.emptyRequests, m.emptyStatus], ecf: m.errorStateContrastFails, fail: [m.failStatus, m.failHasMailto, m.failKeptMessage, m.failFocus], ok: [m.okStatus, m.okFocus, m.okCleared, m.posts, m.lastPost] } : undefined })); }
  await b.close();
})();
