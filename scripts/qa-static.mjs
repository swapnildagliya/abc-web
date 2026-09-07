// Static parity + fact QA for the Fable 5 Motion Concept.
// Run: node scripts/qa-static.mjs
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { eventSets, currentEventSchemas, BUILD_TODAY } from "../src/events.mjs";

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
// 19 route dirs since 2026-09-07: sangam/ is the production's own page.
// 18 route dirs since 2026-09-06: contact/thank-you/ is where a no-JS form POST
// lands. It is noindex and deliberately absent from sitemap.xml.
check("20 full pages (19 route dirs + homepage)", fullPages.length === 19, `got ${fullPages.length}: ${fullPages.join(", ")}`);
check("thank-you page is noindex", readFileSync(join(ROOT, "contact/thank-you/index.html"), "utf8").includes('name="robots" content="noindex'));
check("thank-you page stays out of the sitemap", !readFileSync(join(ROOT, "sitemap.xml"), "utf8").includes("thank-you"));
check("80 redirect stubs", stubs.length === 80, `got ${stubs.length}`);
check("homepage exists", existsSync(join(ROOT, "index.html")));
check("404.html exists", existsSync(join(ROOT, "404.html")));
check("404 uses root-absolute assets", readFileSync(join(ROOT, "404.html"), "utf8").includes('href="/assets/'));
check("_redirects has 80 lines", readFileSync(join(ROOT, "_redirects"), "utf8").trim().split("\n").length === 80);
// While the site is a preview host it must disallow crawling and carry no
// sitemap line; a launch build restores the sitemap reference.
const robots = readFileSync(join(ROOT, "robots.txt"), "utf8");
const previewBuild = readFileSync(join(ROOT, "index.html"), "utf8").includes('name="robots" content="noindex');
check("robots.txt matches the build mode",
  previewBuild ? robots.includes("Disallow: /") : robots.includes("sitemap.xml"));
check("every page is noindex in a preview build, or none is",
  ["index.html","festival/index.html","contact/index.html","about/index.html"]
    .every(f => readFileSync(join(ROOT, f), "utf8").includes('content="noindex') === previewBuild));
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
// Counts are DERIVED, not frozen: a hardcoded "7 upcoming" silently becomes a
// lie the morning after an event ends, which is exactly how three finished
// events stayed on the agenda. Compare the page against the same date logic
// the build uses instead.
const sets = eventSets(codexEvents.events);
check(`${sets.upcoming.length} upcoming (as of ${BUILD_TODAY})`, (whatsOn.match(/data-status="upcoming"/g) || []).length === sets.upcoming.length);
check(`${sets.past.length} past (as of ${BUILD_TODAY})`, (whatsOn.match(/data-status="past"/g) || []).length === sets.past.length);
check("no finished event is still labelled upcoming", sets.upcoming.every(e => e.end >= BUILD_TODAY));
for (const e of codexEvents.events) check(`event anchor #${e.id}`, whatsOn.includes(`id="${e.id}"`));
check("Event schemas match the upcoming set", (whatsOn.match(/"@type":"Event"/g) || []).length === currentEventSchemas(codexEvents.schemas).length);
check("ics links present", (whatsOn.match(/abc-calendar\/[a-z0-9-]+\.ics/g) || []).length >= 40);
check("Kathak stays North Indian", !/South India.?s Kathak/i.test(whatsOn));
// No past event may supply a picture to the agenda, and no event may borrow
// another event's photo — one shared fallback image is how every ABC date
// ended up illustrated by the same July crowd shot.
// Scoped to the agenda itself: the page hero legitimately carries a credited
// archive shot ("Benenwerk · Bruges"), which is mood, not a listing.
const agenda = whatsOn.slice(whatsOn.indexOf('id="agenda"'), whatsOn.indexOf('id="past-events"') + 1 || whatsOn.length);
const pastImages = sets.past.filter(e => e.image).map(e => e.image.src);
check("no past event's photo is shown in the agenda", pastImages.every(src => !agenda.includes(src)));
const usedEventPhotos = [...agenda.matchAll(/assets\/img\/events\/[a-z0-9._-]+/g)].map(m => m[0].split("/").pop());
check("every agenda photo belongs to an upcoming event",
  usedEventPhotos.every(f => sets.upcoming.some(e => e.image && e.image.src.endsWith(f))));
check("past never labelled upcoming", !/data-status="past"[^>]*data-status="upcoming"/.test(whatsOn));

// The archive legitimately carries the marketing voice each event was sold
// with at the time — 22 of the 40 past bodies say "dive into", "immerse
// yourself", "unforgettable". That is a record and it is collapsed behind
// <details>. What must not happen is a NEW event importing that language into
// the live agenda, where it is the first thing a programmer reads.
const SLOP = /\b(dive into|immerse yourself|unforgettable|vibrant world|essence of|whether you(?:'re| are)|get ready to|thrilled to|exhilarating|mesmeriz\w+|embark|unlock your|elevat\w+|seamless\w*)\b/i;
for (const e of sets.upcoming) {
  const prose = (e.body || "").replace(/<[^>]+>/g, " ");
  const found = prose.match(SLOP);
  check(`upcoming event "${e.id}" is free of marketing filler`, !found, found && found[0]);
}

// Every upcoming event must offer a way to act on it. The agenda template
// carries no ticket link of its own — the button lives inside each event's
// body HTML in events.json. An event added without one renders as a date the
// visitor can read and cannot book, and nothing else in the build notices.
for (const e of sets.upcoming) {
  const body = e.body || "";
  // Any outbound destination counts — a ticket shop, a Shoonya class page, the
  // booking form. The .ics download does not: adding a date to a calendar is
  // not the same as being able to attend it.
  const actionable = [...body.matchAll(/href="([^"]+)"/g)]
    .map(m => m[1])
    .some(h => !/\.ics$/i.test(h) && (/^https?:/i.test(h) || /\/(book|contact)\//.test(h)));
  check(`upcoming event "${e.id}" offers a booking or ticket link`, actionable);
}

/* ---------- enquiry forms ---------- */
const contact = readFileSync(join(ROOT, "contact/index.html"), "utf8");
check("contact carries both enquiry forms", (contact.match(/class="enquiry-form"/g) || []).length === 2);
check("booking form anchor #book", contact.includes('id="book-abc"') && contact.includes('id="book"'));
check("coaching form anchor #coaching", contact.includes('id="coaching"'));
check("forms post to Web3Forms", (contact.match(/action="https:\/\/api\.web3forms\.com\/submit"/g) || []).length === 2);
check("forms carry an access key", (contact.match(/name="access_key" value="[0-9a-f-]{36}"/g) || []).length === 2);
// Must be absolute: Web3Forms redirects server-side, so a relative path would
// resolve against api.web3forms.com.
check("forms have an absolute no-JS redirect to the thank-you page", (contact.match(/name="redirect" value="https:\/\/[^"]+\/contact\/thank-you\/"/g) || []).length === 2);
check("forms carry a honeypot", (contact.match(/name="botcheck"/g) || []).length === 2);
check("each form has a distinct subject", new Set(contact.match(/name="subject" value="([^"]+)"/g) || []).size === 2);
// D-074: no address may appear in markup we author, on any page.
for (const [route, html] of Object.entries({ "contact/": contact, "contact/thank-you/": readFileSync(join(ROOT, "contact/thank-you/index.html"), "utf8") })) {
  check(`no email address in ${route}`, !/mailto:|[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(html));
}

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
