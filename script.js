/* ============================================================
   PORTFOLIO IDE — script.js
   Full IDE engine: files, tabs, terminal, modals
   ============================================================ */

// ===== JSON DATA CACHE =====
let _projectsData = null;
let _articlesData = null;

const _byNewest = (a, b) => (Number(b.id) || 0) - (Number(a.id) || 0);

async function loadProjectsData() {
    if (_projectsData) return _projectsData;
    try {
        const resp = await fetch('./data/projects.json');
        const raw = await resp.json();
        _projectsData = Array.isArray(raw) ? raw.slice().sort(_byNewest) : [];
    } catch (e) {
        console.warn('Could not load projects.json, using fallback');
        _projectsData = [];
    }
    return _projectsData;
}

async function loadArticlesData() {
    if (_articlesData) return _articlesData;
    try {
        const resp = await fetch('./data/articles.json');
        const raw = await resp.json();
        _articlesData = Array.isArray(raw) ? raw.slice().sort(_byNewest) : [];
    } catch (e) {
        console.warn('Could not load articles.json, using fallback');
        _articlesData = [];
    }
    return _articlesData;
}

// ===== FILE CONTENT DEFINITIONS =====
const FILES = {
    readme: {
        name: 'README.md', lang: 'Markdown', dot: 'dot-md',
        content: `<span class="tag"># 🚀 ram.dev — Portfolio IDE</span>

<span class="tag2">## Quick Start</span>

Open the <span class="mdcode">TERMINAL</span> below and type <span class="mdcode">help</span> to see available commands.

<span class="tag3">### Available Commands</span>

| Command                | Description                          |
|<span class="mdhr">------------------------|--------------------------------------|</span>
| <span class="mdcode">help</span>                  | Show all available commands           |
| <span class="mdcode">ls</span>                    | List portfolio files                  |
| <span class="mdcode">open &lt;filename&gt;</span>       | Open a file in the editor             |
| <span class="mdcode">cat &lt;filename&gt;</span>        | Print file contents to terminal       |
| <span class="mdcode">run projects.ts</span>       | View projects (opens modal)           |
| <span class="mdcode">run articles.md</span>       | View articles (opens modal)           |
| <span class="mdcode">run contact.sh</span>        | Send me a message (opens contact)     |
| <span class="mdcode">whoami</span>                | About me                              |
| <span class="mdcode">python about.py</span>       | Execute about.py                      |
| <span class="mdcode">git log --oneline</span>     | View commit history                   |
| <span class="mdcode">clear</span>                 | Clear terminal                        |

<span class="tag3">### About This Portfolio</span>

This portfolio is built as an <span class="mdbold">interactive IDE experience</span>.
Navigate files in the <span class="mdcode">Explorer</span> sidebar, or use the integrated
terminal to explore my work, projects, and get in touch.

<span class="cmt">&gt; "Code is poetry — this is my anthology."</span>

<span class="mdhr">---</span>
<span class="cmt">© 2025 Ram Bikkina | Handcoded with ☕ and 🎧</span>`
    },

    about: {
        name: 'about.py', lang: 'Python', dot: 'dot-py',
        content: `<span class="cmt">#!/usr/bin/env python3</span>
<span class="cmt">"""
About Me — Ram Bikkina
R&D Engineer | AI Agent Architect
"""</span>

<span class="kw">class</span> <span class="cls">Engineer</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="prop">self</span>):
        <span class="prop">self</span>.name        = <span class="str">"Ram Bikkina"</span>
        <span class="prop">self</span>.role        = <span class="str">"R&D Engineer I"</span>
        <span class="prop">self</span>.company     = <span class="str">"Jukshio Technologies"</span>
        <span class="prop">self</span>.location    = <span class="str">"Hyderabad, TG, India"</span>
        <span class="prop">self</span>.email       = <span class="str">"itsrambikkina@gmail.com"</span>
        <span class="prop">self</span>.github      = <span class="str">"github.com/Ramc26"</span>
        <span class="prop">self</span>.phone       = <span class="str">"+91 70958 38715"</span>

    <span class="kw">def</span> <span class="fn">education</span>(<span class="prop">self</span>):
        <span class="kw">return</span> [
            {<span class="str">"degree"</span>: <span class="str">"MS, Computer &amp; Information Technology"</span>,
             <span class="str">"school"</span>: <span class="str">"Purdue University, Hammond IN"</span>,
             <span class="str">"year"</span>:   <span class="str">"Jan 2022 – May 2023"</span>},
            {<span class="str">"degree"</span>: <span class="str">"B.Tech, Electronics &amp; Communication"</span>,
             <span class="str">"school"</span>: <span class="str">"Aditya College of Engineering, India"</span>,
             <span class="str">"year"</span>:   <span class="str">"Jul 2016 – Aug 2020"</span>},
        ]

    <span class="kw">def</span> <span class="fn">focus_areas</span>(<span class="prop">self</span>):
        <span class="kw">return</span> [
            <span class="str">"Multi-Agent AI Systems (CrewAI, LangGraph)"</span>,
            <span class="str">"MCP Tool Ecosystems &amp; LLM Orchestration"</span>,
            <span class="str">"High-Performance APIs (FastAPI, Flask)"</span>,
            <span class="str">"Containerized Microservices (Docker, K8s)"</span>,
            <span class="str">"Cloud Infrastructure (AWS, GCP, Azure)"</span>,
        ]

    <span class="kw">def</span> <span class="fn">__repr__</span>(<span class="prop">self</span>):
        <span class="kw">return</span> <span class="str">f"Engineer('{self.name}', '{self.role}')"</span>


<span class="kw">if</span> __name__ == <span class="str">"__main__"</span>:
    ram = <span class="cls">Engineer</span>()
    <span class="fn">print</span>(ram)
    <span class="fn">print</span>(<span class="str">f"Focus: {ram.focus_areas()}"</span>)`
    },

    experience: {
        name: 'experience.json', lang: 'JSON', dot: 'dot-json',
        content: `<span class="punc">{</span>
  <span class="prop">"experience"</span><span class="punc">:</span> <span class="punc">[</span>
    <span class="punc">{</span>
      <span class="prop">"role"</span><span class="punc">:</span>    <span class="str">"R&D Engineer I"</span><span class="punc">,</span>
      <span class="prop">"company"</span><span class="punc">:</span> <span class="str">"Jukshio Technologies"</span><span class="punc">,</span>
      <span class="prop">"location"</span><span class="punc">:</span><span class="str">"Hyderabad, India"</span><span class="punc">,</span>
      <span class="prop">"period"</span><span class="punc">:</span>  <span class="str">"Jun 2024 – Present"</span><span class="punc">,</span>
      <span class="prop">"highlights"</span><span class="punc">:</span> <span class="punc">[</span>
        <span class="str">"CrewAI multi-agent orchestration via MCP tools"</span><span class="punc">,</span>
        <span class="str">"LangGraph stateful agent framework"</span><span class="punc">,</span>
        <span class="str">"15+ MCP tools with JSON Schema (zero-hallucination)"</span><span class="punc">,</span>
        <span class="str">"SSE microservice framework for AI agents"</span><span class="punc">,</span>
        <span class="str">"FastAPI + Vertex AI data generation API"</span><span class="punc">,</span>
        <span class="str">"Docker/K8s microservice deployment (40% ↑ utilization)"</span><span class="punc">,</span>
        <span class="str">"30% faster API response via optimization"</span>
      <span class="punc">]</span>
    <span class="punc">}</span><span class="punc">,</span>
    <span class="punc">{</span>
      <span class="prop">"role"</span><span class="punc">:</span>    <span class="str">"Python Developer (Intern)"</span><span class="punc">,</span>
      <span class="prop">"company"</span><span class="punc">:</span> <span class="str">"Rubistone Technologies LLC"</span><span class="punc">,</span>
      <span class="prop">"location"</span><span class="punc">:</span><span class="str">"Chicago, IL"</span><span class="punc">,</span>
      <span class="prop">"period"</span><span class="punc">:</span>  <span class="str">"Feb 2023 – Aug 2023"</span><span class="punc">,</span>
      <span class="prop">"highlights"</span><span class="punc">:</span> <span class="punc">[</span>
        <span class="str">"500K+ daily articles AI aggregation (99.5% uptime)"</span><span class="punc">,</span>
        <span class="str">"PySpark + AWS Glue: 1M+ records analytics"</span><span class="punc">,</span>
        <span class="str">"LLM-based automation (30% less review time)"</span><span class="punc">,</span>
        <span class="str">"Flask/Django microservices + Terraform IaC"</span>
      <span class="punc">]</span>
    <span class="punc">}</span><span class="punc">,</span>
    <span class="punc">{</span>
      <span class="prop">"role"</span><span class="punc">:</span>    <span class="str">"R&D Engineer I"</span><span class="punc">,</span>
      <span class="prop">"company"</span><span class="punc">:</span> <span class="str">"Jukshio"</span><span class="punc">,</span>
      <span class="prop">"location"</span><span class="punc">:</span><span class="str">"Hyderabad, India"</span><span class="punc">,</span>
      <span class="prop">"period"</span><span class="punc">:</span>  <span class="str">"Jul 2020 – Aug 2021"</span><span class="punc">,</span>
      <span class="prop">"highlights"</span><span class="punc">:</span> <span class="punc">[</span>
        <span class="str">"Python automation (30% less manual effort)"</span><span class="punc">,</span>
        <span class="str">"Backend APIs for web/mobile apps"</span><span class="punc">,</span>
        <span class="str">"40% DB performance improvement"</span><span class="punc">,</span>
        <span class="str">"Optimized SQL (MySQL, PostgreSQL)"</span>
      <span class="punc">]</span>
    <span class="punc">}</span>
  <span class="punc">]</span>
<span class="punc">}</span>`
    },

    stack: {
        name: 'stack.yaml', lang: 'YAML', dot: 'dot-yaml',
        content: `<span class="ycom"># stack.yaml — Technical Stack</span>
<span class="ycom"># Ram Bikkina | R&D Engineer</span>

<span class="ykey">ai_ml</span><span class="punc">:</span>
  <span class="punc">-</span> <span class="yval">CrewAI</span>
  <span class="punc">-</span> <span class="yval">LangGraph</span>
  <span class="punc">-</span> <span class="yval">LangChain</span>
  <span class="punc">-</span> <span class="yval">MCP Tools</span>
  <span class="punc">-</span> <span class="yval">OpenAI Whisper</span>
  <span class="punc">-</span> <span class="yval">Ollama</span>
  <span class="punc">-</span> <span class="yval">Hugging Face</span>
  <span class="punc">-</span> <span class="yval">OpenCV</span>
  <span class="punc">-</span> <span class="yval">Google Vertex AI</span>

<span class="ykey">backend</span><span class="punc">:</span>
  <span class="punc">-</span> <span class="yval">Python</span>
  <span class="punc">-</span> <span class="yval">FastAPI</span>
  <span class="punc">-</span> <span class="yval">Flask</span>
  <span class="punc">-</span> <span class="yval">Django</span>
  <span class="punc">-</span> <span class="yval">GoLang</span>
  <span class="punc">-</span> <span class="yval">REST APIs</span>
  <span class="punc">-</span> <span class="yval">SQLAlchemy + Alembic</span>

<span class="ykey">databases</span><span class="punc">:</span>
  <span class="punc">-</span> <span class="yval">PostgreSQL</span>
  <span class="punc">-</span> <span class="yval">MySQL</span>
  <span class="punc">-</span> <span class="yval">MongoDB</span>
  <span class="punc">-</span> <span class="yval">Milvus (Vector DB)</span>

<span class="ykey">cloud_devops</span><span class="punc">:</span>
  <span class="punc">-</span> <span class="yval">AWS (Certified Developer Associate)</span>
  <span class="punc">-</span> <span class="yval">GCP</span>
  <span class="punc">-</span> <span class="yval">Azure</span>
  <span class="punc">-</span> <span class="yval">Docker</span>
  <span class="punc">-</span> <span class="yval">Kubernetes</span>
  <span class="punc">-</span> <span class="yval">CI/CD Pipelines</span>
  <span class="punc">-</span> <span class="yval">Terraform</span>

<span class="ykey">languages</span><span class="punc">:</span>
  <span class="punc">-</span> <span class="yval">Python</span>
  <span class="punc">-</span> <span class="yval">GoLang</span>
  <span class="punc">-</span> <span class="yval">SQL</span>
  <span class="punc">-</span> <span class="yval">Shell/Bash</span>
  <span class="punc">-</span> <span class="yval">JavaScript</span>

<span class="ykey">testing</span><span class="punc">:</span>
  <span class="punc">-</span> <span class="yval">PyTest</span>
  <span class="punc">-</span> <span class="yval">Locust</span>
  <span class="punc">-</span> <span class="yval">UnitTest</span>

<span class="ykey">certifications</span><span class="punc">:</span>
  <span class="punc">-</span> <span class="yval">AWS Certified Developer Associate</span>
  <span class="punc">-</span> <span class="yval">Microsoft Certified (Python &amp; JS)</span>
  <span class="punc">-</span> <span class="yval">VMware IT Academy</span>
  <span class="punc">-</span> <span class="yval">HackerRank SQL</span>`
    },

    projects: {
        name: 'projects.ts', lang: 'TypeScript', dot: 'dot-ts',
        content: `<span class="cmt">// projects.ts — Key Projects</span>
<span class="cmt">// Data loaded from ./data/projects.json</span>
<span class="cmt">// Execute: run projects.ts</span>

<span class="kw">interface</span> <span class="type">Project</span> <span class="punc">{</span>
  <span class="prop">id</span>:      <span class="type">number</span>;
  <span class="prop">name</span>:    <span class="type">string</span>;
  <span class="prop">desc</span>:    <span class="type">string</span>;
  <span class="prop">impact</span>:  <span class="type">string</span>;
  <span class="prop">tech</span>:    <span class="type">string[]</span>;
<span class="punc">}</span>

<span class="kw">const</span> <span class="prop">projects</span>: <span class="type">Project[]</span> = <span class="punc">[</span>
  <span class="punc">{</span>
    <span class="prop">id</span>:     <span class="num">1</span>,
    <span class="prop">name</span>:   <span class="str">"Multi-Agent CrewAI Orchestration"</span>,
    <span class="prop">desc</span>:   <span class="str">"Hierarchical multi-agent system with manager "</span>
          + <span class="str">"delegating to specialists via MCP tools"</span>,
    <span class="prop">impact</span>: <span class="str">"40% reliability boost in tool invocations"</span>,
    <span class="prop">tech</span>:   [<span class="str">"CrewAI"</span>, <span class="str">"MCP"</span>, <span class="str">"FastAPI"</span>, <span class="str">"SSE"</span>],
  <span class="punc">}</span>,
  <span class="punc">{</span>
    <span class="prop">id</span>:     <span class="num">2</span>,
    <span class="prop">name</span>:   <span class="str">"LangGraph Agent Framework"</span>,
    <span class="prop">desc</span>:   <span class="str">"Stateful execution graphs with add_nodes/"</span>
          + <span class="str">"add_edges for supervisor-specialist patterns"</span>,
    <span class="prop">impact</span>: <span class="str">"End-to-end automated workflows"</span>,
    <span class="prop">tech</span>:   [<span class="str">"LangGraph"</span>, <span class="str">"Python"</span>, <span class="str">"LLM"</span>],
  <span class="punc">}</span>,
  <span class="punc">{</span>
    <span class="prop">id</span>:     <span class="num">3</span>,
    <span class="prop">name</span>:   <span class="str">"MCP Tool Ecosystem (15+ Tools)"</span>,
    <span class="prop">desc</span>:   <span class="str">"FastAPI MCP tools with JSON Schema &amp; protocol "</span>
          + <span class="str">"annotations for zero-hallucination LLM calls"</span>,
    <span class="prop">impact</span>: <span class="str">"Zero-hallucination tool invocations"</span>,
    <span class="prop">tech</span>:   [<span class="str">"FastAPI"</span>, <span class="str">"JSON Schema"</span>, <span class="str">"MCP"</span>],
  <span class="punc">}</span>,
  <span class="punc">{</span>
    <span class="prop">id</span>:     <span class="num">4</span>,
    <span class="prop">name</span>:   <span class="str">"Whisper Audio Transcription API"</span>,
    <span class="prop">desc</span>:   <span class="str">"OpenAI Whisper via Flask for real-time "</span>
          + <span class="str">"audio transcription in production"</span>,
    <span class="prop">impact</span>: <span class="str">"Optimized inference latency"</span>,
    <span class="prop">tech</span>:   [<span class="str">"Whisper"</span>, <span class="str">"Flask"</span>, <span class="str">"Python"</span>],
  <span class="punc">}</span>,
  <span class="punc">{</span>
    <span class="prop">id</span>:     <span class="num">5</span>,
    <span class="prop">name</span>:   <span class="str">"AI Article Aggregation Pipeline"</span>,
    <span class="prop">desc</span>:   <span class="str">"500K+ daily articles, multi-language, "</span>
          + <span class="str">"99.5% uptime via AWS Lambda + S3"</span>,
    <span class="prop">impact</span>: <span class="str">"99.5% uptime, 500K+ daily"</span>,
    <span class="prop">tech</span>:   [<span class="str">"AWS Lambda"</span>, <span class="str">"S3"</span>, <span class="str">"PySpark"</span>],
  <span class="punc">}</span>,
  <span class="punc">{</span>
    <span class="prop">id</span>:     <span class="num">6</span>,
    <span class="prop">name</span>:   <span class="str">"Vertex AI Data Generation API"</span>,
    <span class="prop">desc</span>:   <span class="str">"High-perf FastAPI + Google Vertex AI LLMs, "</span>
          + <span class="str">"PostgreSQL via SQLAlchemy + Alembic"</span>,
    <span class="prop">impact</span>: <span class="str">"Full persistence + migration lifecycle"</span>,
    <span class="prop">tech</span>:   [<span class="str">"FastAPI"</span>, <span class="str">"Vertex AI"</span>, <span class="str">"PostgreSQL"</span>],
  <span class="punc">}</span>,
<span class="punc">]</span>;

<span class="cmt">// Run: type "run projects.ts" in terminal to view</span>
<span class="kw">export default</span> <span class="prop">projects</span>;`
    },

    articles: {
        name: 'articles.md', lang: 'Markdown', dot: 'dot-md',
        content: `<span class="tag"># 📝 Articles & Writing</span>

<span class="tag2">## Published</span>

<span class="tag3">### 1. Building Hierarchical Multi-Agent Systems with CrewAI</span>
<span class="cmt">&gt; How to architect manager-specialist agent patterns</span>
<span class="cmt">&gt; for automated enterprise workflows using MCP tools.</span>
<span class="mdcode">Tags: CrewAI, AI Agents, MCP</span>

<span class="tag3">### 2. Stateful Agent Loops with LangGraph</span>
<span class="cmt">&gt; Deep dive into constructing explicit execution graphs</span>
<span class="cmt">&gt; with add_nodes and add_edges for reliable LLM agents.</span>
<span class="mdcode">Tags: LangGraph, Python, LLM</span>

<span class="tag3">### 3. Zero-Hallucination LLM Tool Calls via MCP</span>
<span class="cmt">&gt; Registering MCP tools with JSON Schema and protocol</span>
<span class="cmt">&gt; annotations to enforce reliable agent invocations.</span>
<span class="mdcode">Tags: MCP, JSON Schema, FastAPI</span>

<span class="mdhr">---</span>
<span class="cmt">Run "run articles.md" in terminal to view as cards.</span>
<span class="cmt">Visit github.com/Ramc26 for more.</span>`
    },

    contact: {
        name: 'contact.sh', lang: 'Shell', dot: 'dot-sh',
        content: `<span class="shbng">#!/bin/bash</span>
<span class="cmt"># contact.sh — Get in touch with Ram</span>
<span class="cmt"># Run: run contact.sh</span>

<span class="bkw">export</span> <span class="bvar">NAME</span>=<span class="str">"Ram Bikkina"</span>
<span class="bkw">export</span> <span class="bvar">EMAIL</span>=<span class="str">"itsrambikkina@gmail.com"</span>
<span class="bkw">export</span> <span class="bvar">GITHUB</span>=<span class="str">"https://github.com/Ramc26"</span>
<span class="bkw">export</span> <span class="bvar">PHONE</span>=<span class="str">"+91 70958 38715"</span>

<span class="bkw">echo</span> <span class="str">"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"</span>
<span class="bkw">echo</span> <span class="str">"  Contact: \$NAME"</span>
<span class="bkw">echo</span> <span class="str">"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"</span>
<span class="bkw">echo</span> <span class="str">"📧 Email  : \$EMAIL"</span>
<span class="bkw">echo</span> <span class="str">"🐙 GitHub : \$GITHUB"</span>
<span class="bkw">echo</span> <span class="str">"📞 Phone  : \$PHONE"</span>
<span class="bkw">echo</span> <span class="str">""</span>
<span class="bkw">echo</span> <span class="str">"Launching contact form..."</span>

<span class="cmt"># Open interactive form</span>
<span class="bkw">source</span> ./send_message.sh`
    }
};

