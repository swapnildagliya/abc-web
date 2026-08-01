import { page, SITE, marquee } from "../shell.mjs";

const def = {
  depth: 0,
  nav: null,
  title: "ABC a bollywood company — Indian dance in Belgium",
  desc: "Indian dance performances, workshops, classes and the Ghent India Dance Festival — from Ghent to stages across Europe.",
  canonical: `${SITE}/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/assets/img/gidf/finale-hero.jpg`,
  bodyClass: "page-home",
  firstCue: "overture",
  cinematic: true,
  curtain: true,
};

// The whole company, in curtain-call order: seven across the front,
// six offset behind. Same thirteen (and same portraits) as the About page.
const dancers = [
  ["swapnil-dagliya", "Swapnil Dagliya"], ["narcisse-merlier", "Narcisse Merlier"],
  ["kaushika-kumar", "Kaushika Kumar"], ["chiara-bisinelli", "Chiara Bisinelli"],
  ["khushboo-agarwal", "Khushboo Agarwal"], ["laurien-de-ridder", "Laurien De Ridder"],
  ["roshni-tela", "Roshni Tela"], ["sara-van-holm", "Sara Van Holm"],
  ["shreya-vaidya", "Shreya Vaidya"], ["siddhy-ganesh-shetty", "Siddhy Ganesh Shetty"],
  ["haike-bourgeois", "Haike Bourgeois"], ["svetlana-bubnova", "Svetlana Bubnova"],
  ["srimahavalli-thiyagarajan", "Srimahavalli Thiyagarajan"],
];

