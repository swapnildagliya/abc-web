// One-time extractor: pulls factual content out of the Codex build (the content
// authority) into JSON data files consumed by build.mjs. Never edits the source.
//
// DO NOT RERUN CASUALLY. The Codex snapshot was frozen on 2026-07-18 and archived on
// 2026-08-05. src/data/*.json has been corrected by hand since — Dansen in 't Park 2026
// was removed after Swapnil confirmed ABC is not part of it. Rerunning this overwrites
// events.json / redirects.json wholesale and puts that event back on a live site.
// Set ABC_EXTRACT_CONFIRM=1 to run it anyway, then re-apply the corrections by hand.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

if (!process.env.ABC_EXTRACT_CONFIRM) {
  console.error("extract.mjs refuses to run: it would overwrite hand-corrected event data.");
  console.error("See the header comment. Re-run with ABC_EXTRACT_CONFIRM=1 if you mean it.");
  process.exit(1);
}

const CODEX = "/Users/swapnil/Documents/Claude/Projects/ABC/design-lab/_archive/ABC Codex Rebuild 2026-07-16";
const OUT = fileURLToPath(new URL("./data/", import.meta.url));

/* ---------- events from whats-on ---------- */
const whatsOn = readFileSync(join(CODEX, "whats-on/index.html"), "utf8");

function extractDetails(html) {
  const events = [];
  const re = /<details class="event-detail"[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    const start = m.index;
    // find matching </details> accounting for nesting
    let depth = 0, i = start;
    const tokenRe = /<details\b|<\/details>/g;
    tokenRe.lastIndex = start;
    let t, end = -1;
    while ((t = tokenRe.exec(html))) {
      if (t[0] === "</details>") { depth--; if (depth === 0) { end = t.index + t[0].length; break; } }
      else depth++;
    }
    const block = html.slice(start, end);
    const attrs = m[0];
    const get = (name) => (attrs.match(new RegExp(`${name}="([^"]*)"`)) || [])[1] || "";
    const summary = block.match(/<summary>([\s\S]*?)<\/summary>/)[1];
    const sPart = (cls) => (summary.match(new RegExp(`<span class="${cls}">([\\s\\S]*?)</span>`)) || [])[1]?.trim() || "";
    const body = block.match(/<div class="event-detail-body">([\s\S]*)<\/div><\/details>$/)[1];
    events.push({
      id: get("id"),
      status: get("data-status"),
      start: get("data-start"),
      end: get("data-end"),
      year: get("data-eyear"),
      date: sPart("event-date"),
      title: sPart("event-title"),
      city: sPart("event-city"),
      body: body.trim(),
    });
    re.lastIndex = end;
  }
  return events;
}
const events = extractDetails(whatsOn);
const upcoming = events.filter(e => e.status === "upcoming");
const past = events.filter(e => e.status === "past");
console.log(`events: ${events.length} (${upcoming.length} upcoming, ${past.length} past)`);

