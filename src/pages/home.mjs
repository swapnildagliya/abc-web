import { page, SITE } from "../shell.mjs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { eventSets } from "../events.mjs";

// The homepage list used to be hand-written <li>s and kept showing an event
// that had already happened. It now reads the same derived upcoming set as
// /whats-on/, so both pages age together.
const { upcoming } = eventSets(JSON.parse(readFileSync(fileURLToPath(new URL("../data/events.json", import.meta.url)), "utf8")).events);
// "Next places to find us" means places to watch the company. Shoonya class
// series and Swapnil workshops are upcoming too, but they belong to their own
// organisers — on 26 Sep 2026 two starter series that began on 16 Sep still
// sat here as "next dates". They stay on /whats-on/; the homepage links there.
const homeUpcoming = upcoming.filter(event => event.kind === "performance");
const MON3 = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
function dateChip(e) {
  const [, sm, sd] = e.start.split("-").map(Number);
  const [, em, ed] = e.end.split("-").map(Number);
  const day = e.start === e.end ? String(sd).padStart(2, "0")
            : sm === em ? `${String(sd).padStart(2, "0")}\u2013${String(ed).padStart(2, "0")}`
            : String(sd).padStart(2, "0");
  return `<time datetime="${e.start}"><b>${day}</b><span>${MON3[sm - 1]}</span></time>`;
}
function dateRow(e) {
  const preview = e.image ? ` data-preview="${e.image.src}"` : "";
  const previewPosition = e.image?.h > e.image?.w ? ` data-preview-position="50% 12%"` : "";
  const sub = e.blurb ? `<small>${e.blurb}</small>` : "";
  // data-until lets fable.js drop a row the day after it ends, even if the
  // daily rebuild has not run; a sweep can read it without parsing prose.
  return `<li class="fx" data-until="${e.end}"><a href="whats-on/#${e.id}"${preview}${previewPosition}>
          ${dateChip(e)}
          <span><strong>${e.title.split(/\s+[·—]\s+/)[0]}</strong>${sub}</span>
          <span class="city">${e.city}</span><b class="go" aria-hidden="true">\u2197</b></a></li>`;
}

const def = {
  depth: 0,
  nav: null,
  title: "ABC a bollywood company — Indian dance in Belgium",
  desc: "ABC is a Ghent-based Indian dance company creating performances and productions for stages, festivals and events across Belgium and Europe.",
  canonical: `${SITE}/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/assets/img/gidf/finale-hero.jpg`,
  bodyClass: "page-home",
  firstCue: "overture",
  cinematic: true,
  curtain: true,
};

// Swapnil opens as founder; the company follows in documented joining order.
// Keep this order identical to the About page.
const dancers = [
  ["swapnil-dagliya", "Swapnil Dagliya"], ["narcisse-merlier", "Narcisse Merlier"],
  ["svetlana-bubnova", "Svetlana Bubnova"], ["sara-van-holm", "Sara Van Holm"],
  ["chiara-bisinelli", "Chiara Bisinelli"], ["kaushika-kumar", "Kaushika Kumar"],
  ["laurien-de-ridder", "Laurien De Ridder"], ["haike-bourgeois", "Haike Bourgeois"],
  ["shreya-vaidya", "Shreya Vaidya"], ["khushboo-agarwal", "Khushboo Agarwal"],
  ["roshni-tela", "Roshni Tela"], ["siddhy-ganesh-shetty", "Siddhy Ganesh Shetty"],
  ["srimahavalli-thiyagarajan", "Srimahavalli Thiyagarajan"],
];

