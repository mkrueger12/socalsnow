# So Cal Snow Avalanche Center Rebuild

Astro-based rebuild of `socalsnow.org` focused on fast mobile access to snowpack summaries, observations, weather links, and avalanche education resources.

## Local development

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Key routes

- `/` homepage with latest summary, danger scale, recent observations, and weather glance
- `/conditions` latest snowpack summary and disclaimer
- `/conditions/archive` historical summaries
- `/observations` list and detail pages
- `/observations?range=...&q=...&since=YYYY-MM-DD&until=YYYY-MM-DD` filterable list with shareable URL state
- `/observations/submit` structured community submission form
- `/admin/moderation` pending observation queue for staff review
- `/weather`, `/map`, `/learn`, `/about`, `/donate`, `/contact`, `/search`, `/rss.xml`

Legacy `.html` paths are preserved with 301 redirects in `public/_redirects`:

- `/weather.html` -> `/weather`
- `/observations.html` -> `/observations`
- `/map-of-service-area.html` -> `/map`
- `/education--events.html` -> `/learn/events`
- `/resources.html` -> `/learn/resources`
- `/about-us.html` -> `/about`

Domain canonicalization is also enforced in `public/_redirects`:

- `http://socalsnow.org/*` -> `https://www.socalsnow.org/:splat`
- `https://socalsnow.org/*` -> `https://www.socalsnow.org/:splat`

## Content workflow

Content lives in Markdown collections under `src/content/`:

- `summaries/`
- `observations/`
- `events/`
- `team/`

Schemas are defined in `src/content.config.ts`.

Observation moderation is frontmatter-driven:

- `status: pending` keeps a report out of public routes
- `status: approved` publishes it to the homepage, observations list, detail pages, and map

## Form delivery (optional)

If you want API routes to send email notifications, set:

- `RESEND_API_KEY`
- `RESEND_FROM`
- `STAFF_EMAIL`
- `PUBLIC_PAYPAL_DONATE_URL`
- `PUBLIC_STRIPE_DONATE_URL`

Without these variables, form submissions are still accepted and logged server-side.
