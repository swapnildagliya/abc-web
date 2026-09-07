/* SANGAM — the production's own page on the ABC site.
   Every fact here traces to an approved source: the synopsis and practical
   details from the live performances.shoonyadance.com page, the characters and
   ensemble from the approved eight-slide character carousel, the artwork from
   FINAL-APPROVED/website (hero crops carry no text by design), and the dates,
   price and ticket link from src/data/events.json.
   English only — the Dutch synopsis has never been signed off. */
import { page, SITE, routeBar } from "../shell.mjs";

const TICKETS = "https://links.shoonyadance.com/go/ticket";

const EVENT_SCHEMA = JSON.stringify([
  {
    "@context": "https://schema.org", "@type": "TheaterEvent",
    name: "SANGAM — an Indian dance production",
    description: "One child. One river. Two worlds that must meet. An ABC a bollywood company production at Shoonya Dance Centre, Ghent.",
    image: `${SITE}/assets/img/events/sangam-2026.jpg`,
    startDate: "2026-11-07T19:30:00+01:00",
    endDate: "2026-11-07T20:45:00+01:00",
    duration: "PT1H15M",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    performer: { "@type": "PerformingGroup", name: "ABC a bollywood company" },
    organizer: { "@type": "Organization", name: "ABC a bollywood company", url: `${SITE}/` },
    location: {
      "@type": "Place", name: "Shoonya Theatre, Shoonya Dance Centre",
      address: { "@type": "PostalAddress", streetAddress: "Stapelplein 41", postalCode: "9000", addressLocality: "Ghent", addressCountry: "BE" },
    },
    offers: { "@type": "Offer", price: "20", priceCurrency: "EUR", url: TICKETS, availability: "https://schema.org/InStock" },
    typicalAgeRange: "8-",
  },
  {
    "@context": "https://schema.org", "@type": "TheaterEvent",
    name: "SANGAM — an Indian dance production",
    description: "One child. One river. Two worlds that must meet. An ABC a bollywood company production at Shoonya Dance Centre, Ghent.",
    image: `${SITE}/assets/img/events/sangam-2026.jpg`,
    startDate: "2026-11-08T15:00:00+01:00",
    endDate: "2026-11-08T16:15:00+01:00",
    duration: "PT1H15M",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    performer: { "@type": "PerformingGroup", name: "ABC a bollywood company" },
    organizer: { "@type": "Organization", name: "ABC a bollywood company", url: `${SITE}/` },
    location: {
      "@type": "Place", name: "Shoonya Theatre, Shoonya Dance Centre",
      address: { "@type": "PostalAddress", streetAddress: "Stapelplein 41", postalCode: "9000", addressLocality: "Ghent", addressCountry: "BE" },
    },
    offers: { "@type": "Offer", price: "20", priceCurrency: "EUR", url: TICKETS, availability: "https://schema.org/InStock" },
    typicalAgeRange: "8-",
  },
  {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "What’s on", item: `${SITE}/whats-on/` },
      { "@type": "ListItem", position: 3, name: "SANGAM" },
    ],
  },
]);

/* The five characters, exactly as approved on the character carousel. */
const CHARACTERS = [
  ["Rani Kanō", "The Queen", "One hidden child unsettles the world she controls.", "Svetlana Bubnova"],
  ["Manu", "The Hidden Boy", "Raised by sun, moon and forest, he watches a world he longs to enter.", "Swapnil Dagliya"],
  ["Prabha &amp; Chaaya", "The Sun &amp; The Moon", "Two guardians who shelter without possessing, always orbiting the same heart.", "Shreya Vaidya &amp; Laurien De Ridder"],
  ["Vayu", "The Messenger", "The wind belongs to no village. It carries every unanswered plea.", "Narcisse Merlier"],
  ["Uma", "The River Goddess · The Mother", "Before the river had a name, it began in a mother’s heart.", "Srimahavalli Thiyagarajan"],
];

