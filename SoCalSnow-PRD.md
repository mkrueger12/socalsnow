# Product Requirements Document: So Cal Snow Avalanche Center Website Rebuild

**Version:** 2.0
**Date:** February 22, 2026
**Author:** Max Krueger
**Status:** Draft — awaiting stakeholder review
**Current URL:** http://www.socalsnow.org/

---

## 1. Problem Statement

**Backcountry skiers and snowboarders in Southern California's mountains lack a reliable, mobile-friendly source of avalanche and snowpack information.** The So Cal Snow Avalanche Center (SCSAC) — a volunteer-run nonprofit — currently serves this need through a static, Weebly-era website that is not mobile-responsive, requires HTML knowledge to update, and buries critical safety data beneath sponsor logos and unstructured text. Because backcountry travelers primarily check conditions on their phones at trailheads with spotty cell service, the current site's poor mobile experience and slow load times create a real safety gap: users either can't access the information or skip checking altogether.

**If we don't solve this**, SCSAC loses credibility as a safety resource, community observers stop contributing reports (the submission flow is friction-heavy), and the organization struggles to grow its donor base — all of which threaten the long-term viability of the only avalanche awareness center serving 25+ million SoCal residents.

---

## 2. Goals

| # | Goal | Metric | Target |
|---|------|--------|--------|
| G1 | **Make conditions instantly accessible on mobile** | Largest Contentful Paint on 4G | < 2 seconds |
| G2 | **Increase community observation submissions** | Observations submitted per season | 2x current baseline |
| G3 | **Reduce time to publish snowpack summaries** | Staff time from draft to live | < 5 minutes (vs. ~30 min today) |
| G4 | **Build an engaged subscriber base** | Newsletter signups in first season | 500+ |
| G5 | **Establish visual credibility on par with major avalanche centers** | Lighthouse performance + accessibility scores | > 90 on both |

---

## 3. Non-Goals

| # | Non-Goal | Rationale |
|---|----------|-----------|
| NG1 | **Native mobile app** | A fast, responsive web app covers 95% of the use case. App Store maintenance is too heavy for a volunteer team. |
| NG2 | **Issuing official avalanche danger ratings** | SCSAC is not authorized per National Avalanche Center guidelines. The site provides awareness and observations, not forecasts. |
| NG3 | **Real-time weather station integration (IoT)** | Requires hardware investment and ongoing maintenance. External station links are sufficient for Phase 1. |
| NG4 | **User accounts and login** | Adds complexity for a small user base. Observation submissions work fine with email-based identification. |
| NG5 | **Discussion forum** | The current forum sees low engagement. Community observation submissions replace this need. |
| NG6 | **E-commerce / merchandise** | Not a revenue priority. Donations and sponsorships are the funding model. |
| NG7 | **Multi-language support** | The backcountry audience in SoCal is overwhelmingly English-speaking. Revisit if community demographics shift. |

---

## 4. Target Users

### 4.1 Primary Personas

| Persona | Description | Key Needs |
|---------|-------------|-----------|
| **Backcountry Skier/Snowboarder** | Weekend warriors and experienced backcountry travelers in SoCal mountains | Quick access to current snowpack summary, avalanche concerns, recent observations before heading out |
| **Backcountry Educator/Guide** | Professional guides and avalanche instructors operating in the region | Detailed observation data, historical trends, education event listings |
| **Community Observer** | Experienced backcountry travelers who submit field reports | Easy, structured way to submit observations with photos and snowpit data |

### 4.2 Secondary Personas

| Persona | Description | Key Needs |
|---------|-------------|-----------|
| **Newcomer/Learner** | People new to backcountry travel in SoCal | Educational resources, understanding danger ratings, finding courses |
| **Donor/Sponsor** | Individuals and brands supporting the nonprofit | Clear donation path, visibility of impact, sponsor recognition |

---

## 5. User Stories

### Backcountry Skier/Snowboarder

- **US-1**: As a backcountry skier, I want to see the latest snowpack summary and avalanche problems on my phone in under 3 seconds so that I can make a go/no-go decision at the trailhead.
- **US-2**: As a backcountry skier, I want to read recent field observations filtered by the specific mountain zone I'm heading to so that I understand current conditions where I'll be traveling.
- **US-3**: As a backcountry snowboarder, I want to quickly check weather forecasts for my target mountain range so that I can plan my trip around incoming storms and wind events.
- **US-4**: As a backcountry traveler, I want to see an interactive map of the service area with recent observation pins so that I can visualize where reports are coming from relative to my planned route.
- **US-5**: As a returning visitor, I want to subscribe to email alerts so that I get notified when a new snowpack summary is published without having to check the site manually.

