import { page, SITE, routeBar, marquee } from "../shell.mjs";
import { enquiryForm, BOOKING_FIELDS, COACHING_FIELDS, FALLBACK_URL } from "../forms.mjs";

const FAQ_SCHEMA = JSON.stringify({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Are tickets and event registrations refundable?", acceptedAnswer: { "@type": "Answer", text: "Tickets for showcases, workshops and events are non-transferable and non-refundable. Missed sessions are not refunded." } },
    { "@type": "Question", name: "Can a class registration be transferred?", acceptedAnswer: { "@type": "Answer", text: "Class, workshop and miniseries fees are fixed and non-transferable. In a serious medical emergency, an eligible registration may be frozen and transferred to another season." } },
    { "@type": "Question", name: "What happens if ABC cancels?", acceptedAnswer: { "@type": "Answer", text: "If ABC cancels a class, workshop or miniseries session, a replacement or rescheduled session will be provided." } },
    { "@type": "Question", name: "What should I include in an enquiry?", acceptedAnswer: { "@type": "Answer", text: "For bookings include the date, city, venue, event type and audience. For classes include your experience and goals. ABC normally replies within three working days." } },
  ],
});

const def = {
  depth: 1,
  nav: "contact/",
  title: "Contact and book ABC a bollywood company",
  desc: "Contact ABC about an Indian dance performance, event workshop, class question or Ghent India Dance Festival idea.",
  canonical: `${SITE}/contact/`,
  themeColor: "#164BD8",
  ogImage: `${SITE}/assets/img/cutouts/tera-taali.png`,
  bodyClass: "page-contact",
  cinematic: true,
  firstCue: "hello",
  headerCta: { href: "#start", label: "Start here", glyph: "↓" },
  schemas: [FAQ_SCHEMA],
};

const FORM = FALLBACK_URL; // still correct for weekly classes and festival enquiries — Shoonya owns those

