import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = async ({ site }) => {
  const summaries: CollectionEntry<"summaries">[] = (await getCollection("summaries")).sort(
    (a: CollectionEntry<"summaries">, b: CollectionEntry<"summaries">) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const base = site?.toString() ?? "https://www.socalsnow.org/";

  const items = summaries
    .map((summary) => {
      const link = new URL(`/conditions/${summary.slug}`, base).toString();
      return `<item><title>${escapeXml(summary.data.title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${summary.data.date.toUTCString()}</pubDate><description>${escapeXml(summary.data.excerpt)}</description></item>`;
    })
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>So Cal Snow Snowpack Summaries</title><link>${base}</link><description>Latest snowpack summaries from the So Cal Snow Avalanche Center.</description>${items}</channel></rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
};