const ENSEMBLE = [
  "Swapnil Dagliya", "Narcisse Merlier", "Sara Van Holm", "Svetlana Bubnova",
  "Chiara Bisinelli", "Kaushika Kumar", "Laurien De Ridder", "Khushboo Agarwal",
  "Shreya Vaidya", "Roshni Tela", "Haike Bourgeois", "Srimahavalli Thiyagarajan",
];

const CREDITS = [
  ["Concept", "Swapnil Dagliya with ABC a bollywood company"],
  ["Artistic direction", "Swapnil Dagliya"],
  ["Choreography", "Swapnil Dagliya"],
  ["Costumes", "ABC a bollywood company"],
  ["Production", "Wim Boussery &amp; Swapnil Dagliya"],
];

const def = {
  depth: 1,
  nav: "whats-on/",
  title: "SANGAM — an Indian dance production, 7 & 8 November 2026 | ABC",
  desc: "One child. One river. Two worlds that must meet. ABC a bollywood company’s Indian dance production, 7 and 8 November 2026 at Shoonya Theatre, Ghent.",
  canonical: `${SITE}/sangam/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/assets/img/events/sangam-2026.jpg`,
  bodyClass: "page-sangam",
  firstCue: "the river",
  headerCta: { href: TICKETS, label: "Book tickets", glyph: "↗" },
  schemas: [EVENT_SCHEMA],
};

const character = ([name, role, line, played], i) => `
        <li class="sangam-character fx">
          <small>0${i + 1}</small>
          <h3>${name}<em>${role}</em></h3>
          <p>${line}</p>
          <span>Played by ${played}</span>
        </li>`;

const fact = (term, value) => `<div><b>${term}</b><span>${value}</span></div>`;

