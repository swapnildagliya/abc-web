# AUDIT — Fable 5 Motion Concept

## CURRENT BASELINE — 22 July 2026, after the cinematic homepage (v6)

`scripts/qa-static.mjs`: **1,595 checks, 0 failures** ·
`scripts/qa-browser.mjs`: **376 checks, 0 failures**
(adds the two night-ground contrast checks below; the static count rose with
the six extra company portraits)

### What v6 changed

The homepage is rebuilt as ten staged scenes on a shared CSS 3D camera
(`assets/css/cinematic.css`, loaded only where `def.cinematic` is set). Routes,
facts, metadata and every other page are untouched — parity with the Codex
authority is unchanged.

Scenes, in order: **overture** (film + rolling statement) · marquee · **crane**
(`#performances`) · **rest** (`#events`, no camera movement — dates are for
reading) · **letter** (`#story`) · **line-up** (`#company`) · **cut**
(`#learn`, a clip-path wipe into daylight) · **gather** (`#festival`) ·
**road** (`#archive`, vertical scroll mapped 1:1 to lateral travel) ·
**finale** (`#contact-abc`).

### The company scene — a curtain call, not a sample

The homepage showed 7 of 13 dancers behind a "Meet all thirteen" button, and
the short grid left roughly 300px of dead space under it. All thirteen are now
present as a curtain call: seven across the front row, six stepped half a cell
behind. The portraits are full-bleed (the shared `.card` rule mats a quarter of
each one away with padding meant for text cards), and the "read their stories"
link moved into the section head so nothing trails the line-up. The formation
becomes an even contact sheet at 5-across (≤1100px) and 3-across (≤640px),
where the half-step would read as a mistake rather than a stagger.

### v6.1 — the camera on the other six pages

The cinematic layer now loads on book, learn, what's on, festival, about and
contact. It is **confined to the hero on every one of them**, on purpose: these
are the pages people use to look up dates, prices and timetables, and burying
that behind choreography is the exact v4 failure this build was corrected for.
Everything below a hero keeps the old contract — complete on arrival, no camera
movement, no scrubbed state.

What each page got:

- **Every hero** is now a perspective viewport. Framed photographs *crane* down
  (raked back and held away in Z, then levelling). Cutouts *step forward* out of
  the dark instead — a cutout is a performer, not a picture. The ghost word sits
  at a real −520px, so it parallaxes by perspective rather than a tuned offset.
- **Festival gallery, book productions, about story**: photo groups assemble out
  of depth on entrance, each frame from its own distance, on the existing
  `--step` stagger.
- **Learn `#trial`**: the daylight wipe from the homepage's classes chapter,
  repeated once. A wipe, never a dissolve.
- **What's on**: hero only. The agenda is a lookup surface and was left alone.

Two rules made this safe to apply globally rather than per page:
`:not([data-scrub])` excludes figures that already write `transform` from `--p`
every frame (two rules on one transform fight), and every new animation uses
`backwards` fill with explicit `.no-js` / `.reduce` resets. Verified: all eight
hero/gallery/wipe targets are complete and unclipped on all six pages under both
reduced-motion and JavaScript-disabled.

### v6.6 — the festival date stamp was burying a button

Spotted by Swapnil in a screenshot I had already been shown earlier and had not
looked at properly. `.date-stamp` was `position:absolute` in the hero's
bottom-left corner — the same place as the button row. Measured coverage of the
"Edition Five" button: **77% at 1512×760, 61% at 1280×800**, and at those sizes
`elementFromPoint` at the button's centre returned the stamp, so the click was
being swallowed too. Not cosmetic.

Fixed by putting the stamp in normal flow after the buttons, so no viewport
height can make them collide. Verified 0% coverage at seven sizes.

**New guard — "no controls buried under decoration"** (+54 checks): for every
visible control on every page and size, `elementFromPoint` at its centre must
return that control. This is the general form of the bug and the site had no
test for it; the `tinyTargets` check only measured size, never occlusion.