const body = `
    <section class="inner-hero t-blue spot" id="top" aria-labelledby="page-title" data-scene data-stage data-cue="hello">
      <p class="ghost" aria-hidden="true">HELLO</p>
      <p class="inner-index" aria-hidden="true">→</p>
      <div class="inner-hero-copy">
        <p class="inner-kicker fx">Performance · Class · Festival</p>
        <h1 id="page-title"><span class="mask-line"><span>Tell us what</span></span><span class="mask-line"><span><em class="solo">you’re planning.</em></span></span></h1>
        <p class="inner-hero-lead fx">A date, an event, a class question or the beginning of an idea. Give us the useful details; we will help shape the next step.</p>
        <div class="button-row fx">
          <a class="button button-yellow" href="#book">Invite us to perform <span>↓</span></a>
          <a class="button button-glass" href="#start">Other enquiries <span>↓</span></a>
        </div>
      </div>
      <div class="inner-hero-visual contain" style="align-self:end">
        <img class="fx-right drift" data-scrub style="--drift:-24px; max-height:64vh; width:auto; margin-inline:auto; filter: drop-shadow(0 26px 40px rgba(0,0,20,.5))" src="../assets/img/cutouts/tera-taali.png" alt="ABC artistic director Swapnil Dagliya performing Tera Taali, smiling with brass pots balanced on his head" width="1012" height="959">
        <p class="inner-hero-note script-note" style="color:var(--bone)">ideas welcome. details helpful.</p>
        <div class="stamp" aria-hidden="true"><strong>Rough ideas</strong><span>welcome</span></div>
      </div>
    </section>
    ${routeBar("../", "contact/")}
    ${marquee(["Date", "City", "Audience", "Idea", "Let’s move"], { className: "t-yellow", speed: "22s" })}

    <section class="scene-pad t-paper" id="start" data-scene data-cue="choose a door">
      <p class="label fx">Choose the shortest route</p>
      <div class="intro">
        <h2 class="fx">What kind<br><em class="solo">of question?</em></h2>
        <div class="intro-copy fx">
          <p>Two of these are forms on this page. Weekly classes and festival enquiries belong to Shoonya Dance Centre, so those routes hand you over there.</p>
          <p>We normally reply within three working days.</p>
        </div>
      </div>
      <div class="contact-options">
        <article class="contact-option fx"><small>01 · Booking</small><h3>Performance or workshop</h3><p>A theatre, a festival, a company party or a wedding. Bring the date, city, venue, rough audience size and the feeling you want to create.</p><a class="button button-dark" href="#book">Invite us to perform <span>↓</span></a></article>
        <article class="contact-option fx"><small>02 · Coaching</small><h3>One to one, online or here</h3><p>Private sessions with Swapnil for a performance, a wedding, technique or confidence on stage.</p><a class="button button-dark" href="#coaching">Ask about coaching <span>↓</span></a></article>
        <article class="contact-option fx"><small>03 · Classes &amp; festival</small><h3>Weekly classes or a GIDF idea</h3><p>Weekly classes run at Shoonya Dance Centre, and the Ghent India Dance Festival keeps its own inbox for artist proposals, partnerships and volunteering.</p><a class="button button-dark" href="${FORM}" target="_blank" rel="noopener">Go to the Shoonya form <span>↗</span></a></article>
      </div>
    </section>

    <section class="scene-pad t-bone form-scene" id="book" data-scene data-cue="invite us">
      <p class="label fx">01 · Booking</p>
      <div class="intro">
        <h2 class="fx">Invite us<br><em class="solo">to perform.</em></h2>
        <div class="intro-copy fx">
          <p>Forty-plus stages since 2017 — theatres, city squares, festivals, company evenings and weddings, from a solo to the full company.</p>
          <p>Nothing here is binding. A rough date and a rough budget are enough to start a useful conversation.</p>
        </div>
      </div>
      ${enquiryForm({
        id: "book-abc",
        subject: "ABC website — performance / workshop booking",
        submit: "Send the booking enquiry",
        fields: BOOKING_FIELDS,
        consent: "Send me occasional ABC news — new shows, festival dates and classes. No more than a few times a year.",
      })}
    </section>

    <section class="scene-pad t-paper form-scene" id="coaching" data-scene data-cue="one to one">
      <p class="label fx">02 · Coaching</p>
      <div class="intro">
        <h2 class="fx">One to one,<br><em class="solo">at your pace.</em></h2>
        <div class="intro-copy fx">
          <p>Private coaching with Swapnil — online from anywhere, or in person in Ghent. A first dance, a stage piece, or the technique underneath whichever style you are learning.</p>
          <p>Tell us where you are starting from; the answer comes back with a format and a next step, not a price list.</p>
        </div>
      </div>
      ${enquiryForm({
        id: "coaching",
        subject: "ABC website — private coaching enquiry",
        submit: "Send the coaching enquiry",
        fields: COACHING_FIELDS,
      })}
    </section>

    <section class="perf-break t-night spot" data-scene data-stage data-cue="start with hello">
      <div>
        <p class="break-kicker fx">Start with hello</p>
        <h2 class="fx">Rough ideas<em class="solo"> welcome. Really.</em></h2>
      </div>
      <div class="break-side">
        <p class="script-note fx">dates can come later.</p>
        <img class="break-mark fx" src="../assets/img/abc-mark-clean.png" alt="" loading="lazy" decoding="async" width="1351" height="1026">
      </div>
    </section>

    <section class="scene-pad t-blue" data-scene data-cue="what happens next">
      <p class="label fx" style="color:var(--yellow)">What happens next</p>
      <div class="intro">
        <h2 class="fx">A useful reply,<br><em class="solo">not a sales script.</em></h2>
        <div class="intro-copy fx">
          <p>For bookings, we first check the date, travel and practical shape of the event. Then we discuss the format, company size and preparation the venue needs.</p>
          <p>For classes and coaching, we help you find the right level or next step. For the festival, we route the message to the relevant part of the programme.</p>
          <p class="editorial-line">Clear details lead to a better idea.</p>
        </div>
      </div>
      <div class="stat-row fx">
        <div><b>3</b><span>Working days to reply</span></div>
        <div><b>Ghent</b><span>Home base</span></div>
        <div><b>Europe</b><span>Bookings and workshops</span></div>
        <div><b>Two</b><span>Forms on this page</span></div>
      </div>
    </section>

    <section class="scene-pad t-bone" data-scene data-cue="home base">
      <p class="label fx">Home base</p>
      <div class="intro">
        <h2 class="fx">Find us<br><em class="solo">in Ghent.</em></h2>
        <div class="intro-copy fx">
          <p><strong>Shoonya Dance Centre</strong><br>Stapelplein 41<br>9000 Ghent, Belgium</p>
          <p>Classes, rehearsals and much of the festival programme begin here. Event bookings can travel across Belgium and internationally.</p>
          <div class="button-row">
            <a class="button button-dark" href="#book">Invite us to perform <span>↑</span></a>
            <a class="button button-outline" href="../whats-on/">See upcoming dates <span>→</span></a>
          </div>
        </div>
      </div>
    </section>

    <section class="scene-pad t-paper" id="refunds" data-scene data-cue="small print">
      <p class="label fx">Refund policy</p>
      <h2 class="fx" style="margin-bottom:1.6rem">The practical<br><em class="solo">small print.</em></h2>
      <div class="folds fx">
        <details><summary>Tickets and event registrations</summary><div class="fold-body prose"><p>Tickets for showcases, workshops and events are non-transferable and non-refundable. Missed sessions are not refunded.</p></div></details>
        <details><summary>Classes and miniseries</summary><div class="fold-body prose"><p>Membership, workshop and miniseries fees are fixed and non-transferable. In a serious medical emergency, a request may be made to freeze and transfer eligible registration to another season; transferred credit expires one year after the original start date.</p></div></details>
        <details><summary>If ABC cancels</summary><div class="fold-body prose"><p>If ABC cancels a class, workshop or miniseries session, a replacement or rescheduled session will be provided.</p></div></details>
        <details><summary>Force majeure and administration</summary><div class="fold-body prose"><p>Events that cannot proceed due to circumstances beyond the organiser’s control are not refundable. Cancellation requests may carry a €25 administration fee per person. Policy updates are made with fairness and transparency.</p></div></details>
      </div>
    </section>

    <section class="closing t-night" data-scene data-cue="the useful details">
      <div>
        <p class="label fx" style="color:var(--yellow)">One good message</p>
        <h2 class="fx">Start with the<br><em class="solo">useful details.</em></h2>
        <p class="fx">Date, city and audience for a booking. Experience and goals for a class. The kind of idea for the festival.</p>
      </div>
      <p class="fx"><a class="button button-yellow" href="#book">Invite us to perform <span>↑</span></a></p>
    </section>`;