// ===== STATE =====
let openTabs = ['readme'];
let activeFile = 'readme';
let cmdHistory = [];
let cmdIndex = -1;
let isTermCollapsed = false;

// ===== DOM REFS =====
const editorCode = document.getElementById('editorCode');
const editorGutter = document.getElementById('editorGutter');
const tabbar = document.getElementById('tabbar');
const bcFile = document.getElementById('bcFile');
const statusLang = document.getElementById('statusLang');
const statusCursor = document.getElementById('statusCursor');
const termOutput = document.getElementById('termOutput');
const termInput = document.getElementById('termInput');
const termPanel = document.getElementById('termPanel');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalTitle = document.getElementById('modalTitle');
const contactOverlay = document.getElementById('contactOverlay');
const contactScriptOutput = document.getElementById('contactScriptOutput');
const contactFormArea = document.getElementById('contactFormArea');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// ===== RECRUITER VIEW DOM REFS =====
const recruiterView = document.getElementById('recruiterView');
const recruiterAboutContent = document.getElementById('recruiterAboutContent');
const recruiterProjectsGrid = document.getElementById('recruiterProjectsGrid');
const recruiterExperienceTimeline = document.getElementById('recruiterExperienceTimeline');
const recruiterStackOutput = document.getElementById('recruiterStackOutput');
const recruiterArticlesList = document.getElementById('recruiterArticlesList');
const recruiterContactBtn = document.getElementById('recruiterContactBtn');
const recruiterSwitchTechBtn = document.getElementById('recruiterSwitchTechBtn');

