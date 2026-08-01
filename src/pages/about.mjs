import { page, SITE, routeBar, marquee } from "../shell.mjs";

const def = {
  depth: 1,
  nav: "about/",
  title: "About ABC a bollywood company — Indian dance in Belgium",
  desc: "Meet ABC, the Ghent-based Indian dance company founded by Swapnil Dagliya in 2017, and the dancers behind its performances and productions.",
  canonical: `${SITE}/about/`,
  themeColor: "#FAF8F3",
  ogImage: `${SITE}/assets/img/gidf/tera-taali-gidf-2023.jpg`,
  bodyClass: "page-about",
  cinematic: true,
  firstCue: "roots",
  headerLight: true,
  headerCta: { href: "../contact/", label: "Book ABC", glyph: "↗" },
};

// the 13-strong roster, each with their cutout — Swapnil (director) opens,
// then the company. Every dancer appears with a picture.
const dancers = [
  { name: "Swapnil Dagliya", file: "swapnil-dagliya", w: 1600, h: 1396 },
  { name: "Narcisse Merlier", file: "narcisse-merlier", w: 1173, h: 1600 },
  { name: "Chiara Bisinelli", file: "chiara-bisinelli", w: 1200, h: 1600 },
  { name: "Kaushika Kumar", file: "kaushika-kumar", w: 1192, h: 1600 },
  { name: "Laurien De Ridder", file: "laurien-de-ridder", w: 1168, h: 1600 },
  { name: "Khushboo Agarwal", file: "khushboo-agarwal", w: 1300, h: 1185 },
  { name: "Roshni Tela", file: "roshni-tela", w: 749, h: 1600 },
  { name: "Sara Van Holm", file: "sara-van-holm", w: 952, h: 1600 },
  { name: "Shreya Vaidya", file: "shreya-vaidya", w: 686, h: 679 },
  { name: "Siddhy Ganesh Shetty", file: "siddhy-ganesh-shetty", w: 788, h: 813 },
  { name: "Haike Bourgeois", file: "haike-bourgeois", w: 541, h: 593 },
  { name: "Svetlana Bubnova", file: "svetlana-bubnova", w: 525, h: 599 },
  { name: "Srimahavalli Thiyagarajan", file: "srimahavalli-thiyagarajan", w: 1600, h: 1454 },
];

