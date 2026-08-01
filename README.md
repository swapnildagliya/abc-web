# ABC — Fable 5 Motion Concept

An experimental, scroll-choreographed version of the complete ABC —
A Bollywood Company website. The site is staged as a live performance:
a film-led overture, a pinned manifesto, acts with their own worlds
(stage · agenda · classes · festival), postcards from the road, and a
curtain-call finale. Imagery performs; practical information stays plain.

- **Content authority:** `ABC Codex Rebuild 2026-07-16/` (facts, routes,
  events, copy). This experiment carries equivalent content and publish
  readiness — 18 designed pages, 80 branded redirects, 45 event records
  (9 upcoming + 36 past), 44 calendar files, ten free-course lessons,
  full metadata/structured data, sitemap, robots, 404 and `_redirects`.
- **Approved identity:** cobalt · yellow · night · bone (+ red punctuation),
  the real ABC mark, "THIS IS ABC — Not one dance. Not one stage. Not one
  way to move." ABC began in **2017**.

## Preview (simplest)

```
node scripts/serve.mjs 4173
```

…then open <http://localhost:4173> — or use any static file server from this
folder. Everything is local: fonts, images and both hero video encodes ship in
`assets/`. The only remote requests are the privacy-enhanced
`youtube-nocookie.com` lesson embeds and approved outbound links.

(Opening `index.html` directly from Finder also works for a quick look, but the
root-relative links in `404.html` and true route behaviour need the server.)

## Directory structure

```
├── index.html                  homepage (the performance)
├── book/ learn/ whats-on/ festival/ about/ contact/
│                               six primary section worlds
├── learn-to-dance-bollywood/   free course hub + ten lesson pages
├── abc-calendar/               44 .ics files + legacy event redirect stubs
├── <legacy-route>/index.html   80 branded compatibility redirects
├── 404.html                    nested-path-safe branded 404
├── _redirects · sitemap.xml · robots.txt
├── assets/
│   ├── css/  fonts.css · fable.css (system) · scenes.css (page scenes)
│   ├── js/   fable.js (choreography engine — no libraries)
│   ├── fonts/ self-hosted Anek Latin (variable) + Bona Nova
│   ├── img/  approved photography, cutouts, marks (see ASSET_MAP.md)
│   └── media/ hero-loop-1080p-master.mp4 (desktop) · hero-loop.mp4 (mobile)
├── src/                        build system
│   ├── build.mjs               node src/build.mjs → regenerates all HTML
│   ├── shell.mjs               shared head/header/menu/footer
│   ├── pages/*.mjs             one module per page world
│   ├── data/                   events/lessons/redirects extracted from the
│   │                           Codex build (extract.mjs regenerates)
│   └── extract.mjs
├── scripts/                    serve.mjs + QA suites
├── checkpoints/                rollback snapshots
├── ASSET_MAP.md                every image: role, credits, treatments
├── MOTION_SYSTEM.md            the choreography system
└── AUDIT.md                    what was checked, results, open notes
```

## Rebuilding after edits

```
node src/build.mjs        # templates + data → HTML routes
node scripts/qa-static.mjs    # route/content/fact parity checks
node scripts/qa-browser.mjs   # Chromium + WebKit, 3 viewports, reduced motion
```

## Rules of the experiment

- Do not deploy, and do not merge into the Codex build or overwrite either
  source site without explicit approval.
- Facts (dates, prices, cities, credits, event status) come only from the
  content authority; unresolved facts are labelled forthcoming, never invented.
- No raw email addresses; enquiries route through the approved Shoonya form.
- Excluded public-participant photos stay excluded (see ASSET_MAP.md).