// ===== VISITOR MODE GATE DOM REFS =====
const ideEl = document.getElementById('ide');
const visitorModeOverlay = document.getElementById('visitorModeOverlay');
const visitorRecruiterBtn = document.getElementById('visitorRecruiterBtn');
const visitorTechBtn = document.getElementById('visitorTechBtn');

// ===== MODE STATE =====
let techInitialized = false;
let recruiterInitialized = false;

const MODE_KEY = 'portfolio-visitor-mode';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    // Hide both views until a mode is chosen.
    if (ideEl) ideEl.style.display = 'none';
    if (recruiterView) recruiterView.style.display = 'none';

    // These are shared in both modes (modals + contact form wiring).
    setupModals();
    setupContact();

    initVisitorGate();
});

function getInitialMode() {
    const params = new URLSearchParams(window.location.search);
    const urlMode = (params.get('mode') || '').toLowerCase().trim();
    if (urlMode === 'tech' || urlMode === 'recruiter') return urlMode;

    const saved = (localStorage.getItem(MODE_KEY) || '').toLowerCase().trim();
    if (saved === 'tech' || saved === 'recruiter') return saved;

    return null;
}

function initVisitorGate() {
    if (!visitorModeOverlay || !visitorRecruiterBtn || !visitorTechBtn) {
        // Fallback: show Tech Mode to avoid blank page.
        activateMode('tech');
        return;
    }

    visitorRecruiterBtn.addEventListener('click', () => activateMode('recruiter'));
    visitorTechBtn.addEventListener('click', () => activateMode('tech'));

    const initial = getInitialMode();
    if (initial) {
        activateMode(initial);
    } else {
        // Keep overlay visible (default in HTML).
        visitorModeOverlay.classList.remove('hidden');
    }
}

function activateMode(mode) {
    const normalized = mode === 'recruiter' ? 'recruiter' : 'tech';
    localStorage.setItem(MODE_KEY, normalized);

    // Apply view visibility.
    if (normalized === 'recruiter') {
        document.body.classList.add('mode-recruiter');
        document.body.classList.remove('mode-tech');
        if (ideEl) ideEl.style.display = 'none';
        if (recruiterView) recruiterView.style.display = '';
    } else {
        document.body.classList.add('mode-tech');
        document.body.classList.remove('mode-recruiter');
        if (ideEl) ideEl.style.display = '';
        if (recruiterView) recruiterView.style.display = 'none';
    }

    if (visitorModeOverlay) visitorModeOverlay.classList.add('hidden');

    if (normalized === 'recruiter') {
        if (!recruiterInitialized) {
            initRecruiterMode();
        }
    } else {
        if (!techInitialized) {
            initTechMode();
        }
    }
}

async function initRecruiterMode() {
    recruiterInitialized = true;

    if (recruiterContactBtn) {
        recruiterContactBtn.addEventListener('click', () => runContactScript());
    }
    if (recruiterSwitchTechBtn) {
        recruiterSwitchTechBtn.addEventListener('click', () => activateMode('tech'));
    }

    // Render page sections.
    await renderRecruiterPage();
}

function initTechMode() {
    techInitialized = true;

    // Ensure onboarding hints start hidden; setupOnboarding will show if needed.
    const onboardingOverlay = document.getElementById('onboardingOverlay');
    if (onboardingOverlay) onboardingOverlay.classList.add('ob-hidden');

    renderFile('readme');
    renderTabs();
    setupFileTree();
    setupTerminal();
    setupResize();
    setupActivityBar();
    setupKeyboard();
    setupSearch();
    setupSettings();
    setupOnboarding();
    setupMobileIDE();
    setupZenShell();

    // Default landing surface: ZenShell (persisted in localStorage).
    const savedShell = (localStorage.getItem(SHELL_MODE_KEY) || 'zen').toLowerCase();
    if (savedShell === 'ide') {
        showIdeShell({ initial: true });
    } else {
        showZenShell({ initial: true });
    }
}

// ========================================
// ZEN SHELL — single, centered CLI surface
// ========================================
const SHELL_MODE_KEY = 'tech-shell-mode';
let zenInitialized = false;
let ideWelcomePrinted = false;
let zenAutoTypeTimer = null;

function setupZenShell() {
    if (zenInitialized) return;
    zenInitialized = true;

    const zenShell = document.getElementById('zenShell');
    const palette = document.getElementById('zenPalette');
    const openIdeBtn = document.getElementById('zenOpenIdeBtn');
    const ideZenBtn = document.getElementById('ideZenBtn');
    const enterHint = document.getElementById('zenEnterHint');
    if (!zenShell) return;

    setupOwlEyes();

    // Palette → run the command in the existing terminal engine.
    if (palette) {
        palette.addEventListener('click', (e) => {
            const chip = e.target.closest('.zen-cmd-chip');
            if (!chip) return;
            const cmd = (chip.dataset.cmd || '').trim();
            if (!cmd) return;
            hideEnterHint();
            cancelZenAutoType();
            runCommandFromUI(cmd);
        });
    }

    if (openIdeBtn) openIdeBtn.addEventListener('click', () => showIdeShell());
    if (ideZenBtn) ideZenBtn.addEventListener('click', () => showZenShell());

    // Hide the "press Enter" hint as soon as the user touches the input.
    if (termInput) {
        const onUserTouch = () => hideEnterHint();
        termInput.addEventListener('input', onUserTouch);
        termInput.addEventListener('keydown', (e) => {
            // Ignore modifier-only keys
            if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) return;
            onUserTouch();
            // Cancel auto-typing whoami if the user starts interacting.
            if (e.key !== 'Enter') cancelZenAutoType();
        });
    }

    // Click anywhere inside the zen console focuses the input.
    const zenConsole = document.getElementById('zenConsole');
    if (zenConsole) zenConsole.addEventListener('click', () => termInput && termInput.focus());

    function hideEnterHint() {
        if (enterHint) enterHint.classList.remove('zen-enter-hint-visible');
    }
}

function showEnterHint() {
    const enterHint = document.getElementById('zenEnterHint');
    if (enterHint) enterHint.classList.add('zen-enter-hint-visible');
}

function hideEnterHint() {
    const enterHint = document.getElementById('zenEnterHint');
    if (enterHint) enterHint.classList.remove('zen-enter-hint-visible');
}

function runCommandFromUI(cmd) {
    if (!termInput) return;
    termInput.value = '';
    cmdHistory.push(cmd);
    cmdIndex = cmdHistory.length;
    printPrompt(cmd);
    processCommand(cmd);
    scrollTerm();
    setTimeout(() => termInput.focus(), 0);
}

function reparentTerminalTo(host) {
    const termOut = document.getElementById('termOutput');
    const termInLine = document.getElementById('termInputLine');
    if (!host || !termOut || !termInLine) return;
    host.appendChild(termOut);   // reuse same node — preserves listeners + state
}

function reparentInputTo(host) {
    const termInLine = document.getElementById('termInputLine');
    if (!host || !termInLine) return;
    host.appendChild(termInLine);
}

function moveTerminalToZen() {
    const out = document.getElementById('zenTermHost');
    const inp = document.getElementById('zenInputHost');
    reparentTerminalTo(out);
    reparentInputTo(inp);
}

function moveTerminalToIde() {
    const ideTermPanel = document.getElementById('termPanel');
    const ideTermHeader = ideTermPanel && ideTermPanel.querySelector('.terminal-panel-header');
    const termOut = document.getElementById('termOutput');
    const termInLine = document.getElementById('termInputLine');
    if (!ideTermPanel || !ideTermHeader || !termOut || !termInLine) return;
    // Insert in correct order: header → output → inputline
    ideTermHeader.after(termOut);
    termOut.after(termInLine);
}

function showZenShell({ initial = false } = {}) {
    document.body.classList.add('tech-shell-zen');
    document.body.classList.remove('tech-shell-ide');
    localStorage.setItem(SHELL_MODE_KEY, 'zen');

    moveTerminalToZen();

    // First-time landing: auto-type whoami and surface the Enter hint.
    if (initial) {
        // Clear the term output for a clean zen first impression.
        const termOut = document.getElementById('termOutput');
        if (termOut) termOut.innerHTML = '';
        zenAutoTypeWhoami();
    }

    setTimeout(() => termInput && termInput.focus(), 220);
}

function showIdeShell({ initial = false } = {}) {
    document.body.classList.add('tech-shell-ide');
    document.body.classList.remove('tech-shell-zen');
    localStorage.setItem(SHELL_MODE_KEY, 'ide');

    moveTerminalToIde();

    // Hide enter hint (zen-only affordance).
    hideEnterHint();
    cancelZenAutoType();

    // Print the IDE welcome banner once if the terminal output is empty.
    const termOut = document.getElementById('termOutput');
    if (!ideWelcomePrinted && termOut && !termOut.querySelector('.t-line')) {
        printWelcome();
        ideWelcomePrinted = true;
    }

    // Show onboarding hints only the first time the IDE shell is opened
    // (this is when the hints actually point to real, visible UI).
    maybeShowOnboarding();

    setTimeout(() => termInput && termInput.focus(), 280);
}

function zenAutoTypeWhoami() {
    if (!termInput) return;
    cancelZenAutoType();
    termInput.value = '';
    const text = 'whoami';
    let i = 0;
    const tick = () => {
        if (i < text.length) {
            // Use direct value mutation so our own keypress doesn't fire input listeners.
            termInput.value = text.slice(0, ++i);
            zenAutoTypeTimer = setTimeout(tick, 95);
        } else {
            zenAutoTypeTimer = null;
            showEnterHint();
        }
    };
    zenAutoTypeTimer = setTimeout(tick, 550);
}

function cancelZenAutoType() {
    if (zenAutoTypeTimer) {
        clearTimeout(zenAutoTypeTimer);
        zenAutoTypeTimer = null;
    }
}