### Community Observer

- **US-6**: As a community observer, I want to submit a structured field observation with photos, location, elevation, and snowpit data so that my report is useful to other backcountry travelers.
- **US-7**: As a community observer, I want to receive a confirmation after submitting my report so that I know it was received and will be reviewed by staff.

### Backcountry Educator/Guide

- **US-8**: As a backcountry guide, I want to browse the full archive of observations and summaries for the season so that I can track snowpack trends over time for my clients.
- **US-9**: As an avalanche instructor, I want to find upcoming education courses and events in one place so that I can direct my students to appropriate training.

### Newcomer/Learner

- **US-10**: As a newcomer to backcountry travel, I want to understand the avalanche danger scale and what each level means so that I can interpret the information on the site.
- **US-11**: As a beginner, I want to find avalanche education courses near me so that I can learn before heading into the backcountry.

### Donor/Sponsor

- **US-12**: As a potential donor, I want to understand the impact of my contribution so that I feel confident my money supports backcountry safety.
- **US-13**: As a sponsor, I want my brand visible on the site in a professional, non-intrusive way so that I get exposure without undermining the site's credibility.

### SCSAC Staff (Content Publisher)

- **US-14**: As a staff member, I want to write and publish a snowpack summary with rich text and avalanche problem callouts in under 5 minutes so that I can get critical safety information out quickly.
- **US-15**: As a staff member, I want to review and approve community-submitted observations before they go live so that I can ensure accuracy and quality.
- **US-16**: As a staff member, I want to manage events, resources, and sponsor listings without touching code so that I can keep the site current between developer involvement.

---

## 6. Requirements

### P0 — Must-Have (Launch Blockers)

These are required for the site to replace the existing socalsnow.org.

| ID | Requirement | Acceptance Criteria |
|----|-------------|-------------------|
| **P0-1** | **Mobile-responsive layout** across all pages | All pages pass Google Mobile-Friendly Test. No horizontal scrolling. Touch targets >= 44x44px. |
| **P0-2** | **Homepage displays latest snowpack summary** as hero content with date, author, and "Read Full Summary" CTA | Summary title, author, date, and first paragraph visible above the fold on mobile and desktop. Links to full summary page. |
| **P0-3** | **Full snowpack summary page** with rich text, avalanche problem callouts, and general caution disclaimer | Supports bold, italic, headers, inline images, and avalanche problem type badges (Wind Slab, Storm Slab, Wet Snow, etc.). Persistent disclaimer visible on all summary pages. |
| **P0-4** | **Summary archive** browsable by date | Past summaries accessible via chronological list. Each entry shows title and date. |
| **P0-5** | **Observation list page** with all current-season observations | Observations displayed as cards with location, date, elevation, author, and excerpt. Sorted by most recent. |
| **P0-6** | **Individual observation detail pages** | Full narrative, photos (gallery), snowpit data, stability test results, location metadata. Renders correctly on mobile. |
| **P0-7** | **Community observation submission form** | Structured fields: name, email, date, location (dropdown + freetext), elevation, aspect, narrative, photo upload (multi). Submissions enter moderation queue. Staff email notification on new submission. Submitter receives confirmation. |
| **P0-8** | **Weather page** organized by mountain range | San Gabriel, San Bernardino, San Jacinto sections with collapsible/accordion UI. All existing external links to weather stations, webcams, NOAA preserved. General forecast section (editable). |
| **P0-9** | **Resources page** with avalanche danger scale | North American Public Avalanche Danger Scale rendered as styled HTML component (not image). Categorized external links: education, nearby centers, tools. |
| **P0-10** | **About page** with mission statement and team bios | Mission text, board member profiles (photo, name, title, bio). |
| **P0-11** | **Donation flow** | At minimum: PayPal integration matching current capability. Dedicated `/donate` page. Homepage donation CTA. |
| **P0-12** | **Content management via Markdown/MDX** | Staff can create and edit snowpack summaries, observations, and events by editing Markdown files. Content Collections with typed schemas for each content type. |
| **P0-13** | **HTTPS** | All pages served over HTTPS. HTTP redirects to HTTPS. |
| **P0-14** | **SEO parity or better** | Semantic HTML, OG/Twitter meta tags, XML sitemap, robots.txt. 301 redirects from all old `.html` paths. |
| **P0-15** | **Site search** | Full-text search across summaries, observations, and resources via Pagefind. |
| **P0-16** | **Contact form** | Name, email, message fields. Spam protection (honeypot or CAPTCHA). Sends to staff email. |

