# MOTION SYSTEM — Fable 5 Motion Concept

The site is staged as a live performance. Motion is choreography, not decoration:
every scene has **anticipation → entrance → acceleration → pause → release**, and
imagery moves like performers, not thumbnails.

No animation library. One 300-line engine (`assets/js/fable.js`) + CSS custom
properties. Native scrolling everywhere — nothing hijacks the wheel.

---

## v6 — the cinematic layer (homepage only)

`assets/css/cinematic.css` loads only on pages with `def.cinematic`. It adds a
camera on top of the vocabulary below; nothing in it changes the other pages.

| Hook | What it does |
|---|---|
| `.stage` / `.rig` | The camera. `.stage` owns `perspective`, `.rig` is the moving rig with `preserve-3d`. Real Z-depth, so parallax is a by-product of perspective rather than a hand-tuned offset. |
| `[data-roll]` → masked roll | The statement rolls through a **masked window** one line at a time. Text is never cross-faded in place — two semi-transparent lines in one position double-expose and become unreadable. JS measures the tallest line and sets the window height (and `minHeight: 0`, or the CSS placeholder wins). |
| `[data-track]` → lateral travel | Vertical scroll mapped **1:1** to horizontal travel across the postcard strip; the pin's height is `innerHeight + travel`, so nothing is ever scrubbed faster than the wheel moves. |
| `.cut` / `.cut-day` | `clip-path: inset()` wipe from night into daylight. |
| `.collage figure` | Frames assemble out of depth via pure CSS custom properties (`--start`, `--depth`, derived `--k`) — no JS per frame. |
| `.curtain` | The one-time intro, gated by `sessionStorage` (`abc-curtain`) and skippable. It covers nothing after it lifts. |

Two rules the scenes are built on, both learned the hard way:

- **Dissolve is for photographs, never for text.** Text transitions roll.
- **Copy on a dark ground gets its colour from the scene container**, not from
  each copy block. Three blocks shipped inheriting `--ink` on `--night`.
- **A camera move needs distance to travel.** The crane, the gather and the
  finale all stack on narrow viewports rather than staging a move a phone is
  too small to show.

### Where the camera is allowed (v6.1)

The homepage is a narrative and can afford pinned scenes. The other six pages
are lookup surfaces, so the camera is confined to the hero:

| | Homepage | Six inner pages |
|---|---|---|
| Pinned scenes | yes, seven of them | never |
| Hero camera | overture pin | crane (photographs) / step-forward (cutouts) |
| Photo groups | assemble out of depth, scrubbed | assemble out of depth, on entrance |
| Practical content (agenda, timetable, prices, folds) | no camera movement | no camera movement |

Applying it globally needs two guards: `:not([data-scrub])` on anything that
already writes `transform` from `--p` (two rules on one transform fight every
frame), and `backwards` fill plus explicit `.no-js` / `.reduce` resets on every
new animation.

---

## The vocabulary

| Hook | What it does | Where it's used |
|---|---|---|
| `[data-scene]` | A scene. When ~12% enters the viewport it gets `.is-on`, once. | Every section |
| `.fx` (+ `.fx-left`, `.fx-right`, `.fx-scale`, `.fx-tilt`) | Ensemble entrance: children rise/slide in together, one count apart (`--step × --beat`, 95 ms). Steps are auto-numbered in DOM order. | Copy, cards, rows, figures |
| `.mask-line > span` | Big type rises out of a clipped line — the headline entrance. | All display headlines |
| `.solo` | The serif-italic word arrives two counts late with a settle (`--swing` easing). Every headline has exactly one soloist. | All display headlines |
| `.sweep` | A stage-light band sweeps across the surface once on entrance (transform-only). | Hero images, panorama, posters |
| `[data-scrub]` → `--p` | Element's progress through the viewport (0→1), written by rAF. CSS decides what `--p` drives. | Parallax, curtains, video |
| `.drift` / `.drift-x` | Consumes `--p` for parallax (±30–90 px, `translate3d`-composited). Never combined with a transform *transition* (that would restart the transition every frame). | Ghost words, cutouts, collage |
| ~~`.curtain`~~ | **Removed in v4** — no element may cover or hide content. | — |
| `[data-pin]` → `--pp` | The one remaining pinned chapter: a `position: sticky` frame inside a 220 vh wrapper; the engine writes pin progress `--pp` (0→1). Native scroll; no scrolljack. | Home Act I only |
| · manifesto (`data-pin-phases`) | Each "Not one…" line brightens in turn (base opacity .55 — always readable), the photo stage swaps per line (`data-phase` 1–3), background shifts night → deep cobalt → cobalt. | Home Act I |
| ~~`.stagepin`~~ / ~~`.pc-pin`~~ | **Removed in v4** — the panorama is a full-bleed frame with a gentle internal pan; the postcard strip is draggable on all devices. | — |
| hero exit | The overture's statement lifts and dims (`--p`-driven) as the film scrolls away — the hand-off into the curtain-up moment. | Home overture |
| timeline draw | The editions line draws itself (`scaleY` by `--p`) alongside the four-edition history. | Festival archive |
| `[data-stage]` | Followspot: a radial pool of light tracks the pointer. Fine pointers only. | Night/cobalt sections |
| `[data-marquee]` | Ribbon marquees; paused whenever off-screen. | Chapter ribbons, footer |
| `[data-preview]` | Hover photo preview floats near the cursor (thisisamit-style discovery). Supplementary only — the row text carries all information. Fine pointers ≥ 900 px only. | Agenda rows, book dates |
| `[data-cue]` + act rail | Vertical surtitle on the right names the current act ("ACT II · ON STAGE"), crossfading via IntersectionObserver. | All pages ≥ 1100 px |
| `.stamp` | Circular personality stamp pops in on the fourth count (scale + rotate, `--swing`). Positioned so it never covers headings, dates or controls. | Page heroes |

