// Browser QA: Chromium + WebKit at 1512×982, 1024×768, 390×844 (+ reduced motion).
// Requires a running server (node scripts/serve.mjs 4173) and playwright installed
// (pass its location via NODE_PATH or run from a folder that has it).
// Run: node scripts/qa-browser.mjs [baseURL]
import { createRequire } from "node:module";
const require = createRequire(process.env.PLAYWRIGHT_DIR || import.meta.url);
const { chromium, webkit } = require("playwright");

const BASE = process.argv[2] || "http://localhost:4173";
const PAGES = ["/", "/book/", "/learn/", "/whats-on/", "/festival/", "/about/", "/contact/", "/learn-to-dance-bollywood/", "/learn-to-dance-bollywood/lesson-1-step-touch/"];
const SIZES = [
  { name: "desktop", width: 1512, height: 982 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "phone", width: 390, height: 844 },
];

let pass = 0, fail = 0;
const failures = [];
function check(name, ok, detail = "") {
  if (ok) pass++;
  else { fail++; failures.push(`${name}${detail ? " — " + detail : ""}`); }
}

for (const [engineName, engine] of [["chromium", chromium], ["webkit", webkit]]) {
  const browser = await engine.launch();
  for (const size of SIZES) {
    const ctx = await browser.newContext({ viewport: { width: size.width, height: size.height }, deviceScaleFactor: 2 });
    for (const path of PAGES) {
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", e => errors.push(String(e)));
      page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
      try {
        await page.goto(BASE + path, { waitUntil: "load", timeout: 45000 });
        await page.waitForTimeout(700);
        // scroll through to trigger scenes; then measure overflow
        await page.evaluate(async () => {
          const step = innerHeight;
          for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
            window.scrollTo({ top: y, behavior: "instant" });
            await new Promise(r => setTimeout(r, 60));
          }
          window.scrollTo({ top: 0, behavior: "instant" });
        });
        await page.waitForTimeout(1600); // let capped stagger chains finish
        const metrics = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - innerWidth,
          hiddenFx: [...document.querySelectorAll("[data-scene].is-on .fx")].filter(el => getComputedStyle(el).opacity === "0").length,
          brokenImgs: [...document.images].filter(i => i.getAttribute("src") && i.complete && i.naturalWidth === 0 && !i.src.startsWith("data:")).length,
          // v4.4 (Codex F-06.1): every visible interactive control needs a
          // ≥43×43px hit box (padded box). Links flowing inside a sentence
          // (display:inline within a text block) use the WCAG inline
          // exception — they carry an enlarged invisible hit area instead.
          tinyTargets: (() => {
            const wasOpen = [...document.querySelectorAll("details")].map(d => d.open);
            document.querySelectorAll("details").forEach(d => { d.open = true; });
            const bad = [...document.querySelectorAll("a, button, summary")].filter(el => {
              const r = el.getBoundingClientRect();
              if (r.width === 0 || r.height === 0) return false;
              const cs = getComputedStyle(el);
              if (cs.visibility === "hidden" || cs.display === "inline") return false;
              return r.height < 43 || r.width < 43;
            }).map(el => `${el.tagName}:${(el.textContent || "").trim().slice(0, 24)}`);
            [...document.querySelectorAll("details")].forEach((d, i) => { d.open = wasOpen[i]; });
            return bad;
          })(),
          // A decorative element absolutely parked over a control makes it
          // unreadable and often unclickable. The festival date stamp covered
          // 77% of the "Edition Five" button at 1512x760 and swallowed the
          // click. elementFromPoint is the honest test: whatever is on top at
          // the control's centre must BE the control.
          buriedControls: (() => {
            const bad = [];
            for (const el of document.querySelectorAll("a, button, summary")) {
              const r = el.getBoundingClientRect();
              if (r.width < 8 || r.height < 8) continue;
              if (r.bottom < 0 || r.top > innerHeight) continue;      // off screen
              const cs = getComputedStyle(el);
              if (cs.visibility === "hidden" || Number(cs.opacity) < 0.1) continue;
              const x = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1);
              const y = Math.min(Math.max(r.top + r.height / 2, 1), innerHeight - 1);
              const top = document.elementFromPoint(x, y);
              if (!top) continue;
              if (top === el || el.contains(top) || top.contains(el)) continue;
              bad.push(`${(el.textContent || "").trim().slice(0, 18)} < ${top.className || top.tagName}`);
            }
            return [...new Set(bad)];
          })(),
          distortedImgs: [...document.images].filter(i => {
            if (!i.complete || !i.naturalWidth) return false;
            const r = i.getBoundingClientRect();
            if (r.width < 8 || r.height < 8) return false;
            const fit = getComputedStyle(i).objectFit;
            if (fit === "cover" || fit === "contain") return false;
            const natural = i.naturalWidth / i.naturalHeight;
            const rendered = r.width / r.height;
            return Math.abs(natural - rendered) / natural > 0.03;
          }).map(i => i.src.split("/").pop()).length,
        }));
        const tag = `${engineName}/${size.name} ${path}`;
        check(`${tag}: no console/page errors`, errors.length === 0, errors[0]);
        check(`${tag}: no horizontal overflow`, metrics.overflow <= 1, `${metrics.overflow}px`);
        check(`${tag}: no stuck-hidden elements`, metrics.hiddenFx === 0, `${metrics.hiddenFx}`);
        check(`${tag}: no broken images`, metrics.brokenImgs === 0, `${metrics.brokenImgs}`);
        check(`${tag}: no stretched images`, metrics.distortedImgs === 0, `${metrics.distortedImgs}`);
        check(`${tag}: no controls buried under decoration`, metrics.buriedControls.length === 0, metrics.buriedControls.slice(0, 3).join(" · "));
        if (size.name === "phone") {
          check(`${tag}: touch targets ≥ 43px`, metrics.tinyTargets.length === 0, metrics.tinyTargets.slice(0, 4).join(" · "));
        }
      } catch (e) {
        check(`${engineName}/${size.name} ${path}: loads`, false, String(e).slice(0, 120));
      }
      await page.close();
    }

    // navigation model: ≥1101px shows the persistent header nav (hamburger hidden);
    // <1101px shows the hamburger fullscreen menu.
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "load", timeout: 45000 });
    if (size.width >= 1101) {
      const nav = await page.evaluate(() => {
        const n = document.querySelector(".header-nav");
        const links = n ? [...n.querySelectorAll("a")] : [];
        const btnHidden = getComputedStyle(document.querySelector(".menu-button")).display === "none";
        return { visible: n && getComputedStyle(n).display !== "none", count: links.length, btnHidden };
      });
      check(`${engineName}/${size.name}: persistent nav visible (6 links)`, nav.visible && nav.count === 6 && nav.btnHidden, `visible=${nav.visible} count=${nav.count} btnHidden=${nav.btnHidden}`);
    } else {
      await page.click(".menu-button");
      await page.waitForTimeout(600);
      const openState = await page.evaluate(() => ({
        open: document.querySelector(".site-menu").classList.contains("is-open"),
        focusInMenu: !!document.activeElement?.closest(".site-menu"),
      }));
      check(`${engineName}/${size.name}: menu opens + focus enters`, openState.open && openState.focusInMenu);
      await page.keyboard.press("Escape");
      await page.waitForTimeout(400);
      const closedState = await page.evaluate(() => ({
        closed: !document.querySelector(".site-menu").classList.contains("is-open"),
        focusReturned: document.activeElement?.classList.contains("menu-button"),
      }));
      check(`${engineName}/${size.name}: Escape closes + focus returns`, closedState.closed && closedState.focusReturned);
    }
    await page.close();
    await ctx.close();
  }

  // v6: copy that sits on a --night ground must resolve to a light colour.
  // .crane-copy shipped inheriting --ink and rendered near-black on near-black.
  // Narrow and literal on purpose: a general contrast sweep can't tell what is
  // actually behind glyphs on a page layered with scrims and transformed rigs.
  const NIGHT_COPY = [".crane-copy", ".crane-copy h2", ".gather-copy", ".finale-ask", ".finale-ask h2", ".cap"];
  const ctCtx = await browser.newContext({ viewport: { width: 1512, height: 982 } });
  const ct = await ctCtx.newPage();
  await ct.goto(BASE + "/", { waitUntil: "load", timeout: 45000 });
  await ct.waitForTimeout(900);
  const dark = await ct.evaluate((sels) => {
    // Resolve through a canvas: computed colours come back as oklch() in these
    // engines, and hand-parsing the channels as rgb reads 0.98 lightness as a
    // red channel of 0.98/255. Let the browser do the conversion.
    const cv = document.createElement("canvas"); cv.width = cv.height = 1;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    const luminance = (css) => {
      cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillRect(0, 0, 1, 1);
      cx.fillStyle = css; cx.fillRect(0, 0, 1, 1);
      const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
      const lin = v => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    };
    return sels.map(sel => {
      const el = document.querySelector(sel);
      if (!el) return { sel, ok: false, why: "missing" };
      const L = luminance(getComputedStyle(el).color);
      return { sel, ok: L > 0.25, why: `luminance ${L.toFixed(3)}` };
    });
  }, NIGHT_COPY);
  const tooDark = dark.filter(d => !d.ok);
  check(`${engineName}: night-ground copy is light`, tooDark.length === 0, tooDark.map(d => `${d.sel} (${d.why})`).join(", "));
  await ctCtx.close();

  // reduced motion — complete still composition + paused film
  const rmCtx = await browser.newContext({ viewport: { width: 1512, height: 982 }, reducedMotion: "reduce" });
  const rm = await rmCtx.newPage();
  await rm.goto(BASE + "/", { waitUntil: "load", timeout: 45000 });
  await rm.waitForTimeout(800);
  const rmState = await rm.evaluate(() => ({
    reduceClass: document.documentElement.classList.contains("reduce"),
    videoPaused: document.querySelector("video").paused,
    hiddenAnywhere: [...document.querySelectorAll(".fx, .mask-line > span, .solo")].filter(el => getComputedStyle(el).opacity === "0").length,
    // v6: the statement now rolls through a masked window. Under reduced motion
    // the window must open up so ALL four lines are present and readable.
    linesLit: document.querySelectorAll(".cap").length === 4 && [...document.querySelectorAll(".cap")].every(l => {
      const r = l.getBoundingClientRect();
      return Number(getComputedStyle(l).opacity) >= 0.5 && r.height > 0 && r.width > 0;
    }),
  }));
  check(`${engineName}: reduced-motion class applied`, rmState.reduceClass);
  check(`${engineName}: reduced-motion pauses film`, rmState.videoPaused);
  check(`${engineName}: reduced-motion shows everything`, rmState.hiddenAnywhere === 0, `${rmState.hiddenAnywhere} hidden`);
  check(`${engineName}: all four statement lines readable`, rmState.linesLit);
  await rmCtx.close();

  // v4 guard: with NO JavaScript at all, every key content block must be
  // visible immediately — content may never depend on choreography.
  const njCtx = await browser.newContext({ viewport: { width: 1512, height: 982 }, javaScriptEnabled: false });
  const NJ_CHECKS = [
    ["/", [".cap", ".crane-floor img", ".date-list a", ".postcard-strip", ".line-up span", ".finale-ask h2"]],
    ["/learn/", ["#classes .class-cell h3", "#trial", ".inner-hero h1"]],
    ["/whats-on/", [".agenda-feature", ".event-detail summary", "#past-events summary"]],
    ["/book/", ["#productions", "#offers .card", ".inner-hero-visual img"]],
    ["/festival/", ["#edition-five", ".gallery .frame", ".edition-card", ".reel-stills img"]],
    ["/contact/", [".contact-options", "#refunds summary"]],
  ];
  for (const [path, selectors] of NJ_CHECKS) {
    const nj = await njCtx.newPage();
    await nj.goto(BASE + path, { waitUntil: "load", timeout: 45000 });
    const visible = await nj.evaluate((sels) => sels.map(sel => {
      const el = document.querySelector(sel);
      if (!el) return { sel, ok: false, why: "missing" };
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      // "visible" means legible, not opaque — several elements (dancer names,
      // captions) are intentionally dimmed as part of the design
      const ok = cs.visibility !== "hidden" && Number(cs.opacity) >= 0.5 && r.width > 0 && r.height > 0;
      return { sel, ok, why: ok ? "" : `opacity ${cs.opacity} ${Math.round(r.width)}×${Math.round(r.height)}` };
    }), selectors);
    const bad = visible.filter(v => !v.ok);
    check(`${engineName}: no-JS content visible ${path}`, bad.length === 0, bad.map(b => `${b.sel} (${b.why})`).join(", "));
    await nj.close();
  }
  await njCtx.close();

  // deep link opens archive chain
  const dlCtx = await browser.newContext({ viewport: { width: 1512, height: 982 } });
  const dl = await dlCtx.newPage();
  await dl.goto(BASE + "/whats-on/#kalbeliya-the-soul-of-rajasthan-with-swapnil", { waitUntil: "load", timeout: 45000 });
  await dl.waitForTimeout(800);
  const dlState = await dl.evaluate(() => ({
    eventOpen: document.getElementById("kalbeliya-the-soul-of-rajasthan-with-swapnil")?.open === true,
    shellOpen: document.getElementById("past-events")?.open === true,
  }));
  check(`${engineName}: deep link opens event`, dlState.eventOpen && dlState.shellOpen);
  await dlCtx.close();

  await browser.close();
}

console.log(`\nPASS ${pass} · FAIL ${fail}`);
if (fail) { console.log(failures.map(f => "  ✗ " + f).join("\n")); process.exit(1); }
