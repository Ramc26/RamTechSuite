# GEO / AEO Strategy — Ram Bikkina / RamBuilds

## Entity Definition

| Field | Value |
|--------|--------|
| **Name** | Ram Bikkina (Ramarao Bikkina, VVRB, itsmeramc) |
| **Role** | AI Engineer / Software Engineer |
| **Location** | Hyderabad, Telangana, India |
| **Engagement** | Freelance, contract, fractional / part-time |
| **Remote** | Yes — US, EU, India timezones |
| **Site** | https://www.rambuilds.in |
| **Profiles** | GitHub: https://github.com/Ramc26 · Medium: https://medium.com/@itsmeramc |
| **Contact** | itsrambikkina@gmail.com · +91 70958 38715 |

### Specialties (evidence-backed)

AI agents and multi-agent systems · RAG and LLM applications · MCP integrations · Python / FastAPI backends · APIs and data apps (text-to-SQL) · cloud deployment · AI product / MVP slices · e-commerce and automation (client work).

## Service Taxonomy

| Service URL | Maps to freelance JSON lane |
|-------------|-----------------------------|
| `/services/ai-agent-development` | Multi-agent systems |
| `/services/rag-development` | RAG & internal copilots |
| `/services/mcp-development` | APIs & MCP tooling |
| `/services/python-development` | Python/FastAPI + data backends |
| `/services/backend-development` | APIs, microservices, cloud |
| `/services/llm-development` | LLM apps, copilots, automation |

Primary CTA hub: **https://www.rambuilds.in/freelance**

## Target Query Concepts (natural coverage, not keyword stuffing)

- **Hire intent**: freelance AI engineer, contract AI engineer, fractional AI engineer, MCP developer, FastAPI developer, Python developer Hyderabad/remote
- **Capability**: build AI agents, RAG application, MCP server, AI MVP, logistics automation, microservices transition
- **Technology**: CrewAI, LangGraph, Model Context Protocol, FastAPI, LangChain, FAISS, Streamlit

## URL Architecture

```
/                          → Person + portfolio (IDE / recruiter / zen)
/freelance                 → ProfessionalService hub + FAQ + client work
/services/{slug}           → Service landing (6 pages)
/projects/{slug}           → Case study / portfolio evidence (9 pages)
/data/*.json               → Data for JS UI (not primary SEO targets)
```

## Internal Link Architecture

```
Home → Freelance → Services ↔ Projects → Contact (freelance#contact)
Service pages cross-link related services and 1–3 projects
Project pages link back to relevant service + freelance contact
```

Descriptive anchor text used throughout (e.g. “AI agent development”, “RAG development”).

## Structured Data Architecture

- **Stable entity ID**: `https://www.rambuilds.in/#person` (defined on homepage)
- **Website ID**: `https://www.rambuilds.in/#website`
- **Freelance studio**: `https://www.rambuilds.in/freelance#studio`
- **Per-service ID**: `https://www.rambuilds.in/services/{slug}#service`
- **Per-project ID**: `https://www.rambuilds.in/projects/{slug}#project`

Graph direction: Person → offers/services → WebPages → CreativeWork evidence.

## Content Strategy

1. **Freelance page** remains the conversion hub; keep static HTML in sync with `data/freelance.json` when copy changes.
2. **Service pages** answer “what / why / how / proof” in plain language; expand when new client work adds evidence.
3. **Project pages** document problem, role, stack, outcome — never invent clients or metrics.
4. **FAQ** maintained in `data/faq.json` and mirrored in visible `<details>` on freelance.

## Future Article Opportunities (on-site, if desired)

Only if each piece is technically substantive:

- Building production AI agents with Python and LangGraph
- MCP server design for internal APIs
- RAG architecture patterns (tool-routed retrieval)
- LLM-as-a-judge for agent evaluation (see existing Medium post)
- Text-to-SQL guardrails and dry-run SQL
- FastAPI patterns for SSE agent streams

Existing off-site authority: 14 entries in `data/articles.json` (Medium/Dev.to) — link from future on-site articles index if added.

## Maintenance

- After editing freelance copy: update `freelance.html` static blocks **or** rely on JSON-only for animated sections but keep hero/services/process in HTML aligned.
- Regenerate service/project pages: `python3 scripts/generate_seo_pages.py`
- Update `sitemap.xml` `lastmod` when adding URLs.
- Re-validate structured data after substantive content changes.

## What We Do Not Claim

No guaranteed rankings, AI citations, or fabricated reviews/clients. Testimonials on the freelance page remain sourced from `data/freelance.json` only.
