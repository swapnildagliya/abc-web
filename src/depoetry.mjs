// One-shot slogan pass (v5): personality, not fluff.
// Razor: keep meant things (specific, concrete, or a deliberate joke);
// replace abstract poster-copy with flat facts that still have a wink.
// Errors loudly if any expected string is missing.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const P = (f) => fileURLToPath(new URL(`./pages/${f}`, import.meta.url));

const EDITS = {
  "home.mjs": [
    // Act II: say the fact (40+ shows), keep the grin
    ["Colour arrives<br><em class=\"solo\">before we do.</em>", "Forty-plus shows.<br><em class=\"solo\">Zero quiet ones.</em>"],
    ["<span class=\"stage-note\">A stage should feel alive.</span>", "<span class=\"stage-note\">loud costumes. louder dhol.</span>"],
    // Act IV: Learn keeps "Start where your feet are."; home states the offer
    ["Start where<br><em class=\"solo\">your feet are.</em>", "Weekly classes<br><em class=\"solo\">in Ghent.</em>"],
    // Act V: the festival act states the fact
    ["One weekend.<br><em class=\"solo\">A whole scene.</em>", "Three days of India<br><em class=\"solo\">in Ghent.</em>"],
  ],
  "book.mjs": [
    ["<span class=\"mask-line\"><span>Bring the</span></span><span class=\"mask-line\"><span><em class=\"solo\">event alive.</em></span></span>", "<span class=\"mask-line\"><span>Book the</span></span><span class=\"mask-line\"><span><em class=\"solo\">company.</em></span></span>"],
    ["Indian dance,<br><em class=\"solo\">built for here.</em>", "Shaped to<br><em class=\"solo\">your event.</em>"],
    ["Stories need<br><em class=\"solo\">a full stage.</em>", "Original<br><em class=\"solo\">productions.</em>"],
    ["A company<br><em class=\"solo\">in motion.</em>", "Nine years<br><em class=\"solo\">on the road.</em>"],
    ["Every format.<br><em class=\"solo\">Every stage.</em>", "The complete<br><em class=\"solo\">dossier.</em>"],
  ],
  "learn.mjs": [
    ["Different reasons.<br><em class=\"solo\">One good start.</em>", "What do you<br><em class=\"solo\">want from it?</em>"],
    ["Technique, with<br><em class=\"solo\">joy intact.</em>", "Taught by<br><em class=\"solo\">Swapnil.</em>"],
    ["Ghent is not<br><em class=\"solo\">the only door.</em>", "Not in Ghent?<br><em class=\"solo\">Still covered.</em>"],
  ],
  "festival.mjs": [
    ["Learn it.<br><em class=\"solo\">Then live it.</em>", "On the floor.<br><em class=\"solo\">On the stage.</em>"],
    ["Four editions.<br><em class=\"solo\">Every one changed us.</em>", "Four editions<br><em class=\"solo\">so far.</em>"],
    ["Come ready.<br><em class=\"solo\">We handle the rest.</em>", "The practical<br><em class=\"solo\">bits.</em>"],
  ],
  "about.mjs": [
    ["Roots intact.<br><em class=\"solo\">Always moving.</em>", "Thirteen dancers.<br><em class=\"solo\">One company.</em>"],
    ["Thirteen dancers.<br><em class=\"solo\">Many languages.</em>", "The current<br><em class=\"solo\">company.</em>"],
    ["Meet us in motion.", "See a show. Or join one."],
  ],
  "contact.mjs": [
  ],
};

let applied = 0;
for (const [file, pairs] of Object.entries(EDITS)) {
  let src = readFileSync(P(file), "utf8");
  for (const [from, to] of pairs) {
    if (!src.includes(from)) {
      if (src.includes(to)) continue; // already applied on a previous run
      throw new Error(`NOT FOUND in ${file}: ${from}`);
    }
    src = src.replace(from, to);
    applied++;
  }
  writeFileSync(P(file), src);
}
console.log(`applied ${applied} copy edits`);