### P1 — Nice-to-Have (Post-Launch Sprint)

| ID | Requirement | Acceptance Criteria |
|----|-------------|-------------------|
| **P1-1** | **Observation filtering** by mountain range/zone, date range | Dropdown or pill filters on observations page. URL state preserved for shareability. |
| **P1-2** | **Interactive service area map** | Leaflet/Mapbox map with zone polygons. Clickable zones link to filtered observations. Recent observation pins displayed. Mobile-friendly touch interactions. |
| **P1-3** | **Newsletter/email alert signup** | Email input on homepage + dedicated placement. Integration with Buttondown or similar. Confirmation email to subscriber. |
| **P1-4** | **Avalanche problem badges with icons** | Standardized icons matching North American classification. Displayed on summary pages and homepage. |
| **P1-5** | **Education & events listing** | CMS-managed events with title, date, location, description, registration link. Chronological list view. Past events archive. |
| **P1-6** | **Sponsor/supporter management** | CMS-editable sponsor entries with logo, link, tier (sponsor vs. supporter). Grayscale logo strip in footer. Dedicated section on About page. |
| **P1-7** | **Homepage quick weather glance** | Compact weather summary for each range (temp, wind, precip) visible on homepage without navigating to weather page. |
| **P1-8** | **RSS feed** for snowpack summaries | Valid RSS/Atom feed auto-generated from summary Content Collection. |
| **P1-9** | **Stripe donations** | Stripe embedded form on `/donate` page with impact messaging. Keep PayPal as fallback option. |

### P2 — Future Considerations (Phase 2+)

| ID | Requirement | Acceptance Criteria |
|----|-------------|-------------------|
| **P2-1** | **Git-based visual CMS** (Keystatic, Tina, or Decap) | Non-technical staff can create/edit content via visual editor. Content stored as Markdown in Git repo. Draft/preview/publish workflow. |
| **P2-2** | **Live weather data integration** | Pull from NWS API or similar for at least one station per range. Auto-updated, displayed on weather page. |
| **P2-3** | **Snowpack layer diagram builder** | Structured data entry for snowpit profiles that renders as a visual layer diagram. |
| **P2-4** | **Observation map pins with detail popups** | Map pins open observation excerpts in a popup without navigating away from the map. |
| **P2-5** | **PWA / offline support** | Service worker caches previously loaded pages. Useful for spotty mountain cell service. |
| **P2-6** | **Role-based CMS access** | Admin, editor, and contributor roles with appropriate permissions. |
| **P2-7** | **Media library** | Centralized image management for staff (upload, tag, search, reuse). |
| **P2-8** | **Structured data (JSON-LD)** | Organization, Event, and Article schema markup for rich search results. |

---

## 7. Success Metrics

### Leading Indicators (change quickly — monitor weekly)

| Metric | Target | Measurement | Why It Matters |
|--------|--------|-------------|----------------|
| Largest Contentful Paint (mobile, 4G) | < 2 seconds | Lighthouse CI / Web Vitals | Core UX for trailhead access |
| Lighthouse Performance score | > 90 | Lighthouse CI | Overall site speed health |
| Lighthouse Accessibility score | > 90 | Lighthouse CI | Inclusive access |
| Mobile usability errors | 0 | Google Search Console | Zero broken mobile experiences |
| Observation form completion rate | > 60% of starts | Analytics funnel | Form isn't too long or confusing |
| Newsletter signup rate | > 3% of unique visitors | Email platform | Content resonates enough to subscribe |

### Lagging Indicators (change over a season — review monthly/quarterly)

| Metric | Target | Measurement | Why It Matters |
|--------|--------|-------------|----------------|
| Community observations per season | 2x current baseline | CMS count | Community engagement and data quality |
| Staff time to publish a summary | < 5 minutes | Staff self-report | Operational efficiency, faster safety updates |
| Organic search traffic | 30% increase YoY | Analytics | SEO improvements driving discovery |
| Donation revenue | 10% increase YoY | Payment platform | Financial sustainability |
| Newsletter subscribers (end of season) | 500+ | Email platform | Engaged recurring audience |
| Returning visitor rate | > 40% | Analytics | Users find the site valuable enough to come back |

