# ASSET MAP — Fable 5 Motion Concept

> **v4.1:** the "THIS IS ABC" manifesto now shows ABC frames only (Swapnil's
> catch — guest artists next to that statement contradicted it). Guest-artist
> frames live on the festival page.
>
> **v4 update (19 July 2026) — the dancers take the stage.**
> After Swapnil's review: the white-anarkali cutout was carrying four prominent
> slots; it now has exactly one home (the Learn hero). Nineteen frames from the
> GIDF 2023 Gala sets were approved and fourteen placed, with provenance rules
> he confirmed:
> - **Jan Vens "ensemble energy" set = Shoonya students, not ABC** → usable in
>   GIDF/festival contexts only, captioned as students.
> - **Jan Vens solo artists = GIDF guest artists** → GIDF contexts, credited.
> - **Jan Vens theatrical set + Michael Backaert Garba set = ABC company** →
>   usable anywhere ABC speaks as a company.
> - Kristof Pieters workshop set: excluded (participants); name unused.
> New files live in `assets/img/abc/` (company) and `assets/img/gala2023/`
> (festival contexts). Full placement list in the v4 section at the end.

Every approved image, what it shows, where it performs, and how.
Principle: **images are performers, not thumbnails.** Each photograph has one
primary narrative home; the two transparent cutouts and the ABC mark are
*recurring characters* that may re-enter across pages, like ensemble members.
The end-of-homepage postcard strip is the one deliberate "curtain call" where
photographs from other scenes reappear as small captioned postcards.

Source of truth: `ABC Codex Rebuild 2026-07-16/assets/img/` (copied unmodified
into `assets/img/`). No image is scaled beyond its intrinsic pixels; all
placements use `object-fit: cover` crops or intrinsic-ratio frames, never
stretching. Reduced-motion keeps every final composition fully assembled.

---

## Marks

### `abc-mark-clean.png` — 1351×1026, transparent
- **Depicts:** the ABC calligraphic mark: yellow letterforms with the red bindi dot.
- **Provenance:** official ABC identity (shared Design System). No credit needed.
- **Role:** brand mark in header, footer, favicon; oversized graphic gesture in the
  story scene; small punctuation in performance breaks.
- **Desktop:** header 54px; story scene at ~200px with slow parallax drift.
- **Mobile:** header 54px; story mark ~120px. Never overlaps text.

### `abc-mark.png` — mark + wordmark lockup
- **Depicts:** same mark with "A BOLLYWOOD COMPANY" set beneath.
- **Status:** NOT PLACED — the site sets the company name in live text next to the
  clean mark (accessibility + sharpness). Kept in assets for parity.

### `favicon.svg`
- **Status:** kept in assets; pages use the PNG mark as favicon (matches Codex build).

---

## Cutouts — recurring performers (transparent PNGs)

### `cutouts/anarkali-wide.png` — 770×1200
- **Depicts:** Swapnil Dagliya mid-turn in a white Anarkali, arms raised, gaze up —
  the soloist in flight.
