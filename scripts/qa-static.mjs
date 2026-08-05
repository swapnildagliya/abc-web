// Static parity + fact QA for the Fable 5 Motion Concept.
// Run: node scripts/qa-static.mjs
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
let pass = 0, fail = 0;
const failures = [];
function check(name, ok, detail = "") {
  if (ok) { pass++; }
  else { fail++; failures.push(`${name}${detail ? " — " + detail : ""}`); }
}

/* ---------- route inventory ---------- */
function walkRoutes(dir = ROOT, base = "") {
  let out = [];
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    if (["assets", "checkpoints", "scripts", "src", "node_modules", ".claude", "exports"].includes(d.name)) continue;
    const rel = base ? `${base}/${d.name}` : d.name;
    if (existsSync(join(dir, d.name, "index.html"))) out.push(rel);
    out = out.concat(walkRoutes(join(dir, d.name), rel));
  }
  return out;
}
const routes = walkRoutes();
const fullPages = routes.filter(r => !readFileSync(join(ROOT, r, "index.html"), "utf8").includes('http-equiv="refresh"'));
const stubs = routes.filter(r => readFileSync(join(ROOT, r, "index.html"), "utf8").includes('http-equiv="refresh"'));
check("18 full pages (17 route dirs + homepage)", fullPages.length === 17, `got ${fullPages.length}: ${fullPages.join(", ")}`);
check("80 redirect stubs", stubs.length === 80, `got ${stubs.length}`);
check("homepage exists", existsSync(join(ROOT, "index.html")));
check("404.html exists", existsSync(join(ROOT, "404.html")));
check("404 uses root-absolute assets", readFileSync(join(ROOT, "404.html"), "utf8").includes('href="/assets/'));
check("_redirects has 80 lines", readFileSync(join(ROOT, "_redirects"), "utf8").trim().split("\n").length === 80);
check("robots.txt present", readFileSync(join(ROOT, "robots.txt"), "utf8").includes("sitemap.xml"));
check("sitemap has 18 URLs", (readFileSync(join(ROOT, "sitemap.xml"), "utf8").match(/<loc>/g) || []).length === 18);
check("43 calendar files", readdirSync(join(ROOT, "abc-calendar")).filter(f => f.endsWith(".ics")).length === 43);

/* ---------- page-level checks ---------- */
const pages = ["index.html", ...fullPages.map(r => `${r}/index.html`)];
const bannedImages = ["dansen-in-t-park-2026.jpg", "dokfeesten-2026.jpg", "dance-yoga-summer-retreat-2026.jpg", "opening-party.jpg"];
for (const p of pages) {
  const html = readFileSync(join(ROOT, p), "utf8");
  const name = p.replace("/index.html", "") || "home";
  check(`${name}: canonical`, /rel="canonical" href="https:\/\/www\.abcbollywoodbelgium\.com\//.test(html));
  check(`${name}: og + twitter meta`, html.includes('property="og:image"') && html.includes('name="twitter:card"'));
  check(`${name}: Organization schema`, html.includes('"@type":"Organization"'));
  check(`${name}: founding year 2017`, html.includes('"foundingDate":"2017"'));
  check(`${name}: no mailto`, !html.includes("mailto:"));
  check(`${name}: no raw email`, !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(html.replace(/[a-z]+@keyframes/g, "").replace(/@media|@font-face|@import/g, "")));
  check(`${name}: no absolute local paths`, !html.includes("/Users/"));
  check(`${name}: no misleading 2016 founding`, !/since 2016|founded.*2016/i.test(html));
  for (const banned of bannedImages) check(`${name}: excluded image ${banned} not used`, !html.includes(banned));
  // intrinsic dimensions on local imgs
  const imgs = [...html.matchAll(/<img [^>]*>/g)].map(m => m[0]).filter(t => !t.includes("http"));
  for (const tag of imgs) check(`${name}: img has width/height`, /width="\d+"/.test(tag) && /height="\d+"/.test(tag), tag.slice(0, 80));
  // link resolution (internal)
  const dir = dirname(join(ROOT, p));
  const hrefs = [...html.matchAll(/(?:href|src)="([^"#]+?)(?:#[^"]*)?"/g)].map(m => m[1])
    .filter(h => !h.startsWith("http") && !h.startsWith("data:") && !h.startsWith("mailto"));
  for (const h of hrefs) {
    const target = h.startsWith("/") ? join(ROOT, h) : resolve(dir, h);
    const okTarget = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, "index.html")));
    check(`${name}: link resolves ${h}`, okTarget);
  }
}

/* ---------- whats-on specifics ---------- */
const whatsOn = readFileSync(join(ROOT, "whats-on/index.html"), "utf8");
const codexEvents = JSON.parse(readFileSync(join(ROOT, "src/data/events.json"), "utf8"));
check("44 event details", (whatsOn.match(/class="event-detail"/g) || []).length === 44);
check("7 upcoming", (whatsOn.match(/data-status="upcoming"/g) || []).length === 7);
check("37 past", (whatsOn.match(/data-status="past"/g) || []).length === 37);
for (const e of codexEvents.events) check(`event anchor #${e.id}`, whatsOn.includes(`id="${e.id}"`));
check("8 Event schemas", (whatsOn.match(/"@type":"Event"/g) || []).length === 8);
check("ics links present", (whatsOn.match(/abc-calendar\/[a-z0-9-]+\.ics/g) || []).length >= 40);
check("Kathak stays North Indian", !/South India.?s Kathak/i.test(whatsOn));
check("Summer Intensive uses its artwork", whatsOn.includes("summer-intensive-2026.png") && !whatsOn.includes("dance-yoga-summer-retreat-2026.jpg"));
check("past never labelled upcoming", !/data-status="past"[^>]*data-status="upcoming"/.test(whatsOn));

