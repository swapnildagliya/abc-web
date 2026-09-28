/* ABC link-in-bio — abcdans.com/links/ (the URL for @abollywoodcompany).
   Same pattern as links.swapnil.dance and links.shoonyadance.com: a pinned
   headline card, labelled rows, a social dock. Built from events.json with
   the same date logic as the agenda, so a date disappears on its own; every
   dated row also carries data-until and removes itself client-side the day
   after it ends, even if the daily rebuild is missed.
   Ownership: ABC rows are ABC's; classes (Shoonya) and workshops (Swapnil)
   are labelled hand-offs, never presented as ABC offers. */
import { head, SITE } from "../shell.mjs";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { eventSets } from "../events.mjs";

const TICKETS = "https://links.shoonyadance.com/go/ticket";
const { upcoming } = eventSets(JSON.parse(readFileSync(fileURLToPath(new URL("../data/events.json", import.meta.url)), "utf8")).events);
const performances = upcoming.filter(e => e.kind === "performance");

const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function range(e) {
  const [, sm, sd] = e.start.split("-").map(Number);
  const [, em, ed] = e.end.split("-").map(Number);
  if (e.start === e.end) return `${sd} ${MON[sm - 1]}`;
  return sm === em ? `${sd}–${ed} ${MON[sm - 1]}` : `${sd} ${MON[sm - 1]} – ${ed} ${MON[em - 1]}`;
}

// The pinned card is ABC's next ticketed production. SANGAM is the only one
// with a known ticket link and curtain time; anything else pins nothing.
const sangam = performances.find(e => e.id === "sangam-2026");
const pinned = sangam ? `
    <section class="lb-pin" data-until="${sangam.end}">
      <a class="lb-pin-card" href="${TICKETS}" target="_blank" rel="noopener">
        <img src="../assets/img/sangam/hero-mobile.jpg" alt="SANGAM artwork: a Madhubani river between a dry village and a green forest" width="1600" height="1200">
        <span class="lb-pin-top"><i>Pinned</i><b>Buy tickets · €20</b></span>
        <span class="lb-pin-copy">
          <strong>SANGAM</strong>
          <span class="lb-count" data-countdown="2026-11-07T19:30:00+01:00">Sat 7 Nov · 19:30 · Sun 8 Nov · 15:00</span>
          <small>ABC stage production · Shoonya Theatre, Ghent</small>
        </span>
        <span class="lb-go" aria-hidden="true">→</span>
      </a>
    </section>` : "";

function row({ tag, meta, title, sub, href, img, until, external }) {
  const target = external ? ` target="_blank" rel="noopener"` : "";
  const thumb = img
    ? `<img src="${img.src}" alt="" width="${img.w}" height="${img.h}" loading="lazy" decoding="async">`
    : `<span class="lb-thumb-mark" aria-hidden="true">${img === null ? "" : "ABC"}</span>`;
  return `
      <li${until ? ` data-until="${until}"` : ""}><a href="${href}"${target}>
        <span class="lb-thumb">${thumb}</span>
        <span class="lb-text"><em class="lb-tag">${tag}</em><small>${meta}</small><strong>${title}</strong>${sub ? `<span>${sub}</span>` : ""}</span>
        <span class="lb-go" aria-hidden="true">→</span>
      </a></li>`;
}

// Dated rows: every upcoming ABC performance (the agenda's own data), then the
// next GIDF edition, which ABC organises.
const dated = [
  // the pinned card already carries SANGAM; do not list it twice
  ...performances.filter(e => !(sangam && e.id === sangam.id)).map(e => row({
    tag: e.id === "sangam-2026" ? "Tickets" : "See ABC live",
    meta: `${range(e)} · ${e.city}`,
    title: e.title.split(/\s+[·—]\s+/)[0],
    sub: e.blurb || "",
    href: e.id === "sangam-2026" ? "../sangam/" : `../whats-on/#${e.id}`,
    img: e.image ? { src: `../${e.image.src}`, w: e.image.w, h: e.image.h } : undefined,
    until: e.end,
  })),
  row({ tag: "Save the date", meta: "7–9 May 2027 · Ghent", title: "Gent India Dans Festival", sub: "Edition Five · organised by ABC",
    href: "../festival/", img: { src: "../assets/img/gidf/edition-five-2027.jpg", w: 1080, h: 1350 }, until: "2027-05-09" }),
];

