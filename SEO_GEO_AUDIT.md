# SEO / GEO / AEO Audit — RamBuilds

Date: 2026-09-26  
Site: https://www.rambuilds.in  
Primary commercial page: https://www.rambuilds.in/freelance

## Already Good

- **Homepage (`index.html`)**: Unique title, meta description, canonical (`https://www.rambuilds.in/`), robots, Open Graph, Twitter cards, geo hints, `rel=me` for GitHub/Medium.
- **Structured data on homepage**: Connected `@graph` with `Person`, `WebSite`, `ProfilePage`, and `FAQPage` using stable `@id` `https://www.rambuilds.in/#person`.
- **Freelance page metadata**: Title, description, canonical, robots, OG/Twitter (paths corrected for profile image).
- **Technical discovery**: `robots.txt` and `sitemap.xml` present; canonical host is consistently `www.rambuilds.in`.
- **Content quality**: Real service descriptions (CrewAI, LangGraph, RAG, MCP, FastAPI, text-to-SQL, cloud, fractional) and client project narratives in `data/freelance.json`.
- **Portfolio data**: `data/projects.json` and `data/articles.json` support evidence-backed technical authority (GitHub links, Medium/Dev.to).

## Immediate Problems (before this work)

1. **JS-only content on `/freelance`**: Hero, services, work stage, process, engagements, and contact copy were empty in initial HTML and filled only via `freelance.js` + `data/freelance.json` — poor for no-JS crawlers and weaker first paint for AI/search parsers.
2. **Thin URL surface**: Only `/` and `/freelance` in the sitemap — no dedicated service or project URLs for internal linking and query coverage.
3. **Incomplete entity graph on freelance**: Single `ProfessionalService` block; no `FAQPage`, `BreadcrumbList`, or links to service entities.
4. **Broken OG/image URLs** on freelance (and homepage): Malformed paths (`elementspdp_poses/...`).
5. **No visible FAQ** on freelance despite AEO need for natural-language answers.
6. **robots.txt**: No explicit allowance/documentation for AI *search* crawlers (e.g. `OAI-SearchBot`) vs training bots.

## Changes Made

### Phase 2 — Technical foundation

- Seeded **static HTML** on `freelance.html` for hero, stats, services, process, engagements, contact form options, and FAQ.
- Updated **`freelance.js`** to hydrate only empty regions; preserves static markup when present; headline animation still runs from JSON or static text.
- Added **FAQ section** (`#faq`) with visible `<details>` Q&A aligned to `data/faq.json`.
- Added **`<noscript>` project summaries** under Selected work for no-JS fallbacks.
- Fixed **OG/Twitter image URLs** on freelance and homepage.
- Expanded **`robots.txt`** with explicit `Allow` for `OAI-SearchBot`, `ChatGPT-User`, `Googlebot`, `Bingbot`; commented opt-out pattern for training crawlers.
- Expanded **`sitemap.xml`** with all new indexable service and project URLs.

### Phase 3 — GEO / AEO

- **`freelance.html` JSON-LD `@graph`**: `WebPage`, `BreadcrumbList`, `ProfessionalService` with `hasOfferCatalog`, `FAQPage` — all referencing `https://www.rambuilds.in/#person`.
- **Homepage `Person.knowsAbout`**: Extended with RAG, MCP, agents, backend/API terms (visible capabilities only).
- **Service pages**: Each includes `Service` + `WebPage` + `BreadcrumbList` JSON-LD.

### Phase 4 — Content & authority

- **6 service pages** under `/services/*` with problems, deliverables, technologies, related projects, and links back to `/freelance#contact`.
- **9 project case-study pages** under `/projects/*` from freelance client work and portfolio repos.
- **Internal links**: Service link row on freelance; footer/nav links; cross-links between services and projects.
- **`scripts/generate_seo_pages.py`**: Regenerates service/project HTML from a single source (run after content edits).

### Phase 5 — Validation notes

- One `h1` per page on freelance and generated pages.
- FAQ schema matches **visible** FAQ copy on freelance.
- No hidden keyword blocks; noscript content is standard fallback only.
- UI: Existing freelance visual system preserved (Syne/Outfit, cards, colors); additions are FAQ block, service link line, nav FAQ link, and footer Services link.

## Files Modified

- `freelance.html`, `freelance.js`, `freelance.css`
- `index.html`
- `robots.txt`, `sitemap.xml`
- `data/faq.json` (new)
- `seo-pages.css` (new)
- `scripts/generate_seo_pages.py` (new)

## New URLs

### Services

- https://www.rambuilds.in/services/ai-agent-development
- https://www.rambuilds.in/services/rag-development
- https://www.rambuilds.in/services/mcp-development
- https://www.rambuilds.in/services/python-development
- https://www.rambuilds.in/services/backend-development
- https://www.rambuilds.in/services/llm-development

### Projects

- https://www.rambuilds.in/projects/practiceai-ml-engineering
- https://www.rambuilds.in/projects/logistics-email-automation
- https://www.rambuilds.in/projects/ecommerce-zero-to-one
- https://www.rambuilds.in/projects/sleuth-ai-forensic-accounting
- https://www.rambuilds.in/projects/kueri-text-to-sql
- https://www.rambuilds.in/projects/multi-agent-crewai-orchestration
- https://www.rambuilds.in/projects/multi-doc-rag-agents
- https://www.rambuilds.in/projects/langgraph-agent-framework
- https://www.rambuilds.in/projects/loopify-batch-api-automation

## Structured Data

| Page | Types | Relationships |
|------|--------|----------------|
| `/` | Person, WebSite, ProfilePage, FAQPage | Person `@id` is canonical entity |
| `/freelance` | WebPage, BreadcrumbList, ProfessionalService, FAQPage | `provider` → `#person`; offers → service URLs |
| `/services/*` | Service, WebPage, BreadcrumbList | `provider` → `#person` |
| `/projects/*` | CreativeWork, WebPage | `author` → `#person` |

## Crawlability

- **Canonical**: `https://www.rambuilds.in` (with path, no trailing slash; matches `vercel.json` `cleanUrls`).
- **Sitemap**: All canonical indexable pages listed; no query strings or duplicate hosts.
- **robots**: Search/AI-search bots allowed; training bots not explicitly blocked (documented for future `Disallow` if desired).

## GEO / AEO

- Entity: **Ram Bikkina**, AI/software engineer, **Hyderabad, India**, freelance/contract/fractional, remote worldwide — stated in FAQ, freelance copy, JSON-LD, and service pages.
- Answer coverage: 12 FAQ items on freelance matching common hire/intent queries (agents, MCP, RAG, Python, remote, contact).
- Evidence graph: Projects link to GitHub where repos exist; client work described without invented metrics beyond sourced testimonials in JSON.

## Remaining Work

- **LinkedIn**: No LinkedIn URL in repo — not added to `sameAs` (do not invent).
- **Dedicated `/articles/` on-site**: Articles remain on Medium/Dev.to; optional future on-site technical posts.
- **Wedding invite projects**: Omitted standalone project pages (thin SEO value vs client privacy); available in freelance JSON/work stage.
- **Homepage visible FAQ**: Schema exists; visible FAQ only on `/freelance` to avoid IDE/recruiter UI changes.
- **Post-deploy check**: Confirm `www` vs apex redirects and HTTP→HTTPS on Vercel.
- **Rich Results Test**: Run Google Rich Results and Schema Validator after deploy.
- **GPTBot / other training crawlers**: Set explicit policy when you decide search vs training separation.