const body = `
    <!-- OPENING · the film carries the statement. There is no separate
         manifesto section: the footage is the evidence, the words the caption. -->
    <section class="overture" id="top" aria-labelledby="hero-title" data-pin data-roll data-scene data-cue="overture" data-phase="1">
      <div class="overture-fix">
        <div class="stage">
          <div class="rig">
            <div class="overture-video">
              <video autoplay muted loop playsinline preload="auto" poster="assets/img/gidf/finale-hero.jpg" width="1920" height="1080">
                <source src="assets/media/hero-loop.mp4" type="video/mp4" media="(max-width: 720px)">
                <source src="assets/media/hero-loop-1080p.mp4" type="video/mp4">
              </video>
            </div>
          </div>
          <div class="overture-wash" aria-hidden="true"></div>

          <button class="video-control" type="button" aria-label="Pause background video" data-video-control><i aria-hidden="true"></i><span>Pause film</span></button>

          <div class="overture-copy">
            <p class="overture-eyebrow"><i aria-hidden="true"></i>Indian dance company · Ghent → Europe · On stage since 2017</p>
            <h1 id="hero-title" class="overture-title">This is <em>ABC.</em></h1>
            <div class="caption">
              <div class="cap-track">
                <p class="cap"><b>Not one</b> <em>dance.</em></p>
                <p class="cap"><b>Not one</b> <em>stage.</em></p>
                <p class="cap"><b>Not one way</b> <em>to move.</em></p>
                <p class="cap"><b>Indian dance with</b> <em>roots, context and joy.</em></p>
              </div>
            </div>
            <p class="overture-definition">ABC is a Ghent-based Indian dance company creating performances and productions for theatres, festivals, companies, weddings and public events across Belgium and Europe.</p>
            <div class="overture-actions">
              <a class="button button-yellow" href="contact/#book">Book ABC <span>↗</span></a>
              <a class="button button-glass" href="sangam/">Discover SANGAM <span>→</span></a>
            </div>
          </div>

          <div class="overture-ticks" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        </div>
      </div>
    </section>

    <!-- THE REST · the camera stops. Dates are for reading. -->
    <section class="scene-pad t-paper" id="events" data-scene data-cue="upcoming events">
      <div class="home-agenda-head">
        <div>
          <p class="label fx">Upcoming events · next dates</p>
          <h2 class="fx">Next places to<br><em class="solo">find us.</em></h2>
        </div>
        <p class="script-note fx">see you there — we’ll be the colourful ones ↘</p>
      </div>
      ${homeUpcoming.length ? `<ol class="date-list" data-until-list>
        ${homeUpcoming.slice(0, 4).map(dateRow).join("\n        ")}
      </ol>` : ""}
      <p class="lead fx" data-until-empty${homeUpcoming.length ? " hidden" : ""}>The next public date is being programmed — the full archive of where we have danced is on the agenda page.</p>
      <p class="fx" style="margin-top:2rem"><a class="button button-dark" href="whats-on/">See the full agenda <span>→</span></a></p>
      <p class="fx prose" style="margin-top:.8rem">Looking for a class or workshop? Weekly classes run at Shoonya — see <a href="learn/">Classes</a>. Workshops with Swapnil are on <a href="https://swapnil.dance/workshops/" target="_blank" rel="noopener">swapnil.dance</a>.</p>
    </section>

    <!-- THE CURTAIN CALL · the company bows in along the line -->
    <section class="scene-pad t-night meet-company" id="company" data-scene data-cue="the company">
      <div class="meet-head">
        <div>
          <p class="label fx" style="color:var(--yellow)">Meet the company</p>
          <h2 class="fx">Thirteen dancers.<br><em class="solo">One company.</em></h2>
        </div>
        <div>
          <p class="intro-copy fx">ABC is a live ensemble, not a name on a poster. Bollywood, Garba, Bhangra, folk and semi-classical — carried by the people who rehearse it every week in Ghent.</p>
          <p class="fx meet-link"><a href="about/#ensemble">Meet the company <span aria-hidden="true">→</span></a></p>
        </div>
      </div>
      <ul class="line-up">
        ${dancers.map(([f, name], i) => `<li style="--i:${i}"><a class="card" href="about/#ensemble" data-tilt="7"><figure><img src="assets/img/dancers/portraits/${f}.jpg" alt="ABC dancer ${name}" loading="lazy" decoding="async" width="720" height="900"></figure><span>${name}</span></a></li>`).join("\n        ")}
      </ul>
    </section>

    <!-- THE CRANE · the company photo rakes flat until you stand level with it -->
    <section class="crane" id="performances" data-pin data-scene data-cue="act i · on stage">
      <div class="crane-fix">
        <div class="stage">
          <p class="ghost" aria-hidden="true">STAGE</p>
          <span class="crane-note">a stage should feel alive.</span>
          <div class="crane-floor rig">
            <figure>
              <img src="assets/img/gidf/finale-hero.jpg" alt="ABC ensemble filling a theatre stage with Indian dance at the GIDF Gala finale" loading="lazy" decoding="async" width="2000" height="1333">
              <figcaption>GIDF Gala finale · Photography Stijn Dejonckheere</figcaption>
            </figure>
          </div>
          <div class="crane-scrim" aria-hidden="true"></div>
          <div class="crane-copy">
            <p class="label">Made for the stage</p>
            <h2>Forty-plus shows.<br><em>Zero quiet ones.</em></h2>
            <p class="lead">Tailored performances for theatres, festivals, companies, weddings and public events.</p>
            <div class="proof-stats" aria-label="ABC in numbers">
              <span><b>40+</b>Stages and events</span>
              <span><b>5</b>Dance languages</span>
              <span><b>2017</b>On stage since</span>
            </div>
            <p style="margin-top:1.2rem"><a class="button button-yellow" href="book/">Explore performances <span>↗</span></a></p>
          </div>
        </div>
      </div>
    </section>

    <!-- TWO SHORT HANDOFFS · useful routes without another long homepage act -->
    <section class="scene-pad t-yellow home-pathways" id="learn" data-scene data-cue="more ways to move">
      <div class="home-pathways-head fx">
        <p class="label">More ways to move</p>
        <p class="script-note">Ghent is home. Europe is the dance floor.</p>
      </div>
      <div class="home-pathways-grid">
        <article class="fx">
          <p class="label">Classes · Shoonya Dance Centre</p>
          <h2>Want to<br><em class="solo">learn?</em></h2>
          <p>Weekly classes and registration belong to Shoonya. ABC’s free ten-part Bollywood course is also available to learn from home.</p>
          <div class="button-row">
            <a class="button button-dark" href="learn/">Find classes <span>→</span></a>
            <a class="text-link" href="learn-to-dance-bollywood/">Free course <span>→</span></a>
          </div>
        </article>
        <article class="fx" id="festival">
          <p class="label">Gent India Dans Festival</p>
          <h2>7–9 May<br><em class="solo">2027.</em></h2>
          <p>Edition Five brings artists, students and audiences together for three days of workshops and performance in Ghent.</p>
          <a class="button button-dark" href="festival/">Enter the festival <span>→</span></a>
        </article>
      </div>
    </section>

    <!-- THE FINALE · pull all the way back, then ask -->
    <section class="finale-scene" id="contact-abc" data-pin data-scene data-cue="finale">
      <div class="finale-fix">
        <div class="stage">
          <div class="finale-wide">
            <figure>
              <img src="assets/img/abc/rajasthani-set-gala2023-jan-vens.jpg" alt="The ABC company in a Rajasthani set under red stage light" loading="lazy" decoding="async" width="1200" height="799">
              <figcaption>ABC company · GIDF Gala 2023 · PC Jan Vens</figcaption>
            </figure>
          </div>
          <div class="finale-house" aria-hidden="true"></div>
          <p class="ghost" aria-hidden="true">DANCE</p>
          <div class="finale-ask">
            <p class="label" style="color:var(--yellow)">Your idea, next?</p>
            <h2>Want to make<br>something <em>move?</em></h2>
            <p class="lead">Planning a theatre programme, festival, company event or celebration? Tell ABC the date, city and audience.</p>
            <div class="button-row" style="margin-top:1.4rem">
              <a class="button button-yellow" href="contact/#book">Book the company <span>↗</span></a>
              <a class="button button-outline" href="whats-on/">See ABC live <span>→</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

export default { def, body: () => page(def, body) };