### v6.4 — the hero re-cut, then REVERTED

I replaced the hero *footage*, not just its encoding, and did not say so plainly
enough beforehand. Swapnil asked for the original back. Restored: the desktop
file is byte-for-byte identical to the original again, and the poster is back to
`finale-hero.jpg`.

Kept: the mobile file is re-encoded **from the original footage** — 960×540 at
~3.7 Mbps for 14s (6.3MB) instead of full 1080p at 873 kbps for 44s (4.6MB).
Same content, roughly 4× the bit density on a phone.

Standing direction for the eventual hero (Swapnil): *"Only bits and pieces of
each dance. Quick changes, groups, solo moments in quick succession."* — a
fast-cut montage, not one long piece. The semi-classical clip failed on exactly
this: one style, held too long.

**Process rule this cost us:** changing which footage plays on the homepage is a
content decision, not an optimisation. Show it before applying it, every time.

#### What the re-cut established (still true, kept for reference)

"Video is a bit unclear" was a bitrate problem, not a resolution one. Desktop
was 1080p at 3.2 Mbps; mobile was full 1080p at **873 kbps**, then cropped hard
to portrait. Re-cut from a 31 Mbps master: desktop is now 14.3 Mbps at the same
18MB, mobile 6.6 Mbps at 960×540. The loop is shorter (10s / 8s rather than 44s)
because `avconvert` presets are quality-locked with no bitrate control, so
duration is the only lever on weight — a sharper short loop beats a long mushy
one. Poster regenerated from the new clip so it no longer jumps on play.

Two encoder findings worth keeping: there is no ffmpeg on this machine, and
Playwright's bundled ffmpeg is a `--disable-everything` VP8/webm build with no
H.264 encoder, so it cannot transcode these files.

### v6.7 — the festival hero is film

The old hero measured **52.9% empty cobalt with imagery at 18.5%** — two small
dark photographs floating in a bright field. Replaced with a full-bleed film
hero (option A2): the festival's own stage under the title, cobalt wash holding
the brand colour and the type's ground.

Five 2026 ensemble acts cycle with a live credit. They are **new cuts**, not the
reel's clips — the hero, the reel and the archive now share performances but
never a moment, so nothing plays twice on one page.

Legibility was measured, not assumed: each clip composited under the actual wash
scores 58–78 luminance behind the headline, well below the ~110 where white type
struggles. Verified: nothing loads before the hero is in view, playback stops
when it leaves, reduced motion loads no video and the poster stands in.

**The buried-controls guard earned its keep immediately** — the new mobile rule
parked the date stamp over "What to expect" on phones, the exact bug it was
written for, and QA failed before I saw it. Fixed by making the stamp a direct
child placed after the copy: absolute top-right on desktop, in flow on mobile.
(An intermediate fix put it *inside* the copy column, which changed its
containing block so `right` resolved against the copy and dropped it in the
middle of the headline.)

**Then the stamp and the live credit overlapped by 4–6px at four of five
sizes.** Two absolutely-positioned elements with hand-guessed `top` offsets
cannot hold: the stamp's height moves with its clamped type. Both now sit in one
`.film-hero-meta` stack, so the space between them is a `gap` — measured 14–21px
across 1101–1920 wide, no overlap. On phones the stack drops into flow after the
copy and the credit is hidden.

Dropped with the old hero: the script note "not one tradition. / not one way to
move." Its corner now carries the live act credit. Easy to restore if wanted.

### v6.3 — showcase video on the festival page

Four silent 6s loops cut from the GIDF 2026 Gala Showcase recording, in a new
`#showcase` scene. Provenance and privacy did the selecting: filenames turned
out to be unreliable (a file called "GIDF 2025 Finale" is actually a workshop
montage with title cards and identifiable participants), so every candidate was
viewed frame-by-frame before use, and workshop footage was excluded in favour of
stage performance. Full reasoning and the rejected list are in `ASSET_MAP.md`.

