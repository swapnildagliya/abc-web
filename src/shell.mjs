// Shared page shell: head, header, menu, footer. All URLs relative — the
// site must run from any folder with no absolute local paths.

export const SITE = "https://www.abcbollywoodbelgium.com";

export const ORG_SCHEMA = JSON.stringify({
  "@context": "https://schema.org", "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "ABC a bollywood company", url: `${SITE}/`,
  logo: `${SITE}/assets/img/abc-mark-clean.png`,
  foundingDate: "2017",
  founder: { "@type": "Person", name: "Swapnil Dagliya" },
  address: { "@type": "PostalAddress", streetAddress: "Stapelplein 41", postalCode: "9000", addressLocality: "Ghent", addressCountry: "BE" },
  sameAs: ["https://instagram.com/abollywoodcompany", "https://facebook.com/abollywoodcompany", "https://www.youtube.com/c/swapkebolly"],
});

export function esc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

/* The site lives on a preview host while the domain is undecided, and every
   canonical still points at the live Squarespace site. Publishing it crawlable
   would put a duplicate of the real site on the open web, so every page is
   noindex UNLESS the build is explicitly a launch build:
       ABC_LAUNCH=1 node src/build.mjs
   Anything else — including a plain `node src/build.mjs` — stays noindex. */
export const PREVIEW = process.env.ABC_LAUNCH !== "1";