const body = `
    <section class="sangam-hero" id="top" aria-labelledby="page-title" data-scene data-cue="the river">
      <picture class="sangam-art">
        <source media="(max-width: 720px)" srcset="../assets/img/sangam/hero-mobile.jpg" width="1600" height="1200">
        <img src="../assets/img/sangam/hero-desktop.jpg" alt="A Madhubani painting: a river runs between a parched village where women sit with an empty grain basket, and a green forest where a long-haired boy stands among flowering branches. A sun burns over the dry side, a crescent moon over the green. The river’s current forms the face and flowing hair of a goddess." width="1600" height="1867" fetchpriority="high" decoding="async">
      </picture>
      <div class="sangam-hero-copy">
        <p class="inner-kicker fx">ABC a bollywood company · at Shoonya Dance Centre</p>
        <h1 id="page-title"><span class="mask-line"><span>SANGAM</span></span><span class="mask-line"><span lang="hi" class="sangam-deva">संगम</span></span></h1>
        <p class="sangam-tagline fx">One child. One river.<br><em class="solo">Two worlds that must meet.</em></p>
        <p class="sangam-when fx">Sat 7 Nov 2026 · 19:30<i>·</i>Sun 8 Nov 2026 · 15:00</p>
        <div class="button-row fx">
          <a class="button button-yellow" href="${TICKETS}" target="_blank" rel="noopener">Book tickets <span>↗</span></a>
          <a class="button button-outline" href="#story">Read the story <span>↓</span></a>
        </div>
      </div>
    </section>
    ${routeBar("../", "whats-on/")}

    <section class="scene-pad t-paper" id="story" data-scene data-cue="the story">
      <div class="intro">
        <h2 class="fx">A story that moves<br><em class="solo">like water.</em></h2>
        <div class="intro-copy fx">
          <p>SANGAM begins in a world where water has not yet arrived. In an all-female village shaped by ritual, rhythm and inheritance, a child is born who unsettles the order of things. His presence asks a question the village is not ready to answer: what does it mean to love what you do not understand?</p>
          <p>Carried between rejection and tenderness, drought and abundance, the human and the divine, SANGAM follows a community as it loses its connection to the very source that sustains it.</p>
          <p>Through Indian folk, Bollywood, semi-classical movement and theatrical storytelling, the production moves like a river: gathering grief, memory, devotion and celebration into one current. A story of love withheld, love discovered, and the long journey back to wholeness.</p>
        </div>
      </div>
    </section>

    <section class="scene-pad t-bone" id="characters" data-scene data-cue="the characters">
      <p class="label fx">Five who carry it</p>
      <h2 class="fx" style="margin-bottom:1.4rem">Meet the<br><em class="solo">characters.</em></h2>
      <ol class="sangam-characters">${CHARACTERS.map(character).join("")}
      </ol>
    </section>

    <section class="perf-break t-blue spot" data-scene data-stage data-cue="two shows">
      <div>
        <p class="break-kicker fx">Two performances</p>
        <h2 class="fx">Sixty minutes,<em class="solo">one interval.</em></h2>
      </div>
      <div class="break-side">
        <p class="script-note fx">the bar opens half an hour early.</p>
        <img class="break-mark fx" src="../assets/img/abc-mark-clean.png" alt="" loading="lazy" decoding="async" width="1351" height="1026">
      </div>
    </section>

    <section class="scene-pad t-paper" id="practical" data-scene data-cue="practical">
      <p class="label fx">Before you come</p>
      <h2 class="fx" style="margin-bottom:1.4rem">Everything<br><em class="solo">you need to know.</em></h2>
      <div class="sangam-facts fx">
        ${fact("Saturday 7 November 2026", "19:30")}
        ${fact("Sunday 8 November 2026", "15:00")}
        ${fact("Shoonya Theatre", "Shoonya Dance Centre, Stapelplein 41, 9000 Ghent")}
        ${fact("Running time", "60 minutes plus a 15-minute interval")}
        ${fact("Tickets", "€20")}
        ${fact("Ages", "8 and up")}
        ${fact("Getting there", "10-minute walk from Gent-Dampoort station · paid street parking nearby")}
        ${fact("The bar", "Opens 30 minutes before each performance — come early, have a drink, find your seat")}
      </div>
      <p class="script-note fx" style="margin-top:1.2rem">both performances start sharp.</p>
    </section>

    <section class="scene-pad t-bone" id="company" data-scene data-cue="the company">
      <div class="intro">
        <h2 class="fx">Danced by<br><em class="solo">the company.</em></h2>
        <div class="intro-copy fx">
          <p>SANGAM is danced by ABC a bollywood company, the Belgian Indian dance company founded and led by Swapnil Dagliya — along with Bollyfolk, Bollywood and Bhangra students at Shoonya Dance Centre.</p>
        </div>
      </div>
      <ul class="sangam-ensemble fx">${ENSEMBLE.map(n => `<li>${n}</li>`).join("")}</ul>
      <dl class="sangam-credits fx">
        <div><dt>Presented by</dt><dd>An ABC a bollywood company production at Shoonya Dance Centre</dd></div>
        ${CREDITS.map(([t, v]) => `<div><dt>${t}</dt><dd>${v}</dd></div>`).join("\n        ")}
      </dl>
    </section>

    <section class="closing t-night" data-scene data-cue="book">
      <div>
        <p class="label fx" style="color:var(--yellow)">7 &amp; 8 November 2026 · Ghent</p>
        <h2 class="fx">Two worlds,<br><em class="solo">one evening.</em></h2>
        <p class="fx">Sixty minutes of Indian folk, Bollywood and semi-classical dance at Shoonya Theatre.</p>
      </div>
      <p class="fx"><a class="button button-yellow" href="${TICKETS}" target="_blank" rel="noopener">Book tickets <span>↗</span></a></p>
    </section>`;

export const outputs = () => [{ path: "sangam/index.html", html: page(def, body) }];
export default { def, body: () => page(def, body) };