const evergreen = [
  row({ tag: "Book", meta: "Theatres · festivals · companies · weddings", title: "Book ABC for your event", sub: "Tell us the date, city and audience",
    href: "../contact/#book", img: { src: "../assets/img/abc/garba-ensemble-gala2023-backaert.jpg", w: 1200, h: 806 } }),
  row({ tag: "Watch", meta: "GIDF 2026 Gala · The Four Loves trailer", title: "See the company on stage",
    href: "../book/#watch", img: { src: "../assets/media/showcase/semiclassical-abc.jpg", w: 640, h: 360 } }),
  row({ tag: "News", meta: "A few emails a year", title: "Get ABC news", sub: "New shows, productions and festival dates",
    href: "https://www.shoonyadance.com/abc-news", external: true }),
  row({ tag: "Free", meta: "Ten lessons · at home", title: "Learn Bollywood basics", sub: "ABC’s free online course",
    href: "../learn-to-dance-bollywood/" }),
  row({ tag: "Classes · Shoonya", meta: "Tue · Wed · Thu evenings · Ghent", title: "Weekly classes with Swapnil", sub: "Run by Shoonya Dance Centre",
    href: "../learn/", img: { src: "../assets/img/events/opendeurdag-2026.jpg", w: 1200, h: 799 } }),
  row({ tag: "Workshops · Swapnil", meta: "Workshops · coaching · choreography", title: "Hire Swapnil", sub: "Booked with Swapnil personally at swapnil.dance",
    href: "https://swapnil.dance/workshops/", external: true, img: { src: "../assets/img/gidf/kalbeliya-swapnil-kalbeliya-stijn-dejonckheere.jpg", w: 800, h: 1200 } }),
];

const def = {
  depth: 1,
  title: "ABC a bollywood company · Links",
  desc: "Tickets, next dates and bookings for ABC a bollywood company, the Ghent-based Indian dance company.",
  canonical: `${SITE}/links/`,
  themeColor: "#10121A",
  ogImage: `${SITE}/assets/img/events/sangam-2026.jpg`,
};

const css = `
  body.page-links { background: var(--night); color: var(--bone); min-height: 100vh; }
  .lb { max-width: 460px; margin: 0 auto; padding: 22px 16px 120px; }
  .lb-head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .lb-head img { width: 54px; height: auto; }
  .lb-head div { flex: 1; min-width: 0; }
  .lb-head strong { display: block; font-size: 1.05rem; font-weight: 770; text-transform: uppercase; font-variation-settings: "wdth" 90; letter-spacing: .02em; }
  .lb-head small { display: block; font-size: .72rem; letter-spacing: .14em; text-transform: uppercase; opacity: .7; margin-top: 2px; }
  .lb-share { flex: none; border: 1px solid rgba(255,255,255,.25); background: none; color: inherit; border-radius: 999px; padding: .55rem .9rem; font: inherit; font-size: .72rem; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; cursor: pointer; }
  .lb-pin { margin-bottom: 22px; }
  .lb-pin-card { position: relative; display: block; aspect-ratio: 4 / 3.4; border-radius: 16px; overflow: hidden; color: #fff; box-shadow: 0 30px 60px -30px rgba(0,0,0,.9); }
  .lb-pin-card img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .lb-pin-card::after { content: ""; position: absolute; inset: 0; background: linear-gradient(transparent 30%, rgba(8,9,14,.88)); }
  .lb-pin-top { position: absolute; z-index: 1; top: 14px; left: 14px; display: flex; gap: 8px; }
  .lb-pin-top i, .lb-pin-top b { font-style: normal; font-size: .68rem; font-weight: 750; letter-spacing: .14em; text-transform: uppercase; padding: .45rem .75rem; border-radius: 999px; }
  .lb-pin-top i { background: rgba(10,10,20,.62); }
  .lb-pin-top b { background: var(--yellow); color: var(--ink); }
  .lb-pin-copy { position: absolute; z-index: 1; left: 18px; right: 70px; bottom: 18px; display: grid; gap: 6px; }
  .lb-pin-copy strong { font-size: 2.3rem; font-weight: 790; letter-spacing: .02em; font-variation-settings: "wdth" 84; line-height: 1; }
  .lb-count { font-size: .78rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 700; color: var(--yellow); }
  .lb-pin-copy small { font-size: .84rem; opacity: .85; }
  .lb-pin-card .lb-go { position: absolute; z-index: 1; right: 16px; bottom: 16px; width: 46px; height: 46px; border-radius: 50%; background: var(--yellow); color: var(--ink); display: grid; place-items: center; font-size: 1.3rem; }
  .lb-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(255,255,255,.14); }
  .lb-list li { border-bottom: 1px solid rgba(255,255,255,.14); }
  .lb-list a { display: grid; grid-template-columns: 64px 1fr 34px; align-items: center; gap: 14px; padding: 14px 0; color: inherit; }
  .lb-thumb { width: 64px; height: 64px; border-radius: 10px; overflow: hidden; background: var(--yellow); display: grid; place-items: center; }
  .lb-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .lb-thumb-mark { font-weight: 800; color: var(--ink); letter-spacing: .06em; font-size: .9rem; }
  .lb-text { display: grid; gap: 3px; min-width: 0; }
  .lb-tag { justify-self: start; font-style: normal; font-size: .62rem; font-weight: 780; letter-spacing: .14em; text-transform: uppercase; background: var(--yellow); color: var(--ink); padding: .22rem .5rem; border-radius: 4px; }
  .lb-text small { font-size: .7rem; letter-spacing: .12em; text-transform: uppercase; opacity: .7; }
  .lb-text strong { font-size: 1.12rem; font-weight: 760; line-height: 1.15; }
  .lb-text span { font-size: .84rem; opacity: .75; }
  .lb-list .lb-go { width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255,255,255,.35); display: grid; place-items: center; }
  .lb-label { margin: 26px 0 8px; font-size: .7rem; font-weight: 750; letter-spacing: .16em; text-transform: uppercase; opacity: .6; }
  .lb-all { display: block; text-align: center; margin: 22px 0 0; font-size: .74rem; font-weight: 750; letter-spacing: .16em; text-transform: uppercase; color: var(--yellow); }
  .lb-dock { position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%); display: flex; gap: 6px; padding: 8px; border-radius: 999px; background: var(--paper); color: var(--ink); box-shadow: 0 20px 40px -20px rgba(0,0,0,.8); }
  .lb-dock a { padding: .55rem .9rem; border-radius: 999px; font-size: .72rem; font-weight: 780; letter-spacing: .12em; text-transform: uppercase; }
  .lb-dock a:first-child { background: var(--yellow); }
  @media (hover: hover) and (pointer: fine) { .lb-list a:hover strong { text-decoration: underline; text-underline-offset: 3px; } }
`;

