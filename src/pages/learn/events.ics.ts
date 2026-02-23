import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

function toIcsDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export const GET: APIRoute = async () => {
  const events: CollectionEntry<"events">[] = (await getCollection("events")).sort(
    (a: CollectionEntry<"events">, b: CollectionEntry<"events">) => a.data.date.valueOf() - b.data.date.valueOf()
  );

  const now = new Date();
  const upcoming = events.filter((event) => event.data.date.valueOf() >= now.valueOf());

  const vevents = upcoming
    .map((event) => {
      const start = toIcsDate(event.data.date);
      const endDate = new Date(event.data.date);
      endDate.setHours(endDate.getHours() + 2);
      const end = toIcsDate(endDate);
      const summary = escapeText(event.data.title);
      const description = escapeText(event.data.summary || event.data.excerpt || "SCSAC education event");
      const location = escapeText(event.data.location);
      const uid = `${event.slug}@socalsnow.org`;
      const url = event.data.registrationUrl;

      return [
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${toIcsDate(new Date())}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        `URL:${url}`,
        "END:VEVENT"
      ].join("\r\n");
    })
    .join("\r\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//So Cal Snow Avalanche Center//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    vevents,
    "END:VCALENDAR"
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="socalsnow-events.ics"'
    }
  });
};