---

## 8. Current State Analysis

### 8.1 Site Architecture (Existing Pages)

| Page | URL Path | Purpose |
|------|----------|---------|
| Summary (Home) | `/` | Snowpack summary, recent observations, weather forecast link, donate CTA |
| Weather | `/weather.html` | Weather data grouped by mountain range with links to external stations |
| Observations | `/observations.html` | Archive of user-submitted and staff field reports for the current season |
| Map of Service Area | `/map-of-service-area.html` | Embedded Google My Map showing covered mountain ranges |
| Education & Events | `/education--events.html` | Link to classes/events calendar, hero imagery |
| Resources | `/resources.html` | Avalanche danger scale, education providers, nearby avalanche centers, external links |
| About Us | `/about-us.html` | Mission statement, board of directors with bios and photos |
| Contact | (footer link) | Contact form |
| Submit Report | (footer link) | Form for community members to submit field observations |

### 8.2 Current Design & Technology

- **Platform:** Static HTML (likely Weebly or similar site builder)
- **Layout:** Single-column, fixed-width (~960px), not mobile-responsive
- **Navigation:** Horizontal tab bar with 6 main sections
- **Header:** Large hero banner image with overlaid text logo
- **Typography:** Mixed fonts, inconsistent sizing
- **Color Palette:** Light blue accents, white background, blue/purple links
- **Interactive Elements:** Embedded Google Map, PayPal donate button, search bar, social links
- **Sponsor Section:** Grid of sponsor/supporter logos on homepage and education page footer
- **Content Updates:** Manual HTML edits for snowpack summaries (updated multiple times per week during season)

### 8.3 Key Problems with Current Site

1. **Not mobile-responsive** — backcountry users often check conditions on phones at trailheads
2. **No CMS** — content updates require HTML knowledge, slowing critical safety updates
3. **Outdated visual design** — reduces credibility for a safety-critical resource
4. **Poor information hierarchy** — homepage mixes summaries, observations, weather, sponsors, and disclaimers in a single long scroll
5. **No structured data** — observations are plain text with no filtering or categorization
6. **External weather data not integrated** — users must click through multiple external links
7. **No notification system** — no way to alert subscribers of new advisories
8. **Limited observation submission** — no structured form for standardized field reports

---

## 9. Information Architecture (Proposed)

```
/                          → Homepage
├── Hero: danger status + latest summary CTA
├── Avalanche problem badges
├── Recent observations (3 cards)
├── Quick weather glance (all 3 ranges)
├── Newsletter signup
├── Support CTA
└── Sponsor strip + footer

/conditions                → Current Snowpack Summary (full post)
/conditions/archive        → Past summaries by date

/weather                   → Weather by mountain range
├── San Gabriel Mountains (accordion)
├── San Bernardino Mountains (accordion)
├── San Jacinto Mountains (accordion)
└── General weather links

/observations              → All observations (filterable list)
/observations/[slug]       → Individual observation detail
/observations/submit       → Community submission form

/map                       → Interactive service area map

/learn                     → Education hub
├── /learn/danger-scale    → Avalanche danger scale (interactive)
├── /learn/events          → Upcoming classes & events
└── /learn/resources       → External links & tools

/about                     → Mission, team, history
/about#team                → Board of directors

/donate                    → Donation page (Stripe/PayPal)

/contact                   → Contact form
```

---

## 10. Technology Stack (Confirmed)

