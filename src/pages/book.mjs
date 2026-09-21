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
    { "@type": "Question", name: "Can you also teach a workshop at our event?", acceptedAnswer: { "@type": "Answer", text: "Learn with Swapnil for that — workshops, choreography commissions and private coaching are hired directly from Swapnil Dagliya, the company's artistic director, at swapnil.dance/workshops. ABC itself is booked to perform." } },
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
          <a class="button button-yellow" href="../contact/">Plan a booking <span>↗</span></a>
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
        <article class="card fx card-referral" id="workshops"><small>03 · Learn with Swapnil</small><h3>Looking for a workshop?</h3><p>Event workshops, corporate and school sessions, wedding choreography and private coaching are hired directly from <strong>Swapnil Dagliya</strong>, not from the company.</p><p><a class="button button-dark" href="https://swapnil.dance/workshops/" target="_blank" rel="noopener">Visit swapnil.dance <span>↗</span></a></p></article>
      </div>
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
        <p class="lead fx" style="margin-top:1.4rem"><em>The Four Loves</em> explores devotion, familial affection, romance and universal connection through Ghoomar, Chari, Tera Taali, Garba, Bhangra, Bollywood and Kathak-shaped semi-classical work.</p>
        <p class="fx"><a class="button button-yellow" href="../contact/">Discuss a production <span>↗</span></a></p>
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

    <section class="scene-pad t-bone" data-scene data-cue="the road book">
      <p class="label fx">Selected road book</p>
      <div class="intro">
        <h2 class="fx">Nine years<br><em class="solo">on the road.</em></h2>
        <div class="intro-copy fx"><p>Theatres, city squares, cultural festivals, company stages and television—from Ghent to Brussels, Maastricht, Luxembourg and beyond.</p></div>
      </div>
      <div class="folds fx">
        <details open><summary>2026–2024</summary><div class="fold-body prose"><ul><li>Benenwerk · Bruges</li>
            <li>Ghent India Dance Festival · Ghent</li><li>Diwali Celebration · Luxembourg</li><li>Shoonya Indian Night · Gentse Feesten</li><li>Jump · NTGent</li><li>The Four Loves · Ghent</li><li>Indian dance at Leylet Raqs · Ghent</li></ul></div></details>
        <details><summary>2023–2020</summary><div class="fold-body prose"><ul><li>McKinsey event · Brussels</li><li>Indian Dance Lab · Liège</li><li>Dansen in ’t Park · Ghent</li><li>Belgium’s Got Talent</li><li>Minard Theatre · Ghent</li><li>Boombal Festival</li></ul></div></details>
        <details><summary>2019–2017</summary><div class="fold-body prose"><ul><li>Gentse Feesten · Ghent</li><li>Cultuurcentrum De Factorij</li><li>Canvas TV · Dans met Hanne</li><li>Chautara vzw · Ghent</li><li>Indian Festival · Ghent</li></ul></div></details>
      </div>
    </section>

    <section class="scene-pad t-paper" data-scene data-cue="good questions">
      <p class="label fx">Common questions</p>
      <h2 class="fx" style="margin-bottom:1.6rem">Before the<br><em class="solo">music starts.</em></h2>
      <div class="folds fx">
        <details><summary>Can the performance be tailored?</summary><div class="fold-body prose"><p>Yes. We shape repertoire, duration, company size and participation around your venue, audience and event format.</p></div></details>
        <details><summary>Can you also teach a workshop at our event?</summary><div class="fold-body prose"><p>Not from ABC. The company is booked to perform. Workshops, choreography commissions and private coaching are hired directly from Swapnil Dagliya, the company&rsquo;s artistic director — <a href="https://swapnil.dance/workshops/" target="_blank" rel="noopener">swapnil.dance/workshops</a>. Many events book both; they are simply two different agreements.</p></div></details>
        <details><summary>Where can ABC travel?</summary><div class="fold-body prose"><p>ABC is based in Ghent and works across Belgium and internationally. Share the city and date in your enquiry so we can discuss the practical setup.</p></div></details>
        <details><summary>What should a booking enquiry include?</summary><div class="fold-body prose"><p>Please include the date, city, event type, rough audience size and what you want your audience to experience. We normally reply within three working days.</p></div></details>
      </div>
    </section>

    <section class="scene-pad t-blue" data-scene data-cue="the full dossier">
      <div class="intro">
        <div>
          <p class="label fx">The complete dossier</p>
          <h2 class="fx">The complete<br><em class="solo">dossier.</em></h2>
        </div>
        <p class="intro-copy fx">The headline offer stays quick. Open these only when you need the full performance record, production credits or service detail.</p>
      </div>
      <div class="folds fx">
        <details id="stage-history-full"><summary>Bollywood, Bhangra &amp; Garba performances in Belgium</summary><div class="fold-body prose">
          <h2>Indian dance company available for events in Belgium and Europe</h2>
          <p>ABC a bollywood company brings Bollywood, Bhangra, Garba, Lavani and Indian folk dance to events across Belgium and Europe. Led by Swapnil Dagliya, we have performed more than 40 shows at weddings, cultural festivals, corporate stages and theatres since 2017. Each performance is shaped for the event, with original costumes, curated music and a repertoire that moves between classical tradition and contemporary energy.</p>
          <h3>On stage since 2017</h3>
          <h4>2026</h4><ul><li>Gent India Dans Festival – Ghent May</li></ul>
          <h4>2025</h4><ul><li>Diwali Celebration – Luxembourg, Indian Association Luxembourg November</li><li>Shoonya Indian Night – Gentse Feesten, Ghent July</li><li>Performance at Iyengar Yoga Event – Maastricht May</li><li>Gent India Dans Festival – Ghent April</li></ul>
          <h4>2024</h4><ul><li>Diwali Celebration – Ghent, ICCR November</li><li>Diwali Celebration – Luxembourg, Indian Association Luxembourg October</li><li>Shoonya Indian Night – Gentse Feesten, with Trefpunt July</li><li>"Jump" – Production by Shoonya Dance Centre at NTGent June</li><li>Entertainment at Ink-Town Tattoo Convention – Kortrijk, with Strange People Brand May</li><li>Gent India Dans Festival – Ghent April</li><li>"The Four Loves" – A full-length Indian dance production by ABC, Ghent March</li><li>Indian Dance Performance – Leylet Raqs Bellydance Festival, Ghent February</li></ul>
          <h4>2023</h4><ul><li>Bollywood Show – McKinsey Event, Brussels, concept by Strange People December</li><li>Indian Dance Showcase – Liège, organised by Indian Dance Lab October</li><li>Indian Food Festival – Brussels, organised by Indian Confluence Belgium August</li><li>Performance at Dansen in het Park – Ghent August</li><li>The Four Loves (Excerpts) – Gent India Dans Festival May</li><li>Solo Performance by Swapnil Dagliya – Shimmy for Animals, Brussels March</li></ul>
          <h3>Archive 2017–2022</h3>
          <h4>2022</h4><ul><li>Shoonya Bollywood Nights December</li><li>Glimpse of India – Indian Festival, Gent August</li><li>Dansen in het Park – Ghent August</li><li>Gentse Feesten – Bollywood Showcase July</li><li>Minard Theatre – Ghent June</li><li>Shoonya Day – Bollywood Performance February</li></ul>
          <h4>2021</h4><ul><li>Navratri Celebration – Garba Performance, Ghent October</li><li>Belgium's Got Talent – Bhangra Fusion Performance September</li><li>Dansen in het Park – Ghent August</li></ul>
          <h4>2020</h4><ul><li>Online Performance – Bolly-Belly Party June</li></ul>
          <h4>2019</h4><ul><li>Indian Festival – Ghent October</li><li>Minard Theatre – Ghent September</li><li>Boombal Festival August</li><li>Dansen in 't Park – Ghent August</li><li>Gentse Feesten – Performances July</li><li>Cultuurcentrum De Factorij – Workshop and Performance June</li></ul>
          <h4>2018</h4><ul><li>Dhoom Taana – In-Studio Performance November</li><li>Featured in "Dans met Hanne" on Canvas TV – Top 10 Dance Companies August</li><li>Gentse Feesten – Performances July</li></ul>
          <h4>2017</h4><ul><li>Gentse Feesten – Performances July</li><li>Performance for Chautara vzw – Ghent</li></ul>
        </div></details>
        <details id="production-archive"><summary>Dance productions &amp; archive</summary><div class="fold-body prose">
          <h2>The Four Loves</h2>
          <p><strong>An Indian dance show by ABC a bollywood company</strong></p>
          <p><strong>Choreography:</strong> Swapnil Dagliya<br><strong>Production:</strong> Wim Boussery &amp; Swapnil Dagliya<br><strong>Dancers:</strong> Chiara Bisinelli, Kaushika Kumar, Khushboo Agarwal, Laurien De Ridder, Narcisse Merlier, Roshni Tela, Sara Van Holm, Shreya Vaidya, Svetlana Bubnova, Siddhy Shetty &amp; Swapnil Dagliya<br><strong>Guest Performer:</strong> Pranali Sanghmitra Bhagwat<br><strong>Lights:</strong> Johan Van Compernolle<br><strong>Sound:</strong> Wim Boussery<br><strong>Dramaturgy:</strong> Rita Hendricks<br><br><strong>Video of the trailer shot by:</strong> Marc Antoine<br><strong>Video edit by:</strong> Rajat Senjaliya<br><br><strong>Supported by:</strong> Shoonya Dance Centre</p>
          <p>"The Four Loves" is a vibrant Indian dance production, presented by ABC, that explores the diverse dimensions of love through the expressive language of Indian dance. This production draws inspiration from the rich cultural understanding of love in India, showcasing its many forms and expressions.</p>
          <p>Through captivating performances, intricate costumes, and evocative music, "The Four Loves" presents love as it manifests in various relationships. We portray the love of devotion, known as <em>bhakti</em>, the warmth of familial affection, known as <em>vatsalya</em>, the passion of romantic love, known as <em>shringar</em>, and the profound sense of universal connection, known as <em>prema</em>.</p>
          <p>"The Four Loves" explores the breadth of love through Indian dance. The production moves from Bollywood to regional folk forms: <em>Ghoomar</em>, <em>Chari</em> and <em>Tera Taali</em> from Rajasthan, <em>Garba</em> from Gujarat, <em>Bhangra</em> from Punjab, and semi-classical pieces shaped by <em>Kathak</em> vocabulary. Directed by Swapnil Dagliya, it brings these contrasting movement languages together in one stage work.</p>
        </div></details>
        <details id="services"><summary>Workshops, coaching &amp; choreography</summary><div class="fold-body prose">
          <h2>Learn with Swapnil, not the company</h2>
          <p>Event workshops, hen party and team sessions, school workshops, wedding choreography and private one-to-one coaching are booked directly with Swapnil Dagliya, the company's artistic director — not through ABC. Find them at <a href="https://swapnil.dance/workshops/" target="_blank" rel="noopener">swapnil.dance/workshops</a>.</p>
          <p>ABC itself is booked to perform — see the formats above, or <a href="../contact/">get in touch about a performance</a>.</p>
        </div></details>
      </div>
    </section>

    <section class="closing t-night" data-scene data-cue="your booking">
      <div>
        <p class="label fx" style="color:var(--yellow)">Curtain call</p>
        <h2 class="fx">Have an event<br><em class="solo">in mind?</em></h2>
        <p class="fx">Tell us the date, city and kind of event. We will help shape the right performance for it.</p>
      </div>
      <p class="fx"><a class="button button-yellow" href="../contact/">Start a booking <span>↗</span></a></p>
    </section>`;

export default { def, body: () => page({ ...def, route: "book" }, body) };
export const outputs = () => [{ path: "book/index.html", html: page(def, body) }];