const body = `
    <section class="inner-hero t-bone" id="top" aria-labelledby="page-title" data-scene data-cue="roots">
      <p class="ghost" aria-hidden="true">ABC</p>
      <p class="inner-index" aria-hidden="true">About</p>
      <div class="inner-hero-copy">
        <p class="inner-kicker fx">Ghent is home · Europe is the dance floor</p>
        <h1 id="page-title"><span class="mask-line"><span>Thirteen dancers.</span></span><span class="mask-line"><span><em class="solo">One company.</em></span></span></h1>
        <p class="inner-hero-lead fx">A Belgian Indian dance company moving between Bollywood, Bhangra, Garba, Lavani, regional folk and semi-classical forms.</p>
        <div class="button-row fx">
          <a class="button button-dark" href="#company">Meet the company <span>↓</span></a>
          <a class="button button-outline" href="../book/">See the work <span>→</span></a>
        </div>
      </div>
      <div class="inner-hero-visual">
        <figure class="frame sweep fx-scale" style="aspect-ratio: 3/4; max-height: 74vh">
          <img src="../assets/img/abc/garba-company-gala2023-backaert.jpg" alt="ABC company dancers mid-Garba with Swapnil Dagliya at centre" width="1613" height="2400">
          <figcaption><span>ABC company · PC Michael Backaert</span></figcaption>
        </figure>
        <p class="inner-hero-note script-note">many forms. one company.</p>
        <div class="stamp" aria-hidden="true"><strong>Ghent</strong><span>since 2017</span></div>
      </div>
    </section>
    ${routeBar("../", "about/")}
    ${marquee(["Joyful", "Kinetic", "Rooted", "Ghent", "Across Europe"], { className: "t-blue", speed: "24s" })}

    <section class="scene-pad t-paper" id="company" data-scene data-cue="on purpose">
      <p class="label fx">This is ABC</p>
      <div class="intro">
        <h2 class="fx">Not one dance.<br><em class="solo">On purpose.</em></h2>
        <div class="intro-copy fx">
          <p>ABC a bollywood company is based in Ghent and led by Swapnil Dagliya. Since 2017, the company has performed more than 40 times across Europe—on theatre stages, at festivals, and at weddings and company events.</p>
          <p>Indian dance is not one thing. Folk, Bollywood and semi-classical work each carry their own history. ABC moves between them deliberately rather than folding everything into a single act.</p>
          <p class="editorial-line">Everybody is welcome here. The form does not have to be watered down to include them.</p>
        </div>
      </div>
      <div class="card-grid">
        <article class="card fx"><small>01 · Roots</small><h3>Context belongs in the work</h3><p>Names, histories and movement languages matter. We share where the form comes from as well as how it moves.</p></article>
        <article class="card fx"><small>02 · Craft</small><h3>Joy is not the opposite of rigour</h3><p>Colour and celebration sit beside technique, rehearsal and a respect for the specific dance form.</p></article>
        <article class="card fx"><small>03 · Access</small><h3>A clear way to begin</h3><p>Beginners receive a real starting point; experienced dancers receive enough depth to keep growing.</p></article>
        <article class="card fx"><small>04 · Exchange</small><h3>Ghent meets a wider scene</h3><p>Touring, guest teaching and the festival connect a local company to artists and audiences across Europe.</p></article>
      </div>
    </section>

    <section class="scene-pad t-night spot" id="company" data-scene data-stage data-cue="the ensemble">
      <p class="label fx" style="color:var(--yellow)">The company today · thirteen dancers</p>
      <div class="intro">
        <h2 class="fx">The current<br><em class="solo">company.</em></h2>
        <div class="intro-copy fx"><p>Thirteen dancers bring different histories and movement backgrounds into one rehearsal process. Every one of them, mid-move.</p></div>
      </div>
      <ul class="company-grid">
        ${dancers.map((d, i) => `<li class="fx" style="--step:${i % 6}"><figure><img src="../assets/img/dancers/portraits/${d.file}.jpg" alt="ABC dancer ${d.name}" loading="lazy" decoding="async" width="720" height="900"></figure><span>${d.name}</span></li>`).join("\n        ")}
      </ul>
    </section>

    <section class="perf-break t-night-2 spot" data-scene data-stage data-cue="still becoming">
      <div>
        <p class="break-kicker fx">Built here · moving everywhere</p>
        <h2 class="fx">Founded 2017.<em class="solo">Still rehearsing.</em></h2>
      </div>
      <div class="break-side">
        <p class="script-note fx">still becoming.</p>
        <img class="break-mark fx" src="../assets/img/abc-mark-clean.png" alt="" loading="lazy" decoding="async" width="1351" height="1026">
      </div>
    </section>

    <section class="scene-pad t-bone media-led" id="story" data-scene data-scrub data-cue="the founder">
      <div class="contain" style="align-self:end">
        <figure class="frame fx-left" style="aspect-ratio: 2/3; max-height: 74vh">
          <img src="../assets/img/gidf/kalbeliya-swapnil-kalbeliya-stijn-dejonckheere.jpg" alt="ABC founder and artistic director Swapnil Dagliya swirling a cobalt Kalbeliya skirt" loading="lazy" decoding="async" width="800" height="1200">
          <figcaption><span>Kalbeliya · PC Stijn Dejonckheere</span></figcaption>
        </figure>
      </div>
      <div>
        <p class="label fx">Founder and artistic director</p>
        <h2 class="fx">Swapnil<br><em class="solo">Dagliya.</em></h2>
        <p class="fx" style="max-width:36em">Swapnil is from Pune. An IT engineer by training, he studied contemporary dance and ballet at Broadway Dance Center in New York and Opus Ballet in Florence. He has taught and performed Indian dance since 2008.</p>
        <p class="fx" style="max-width:36em">He holds a diploma in Indian folk dance and works across Ghoomar, Chari, Tera Taali, Ghantu, Khoriya, Bhangra and Garba, alongside Bollywood and semi-classical choreography.</p>
        <p class="fx" style="max-width:36em">In Ghent, he co-founded Shoonya Dance Centre, founded ABC in 2017 and began the Ghent India Dance Festival in 2023.</p>
        <p class="fx"><a class="button button-yellow" href="../contact/">Work with Swapnil and ABC <span>↗</span></a></p>
      </div>
    </section>

    <section class="scene-pad t-yellow" data-scene data-cue="a short history">
      <p class="label fx">A short history</p>
      <div class="intro">
        <h2 class="fx">One teacher<br><em class="solo">became a company.</em></h2>
        <div class="intro-copy fx"><p>ABC grew through teaching, public performances and the belief that Indian dance in Belgium needed both an open door and a serious stage.</p></div>
      </div>
      <div class="act-list">
        <article class="fx"><small>2017</small><span><strong>ABC is founded in Ghent</strong><em>Company begins</em></span></article>
        <article class="fx"><small>2018</small><span><strong>Featured on Canvas TV</strong><em>Belgian television · Dans met Hanne</em></span></article>
        <article class="fx"><small>2023</small><span><strong>Ghent India Dance Festival begins</strong><em>First edition</em></span></article>
        <article class="fx"><small>2024</small><span><strong>The Four Loves</strong><em>Full-length production</em></span></article>
        <article class="fx"><small>2026</small><span><strong>Sangam enters rehearsal</strong><em>New production · 7–8 Nov 2026</em></span></article>
      </div>
    </section>

    <section class="closing t-night" data-scene data-cue="meet us moving">
      <div>
        <p class="label fx" style="color:var(--yellow)">See a show. Or join one.</p>
        <h2 class="fx">Meet us<br><em class="solo">in motion.</em></h2>
        <p class="fx">Come to a public performance, enter a class or tell us what you want to create.</p>
      </div>
      <div class="button-row fx">
        <a class="button button-yellow" href="../whats-on/">See ABC live <span>→</span></a>
        <a class="button button-outline" href="../contact/">Contact ABC <span>↗</span></a>
      </div>
    </section>`;

export const outputs = () => [{ path: "about/index.html", html: page(def, body) }];
export default { def, body: () => page(def, body) };