| Layer | Choice | Details |
|-------|--------|---------|
| **Framework** | **Astro** (v5+) | Content-focused, ships zero JS by default, islands architecture for interactive components. Perfect for a content-heavy safety site that needs to be fast on spotty mountain cell service. |
| **Rendering** | Static (SSG) + on-demand SSR | Pre-render all pages at build time for maximum speed. Use SSR (Astro server endpoints) only for the observation submission form handler. |
| **UI Islands** | Preact or Svelte | Lightweight interactive components (map, filters, mobile nav) hydrated only where needed via Astro islands (`client:load`, `client:visible`). Avoids shipping a full React runtime. |
| **Styling** | Tailwind CSS v4 | Utility-first, mobile-first responsive design. Custom design tokens for the SCSAC color palette and typography scale. |
| **Content** | Astro Content Collections + Markdown/MDX | Type-safe content schemas for snowpack summaries, observations, events, and team members. Staff can edit Markdown files in a Git-based workflow, or connect a headless CMS later. |
| **CMS (Phase 2)** | Keystatic, Tina, or Decap CMS | Git-based CMS that gives non-technical staff a visual editor while content stays in the repo as Markdown. Zero hosting cost. Sanity or Payload as future upgrade path. |
| **Maps** | Leaflet + OpenStreetMap (or Mapbox GL) | Lightweight interactive map with custom zone overlays. Leaflet is free and open-source. Mapbox GL for richer terrain tiles if budget allows. |
| **Hosting** | Netlify or Cloudflare Pages | Edge-optimized, free tier handles nonprofit traffic easily. Netlify Forms for the submission endpoint (no backend needed). |
| **Payments** | Stripe Donations (or keep PayPal) | Stripe has nonprofit pricing and modern embeddable donation forms. Keep PayPal as fallback. |
| **Email** | Resend or Buttondown | Resend for transactional (submission confirmations). Buttondown for newsletter (free tier, RSS-to-email). |
| **Analytics** | Plausible or Fathom | Privacy-friendly, no cookie banners needed. Lightweight script (~1KB). |
| **Search** | Pagefind | Static search index built at deploy time — perfect for Astro. Zero-cost, works offline. |
| **Image Optimization** | Astro `<Image>` + `sharp` | Automatic WebP/AVIF conversion, responsive srcsets, lazy loading. Built into Astro. |

### 10.1 Why Astro

Astro is the ideal framework for this project because SCSAC is fundamentally a content site with occasional interactivity. Key advantages over Next.js or other SPA frameworks:

- **Zero JS by default** — pages ship as pure HTML/CSS unless a component explicitly opts into client-side hydration, meaning blazing fast loads on weak mountain cell connections
- **Content Collections** — first-class support for typed Markdown/MDX content with schemas, perfect for snowpack summaries, observations, and events
- **Islands Architecture** — interactive components (map, observation filters, mobile nav) hydrate independently without loading a full framework bundle
- **Built-in image optimization** — automatic format conversion, responsive images, and lazy loading
- **Framework-agnostic** — can use Preact, Svelte, React, or vanilla JS for interactive islands, no lock-in
- **Excellent Lighthouse scores** — Astro sites routinely score 95-100 on performance out of the box

### 10.2 Project Structure

```
socalsnow/
├── src/
│   ├── components/        # Reusable Astro + island components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Nav.astro
│   │   ├── MobileNav.svelte       # Interactive island
│   │   ├── ObservationCard.astro
│   │   ├── DangerScale.astro
│   │   ├── WeatherStation.astro
│   │   ├── SponsorGrid.astro
│   │   ├── DonateButton.astro
│   │   └── ServiceAreaMap.svelte   # Interactive island
│   ├── content/           # Content Collections (Markdown + schemas)
│   │   ├── summaries/     # Snowpack summaries
│   │   ├── observations/  # Field observations
│   │   ├── events/        # Education & events
│   │   └── team/          # Board member bios
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── weather.astro
│   │   ├── observations/
│   │   │   ├── index.astro
│   │   │   ├── [slug].astro
│   │   │   └── submit.astro
│   │   ├── map.astro
│   │   ├── learn/
│   │   │   ├── index.astro
│   │   │   ├── danger-scale.astro
│   │   │   └── events.astro
│   │   ├── about.astro
│   │   └── donate.astro
│   ├── styles/
│   │   └── global.css     # Tailwind directives + custom properties
│   └── data/              # Static data (weather stations, resource links)
│       ├── weather-stations.json
│       ├── resources.json
│       └── sponsors.json
├── public/                # Static assets (logos, sponsor images, fonts)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## 11. Design Direction

The redesign is not a 1:1 recreation of the current site. The goal is a modern, professional avalanche information site that feels on par with well-regarded centers like the Sierra Avalanche Center or Colorado Avalanche Information Center, adapted for SCSAC's smaller scale and volunteer model.

### 11.1 Design Principles

1. **Safety-first hierarchy** — The most critical information (current danger, latest summary, active avalanche problems) must be immediately visible without scrolling on any device
2. **Scan-friendly** — Backcountry users check the site quickly before heading out. Use clear visual hierarchy, color coding, and scannable layouts over dense paragraphs
3. **Trust through craft** — A polished, professional design increases credibility for safety-critical information from a volunteer organization
4. **Mountain-minimal** — Clean, modern aesthetic with mountain/winter photography as accents, not cluttered with sponsor logos and banners competing for attention

### 11.2 Color System

```
Primary:
  --slate-900:  #0f172a    (text, headings)
  --slate-700:  #334155    (body text)
  --slate-100:  #f1f5f9    (light backgrounds)

