#!/usr/bin/env python3
"""Generate static service and project HTML pages for SEO/AEO."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

NAV = """<header class="fl-nav">
    <a class="fl-brand" href="../">
      <span class="fl-brand-mark">rb</span>
      <span class="fl-brand-text">
        <span class="fl-brand-name">rambuilds.in</span>
        <span class="fl-brand-sub">Services</span>
      </span>
    </a>
    <nav class="fl-nav-links">
      <a href="../freelance">Freelance</a>
      <a href="../freelance#services">Services</a>
      <a href="../freelance#work">Work</a>
      <a href="../freelance#contact">Contact</a>
    </nav>
    <div class="fl-nav-end">
      <a class="fl-nav-ghost" href="../">Portfolio</a>
      <a class="fl-nav-cta" href="../freelance#contact">Hire me</a>
    </div>
  </header>"""

FOOT = """<footer class="fl-foot">
    <span>Ram Bikkina · Hyderabad · Remote</span>
    <span class="fl-foot-links">
      <a href="../">Portfolio</a>
      <a href="../freelance">Freelance</a>
      <a href="mailto:itsrambikkina@gmail.com">Email</a>
    </span>
  </footer>"""

BG = """<div class="fl-bg" aria-hidden="true">
    <div class="fl-bg-mesh"></div>
    <div class="fl-bg-vignette"></div>
  </div>"""


def page(title, description, canonical_path, breadcrumb_label, body_html, json_ld: str):
    canonical = f"https://www.rambuilds.in/{canonical_path}"
    depth = canonical_path.count("/")
    prefix = "../" * depth
    nav = NAV.replace('href="../', f'href="{prefix}').replace('href="./', f'href="{prefix}')
    foot = FOOT.replace('href="../', f'href="{prefix}')
    bg = BG
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="author" content="Ram Bikkina">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{canonical}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:site_name" content="rambuilds.in — Ram Bikkina">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{description}">
  <script type="application/ld+json">
{json_ld}
  </script>
  <link rel="icon" type="image/png" href="{prefix}elements/RAMDEV_cropped.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Syne:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{prefix}freelance.css">
  <link rel="stylesheet" href="{prefix}seo-pages.css">
</head>
<body class="fl-body">
{bg}
{nav}
  <main class="seo-page">
    <nav class="seo-breadcrumb" aria-label="Breadcrumb">
      <a href="{prefix}">Home</a> · <a href="{prefix}freelance">Freelance</a> · {breadcrumb_label}
    </nav>
{body_html}
  </main>
{foot}
</body>
</html>
"""


def service_json_ld(slug, name, desc):
    url = f"https://www.rambuilds.in/services/{slug}"
    return f"""{{
    "@context": "https://schema.org",
    "@graph": [
      {{
        "@type": "Service",
        "@id": "{url}#service",
        "name": "{name}",
        "description": "{desc}",
        "provider": {{ "@id": "https://www.rambuilds.in/#person" }},
        "areaServed": "Worldwide",
        "url": "{url}"
      }},
      {{
        "@type": "WebPage",
        "@id": "{url}#webpage",
        "url": "{url}",
        "name": "{name} | Ram Bikkina",
        "about": {{ "@id": "{url}#service" }},
        "isPartOf": {{ "@id": "https://www.rambuilds.in/#website" }}
      }},
      {{
        "@type": "BreadcrumbList",
        "itemListElement": [
          {{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rambuilds.in/" }},
          {{ "@type": "ListItem", "position": 2, "name": "Freelance", "item": "https://www.rambuilds.in/freelance" }},
          {{ "@type": "ListItem", "position": 3, "name": "{name}", "item": "{url}" }}
        ]
      }}
    ]
  }}"""


