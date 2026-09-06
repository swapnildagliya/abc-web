import { page, SITE, routeBar, marquee } from "../shell.mjs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { eventSets, currentEventSchemas, dateParts } from "../events.mjs";

const raw = JSON.parse(readFileSync(fileURLToPath(new URL("../data/events.json", import.meta.url)), "utf8"));
// status is DERIVED from end-date vs build date — never read from the file, or
// an event goes stale the morning after it happens. Same for the Event schemas:
// a finished event must not keep advertising itself to search engines.
const { upcoming, past } = eventSets(raw.events);
const schemas = currentEventSchemas(raw.schemas);

const def = {
  depth: 1,
  nav: "whats-on/",
  title: "Indian dance events in Belgium and Europe — ABC",
  desc: "Upcoming ABC performances, Indian dance workshops, classes and productions in Ghent, Belgium and across Europe.",
  canonical: `${SITE}/whats-on/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/${(upcoming.find(e => e.image) || past.find(e => e.image)).image.src}`,
  bodyClass: "page-agenda",
  cinematic: true,
  firstCue: "tonight",
  headerCta: { href: "#agenda", label: "See the agenda", glyph: "↓" },
  schemas,
};

// The two agenda features used to be hand-written HTML for whichever event was
// next when the page was authored. They then advertised a finished event for
// weeks. Both are now built from the upcoming set, so they move on their own.
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function longRange(e) {
  const [sy, sm, sd] = e.start.split("-").map(Number);
  const [ey, em, ed] = e.end.split("-").map(Number);
  if (e.start === e.end) return `${sd} ${MONTHS[sm - 1]} ${sy}`;
  if (sy === ey && sm === em) return `${sd}–${ed} ${MONTHS[sm - 1]} ${sy}`;
  if (sy === ey) return `${sd} ${MONTHS[sm - 1]} – ${ed} ${MONTHS[em - 1]} ${sy}`;
  return `${sd} ${MONTHS[sm - 1]} ${sy} – ${ed} ${MONTHS[em - 1]} ${ey}`;
}
// The venue line already exists inside each event body — read it, don't retype
// it. The first span in that block is the date range, so skip anything that
// looks like a date and take the line carrying a street address.
function venueOf(e) {
  const spans = [...e.body.matchAll(/<span>(?:<svg[\s\S]*?<\/svg>)?([^<]+)<\/span>/g)].map(m => m[1].trim());
  const isDate = t => /→/.test(t) || /\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun),/.test(t);
  return spans.find(t => !isDate(t) && /\d{4}\s|\d{4}\b.*[A-Za-z]|straat|plein|laan|Centre/i.test(t) && /[A-Za-z]{4}/.test(t)) || "";
}
// Ghent/Gent are the same city — don't print it twice under the venue.
function namesCity(venue, city) {
  if (!venue) return false;
  const norm = t => t.toLowerCase().replace(/ghent/g, "gent");
  return norm(venue).includes(norm(city));
}
function agendaFeature(e, kicker) {
  if (!e) return "";
  const img = e.image
    ? `<figure class="frame sweep"><img src="../${e.image.src}" alt="${e.image.alt}" loading="lazy" decoding="async" width="${e.image.w}" height="${e.image.h}"></figure>`
    : "";
  return `<article class="agenda-feature fx${img ? "" : " agenda-feature-plain"}" id="spotlight-${e.id}">
        ${img}
        <div class="agenda-feature-copy">
          <p class="agenda-feature-kicker"><i aria-hidden="true"></i>${kicker}</p>
          <h3>${e.title}</h3>
          ${e.blurb ? `<p class="lead">${e.blurb}</p>` : ""}
          <div class="agenda-venue"><small>${longRange(e)}</small><strong>${venueOf(e) || e.city}</strong>${namesCity(venueOf(e), e.city) ? "" : `<span>${e.city}</span>`}</div>
          <p style="margin:0"><a class="button button-yellow" href="#${e.id}">Full event details <span>↓</span></a></p>
        </div>
      </article>`;
}

