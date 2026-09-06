# ABC site — update prompt for Codex

## What this is
The new **ABC (A Bollywood Company)** website — a static, zero-dependency build
(`src/build.mjs` + `src/pages/*.mjs` → HTML). Live now on GitHub Pages:

- **Live:** https://swapnildagliya.github.io/abc-web/
- **Repo:** github.com/swapnildagliya/abc-web (public, `main`, Pages from root)
- **Source:** `~/Documents/Claude/Projects/ABC/design-lab/Fable 5 Motion Concept/`
- Build: `node src/build.mjs` · QA: `node scripts/qa-static.mjs` and
  `PLAYWRIGHT_DIR="…/Event Submission/" node scripts/qa-browser.mjs`
  (needs `nohup node scripts/serve.mjs 4173 &` running). Both currently GREEN
  (static 1593 · browser 376). Keep them green; update the counts in
  `scripts/qa-static.mjs` in the SAME commit whenever you change what they measure.

## Hard rules (do not break)
- Never expose an email address or `mailto:` on any page.
- No member/student pricing — public/full price + early-bird only.
- Never invent facts (dates, prices, credits, venues). ABC founded 2017. GIDF
  Edition Five = 7–9 May 2027, Shoonya Dance Centre, Ghent. Kathak is North Indian.
- **Image provenance is real work.** Check EXIF/date before labelling. This session
  found a Gentse Feesten photo labelled "GIDF workshop floor" (wrong festival) and
  Swapnil-solo shots used to represent the *company*. Prefer ensemble/company shots
  wherever the copy talks about the company; never present a solo as the ensemble.
- **Do NOT touch gidf.abcdans.com** — that is a SEPARATE repo (`GitHub/Gidf-hub`,
  Fable 5's). The 2023 Bhangra @211.9s / 2026 Bhangra @3.8s fixes in THIS build are
  not in that one; if wanted there, Fable 5 applies them.

## Done this session
- Full cinematic site: homepage (10 scenes), 6 pages, course hub + 10 lessons,
  festival with a 12-act cross-fade showreel (2023–2026) + film hero + edition track.
- Published to GitHub Pages. Images optimised 51MB → 9.5MB (dropped 20 unused, resized).
- Fixed: mislabelled Gentse Feesten image (removed from GIDF gallery, relabelled on
  homepage postcard); Productions section now uses company ensemble images
  (`rajasthani-set`, `garba-ensemble`) not Swapnil solo; Gentse Feesten marked past.

## Remaining work (in priority order)

1. **Custom domain (biggest).** Swapnil does NOT want the Squarespace domain
   `abcbollywoodbelgium.com` (auto-renew off — registration runs out 2 Feb 2027).
   **Decided 2026-09-06: the site moves to `abcdans.com`**, already owned by
   Swapnil and paid to 2 May 2027, which also puts the company site and
   `gidf.abcdans.com` on one root. Recommended host:
   **Cloudflare Registrar + Cloudflare Pages** (free, unlimited bandwidth, one account).
   When the domain is known:
   - Find/replace every `https://www.abcbollywoodbelgium.com` → new domain across the
     build: canonical, `og:url`, `og:image`, `twitter:image`, schema `@id`/`url`,
     `sitemap.xml`, `robots.txt` sitemap line, and any `SITE` const in `src/shell.mjs`.
   - Add a `CNAME` file with the domain; connect the repo to Cloudflare Pages; Swapnil
     adds the DNS record. Stage on the domain, verify live, then it's done.
   - Until then the site is an UNLISTED preview (canonicals still point at the old
     domain) — don't link it publicly, or add `<meta name="robots" content="noindex">`.

2. **Form → email on Contact.** Contact currently links out to the Shoonya form.
   If Swapnil wants a native form that emails him: on Cloudflare Pages use
   **Formspree or Web3Forms** (form `action` → their endpoint, they relay to his
   email — no address exposed, free tier). If hosting on Netlify instead, use
   **Netlify Forms** (built-in). Keep the no-email-exposed rule.

3. ~~**Event freshness — make upcoming/past date-driven.**~~ **DONE 2026-09-06.**
   `src/events.mjs` is now wired into `whatson.mjs` and `home.mjs`: `status` is
   derived from `end` vs the build date (override with `ABC_EVENT_TODAY=YYYY-MM-DD`
   for time-travel testing), past events no longer emit `Event` schema, and the
   two hand-written agenda features + the homepage date list are generated from
   the upcoming set. Both had gone stale — /whats-on/ was still leading with
   Gentse Feesten (23–26 Jul) as "NEXT", and three finished events were counted
   as upcoming. Events also gained curated `image` and `blurb` fields, so each
   event carries its own photo instead of every card and every `Event` schema
   falling back to one Gentse Feesten crowd shot (it appeared 11× on the page).
   `extract.mjs` carries those two fields forward on re-extract. QA counts in
   `qa-static.mjs` are now derived from the same date logic rather than frozen.
   **Still open here:** only 5 of 44 events have a real photo; Dokfeesten,
   Semi-Classical Starter Series and Sangam have none and correctly show no
   image rather than borrowing one. Sangam especially needs artwork before
   November.

4. **Image/provenance audit pass.** Systematically verify each image's label and
   context across all pages (home, book, learn, whats-on, festival, about, contact):
   right festival, right event, company-vs-solo appropriate, credit correct
   (`GIDF Jan Vens*`=Jan Vens, `indisch feest_*`=Joëlle Verbeeck, `Michael Backaert*`
   =Backaert). `assets/media/` and `assets/img/` are the sources. Full asset notes in
   `ASSET_MAP.md`.

5. **Reel guest artists — stills vs video (decision pending).** The three 2023 guests
   (Shreyashee, Girish, Jana) are currently professional STILLS (Ken-Burns). Backaert
   performance videos were also cut (`assets/media/editions/guest-*.mp4`) but the switch
   to video was interrupted. Decide: keep crisp stills, or use the punched-in videos.

6. **Swapnil's "everything is choreography" site** — separate site, not built here.
   Same recipe (own repo → Cloudflare Pages → domain).

## Rollback / safety
Local git history in the repo. Checkpoints (pre-publish states) are in
`checkpoints/` locally (gitignored). Do not force-push over Swapnil's remote.