Accent:
  --sky-600:    #0284c7    (links, interactive elements)
  --sky-100:    #e0f2fe    (subtle highlights, badges)

Danger Scale (North American Standard):
  --danger-low:       #4ade80  (green)
  --danger-moderate:  #facc15  (yellow)
  --danger-consider:  #fb923c  (orange)
  --danger-high:      #ef4444  (red)
  --danger-extreme:   #1e1e1e  (black)

Surfaces:
  --white:      #ffffff    (card backgrounds)
  --stone-50:   #fafaf9    (page background, subtle warmth)
```

### 11.3 Typography

| Role | Font | Weight | Size (desktop / mobile) |
|------|------|--------|------------------------|
| Headings | Plus Jakarta Sans | 700 (bold) | H1: 48/36px, H2: 32/26px, H3: 24/20px |
| Body | Inter | 400 (regular) | 16/16px, line-height 1.6 |
| Captions / meta | Inter | 500 (medium) | 14/13px, uppercase tracking |
| Monospace (data) | JetBrains Mono | 400 | 14/13px (snowpit data, elevations) |

Load via Google Fonts or self-host for performance. Use `font-display: swap`.

### 11.4 Layout & Grid

- **Max content width:** 1280px, centered
- **Grid:** 12-column on desktop, 4-column on mobile
- **Spacing scale:** 4px base (Tailwind default: 1=4px, 2=8px, 4=16px, 6=24px, 8=32px, 12=48px, 16=64px)
- **Border radius:** Consistent 8px (rounded-lg) for cards, 12px (rounded-xl) for hero sections
- **Shadows:** Subtle — `shadow-sm` for cards at rest, `shadow-md` on hover

### 11.5 Component Design

**Navigation (Desktop):**
- Fixed top bar, white background with subtle bottom border
- Left: SCSAC wordmark/logo (simplified, modern)
- Center: nav links (Conditions, Weather, Observations, Map, Learn, About)
- Right: "Donate" button (sky-600 fill) + search icon
- Active page indicated with sky-600 underline

**Navigation (Mobile):**
- Fixed top bar with hamburger menu + SCSAC logo
- Slide-in drawer from left with full nav + donate CTA
- Bottom: persistent "Current Conditions" quick-access bar (sticky, always visible)

**Homepage Hero:**
- Full-width section with a large background photo (mountain panorama, dark overlay gradient)
- Overlaid: current danger status badges per zone, latest summary title + date, "Read Full Summary" CTA
- Below hero: 2-3 active avalanche problem badges (e.g., "Wind Slab", "Storm Slab") with brief one-line descriptions

**Observation Cards:**
- Horizontal card on desktop (image left, content right), vertical stack on mobile
- Content: location pill badge, date, elevation, author name, 2-line excerpt
- Subtle left-border color accent by mountain range (different color per range for visual scanning)
- Hover: slight lift (translateY -2px) + shadow increase

**Weather Stations:**
- Grouped by mountain range in collapsible accordion sections
- Each station: name, current temp, wind, precip as a compact data row
- External link icon on each row to open full station data
- Clean table-like layout, alternating row backgrounds for readability

**Danger Scale Component:**
- Horizontal bar (desktop) / vertical stack (mobile) showing all 5 levels
- Each level: color swatch + level number + name + travel advice excerpt
- Currently active level(s) highlighted with ring/pulse animation

**Sponsor Section:**
- Moved to a dedicated "Our Supporters" section on the About page + a slim logo strip in the footer
- Homepage: single subtle "Supported by" row with grayscale logos that colorize on hover
- No longer competing with safety content for attention

**Donate:**
- Dedicated `/donate` page with impact messaging ("$25 funds one field observation report")
- Embedded Stripe/PayPal form
- Homepage CTA: tasteful banner between content sections, not a PayPal button

### 11.6 Page Layouts (Wireframe Descriptions)

**Homepage:**
```
┌─────────────────────────────────────────┐
│ Nav: Logo | Conditions Weather Obs Map  │
│       Learn About        [Donate] [🔍] │
├─────────────────────────────────────────┤
│                                         │
│  ┌─ HERO (full-width photo bg) ───────┐ │
│  │  Current Conditions                │ │
│  │  ● Considerable – San Gabriel      │ │
│  │  ● Moderate – San Bernardino       │ │
│  │  Snowpack Summary Feb 20, 2026     │ │
│  │  [Read Full Summary →]             │ │
│  └────────────────────────────────────┘ │
│                                         │
│  AVALANCHE PROBLEMS                     │
│  [Wind Slab] [Storm Slab] [Wet Snow]   │
│                                         │
│  RECENT OBSERVATIONS ──── [View All →]  │
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │Card 1│ │Card 2│ │Card 3│            │
│  └──────┘ └──────┘ └──────┘            │
│                                         │
│  MOUNTAIN WEATHER (quick glance)        │
│  San Gabriel: 28°F ❄ Wind: 25mph       │
│  San Bernardino: 31°F ❄ Wind: 15mph    │
│  San Jacinto: 26°F ❄ Wind: 30mph       │
│  [Full Weather Details →]               │
│                                         │
│  ┌─ NEWSLETTER SIGNUP ────────────────┐ │
│  │  Get snowpack alerts in your inbox │ │
│  │  [email input] [Subscribe]         │ │
│  └────────────────────────────────────┘ │
│                                         │
│  ┌─ SUPPORT SCSAC ───────────────────┐  │
│  │  Help keep backcountry info free  │  │
│  │  [Donate]  [Learn More]           │  │
│  └───────────────────────────────────┘  │
│                                         │
│  Footer: Sponsor logos (grayscale)      │
│  Links | Social | © 2026 SCSAC         │
└─────────────────────────────────────────┘
```

**Observations Page:**
```
┌─────────────────────────────────────────┐
│  Observations                           │
│  [San Gabriel ▼] [San Bern ▼] [Date ▼] │
│  ┌─ Search observations... ───────────┐ │
│                                         │
│  ┌────────────────────────────────────┐ │
│  │ 📍 Angeles Crest  ·  Feb 20, 2026 │ │
│  │ 9200' · N/NE aspects              │ │
│  │ 3-4' new snow, wind slab concern  │ │
│  │ By: Allen Giernet    [Read More →] │ │
│  ├────────────────────────────────────┤ │
│  │ 📍 Angelus Oaks  ·  Feb 19, 2026  │ │
│  │ ...                                │ │
│  └────────────────────────────────────┘ │
│                                         │
│  ┌─ SUBMIT YOUR OWN OBSERVATION ─────┐  │
│  │  Help the community — share what  │  │
│  │  you see in the backcountry       │  │
│  │  [Submit a Report →]              │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 11.7 Motion & Interaction