const script = `
(() => {
  // Dated rows and the pinned card drop themselves the day after they end
  // (Brussels date), mirroring fable.js on the homepage.
  const p = Object.fromEntries(new Intl.DateTimeFormat("en", { timeZone: "Europe/Brussels", year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(new Date()).map(x => [x.type, x.value]));
  const today = p.year + "-" + p.month + "-" + p.day;
  document.querySelectorAll("[data-until]").forEach(el => { if (el.dataset.until < today) el.remove(); });
  // Countdown on the pinned card; falls back to the printed dates without JS.
  const c = document.querySelector("[data-countdown]");
  if (c) {
    const t = new Date(c.dataset.countdown).getTime();
    const tick = () => {
      const s = Math.floor((t - Date.now()) / 1000);
      if (s <= 0) return;
      const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
      c.textContent = "Starts in " + d + "d " + h + "h " + m + "m · 7 & 8 Nov";
    };
    tick(); setInterval(tick, 30000);
  }
  // Share: native sheet where available, otherwise copy the link.
  const b = document.querySelector("[data-share]");
  b?.addEventListener("click", async () => {
    const url = "${SITE}/links/";
    try { if (navigator.share) { await navigator.share({ title: "ABC a bollywood company", url }); return; } await navigator.clipboard.writeText(url); b.textContent = "Copied"; } catch (e) {}
  });
})();`;

const html = () => `${head(def, "../")}
<body class="page-links">
  <main id="main" class="lb">
    <header class="lb-head">
      <img src="../assets/img/abc-mark-clean.png" alt="" width="1351" height="1026">
      <div><strong>ABC a bollywood company</strong><small>Indian dance company · Ghent → Europe</small></div>
      <button class="lb-share" type="button" data-share>Share</button>
    </header>
${pinned}
    <p class="lb-label">Next dates</p>
    <ul class="lb-list">${dated.join("")}
    </ul>
    <p class="lb-label">ABC</p>
    <ul class="lb-list">${evergreen.join("")}
    </ul>
    <a class="lb-all" href="../whats-on/">Full agenda →</a>
  </main>
  <nav class="lb-dock" aria-label="ABC elsewhere">
    <a href="../">abcdans.com</a>
    <a href="https://instagram.com/abollywoodcompany" target="_blank" rel="noopener">Instagram</a>
    <a href="https://facebook.com/abollywoodcompany" target="_blank" rel="noopener">Facebook</a>
  </nav>
  <style>${css}</style>
  <script>${script}</script>
</body>
</html>`;

export const outputs = () => [{ path: "links/index.html", html: html() }];
export default { def, body: html };