// The "go deeper" scene picks the next upcoming event that actually has a
// picture and is not already the lead feature. Its lead sentence is read out of
// the event body, so the scene can never describe an event it is not showing.
const deeper = upcoming.slice(1).find(e => e.image) || upcoming.slice(1)[0];
function leadOf(e) {
  const m = e.body.match(/<p\s*>([\s\S]*?)<\/p>/);
  return m ? m[1].replace(/<[^>]+>/g, "").trim() : "";
}

function eventDetail(e) {
  const d = dateParts(e);
  return `<details class="event-detail" data-status="${e.status}" data-start="${e.start}" data-end="${e.end}" data-eyear="${e.year}" id="${e.id}">
  <summary>
    <span class="e-date"><b>${d.big}</b><small>${d.small}</small></span>
    <span class="e-title">${e.title}</span>
    <span class="e-city">${e.city}</span>
    <span class="e-toggle" aria-hidden="true">+</span>
  </summary>
  <div class="event-detail-body"><div class="prose complete-prose">${e.body.replace(/^<div class="complete-prose">/, "").replace(/<\/div>$/, "")}</div></div>
</details>`;
}

// past events grouped by year, newest first
const years = [...new Set(past.map(e => e.year))].sort((a, b) => b - a);
const pastGroups = years.map(y => {
  const list = past.filter(e => e.year === y);
  return `<div class="past-year"><h3>${y}</h3><span>${list.length} date${list.length > 1 ? "s" : ""}</span></div>\n${list.map(eventDetail).join("\n")}`;
}).join("\n");

