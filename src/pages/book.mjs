import { page, SITE, routeBar, marquee } from "../shell.mjs";

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Can the performance be tailored?", acceptedAnswer: { "@type": "Answer", text: "Yes. We shape repertoire, duration, company size and participation around your venue, audience and event format." } },
    { "@type": "Question", name: "Do workshops require experience?", acceptedAnswer: { "@type": "Answer", text: "No. Event workshops are designed so a complete beginner can join from the first minute. We can also build a deeper session for dancers." } },
    { "@type": "Question", name: "Where can ABC travel?", acceptedAnswer: { "@type": "Answer", text: "ABC is based in Ghent and works across Belgium and internationally. Share the city and date in your enquiry so we can discuss the practical setup." } },
    { "@type": "Question", name: "What should a booking enquiry include?", acceptedAnswer: { "@type": "Answer", text: "Please include the date, city, event type, rough audience size and what you want your audience to experience. We normally reply within three working days." } },
  ],
});

const def = {
  depth: 1,
  nav: "book/",
  title: "Indian dance performances and workshops in Belgium — ABC",
  desc: "Book ABC for Bollywood, Bhangra, Garba and Indian folk performances, event workshops and original productions across Belgium and Europe.",
  canonical: `${SITE}/book/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/assets/img/gidf/finale-hero.jpg`,
  bodyClass: "page-book",
  cinematic: true,
  firstCue: "enter",
  headerCta: { href: "../contact/", label: "Book ABC", glyph: "↗" },
  schemas: [FAQ_SCHEMA],
};