- Page transitions: none (Astro serves full pages; keep it fast)
- Card hover: `transition-all duration-200` — subtle lift + shadow
- Accordion sections: `transition-[max-height] duration-300 ease-out`
- Mobile nav: slide-in from left, backdrop blur overlay
- Danger badges: subtle pulse animation on "High" and "Extreme" levels
- Loading states: skeleton placeholders for map component while island hydrates

### 11.8 Imagery & Photography

- Hero images: high-quality, wide-format mountain panoramas from SoCal ranges
- Use dark gradient overlays (from-black/60 to-transparent) for text legibility over photos
- Observation thumbnails: field photos submitted with reports, displayed at consistent 3:2 aspect ratio with object-fit cover
- Icons: Lucide icon set (open source, consistent line-weight style)
- Avalanche problem icons: custom SVG set matching North American standards (or adapt from avalanche.org assets)

---

## 12. Migration Considerations

- Preserve all existing observation content and snowpack summary archives
- Set up 301 redirects from all old URL paths (e.g., `/weather.html` → `/weather`, `/observations.html` → `/observations`)
- Maintain all existing external links (weather stations, NOAA, course providers)
- Preserve sponsor/supporter relationships and logo assets
- Keep the PayPal donation flow active during transition (can add Stripe later)
- Coordinate launch timing with SCSAC staff to avoid gaps in safety communication during switchover

---

## 13. Open Questions