const body = `
    <section class="inner-hero t-night spot" id="top" aria-labelledby="page-title" data-scene data-stage data-cue="tonight">
      <p class="ghost" aria-hidden="true">OUT</p>
      <p class="inner-index" aria-hidden="true">03 · What’s on</p>
      <div class="inner-hero-copy">
        <p class="inner-kicker fx">Ghent · Belgium · Europe</p>
        <h1 id="page-title"><span class="mask-line"><span>Meet us</span></span><span class="mask-line"><span><em class="solo">out there.</em></span></span></h1>
        <p class="inner-hero-lead fx">Outdoor stages, open classes, workshops and a new production. This is where ABC is moving next.</p>
        <div class="button-row fx">
          <a class="button button-yellow" href="#agenda">Upcoming dates <span>↓</span></a>
          <a class="button button-glass" href="#past-events">Past archive <span>↓</span></a>
        </div>
      </div>
      <div class="inner-hero-visual">
        <figure class="frame sweep fx-scale" style="aspect-ratio: 3/2">
          <img src="../assets/img/events/benenwerk-2026.jpg" alt="ABC company dancers performing live on an outdoor stage" width="1400" height="932">
          <figcaption><span>Benenwerk · Bruges</span></figcaption>
        </figure>
        <p class="inner-hero-note script-note">barefoot since 2017 ↘</p>
        <div class="stamp" aria-hidden="true"><strong>Barefoot</strong><span>weather permitting</span></div>
      </div>
    </section>
    ${routeBar("../", "whats-on/")}
    ${marquee(["Ghent", "Belgium", "Europe", "This week", "Next stage"], { className: "t-yellow", speed: "24s" })}

    <nav class="agenda-jump" aria-label="Jump to">
      <a href="#agenda" class="is-current"><b>${upcoming.length}</b> Upcoming</a>
      <a href="#past-events"><b>${past.length}</b> Past archive</a>
      <span class="agenda-jump-note">Every entry has date, city, price/status and a calendar file.</span>
    </nav>

    <section class="scene-pad t-paper" id="agenda" data-scene data-cue="upcoming">
      <p class="label fx">Upcoming events${upcoming.length ? ` · ${upcoming.length} date${upcoming.length > 1 ? "s" : ""}` : ""}</p>
      <div class="intro">
        <h2 class="fx">Next on<br><em class="solo">the floor.</em></h2>
        <div class="intro-copy fx">
          <p>Open days, starter series, workshops and full stage productions — every ABC date in Ghent, across Belgium and on the road.</p>
          <p>Programme times can vary across multi-day events. Use the event organiser’s final schedule before travelling.</p>
        </div>
      </div>

      ${agendaFeature(upcoming[0], "Next on the floor")}

      <div class="event-board" data-event-library>
        <p class="event-board-lead fx">${upcoming.length
          ? `All ${upcoming.length} current and future date${upcoming.length > 1 ? "s" : ""}, in order — each with its practical details and calendar file.`
          : `The next season is being programmed. Every past date is in the archive below, and the <a href="../contact/">contact page</a> is the fastest way to hear about the next one first.`}</p>
        ${upcoming.map(eventDetail).join("\n        ")}
      </div>
    </section>

    ${deeper ? `<section class="scene-pad t-yellow media-led" data-scene data-scrub data-cue="go deeper">
      ${deeper.image ? `<figure class="frame fx-scale" style="aspect-ratio: 4/5; align-self:start; max-width: 460px">
        <img src="../${deeper.image.src}" alt="${deeper.image.alt}" loading="lazy" decoding="async" width="${deeper.image.w}" height="${deeper.image.h}">
      </figure>` : ""}
      <div>
        <p class="label fx">${longRange(deeper)} · ${deeper.city}</p>
        <h2 class="fx">Go deeper<br><em class="solo">with us.</em></h2>
        <p class="lead fx">${leadOf(deeper)}</p>
        <p class="fx" style="margin-top:1.4rem"><a class="button button-dark" href="#${deeper.id}">Full programme &amp; pricing <span>↑</span></a></p>
      </div>
    </section>` : ""}

    <section class="perf-break t-night-2 spot" data-scene data-stage data-cue="meet us there">
      <div>
        <p class="break-kicker fx">Meet us there</p>
        <h2 class="fx">Plans, but louder.<em class="solo">${upcoming.length} dates ahead.</em></h2>
      </div>
      <div class="break-side">
        <p class="script-note fx">the next beat is waiting.</p>
        <img class="break-mark fx" src="../assets/img/abc-mark-clean.png" alt="" loading="lazy" decoding="async" width="1351" height="1026">
      </div>
    </section>

    <section class="scene-pad t-night" id="all-events" data-scene data-cue="the archive">
      <p class="label fx" style="color:var(--yellow)">Past dates</p>
      <div class="intro">
        <h2 class="fx">The road<br><em class="solo">behind us.</em></h2>
        <div class="intro-copy fx"><p>ABC’s archive holds performances, workshops and festival encounters across Belgium and Europe. Only current and future dates appear above—everything else lives here.</p></div>
      </div>
      <figure class="frame fx" style="aspect-ratio: 21/9; margin-bottom: 1.4rem">
        <img src="../assets/img/abc/garba-duo-gala2023-backaert.jpg" alt="Two ABC dancers mid-spin in the dark — skirts catching the light" loading="lazy" decoding="async" width="2400" height="1613" style="object-position: center 30%">
        <figcaption><span>ABC · GIDF Gala 2023</span><span>PC Michael Backaert</span></figcaption>
      </figure>
      <details class="past-shell fx" id="past-events">
        <summary>
          <span><small>Past events</small><strong>The complete archive</strong></span>
          <em>${past.length} dates · ${Math.min(...years)}–${Math.max(...years)}</em>
        </summary>
        <div class="past-body">
          ${pastGroups}
        </div>
      </details>
    </section>

    <section class="closing t-blue" data-scene data-cue="your event">
      <div>
        <p class="label fx" style="color:var(--yellow)">Or put ABC on your stage</p>
        <h2 class="fx">Want this energy<br><em class="solo">at your event?</em></h2>
        <p class="fx">Performances, workshops and productions travel across Belgium and Europe.</p>
      </div>
      <p class="fx"><a class="button button-yellow" href="../book/">Book ABC <span>↗</span></a></p>
    </section>`;

export const outputs = () => [{ path: "whats-on/index.html", html: page(def, body) }];
export default { def, body: () => page(def, body) };