// Where a native (no-JS) form POST lands. Web3Forms redirects here itself, so
// people without JavaScript still get a branded confirmation rather than the
// Web3Forms default page. noindex: it is a form endpoint, not a destination.
const thanksDef = {
  ...def,
  depth: 2,
  title: "Message sent — ABC a bollywood company",
  desc: "Your enquiry has reached ABC a bollywood company.",
  canonical: `${SITE}/contact/thank-you/`,
  noindex: true,
  cinematic: false,
  rail: false,
  firstCue: "thank you",
  headerCta: { href: "../../whats-on/", label: "What's on", glyph: "→" },
  schemas: [],
};

const thanksBody = `
    <section class="scene-pad t-blue thanks-scene" data-scene data-cue="thank you">
      <p class="label fx" style="color:var(--yellow)">Message sent</p>
      <div class="intro">
        <h2 class="fx">Thank you.<br><em class="solo">We have it.</em></h2>
        <div class="intro-copy fx">
          <p>Your enquiry is with us. We normally reply within three working days — if the date is tight, say so in a follow-up and we will move it up the pile.</p>
          <p>Nothing is booked yet. The reply comes back with questions, options and what the event would actually involve.</p>
        </div>
      </div>
      <div class="button-row fx">
        <a class="button button-yellow" href="../../whats-on/">See upcoming dates <span>→</span></a>
        <a class="button button-outline" href="../../">Back to the homepage <span>→</span></a>
      </div>
    </section>`;

export const outputs = () => [
  { path: "contact/index.html", html: page(def, body) },
  { path: "contact/thank-you/index.html", html: page(thanksDef, thanksBody) },
];
export default { def, body: () => page(def, body) };