Cost control, since four autoplaying videos can outweigh a whole page: nothing
is fetched until its tile intersects, playback stops on exit, phones get a
640×360 encode and wide screens a 960×540 one, and reduced motion loads no video
at all. Verified: 0 requests before scrolling, correct encode per viewport, all
four paused on leaving, 0 fetches under reduced motion with posters standing in.

The one clip chosen on a filename rather than a look — "stage-wide" — was a
near-black stage with a lone figure. Replaced after ranking candidate frames by
brightness and colour spread rather than re-guessing.

### v6.2 — the festival page becomes a sequence

Reported as not feeling like a scrollytelling page. It was eight stacked
`scene-pad` blocks with entrance fades — the vocabulary was there, the
structure was a list. Two beats now carry it:

- **Edition Five** — the poster straightens and pushes in on `--p` as the
  section crosses the viewport. My first attempt gave it `height: 200vh` for a
  pin *without a sticky frame*, which is not a pin at all — just a tall section
  with the content floating between two voids. Scrubbed at natural height
  instead; the section went 1,900px → 965px on mobile.
- **Four editions** — the vertical timeline became a lateral track
  (`data-track`), vertical scroll mapped 1:1 to horizontal travel. Four
  editions in sequence is a horizontal idea. The engine's strip selector was
  generalised from `.postcard-strip` to `[data-strip], .postcard-strip` so the
  hook is reusable rather than homepage-specific. Cards were widened once
  measured: travel was only 505px, too short to read as travel; now 905px.
  The shared `.road` sets a bone ground, so the section's cobalt is restored
  explicitly — the cards are bone-on-blue and lose their edges on light.

**`#practical` was removed entirely**, at Swapnil's direction: all four folds
described the *current* festival, and none of it holds until Edition Five's
faculty and schedule are announced (what to wear, ages, food, ticket terms —
and the venue fold with it). Checked before deleting: no FAQ schema was built
from those folds, nothing on the site links to `#practical`, and no fact is
lost — the venue and dates remain in the Edition Five block, the street address
is in the site footer, and the closing block already carries the contact route
plus "faculty, programme and tickets are announced on the GIDF Instagram first."

Known intermittent, not caused by this work: Chromium occasionally logs
`compute-pressure is not allowed in this document` from the YouTube nocookie
iframe on a lesson page, which trips the console-error check. It cleared on
re-run. Worth pinning down if it recurs.

The no-JS guard earned its keep here: it failed on `.timeline article (missing)`
the moment the timeline was replaced, before any of it reached a browser I'd
looked at.

### The gap under the portraits

Reported as empty space below the company line-up. The company section was not
the cause — it has its normal 96px of padding under the last row. The void was
the **next** scene: the daylight cut sits on the same `--night` ground, so the
boundary is invisible, and its night panel centred one headline in a full
viewport. Measured run of unbroken dark between the last portrait and the next
readable word: **577px**.

Three changes, measured at 1512 / 1920 / 2000 wide:

- Both cut panels align to the top instead of centring (they must share the
  alignment, or the wipe shifts the type sideways — verified pixel-identical
  through the whole wipe).
- The cut is 170vh rather than 210vh; the wipe completed around `pp` 0.48 and
  the rest was hold.
- The night panel carries a `CURTAIN` ghost. The day panel has a lead, a
  three-step list and a button; the night panel had two lines, so its "before"
  state was a full screen of nothing.

Dark run before the next word is now **~250px** at every width — a section
break rather than a void.

### Bugs found and fixed while verifying v6 (each now has a guard)