SERVICES = [
    {
        "slug": "ai-agent-development",
        "title": "AI Agent Development Services | Ram Bikkina",
        "name": "AI Agent Development",
        "desc": "Freelance AI agent development with CrewAI, LangGraph, supervisor graphs, MCP tools, and production APIs. Ram Bikkina, Hyderabad · remote.",
        "body": """
    <h1>AI Agent Development</h1>
    <p class="seo-lede">Ram Bikkina builds multi-agent systems for production — supervisor-led delegation, custom MCP tools, and eval hooks — not one-off prompt demos.</p>
    <h2>Problems this solves</h2>
    <ul>
      <li>Single LLM prompts that break on real workflows (IDV, OCR, research, ops)</li>
      <li>Agents that cannot call your internal APIs reliably</li>
      <li>Prototypes that never reach a deployable repo</li>
    </ul>
    <h2>What can be built</h2>
    <ul>
      <li>CrewAI or LangGraph supervisor / specialist graphs</li>
      <li>Custom MCP tools with JSON Schema and structured outputs</li>
      <li>FastAPI backends with SSE streams for agent UIs</li>
      <li>Evaluation hooks for tool-call reliability</li>
    </ul>
    <h2>Technologies</h2>
    <p>Python, CrewAI, LangGraph, LangChain, MCP, FastAPI, OpenAI and other LLM APIs, Docker, cloud deploys on AWS/GCP/Azure.</p>
    <h2>Related work</h2>
    <div class="seo-links">
      <a href="../projects/multi-agent-crewai-orchestration">Multi-Agent CrewAI Orchestration</a>
      <a href="../projects/practiceai-ml-engineering">PracticeAI — AI/ML Engineering</a>
      <a href="../projects/langgraph-agent-framework">LangGraph Agent Framework</a>
    </div>
    <h2>Engagement</h2>
    <p>Typical fit: a 2–6 week sprint for one agent loop, or fractional embedding for ongoing agent work. <a href="../freelance#contact">Start a project</a>.</p>
    <div class="seo-foot-nav">Related services: <a href="mcp-development">MCP development</a> · <a href="llm-development">LLM applications</a> · <a href="python-development">Python development</a></div>
""",
    },
    {
        "slug": "rag-development",
        "title": "RAG Development Services | Ram Bikkina",
        "name": "RAG Development",
        "desc": "RAG and internal copilot development: ingestion, tool-routed retrieval, citations, and team UIs. Freelance engineer Ram Bikkina.",
        "body": """
    <h1>RAG &amp; Internal Copilot Development</h1>
    <p class="seo-lede">Grounded Q&amp;A over docs, ledgers, Slack, and tickets — with citations, tool-routed retrieval, and interfaces your team actually uses.</p>
    <h2>Problems this solves</h2>
    <ul>
      <li>Chatbots that hallucinate without source citations</li>
      <li>One giant vector index that mixes incompatible document types</li>
      <li>Analyst bottlenecks for operational questions</li>
    </ul>
    <h2>What can be built</h2>
    <ul>
      <li>Ingestion and chunking pipelines</li>
      <li>Tool-routed retrieval (specialized indexes per domain)</li>
      <li>Streamlit or web UIs for internal teams</li>
      <li>RAG-lite investigators over structured + unstructured data</li>
    </ul>
    <h2>Related work</h2>
    <div class="seo-links">
      <a href="../projects/sleuth-ai-forensic-accounting">Sleuth: AI Forensic Accounting</a>
      <a href="../projects/multi-doc-rag-agents">Multi-Doc RAG Agents</a>
    </div>
    <p><a href="../freelance#contact">Discuss a RAG copilot</a></p>
    <div class="seo-foot-nav"><a href="llm-development">LLM development</a> · <a href="ai-agent-development">AI agents</a></div>
""",
    },
    {
        "slug": "mcp-development",
        "title": "MCP Development Services | Ram Bikkina",
        "name": "MCP Development",
        "desc": "Model Context Protocol (MCP) server development and AI tool integrations for Claude, Cursor, and custom agents.",
        "body": """
    <h1>MCP Development</h1>
    <p class="seo-lede">MCP servers and tool integrations so LLM agents can call your APIs, databases, and internal systems with structured schemas — not brittle string parsing.</p>
    <h2>What can be built</h2>
    <ul>
      <li>MCP servers exposing internal APIs and data sources</li>
      <li>JSON Schema tool definitions for agent reliability</li>
      <li>Integrations for Claude Desktop, Cursor, and custom agent stacks</li>
      <li>FastAPI services backing MCP tools in production</li>
    </ul>
    <h2>Related work</h2>
    <div class="seo-links">
      <a href="../projects/kueri-text-to-sql">Kueri: Text-to-SQL Engine</a>
      <a href="../projects/multi-agent-crewai-orchestration">Multi-Agent CrewAI Orchestration</a>
    </div>
    <p><a href="../freelance#contact">Hire for MCP work</a></p>
    <div class="seo-foot-nav"><a href="backend-development">Backend development</a> · <a href="ai-agent-development">AI agents</a></div>
""",
    },
    {
        "slug": "python-development",
        "title": "Python Backend Development | Ram Bikkina",
        "name": "Python Development",
        "desc": "Freelance Python and FastAPI development for AI applications, APIs, and data systems. Ram Bikkina — Hyderabad, remote worldwide.",
        "body": """
    <h1>Python &amp; FastAPI Development</h1>
    <p class="seo-lede">Production Python services — FastAPI, Flask, structured logging, auth, and deploy-ready packaging for AI and data products.</p>
    <h2>What can be built</h2>
    <ul>
      <li>FastAPI / Flask REST and SSE APIs</li>
      <li>LangGraph and agent orchestration backends</li>
      <li>Text-to-SQL and data application backends</li>
      <li>Microservice extraction and API design</li>
    </ul>
    <h2>Related work</h2>
    <div class="seo-links">
      <a href="../projects/kueri-text-to-sql">Kueri: Text-to-SQL</a>
      <a href="../projects/practiceai-ml-engineering">PracticeAI backend / microservices</a>
      <a href="../projects/loopify-batch-api-automation">Loopify batch API automation</a>
    </div>
    <p><a href="../freelance#contact">Start a Python project</a></p>
    <div class="seo-foot-nav"><a href="backend-development">Backend APIs</a> · <a href="rag-development">RAG</a></div>
""",
    },
    {
        "slug": "backend-development",
        "title": "Backend &amp; API Development | Ram Bikkina",
        "name": "Backend & API Development",
        "desc": "Freelance backend and API development: FastAPI, auth, rate limits, cloud deployment, and microservices. Ram Bikkina.",
        "body": """
    <h1>Backend &amp; API Development</h1>
    <p class="seo-lede">APIs and backend systems that AI features and product teams depend on — auth, rate limits, observability, and repeatable deploys.</p>
    <h2>What can be built</h2>
    <ul>
      <li>Production FastAPI and Flask services</li>
      <li>Monolith-to-microservice transitions</li>
      <li>Docker / Kubernetes packaging and CI-friendly secrets</li>
      <li>Cost and latency review before handoff</li>
    </ul>
    <h2>Related work</h2>
    <div class="seo-links">
      <a href="../projects/practiceai-ml-engineering">PracticeAI microservices transition</a>
      <a href="../projects/ecommerce-zero-to-one">E-commerce zero-to-one platform</a>
    </div>
    <p><a href="../freelance#contact">Discuss backend work</a></p>
    <div class="seo-foot-nav"><a href="python-development">Python</a> · <a href="mcp-development">MCP</a></div>
""",
    },
    {
        "slug": "llm-development",
        "title": "LLM Application Development | Ram Bikkina",
        "name": "LLM Application Development",
        "desc": "LLM application development: agents, copilots, tool use, and production AI features. Freelance AI engineer Ram Bikkina.",
        "body": """
    <h1>LLM Application Development</h1>
    <p class="seo-lede">LLM-powered applications that combine models with tools, retrieval, and UIs — shipped in repos you own with docs and deploy paths.</p>
    <h2>What can be built</h2>
    <ul>
      <li>Internal copilots and operator-facing assistants</li>
      <li>Multi-step reasoning with LangGraph or CrewAI</li>
      <li>Logistics and email automation with LLM extraction</li>
      <li>AI MVP slices from idea to working prototype</li>
    </ul>
    <h2>Related work</h2>
    <div class="seo-links">
      <a href="../projects/logistics-email-automation">Logistics email automation</a>
      <a href="../projects/sleuth-ai-forensic-accounting">Sleuth</a>
      <a href="../projects/kueri-text-to-sql">Kueri</a>
    </div>
    <p><a href="../freelance#contact">Tell me what you're shipping</a></p>
    <div class="seo-foot-nav"><a href="ai-agent-development">AI agents</a> · <a href="rag-development">RAG</a></div>
""",
    },
]