/* ---------- lessons ---------- */
const lessons = JSON.parse(readFileSync(join(ROOT, "src/data/lessons.json"), "utf8"));
check("10 lesson pages", lessons.length === 10);
for (const l of lessons) {
  const f = join(ROOT, "learn-to-dance-bollywood", l.slug, "index.html");
  check(`lesson ${l.slug} exists`, existsSync(f));
  if (!existsSync(f)) continue;
  const html = readFileSync(f, "utf8");
  check(`lesson ${l.slug}: nocookie embed`, html.includes("youtube-nocookie.com/embed/"));
  check(`lesson ${l.slug}: VideoObject`, html.includes('"@type":"VideoObject"'));
  check(`lesson ${l.slug}: BreadcrumbList`, html.includes('"@type":"BreadcrumbList"'));
}

/* ---------- redirects parity with Codex ---------- */
const dataRedirects = JSON.parse(readFileSync(join(ROOT, "src/data/redirects.json"), "utf8"));
check("80 redirect definitions", dataRedirects.length === 80);
for (const r of dataRedirects) {
  const f = join(ROOT, r.route, "index.html");
  check(`stub ${r.route}`, existsSync(f) && readFileSync(f, "utf8").includes(`url=${r.target}`));
}

/* ---------- brand guardrails ---------- */
const home = readFileSync(join(ROOT, "index.html"), "utf8");
// strip tags first — the statement is typeset as "This is <em>ABC.</em>",
// so a raw substring test would miss a statement that is plainly present
const homeText = home.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
check("central statement present", /Not one dance/i.test(homeText) && /Not one stage/i.test(homeText)
  && /Not one way to move/i.test(homeText) && /This is ABC/i.test(homeText));
check("no room metaphor", !/room to move|kind of room/i.test(home));
check("hero uses master + mobile source", home.includes("hero-loop-1080p-master.mp4") && home.includes("hero-loop.mp4"));
check("hero muted looped playsinline", /<video[^>]*autoplay[^>]*muted[^>]*loop[^>]*playsinline/.test(home));
const learn = readFileSync(join(ROOT, "learn/index.html"), "utf8");
check("online coaching is Zoom", learn.includes("Zoom"));
const festival = readFileSync(join(ROOT, "festival/index.html"), "utf8");
check("Edition Five 7–9 May 2027", /7[—–-]9/.test(festival) && festival.includes("May 2027"));
check("no invented 2027 faculty/tickets", !/2027 faculty|tickets on sale|buy tickets/i.test(festival));
const about = readFileSync(join(ROOT, "about/index.html"), "utf8");
check("about keeps #story anchor", about.includes('id="story"'));
check("founded 2017 in about copy", about.includes("founded ABC in 2017") || about.includes("Since 2017"));

/* ---------- v4.4 (Codex F-06.2/3): copy lint + duplicate headings ---------- */
const FULL_PAGES = [
  "index.html", "book/index.html", "learn/index.html", "whats-on/index.html",
  "festival/index.html", "about/index.html", "contact/index.html",
  "learn-to-dance-bollywood/index.html",
  ...["lesson-1-step-touch","lesson-1-dip-variations","lesson-2-dip","lesson-2-swings",
      "lesson-3-around-the-world","lesson-3-sexy-girl","lesson-4-cross","lesson-4-flowers",
      "lesson-5-shoulder-step","lesson-5-touch-up-revision"].map(s => `learn-to-dance-bollywood/${s}/index.html`),
];
const BANNED = [
  [/\broom\b/i, "room metaphor"],
  [/barefoot[^.<]*\b(probably|you do you)\b/i, "hedged barefoot joke"],
  [/mailto:/i, "mailto link"],
  [/[\w.+-]+@[\w-]+\.[a-z]{2,}/i, "raw e-mail address"],
];
for (const p of FULL_PAGES) {
  const html = readFileSync(join(ROOT, p), "utf8");
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  for (const [re, label] of BANNED) {
    const target = label === "mailto link" ? html : text;
    check(`copy lint ${p}: no ${label}`, !re.test(target), (target.match(re) || [""])[0].slice(0, 40));
  }
  // duplicate h2/h3 inside the same details/section block.
  // Scope: template-authored headings only — event bodies and fold prose are
  // carried verbatim from the authority build and are not ours to rewrite.
  // Class names legitimately repeat across levels (two Bollyfolk classes).
  const DUPE_OK = new Set(["bollyfolk", "bollywood"]);
  const templated = html
    .replace(/<div class="event-detail-body">[\s\S]*?<\/details>/g, "</details>")
    .replace(/<div class="fold-body">[\s\S]*?<\/details>/g, "</details>");
  for (const block of templated.split(/<details|<\/details>|<section\b/)) {
    const heads = [...block.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)]
      .map(m => m[1].replace(/<[^>]+>/g, "").trim().toLowerCase())
      .filter(h => h && !DUPE_OK.has(h));
    const dupe = heads.find((h, i) => heads.indexOf(h) !== i);
    check(`no duplicate heading in block of ${p}`, !dupe, dupe);
    if (dupe) break;
  }
}
// governing docs stay clean too
for (const doc of ["ASSET_MAP.md", "MOTION_SYSTEM.md", "README.md"]) {
  const t = readFileSync(join(ROOT, doc), "utf8");
  check(`${doc}: no room metaphor`, !/\broom\b(?![- ]?(free|mate)|s\b)/i.test(t.replace(/shoe-free/g, "")), (t.match(/.{0,30}\broom\b.{0,30}/i) || [""])[0]);
}

console.log(`\nPASS ${pass} · FAIL ${fail}`);
if (fail) { console.log(failures.map(f => "  ✗ " + f).join("\n")); process.exit(1); }