| Symptom | Cause | Fix |
|---|---|---|
| Overture blank; film pushed to the bottom of a 300vh section and inset by `--pad` | scenes.css still carried the previous `.overture` (`display:grid; align-content:end` + padding), which the new rule never reset | Explicit reset in cinematic.css |
| `.crane-copy`, `.gather-copy`, `.finale-ask` near-invisible | all three inherited `--ink` on a `--night`/`--blue` ground | Colour set **once** on the scene containers, not per copy block; new QA check asserts night-ground copy resolves light |
| Festival copy printed over photographs, worse the narrower the viewport | collage and copy shared one horizontal band | Collage confined to its own column (`inset: 0 0 0 47%`); copy capped at `min(34rem, 42vw)`; stack point raised 900 → 1100px |
| Crane and finale on mobile: a floating card between two ~600px voids | a crane move and a pull-back need depth to travel through; a 390px phone has none | Both stack on ≤900px. Mobile page height 14,741 → 11,266px |
| QA reported a bug that was already fixed | dev server let the browser cache stylesheets | `scripts/serve.mjs` now sends `cache-control: no-store` |
| Contrast check flagged every element at luminance 0.009 | computed colours come back as `oklch()`; the parser read `0.98` lightness as a red channel of `0.98/255` | Colours resolved through a canvas, which handles any syntax |

Two things I verified rather than assumed: the festival copy/frame "collision"
seen in an early screenshot measured **zero** overlap at 1512/1280/1024 (visual
adjacency only), and the 1,854px "gap" a detector reported inside the crane is
an artifact of measuring sticky content in document space — the scene is pinned
and correct.

---

## PREVIOUS BASELINE — 19 July 2026, after the company + navigation restructure (v5)

`scripts/qa-static.mjs`: **1,562 checks, 0 failures** ·
`scripts/qa-browser.mjs`: **320 checks, 0 failures**
(Chromium + WebKit × 1512×982 / 1024×768 / 390×844; reduced motion; no-JS
content visibility; 43px touch targets at phone size; stretched-image, copy-lint
and duplicate-heading guards). Discipline: whenever a suite's check count
changes, update this line in the same commit — all totals below this block are
HISTORICAL, recorded as the build evolved.

Build finished 19 July 2026. Content authority: `ABC Codex Rebuild 2026-07-16/`.
Automated suites at first completion (historical): `scripts/qa-static.mjs` (1167) and
`scripts/qa-browser.mjs` (238 — Chromium + WebKit ×
1512×982 / 1024×768 / 390×844, plus reduced-motion and deep-link runs).
Visual review was done on Playwright screenshots at deviceScaleFactor 2
(Chromium and WebKit), not the inline preview.

## 0 · Codex build review (what already worked, and was carried over)

- Editorial identity: cobalt/yellow/night/bone with Bona Nova + Anek Latin;
  the approved video-led hero with responsive source selection; "This is ABC".
- Complete publish layer: 98 routes (18 pages + 80 branded redirects),
  45 event records with 44 .ics files, ten lessons with VideoObject +
  BreadcrumbList, FAQPage/Organization schema, canonicals + OG/Twitter,
  sitemap (18 URLs), robots, `_redirects`, nested-path-safe 404.
- Accessibility spine: skip link, menu focus trap + Escape + focus return,
  44px targets, native `<details>` disclosure, fragment auto-open.
- Where it stayed conventional (the reason this experiment exists): motion was
  uniform fade-up reveals; sections were stacked blocks; strong photography sat
  small or below the fold; the footer was generic.

## 1 · Content parity

- ✅ 18 full pages: home, book, learn, whats-on, festival, about, contact,
  course hub + 10 lessons (static suite counts them and their canonicals).
- ✅ 80 redirect stubs regenerated from extracted Codex data — same route,
  same target, same canonical, noindex; `_redirects` copied verbatim (80 lines).
- ✅ 45 events (9 upcoming / 36 past) carried **verbatim** (bodies extracted
  from the Codex DOM, including prices, times, venues, outbound registration
  links, Google Calendar links and .ics downloads). All 45 anchors preserved.