export function head(page, rel) {
  const schemas = [ORG_SCHEMA, ...(page.schemas || [])];
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8">
  <script>document.documentElement.className="js"</script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <link rel="canonical" href="${page.canonical}">${(page.noindex || PREVIEW) ? `\n  <meta name="robots" content="noindex,follow">` : ""}
  <meta name="description" content="${esc(page.desc)}">
  <meta name="theme-color" content="${page.themeColor || "#10121A"}">
  <link rel="icon" href="${rel}assets/img/abc-mark-clean.png" type="image/png">
  <link rel="stylesheet" href="${rel}assets/css/fonts.css">
  <link rel="stylesheet" href="${rel}assets/css/fable.css">
  <link rel="stylesheet" href="${rel}assets/css/scenes.css">${page.cinematic ? `\n  <link rel="stylesheet" href="${rel}assets/css/cinematic.css">` : ""}
  <!-- publish-meta:start -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ABC a bollywood company">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.desc)}">
  <meta property="og:url" content="${page.canonical}">
  <meta property="og:image" content="${page.ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.title)}">
  <meta name="twitter:description" content="${esc(page.desc)}">
  <meta name="twitter:image" content="${page.ogImage}">
${schemas.map(s => `  <script type="application/ld+json" data-publish-schema>${s}</script>`).join("\n")}
  <!-- publish-meta:end -->
</head>`;
}

export function header(page, rel) {
  const cta = page.headerCta || { href: `${rel}book/`, label: "Book ABC", glyph: "↗" };
  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="grain" aria-hidden="true"></div>
  <div class="progress" aria-hidden="true"><i></i></div>
${page.curtain ? `  <div class="curtain" role="presentation" aria-hidden="true">
    <img src="${rel}assets/img/abc-mark-clean.png" alt="" width="1351" height="1026">
    <small>A Bollywood Company</small>
    <button class="curtain-skip" type="button">Skip intro</button>
  </div>
` : ""}

  <header class="site-header${page.headerLight ? " header-light" : ""}" data-header>
    <a class="brand" href="${rel === "" ? "#top" : rel}" aria-label="ABC a bollywood company, home">
      <span class="brand-mark"><img src="${rel}assets/img/abc-mark-clean.png" alt="" width="1351" height="1026"></span>
      <span class="brand-name">A Bollywood Company<small>Ghent · Belgium</small></span>
    </a>
    <nav class="header-nav" aria-label="Primary">
      ${[
        ["book/", "Performances"], ["learn/", "Classes"], ["whats-on/", "What’s on"],
        ["festival/", "Festival"], ["about/", "About"], ["contact/", "Contact"],
      ].map(([href, label]) => `<a href="${rel}${href}"${page.nav === href ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
    </nav>
    <div class="header-actions">
      <a class="header-cta" href="${cta.href}">${cta.label} <span>${cta.glyph}</span></a>
      <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-menu"><span>Menu</span><i></i></button>
    </div>
  </header>

  <nav class="site-menu" id="site-menu" aria-hidden="true">
    <div class="menu-intro menu-step">
      <p class="label">Choose where to enter</p>
      <p>Five doors into one live company. Every one of them leads to the dance floor.</p>
    </div>
    <ol>
      ${[
        ["book/", "Performances", "Shows, workshops, productions"],
        ["learn/", "Classes", "Start, return, go deeper"],
        ["whats-on/", "What’s on", "Ghent, Belgium and beyond"],
        ["festival/", "The festival", "GIDF · Edition Five"],
        ["about/", "About ABC", "The company and its story"],
      ].map(([href, word, sub], i) => {
        const current = page.nav === href ? ' aria-current="page"' : "";
        return `<li class="menu-step"><a href="${rel}${href}"${current}><small>0${i + 1}</small><span class="menu-word">${word}</span><em>${sub}</em></a></li>`;
      }).join("\n      ")}
    </ol>
    <a class="menu-contact menu-step" href="${rel}contact/"${page.nav === "contact/" ? ' aria-current="page"' : ""}>Tell us what you’re planning →</a>
  </nav>`;
}

export function footer(rel) {
  const ribbon = `<span>Indian dance</span><i>✦</i><span>with roots</span><i>●</i><span>context</span><i>✦</i><span>and joy</span><i>↗</i><span>Ghent → Europe</span><i>✦</i>`;
  return `
  <footer class="site-footer">
    <div class="footer-marquee marquee" data-marquee aria-hidden="true" style="--marquee-t:34s">
      <div class="marquee-track"><div class="marquee-set">${ribbon}</div><div class="marquee-set">${ribbon}</div></div>
    </div>
    <div class="footer-grid">
      <div>
        <a class="footer-brand" href="${rel === "" ? "#top" : rel}" aria-label="ABC a bollywood company, back to top">
          <img src="${rel}assets/img/abc-mark-clean.png" alt="" width="1351" height="1026">
          <span class="brand-name">A Bollywood Company<small>Ghent · Belgium</small></span>
        </a>
        <p class="footer-tag">Indian dance with roots, context and joy.</p>
      </div>
      <nav aria-label="Explore"><span>Explore</span><a href="${rel}book/">Performances</a><a href="${rel}learn/">Classes</a><a href="${rel}whats-on/">What’s on</a><a href="${rel}festival/">Festival</a></nav>
      <nav aria-label="Company"><span>Company</span><a href="${rel}about/">About ABC</a><a href="${rel}contact/">Contact</a><a href="${rel}contact/#refunds">Refund policy</a></nav>
      <nav aria-label="Follow"><span>Follow</span><a href="https://instagram.com/abollywoodcompany" target="_blank" rel="noopener">Instagram ↗</a><a href="https://facebook.com/abollywoodcompany" target="_blank" rel="noopener">Facebook ↗</a><a href="https://www.youtube.com/c/swapkebolly" target="_blank" rel="noopener">YouTube ↗</a></nav>
      <div class="footer-address"><span>Home base</span><p>Shoonya Dance Centre<br>Stapelplein 41<br>9000 Ghent, Belgium</p></div>
    </div>
    <div class="footer-bottom"><span>© 2017–2026 ABC a bollywood company</span><span>Made in Ghent · Moving across Europe</span></div>
  </footer>
  <script src="${rel}assets/js/fable.js" defer></script>
</body>
</html>`;
}

// The persistent header nav now covers section navigation, so the per-page
// route-bar is redundant. Kept as a no-op so page templates don't need editing.
export function routeBar() { return ""; }

export function marquee(items, opts = {}) {
  const set = items.map((item, i) => `<span>${item}</span><i>${["✦", "●", "↗"][i % 3]}</i>`).join("");
  return `<div class="marquee ${opts.className || ""}" data-marquee aria-hidden="true"${opts.speed ? ` style="--marquee-t:${opts.speed}"` : ""}>
    <div class="marquee-track"><div class="marquee-set">${set}</div><div class="marquee-set">${set}</div></div>
  </div>`;
}

export function page(def, body) {
  const rel = "../".repeat(def.depth || 0);
  return `${head(def, rel)}
<body class="${def.bodyClass || ""}">
${header(def, rel)}

  <main id="main">
${def.rail !== false ? `  <aside class="act-rail" aria-hidden="true"><small>ABC · a live company</small><strong data-current-cue>${def.firstCue || "overture"}</strong></aside>\n` : ""}${body}
  </main>
${footer(rel)}`;
}