| # | Question | Owner | Impact |
|---|----------|-------|--------|
| OQ-1 | **How many community observations were submitted last season?** Need a baseline to measure the 2x goal. | SCSAC Staff | Directly affects G2 target — may need to adjust if baseline is very low or very high. |
| OQ-2 | **Does SCSAC have a preferred payment processor?** Stripe vs. PayPal vs. both affects the donation page implementation. | SCSAC Board | Affects P0-11 and P1-9 scope. |
| OQ-3 | **Who will maintain content after launch?** Determines whether Phase 2 CMS (P2-1) is actually Phase 1. If no one on staff can edit Markdown, we need a visual CMS from day one. | SCSAC Staff | Could promote P2-1 to P0. Major scope change. |
| OQ-4 | **Are there existing high-res photos available for hero imagery?** If not, we need a photography plan or stock photo budget. | SCSAC Staff / Design | Affects visual quality at launch. |
| OQ-5 | **What is the current site's monthly traffic?** Needed for hosting tier selection and to set realistic analytics targets. | SCSAC Staff | Affects hosting choice and G4/lagging metric targets. |
| OQ-6 | **Does SCSAC want to preserve the discussion forum, or is it fully deprecated?** | SCSAC Board | Confirmed as NG5, but board should explicitly sign off. |
| OQ-7 | **Which island framework (Preact vs. Svelte)?** Preact is closer to React (easier to find contributors). Svelte is smaller and simpler. | Engineering | Affects DX and bundle size for interactive components. |
| OQ-8 | **Avalanche problem icons — can we use avalanche.org's assets, or do we need custom SVGs?** | Design / Legal | Affects design timeline and P1-4. |
| OQ-9 | **Is there a hard deadline tied to a season start?** SoCal snow season typically runs Nov–Apr. Launching mid-season is risky. | SCSAC Board | Affects phasing and whether to launch for 2026-27 season vs. patching current site. |

---

## 14. Timeline & Phasing

### Phase 1: Launch (Target: Pre-Season — October 2026)

**Goal:** Replace the current site with a fully functional modern equivalent.

| Week | Milestone |
|------|-----------|
| 1–2 | Project setup: Astro scaffolding, Tailwind config, Content Collection schemas, deploy pipeline |
| 3–4 | Core layout: BaseLayout, Header, Footer, Nav, MobileNav. Homepage structure. |
| 5–6 | Content pages: Snowpack summary (detail + archive), observation list + detail, weather page |
| 7–8 | Remaining pages: Resources (danger scale), About, Contact, Donate. Observation submission form. |
| 9 | Content migration: Import all existing observations and summaries into Content Collections |
| 10 | Search (Pagefind), SEO (redirects, sitemap, meta), analytics integration |
| 11 | QA: Cross-browser testing, mobile testing, Lighthouse audits, accessibility review |
| 12 | Soft launch to SCSAC staff for content workflow testing. DNS cutover. |

**All P0 requirements delivered.**

### Phase 2: Enhancements (Nov 2026 – Jan 2027)

- P1-1: Observation filtering
- P1-2: Interactive map
- P1-3: Newsletter signup + email alerts
- P1-4: Avalanche problem icons
- P1-5: Events listing
- P1-6: Sponsor CMS management
- P1-7: Homepage weather glance

### Phase 3: CMS & Automation (Feb 2027+)

- P2-1: Visual CMS for staff
- P2-2: Live weather data
- P2-5: PWA / offline support
- P2-6: Role-based access

### Dependencies

- **Content migration** (Phase 1, Week 9) depends on SCSAC staff providing access to existing content and confirming what to preserve vs. archive
- **Newsletter** (Phase 2) depends on OQ-2 (payment processor choice) and email platform selection
- **Interactive map** (Phase 2) depends on OQ-7 (island framework choice)
- **Visual CMS** (Phase 3) depends on OQ-3 — may be promoted to Phase 1 if staff can't work with Markdown

---

## 15. Appendix: Sponsor & Supporter Inventory

**Current Sponsors:** Arc'teryx La Brea, New Belgium/Fat Tire, Smith, Voile, Spark R&D, Jones Snowboards, La Sportiva, Team Mike/Mike McKay Memorial Foundation, Val Surf, Oakley, EvolutionBasin.com, Forty Below, First Snow Designs, Further Your Adventure, Mountain Hardwear, Wilderness Leadership Institute

**Current Supporters:** National Ski Patrol, Outdoor Women's Alliance, Baboon, NordicPatroller

**Partner Program:** Sierra Mountain Center — book a course with code SOCALAVY, $25 donated to SCSAC per booking

---

*This PRD is based on analysis of the live site at socalsnow.org as of February 22, 2026.*