- **Provenance:** company material (artistic director). Credit: company archive.
- **Restrictions:** none (company's own performer).
- **Role — "the soloist" (v4: ONE home only):**
  - LEARN hero: enters from stage right as the invitation to move ("start where
    your feet are"). All other placements retired per Swapnil's feedback.
- **Desktop:** large (up to ~55vh), overlapping the ghost word, drifting 30–40px
  on scroll; never covers headings or buttons.
- **Mobile:** placed below copy at reduced scale, static; badge/notes reposition
  so nothing is covered.

### `cutouts/tera-taali.png` — 1012×959
- **Depicts:** Swapnil seated in full Tera Taali costume — brass pots stacked on his
  head, manjeera in hand, huge smile. Pure showman warmth.
- **Provenance:** company material. Credit: company archive.
- **Restrictions:** none.
- **Role — "the host":**
  - CONTACT hero: welcomes the visitor ("tell us what you're planning").
  - HOME finale: takes the bow in the curtain-call scene.
- **Desktop:** finale ~520px wide, gentle drift; contact hero right column.
- **Mobile:** below copy, centred, static.

---

## GIDF stage photography (credited)

### `gidf/finale-hero.jpg` — 2000×1333 · PC Stijn Dejonckheere
- **Depicts:** the GIDF Gala finale — ~25 dancers in Garba dress mid-move, audience
  silhouettes in the foreground, warm reds against the blue-lit floor.
- **Role — "the company portrait":** HOME Act II full-bleed panorama (the single
  biggest photographic moment on the site); also hero-video poster frame and the
  site's OG image (unchanged production URLs).
- **Desktop:** edge-to-edge cinema strip (~80vh) with scroll parallax inside a
  masked frame; stage-light sweep on entrance; copy sits on the night gradient
  below, never on faces.
- **Mobile:** full-width 4:3 crop centred on the front line of dancers; no parallax.

### `gidf/kalbeliya-swapnil-kalbeliya-stijn-dejonckheere.jpg` — 800×1200 · PC Stijn Dejonckheere
- **Depicts:** Swapnil swirling a cobalt-blue skirt, black costume with red pompoms,
  outdoor festival light. The most kinetic single frame in the library.
- **Role (v4):** ABOUT founder portrait + FESTIVAL workshop-format card + HOME
  postcard. (Book hero now belongs to the company Garba ensemble.)
- **Desktop (ABOUT):** tall portrait beside the founder biography.
- **Mobile:** 3:4 crop under the headline, static.

### `gidf/julien-gala-showcase-pc-stijn-dejonckheere.jpg` — 1400×933 · PC Stijn Dejonckheere
- **Depicts:** solo artist silhouetted in red under a single blue beam, candles
  ringing a blue mat. Stillness and theatre.
- **Role — "the held breath":** FESTIVAL gallery (gala showcase) and the 404 page
  backdrop (an empty stage, one light — "wrong turn").
- **Desktop:** gallery frame; on 404 a dimmed full-bleed backdrop behind the card.
- **Mobile:** same, cropped toward the figure.

### `gidf/vanisha-kathak-pc-stijn-dejonckheere.jpg` — 933×1400 · PC Stijn Dejonckheere
- **Depicts:** Kathak artist kneeling in violet smoke, red rim light. North India's
  Kathak, treated with reverence.
- **Role — "the tradition":** FESTIVAL hero floating portrait; HOME Act V collage
  (festival teaser).
- **Desktop:** portrait frame with slow drift opposing the main image.
- **Mobile:** stacked collage cell, static.

### `gidf/aakansha-bollypop-kalbeliya-pc-stijn-dejonckheere.jpg` — ~2000×1333 · PC Stijn Dejonckheere
- **Depicts:** Kalbeliya artist mid-spin, orange veil, black mirrored skirt, single
  amber spot through smoke.
- **Status:** newly introduced (credited solo artist; unused in the Codex build).
- **Role — "the reveal":** FESTIVAL hero main image — the festival world opens on
  this frame.
- **Desktop:** large 3:2 frame, stage-light sweep on entrance.
- **Mobile:** 3:2 full-width, static.

### `gidf/tera-taali-gidf-2023.jpg` — 2400×1613 · PC Michael Backaert (GIDF watermark)
- **Depicts:** Terah Taali artist in green mirrored vest playing manjeera, violet
  haze. From the first edition, 2023.
- **Role — "the origin":** FESTIVAL timeline (Edition One, 2023) and HOME postcard
  strip (as a captioned postcard).
- **Desktop/mobile:** timeline-adjacent frame; watermark corner kept visible
  (it carries the festival lockup + photographer mark).

### `gidf/swapnil-gidf-2023-pink-smoke.jpg` — 2400×1600 · PC Stijn Dejonckheere
- **Depicts:** Swapnil in the white Anarkali inside pink smoke — GIDF 2023 Gala
  Showcase (the year The Four Loves excerpts played the gala).
- **Role — "the production mood":** BOOK original-productions scene, captioned
  honestly as *GIDF Gala Showcase 2023 · Photography Stijn Dejonckheere* so the
  provenance stays truthful.
- **Desktop:** wide mood frame behind/beside The Four Loves credits fold.
- **Mobile:** 3:2 crop above the credits fold.

### `gidf/edition-five-2027.jpg` — 1080×1350 · official artwork
- **Depicts:** the Edition Five announcement poster — "GIDF · Until we dance again ·
  7–9 May 2027".
- **Role:** FESTIVAL Edition Five scene, treated as a physical poster (tilt +
  shadow). Never cropped — the artwork carries its own typography.
- **Restrictions:** poster only; do not crop or overlay text on it.

---

## Event photography & artwork

### `events/benenwerk-2026.jpg` — 1400×932
- **Depicts:** ABC company mid-Garba on the Benenwerk stage — skirts in motion,
  Swapnil in green jacket centre.
- **Role — "on the road":** WHATS-ON hero (the agenda opens on the company mid-gig)
  + HOME postcard + HOME agenda hover preview.
- **Desktop:** whats-on hero frame with sweep; hover preview elsewhere.
- **Mobile:** 4:3 crop, static.

### `events/bhangra-starter-series-2026.jpg` — 1400×2105
- **Depicts:** Swapnil airborne mid-Bhangra with two company dancers, yellow/green
  against a cobalt cyc — theatre light.
- **Role — "the company at work":** ABOUT hero portrait (the ensemble in motion is
  the company's best self-portrait) + HOME postcard.
- **Desktop:** tall portrait, generous scale beside the About headline.
- **Mobile:** 3:4 crop below headline.

### `events/gentse-feesten-2026.jpg` — 1400×933
- **Depicts:** Swapnil leading an outdoor session at Gentse Feesten (public
  learning in frame — already approved and published by the Codex build for this
  exact event).
- **Role:** WHATS-ON feature card for Gentse Feesten 2026 only + HOME agenda hover
  preview for the same event. Not used in any other context.

### `events/opendeurdag-2026.jpg` — 1400×933
- **Depicts:** a class mid-sun-salutation in the Shoonya attic studio (already
  approved and published by the Codex build).
- **Role — "the studio where you'll learn":** LEARN teacher/studio scene + HOME agenda
  hover preview for Opendeurdag.

### `events/summer-intensive-2026.png` — 1080×1350 · official artwork
- **Depicts:** the Summer Intensive poster (B&W Terah Taali frame, "26–29 August").
- **Role:** WHATS-ON intensive feature — **this artwork and nothing else** signals
  the Summer Intensive. Poster treatment, uncropped.

### Excluded from all page compositions (privacy — public participants lead the frame)
- `events/dansen-in-t-park-2026.jpg` (open-air crowd, children recognisable)
- `events/dokfeesten-2026.jpg` (street crowd behind performer)
- `events/dance-yoga-summer-retreat-2026.jpg` (retreat guests on mats)
- `gidf/opening-party.jpg` (public crowd with children, front and centre)

These stay in `assets/img/` for archival parity but are not referenced by any
page, matching the Codex build's deliberate exclusion. Events without an
approved photo get typographic/date-led treatments instead.

---

## Motion treatments applied to imagery (summary)

- **Entrances:** masked rise (frame clips, image slides up 30–60px), ensemble
  stagger with the scene's other elements, stage-light sweep across the surface.
- **Depth:** scroll drift (±30–90px translate) on desktop fine-pointer only.
- **Scale changes:** the Act II panorama breathes (subtle scale inside mask);
  cutouts enter oversized and settle.
- **Masks:** all photographic frames are overflow-clipped rounded rectangles;
  cutouts are free silhouettes allowed to overlap ghost type, never copy.
- **Stillness:** galleries, timelines and event bodies hold still for reading.
- **Reduced motion:** every image present, fully composed, zero movement.
- **Mobile:** no parallax; images recomposed as stacked, art-directed crops with
  intrinsic dimensions; hover previews disabled entirely.

---

## v4 placements — GIDF Gala 2023 intake (19 July 2026)

### ABC company (`assets/img/abc/`) — may represent ABC anywhere
| File | Shows | Placement | Credit |
|---|---|---|---|
| `garba-ensemble-gala2023-backaert.jpg` | ABC Garba ensemble, mirrored costumes | BOOK hero + HOME postcard | PC Michael Backaert |
| `garba-company-gala2023-backaert.jpg` (portrait) | Company mid-Garba, Swapnil centre | ABOUT hero | PC Michael Backaert |
| `garba-trio-gala2023-backaert.jpg` | Three dancers turning | HOME Act IV (Start dancing) | PC Michael Backaert |
| `garba-duo-gala2023-backaert.jpg` | Two skirts mid-spin in the dark | WHATS-ON past-archive header | PC Michael Backaert |
| `skirt-spin-gala2023-backaert.jpg` | Skirt at full spin | FESTIVAL gallery | PC Michael Backaert |
| `terah-taali-red-gala2023-jan-vens.jpg` | Terah Taali in red smoke | BOOK productions | PC Jan Vens |
| `anarkali-ensemble-gala2023-jan-vens.jpg` | White Anarkali + ensemble | BOOK productions | PC Jan Vens |
| `rajasthani-set-gala2023-jan-vens.jpg` | Rajasthani set in red | HOME manifesto "Not one dance." | PC Jan Vens |

### GIDF artists (`assets/img/gala2023/artist-*`) — festival contexts, credited
| File | Placement |
|---|---|
| `artist-peach-anarkali-jan-vens.jpg` | FESTIVAL gallery (guest artist — moved off the ABC manifesto) |
| `artist-mudra-jan-vens.jpg` | FESTIVAL "not one thing" scene |
| `artist-semiclassical-jan-vens.jpg` | FESTIVAL gallery |
| `artist-seated-spin-jan-vens.jpg` | FESTIVAL gallery |

### Shoonya students (`assets/img/gala2023/students-*`) — GIDF contexts ONLY, captioned as students
| File | Placement |
|---|---|
| `students-gala-wave-jan-vens.jpg` | FESTIVAL "what is GIDF" (caption: students share the gala stage) |
| `students-sticks-jan-vens.jpg` | FESTIVAL gallery (caption: students on stage) |

### Retired / corrected placements
- `cutouts/anarkali-wide.png` → LEARN hero **only** (was: home manifesto, home Act IV, about founder).
- `cutouts/tera-taali.png` → CONTACT hero + HOME finale (unchanged pending decision on `mb-34`).
- `events/bhangra-starter-series-2026.jpg` → HOME postcard only (was also About hero).
- `gidf/kalbeliya-swapnil-*.jpg` → ABOUT founder + FESTIVAL workshop card + HOME postcard (was Book hero).
- `gidf/swapnil-gidf-2023-pink-smoke.jpg` → HOME manifesto "Not one way to move." (ABC frame; captioned GIDF Gala 2023).
- `gidf/finale-hero.jpg` → HOME Act II panorama + video poster + OG (unchanged).
- Approved but unplaced (available): `mb-34` (Swapnil mid-Garba — optional Home-finale replacement), remaining shortlist frames stay in `exports/photo-shortlist/candidates/`.

---

## v5 — ABC dancer cutouts (the roster, transparent PNGs)

Source: `ABC-Website/assets/img/dancers/cutouts/` (Codex-supplied, one per
roster member) → copied into `assets/img/dancers/`, heavy files web-capped to
≤1600px long edge. **All 13 are named ABC company members — no student/guest
ambiguity; every one is ABC.**

| File | Dancer | Notes | Placement |
|---|---|---|---|
| swapnil-dagliya | Swapnil Dagliya | seated red robe | Home manifesto (line 3) · Home Meet-the-company · About grid |
| narcisse-merlier | Narcisse Merlier | skirt-spin showpiece; faint side-dancers vignetted | Home manifesto (line 1) · Home strip · About grid |
| chiara-bisinelli | Chiara Bisinelli | arm raised | Home manifesto (line 2) · Home strip · About grid |
| kaushika-kumar | Kaushika Kumar | arm reaching | Home strip · About grid |
| laurien-de-ridder | Laurien De Ridder | namaste | Learn hero (welcoming guide) · Home strip · About grid |
| khushboo-agarwal | Khushboo Agarwal | hand to neck | Home strip · About grid |
| roshni-tela | Roshni Tela | green nauvari, hand on hip | Home strip · About grid |
| sara-van-holm | Sara Van Holm | mid-turn, clean | About grid |
| shreya-vaidya | Shreya Vaidya | red veil (low-res, small use) | About grid |
| siddhy-ganesh-shetty | Siddhy Ganesh Shetty | skirt swish (low-res) | About grid |
| haike-bourgeois | Haike Bourgeois | portrait (low-res) | About grid |
| svetlana-bubnova | Svetlana Bubnova | **cropped to head-shoulders** — the full cutout retained public bystanders | About grid |
| srimahavalli-thiyagarajan | Srimahavalli Thiyagarajan | faint second ABC dancer behind (same white costume) | About grid |

Retired: the Swapnil-only `cutouts/anarkali-wide.png` (was Learn hero → now
Laurien) — kept in assets. `cutouts/tera-taali.png` still on Contact + Home
finale. Cutout imgs use `object-fit: contain` everywhere so they never distort.

## Showcase reel — festival page `#showcase`

Twelve acts across four editions. The three 2023 guest solos — **Shreyashee Nag,
Girish Kumar, Jana Jayanti** — replace the anonymous 2023 Bhangra ensemble,
because named guests show the festival's breadth better.

Their raw *footage* is a small, dim figure on a wide black stage, so instead of
video these three slots use the **professional stills** — sharp, well-lit, the
dancer large — shown Ken-Burns style with the reel's push-in. The reel engine
gained a still-slot mode: `<li data-still>` shows the poster with no `src` and no
playback, while opacity cross-fade and the scale push-in still apply.

| Guest | Photo | Credit |
|---|---|---|
| Shreyashee Nag | `indisch feest_01915.jpg` (spinning skirt) | Joëlle Verbeeck |
| Girish Kumar | `GIDF Jan Vens45.jpg` (deep lunge) | Jan Vens |
| Jana Jayanti | `GIDF Jan Vens51.jpg` (backbend) | Jan Vens |

Cropped to 1280×720, ~150–200KB each, in `assets/media/editions/guest-*.jpg`.
Photographer credit by filename convention: `GIDF Jan Vens*` = Jan Vens,
`indisch feest_*` = Joëlle Verbeeck (© visible on the frame), `Michael Backaert*`
= Michael Backaert.

**Correction to an earlier claim:** I had said the 2023 solos were unusable after
sampling only two or three moments of two of the three files — I never opened
Shreyashee at all. All three are usable once punched. Well-lit Michael Backaert /
Jan Vens stills of each also exist in `2023/Videos & Pictures/<name>/Pictures/`
if a photo is ever wanted instead.

| # | Act | Credit |
|---|---|---|
| 1 | Rajasthani | Colleena Shakti · GIDF 2026 |
| 2 | Kathak | Vanisha · GIDF 2024 |
| 3 | Madhuri Medley | Bollywood students & ABC · GIDF 2026 |
| 4 | Solo | Shampa Gopikrishna · GIDF 2025 |
| 5 | Bhangra | Ensemble · GIDF 2023 |
| 6 | Solo | Julien · GIDF 2024 |
| 7 | Bhangra | Bhangra students · GIDF 2026 |
| 8 | Ghoomar | Bollyfolk students · GIDF 2026 |
| 9 | Semi-classical | ABC · GIDF 2026 |
| 10 | Grand Finale | GIDF 2026 |

`data-clip` now carries the folder (`showcase/…` or `editions/…`) so the reel can
mix current-edition acts with archive clips.

**No clip repeats the archive track below it.** The previous-year entries use
`reel-2023/24/25` — different in-points from the `edition-*` files the four
editions cards use — so the same moment never plays twice on one page.



The six-tile grid was replaced by a single cross-faded reel of all ten acts:
3s sections, 700ms crossfade, with a slow push-in so movement carries across
each blend. One clip decodes at a time instead of six, so the page is lighter
than the grid it replaced.

The `.reel-stills` list is the real content — ten posters with credits. It is
what renders with no JavaScript and under reduced motion, and it stays in the
accessibility tree (clipped, not `display:none`) while the reel plays, so the
credits are always available. Verified: 0 video requests before the section is
scrolled to, 0 under reduced motion, playback stops when it scrolls away.

### Source clips

Six 6s silent loops cut with `avconvert` from the GIDF 2026 Gala Showcase
recordings. Acts identified by Swapnil from a contact sheet of both files; the
full act list with timecodes is at
`Projects/GIDF/2026/GIDF-2026-Showcase-Act-List.md`.

| Clip | Source | In-point | Credit shown |
|---|---|---|---|
| `colleena-rajasthani` | Part 2 | 877s | Rajasthani · **Colleena Shakti** |
| `skirts` | Part 2 | 1197s | Madhuri Medley · Bollywood students &amp; ABC |
| `shampa-garba` | Part 1 | 2016s | Garba · **Shampa Gopikrishna** |
| `folk-line` | Part 1 | 601s | Ghoomar · Bollyfolk students |
| `ensemble` | Part 1 | 1500s | Bhangra · Bhangra students |
| `curtain-call` | Part 2 | 2098s | Grand Finale |

**Attribution rule:** guest artists are named. Student work is credited to the
students and is never presented as ABC — the only act billed as ABC alone
(Part 2, 08:30 semi-classical) is not currently used.

Each clip ships as `*.mp4` (640×360, ~1.7MB) for phones, `*-hd.mp4` (960×540,
~3.5MB) for ≥761px, and a `.jpg` poster. Nothing is fetched until the tile is on
screen; playback stops when it leaves; reduced motion loads no video at all and
the poster stands in.

### Rejected after viewing (filenames are not provenance)

- `GIDF 2025 Finale.mp4` — a workshop montage with burned-in title cards and
  identifiable participants, despite the name.
- `Ghar More Pardesiya GIDF 2025.mp4` — studio floor with the audience seated in
  shot, faces identifiable.
- `Lavesh Bhangra Horizontal2.MOV`, `Lavesh Bhangra GIDF 2025 Vertical.mp4` —
  neither says "workshop"; both are the studio floor with participants.
- `Shampa Gopikrishna-1.mp4` — a vertical promo, not a performance.
- `series-launch-trailer.mp4` — dated title card ("FRIDAY 26 JUNE").

Workshop footage is excluded throughout, by Swapnil's decision: participants
have not consented to appear on a public site. Stage performance only.

## Hero video (v6.4) — homepage overture

Re-cut because the hero read as "unclear". The cause was bitrate, not resolution:
the desktop file was 1080p at **3.2 Mbps**, and the mobile file was full 1080p at
**873 kbps** — a 1080p frame starved of bits and then cropped hard to portrait.

Source: `~/Movies/GIDF 2025/Semi-classical GIDF 2025 Ishq Hain.mp4`
(1920×1080, 31 Mbps), in-point 96s. Carries the Gent India Dans Festival
watermark bottom-right, which Swapnil confirmed is fine.

| | before | after |
|---|---|---|
| desktop | 1080p · 3.2 Mbps · 44s · 17.9MB | 1080p · **14.3 Mbps** · 10s · 18.0MB |
| mobile | 1080p · 0.87 Mbps · 44s · 4.6MB | 960×540 · **6.6 Mbps** · 8s · 7.0MB |

The trade is a shorter loop for a sharper picture at the same desktop weight.
`avconvert` (the only encoder on this machine — no ffmpeg, and Playwright's
bundled ffmpeg is a VP8/webm-only build) has quality-locked presets and no
bitrate control, so duration is the only lever on file size.

Poster changed to `assets/img/gidf/hero-poster.jpg`, generated from the new clip
— the old poster was the previous footage and would have jumped on play.
`finale-hero.jpg` stays as the OG image and in the crane scene.

Rejected for the hero: the ABC medley master (`ABC Bollywood Dance Item Song
Medley…`) is genuinely ABC and 31 Mbps, but its ABC logo is burned into the
bottom-left — exactly where the hero eyebrow and "This is ABC." sit.


## Edition clips — festival `#archive` (four-editions track)

One 6s silent loop per edition. **Guest artists, not ABC** — the first pass used
ABC's own pieces for three of four years, which sold the festival as an ABC
showcase rather than an international faculty. Corrected.

| Clip | Who | Source | In-point |
|---|---|---|---|
| `edition-2023` | Bhangra ensemble | `2023/Showcase/GIDF 2023 Bhangra.mp4` | 58s |
| `edition-2024` | **Vanisha · Kathak** | `2024/Showcase/GIDF 2024 Showcase/Vanisha/02 … montage no smoke.mp4` | 99s |
| `edition-2025` | **Shampa Gopikrishna** | `2025/Videos/GIDF showcase/15 Shampa Gopikrishna/Shampa Showcase 2.mp4` | 59s |
| `edition-2026` | **Colleena Shakti** | `GIDF2026 - Full Video - Part 2.mp4` | 1079s |

Every clip is credited on the card. 2024's Vanisha also ties the card's
"Kathakali enters the programme" headline to a classical Indian solo, which the
previous ABC clip did not.

**2023 is the exception and stays an ensemble:** every named 2023 guest solo
(Dounia Devsena, Girish Kumar, Jana Jayanti) is a small figure on a blacked-out
stage — they score 6–9 against 84 for the 2026 clip on a brightness/colour/lit-area
rank, and read as an empty frame at card size. The Bhangra ensemble is the only
legible 2023 option.

**Punch-in:** `.edition-film video` is scaled 1.3 from a 42% origin. GIDF lights
guest solos as one figure on a wide dark stage — right for the venue, a speck in
a card. A 960px source shown at ~380px absorbs the crop without visible softness.

Probing note: WebKit's `<video>` refuses several of these Drive-hosted H.264
files (broken-media icon) even when fully downloaded, so frames were judged from
short `avconvert` probe cuts instead. Filenames and metadata are never enough —
`mdls` returns null until a Drive placeholder is materialised with
`cat file > /dev/null`.

Drive note: these files are online-only placeholders (0 bytes on disk) that
stream on read at roughly 3.5 MB/s. `mdls` returns null for them — force with
`cat file > /dev/null` before probing.
