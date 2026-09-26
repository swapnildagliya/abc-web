import { page, SITE, routeBar, marquee } from "../shell.mjs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { eventSets, dateParts, BUILD_TODAY } from "../events.mjs";

/* "Next on stage" was a hand-written list. On 8 September 2026 it was still
   offering 23 July and 8 August as things to come see — a booker's first
   impression of whether this company keeps its own house in order. It now
   derives from the same events.json and the same date logic as the agenda, so
   a date can only appear here while it is genuinely ahead. */
const rawEvents = JSON.parse(readFileSync(fileURLToPath(new URL("../data/events.json", import.meta.url)), "utf8"));
// Only things a booker can come and WATCH. A starter series and an open day are
// upcoming, but sending a programmer to a beginners class is not evidence of
// what this company puts on a stage.
const nextOnStage = eventSets(rawEvents.events).upcoming.filter(e => e.kind === "performance").slice(0, 3);

const stageRow = (e) => {
  const { big, small } = dateParts(e);
  const img = e.image ? ` data-preview="../${e.image.src}"` : "";
  const where = e.blurb ? `${e.city} · ${e.blurb}` : e.city;
  const title = e.title.split("—")[0].replace(/\s*\d{4}\s*$/, "").trim();
  return `<a class="fx" href="../whats-on/#${e.id}"${img}><small>${big} ${small}</small><span><strong>${title}</strong><em>${where}</em></span><b>↗</b></a>`;
};

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Can the performance be tailored?", acceptedAnswer: { "@type": "Answer", text: "Yes. We shape repertoire, duration, company size and participation around your venue, audience and event format." } },
    { "@type": "Question", name: "Where can ABC travel?", acceptedAnswer: { "@type": "Answer", text: "ABC is based in Ghent and works across Belgium and internationally. Share the city and date in your enquiry so we can discuss the practical setup." } },
    { "@type": "Question", name: "What should a booking enquiry include?", acceptedAnswer: { "@type": "Answer", text: "Please include the date, city, event type, rough audience size and what you want your audience to experience. We normally reply within three working days." } },
  ],
});

const def = {
  depth: 1,
  nav: "book/",
  title: "Indian dance performances in Belgium — ABC",
  desc: "Book ABC for Bollywood, Bhangra, Garba and Indian folk stage performances and original productions across Belgium and Europe.",
  canonical: `${SITE}/book/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/assets/img/gidf/finale-hero.jpg`,
  bodyClass: "page-book",
  cinematic: true,
  firstCue: "enter",
  headerCta: { href: "../contact/#book", label: "Book ABC", glyph: "↗" },
  schemas: [FAQ_SCHEMA],
};