/* event schema blobs (9 upcoming Event JSON-LD) */
const schemas = [...whatsOn.matchAll(/<script type="application\/ld\+json" data-publish-schema>(\{"@context":"https:\/\/schema.org","@type":"Event"[\s\S]*?)<\/script>/g)].map(m => m[1]);
console.log(`event schemas: ${schemas.length}`);

// `image` and `blurb` are curated here, not present in the Codex source. A
// straight overwrite would silently drop them and every event would fall back
// to one shared photo again — so carry them across on the event id.
const CURATED = ["image", "blurb"];
// Past bodies are hand-edited here and must survive re-extraction. On
// 2026-09-07 the 21 archive bodies carrying inherited Squarespace marketing
// copy were rewritten; the Codex source still holds the original text, so a
// plain re-extract would silently restore every "immerse yourself" and
// "unforgettable". Upcoming events still take their body from upstream —
// a live event's details must never be frozen to an old copy.
const CURATED_PAST = ["body"];
const previous = existsSync(join(OUT, "events.json"))
  ? JSON.parse(readFileSync(join(OUT, "events.json"), "utf8")).events
  : [];
const keep = new Map(previous.map(e => [e.id, e]));
let carried = 0;
for (const e of events) {
  const before = keep.get(e.id);
  if (!before) continue;
  for (const field of CURATED) if (before[field] !== undefined) { e[field] = before[field]; carried++; }
  const isPast = e.end && e.end < new Date().toISOString().slice(0, 10);
  if (isPast) for (const field of CURATED_PAST) if (before[field] !== undefined) { e[field] = before[field]; carried++; }
}
console.log(`carried ${carried} curated field(s) forward`);

writeFileSync(join(OUT, "events.json"), JSON.stringify({ events, schemas }, null, 1));

/* ---------- lessons ---------- */
const lessonDirs = readdirSync(join(CODEX, "learn-to-dance-bollywood"), { withFileTypes: true })
  .filter(d => d.isDirectory()).map(d => d.name);
const lessons = lessonDirs.map(slug => {
  const html = readFileSync(join(CODEX, "learn-to-dance-bollywood", slug, "index.html"), "utf8");
  const pick = (re) => (html.match(re) || [])[1] || "";
  const schema = pick(/<script type="application\/ld\+json">(\[[\s\S]*?\])<\/script>/);
  const parsed = JSON.parse(schema);
  const video = parsed.find(x => x["@type"] === "VideoObject");
  return {
    slug,
    title: pick(/<title>([\s\S]*?)<\/title>/),
    desc: pick(/<meta name="description" content="([\s\S]*?)">/),
    track: pick(/<p class="lesson-track">([\s\S]*?)<\/p>/),
    h1: pick(/<h1>([\s\S]*?)<\/h1>/),
    number: pick(/<p class="lesson-giant" aria-hidden="true">([\s\S]*?)<\/p>/),
    embed: video.embedUrl,
    contentUrl: video.contentUrl,
    thumb: video.thumbnailUrl,
    videoName: video.name,
    videoDesc: video.description,
    uploadDate: video.uploadDate,
    copyHead: pick(/<section class="lesson-copy"[^>]*><h2 class="reveal">([\s\S]*?)<\/h2>/),
    copyBody: pick(/<div class="lesson-copy-body reveal">([\s\S]*?)<\/div><\/section>/),
    prev: pick(/<nav class="lesson-nav"[^>]*><a href="([^"]*)"/),
    prevLabel: pick(/<nav class="lesson-nav"[^>]*><a href="[^"]*"><small>[^<]*<\/small><strong>([\s\S]*?)<\/strong>/),
    next: (html.match(/<a href="([^"]*)"><small>Next →<\/small>/) || [])[1] || "",
    nextLabel: (html.match(/<small>Next →<\/small><strong>([\s\S]*?)<\/strong>/) || [])[1] || "",
  };
});
console.log(`lessons: ${lessons.length}`);
writeFileSync(join(OUT, "lessons.json"), JSON.stringify(lessons, null, 1));

/* ---------- redirect stubs ---------- */
// every index.html that contains meta refresh = redirect stub
function walk(dir, base = "") {
  let out = [];
  for (const d of readdirSync(join(CODEX, dir), { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const rel = base ? `${base}/${d.name}` : d.name;
    if (["assets", "checkpoints", "exports", "scripts"].includes(rel)) continue;
    const idx = join(CODEX, dir, d.name, "index.html");
    if (existsSync(idx)) out.push(rel);
    out = out.concat(walk(join(dir, d.name), rel));
  }
  return out;
}
const allRoutes = walk("."); // relative route dirs
const fullPages = new Set(["book","learn","whats-on","festival","about","contact","learn-to-dance-bollywood",
  ...lessonDirs.map(s => `learn-to-dance-bollywood/${s}`)]);
const redirects = [];
for (const route of allRoutes) {
  if (fullPages.has(route)) continue;
  const html = readFileSync(join(CODEX, route, "index.html"), "utf8");
  const refresh = (html.match(/http-equiv="refresh" content="0;url=([^"]*)"/) || [])[1];
  if (!refresh) { console.log("NOT A STUB (skipping):", route); continue; }
  redirects.push({
    route,
    target: refresh,
    canonical: (html.match(/rel="canonical" href="([^"]*)"/) || [])[1] || "",
    title: (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "",
    desc: (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "",
    dest: (html.match(/into <strong>([\s\S]*?)<\/strong>/) || [])[1] || "",
  });
}
console.log(`redirect stubs: ${redirects.length}`);
writeFileSync(join(OUT, "redirects.json"), JSON.stringify(redirects, null, 1));