const body = `
    <section class="inner-hero t-night spot" id="top" aria-labelledby="page-title" data-scene data-stage data-cue="enter">
      <p class="ghost" aria-hidden="true">LIVE</p>
      <p class="inner-index" aria-hidden="true">01 · Performances</p>
      <div class="inner-hero-copy">
        <p class="inner-kicker fx">Performances · Workshops · Productions</p>
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
    ${marquee(["Performance", "Workshops", "Weddings", "Theatre", "Festivals", "A full dance floor"], { className: "t-yellow", speed: "26s" })}

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
        <article class="card fx" id="workshops"><small>02 · Participation</small><h3>Workshops for events</h3><p>A 60–90 minute Bollywood or Bhangra session that gets everyone moving. No dance experience needed.</p></article>
        <article class="card fx"><small>03 · Celebration</small><h3>Weddings and private events</h3><p>A company performance, a personalised opening dance, or choreography rehearsed with your group and adapted to your music.</p></article>
        <article class="card fx"><small>04 · Teams and schools</small><h3>Culture in motion</h3><p>Indian dance and yoga workshops for companies, classrooms and youth groups—active, contextual and adapted to the group.</p></article>
      </div>
    </section>

    <section class="scene-pad t-night media-led spot" id="productions" data-scene data-stage data-cue="original work">
      <div style="display:grid; gap:1rem; align-self:start">
        <figure class="frame sweep fx-scale" style="aspect-ratio: 3/2">
          <img src="../assets/img/abc/terah-taali-red-gala2023-jan-vens.jpg" alt="ABC Terah Taali performers seated in red stage smoke" loading="lazy" decoding="async" width="2400" height="1600">
          <figcaption><span>ABC · Terah Taali · PC Jan Vens</span></figcaption>
        </figure>
        <figure class="frame fx drift" data-scrub style="--drift:-24px; aspect-ratio: 3/2">
          <img src="../assets/img/abc/anarkali-ensemble-gala2023-jan-vens.jpg" alt="ABC production scene: white Anarkali soloist with the ensemble in blue and red light" loading="lazy" decoding="async" width="2400" height="1600">
          <figcaption><span>ABC · GIDF Gala 2023 · PC Jan Vens</span></figcaption>
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
        <div class="intro-copy fx"><p>See ABC live before bringing us to your event. These public dates show the range—from city festivals to original stage work.</p></div>
      </div>
      <div class="act-list">
        <a class="fx" href="../whats-on/#gentse-feesten-2026" data-preview="../assets/img/events/gentse-feesten-2026.jpg"><small>23 JUL</small><span><strong>Gentse Feesten</strong><em>Ghent · free sessions</em></span><b>↗</b></a>
        <a class="fx" href="../whats-on/#benenwerk-2026" data-preview="../assets/img/events/benenwerk-2026.jpg"><small>08 AUG</small><span><strong>Benenwerk</strong><em>Bruges · evening of Indian dance</em></span><b>↗</b></a>
        <a class="fx" href="../whats-on/#dansen-in-t-park-2026"><small>21–23 AUG</small><span><strong>Dansen in ’t Park</strong><em>Ghent · free weekend</em></span><b>↗</b></a>
        <a class="fx" href="../whats-on/#sangam-2026"><small>07–08 NOV</small><span><strong>Sangam</strong><em>Ghent · new production</em></span><b>↗</b></a>
      </div>
    </section>

    <section class="scene-pad t-bone" data-scene data-cue="the road book">
      <p class="label fx">Selected road book</p>
      <div class="intro">
        <h2 class="fx">Nine years<br><em class="solo">on the road.</em></h2>
        <div class="intro-copy fx"><p>Theatres, city squares, cultural festivals, company stages and television—from Ghent to Brussels, Maastricht, Luxembourg and beyond.</p></div>
      </div>
      <div class="folds fx">
        <details open><summary>2026–2024</summary><div class="fold-body prose"><ul><li>Ghent India Dance Festival · Ghent</li><li>Diwali Celebration · Luxembourg</li><li>Shoonya Indian Night · Gentse Feesten</li><li>Jump · NTGent</li><li>The Four Loves · Ghent</li><li>Indian dance at Leylet Raqs · Ghent</li></ul></div></details>
        <details><summary>2023–2020</summary><div class="fold-body prose"><ul><li>McKinsey event · Brussels</li><li>Indian Dance Lab · Liège</li><li>Dansen in ’t Park · Ghent</li><li>Belgium’s Got Talent</li><li>Minard Theatre · Ghent</li><li>Boombal Festival</li></ul></div></details>
        <details><summary>2019–2017</summary><div class="fold-body prose"><ul><li>Gentse Feesten · Ghent</li><li>Cultuurcentrum De Factorij</li><li>Canvas TV · Dans met Hanne</li><li>Chautara vzw · Ghent</li><li>Indian Festival · Ghent</li></ul></div></details>
      </div>
    </section>

    <section class="scene-pad t-paper" data-scene data-cue="good questions">
      <p class="label fx">Common questions</p>
      <h2 class="fx" style="margin-bottom:1.6rem">Before the<br><em class="solo">music starts.</em></h2>
      <div class="folds fx">
        <details><summary>Can the performance be tailored?</summary><div class="fold-body prose"><p>Yes. We shape repertoire, duration, company size and participation around your venue, audience and event format.</p></div></details>
        <details><summary>Do workshops require experience?</summary><div class="fold-body prose"><p>No. Event workshops are designed so a complete beginner can join from the first minute. We can also build a deeper session for dancers.</p></div></details>
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
        <details id="services"><summary>Detailed service guide</summary><div class="fold-body prose">
          <h2>Wedding performances &amp; choreography</h2>
          <p>A personalised opening dance for the couple, or a group performance for the guests. We choreograph and rehearse it with you, adapted to your music, your space and how much you want to dance yourselves.</p>
          <h2>Hen party dance workshops</h2>
          <p><em>Bollywood dance workshop for hen parties &amp; bachelorettes</em></p>
          <p>A Bollywood or Bhangra dance workshop is one of the most joyful ways to celebrate. We run 60–90 minute sessions for groups of any size — colourful skirts, scarves, and accessories included, easy-to-learn choreography, and a playlist that keeps the energy high from start to finish. No dance experience needed. Available across Belgium.</p>
          <h2>Energize, Engage, Elevate</h2>
          <p><em>Indian dance &amp; yoga workshops for corporate teams in Belgium</em></p>
          <p>Led by Swapnil Dagliya, Artistic Director of Shoonya Dance Centre, these 60–90 minute Bollywood dance or yoga workshops bring something genuinely different to team events. Costumes and props optional. Teams learn together, move together, and leave with more energy than they arrived with. Available as a standalone team event or as part of a company offsite — across Belgium.</p>
          <h2>Dance, Diversity, Dreams</h2>
          <p><em>Indian dance workshops for schools &amp; children in Belgium</em></p>
          <p>Swapnil Dagliya brings Indian culture into classrooms and youth groups through Bollywood choreography and folk dances like Bhangra. Sessions are adapted for all ages and end with a short performance — giving children a direct, active experience of Indian dance traditions. Available for primary and secondary schools across Belgium.</p>
        </div></details>
      </div>
    </section>

    <section class="closing t-night" data-scene data-cue="your booking">
      <div>
        <p class="label fx" style="color:var(--yellow)">Curtain call</p>
        <h2 class="fx">Have an event<br><em class="solo">in mind?</em></h2>
        <p class="fx">Tell us the date, city and kind of event. We will help shape the right performance or workshop.</p>
      </div>
      <p class="fx"><a class="button button-yellow" href="../contact/">Start a booking <span>↗</span></a></p>
    </section>`;

export default { def, body: () => page({ ...def, route: "book" }, body) };
export const outputs = () => [{ path: "book/index.html", html: page(def, body) }];