// ========================================
// OWL MASCOT + CUSTOM CURSOR
// (single rAF loop driving cursor + pupil tracking)
// ========================================
let _owlInited = false;
function setupOwlEyes() {
    if (_owlInited) return;
    _owlInited = true;

    const svg = document.querySelector('#zenOwl .zen-owl-svg');
    const eyes = svg ? [
        {
            socket: svg.querySelector('.owl-eye-left'),
            pupil:  svg.querySelector('.owl-pupil-left'),
            glint:  svg.querySelector('.owl-glint-left'),
        },
        {
            socket: svg.querySelector('.owl-eye-right'),
            pupil:  svg.querySelector('.owl-pupil-right'),
            glint:  svg.querySelector('.owl-glint-right'),
        }
    ] : [];
    const hasOwl = eyes.length === 2 && eyes[0].socket && eyes[0].pupil;

    const cursor = document.getElementById('zenCursor');

    // Detect coarse pointer (touch); skip the custom cursor entirely.
    const fineMQ = window.matchMedia ? window.matchMedia('(hover: hover) and (pointer: fine)') : { matches: true };
    const FINE_POINTER = fineMQ.matches;
    if (!FINE_POINTER && cursor) cursor.style.display = 'none';

    // Tunables — bigger travel makes the eye tracking more obvious.
    const PUPIL_TRAVEL = 0.78; // pupil moves up to 78% of socket radius
    const GLINT_TRAVEL = 0.92; // glint travels slightly more (sells the gaze)

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let ticking = false;

    const update = () => {
        ticking = false;

        // Custom cursor follows mouse always (in tech mode).
        if (cursor && FINE_POINTER) {
            cursor.style.transform = `translate3d(${lastX}px, ${lastY}px, 0)`;
        }

        // Owl pupil + glint tracking — only when ZenShell is visible.
        const zenActive = document.body.classList.contains('tech-shell-zen');
        if (!hasOwl || !zenActive) return;

        const svgRect = svg.getBoundingClientRect();
        if (svgRect.width === 0) return;
        const pxToSvg = 56 / svgRect.width; // viewBox width / rendered width

        eyes.forEach(({ socket, pupil, glint }) => {
            const r = socket.getBoundingClientRect();
            const eyeCx = r.left + r.width / 2;
            const eyeCy = r.top + r.height / 2;
            const dxPx = lastX - eyeCx;
            const dyPx = lastY - eyeCy;
            const distPx = Math.hypot(dxPx, dyPx) || 1;
            const radiusPx = r.width / 2;

            const pupilMax = radiusPx * PUPIL_TRAVEL;
            const pupilRatio = Math.min(1, pupilMax / distPx);
            const ptx = dxPx * pupilRatio * pxToSvg;
            const pty = dyPx * pupilRatio * pxToSvg;
            pupil.style.transform = `translate(${ptx}px, ${pty}px)`;

            // Glint tracks slightly farther for a livelier "looking-at-you" feel.
            if (glint) {
                const glintMax = radiusPx * GLINT_TRAVEL;
                const glintRatio = Math.min(1, glintMax / distPx);
                const gtx = dxPx * glintRatio * pxToSvg;
                const gty = dyPx * glintRatio * pxToSvg;
                glint.style.transform = `translate(${gtx}px, ${gty}px)`;
            }
        });
    };

    const onMove = (x, y) => {
        lastX = x; lastY = y;
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    };

    document.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY), { passive: true });
    document.addEventListener('touchmove', (e) => {
        if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    // Hover state on interactive elements → cursor scales / shifts color
    if (cursor && FINE_POINTER) {
        const interactiveSel = 'a, button, input, textarea, select, summary, [role="button"], [role="listitem"], .zen-cmd-chip, .tree-file, .ide-tab, .panel-action-btn, .activity-btn';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest && e.target.closest(interactiveSel)) {
                cursor.classList.add('zen-cursor-hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest(interactiveSel)) {
                cursor.classList.remove('zen-cursor-hover');
            }
        });
        document.addEventListener('mousedown', () => cursor.classList.add('zen-cursor-down'));
        document.addEventListener('mouseup',   () => cursor.classList.remove('zen-cursor-down'));
        document.addEventListener('mouseleave', () => cursor.classList.add('zen-cursor-out'));
        document.addEventListener('mouseenter', () => cursor.classList.remove('zen-cursor-out'));
    }

    // Periodic blink for personality (CSS-driven via class toggle).
    setInterval(() => {
        const owl = document.getElementById('zenOwl');
        if (!owl || !document.body.classList.contains('tech-shell-zen')) return;
        owl.classList.add('owl-blink');
        setTimeout(() => owl.classList.remove('owl-blink'), 180);
    }, 5200);
}

function getAboutExpYearsLabel() {
    // Calculate full-time experience only (exclude intern).
    const now = new Date();
    const roles = [
        { start: new Date('2024-06-01'), end: now, type: 'fulltime' },         // Jukshio current
        { start: new Date('2020-07-01'), end: new Date('2021-08-31'), type: 'fulltime' }, // Jukshio first stint
        { start: new Date('2023-02-01'), end: new Date('2023-08-31'), type: 'intern' },   // Rubistone intern
    ];

    const includeIntern = false;
    const expMonths = roles
        .filter(r => includeIntern || r.type === 'fulltime')
        .reduce((total, r) => {
            const months = (r.end.getFullYear() - r.start.getFullYear()) * 12 + (r.end.getMonth() - r.start.getMonth());
            return total + months;
        }, 0);

    const expYears = Math.floor(expMonths / 12);
    const expRemain = expMonths % 12;
    return expRemain > 0 ? `${expYears}y ${expRemain}m` : `${expYears}y`;
}

async function fetchGitHubCommitCount() {
    let commitCount = '—';
    try {
        const ghRes = await fetch('https://api.github.com/search/commits?q=author:Ramc26+committer-date:>2024-01-01', {
            headers: { 'Accept': 'application/vnd.github.cloak-preview+json' }
        });
        if (ghRes.ok) {
            const data = await ghRes.json();
            commitCount = data.total_count || 0;
        }
    } catch {
        commitCount = '—';
    }
    return commitCount;
}