PROJECTS = [
    {
        "slug": "practiceai-ml-engineering",
        "title": "PracticeAI AI/ML Engineering | Ram Bikkina",
        "desc": "Case study: AI/ML engineering and monolith-to-microservices work for PracticeAI / DataToBiz.",
        "name": "PracticeAI — AI/ML Engineering",
        "body": """
    <h1>PracticeAI — AI/ML Engineering</h1>
    <p class="seo-lede"><strong>Client:</strong> DataToBiz / PracticeAI · <strong>Role:</strong> AI/ML Engineer · <strong>Year:</strong> 2026</p>
    <h2>Problem</h2>
    <p>Product needed practical AI/ML engineering and a path from a monolithic backend toward scalable microservices.</p>
    <h2>Solution</h2>
    <p>Translated product requirements into technical work on AI/ML services, backend improvements, and service separation.</p>
    <h2>Ram's role</h2>
    <ul>
      <li>Understood and translated product requirements into implementations</li>
      <li>Worked on AI/ML engineering and backend services</li>
      <li>Helped restructure the monolithic service into microservices</li>
      <li>Contributed to architecture and backend improvements on an existing codebase</li>
    </ul>
    <h2>Technologies</h2>
    <p>Python, AI/ML, microservices, backend APIs.</p>
    <h2>Outcome</h2>
    <p>Accelerated the transition from monolithic architecture toward a microservice-based system within the first few days of onboarding.</p>
    <p><a href="../freelance#contact">Similar architecture work</a> · <a href="../services/backend-development">Backend development</a></p>
""",
    },
    {
        "slug": "logistics-email-automation",
        "title": "AI Logistics Email Automation | Ram Bikkina",
        "desc": "Case study: AI-powered logistics email processing and workflow automation for Jesse Miller / Several Millers.",
        "name": "AI Automated Logistics Email Processing",
        "body": """
    <h1>AI Automated Logistics Email Processing</h1>
    <p class="seo-lede"><strong>Client:</strong> Jesse Miller · <strong>Role:</strong> AI Automation Engineer · <strong>Year:</strong> 2025</p>
    <h2>Problem</h2>
    <p>Operational logistics depended on repetitive email-driven workflows and manual status checks.</p>
    <h2>Solution</h2>
    <p>AI classification and extraction pipeline integrated with Gmail, Google Sheets, browser/API checks, and draft responses.</p>
    <h2>Technologies</h2>
    <p>Python, LLMs, Gmail, Google Sheets, AWS Lambda, Playwright, Composio.</p>
    <h2>Outcome</h2>
    <p>Concept to functional prototype in just over a week, with significantly less manual intervention in the workflow.</p>
    <p><a href="../services/llm-development">LLM applications</a> · <a href="../freelance#contact">Automation projects</a></p>
""",
    },
    {
        "slug": "ecommerce-zero-to-one",
        "title": "E-commerce Zero-to-One Rebuild | Ram Bikkina",
        "desc": "Case study: full zero-to-one e-commerce platform rebuild for BozSkyVedaLife.",
        "name": "E-commerce Platform — Zero to One",
        "body": """
    <h1>E-commerce Platform — Zero to One</h1>
    <p class="seo-lede"><strong>Client:</strong> BozSkyVedaLife · <strong>Role:</strong> Full-Stack Developer · <strong>Year:</strong> 2026</p>
    <h2>Problem</h2>
    <p>Existing commerce experience needed a complete redesign and rebuild across UI, backend, database, and admin workflows.</p>
    <h2>Solution</h2>
    <p>End-to-end platform delivery: frontend, backend, database design, admin panel, and feedback-driven iterations.</p>
    <h2>Technologies</h2>
    <p>HTML, CSS, JavaScript, Bootstrap, jQuery, Next.js, Python, backend, database.</p>
    <h2>Outcome</h2>
    <p>Zero-to-one rebuild in approximately 35 days including subsequent feedback-driven rework.</p>
    <p><a href="../services/backend-development">Backend development</a></p>
""",
    },
    {
        "slug": "sleuth-ai-forensic-accounting",
        "title": "Sleuth AI Forensic Accounting | Ram Bikkina",
        "desc": "RAG-lite investigator for ledger discrepancies — portfolio project by Ram Bikkina.",
        "name": "Sleuth: AI Forensic Accounting",
        "body": """
    <h1>Sleuth: AI Forensic Accounting</h1>
    <p class="seo-lede">A RAG-lite investigator that explains ledger discrepancies by matching structured data with unstructured context (email, Slack).</p>
    <h2>Technologies</h2>
    <p>Python, OpenAI (GPT-4o), Pandas, Streamlit.</p>
    <h2>Links</h2>
    <p><a href="https://github.com/Ramc26/Sleuth" rel="noopener noreferrer">GitHub — Sleuth</a></p>
    <p><a href="../services/rag-development">RAG development services</a></p>
""",
    },
    {
        "slug": "kueri-text-to-sql",
        "title": "Kueri Text-to-SQL Engine | Ram Bikkina",
        "desc": "LangGraph and MCP text-to-SQL system — portfolio project by Ram Bikkina.",
        "name": "Kueri: Text-to-SQL Engine",
        "body": """
    <h1>Kueri: Text-to-SQL Engine</h1>
    <p class="seo-lede">Modular natural-language interface using LangGraph and MCP servers so non-technical users can query databases.</p>
    <h2>Technologies</h2>
    <p>LangGraph, MCP, FastAPI, Streamlit.</p>
    <p><a href="https://github.com/Ramc26/Kueri" rel="noopener noreferrer">GitHub — Kueri</a></p>
    <p><a href="../services/python-development">Python development</a> · <a href="../services/mcp-development">MCP development</a></p>
""",
    },
    {
        "slug": "multi-agent-crewai-orchestration",
        "title": "Multi-Agent CrewAI Orchestration | Ram Bikkina",
        "desc": "Hierarchical CrewAI system with MCP tools — portfolio project by Ram Bikkina.",
        "name": "Multi-Agent CrewAI Orchestration",
        "body": """
    <h1>Multi-Agent CrewAI Orchestration</h1>
    <p class="seo-lede">Manager agent delegates IDV, OCR, and face-match tasks to specialists via custom MCP tools.</p>
    <h2>Technologies</h2>
    <p>CrewAI, MCP, FastAPI, SSE.</p>
    <p><a href="../services/ai-agent-development">AI agent development</a></p>
""",
    },
    {
        "slug": "multi-doc-rag-agents",
        "title": "Multi-Doc RAG Agents | Ram Bikkina",
        "desc": "CrewAI agents with FAISS-backed RAG tools — portfolio project.",
        "name": "Multi-Doc RAG Agents",
        "body": """
    <h1>Multi-Doc RAG Agents</h1>
    <p class="seo-lede">CrewAI agents that select between specialized FAISS-backed RAG tools for policy and protocol analysis.</p>
    <h2>Technologies</h2>
    <p>CrewAI, FAISS, LangChain.</p>
    <p><a href="https://github.com/Ramc26/RAG-Agents" rel="noopener noreferrer">GitHub — RAG-Agents</a></p>
    <p><a href="../services/rag-development">RAG development</a></p>
""",
    },
    {
        "slug": "langgraph-agent-framework",
        "title": "LangGraph Agent Framework | Ram Bikkina",
        "desc": "Stateful LangGraph execution graphs for multi-turn AI reasoning.",
        "name": "LangGraph Agent Framework",
        "body": """
    <h1>LangGraph Agent Framework</h1>
    <p class="seo-lede">Stateful execution graphs for complex, multi-turn AI reasoning and supervisor-led delegation.</p>
    <h2>Technologies</h2>
    <p>LangGraph, Python, state management.</p>
    <p><a href="../services/ai-agent-development">AI agent development</a></p>
""",
    },
    {
        "slug": "loopify-batch-api-automation",
        "title": "Loopify Batch API Automation | Ram Bikkina",
        "desc": "High-speed CSV batch API testing tool — portfolio project.",
        "name": "Loopify: Batch API Automation",
        "body": """
    <h1>Loopify: Batch API Automation</h1>
    <p class="seo-lede">Batch testing tool for CSV-driven API requests with configurable delays and result tracking.</p>
    <p><a href="https://github.com/Ramc26/Loopify" rel="noopener noreferrer">GitHub — Loopify</a></p>
    <p><a href="../services/python-development">Python development</a></p>
""",
    },
]