### Musical structure per scene
- **Anticipation:** pre-states (opacity 0, offset 30 px) exist only under `html.js:not(.reduce)` — the page never hides content without JS.
- **Entrance:** `.is-on` releases the ensemble on counts; headlines mask-rise; the soloist settles last.
- **Acceleration:** marquees + counters + sweep, immediately after the entrance beat.
- **Pause:** reading surfaces (timetable, event bodies, FAQs, archives) are deliberately still.
- **Release:** each page ends with a curtain-call closing scene; the homepage finale bows out with the Tera Taali cutout and the giant DANCE ghost.

### Imagery as performers
See `ASSET_MAP.md` for each image's narrative role. Treatments: masked frame
rises, drifting depth (opposing directions in collages), panorama that breathes
inside its mask (scale ≤ 1.05 — never beyond retina safety), poster tilt with
shadow, cutouts entering like dancers (drop-shadow, contain-fit, overlap ghost
type but never copy).

---

## Triggers

- **IntersectionObserver** (threshold .12, −6% bottom margin) → scene entrances; once only. Anything already in view on load resolves immediately (deep links).
- **rAF loop** gated by a second IntersectionObserver (±30% margin) → writes `--p` for `[data-scrub]` elements near the viewport. Every gate change also schedules a pass, so instant jumps (anchors, restored scroll) never leave stale curtains or parallax.
- **Pointer events** (passive) → followspot, card glow, hover previews.
- **`toggle` on `<details>`** → fold-open animation, `.just-opened`, 520 ms.
- **`hashchange`/load** → deep links auto-open their `<details>` ancestor chain (event archive, folds).

## Reduced motion — the complete still performance

`prefers-reduced-motion: reduce` (live-updating media query + `.reduce` class):

- All pre-states removed — every element visible in its final composition.
- Manifesto: no pin height, all three lines lit, first photo shown, static.
- Curtains, sweeps, followspot, parallax, stamps' pop: off (stamps stay, still).
- Marquees become a single static row (no duplicate set, no animation).
- Hero film pauses on its poster frame; the Pause/Play control still works.
- Scroll behavior: auto (no smooth scrolling).

The still version is a designed layout, not a degraded one: nothing overlaps,
nothing is missing, captions and credits all present.

## No-JS

Same guarantee as reduced motion: `html.no-js` never applies pre-states, the
marquee shows one static set, the manifesto renders as a normal section, all
`<details>` work natively, the video keeps its `autoplay muted loop playsinline`
attributes and poster.

## Mobile adaptation (≤ 900 px)

- Parallax, hover previews, followspot: off (touch/coarse pointers).
- Scene entrances remain, with a shorter rise (20 px) — entrances read on touch.
- Manifesto keeps the pin but hides the side stage; the lines and background
  shifts carry the moment full-width.
- Every image is recomposed: panorama becomes a 4:3 crop, collages become
  stacked grids, cutouts move below copy at reduced scale, stamps reposition
  into the flow (never over text).
- Act rail hidden < 1100 px; chapter ribbons slow down and shrink.
- Touch targets ≥ 44 px throughout (buttons, rows, summaries, footer links).

## Safari/WebKit discipline

- Animated properties: `transform` and `opacity` only. No filter/blur
  animation, no `mix-blend-mode` on moving elements, no animated text-stroke.
- `backdrop-filter` only on small fixed chrome (video control, glass button).
- Drifting elements never carry transform transitions (no per-frame transition
  churn); `will-change` only on the few persistent scrub consumers.
- Sticky pinning uses plain `position: sticky` with a solid-background parent,
  so a compositing hiccup can never expose the page background.
- The hero `<video>` keeps intrinsic 1920×1080 dimensions, a poster, and
  responsive source selection (phones get the lighter encode).

## v4 principle — motion is an accent, never a gatekeeper

The system was rebuilt after the 19 July diagnosis: every element is visible
by default in every state. Scene entrances are `animation`-based settles that
fire only when a scene enters; no pre-hidden states, no curtain covers, no
scroll-dependent visibility. Pins reduced to one (the manifesto, 220vh).
The stage panorama and postcard strip are unpinned; the strip is draggable on
all devices. If JavaScript never runs, the site is simply still — and whole.

## v5 — company cutouts + navigation

- **Dancer cutouts as cast**: the manifesto assembles three ABC dancers (one
  per "Not one…" line, accumulating by phase); the homepage "Meet the company"
  strip and the About 13-grid enter on staggered `.fx` counts. All cutout imgs
  use `object-fit: contain` so no flex context can distort them.
- **Persistent header nav** (≥1101px) replaces the hamburger for findability;
  the fullscreen menu + focus-trap remains the <1101px model. Reduced-motion
  and no-JS are unaffected (nav is plain links).
