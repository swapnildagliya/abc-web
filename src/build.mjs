// Build the Fable 5 Motion Concept site into the folder root.
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
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

console.log(`built ${written} files`);