def project_json_ld(slug, name, desc):
    url = f"https://www.rambuilds.in/projects/{slug}"
    return f"""{{
    "@context": "https://schema.org",
    "@graph": [
      {{
        "@type": "CreativeWork",
        "@id": "{url}#project",
        "name": "{name}",
        "description": "{desc}",
        "author": {{ "@id": "https://www.rambuilds.in/#person" }},
        "url": "{url}"
      }},
      {{
        "@type": "WebPage",
        "@id": "{url}#webpage",
        "url": "{url}",
        "name": "{name} | Ram Bikkina",
        "about": {{ "@id": "{url}#project" }}
      }}
    ]
  }}"""


def main():
    for s in SERVICES:
        path = f"services/{s['slug']}"
        ld = service_json_ld(s["slug"], s["name"], s["desc"].replace('"', '\\"'))
        html = page(s["title"], s["desc"], path, s["name"], s["body"], ld)
        out = ROOT / "services" / f"{s['slug']}.html"
        out.write_text(html, encoding="utf-8")
        print("wrote", out)

    for p in PROJECTS:
        path = f"projects/{p['slug']}"
        ld = project_json_ld(p["slug"], p["name"], p["desc"].replace('"', '\\"'))
        html = page(
            p["title"],
            p["desc"],
            path,
            p["name"],
            p["body"],
            ld,
        )
        out = ROOT / "projects" / f"{p['slug']}.html"
        out.write_text(html, encoding="utf-8")
        print("wrote", out)


if __name__ == "__main__":
    main()