async function renderRecruiterPage() {
    if (!recruiterAboutContent || !recruiterProjectsGrid || !recruiterExperienceTimeline || !recruiterStackOutput || !recruiterArticlesList) return;

    recruiterAboutContent.innerHTML = '<div class="rec-loading">Loading portfolio...</div>';
    recruiterProjectsGrid.innerHTML = '<div class="rec-loading">Loading projects...</div>';
    recruiterExperienceTimeline.innerHTML = '<div class="rec-loading">Loading experience...</div>';
    recruiterStackOutput.innerHTML = '<div class="rec-loading">Loading stack...</div>';
    recruiterArticlesList.innerHTML = '<div class="rec-loading">Loading articles...</div>';

    const [projects, articles] = await Promise.all([loadProjectsData(), loadArticlesData()]);
    const expLabel = getAboutExpYearsLabel();

    // About (clean portfolio hero)
    recruiterAboutContent.innerHTML = `
        <div class="rec-hero">
            <div class="rec-hero-card">
                <div class="rec-avatar-wrap">
                    <img class="rec-avatar" src="./elements/pdp.jpg" alt="Ram Bikkina">
                </div>
                <div class="rec-hero-meta">
                    <div class="rec-kicker">R&D Engineer I</div>
                    <h2 class="rec-name">Ram Bikkina</h2>
                    <p class="rec-subtitle">AI systems, multi-agent orchestration, and production-grade APIs.</p>

                    <div class="rec-chip-row">
                        <span class="rec-chip">Multi-agent systems</span>
                        <span class="rec-chip">MCP tooling</span>
                        <span class="rec-chip">FastAPI services</span>
                        <span class="rec-chip">Cloud deployments</span>
                    </div>
                </div>
            </div>

            <div class="rec-stats-grid">
                <div class="rec-stat-card">
                    <div class="rec-stat-num">${expLabel}</div>
                    <div class="rec-stat-label">Experience</div>
                </div>
                <div class="rec-stat-card">
                    <div class="rec-stat-num">${projects.length}</div>
                    <div class="rec-stat-label">Projects</div>
                </div>
                <div class="rec-stat-card">
                    <div class="rec-stat-num">${articles.length}</div>
                    <div class="rec-stat-label">Articles</div>
                </div>
                <div class="rec-stat-card">
                    <div class="rec-stat-num" id="recruiterCommitCountNum">…</div>
                    <div class="rec-stat-label">GitHub commits (2024+)</div>
                </div>
            </div>

            <div class="rec-summary-card">
                <div class="rec-summary-title">What you’ll notice</div>
                <ul class="rec-summary-list">
                    <li>Reliable AI tool invocation design</li>
                    <li>Stateful workflows using execution graphs</li>
                    <li>Production delivery with testing + deployment</li>
                </ul>
            </div>
        </div>
    `;

    fetchGitHubCommitCount().then((c) => {
        const el = document.getElementById('recruiterCommitCountNum');
        if (el) el.textContent = String(c);
    }).catch(() => { /* keep placeholder */ });

    // Projects (redesigned)
    const featuredProjects = projects.slice(0, 4);
    const extraProjects = projects.slice(4);

    const projectCard = (p, idx, opts = {}) => {
        const num = String(idx + 1).padStart(2, '0');
        const tags = (p.tech || []).slice(0, 5)
            .map(t => `<span class="proj2-chip">${t}</span>`).join('');
        const more = (p.tech || []).length > 5
            ? `<span class="proj2-chip proj2-chip-more">+${p.tech.length - 5}</span>` : '';
        const flag = opts.featured
            ? `<span class="proj2-flag"><i class="fa-solid fa-star"></i> Featured</span>` : '';
        return `
            <article class="proj2-card${opts.featured ? ' proj2-card-featured' : ''}">
                <span class="proj2-rail" aria-hidden="true"></span>
                <div class="proj2-body">
                    <div class="proj2-meta">
                        <span class="proj2-num">${num}</span>
                        ${flag}
                    </div>
                    <h3 class="proj2-title">${p.name}</h3>
                    <p class="proj2-desc">${p.desc}</p>
                    <div class="proj2-impact">
                        <i class="fa-solid fa-bolt"></i>
                        <span>${p.impact}</span>
                    </div>
                    <div class="proj2-foot">
                        <div class="proj2-chips">${tags}${more}</div>
                        <a class="proj2-link" href="${p.github || 'https://github.com/Ramc26'}" target="_blank" rel="noopener noreferrer" aria-label="${p.name} on GitHub">
                            <i class="bi bi-github"></i>
                            <span>View</span>
                            <i class="fa-solid fa-arrow-up-right-from-square proj2-link-ext"></i>
                        </a>
                    </div>
                </div>
            </article>
        `;
    };

    const featuredProjectsHtml = featuredProjects
        .map((p, i) => projectCard(p, i, { featured: i === 0 })).join('');
    const extraProjectsHtml = extraProjects.length
        ? `
            <details class="rec-inline-details">
                <summary class="rec-inline-summary">
                    <span>More projects</span>
                    <span class="rec-inline-summary-hint">${extraProjects.length} more</span>
                </summary>
                <div class="rec-inline-details-inner">
                    <div class="proj2-grid">
                        ${extraProjects.map((p, i) => projectCard(p, i + featuredProjects.length)).join('')}
                    </div>
                </div>
            </details>
          `
        : '';

    recruiterProjectsGrid.innerHTML = `
        <div class="proj2-grid">
            ${featuredProjectsHtml}
        </div>
        ${extraProjectsHtml}
    `;

    // Experience
    const experiences = [
        {
            role: 'R&D Engineer I',
            company: 'Jukshio Technologies',
            location: 'Hyderabad, India',
            period: 'Jun 2024 — Present',
            highlights: [
                'Architected CrewAI-driven multi-agent orchestration layer',
                'Built 15+ FastAPI MCP tools with zero-hallucination calls',
                'Designed LangGraph stateful execution graphs',
                'Deployed containerized microservices via Docker & K8s',
                'Integrated OpenAI Whisper for real-time transcription',
            ]
        },
        {
            role: 'Python Developer (Intern)',
            company: 'Rubistone Technologies',
            location: 'Chicago, IL',
            period: 'Feb 2023 — Aug 2023',
            highlights: [
                'Processed 500K+ daily articles with multi-language support',
                'Built PySpark analytics pipeline on AWS Lambda + S3',
                'Developed LLM-based content automation system',
                'Maintained 99.5% uptime across production services',
            ]
        },
        {
            role: 'R&D Engineer I',
            company: 'Jukshio Technologies',
            location: 'Hyderabad, India',
            period: 'Jul 2020 — Aug 2021',
            highlights: [
                'Built Python automation & backend REST APIs',
                'Improved database performance by 40% via SQL optimization',
                'Developed internal tools reducing manual workflows',
            ]
        },
    ];

    const expItem = (exp, idx, total) => {
        const top = exp.highlights.slice(0, 3);
        const rest = exp.highlights.slice(3);
        const isLast = idx === total - 1;
        return `
            <li class="exp2-item${isLast ? ' exp2-item-last' : ''}">
                <div class="exp2-marker" aria-hidden="true">
                    <span class="exp2-dot"></span>
                    ${!isLast ? '<span class="exp2-line"></span>' : ''}
                </div>
                <div class="exp2-card">
                    <div class="exp2-period">
                        <i class="fa-regular fa-calendar"></i>
                        <span>${exp.period}</span>
                    </div>
                    <h3 class="exp2-role">${exp.role}</h3>
                    <div class="exp2-meta">
                        <span class="exp2-meta-item"><i class="fa-solid fa-building"></i> ${exp.company}</span>
                        <span class="exp2-sep" aria-hidden="true">·</span>
                        <span class="exp2-meta-item"><i class="fa-solid fa-location-dot"></i> ${exp.location}</span>
                    </div>
                    <ul class="exp2-bullets">
                        ${top.map(h => `<li><i class="fa-solid fa-check"></i><span>${h}</span></li>`).join('')}
                    </ul>
                    ${rest.length ? `
                        <details class="rec-inline-details exp2-more">
                            <summary class="rec-inline-summary">
                                <span>More highlights</span>
                                <span class="rec-inline-summary-hint">${rest.length} more</span>
                            </summary>
                            <ul class="exp2-bullets exp2-bullets-rest">
                                ${rest.map(h => `<li><i class="fa-solid fa-check"></i><span>${h}</span></li>`).join('')}
                            </ul>
                        </details>
                    ` : ''}
                </div>
            </li>
        `;
    };

    recruiterExperienceTimeline.innerHTML = `
        <ol class="exp2-timeline">
            ${experiences.map((e, i) => expItem(e, i, experiences.length)).join('')}
        </ol>
    `;

    // Stack (redesigned: categorized cards)
    const stackData = [
        { category: 'AI / ML',         icon: 'fa-solid fa-microchip',     items: ['CrewAI', 'LangGraph', 'LangChain', 'MCP Tools', 'Whisper', 'OpenCV', 'Vertex AI'] },
        { category: 'Backend',         icon: 'fa-solid fa-server',        items: ['Python', 'FastAPI', 'Flask', 'Django', 'GoLang', 'REST APIs', 'SQLAlchemy'] },
        { category: 'Databases',       icon: 'fa-solid fa-database',      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Milvus'] },
        { category: 'Cloud & DevOps',  icon: 'fa-solid fa-cloud',         items: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'] },
        { category: 'Languages',       icon: 'fa-solid fa-code',          items: ['JavaScript', 'SQL', 'Bash'] },
        { category: 'Certifications',  icon: 'fa-solid fa-certificate',   items: ['AWS Dev Assoc', 'Microsoft (Python & JS)'] },
    ];

    const stackCard = (cat) => `
        <article class="stack2-card">
            <header class="stack2-head">
                <span class="stack2-icon"><i class="${cat.icon}"></i></span>
                <h4 class="stack2-cat">${cat.category}</h4>
                <span class="stack2-count">${cat.items.length}</span>
            </header>
            <div class="stack2-chips">
                ${cat.items.map(it => `<span class="stack2-chip">${it}</span>`).join('')}
            </div>
        </article>
    `;

    recruiterStackOutput.innerHTML = `
        <div class="stack2-grid">
            ${stackData.map(stackCard).join('')}
        </div>
    `;

    // Articles (redesigned: 2-col grid, cleaner hierarchy)
    const featuredArticles = articles.slice(0, 4);
    const extraArticles = articles.slice(4);

    const platformMeta = (platform) => {
        const p = (platform || '').toLowerCase().trim();
        if (p === 'medium')                  return { icon: 'fa-brands fa-medium',   label: 'Medium',   mod: 'art2-source-medium' };
        if (p === 'dev.to' || p === 'devto') return { icon: 'fa-brands fa-dev',      label: 'Dev.to',   mod: 'art2-source-devto' };
        if (p === 'substack')                return { icon: 'fa-solid fa-newspaper', label: 'Substack', mod: 'art2-source-substack' };
        if (p === 'linkedin')                return { icon: 'fa-brands fa-linkedin', label: 'LinkedIn', mod: 'art2-source-linkedin' };
        if (p === 'hashnode')                return { icon: 'fa-brands fa-hashnode', label: 'Hashnode', mod: 'art2-source-hashnode' };
        return { icon: 'fa-solid fa-newspaper', label: platform || 'Article', mod: '' };
    };

    const articleCard = (a) => {
        const meta = platformMeta(a.platform);
        return `
            <a class="art2-card" href="${a.url || 'https://github.com/Ramc26'}" target="_blank" rel="noopener noreferrer">
                <div class="art2-top">
                    <span class="art2-tag">${a.tag}</span>
                    <span class="art2-source ${meta.mod}"><i class="${meta.icon}"></i> ${meta.label}</span>
                </div>
                <h3 class="art2-title">${a.title}</h3>
                <p class="art2-desc">${a.desc}</p>
                <div class="art2-foot">
                    <span class="art2-read">Read on ${meta.label} <i class="fa-solid fa-arrow-right"></i></span>
                </div>
            </a>
        `;
    };

    const featuredHtml = featuredArticles.map(articleCard).join('');
    const extraHtml = extraArticles.length
        ? `
            <details class="rec-inline-details">
                <summary class="rec-inline-summary">
                    <span>More articles</span>
                    <span class="rec-inline-summary-hint">${extraArticles.length} more</span>
                </summary>
                <div class="rec-inline-details-inner">
                    <div class="art2-grid">
                        ${extraArticles.map(articleCard).join('')}
                    </div>
                </div>
            </details>
          `
        : '';

    recruiterArticlesList.innerHTML = `
        <div class="art2-grid">
            ${featuredHtml}
        </div>
        ${extraHtml}
    `;
}

// ========================================
// FILE RENDERING
// ========================================
function renderFile(key) {
    const file = FILES[key];
    if (!file) return;
    activeFile = key;

    // Editor content
    editorCode.innerHTML = file.content;

    // Gutter line numbers
    const lines = file.content.split('\n').length;
    let gutterHtml = '';
    for (let i = 1; i <= lines; i++) {
        gutterHtml += `<span class="gutter-line">${i}</span>\n`;
    }
    editorGutter.innerHTML = gutterHtml;

    // Breadcrumbs & status
    bcFile.textContent = file.name;
    statusLang.textContent = file.lang;
    statusCursor.textContent = `Ln 1, Col 1`;

    // File tree active
    document.querySelectorAll('.tree-file').forEach(el => {
        el.classList.toggle('active', el.dataset.file === key);
    });

    // Scroll editor to top
    editorCode.scrollTop = 0;
    editorGutter.scrollTop = 0;

    // Sync gutter scroll
    editorCode.onscroll = () => { editorGutter.scrollTop = editorCode.scrollTop; };

    // Open tab if not open
    if (!openTabs.includes(key)) openTabs.push(key);
    renderTabs();
}

// ========================================
// TAB MANAGEMENT
// ========================================
function renderTabs() {
    tabbar.innerHTML = '';
    openTabs.forEach(key => {
        const file = FILES[key];
        const tab = document.createElement('div');
        tab.className = `ide-tab${key === activeFile ? ' active' : ''}`;
        tab.innerHTML = `<span class="tab-dot ${file.dot}"></span><span>${file.name}</span><button class="tab-close" data-key="${key}">&times;</button>`;
        tab.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-close')) return;
            renderFile(key);
        });
        tabbar.appendChild(tab);
    });

    // Close buttons
    tabbar.querySelectorAll('.tab-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const k = btn.dataset.key;
            openTabs = openTabs.filter(t => t !== k);
            if (openTabs.length === 0) openTabs = ['readme'];
            if (activeFile === k) renderFile(openTabs[openTabs.length - 1]);
            renderTabs();
        });
    });
}

// ========================================
// FILE TREE (sidebar)
// ========================================
function setupFileTree() {
    document.querySelectorAll('.tree-file').forEach(el => {
        el.addEventListener('click', () => renderFile(el.dataset.file));
    });

    const folderToggle = document.getElementById('folderToggle');
    const folderBody = document.getElementById('folderBody');
    folderToggle.addEventListener('click', () => {
        const ch = folderToggle.querySelector('.tree-chevron');
        const ic = folderToggle.querySelector('.tree-folder-icon');
        if (folderBody.style.display === 'none') {
            folderBody.style.display = '';
            ch.style.transform = '';
            ic.className = 'fa-solid fa-folder-open tree-folder-icon';
        } else {
            folderBody.style.display = 'none';
            ch.style.transform = 'rotate(-90deg)';
            ic.className = 'fa-solid fa-folder tree-folder-icon';
        }
    });
}

// ========================================
// ACTIVITY BAR
// ========================================
function setupActivityBar() {
    document.querySelectorAll('.activity-btn[data-panel]').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.dataset.panel;
            document.querySelectorAll('.activity-btn[data-panel]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.sidebar-panel').forEach(p => p.classList.remove('active'));
            const p = document.getElementById('panel-' + panel);
            if (p) p.classList.add('active');
        });
    });
}

// ========================================
// SIDEBAR TOGGLE (Ctrl+B)
// ========================================
function setupSidebar() {
    // Already handled via keyboard shortcuts
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+` — focus terminal
        if (e.ctrlKey && e.key === '`') {
            e.preventDefault();
            termInput.focus();
        }
        // Ctrl+B — toggle sidebar
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            document.getElementById('ide').classList.toggle('sidebar-hidden');
        }
    });
}