- ✅ Past events live only inside the collapsed archive (36 dates · 2024–2026);
  upcoming list holds exactly the 9 current/future dates in order.
- ✅ Ten lessons: identical embeds (youtube-nocookie), titles, descriptions,
  copy, prev/next chains; course hub lists all ten in both chapters.
- ✅ Book/Learn/Festival/Contact deep content (road book, complete dossier,
  Four Loves credits, service guide, class guide, online coaching via Zoom,
  Garba Europe, refund policy) carried in full inside progressive folds.
- ⚠️ Deliberately not carried: the Codex whats-on "Past dates" teaser lists
  (city summaries per year) — redundant with the full archive on the same page.
  All facts remain available in the archive entries themselves.

## 2 · Facts

- ✅ ABC founded 2017 (checked in schema + copy on every page; no "2016").
- ✅ GIDF Edition Five: 7–9 May 2027 · Shoonya Dance Centre, Ghent. No invented
  faculty, schedules, prices or tickets ("announced as Edition Five takes shape").
- ✅ Kathak described as North Indian (Edition One timeline).
- ✅ Kalbeliya course 22 Apr, Semi-Classical & Lavani Brussels, Summer
  Intensive pricing (€40/€35/€30/€60/€150) — verbatim from the authority.
- ✅ Semester facts: €173 / €202 semi-classical 75 min; 14 Sep 2026 – 30 Jan
  2027; trial week 14–19 Sep; Tue/Wed/Thu evenings; class levels as approved.
- ✅ Private coaching is online via Zoom; no contradictory wording.
- ✅ No member/student pricing anywhere; public prices only.
- ✅ Photography credits preserved (Stijn Dejonckheere · Michael Backaert ·
  Jan Vens) — on frames, captions and the festival credit line (ASSET_MAP.md).

## 3 · Desktop (1512×982)

- ✅ All 9 sampled routes: no console/page errors, no horizontal overflow,
  no broken images, no stuck-hidden content after fast scrolling (automated).
- ✅ Visual pass of every act on home + all six section heroes + menu overlay +
  postcards + finale (screenshots reviewed at 2×).
- Fixed during review: curtain direction (was revealing the wrong end),
  stale `--p` after instant jumps, postcard captions escaping their cards
  (`.pc-img` inline → block), duplicated closing headings, stamps moved to the
  visual's top-left corner so they never sit on a performer.

## 4 · Tablet (1024×768)

- ✅ Automated suite green on all sampled routes (errors/overflow/images/scenes).

## 5 · Mobile (390×844)

- ✅ Automated suite green; art-direction reviewed by screenshot: hero keeps
  film + statement + both CTAs; manifesto pin runs full-width (side stage
  hidden); cutouts recompose below copy; trial-week badge never covers copy;
  timetable stacks day by day; hover previews and parallax disabled.
- Fixed during review: brand-name wrap, "curtain up" cue wrapping.

## 6 · Safari/WebKit

- ✅ Full WebKit suite green at all three sizes (same checks as Chromium),
  including menu focus trap — WebKit's no-focus-on-click behaviour handled by
  returning focus to the menu button explicitly.
- ✅ WebKit chosen source: master on desktop, light encode at 390px.
- ✅ Compositor discipline: transform/opacity-only animation, no filter/blend
  animation, drift elements carry no transform transitions, sticky pin has a
  solid section background behind it.
- ✅ Opened in desktop Safari for the final review (`open -a Safari`).
- Note: the embedded Claude preview pane froze its render surface mid-session
  (stale captures with a healthy DOM); verification moved to Playwright.
  Nothing site-side — real Chromium/WebKit render correctly.

## 7 · Readability

- ✅ Practical information stays plain: agenda rows expose date/title/city at
  summary level; event bodies keep meta rows (date/venue/time) before prose;
  timetable is a static table-like grid; no text over expressive photo regions.
- ✅ Ghost words and stamps are aria-hidden decoration and never carry facts.

