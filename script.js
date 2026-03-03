/* ============================================================
   PORTFOLIO IDE — script.js
   Full IDE engine: files, tabs, terminal, modals
   ============================================================ */

// ===== JSON DATA CACHE =====
        let _projectsData = null;
        let _articlesData = null;

        async function loadProjectsData() {
            if (_projectsData) return _projectsData;
            try {
                const resp = await fetch('./data/projects.json');
                _projectsData = await resp.json();
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
                _articlesData = await resp.json();
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

        // ===== INIT =====
        document.addEventListener('DOMContentLoaded', () => {
    renderFile('readme');
    renderTabs();
    setupFileTree();
    setupTerminal();
    setupResize();
    setupModals();
    setupContact();
    setupActivityBar();
    setupSidebar();
    setupKeyboard();
    setupSearch();
    setupSettings();
    setupMobile();
    printWelcome();
    termInput.focus();
});

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
            document.getElementById('clearTermBtn').addEventListener('click', () => { termOutput.innerHTML = ''; });
            document.getElementById('closeTermBtn').addEventListener('click', () => {
                termPanel.style.display = 'none'; isTermCollapsed = true;
            });
            document.getElementById('toggleTermBtn').addEventListener('click', () => {
                if (isTermCollapsed) { termPanel.style.display = ''; isTermCollapsed = false; }
                else { termPanel.style.display = 'none'; isTermCollapsed = true; }
            });
            document.getElementById('newTermBtn').addEventListener('click', () => {
                if (isTermCollapsed) { termPanel.style.display = ''; isTermCollapsed = false; }
                termOutput.innerHTML = '';
                printWelcome();
                termInput.focus();
            });

            // Focus terminal on click
            termOutput.addEventListener('click', () => termInput.focus());
        }

        function printWelcome() {
            printLine('t-ascii-line', '┌───────────────────────────────────────────┐');
            printLine('t-ascii-line', '│   ram.dev — Portfolio IDE v2.0       │');
            printLine('t-ascii-line', '│   Type "help" to get started              │');
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
                        ['run contact.sh', 'Contact form'],
                        ['whoami', 'About me'],
                        ['python about.py', 'Execute about.py'],
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
                    else printLine('t-err-line', `error: cannot run "${arg}". Try: run projects.ts | run articles.md | run contact.sh`);
                    break;

                case 'python':
                    if (arg.toLowerCase() === 'about.py') {
                        printLine('t-out-line', `Engineer('Ram Bikkina', 'R&D Engineer I')`);
                        printLine('t-out-line', `Focus: ['Multi-Agent AI Systems (CrewAI, LangGraph)',`);
                        printLine('t-out-line', `        'MCP Tool Ecosystems & LLM Orchestration',`);
                        printLine('t-out-line', `        'High-Performance APIs (FastAPI, Flask)',`);
                        printLine('t-out-line', `        'Containerized Microservices (Docker, K8s)',`);
                        printLine('t-out-line', `        'Cloud Infrastructure (AWS, GCP, Azure)']`);
                    } else printLine('t-err-line', `python: can't open file '${arg}'`);
                    break;

                case 'whoami':
                    printLine('t-ok-line', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
                    printLine('t-ok-line', '  Ram Bikkina');
                    printLine('t-out-line', '  R&D Engineer I @ Jukshio Technologies');
                    printLine('t-out-line', '  Hyderabad, TG, India');
                    printLine('t-out-line', '  MS, CIT — Purdue University');
                    printLine('t-info-line', '  📧 itsrambikkina@gmail.com');
                    printLine('t-info-line', '  🐙 github.com/Ramc26');
                    printLine('t-info-line', '  📞 +91 70958 38715');
                    printLine('t-ok-line', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
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
// POPULATE MOBILE UI FROM JSON
// ========================================
async function populateMobileFromJSON() {
    // Populate mobile projects
    const projects = await loadProjectsData();
    const mobProjects = document.getElementById('mob-projects');
    if (mobProjects && projects.length > 0) {
        const title = mobProjects.querySelector('.mob-section-title');
        const html = projects.map(p => `<div class="mob-proj-card">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="mob-tags">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        </div>`).join('');
        mobProjects.innerHTML = '';
        if (title) mobProjects.innerHTML = '<h2 class="mob-section-title">Projects</h2>';
        mobProjects.innerHTML += html;
    }

    // Populate mobile articles (add to projects section or create separate)
    // Articles are shown in the contact section or could be a new section
}

// ========================================
// MOBILE UI
// ========================================
function setupMobile() {
    const mobNav = document.getElementById('mobNav');
    const mobMenuBtn = document.getElementById('mobMenuBtn');

    if (!mobNav) return;

    // Mobile nav section switching
    mobNav.querySelectorAll('.mob-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sec = btn.dataset.mobSection;
            mobNav.querySelectorAll('.mob-nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.mob-section').forEach(s => s.classList.remove('active'));
            const target = document.getElementById(sec);
            if (target) target.classList.add('active');
        });
    });

    // Populate from JSON
    populateMobileFromJSON();

    // Menu button toggle (scroll nav into view)
    if (mobMenuBtn) {
        mobMenuBtn.addEventListener('click', () => {
            mobNav.scrollTo({ left: 0, behavior: 'smooth' });
        });
    }

    // Mobile contact form
    const mobForm = document.getElementById('mobile-contact-form');
    if (mobForm) {
        mobForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = document.getElementById('mobSendBtn');
            const msg = document.getElementById('mobFormStatus');
            btn.disabled = true;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            emailjs.sendForm('contact_service', 'contact_form', this)
                .then(() => {
                    msg.textContent = '✓ Message sent!';
                    msg.className = 'mob-form-status ok';
                    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send';
                    btn.disabled = false;
                    mobForm.reset();
                }, () => {
                    msg.textContent = '✗ Failed. Try email directly.';
                    msg.className = 'mob-form-status err';
                    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send';
                    btn.disabled = false;
                });
        });
    }
}