// ========================================
// SEARCH
// ========================================
function setupSearch() {
    searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase().trim();
        if (!q) { searchResults.innerHTML = '<p class="search-hint">Type to search across all files.</p>'; return; }
        let html = '';
        Object.entries(FILES).forEach(([key, file]) => {
            const plain = file.content.replace(/<[^>]+>/g, '');
            const lines = plain.split('\n');
            lines.forEach((line, i) => {
                if (line.toLowerCase().includes(q)) {
                    const highlighted = line.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>');
                    html += `<div class="search-result-item" data-file="${key}"><div class="sr-file">${file.name}:${i + 1}</div><div class="sr-match">${highlighted}</div></div>`;
                }
            });
        });
        searchResults.innerHTML = html || '<p class="search-hint">No results found.</p>';
        searchResults.querySelectorAll('.search-result-item').forEach(el => {
            el.addEventListener('click', () => renderFile(el.dataset.file));
        });
    });
}

// ========================================
// TERMINAL ENGINE
// ========================================
function setupTerminal() {
    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = termInput.value.trim();
            termInput.value = '';
            if (cmd) { cmdHistory.push(cmd); cmdIndex = cmdHistory.length; }
            // Zen-only affordance — always hide on submit.
            const enterHint = document.getElementById('zenEnterHint');
            if (enterHint) enterHint.classList.remove('zen-enter-hint-visible');
            printPrompt(cmd);
            processCommand(cmd);
            scrollTerm();
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdIndex > 0) { cmdIndex--; termInput.value = cmdHistory[cmdIndex]; }
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (cmdIndex < cmdHistory.length - 1) { cmdIndex++; termInput.value = cmdHistory[cmdIndex]; }
            else { cmdIndex = cmdHistory.length; termInput.value = ''; }
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            const partial = termInput.value.split(' ').pop().toLowerCase();
            const fnames = Object.values(FILES).map(f => f.name.toLowerCase());
            const match = fnames.find(n => n.startsWith(partial));
            if (match) {
                const parts = termInput.value.split(' ');
                parts[parts.length - 1] = Object.values(FILES).find(f => f.name.toLowerCase() === match).name;
                termInput.value = parts.join(' ');
            }
        }
    });

    // Terminal panel buttons
    const toggleTermIcon = document.getElementById('toggleTermIcon');

    function collapseTerminal() {
        termPanel.classList.add('collapsed');
        isTermCollapsed = true;
        if (toggleTermIcon) toggleTermIcon.className = 'fa-solid fa-chevron-up';
    }
    function expandTerminal() {
        termPanel.classList.remove('collapsed');
        termPanel.classList.remove('mobile-expanded');
        isTermCollapsed = false;
        if (toggleTermIcon) toggleTermIcon.className = 'fa-solid fa-chevron-down';
    }

    document.getElementById('clearTermBtn').addEventListener('click', () => { termOutput.innerHTML = ''; });
    document.getElementById('closeTermBtn').addEventListener('click', collapseTerminal);
    document.getElementById('toggleTermBtn').addEventListener('click', () => {
        if (isTermCollapsed) expandTerminal();
        else collapseTerminal();
    });
    document.getElementById('newTermBtn').addEventListener('click', () => {
        expandTerminal();
        termOutput.innerHTML = '';
        printWelcome();
        termInput.focus();
    });

    // Focus terminal on click
    termOutput.addEventListener('click', () => termInput.focus());
}

function printWelcome() {
    printLine('t-ascii-line', '┌───────────────────────────────────────────┐');
    printLine('t-ascii-line', '│        ram.dev — Portfolio IDE v2.0       │');
    printLine('t-ascii-line', '│        Type "help" to get started         │');
    printLine('t-ascii-line', '└───────────────────────────────────────────┘');
    printLine('t-muted-line', '');
}

function printPrompt(cmd) {
    const div = document.createElement('div');
    div.className = 't-line t-cmd-line';
    div.innerHTML = `<span class="tp-user">ram</span><span class="tp-at">@</span><span class="tp-host">portfolio</span><span class="tp-colon">:</span><span class="tp-path">~/Portfolio</span><span class="tp-dollar"> $</span> ${escapeHtml(cmd)}`;
    termOutput.appendChild(div);
}

function printLine(cls, text) {
    const div = document.createElement('div');
    div.className = `t-line ${cls}`;
    div.innerHTML = text;
    termOutput.appendChild(div);
}

function scrollTerm() { termOutput.scrollTop = termOutput.scrollHeight; }
function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function findFileKey(name) {
    const lower = name.toLowerCase();
    return Object.keys(FILES).find(k => FILES[k].name.toLowerCase() === lower);
}

function processCommand(cmd) {
    const parts = cmd.split(/\s+/);
    const base = parts[0] ? parts[0].toLowerCase() : '';
    const arg = parts.slice(1).join(' ');

    switch (base) {
        case '': break;

        case 'help':
            printLine('t-info-line', '\n  <strong>Available Commands:</strong>\n');
            const cmds = [
                ['help', 'Show this help message'],
                ['ls / ls -la', 'List portfolio files'],
                ['open <file>', 'Open file in editor'],
                ['cat <file>', 'Print file to terminal'],
                ['run projects.ts', 'View projects (modal)'],
                ['run articles.md', 'View articles (modal)'],
                ['run stack.yaml', 'View tech stack'],
                ['run experience.json', 'View career timeline'],
                ['run contact.sh', 'Contact form'],
                ['whoami / python about.py', 'About me (modal)'],
                ['git log --oneline', 'Commit history'],
                ['pwd', 'Print working directory'],
                ['date', 'Current date/time'],
                ['clear', 'Clear terminal'],
            ];
            cmds.forEach(([c, d]) => {
                printLine('t-out-line', `  <span class="tp-path">${c.padEnd(22)}</span>${d}`);
            });
            printLine('t-muted-line', '\n  <em>Tab to autocomplete filenames. ↑↓ for history.</em>\n');
            break;

        case 'ls':
            if (arg === '-la' || arg === '-l' || arg === '-al') {
                printLine('t-out-line', 'total 7');
                Object.values(FILES).forEach(f => {
                    const size = f.content.replace(/<[^>]+>/g, '').length;
                    printLine('t-out-line', `-rw-r--r--  1 ram staff  ${String(size).padStart(5)}  Mar 03 16:00  ${f.name}`);
                });
            } else {
                printLine('t-ok-line', Object.values(FILES).map(f => f.name).join('  '));
            }
            break;

        case 'open':
            const openKey = findFileKey(arg);
            if (openKey) { renderFile(openKey); printLine('t-ok-line', `✓ Opened ${FILES[openKey].name}`); }
            else printLine('t-err-line', `error: file not found — "${arg}". Try: ls`);
            break;

        case 'cat':
            const catKey = findFileKey(arg);
            if (catKey) {
                const plain = FILES[catKey].content.replace(/<[^>]+>/g, '');
                plain.split('\n').forEach(l => printLine('t-out-line', escapeHtml(l)));
            } else printLine('t-err-line', `error: "${arg}" — No such file. Try: ls`);
            break;

        case 'run':
            if (arg.toLowerCase() === 'projects.ts') { openProjectsModal(); }
            else if (arg.toLowerCase() === 'articles.md') { openArticlesModal(); }
            else if (arg.toLowerCase() === 'contact.sh') { runContactScript(); }
            else if (arg.toLowerCase() === 'stack.yaml') { openStackModal(); }
            else if (arg.toLowerCase() === 'experience.json') { openExperienceModal(); }
            else if (arg.toLowerCase() === 'about.py') { openAboutModal(); }
            else printLine('t-err-line', `error: cannot run "${arg}". Try: run projects.ts | articles.md | stack.yaml | experience.json | about.py | contact.sh`);
            break;

        case 'python':
            if (arg.toLowerCase() === 'about.py') {
                openAboutModal();
            } else printLine('t-err-line', `python: can't open file '${arg}'`);
            break;

        case 'whoami':
            openAboutModal();
            break;

        case 'pwd':
            printLine('t-out-line', '/home/ram/Portfolio');
            break;

        case 'date':
            printLine('t-out-line', new Date().toString());
            break;

        case 'git':
            if (arg.startsWith('log')) {
                const commits = [
                    'a3f9c1e feat: add MCP tool ecosystem with JSON Schema',
                    'b2d8e4a feat: implement CrewAI multi-agent orchestration',
                    'c1e7f3b feat: build LangGraph stateful framework',
                    'e4f2a8c feat: integrate Whisper transcription API',
                    'd5a3b9d feat: Vertex AI data generation pipeline',
                    'f6e4c2a feat: deploy microservices with Docker & K8s',
                    '194b7d3 chore: initial portfolio commit',
                ];
                commits.forEach(c => {
                    const [hash, ...msg] = c.split(' ');
                    printLine('t-out-line', `<span style="color:#E8B04B">${hash}</span> ${msg.join(' ')}`);
                });
            } else printLine('t-err-line', `git: '${arg.split(' ')[0]}' is not a git command`);
            break;

        case 'clear':
            termOutput.innerHTML = '';
            break;

        case 'sudo':
            printLine('t-err-line', "Nice try 😏 — but you don't have root access here.");
            break;

        case 'exit':
            printLine('t-muted-line', 'You can never leave... 👻');
            break;

        case 'neofetch':
            printLine('t-ascii-line', '        ⬡⬡⬡        <span class="tp-user">ram</span>@<span class="tp-host">portfolio</span>');
            printLine('t-ascii-line', '      ⬡⬡⬡⬡⬡      ─────────────────');
            printLine('t-out-line', '     ⬡⬡⬡⬡⬡⬡⬡     <span class="tp-path">OS:</span> PortfolioOS v2.0');
            printLine('t-out-line', '    ⬡⬡⬡⬡⬡⬡⬡⬡⬡    <span class="tp-path">Host:</span> Ram Bikkina');
            printLine('t-out-line', '   ⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡⬡   <span class="tp-path">Kernel:</span> R&D Engineer I');
            printLine('t-out-line', '    ⬡⬡⬡⬡⬡⬡⬡⬡⬡    <span class="tp-path">Shell:</span> portfolio-bash 5.1');
            printLine('t-out-line', '     ⬡⬡⬡⬡⬡⬡⬡     <span class="tp-path">Theme:</span> Shadow Glow');
            printLine('t-out-line', '      ⬡⬡⬡⬡⬡      <span class="tp-path">Terminal:</span> IDE Terminal');
            printLine('t-ascii-line', '        ⬡⬡⬡        <span class="tp-path">CPU:</span> Caffeine @ ∞ GHz');
            break;

        default:
            printLine('t-err-line', `bash: ${base}: command not found. Type "help" for commands.`);
    }
    scrollTerm();
}

// ========================================
// RESIZE HANDLE
// ========================================
function setupResize() {
    const handle = document.getElementById('resizeHandle');
    const main = document.getElementById('ideMain');
    let startY, startH;

    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startY = e.clientY;
        startH = termPanel.offsetHeight;
        handle.classList.add('dragging');
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', onRelease);
    });

    function onDrag(e) {
        const dy = startY - e.clientY;
        const nh = Math.min(Math.max(startH + dy, 60), main.offsetHeight * 0.7);
        termPanel.style.height = nh + 'px';
    }
    function onRelease() {
        handle.classList.remove('dragging');
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', onRelease);
    }
}

