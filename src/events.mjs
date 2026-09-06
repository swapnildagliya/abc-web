const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const DATE_OVERRIDE = {
  "gentse-feesten-2026": { big: "23 & 26", small: "JUL" },
};

export function todayISO(now = new Date()) {
  if (process.env.ABC_EVENT_TODAY) return process.env.ABC_EVENT_TODAY;
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Brussels",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type) => parts.find(p => p.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export const BUILD_TODAY = todayISO();

export function eventStatus(event, today = BUILD_TODAY) {
  return event.end >= today ? "upcoming" : "past";
}

export function normalizeEvents(events, today = BUILD_TODAY) {
  return events.map(event => ({ ...event, status: eventStatus(event, today) }));
}

export function eventSets(events, today = BUILD_TODAY) {
  const normalized = normalizeEvents(events, today);
  return {
    events: normalized,
    upcoming: normalized
      .filter(event => event.status === "upcoming")
      .sort((a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end)),
    past: normalized
      .filter(event => event.status === "past")
      .sort((a, b) => b.start.localeCompare(a.start) || b.end.localeCompare(a.end)),
  };
}

export function eventSchemaIsCurrent(schema, today = BUILD_TODAY) {
  try {
    const parsed = JSON.parse(schema);
    const items = Array.isArray(parsed) ? parsed : [parsed];
    const event = items.find(item => item?.["@type"] === "Event");
    if (!event) return true;
    const end = String(event.endDate || event.startDate || "").slice(0, 10);
    return end >= today;
  } catch {
    return false;
  }
}

export function currentEventSchemas(schemas, today = BUILD_TODAY) {
  return schemas.filter(schema => eventSchemaIsCurrent(schema, today));
}

export function dateParts(event) {
  if (DATE_OVERRIDE[event.id]) return DATE_OVERRIDE[event.id];
  const iso = /^\d{4}-\d{2}-\d{2}$/;
  if (!iso.test(event.start) || !iso.test(event.end)) {
    const m = event.date.trim().match(/^(.+?)\s+([A-Za-z]+)\s*(\d{2})?$/);
    return m ? { big: m[1], small: (m[2] || "").toUpperCase() + (m[3] ? ` ’${m[3]}` : "") } : { big: event.date, small: "" };
  }
  const [, sm, sd] = event.start.split("-").map(Number);
  const [, em, ed] = event.end.split("-").map(Number);
  const yr = event.status === "past" ? ` ’${String(event.year).slice(2)}` : "";
  if (event.start === event.end) return { big: String(sd), small: MON[sm - 1] + yr };
  if (sm === em) return { big: `${sd}–${ed}`, small: MON[sm - 1] + yr };
  return { big: `${sd} ${MON[sm - 1]}`, small: `– ${ed} ${MON[em - 1]}${yr}` };
}
