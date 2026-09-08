// Build the Fable 5 Motion Concept site into the folder root.
import { writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));

const pageModules = ["home", "book", "learn", "whatson", "sangam", "festival", "about", "contact", "privacy", "course", "redirects"];
let written = 0;

for (const name of pageModules) {
  const file = fileURLToPath(new URL(`./pages/${name}.mjs`, import.meta.url));
  if (!existsSync(file)) { console.log(`(skip ${name} — not written yet)`); continue; }
  const mod = await import(`./pages/${name}.mjs`);
  const outputs = mod.outputs ? mod.outputs() : [{ path: mod.default.def.path ?? pathFor(mod.default.def), html: mod.default.body() }];
  for (const out of outputs) {
    const target = join(ROOT, out.path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, out.html);
    written++;
  }
}

function pathFor(def) {
  return def.route ? join(def.route, "index.html") : "index.html";
}

/* GitHub Pages is case-sensitive; macOS is not. Five routes carry capitals
   (/tag/Bhangra, /category/Gent+India+dans+festival and friends) and Squarespace
   served them case-insensitively, so bookmarked lowercase URLs exist in the
   wild. Two casings cannot both exist in a macOS checkout, so the rescue lives
   in 404.html instead: this manifest is what it matches against. */
const routes = [];
(function walk(dir, base = "") {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || ["node_modules", "src", "scripts", "assets", "checkpoints", "deploy"].includes(entry.name)) continue;
    if (entry.isDirectory()) walk(join(dir, entry.name), `${base}/${entry.name}`);
    else if (entry.name === "index.html") routes.push(`${base}/`);
  }
})(ROOT);
writeFileSync(join(ROOT, "routes.json"), JSON.stringify(routes.sort()));
console.log(`built ${written} files · ${routes.length} routes in the manifest`);