// ========================================
// MODALS
// ========================================
function setupModals() {
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

    document.getElementById('contactClose').addEventListener('click', closeContactModal);
    document.getElementById('contactCloseBtn').addEventListener('click', closeContactModal);
    contactOverlay.addEventListener('click', (e) => { if (e.target === contactOverlay) closeContactModal(); });
}

function closeModal() { modalOverlay.classList.remove('open'); }
function closeContactModal() { contactOverlay.classList.remove('open'); }

async function openProjectsModal() {
    printLine('t-ok-line', '✓ Executing projects.ts ...');
    printLine('t-info-line', '  Compiling TypeScript → Opening output ...\n');

    const projects = await loadProjectsData();

    modalTitle.textContent = 'Output — projects.ts';
    modalBody.innerHTML = `<div class="modal-output-header"><span>$</span> ts-node projects.ts → <strong>${projects.length} projects</strong> loaded</div><div class="projects-output-grid">${projects.map((p, i) => `<div class="proj-output-card"><div class="poc-id"># ${i + 1}</div><div class="poc-name">${p.name}</div><div class="poc-desc">${p.desc}</div><div class="poc-impact">↗ ${p.impact}</div><div class="poc-tech">${p.tech.map(t => `<span class="poc-tag">${t}</span>`).join('')}</div><a href="${p.github || 'https://github.com/Ramc26'}" target="_blank" class="poc-link"><i class="bi bi-github"></i> View on GitHub</a></div>`).join('')}</div>`;
    modalOverlay.classList.add('open');
}

async function openArticlesModal() {
    printLine('t-ok-line', '✓ Rendering articles.md ...\n');

    const articles = await loadArticlesData();

    modalTitle.textContent = 'Output — articles.md';
    modalBody.innerHTML = `<div class="modal-output-header"><span>$</span> marked articles.md → <strong>${articles.length} articles</strong></div><div class="articles-output-list">${articles.map(a => `<a href="${a.url || 'https://github.com/Ramc26'}" target="_blank" class="art-output-card"><span class="art-tag">${a.tag}</span><div class="art-title">${a.title}</div><div class="art-desc">${a.desc}</div><span class="art-read">Read more →</span></a>`).join('')}</div>`;
    modalOverlay.classList.add('open');
}