const body = `
    <section class="inner-hero t-night spot" id="top" aria-labelledby="page-title" data-scene data-stage data-cue="enter">
      <p class="ghost" aria-hidden="true">LIVE</p>
      <p class="inner-index" aria-hidden="true">01 · Performances</p>
      <div class="inner-hero-copy">
        <p class="inner-kicker fx">Performances · Repertoire · Productions</p>
        <h1 id="page-title"><span class="mask-line"><span>Book the</span></span><span class="mask-line"><span><em class="solo">company.</em></span></span></h1>
        <p class="inner-hero-lead fx">Bollywood, Bhangra, Garba, Lavani and Indian folk dance—shaped for theatres, festivals, companies, weddings and public events.</p>
        <div class="button-row fx">
          <a class="button button-yellow" href="../contact/#book">Plan a booking <span>↗</span></a>
          <a class="button button-glass" href="#offers">See the formats <span>↓</span></a>
        </div>
      </div>
      <div class="inner-hero-visual">
        <figure class="frame sweep fx-scale" style="aspect-ratio: 4/3">
          <img src="../assets/img/abc/garba-ensemble-gala2023-backaert.jpg" alt="ABC company Garba ensemble mid-performance in mirrored costumes" width="2400" height="1613">
          <figcaption><span>ABC company · GIDF Gala 2023 · PC Michael Backaert</span></figcaption>
        </figure>
        <p class="inner-hero-note script-note">made for your stage ↗</p>
        <div class="stamp" aria-hidden="true"><strong>Live</strong><span>not flat</span></div>
      </div>
    </section>
    ${routeBar("../", "book/")}
    ${marquee(["Performance", "Productions", "Weddings", "Theatre", "Festivals", "A full dance floor"], { className: "t-yellow", speed: "26s" })}

    <section class="scene-pad t-paper" id="offers" data-scene data-cue="the formats">
      <p class="label fx">The performance dossier</p>
      <div class="intro">
        <h2 class="fx">Shaped to<br><em class="solo">your event.</em></h2>
        <div class="intro-copy fx">
          <p>ABC is a Ghent-based Indian dance company led by Swapnil Dagliya. Since 2017, we have performed more than 40 shows across Belgium and Europe.</p>
          <p>Every booking is shaped around the event: its audience, scale, timing and reason for gathering. Costumes, music and repertoire are curated rather than dropped in as a standard package.</p>
          <p class="editorial-line">Tell us how you want the moment to feel.</p>
        </div>
      </div>
      <div class="stat-row fx" aria-label="ABC in numbers">
        <div><b>44+</b><span>Stages and events</span></div>
        <div><b>12+</b><span>Cities across Europe</span></div>
        <div><b>5</b><span>Dance languages in one company</span></div>
        <div><b>2017</b><span>On stage since</span></div>
      </div>
      <div class="card-grid" style="margin-top:2.4rem">
        <article class="card fx" id="performances"><small>01 · Performance</small><h3>Stage shows</h3><p>From a focused solo or ensemble act to a complete programme of Bollywood, Indian folk and semi-classical work.</p></article>
        <article class="card fx"><small>02 · Celebration</small><h3>Weddings and private events</h3><p>The company performing at your celebration—repertoire, costumes and music chosen for the moment rather than dropped in as a set.</p></article>
        <article class="card fx card-referral" id="workshops"><span id="services"></span><small>03 · Learn with Swapnil</small><h3>Looking for a workshop?</h3><p>Event workshops, corporate and school sessions, wedding choreography and private coaching are hired directly from <strong>Swapnil Dagliya</strong>, not from the company.</p><p><a class="button button-dark" href="https://swapnil.dance/workshops/" target="_blank" rel="noopener">Visit swapnil.dance <span>↗</span></a></p></article>
      </div>
    </section>

    <!-- WATCH · proof a booker can see. The clips already exist for the
         festival reel; the same fable.js reel plays them here. Credits say
         exactly who is on stage, so nothing student- or guest-led passes as ABC. -->
    <section class="scene-pad t-night showcase" id="watch" data-scene data-cue="watch">
      <div class="intro">
        <div>
          <p class="label fx" style="color:var(--yellow)">Watch the company</p>
          <h2 class="fx">See it<br><em class="solo">move.</em></h2>
        </div>
        <p class="intro-copy fx lead">Cut from the GIDF 2026 Gala Showcase at Shoonya Theatre, Ghent. For a full production, watch the trailer for <em>The Four Loves</em>.</p>
      </div>
      <figure class="reel" data-reel-stage>
        <div class="reel-frame">
          <video class="reel-v" muted playsinline preload="none"></video>
          <video class="reel-v" muted playsinline preload="none"></video>
          <div class="reel-wash" aria-hidden="true"></div>
          <figcaption class="reel-cap"><b data-reel-title>Semi-classical</b><small data-reel-who>ABC · GIDF 2026</small></figcaption>
          <div class="reel-ticks" aria-hidden="true"></div>
        </div>
        <ul class="reel-stills">
          <li data-clip="showcase/semiclassical-abc" data-title="Semi-classical" data-who="ABC · GIDF 2026">
            <img src="../assets/media/showcase/semiclassical-abc.jpg" alt="The ABC company dancing semi-classical" loading="lazy" decoding="async" width="640" height="360">
            <span><b>Semi-classical</b><small>ABC · GIDF 2026</small></span>
          </li>
          <li data-clip="showcase/madhuri-medley" data-title="Madhuri Medley" data-who="Bollywood students &amp; ABC · GIDF 2026">
            <img src="../assets/media/showcase/madhuri-medley.jpg" alt="Dancers spinning, skirts opened into full circles" loading="lazy" decoding="async" width="640" height="360">
            <span><b>Madhuri Medley</b><small>Bollywood students &amp; ABC · GIDF 2026</small></span>
          </li>
          <li data-clip="showcase/grand-finale" data-title="Grand Finale" data-who="Full cast · GIDF 2026">
            <img src="../assets/media/showcase/grand-finale.jpg" alt="The full cast on stage at the curtain call" loading="lazy" decoding="async" width="640" height="360">
            <span><b>Grand Finale</b><small>Full cast · GIDF 2026</small></span>
          </li>
        </ul>
      </figure>
      <p class="fx" style="margin-top:1.6rem"><a class="button button-yellow" href="https://www.youtube.com/watch?v=2efQqxnI8s0" target="_blank" rel="noopener">Watch The Four Loves trailer <span>↗</span></a></p>
    </section>

    <section class="scene-pad t-night media-led spot" id="productions" data-scene data-stage data-cue="original work">
      <div style="display:grid; gap:1rem; align-self:start">
        <figure class="frame sweep fx-scale" style="aspect-ratio: 3/2">
          <img src="../assets/img/abc/rajasthani-set-gala2023-jan-vens.jpg" alt="The ABC company in a Rajasthani set under red stage light" loading="lazy" decoding="async" width="2400" height="1600">
          <figcaption><span>ABC company · GIDF Gala 2023 · PC Jan Vens</span></figcaption>
        </figure>
        <figure class="frame fx drift" data-scrub style="--drift:-24px; aspect-ratio: 3/2">
          <img src="../assets/img/abc/garba-ensemble-gala2023-backaert.jpg" alt="The ABC company dancing Garba together in mirrored costumes" loading="lazy" decoding="async" width="2400" height="1600">
          <figcaption><span>ABC company · Garba · PC Michael Backaert</span></figcaption>
        </figure>
      </div>
      <div>
        <p class="label fx" style="color:var(--yellow)">Original stage work</p>
        <h2 class="fx">Original<br><em class="solo">productions.</em></h2>
        <p class="lead fx">ABC also creates full-length Indian dance productions. Folk, Bollywood and semi-classical forms meet without losing their individual histories.</p>
        <div class="act-list">
          <article class="fx"><small>01</small><span><strong>The Four Loves</strong><em>Full production · premiered 2024</em></span></article>
          <a class="fx" href="../whats-on/#sangam-2026"><small>02</small><span><strong>Sangam</strong><em>7–8 Nov 2026 · Ghent</em></span><b>↗</b></a>
        </div>
        <p class="lead fx" style="margin-top:1.4rem"><em>The Four Loves</em> explores devotion (<em>bhakti</em>), familial affection (<em>vatsalya</em>), romance (<em>shringar</em>) and universal connection (<em>prema</em>) through Ghoomar, Chari, Tera Taali, Garba, Bhangra, Bollywood and Kathak-shaped semi-classical work.</p>
        <p class="fx production-credits" id="production-archive"><strong>The Four Loves credits</strong> · Choreography: Swapnil Dagliya · Production: Wim Boussery &amp; Swapnil Dagliya · Dancers: Chiara Bisinelli, Kaushika Kumar, Khushboo Agarwal, Laurien De Ridder, Narcisse Merlier, Roshni Tela, Sara Van Holm, Shreya Vaidya, Svetlana Bubnova, Siddhy Shetty &amp; Swapnil Dagliya · Guest performer: Pranali Sanghmitra Bhagwat · Lights: Johan Van Compernolle · Sound: Wim Boussery · Dramaturgy: Rita Hendricks · Trailer: shot by Marc Antoine, edited by Rajat Senjaliya · Supported by Shoonya Dance Centre</p>
        <div class="button-row fx">
          <a class="button button-yellow" href="../contact/#book">Discuss a production <span>↗</span></a>
          <a class="button button-outline" href="https://www.youtube.com/watch?v=2efQqxnI8s0" target="_blank" rel="noopener">Four Loves trailer <span>↗</span></a>
        </div>
      </div>
    </section>

    <section class="perf-break t-night-2 spot" data-scene data-stage data-cue="stage direction">
      <div>
        <p class="break-kicker fx">Stage direction 01</p>
        <h2 class="fx">We bring costumes.<em class="solo">You bring a floor.</em></h2>
      </div>
      <div class="break-side">
        <p class="script-note fx">not background entertainment.</p>
        <img class="break-mark fx" src="../assets/img/abc-mark-clean.png" alt="" loading="lazy" decoding="async" width="1351" height="1026">
      </div>
    </section>

    <section class="scene-pad t-bone" data-scene data-cue="see it live">
      <p class="label fx" style="color:var(--yellow)">Next on stage</p>
      <div class="intro">
        <h2 class="fx">Come see<br><em class="solo">the real thing.</em></h2>
        <div class="intro-copy fx"><p>See ABC live before bringing us to your event.${nextOnStage.length > 1
          ? " These public dates show the range—from city festivals to original stage work."
          : " Our own production is the next one you can buy a seat for; festival and city dates are announced as they are confirmed."}</p></div>
      </div>
      <div class="act-list">
        ${nextOnStage.map(stageRow).join("\n        ")}
      </div>
    </section>

    <!-- THE RECORD · one list, not two. Recent years open, because named
         clients and venues are the proof a booker checks; the archive stays
         folded. The old road book was a partial copy of this list. -->
    <section class="scene-pad t-bone" id="record" data-scene data-cue="the record">
      <p class="label fx">On stage since 2017</p>
      <div class="intro">
        <h2 class="fx">Nine years<br><em class="solo">on the road.</em></h2>
        <div class="intro-copy fx"><p>Theatres, city squares, cultural festivals, company stages and television—from Ghent to Brussels, Bruges, Kortrijk, Liège, Maastricht and Luxembourg.</p></div>
      </div>
      <div class="prose record-list fx" id="stage-history-full">
        <h3>2026</h3><ul><li>Benenwerk – Bruges August</li><li>Gent India Dans Festival – Ghent May</li></ul>
        <h3>2025</h3><ul><li>Diwali Celebration – Luxembourg, Indian Association Luxembourg November</li><li>Shoonya Indian Night – Gentse Feesten, Ghent July</li><li>Performance at Iyengar Yoga Event – Maastricht May</li><li>Gent India Dans Festival – Ghent April</li></ul>
        <h3>2024</h3><ul><li>Diwali Celebration – Ghent, ICCR November</li><li>Diwali Celebration – Luxembourg, Indian Association Luxembourg October</li><li>Shoonya Indian Night – Gentse Feesten, with Trefpunt July</li><li>"Jump" – Production by Shoonya Dance Centre at NTGent June</li><li>Entertainment at Ink-Town Tattoo Convention – Kortrijk, with Strange People Brand May</li><li>Gent India Dans Festival – Ghent April</li><li>"The Four Loves" – A full-length Indian dance production by ABC, Ghent March</li><li>Indian Dance Performance – Leylet Raqs Bellydance Festival, Ghent February</li></ul>
        <h3>2023</h3><ul><li>Bollywood Show – McKinsey Event, Brussels, concept by Strange People December</li><li>Indian Dance Showcase – Liège, organised by Indian Dance Lab October</li><li>Indian Food Festival – Brussels, organised by Indian Confluence Belgium August</li><li>Performance at Dansen in het Park – Ghent August</li><li>The Four Loves (Excerpts) – Gent India Dans Festival May</li><li>Solo Performance by Swapnil Dagliya – Shimmy for Animals, Brussels March</li></ul>
      </div>
      <div class="folds fx" style="margin-top:1.4rem">
        <details><summary>Archive 2017–2022</summary><div class="fold-body prose">
          <h4>2022</h4><ul><li>Shoonya Bollywood Nights December</li><li>Glimpse of India – Indian Festival, Gent August</li><li>Dansen in het Park – Ghent August</li><li>Gentse Feesten – Bollywood Showcase July</li><li>Minard Theatre – Ghent June</li><li>Shoonya Day – Bollywood Performance February</li></ul>
          <h4>2021</h4><ul><li>Navratri Celebration – Garba Performance, Ghent October</li><li>Belgium's Got Talent – Bhangra Fusion Performance September</li><li>Dansen in het Park – Ghent August</li></ul>
          <h4>2020</h4><ul><li>Online Performance – Bolly-Belly Party June</li></ul>
          <h4>2019</h4><ul><li>Indian Festival – Ghent October</li><li>Minard Theatre – Ghent September</li><li>Boombal Festival August</li><li>Dansen in 't Park – Ghent August</li><li>Gentse Feesten – Performances July</li><li>Cultuurcentrum De Factorij – Workshop and Performance June</li></ul>
          <h4>2018</h4><ul><li>Dhoom Taana – In-Studio Performance November</li><li>Featured in "Dans met Hanne" on Canvas TV – Top 10 Dance Companies August</li><li>Gentse Feesten – Performances July</li></ul>
          <h4>2017</h4><ul><li>Gentse Feesten – Performances July</li><li>Performance for Chautara vzw – Ghent</li></ul>
        </div></details>
      </div>
    </section>

    <section class="scene-pad t-paper" data-scene data-cue="good questions">
      <p class="label fx">Common questions</p>
      <h2 class="fx" style="margin-bottom:1.6rem">Before the<br><em class="solo">music starts.</em></h2>
      <div class="folds fx">
        <details><summary>Can the performance be tailored?</summary><div class="fold-body prose"><p>Yes. We shape repertoire, duration, company size and participation around your venue, audience and event format.</p></div></details>
        <details><summary>Where can ABC travel?</summary><div class="fold-body prose"><p>ABC is based in Ghent and works across Belgium and internationally. Share the city and date in your enquiry so we can discuss the practical setup.</p></div></details>
        <details><summary>What should a booking enquiry include?</summary><div class="fold-body prose"><p>Please include the date, city, event type, rough audience size and what you want your audience to experience. We normally reply within three working days.</p></div></details>
      </div>
    </section>

    <section class="closing t-night" data-scene data-cue="your booking">
      <div>
        <p class="label fx" style="color:var(--yellow)">Curtain call</p>
        <h2 class="fx">Have an event<br><em class="solo">in mind?</em></h2>
        <p class="fx">Tell us the date, city and kind of event. We will help shape the right performance for it.</p>
      </div>
      <p class="fx"><a class="button button-yellow" href="../contact/#book">Start a booking <span>↗</span></a></p>
    </section>`;

export default { def, body: () => page({ ...def, route: "book" }, body) };
export const outputs = () => [{ path: "book/index.html", html: page(def, body) }];
