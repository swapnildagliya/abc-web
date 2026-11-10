import { page, SITE } from "../shell.mjs";

/* ABC's own full-length stage work, one block per production. Every line here is
   already published elsewhere on the site (the Sangam page and the old /book
   productions section) — no copy is invented for this page. Newest first. */

const def = {
  depth: 1,
  nav: "book/",
  title: "Original Indian dance productions — Sangam & The Four Loves | ABC",
  desc: "ABC's full-length Indian dance productions: Sangam (premiered 7 November 2026, Ghent) and The Four Loves (premiered 2024). Story, credits and trailer.",
  canonical: `${SITE}/productions/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/assets/img/sangam/og.jpg`,
  bodyClass: "page-productions",
  cinematic: true,
  firstCue: "enter",
  headerCta: { href: "../contact/#book", label: "Book ABC", glyph: "↗" },
};

const body = `
    <section class="inner-hero t-night spot" id="top" aria-labelledby="page-title" data-scene data-stage data-cue="enter">
      <p class="ghost" aria-hidden="true">STAGE</p>
      <p class="inner-index" aria-hidden="true">01 · Productions</p>
      <div class="inner-hero-copy">
        <p class="inner-kicker fx">Original stage work</p>
        <h1 id="page-title"><span class="mask-line"><span>Original</span></span><span class="mask-line"><span><em class="solo">productions.</em></span></span></h1>
        <p class="inner-hero-lead fx">ABC also creates full-length Indian dance productions. Folk, Bollywood and semi-classical forms meet without losing their individual histories.</p>
        <div class="button-row fx">
          <a class="button button-yellow" href="#sangam">Sangam <span>↓</span></a>
          <a class="button button-glass" href="#the-four-loves">The Four Loves <span>↓</span></a>
        </div>
      </div>
      <div class="inner-hero-visual">
        <figure class="frame sweep fx-scale" style="aspect-ratio: 4/5">
          <img src="../assets/img/sangam/hero-desktop.jpg" alt="A Madhubani painting: a river runs between a parched village where women sit with an empty grain basket, and a green forest where a long-haired boy stands among flowering branches. A sun burns over the dry side, a crescent moon over the green. The river’s current forms the face and flowing hair of a goddess." width="1600" height="1867">
          <figcaption><span>Sangam · 2026</span></figcaption>
        </figure>
      </div>
    </section>

    <section class="scene-pad t-night" id="sangam" data-scene data-cue="sangam">
      <p class="label fx" style="color:var(--yellow)">01 · Premiered 7 November 2026 · Shoonya Theatre, Ghent</p>
      <div class="intro">
        <h2 class="fx">Sangam</h2>
        <div class="intro-copy fx">
          <p>A village without water, and a child who belongs to no one. Seventy minutes of Indian folk, Bollywood and semi-classical dance.</p>
          <p>Both performances, on 7 and 8 November, sold out.</p>
        </div>
      </div>
      <p class="fx production-credits"><strong>Sangam credits</strong> · Concept, direction &amp; choreography: Swapnil Dagliya, in collaboration with the ABC dancers · Production: Wim Boussery &amp; Swapnil Dagliya · Dancers: Swapnil Dagliya, Narcisse Merlier, Sara Van Holm, Svetlana Bubnova, Chiara Bisinelli, Kaushika Kumar, Laurien De Ridder, Khushboo Agarwal, Shreya Vaidya, Roshni Tela, Haike Bourgeois &amp; Srimahavalli Thiyagarajan · Lighting: Leander Leeman · Costumes: ABC a bollywood company · An ABC a bollywood company production at Shoonya Dance Centre</p>
      <div class="button-row fx">
        <a class="button button-yellow" href="../sangam/">The story, characters &amp; cast <span>→</span></a>
      </div>
    </section>

    <section class="scene-pad t-night-2" id="the-four-loves" data-scene data-cue="the four loves">
      <p class="label fx" style="color:var(--yellow)">02 · Premiered 2024</p>
      <div class="intro">
        <h2 class="fx">The Four Loves</h2>
        <div class="intro-copy fx">
          <p><em>The Four Loves</em> explores devotion (<em>bhakti</em>), familial affection (<em>vatsalya</em>), romance (<em>shringar</em>) and universal connection (<em>prema</em>) through Ghoomar, Chari, Tera Taali, Garba, Bhangra, Bollywood and Kathak-shaped semi-classical work.</p>
        </div>
      </div>
      <p class="fx production-credits"><strong>The Four Loves credits</strong> · Choreography: Swapnil Dagliya · Production: Wim Boussery &amp; Swapnil Dagliya · Dancers: Chiara Bisinelli, Kaushika Kumar, Khushboo Agarwal, Laurien De Ridder, Narcisse Merlier, Roshni Tela, Sara Van Holm, Shreya Vaidya, Svetlana Bubnova, Siddhy Shetty &amp; Swapnil Dagliya · Guest performer: Pranali Sanghmitra Bhagwat · Lights: Johan Van Compernolle · Sound: Wim Boussery · Dramaturgy: Rita Hendricks · Trailer: shot by Marc Antoine, edited by Rajat Senjaliya · Supported by Shoonya Dance Centre</p>
      <div class="button-row fx">
        <a class="button button-yellow" href="https://www.youtube.com/watch?v=2efQqxnI8s0" target="_blank" rel="noopener">Watch the trailer <span>↗</span></a>
      </div>
    </section>

    <section class="closing t-night" data-scene data-cue="your stage">
      <div>
        <p class="label fx" style="color:var(--yellow)">Curtain call</p>
        <h2 class="fx">Have an event<br><em class="solo">in mind?</em></h2>
      </div>
      <p class="fx"><a class="button button-yellow" href="../contact/#book">Discuss a production <span>↗</span></a></p>
    </section>`;

export default { def, body: () => page({ ...def, route: "productions" }, body) };
export const outputs = () => [{ path: "productions/index.html", html: page(def, body) }];