const postcards = [
  ["events/benenwerk-2026.jpg", 1400, 932, "Benenwerk", "Bruges", "ABC performing at an outdoor festival"],
  ["gidf/finale-hero.jpg", 2000, 1333, "Company finale", "Ghent", "ABC ensemble finale on a theatre stage"],
  ["abc/garba-ensemble-gala2023-backaert.jpg", 2400, 1613, "Garba ensemble", "GIDF Gala", "ABC Garba ensemble at the GIDF Gala"],
  ["abc/terah-taali-red-gala2023-jan-vens.jpg", 2400, 1600, "Terah Taali", "Gala", "ABC Terah Taali performers in red stage smoke"],
  ["gidf/kalbeliya-swapnil-kalbeliya-stijn-dejonckheere.jpg", 800, 1200, "Kalbeliya", "GIDF", "Kalbeliya artist on stage"],
  ["abc/rajasthani-set-gala2023-jan-vens.jpg", 2400, 1600, "Rajasthani set", "Gala", "ABC Rajasthani set in red light"],
  ["events/bhangra-starter-series-2026.jpg", 1400, 2105, "Bhangra", "Belgium", "ABC performing Bhangra on stage"],
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
                <source src="assets/media/hero-loop-1080p-master.mp4" type="video/mp4">
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
                <p class="cap">Indian dance with <em>roots, context and joy.</em></p>
              </div>
            </div>
            <div class="overture-actions">
              <a class="button button-yellow" href="book/">Book ABC <span>↗</span></a>
              <a class="button button-glass" href="whats-on/">See what’s on <span>→</span></a>
            </div>
          </div>

          <div class="overture-ticks" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        </div>
      </div>
    </section>

    ${marquee(["We perform", "We teach", "We gather", "Ghent → Europe"], { className: "t-yellow", speed: "22s" })}

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
            <p class="lead">Tailored performances and participatory workshops for theatres, festivals, companies, weddings and public events.</p>
            <p style="margin-top:1.2rem"><a class="button button-yellow" href="book/">Explore performances <span>↗</span></a></p>
          </div>
        </div>
      </div>
    </section>

    <!-- THE REST · the camera stops. Dates are for reading. -->
    <section class="scene-pad t-paper" id="events" data-scene data-cue="upcoming events">
      <div class="home-agenda-head">
        <div>
          <p class="label fx">Upcoming events · next 5 dates</p>
          <h2 class="fx">Next places to<br><em class="solo">find us.</em></h2>
        </div>
        <p class="script-note fx">see you there — we’ll be the colourful ones ↘</p>
      </div>
      <ol class="date-list">
        <li class="fx"><a href="whats-on/#gentse-feesten-2026" data-preview="assets/img/events/gentse-feesten-2026.jpg">
          <time datetime="2026-07-23"><b>23<i>+</i>26</b><span>JUL</span></time>
          <span><strong>Gentse Feesten</strong><small>Indian dance at Het Bal · 23 &amp; 26 July, free sessions</small></span>
          <span class="city">Ghent</span><b class="go" aria-hidden="true">↗</b></a></li>
        <li class="fx"><a href="whats-on/#benenwerk-2026" data-preview="assets/img/events/benenwerk-2026.jpg">
          <time datetime="2026-08-08"><b>08</b><span>AUG</span></time>
          <span><strong>Benenwerk</strong><small>An evening of Indian dance</small></span>
          <span class="city">Bruges</span><b class="go" aria-hidden="true">↗</b></a></li>
        <li class="fx"><a href="whats-on/#dansen-in-t-park-2026">
          <time datetime="2026-08-21"><b>21–23</b><span>AUG</span></time>
          <span><strong>Dansen in ’t Park</strong><small>Indian dance weekend at Azaleapark</small></span>
          <span class="city">Ghent</span><b class="go" aria-hidden="true">↗</b></a></li>
        <li class="fx"><a href="whats-on/#opendeurdag-2026" data-preview="assets/img/events/opendeurdag-2026.jpg">
          <time datetime="2026-09-13"><b>13</b><span>SEP</span></time>
          <span><strong>Opendeurdag</strong><small>Season opener · free entry</small></span>
          <span class="city">Ghent</span><b class="go" aria-hidden="true">↗</b></a></li>
        <li class="fx"><a href="whats-on/#sangam-2026">
          <time datetime="2026-11-07"><b>07–08</b><span>NOV</span></time>
          <span><strong>Sangam</strong><small>A new ABC Indian dance production</small></span>
          <span class="city">Ghent</span><b class="go" aria-hidden="true">↗</b></a></li>
      </ol>
      <p class="fx" style="margin-top:2rem"><a class="button button-dark" href="whats-on/">See all upcoming dates <span>→</span></a></p>
    </section>

    <!-- THE LETTER · a lateral track into daylight; the pace slows to read -->
    <section class="scene-pad t-bone story letter" id="story" data-scene data-scrub data-cue="the letter">
      <div class="stage">
        <div>
          <p class="label fx">One live company</p>
          <h2 class="fx">Wherever Indian dance<br>meets <em class="solo">an audience.</em></h2>
          <img class="letter-mark fx" src="assets/img/abc-mark-clean.png" alt="" loading="lazy" decoding="async" width="1351" height="1026">
        </div>
      </div>
      <div class="story-side">
        <div class="story-letter fx">
          <p>ABC lives wherever Indian dance meets an audience: a theatre that leans forward, a city square that starts moving, a beginner finding the beat, a festival circle opening wider.</p>
          <p>Bollywood, Garba, Bhangra, folk and semi-classical forms—shared with context, craft and plenty of joy.</p>
          <p class="signoff">Ghent is home. Europe is the dance floor.</p>
        </div>
        <p class="script-note fx">yes, beginners too.</p>
      </div>
      <div class="stat-row fx" aria-label="ABC in numbers">
        <div><b>44+</b><span>Stages and events</span></div>
        <div><b>12+</b><span>Cities across Europe</span></div>
        <div><b>4</b><span>Festival editions</span></div>
        <div><b>2017</b><span>On stage since</span></div>
      </div>
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
          <p class="fx meet-link"><a href="about/#company">Read their stories <span aria-hidden="true">→</span></a></p>
        </div>
      </div>
      <ul class="line-up">
        ${dancers.map(([f, name], i) => `<li style="--i:${i}"><a class="card" href="about/#company" data-tilt="7"><figure><img src="assets/img/dancers/portraits/${f}.jpg" alt="ABC dancer ${name}" loading="lazy" decoding="async" width="720" height="900"></figure><span>${name}</span></a></li>`).join("\n        ")}
      </ul>
    </section>

    <!-- CUT TO DAYLIGHT · a wipe, not a dissolve. The temperature changes. -->
    <section class="cut" id="learn" data-pin data-scene data-cue="classes">
      <div class="cut-fix">
        <div class="cut-night" aria-hidden="true">
          <p class="ghost">CURTAIN</p>
          <div style="max-width:96rem;margin:0 auto;width:100%">
            <p class="label">Still on stage</p>
            <h2 style="font-size:clamp(2.2rem,6vw,5rem);text-transform:uppercase;font-variation-settings:'wdth' 82">The performance<br><em style="text-transform:none">ends here.</em></h2>
          </div>
        </div>
        <div class="cut-day">
          <div style="max-width:96rem;margin:0 auto;width:100%">
            <p class="label">Classes in Ghent</p>
            <h2 style="font-size:clamp(2.2rem,6vw,5rem);text-transform:uppercase;font-variation-settings:'wdth' 82;margin-bottom:1rem">Start where<br><em style="text-transform:none">your feet are.</em></h2>
            <p class="lead">At home, at a free trial, or in a weekly class in Ghent. There is a clear way in—and a next step when you are ready.</p>
            <div class="act-list" style="max-width:54rem">
              <a href="learn-to-dance-bollywood/"><small>01</small><span><strong>Free Bollywood course</strong><em>Ten video lessons · at home</em></span><b>→</b></a>
              <a href="learn/#trial"><small>02</small><span><strong>Free trial week</strong><em>14–19 September · just show up</em></span><b>→</b></a>
              <a href="learn/#classes"><small>03</small><span><strong>The full timetable</strong><em>Bollywood, Bhangra, folk and more</em></span><b>→</b></a>
            </div>
            <p style="margin-top:1.6rem"><a class="button button-dark" href="learn/">Find your path <span>→</span></a></p>
          </div>
        </div>
      </div>
    </section>

    <!-- THE GATHERING · many bodies from many places, assembling out of depth -->
    <section class="gather" id="festival" data-pin data-scene data-cue="the festival">
      <div class="gather-fix">
        <div class="stage">
          <div class="collage" aria-hidden="true">
            <figure style="--start:.06;--depth:-900px;width:52%;aspect-ratio:3/2;right:2%;top:14%"><img src="assets/img/gidf/aakansha-bollypop-kalbeliya-pc-stijn-dejonckheere.jpg" alt="" loading="lazy" decoding="async" width="2000" height="1333"><figcaption>Kalbeliya · PC Stijn Dejonckheere</figcaption></figure>
            <figure style="--start:.20;--depth:-1400px;width:38%;aspect-ratio:2/3;right:56%;top:22%"><img src="assets/img/gidf/vanisha-kathak-pc-stijn-dejonckheere.jpg" alt="" loading="lazy" decoding="async" width="933" height="1400"><figcaption>Kathak · PC Stijn Dejonckheere</figcaption></figure>
            <figure style="--start:.34;--depth:-700px;width:40%;aspect-ratio:3/2;right:6%;bottom:10%"><img src="assets/img/gidf/julien-gala-showcase-pc-stijn-dejonckheere.jpg" alt="" loading="lazy" decoding="async" width="1400" height="933"><figcaption>Gala Showcase</figcaption></figure>
            <figure style="--start:.48;--depth:-1200px;width:32%;aspect-ratio:3/2;right:52%;bottom:6%"><img src="assets/img/gidf/tera-taali-gidf-2023.jpg" alt="" loading="lazy" decoding="async" width="2400" height="1613"><figcaption>Edition One · 2023</figcaption></figure>
          </div>
        </div>
        <div class="gather-copy">
          <p class="label" style="color:var(--yellow)">Ghent India Dance Festival</p>
          <h2 style="font-size:clamp(2.2rem,5.4vw,4.6rem);text-transform:uppercase;font-variation-settings:'wdth' 84;margin-bottom:1rem">Three days of India<br><em style="text-transform:none">in Ghent.</em></h2>
          <p class="lead">Artists, students and audiences meeting through workshops, shared stages and the joy of discovering another way to move.</p>
          <div class="festival-facts">
            <span><b>Edition Five</b>2027</span>
            <span><b>7–9 May</b>Three days</span>
            <span><b>Ghent</b>Shoonya Dance Centre</span>
          </div>
          <p><a class="button button-yellow" href="festival/">Enter the festival <span>↗</span></a></p>
        </div>
      </div>
    </section>

    <!-- THE ROAD · the camera tracks sideways; scroll becomes travel -->
    <section class="road" id="archive" data-pin data-track data-scene data-cue="the road">
      <div class="road-fix">
        <div class="postcards-head">
          <div>
            <p class="label">Postcards from the road</p>
            <h2>Where we’ve<br><em>danced.</em></h2>
          </div>
          <p class="script-note">keep scrolling — the road moves →</p>
        </div>
        <div class="postcard-strip" aria-label="ABC performance archive">
          ${postcards.map(([src, w, h, title, place, alt]) => `<figure tabindex="0"><span class="pc-img"><img src="assets/img/${src}" alt="${alt}" loading="lazy" decoding="async" width="${w}" height="${h}"></span><figcaption><strong>${title}</strong><span>${place}</span></figcaption></figure>`).join("\n          ")}
        </div>
        <div class="road-rule" aria-hidden="true"><i></i></div>
      </div>
    </section>

    <!-- THE FINALE · pull all the way back, then ask -->
    <section class="finale-scene" id="contact-abc" data-pin data-scene data-cue="finale">
      <div class="finale-fix">
        <div class="stage">
          <div class="finale-wide">
            <figure>
              <img src="assets/img/gidf/finale-hero.jpg" alt="ABC ensemble taking the stage at the GIDF Gala finale" loading="lazy" decoding="async" width="2000" height="1333">
              <figcaption>GIDF Gala finale · Photography Stijn Dejonckheere</figcaption>
            </figure>
          </div>
          <div class="finale-house" aria-hidden="true"></div>
          <p class="ghost" aria-hidden="true">DANCE</p>
          <div class="finale-ask">
            <p class="label" style="color:var(--yellow)">Your idea, next?</p>
            <h2>Want to make<br>something <em>move?</em></h2>
            <p class="lead">A performance, a workshop, a class question or a festival idea—tell us what you are planning.</p>
            <div class="button-row" style="margin-top:1.4rem">
              <a class="button button-yellow" href="contact/">Start a conversation <span>↗</span></a>
              <a class="button button-outline" href="whats-on/">See ABC live <span>→</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

export default { def, body: () => page(def, body) };