function openStackModal() {
    printLine('t-ok-line', '✓ Parsing stack.yaml ...');
    printLine('t-info-line', '  Loading tech stack → Opening output ...\n');
    renderFile('stack');

    const stackData = [
        {
            category: 'AI / ML', color: '#39FF14', items: [
                { name: 'CrewAI', icon: 'devicon-python-plain' },
                { name: 'LangGraph', icon: 'devicon-python-plain' },
                { name: 'LangChain', icon: 'devicon-python-plain' },
                { name: 'MCP Tools', icon: 'fa-solid fa-wrench' },
                { name: 'Whisper', icon: 'fa-solid fa-microphone' },
                { name: 'Ollama', icon: 'fa-solid fa-robot' },
                { name: 'HuggingFace', icon: 'fa-solid fa-face-smile' },
                { name: 'OpenCV', icon: 'devicon-opencv-plain' },
                { name: 'Vertex AI', icon: 'devicon-googlecloud-plain' },
            ]
        },
        {
            category: 'Backend', color: '#1F51FF', items: [
                { name: 'Python', icon: 'devicon-python-plain' },
                { name: 'FastAPI', icon: 'devicon-fastapi-plain' },
                { name: 'Flask', icon: 'devicon-flask-original' },
                { name: 'Django', icon: 'devicon-django-plain' },
                { name: 'GoLang', icon: 'devicon-go-original-wordmark' },
                { name: 'REST APIs', icon: 'fa-solid fa-plug' },
                { name: 'SQLAlchemy', icon: 'devicon-sqlalchemy-plain' },
            ]
        },
        {
            category: 'Databases', color: '#FF6B35', items: [
                { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
                { name: 'MySQL', icon: 'devicon-mysql-plain' },
                { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
                { name: 'Milvus', icon: 'fa-solid fa-database' },
            ]
        },
        {
            category: 'Cloud & DevOps', color: '#FF2D55', items: [
                { name: 'AWS', icon: 'devicon-amazonwebservices-plain-wordmark' },
                { name: 'GCP', icon: 'devicon-googlecloud-plain' },
                { name: 'Azure', icon: 'devicon-azure-plain' },
                { name: 'Docker', icon: 'devicon-docker-plain' },
                { name: 'Kubernetes', icon: 'devicon-kubernetes-plain' },
                { name: 'Terraform', icon: 'devicon-terraform-plain' },
                { name: 'CI/CD', icon: 'fa-solid fa-rotate' },
            ]
        },
        {
            category: 'Languages', color: '#BF5AF2', items: [
                { name: 'Python', icon: 'devicon-python-plain' },
                { name: 'GoLang', icon: 'devicon-go-original-wordmark' },
                { name: 'SQL', icon: 'fa-solid fa-database' },
                { name: 'Bash', icon: 'devicon-bash-plain' },
                { name: 'JavaScript', icon: 'devicon-javascript-plain' },
            ]
        },
        {
            category: 'Certifications', color: '#FFD60A', items: [
                { name: 'AWS Dev Assoc', icon: 'devicon-amazonwebservices-plain-wordmark' },
                { name: 'MS Python', icon: 'fa-solid fa-certificate' },
                { name: 'VMware IT', icon: 'fa-solid fa-certificate' },
                { name: 'HackerRank SQL', icon: 'fa-solid fa-award' },
            ]
        },
    ];

    const total = stackData.reduce((s, c) => s + c.items.length, 0);
    modalTitle.textContent = 'Output — stack.yaml';
    modalBody.innerHTML = `
        <div class="modal-output-header"><span>$</span> yaml parse stack.yaml → <strong>${total} technologies</strong> across <strong>${stackData.length} categories</strong></div>
        <div class="stack-output">
            ${stackData.map(cat => `
                <div class="stack-category">
                    <h3 class="stack-cat-title" style="--cat-color: ${cat.color}">
                        <span class="stack-cat-dot" style="background: ${cat.color}"></span>
                        ${cat.category}
                        <span class="stack-cat-count">${cat.items.length}</span>
                    </h3>
                    <div class="stack-grid">
                        ${cat.items.map(item => `
                            <div class="stack-badge" style="--badge-color: ${cat.color}">
                                <i class="${item.icon} stack-badge-icon"></i>
                                <span class="stack-badge-name">${item.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>`;
    modalOverlay.classList.add('open');
}

async function openAboutModal() {
    printLine('t-ok-line', '✓ Executing about.py ...');
    printLine('t-info-line', '  Loading profile → Opening output ...\n');
    renderFile('about');

    // Fetch dynamic stats
    const projects = await loadProjectsData();
    const articles = await loadArticlesData();

    // Calculate experience — full-time roles
    const now = new Date();
    const roles = [
        { start: new Date('2024-06-01'), end: now, type: 'fulltime' },         // Jukshio current
        { start: new Date('2020-07-01'), end: new Date('2021-08-31'), type: 'fulltime' }, // Jukshio first stint
        { start: new Date('2023-02-01'), end: new Date('2023-08-31'), type: 'intern' },   // Rubistone intern
    ];
    function calcExpMonths(includeIntern) {
        return roles
            .filter(r => includeIntern || r.type === 'fulltime')
            .reduce((total, r) => {
                const months = (r.end.getFullYear() - r.start.getFullYear()) * 12 + (r.end.getMonth() - r.start.getMonth());
                return total + months;
            }, 0);
    }
    const expMonths = calcExpMonths(false);
    const expYears = Math.floor(expMonths / 12);
    const expRemain = expMonths % 12;
    const expLabel = expRemain > 0 ? `${expYears}y ${expRemain}m` : `${expYears}y`;

    // Fetch exact GitHub commit count since 2024
    let commitCount = '…';
    try {
        const ghRes = await fetch('https://api.github.com/search/commits?q=author:Ramc26+committer-date:>2024-01-01', {
            headers: { 'Accept': 'application/vnd.github.cloak-preview+json' }
        });
        if (ghRes.ok) {
            const data = await ghRes.json();
            commitCount = data.total_count || 0;
        } else { commitCount = '—'; }
    } catch { commitCount = '—'; }

    modalTitle.textContent = 'Output — about.py';
    modalBody.innerHTML = `
        <div class="modal-output-header"><span>$</span> python about.py → <strong>Profile loaded</strong></div>
        <div class="about-output">
            <div class="about-hero">
                <div class="about-avatar">
                    <span class="about-avatar-text"><img src="./elements/pdp.jpg" alt="Ram Bikkina" style="width: 100%; height: 100%; object-fit: cover;"></span>
                    <span class="about-avatar-ring"></span>
                </div>
                <div class="about-hero-info">
                    <h2 class="about-name">Ram Bikkina</h2>
                    <p class="about-role"><i class="fa-solid fa-briefcase"></i> R&D Engineer I @ Jukshio Technologies</p>
                    <p class="about-loc"><i class="fa-solid fa-location-dot"></i> Hyderabad, TG, India</p>
                </div>
            </div>

            <div class="about-stats">
                <div class="about-stat" id="aboutExpStat">
                    <span class="about-stat-num" id="aboutExpNum">${expLabel}</span>
                    <span class="about-stat-label">Experience</span>
                    <button class="about-exp-toggle" id="aboutExpToggle" title="Toggle intern experience">
                        <i class="fa-solid fa-briefcase"></i> <span id="aboutExpToggleText">+ Intern</span>
                    </button>
                </div>
                <div class="about-stat"><span class="about-stat-num">${articles.length}</span><span class="about-stat-label">Articles</span></div>
                <div class="about-stat"><span class="about-stat-num">${projects.length}</span><span class="about-stat-label">Projects</span></div>
                <div class="about-stat"><span class="about-stat-num">${commitCount}</span><span class="about-stat-label">Commits (2024+)</span></div>
            </div>

            <div class="about-section">
                <h3 class="about-section-title"><i class="fa-solid fa-crosshairs"></i> Focus Areas</h3>
                <div class="about-focus-grid">
                    <div class="about-focus-item"><i class="fa-solid fa-robot"></i> Multi-Agent AI Systems</div>
                    <div class="about-focus-item"><i class="fa-solid fa-wrench"></i> MCP Tool Ecosystems</div>
                    <div class="about-focus-item"><i class="fa-solid fa-bolt"></i> High-Performance APIs</div>
                    <div class="about-focus-item"><i class="fa-solid fa-cloud"></i> Cloud Infrastructure</div>
                    <div class="about-focus-item"><i class="fa-solid fa-cubes"></i> Containerized Microservices</div>
                    <div class="about-focus-item"><i class="fa-solid fa-brain"></i> LLM Orchestration</div>
                </div>
            </div>

            <div class="about-section">
                <h3 class="about-section-title"><i class="fa-solid fa-graduation-cap"></i> Education</h3>
                <div class="about-edu">
                    <div class="about-edu-card">
                        <span class="about-edu-degree">MS, Computer & Information Technology</span>
                        <span class="about-edu-school">Purdue University, Hammond IN</span>
                        <span class="about-edu-year">2022 — 2023</span>
                    </div>
                    <div class="about-edu-card">
                        <span class="about-edu-degree">B.Tech, Electronics & Communication</span>
                        <span class="about-edu-school">Aditya College of Engineering, India</span>
                        <span class="about-edu-year">2016 — 2020</span>
                    </div>
                </div>
            </div>

            <div class="about-links">
                <a href="https://github.com/Ramc26" target="_blank" class="about-link-btn"><i class="fa-brands fa-github"></i> GitHub</a>
                <a href="mailto:itsrambikkina@gmail.com" class="about-link-btn"><i class="fa-solid fa-envelope"></i> Email</a>
                <a href="tel:+917095838715" class="about-link-btn"><i class="fa-solid fa-phone"></i> Call</a>
            </div>
        </div>`;
    modalOverlay.classList.add('open');

    // Wire up intern toggle
    let includeIntern = false;
    const expToggle = document.getElementById('aboutExpToggle');
    if (expToggle) {
        expToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            includeIntern = !includeIntern;
            const m = calcExpMonths(includeIntern);
            const y = Math.floor(m / 12);
            const r = m % 12;
            document.getElementById('aboutExpNum').textContent = r > 0 ? `${y}y ${r}m` : `${y}y`;
            document.getElementById('aboutExpToggleText').textContent = includeIntern ? '− Intern' : '+ Intern';
            expToggle.classList.toggle('active', includeIntern);
        });
    }
}

function openExperienceModal() {
    printLine('t-ok-line', '✓ Parsing experience.json ...');
    printLine('t-info-line', '  Loading career timeline → Opening output ...\n');
    renderFile('experience');

    const experiences = [
        {
            role: 'R&D Engineer I',
            company: 'Jukshio Technologies',
            location: 'Hyderabad, India',
            period: 'Jun 2024 — Present',
            type: 'current',
            highlights: [
                'Architected CrewAI-driven multi-agent orchestration layer',
                'Built 15+ FastAPI MCP tools with zero-hallucination calls',
                'Designed LangGraph stateful execution graphs',
                'Deployed containerized microservices via Docker & K8s',
                'Integrated OpenAI Whisper for real-time transcription',
            ]
        },
        {
            role: 'Python Developer (Intern)',
            company: 'Rubistone Technologies',
            location: 'Chicago, IL',
            period: 'Feb 2023 — Aug 2023',
            type: 'past',
            highlights: [
                'Processed 500K+ daily articles with multi-language support',
                'Built PySpark analytics pipeline on AWS Lambda + S3',
                'Developed LLM-based content automation system',
                'Maintained 99.5% uptime across production services',
            ]
        },
        {
            role: 'R&D Engineer I',
            company: 'Jukshio Technologies',
            location: 'Hyderabad, India',
            period: 'Jul 2020 — Aug 2021',
            type: 'past',
            highlights: [
                'Built Python automation & backend REST APIs',
                'Improved database performance by 40% via SQL optimization',
                'Developed internal tools reducing manual workflows',
            ]
        },
    ];

    modalTitle.textContent = 'Output — experience.json';
    modalBody.innerHTML = `
        <div class="modal-output-header"><span>$</span> jq '.experience[]' experience.json → <strong>${experiences.length} roles</strong></div>
        <div class="exp-timeline">
            ${experiences.map((exp, i) => `
                <div class="exp-card ${exp.type}" style="animation-delay: ${i * 0.15}s">
                    <div class="exp-card-marker">
                        <span class="exp-dot ${exp.type}"></span>
                        ${i < experiences.length - 1 ? '<span class="exp-line"></span>' : ''}
                    </div>
                    <div class="exp-card-body">
                        <div class="exp-card-header">
                            <div>
                                <h3 class="exp-role">${exp.role}</h3>
                                <p class="exp-company"><i class="fa-solid fa-building"></i> ${exp.company}</p>
                                <p class="exp-location"><i class="fa-solid fa-location-dot"></i> ${exp.location}</p>
                            </div>
                            <span class="exp-period ${exp.type}">${exp.period}</span>
                        </div>
                        <ul class="exp-highlights">
                            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>`;
    modalOverlay.classList.add('open');
}

// ========================================
// CONTACT SCRIPT ANIMATION
// ========================================
function runContactScript() {
    printLine('t-ok-line', '✓ Running contact.sh ...\n');
    contactScriptOutput.innerHTML = '';
    contactFormArea.style.display = 'none';
    contactOverlay.classList.add('open');

    const lines = [
        { text: '$ chmod +x contact.sh', delay: 0 },
        { text: '$ ./contact.sh', delay: 400 },
        { text: '', delay: 600 },
        { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 800 },
        { text: '  Contact: Ram Bikkina', delay: 1000 },
        { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 1200 },
        { text: '📧 Email  : itsrambikkina@gmail.com', delay: 1400 },
        { text: '🐙 GitHub : github.com/Ramc26', delay: 1600 },
        { text: '📞 Phone  : +91 70958 38715', delay: 1800 },
        { text: '', delay: 2000 },
        { text: 'Launching contact form...', delay: 2200 },
        { text: '✓ Ready.', delay: 2600 },
    ];

    lines.forEach(({ text, delay }) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 't-line t-out-line';
            div.textContent = text;
            if (text.startsWith('$')) div.className = 't-line t-cmd-line';
            if (text.startsWith('✓')) div.className = 't-line t-ok-line';
            if (text.includes('━')) div.className = 't-line t-info-line';
            contactScriptOutput.appendChild(div);
            contactScriptOutput.scrollTop = contactScriptOutput.scrollHeight;
        }, delay);
    });

    setTimeout(() => {
        contactFormArea.style.display = 'grid';
    }, 2800);
}

// ========================================
// CONTACT FORM (EmailJS)
// ========================================
function setupContact() {
    (function () { emailjs.init({ publicKey: "0BTonjp4iBF33pc3Q" }); })();

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = document.getElementById('contactSubmitBtn');
        const msg = document.getElementById('formStatusMsg');
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(() => {
                msg.textContent = '✓ Message sent!';
                msg.className = 'form-status-msg ok';
                btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> send_message()';
                btn.disabled = false;
                form.reset();
                printLine('t-ok-line', '✓ Message sent via contact.sh!');
            }, () => {
                msg.textContent = '✗ Failed. Try email directly.';
                msg.className = 'form-status-msg err';
                btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> send_message()';
                btn.disabled = false;
                printLine('t-err-line', '✗ Message failed. Try emailing directly.');
            });
    });

}

// ========================================
// SETTINGS PANEL
// ========================================
function setupSettings() {
    const settingsOverlay = document.getElementById('settingsOverlay');
    const btnSettings = document.getElementById('btnSettings');
    const settingsClose = document.getElementById('settingsClose');
    const themeToggle = document.getElementById('themeToggle');
    const fontSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');

    // Open / Close
    btnSettings.addEventListener('click', () => settingsOverlay.classList.add('open'));
    settingsClose.addEventListener('click', () => settingsOverlay.classList.remove('open'));
    settingsOverlay.addEventListener('click', (e) => { if (e.target === settingsOverlay) settingsOverlay.classList.remove('open'); });

    // Theme toggle
    const savedTheme = localStorage.getItem('ide-theme');
    if (savedTheme === 'light') { document.body.classList.add('light-theme'); themeToggle.checked = true; }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('ide-theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('ide-theme', 'dark');
        }
    });

    // Font size slider
    const savedFont = localStorage.getItem('ide-font-size');
    if (savedFont) { fontSlider.value = savedFont; applyFontSize(savedFont); }

    fontSlider.addEventListener('input', () => {
        const size = fontSlider.value;
        applyFontSize(size);
        localStorage.setItem('ide-font-size', size);
    });

    function applyFontSize(size) {
        fontSizeValue.textContent = size + 'px';
        editorCode.style.fontSize = size + 'px';
        editorGutter.style.fontSize = (parseInt(size) - 1) + 'px';
        termOutput.style.fontSize = size + 'px';
        termInput.style.fontSize = size + 'px';
    }
}

// ========================================
// MOBILE IDE RESPONSIVE
// ========================================
function setupMobileIDE() {
    const hamburger = document.getElementById('mobileHamburger');
    const sidebar = document.getElementById('sidebar');
    const activitybar = document.getElementById('activitybar');
    const terminalHeader = document.querySelector('.terminal-panel-header');

    if (!hamburger) return;

    // Create backdrop for sidebar drawer
    const backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);

    function openDrawer() {
        sidebar.classList.add('mobile-open');
        activitybar.classList.add('mobile-visible');
        backdrop.classList.add('active');
        hamburger.querySelector('i').className = 'fa-solid fa-xmark';
    }
    function closeDrawer() {
        sidebar.classList.remove('mobile-open');
        activitybar.classList.remove('mobile-visible');
        backdrop.classList.remove('active');
        hamburger.querySelector('i').className = 'fa-solid fa-bars';
    }

    hamburger.addEventListener('click', () => {
        sidebar.classList.contains('mobile-open') ? closeDrawer() : openDrawer();
    });
    backdrop.addEventListener('click', closeDrawer);

    // Terminal header tap expands/collapses on mobile
    if (terminalHeader) {
        terminalHeader.addEventListener('click', (e) => {
            if (window.innerWidth > 768) return;
            if (e.target.closest('.panel-action-btn')) return;

            if (termPanel.classList.contains('collapsed')) {
                // If collapsed, expand it
                termPanel.classList.remove('collapsed');
                termPanel.classList.add('mobile-expanded');
                isTermCollapsed = false;
            } else {
                termPanel.classList.toggle('mobile-expanded');
            }
        });
    }

    // Close drawer when file clicked on mobile
    document.querySelectorAll('.tree-file').forEach(f => {
        f.addEventListener('click', () => {
            if (window.innerWidth <= 768) closeDrawer();
        });
    });
}

// ========================================
// ONBOARDING HINTS
// ========================================
function setupOnboarding() {
    const overlay = document.getElementById('onboardingOverlay');
    if (!overlay) return;
    // Always start hidden; the IDE shell is what triggers the hints,
    // not the ZenShell landing.
    overlay.classList.add('ob-hidden');
}

let _onboardingArmed = false;
function maybeShowOnboarding() {
    if (_onboardingArmed) return;
    _onboardingArmed = true;

    const overlay = document.getElementById('onboardingOverlay');
    if (!overlay) return;
    if (localStorage.getItem('ide-onboarded')) return;

    // Slight delay so the IDE fade-in completes before hints appear.
    setTimeout(() => {
        overlay.classList.remove('ob-hidden');
        const autoDismiss = setTimeout(() => dismissOnboarding(overlay), 5000);
        overlay.addEventListener('click', () => {
            clearTimeout(autoDismiss);
            dismissOnboarding(overlay);
        }, { once: true });
    }, 460);
}

function dismissOnboarding(overlay) {
    if (overlay.classList.contains('ob-fade-out') || overlay.classList.contains('ob-hidden')) return;
    overlay.classList.add('ob-fade-out');
    overlay.addEventListener('animationend', () => {
        overlay.classList.add('ob-hidden');
        localStorage.setItem('ide-onboarded', 'true');
    }, { once: true });
}
