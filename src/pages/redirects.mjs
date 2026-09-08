// 80 branded legacy-compatibility redirect stubs + the nested-path-safe 404.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const redirects = JSON.parse(readFileSync(fileURLToPath(new URL("../data/redirects.json", import.meta.url)), "utf8"));

function stub(r) {
  const depth = r.route.split("/").length;
  const rel = "../".repeat(depth);
  const dest = r.dest || "the redesigned site";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${r.title}</title>
  <meta name="description" content="${r.desc}">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="${r.canonical}">
  <meta name="theme-color" content="#10121A">
  <link rel="icon" href="${rel}assets/img/abc-mark-clean.png" type="image/png">
  <link rel="stylesheet" href="${rel}assets/css/fonts.css">
  <link rel="stylesheet" href="${rel}assets/css/fable.css">
  <meta http-equiv="refresh" content="0;url=${r.target}">
</head><body class="redirect-page">
  <main class="redirect-card" id="main">
    <a class="redirect-brand" href="${rel}"><img src="${rel}assets/img/abc-mark-clean.png" alt="" width="1351" height="1026"><span>A Bollywood Company<br>Ghent · Belgium</span></a>
    <p class="redirect-eyebrow">This page has moved</p>
    <h1>Keep moving.</h1>
    <p>We have brought this page into <strong>${dest}</strong>. You are being taken there now.</p>
    <div class="button-row">
      <a class="button button-yellow" href="${r.target}">Continue <span>→</span></a>
      <a class="button button-outline" href="${rel}">ABC home <span>↗</span></a>
    </div>
  </main>
</body></html>`;
}

const NOT_FOUND = `<!doctype html><html lang="en"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,follow">
  <title>Page not found | ABC</title>
  <meta name="description" content="This ABC page could not be found. Continue to performances, classes, events or the festival.">
  <link rel="stylesheet" href="/assets/css/fonts.css">
  <link rel="stylesheet" href="/assets/css/fable.css">
  <link rel="icon" href="/assets/img/abc-mark-clean.png" type="image/png">
  <style>
    .redirect-page { position: relative; isolation: isolate; }
    .redirect-backdrop { position: absolute; inset: 0; z-index: -1; overflow: hidden; }
    .redirect-backdrop img { width: 100%; height: 100%; object-fit: cover; opacity: .5; }
    .redirect-backdrop::after { content: ""; position: absolute; inset: 0; background: radial-gradient(80% 70% at 50% 40%, transparent, rgba(9,10,16,.88)); }
  </style>
</head><body class="redirect-page">
  <div class="redirect-backdrop" aria-hidden="true"><img src="/assets/img/gidf/julien-gala-showcase-pc-stijn-dejonckheere.jpg" alt="" width="1400" height="933"></div>
  <main class="redirect-card" id="main">
    <a class="redirect-brand" href="/"><img src="/assets/img/abc-mark-clean.png" alt="" width="1351" height="1026"><span>A Bollywood Company<br>Ghent · Belgium</span></a>
    <p class="redirect-eyebrow">404 · Wrong turn</p>
    <h1>An empty stage.</h1>
    <p>This page has moved, changed or never existed. The company is still dancing — the light is just pointing somewhere else.</p>
    <div class="button-row">
      <a class="button button-yellow" href="/whats-on/">See what’s on <span>→</span></a>
      <a class="button button-outline" href="/">Return home <span>↗</span></a>
    </div>
  </main>
  <script>
    /* GitHub Pages is case-sensitive; macOS is not, which is why every local
       check passed while /tag/bhangra 404'd in production. Squarespace served
       both casings, so wrong-cased bookmarks exist in the wild. Two casings
       cannot coexist in a macOS checkout, so the rescue lives here: match the
       requested path against the build's route manifest ignoring case, and go
       there when exactly one route matches. Anything ambiguous keeps this page. */
    (async () => {
      try {
        const base = location.pathname.match(/^\\/[^/]+\\/(?=.)/)?.[0] ?? "/";
        const want = decodeURIComponent(location.pathname).replace(/\\/?$/, "/").toLowerCase();
        const res = await fetch(base + "routes.json", { cache: "no-store" });
        if (!res.ok) return;
        const routes = await res.json();
        const root = base.replace(/\\/$/, "");
        const hit = routes.filter(r => decodeURIComponent(root + r).toLowerCase() === want);
        if (hit.length === 1) location.replace(root + hit[0] + location.search + location.hash);
      } catch (e) { /* stay on the 404 */ }
    })();
  </script>
</body></html>`;

export const outputs = () => [
  ...redirects.map(r => ({ path: `${r.route}/index.html`, html: stub(r) })),
  { path: "404.html", html: NOT_FOUND },
];
export default { def: { route: "404-set" }, body: () => "" };
