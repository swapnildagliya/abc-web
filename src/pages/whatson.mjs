import { page, SITE, routeBar, marquee } from "../shell.mjs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const { events, schemas } = JSON.parse(readFileSync(fileURLToPath(new URL("../data/events.json", import.meta.url)), "utf8"));
const upcoming = events.filter(e => e.status === "upcoming");
const past = events.filter(e => e.status === "past");

const def = {
  depth: 1,
  nav: "whats-on/",
  title: "Indian dance events in Belgium and Europe — ABC",
  desc: "Upcoming ABC performances, Indian dance workshops, classes and productions in Ghent, Belgium and across Europe.",
  canonical: `${SITE}/whats-on/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/assets/img/events/gentse-feesten-2026.jpg`,
  bodyClass: "page-agenda",
  cinematic: true,
  firstCue: "tonight",
  headerCta: { href: "#agenda", label: "See the agenda", glyph: "↓" },
  schemas,
};

// Summary date badge, computed from data-start/data-end so multi-day events
// never show only their first day. A few events run on specific non-contiguous
// days rather than a continuous span — those carry an explicit override.
const DATE_OVERRIDE = {
  "gentse-feesten-2026": { big: "23 & 26", small: "JUL" },
};
const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function dateParts(e) {
  if (DATE_OVERRIDE[e.id]) return DATE_OVERRIDE[e.id];
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (!iso.test(e.start) || !iso.test(e.end)) {
    const m = e.date.trim().match(/^(.+?)\s+([A-Za-z]+)\s*(\d{2})?$/);
    return m ? { big: m[1], small: (m[2] || "").toUpperCase() + (m[3] ? ` ’${m[3]}` : "") } : { big: e.date, small: "" };
  }
  const [, sm, sd] = e.start.split("-").map(Number);
  const [, em, ed] = e.end.split("-").map(Number);
  const yr = e.status === "past" ? ` ’${String(e.year).slice(2)}` : "";
  if (e.start === e.end) return { big: String(sd), small: MON[sm - 1] + yr };
  if (sm === em) return { big: `${sd}–${ed}`, small: MON[sm - 1] + yr };
  return { big: `${sd} ${MON[sm - 1]}`, small: `– ${ed} ${MON[em - 1]}${yr}` };
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
      <p class="label fx">Upcoming events · ${upcoming.length} dates</p>
      <div class="intro">
        <h2 class="fx">Next on<br><em class="solo">the floor.</em></h2>
        <div class="intro-copy fx">
          <p>Free city events open the season, followed by intensive training, the Shoonya open day and ABC’s new stage production in November.</p>
          <p>Programme times can vary across multi-day events. Use the event organiser’s final schedule before travelling.</p>
        </div>
      </div>

      <article class="agenda-feature fx" id="spotlight-gentse-feesten-2026">
        <figure class="frame sweep">
          <img src="../assets/img/events/gentse-feesten-2026.jpg" alt="Swapnil leading an outdoor Indian dance session at Gentse Feesten" loading="lazy" decoding="async" width="1400" height="933">
        </figure>
        <div class="agenda-feature-copy">
          <p class="agenda-feature-kicker"><i aria-hidden="true"></i>Next · free dance sessions</p>
          <h3>Gentse Feesten</h3>
          <ul class="agenda-schedule" aria-label="Gentse Feesten programme">
            <li><time datetime="2026-07-23T18:00"><strong>Thu 23 Jul</strong><span>18:00</span></time><b>Bhangra</b></li>
            <li><time datetime="2026-07-26T18:00"><strong>Sun 26 Jul</strong><span>18:00</span></time><b>Bollyfolk</b></li>
            <li><time datetime="2026-07-26T19:00"><strong>Sun 26 Jul</strong><span>19:00</span></time><b>Garba</b></li>
          </ul>
          <div class="agenda-venue"><small>All three sessions</small><strong>Baudelopark · Het Bal</strong><span>Ghent · Free · Just show up</span></div>
          <p style="margin:0"><a class="button button-yellow" href="#gentse-feesten-2026">Full event details <span>↓</span></a></p>
        </div>
      </article>

      <div class="event-board" data-event-library>
        <p class="event-board-lead fx">All ${upcoming.length} current and future dates, in order — each with its practical details and calendar file.</p>
        ${upcoming.map(eventDetail).join("\n        ")}
      </div>
    </section>

    <section class="scene-pad t-yellow media-led" data-scene data-scrub data-cue="go deeper">
      <figure class="frame fx-scale" style="aspect-ratio: 4/5; align-self:start; max-width: 460px">
        <img src="../assets/img/events/summer-intensive-2026.png" alt="Indian Dance Summer Intensive with Swapnil Dagliya, 26–29 August in Ghent — official artwork" loading="lazy" decoding="async" width="1080" height="1350">
      </figure>
      <div>
        <p class="label fx">26–29 August · Ghent</p>
        <h2 class="fx">Go deeper<br><em class="solo">for four days.</em></h2>
        <p class="lead fx">The Indian Dance Summer Intensive moves from Punjabi folk mechanics and semi-classical rhythm to prop-based folk fusion and a Rajasthani finale.</p>
        <div class="act-list">
          <article class="fx"><small>WED</small><span><strong>Bhangra &amp; Jhoomar</strong><em>18:30</em></span></article>
          <article class="fx"><small>THU</small><span><strong>Semi-Classical &amp; Teentaal</strong><em>18:30</em></span></article>
          <article class="fx"><small>FRI</small><span><strong>Tippani &amp; Bihu</strong><em>18:30</em></span></article>
          <article class="fx"><small>SAT</small><span><strong>Rajasthani finale</strong><em>Day session</em></span></article>
        </div>
        <p class="fx" style="margin-top:1.4rem"><a class="button button-dark" href="#indian-dance-summer-intensive-2026">Full programme &amp; pricing <span>↑</span></a></p>
      </div>
    </section>

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
