// ---------------------------------------------------------------------------
// Web3Forms-backed enquiry forms.
//
// Two forms, one account (free plan: 250 submissions/month shared, ABC volume
// is far below it). The recipient is a LINKED EMAIL on the Web3Forms account —
// info@shoonyadance.com, verified 2026-09-06 — so no address ever appears in
// this markup, which is the D-074 rule.
//
// Progressive enhancement, deliberately: the <form> posts natively to
// Web3Forms and lands on our own /contact/thank-you/ via the `redirect` field,
// so it works with JavaScript switched off. fable.js upgrades it to an inline
// async submit when JS is available.
//
// NOTE: Web3Forms refuses server-side calls on the free plan (403 "use our API
// in client side") and blocks localhost origins — a real submission can only be
// tested in a browser on the deployed origin, never from localhost or curl.
// ---------------------------------------------------------------------------

export const FORM_ACCESS_KEY = "2bb1d384-ba9a-4c74-b300-09087117f016";

// Where people go when a form fails or JS is off. Never an email address.
export const FALLBACK_URL = "https://www.shoonyadance.com/contact";

import { SITE } from "./shell.mjs";

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function field(f, formId) {
  const id = `${formId}-${f.name}`;
  const req = f.required ? " required" : "";
  const mark = f.required ? ` <abbr title="required">*</abbr>` : "";
  const span = f.wide ? ' data-wide="true"' : "";
  let control;
  if (f.type === "select") {
    control = `<select id="${id}" name="${esc(f.name)}"${req}>
            <option value="">${esc(f.placeholder || "Select an option")}</option>
            ${f.options.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join("\n            ")}
          </select>`;
  } else if (f.type === "textarea") {
    control = `<textarea id="${id}" name="${esc(f.name)}" rows="${f.rows || 5}"${req} placeholder="${esc(f.placeholder || "")}"></textarea>`;
  } else {
    control = `<input id="${id}" type="${f.type || "text"}" name="${esc(f.name)}"${req}${f.autocomplete ? ` autocomplete="${f.autocomplete}"` : ""} placeholder="${esc(f.placeholder || "")}">`;
  }
  return `<p class="field"${span}>
          <label for="${id}">${esc(f.label)}${mark}</label>
          ${control}${f.hint ? `\n          <small class="field-hint">${esc(f.hint)}</small>` : ""}
        </p>`;
}

/**
 * @param {object} o
 * @param {string} o.id      form id / anchor
 * @param {string} o.subject email subject Swapnil sees in the inbox
 * @param {string} o.submit  button label
 * @param {Array}  o.fields  field descriptors
 * @param {string} [o.thanks] absolute URL Web3Forms redirects to without JS
 * @param {string} [o.consent] optional opt-in checkbox label
 */
export function enquiryForm({ id, subject, submit, fields, thanks = `${SITE}/contact/thank-you/`, consent }) {
  return `<form class="enquiry-form" id="${id}" data-web3form method="POST" action="https://api.web3forms.com/submit" novalidate>
        <input type="hidden" name="access_key" value="${FORM_ACCESS_KEY}">
        <input type="hidden" name="subject" value="${esc(subject)}">
        <input type="hidden" name="from_name" value="ABC a bollywood company — website">
        <!-- Web3Forms redirects server-side, so this must be ABSOLUTE — a
             relative path resolves against api.web3forms.com and 404s. -->
        <input type="hidden" name="redirect" value="${esc(thanks)}">
        <!-- honeypot: real people never see it, bots fill it in -->
        <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="field-grid">
          ${fields.map(f => field(f, id)).join("\n          ")}
        </div>
        ${consent ? `<p class="field-check">
          <input id="${id}-consent" type="checkbox" name="Newsletter opt-in" value="Yes">
          <label for="${id}-consent">${esc(consent)}</label>
        </p>` : ""}
        <!-- Said before the button, not after it: a visitor is entitled to know
             where their details go while they can still decide not to send them. -->
        <p class="form-privacy">What you send reaches us by email through Web3Forms, and goes nowhere else. <a href="../privacy/">How we handle it</a>.</p>
        <div class="form-foot">
          <button class="button button-yellow" type="submit">${esc(submit)} <span>→</span></button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </div>
        <p class="form-fallback">Trouble sending? <a href="${FALLBACK_URL}" target="_blank" rel="noopener">Use the Shoonya contact form</a> instead — it reaches the same desk.</p>
      </form>`;
}

/* ---------- the two ABC enquiry routes ---------- */

// Mirrors the live abcdans.com "Let's work together" form, plus the event
// details this site's own contact card already asks people to include.
export const BOOKING_FIELDS = [
  { name: "First name", label: "First name", required: true, autocomplete: "given-name" },
  { name: "Last name", label: "Last name", required: true, autocomplete: "family-name" },
  { name: "Email", label: "Email", type: "email", required: true, autocomplete: "email" },
  { name: "Phone", label: "Phone", type: "tel", autocomplete: "tel", hint: "Optional. Include the country code if you would rather we called." },
  { name: "Booking type", label: "What are you booking?", type: "select", required: true,
    options: ["Performance", "Dance workshop", "Performance and workshop", "Something else"] },
  { name: "Preferred date", label: "Preferred date", type: "date" },
  { name: "City and venue", label: "City and venue", placeholder: "Ghent · De Bijloke" },
  { name: "Audience size", label: "Rough audience size", placeholder: "80 people" },
  { name: "Budget", label: "Budget", hint: "Optional, and a range or \u201cnot decided yet\u201d is fine \u2014 it tells us what shape of company fits." },
  { name: "Heard about us", label: "How did you hear about us?", type: "select",
    options: ["Google search", "Instagram", "Facebook", "Through friends", "Saw us perform", "Other"] },
  { name: "Message", label: "What are you planning?", type: "textarea", required: true, wide: true,
    placeholder: "The event, the moment the dance has to land, and the feeling you want to create." },
];

// Field list from ABC/site-build/LOCAL_KB.md § "ABC private coaching form — 2026-08-04".
export const COACHING_FIELDS = [
  { name: "Name", label: "Name", required: true, autocomplete: "name" },
  { name: "Email", label: "Email", type: "email", required: true, autocomplete: "email" },
  { name: "Location and time zone", label: "Location and time zone", required: true, placeholder: "Berlin · CET" },
  { name: "Dance style", label: "Dance style", type: "select", required: true,
    options: ["Bollywood", "Bhangra", "Garba", "Indian semi-classical", "Indian folk", "Not sure yet"] },
  { name: "Format", label: "Format", type: "select", required: true,
    options: ["Online", "In person in Ghent", "Either"] },
  { name: "Experience", label: "Experience", type: "select", required: true,
    options: ["Complete beginner", "Some classes", "Trained in another style", "Experienced dancer"] },
  { name: "Goal", label: "What do you want to work on?", type: "textarea", required: true, wide: true,
    placeholder: "A performance, a wedding, technique, confidence on stage — whatever the sessions are for." },
];
