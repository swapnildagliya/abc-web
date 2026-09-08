/* Privacy notice. Every statement here describes what the site actually does —
   the two enquiry forms in src/forms.mjs, their Web3Forms endpoint, and the one
   sessionStorage key set in assets/js/fable.js. Nothing is aspirational. If a
   form field, a processor or a script changes, this page changes with it. */
import { page, SITE, routeBar } from "../shell.mjs";

const CONTACT = "contact/";

/* The fields each form actually renders, kept in the order the visitor meets
   them so the list can be checked against the page rather than trusted. */
const BOOKING = [
  "First name and last name", "Email", "Phone", "What you are booking",
  "City and venue", "Preferred date", "Rough audience size", "Budget",
  "How you heard about ABC", "What you are planning",
];
const COACHING = [
  "Name", "Email", "Location and time zone", "Dance style",
  "Experience", "Format", "What you want to work on",
];

const def = {
  depth: 1,
  nav: "contact/",
  title: "Privacy — what we do with what you send us | ABC",
  desc: "What ABC a bollywood company collects through its enquiry forms, who processes it, how long it is kept, and how to have it deleted.",
  canonical: `${SITE}/privacy/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/assets/img/gidf/finale-hero.jpg`,
  bodyClass: "page-legal",
  firstCue: "privacy",
  headerLight: true,
  headerCta: { href: "../contact/", label: "Contact", glyph: "↗" },
};

const list = (items) => `<ul class="legal-fields">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;

const body = `
    <section class="inner-hero t-bone" id="top" aria-labelledby="page-title" data-scene data-cue="privacy">
      <div>
        <p class="inner-kicker fx">Privacy</p>
        <h1 id="page-title"><span class="mask-line"><span>What we do with</span></span><span class="mask-line"><span><em class="solo">what you send us.</em></span></span></h1>
        <p class="inner-hero-lead fx">Short version: two forms on this site, one company that reads them, one service that delivers the mail. Nothing is sold, nothing is profiled, and there is no advertising anywhere on this site.</p>
      </div>
    </section>
    ${routeBar("../", "contact/")}

    <section class="scene-pad t-paper" id="who" data-scene data-cue="who">
      <p class="label fx">Who is responsible</p>
      <h2 class="fx">The company<br><em class="solo">behind this site.</em></h2>
      <div class="prose fx">
        <p>ABC a bollywood company is the performing name of <strong>Shoonya Dance VZW</strong>, a non-profit registered in Belgium.</p>
        <p>Enterprise number BE 631.862.552<br>Stapelplein 41, 9000 Ghent, Belgium</p>
        <p>Shoonya Dance VZW is the data controller for this website. To reach us about anything on this page, use the <a href="../${CONTACT}">contact page</a>.</p>
      </div>
    </section>

    <section class="scene-pad t-bone" id="collect" data-scene data-cue="what">
      <p class="label fx">What is collected</p>
      <h2 class="fx" style="margin-bottom:1rem">Only what you<br><em class="solo">type into a form.</em></h2>
      <div class="prose fx">
        <p>This site has two forms and no other way of collecting anything about you.</p>
        <h3>Booking enquiry</h3>
        ${list(BOOKING)}
        <h3>Coaching enquiry</h3>
        ${list(COACHING)}
        <p>Both forms also carry a hidden field that catches automated spam. It records nothing about you.</p>
        <p>Each form has an optional tick-box to receive occasional news about shows, festival dates and classes. It is off unless you tick it, and the enquiry is answered either way.</p>
      </div>
    </section>

    <section class="scene-pad t-paper" id="processor" data-scene data-cue="who sees it">
      <p class="label fx">Who else sees it</p>
      <h2 class="fx" style="margin-bottom:1rem">One service,<br><em class="solo">named plainly.</em></h2>
      <div class="prose fx">
        <p>When you submit a form, it is delivered to us by <strong>Web3Forms</strong> (<span>web3forms.com</span>), which turns the submission into an email. Everything you typed passes through their service on the way to us. They act as our processor for that delivery and for nothing else.</p>
        <p>Nobody else receives your enquiry. We do not sell, rent or share it, and it is not used to build any profile of you.</p>
        <p>Some pages link out to Instagram, Facebook, YouTube, Google Maps and our ticketing and class pages. Those are ordinary links — nothing is embedded, and none of those companies learns anything about you unless you choose to follow the link.</p>
      </div>
    </section>

    <section class="scene-pad t-bone" id="cookies" data-scene data-cue="cookies">
      <p class="label fx">Cookies and tracking</p>
      <h2 class="fx" style="margin-bottom:1rem">There are<br><em class="solo">no cookies.</em></h2>
      <div class="prose fx">
        <p>This site sets no cookies, runs no analytics, and carries no advertising or tracking scripts of any kind. That is why you have not been asked to accept anything.</p>
        <p>One small thing is stored by your own browser: a single flag recording that you have already seen the opening title card, so it does not play again on every page. It contains no information about you, it never leaves your device, and it is cleared when you close the browser.</p>
      </div>
    </section>

    <section class="scene-pad t-paper" id="keeping" data-scene data-cue="how long">
      <p class="label fx">How long it is kept</p>
      <h2 class="fx" style="margin-bottom:1rem">As long as the<br><em class="solo">conversation needs.</em></h2>
      <div class="prose fx">
        <p>Enquiries live in our mailbox. An enquiry that turns into a booking is kept with the rest of that booking's paperwork, because Belgian bookkeeping rules require it. An enquiry that goes nowhere is deleted once it is clear nothing will come of it.</p>
        <p>If you asked for news, you stay on that list until you ask to come off it. Every such message includes a way to stop receiving them.</p>
        <p>The lawful basis is our legitimate interest in answering people who contact us about work, and your consent for the optional news.</p>
      </div>
    </section>

    <section class="scene-pad t-bone" id="rights" data-scene data-cue="your rights">
      <p class="label fx">Your rights</p>
      <h2 class="fx" style="margin-bottom:1rem">You can ask,<br><em class="solo">and we answer.</em></h2>
      <div class="prose fx">
        <p>Under the GDPR you may ask what we hold about you, ask for a copy, ask for it corrected, ask for it deleted, ask us to restrict what we do with it, or object to us holding it at all. You may also withdraw consent for the news list at any time.</p>
        <p>Ask through the <a href="../${CONTACT}">contact page</a> and we will answer within one month.</p>
        <p>If you think we have handled your data badly, you can complain to the Belgian Data Protection Authority, Gegevensbeschermingsautoriteit, Drukpersstraat 35, 1000 Brussels.</p>
      </div>
    </section>

    <section class="closing t-night" data-scene data-cue="contact">
      <div>
        <p class="label fx" style="color:var(--yellow)">Questions about any of this</p>
        <h2 class="fx">Ask us<br><em class="solo">directly.</em></h2>
        <p class="fx">We would rather answer a question about your data than have you guess at the answer.</p>
      </div>
      <p class="fx"><a class="button button-yellow" href="../${CONTACT}">Contact ABC <span>↗</span></a></p>
    </section>`;

export const outputs = () => [{ path: "privacy/index.html", html: page(def, body) }];
export default { def, body: () => page(def, body) };