## 8 · Links, forms and CTAs

- ✅ Every internal href/src on all 18 pages resolves (automated, per page).
- ✅ No `mailto:` or raw e-mail anywhere; contact routes to the approved
  Shoonya form (3 option cards + closing CTA), festival to @gentindiadansfestival.
- ✅ Every arrow glyph lives inside a real link or button — no fake affordances.
- ✅ Deep link chain test: `/whats-on/#kalbeliya…` auto-opens archive + entry.
- ✅ Calendar downloads: 44 .ics files, links verified per event.

## 9 · Motion & reduced motion

- ✅ Choreography per MOTION_SYSTEM.md; native scroll only (no scrolljack).
- ✅ Stagger counts capped (max 8 beats) so fast readers never wait.
- ✅ Marquees pause off-screen; scrub work gated to near-viewport elements.
- ✅ Reduced-motion automated run: `.reduce` applied, film paused on poster,
  zero hidden elements, manifesto fully lit and static — the complete
  composition with no movement. No-JS fallback uses the same guarantees.

## 10 · Performance

- ✅ Only two video encodes, chosen responsively (17 MB master never sent to
  phones; 4.6 MB mobile encode never sent to desktop).
- ✅ All below-fold images `loading="lazy" decoding="async"`; every local
  `<img>` ships intrinsic width/height (automated check) — no layout shift.
- ✅ Fonts self-hosted woff2 (8 files, ~0.6 MB total, `font-display: swap`);
  no Google Fonts request, no CDN, no JS libraries (engine is 13 KB unminified).
- ✅ rAF work is gated and coalesced; entrance transitions are one-shot.

## 11 · Accessibility

- ✅ Menu: focus enters on open, Tab loops, Escape closes, focus returns
  (verified in both engines at all sizes).
- ✅ Skip link, single h1 per page, labelled navs, aria-hidden on decoration,
  aria-labels on scene landmarks, 44px+ targets, `:focus-visible` styles on
  dark and light fields.
- ✅ Content order remains logical without CSS/JS; details/summary native.

## 12 · Metadata & structured data

- ✅ Canonicals + OG + Twitter on all 18 indexable pages (production URLs).
- ✅ Organization schema everywhere; FAQPage on book/learn/contact; 9 Event
  schemas on whats-on; Course on the hub; VideoObject + BreadcrumbList on all
  ten lessons. Redirect stubs keep noindex,follow + canonical to target.
- ✅ sitemap.xml (18 URLs) and robots.txt carried unchanged.

## 13 · Redirects

- ✅ 80/80 stubs verified: meta refresh target + canonical + branded card;
  `_redirects` file for the hosting layer identical to the authority.

## Second pass — scrollytelling amplification (19 July 2026)

Feedback: the first build read as entrance animations with a single pinned
scene. Amplified (checkpoint `v2-post-qa` is the pre-rewrite state):

- Generalized pin engine: every `[data-pin]` chapter now exposes `--pp`.
- Home Act II is a pinned 260 vh chapter — the GIDF finale photograph grows
  from a programme card into the full-bleed stage while the STAGE ghost tracks
  sideways and the image pans inside its mask.
- Home Act VI: vertical scroll drives the postcard strip horizontally
  (1:1 travel mapping, desktop only; native drag strip remains the mobile and
  reduced-motion fallback).
- Overture exit: the statement lifts and dims as the film scrolls away,
  handing off to the curtain-up moment.
- Festival: the four-edition timeline draws its own progress line.
- Ghost-word drift amplitudes raised (felt, not subliminal).
- Re-ran both suites after the rewrite: static 1167/1167, browser 238/238
  (Chromium + WebKit × 3 viewports + reduced motion). Checkpoint `v3-scrollytelling`.

## Checkpoints

- `checkpoints/v1-first-complete-build/` — first full 99-file build, before
  the review fix pass (media folder excluded to keep the snapshot light;
  restore media from `assets/media/` if ever rolled back).
- `checkpoints/v2-post-qa/` — the state matching this audit, after all QA
  fixes (same media note).

## Open notes

- The manifesto media stage is hidden ≤ 980 px by design (the lines + colour
  shifts carry the moment); revisit if a mobile-side stage is ever wanted.
- `abc-mark.png` (wordmark lockup) and the four excluded public-participant
  photos remain unused by design — see ASSET_MAP.md.
- Not deployed; no git history created. Local preview via `scripts/serve.mjs`.

## v4 — Recomposition: dancers first, content visible by default (19 July 2026)

Driven by the joint diagnosis (exports/diagnosis/) and Swapnil's photo review:

- **Root cause 1 fixed:** all hidden pre-states and curtain covers removed.
  Entrances are now short settle animations on scene entry; without JS, without
  the observer, or mid fast-scroll, every element is fully visible. New QA
  guard: each key page is loaded with JavaScript disabled and its practical
  content (timetable, event board, refunds, galleries) must be visible — 12
  checks across both engines.
- **Root cause 2 fixed:** stage pin and postcard pin removed (manifesto pin
  kept, runway 330vh→220vh). Homepage height 13,486px → 10,177px; every page
  now carries content through its full height (re-captured flat renders in
  exports/diagnosis/).
- **Root cause 3 fixed:** postcards moved to bone, Book dates to bone; night
  remains only for stage moments (home Act II + finale, Book hero/productions,
  archive shells). Hero wash lightened.
- **Root cause 5 fixed:** 14 GIDF Gala 2023 photographs placed per corrected
  provenance (students → GIDF contexts, artists → GIDF, ABC sets → company
  slots). Anarkali cutout retired to Learn hero only. Credits captioned on
  every new frame (PC Jan Vens / PC Michael Backaert).
- Root cause 4 (slogans) partially addressed: act heads on home lean
  informative; full slogan pass still open for review.
- Suites after recomposition: static 1187/1187 · browser 250/250
  (Chromium + WebKit × 3 viewports, reduced motion, no-JS visibility, menu
  focus, deep links). Checkpoint: `checkpoints/v4-recomposition/`.

## v5 — Company + navigation restructure (19 July 2026)

Driven by Swapnil's feedback (every dancer needs a picture; the homepage
didn't highlight the company; findability was poor — unclear which events are
upcoming or how to reach a section).

- **13 ABC dancer cutouts** (Codex-supplied transparent PNGs, one per roster
  member) cast across the site. All are named ABC company members, so no
  student/guest provenance ambiguity. Svetlana was cropped to a clean
  head-and-shoulders (her cutout retained public bystanders); Srimahavalli
  shows a faint second company dancer (same white costume) — noted, not a
  privacy issue. Heavy PNGs web-capped to ≤1600px.
- **Homepage now highlights the company**: the manifesto assembles three
  dancers as you scroll; a new "Meet the company — thirteen dancers, one
  company" section presents seven cutouts + "Meet all thirteen →" to About.
- **About = a real company grid**: all 13 dancers, each with name + picture.
- **Persistent desktop nav** in the header (Performances/Classes/What's On/
  Festival/About/Contact, current marked); hamburger fullscreen menu retained
  for < 1101px only. The redundant per-page route-bar was removed.
- **What's On findability**: a sticky "9 Upcoming / 36 Past archive" jump bar,
  explicit "Upcoming events · 9 dates" heading, hero CTAs → Upcoming / Past.
- **Homepage events** clearly labelled "Upcoming events · next 5 dates".
- New QA guards added earlier (touch targets, copy lint, duplicate headings,
  stretched images) all extended cleanly. Suites: static 1,562 · browser 320,
  both green (Chromium + WebKit; the browser menu test now asserts the
  persistent nav at desktop and the hamburger flow at tablet/phone).
  Checkpoint: `checkpoints/v5-company-nav`.
