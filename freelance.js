/* Freelance studio — render data/freelance.json */

const DATA_URL = './data/freelance.json';

const $ = (id) => document.getElementById(id);

function escapeHtml(s) {
    return String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function initials(name) {
    return String(name || '')
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0])
        .join('')
        .toUpperCase();
}

async function loadData() {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error('Could not load freelance.json');
    return res.json();
}

function splitHeadline(text) {
    const el = $('flHeadline');
    const words = String(text || '').split(/\s+/).filter(Boolean);
    el.innerHTML = words.map((w, i) =>
        `<span class="fl-word" style="--i:${i}">${escapeHtml(w)}</span>`
    ).join(' ');
}

function renderHero(data) {
    const m = data.meta || {};
    $('flAvailability').textContent = m.availability || m.kicker || '';
    splitHeadline(m.headline || '');
    $('flLede').textContent = m.lede || '';
    $('flCtaPrimary').textContent = m.ctaPrimary || 'Start a project';
    $('flCtaSecondary').textContent = m.ctaSecondary || 'See selected work';
    const bits = [m.location, m.email].filter(Boolean);
    $('flHeroMeta').textContent = bits.join('  ·  ');

    $('flStats').innerHTML = (data.stats || []).map((s) => `
        <article class="fl-stat">
            <div class="fl-stat-value">${escapeHtml(s.value)}</div>
            <div class="fl-stat-label">${escapeHtml(s.label)}</div>
        </article>
    `).join('');
}

function renderServices(services) {
    $('flServices').innerHTML = (services || []).map((s) => `
        <article class="fl-service">
            <div class="fl-service-icon" aria-hidden="true"><i class="fa-solid ${escapeHtml(s.icon || 'fa-circle')}"></i></div>
            <h3>${escapeHtml(s.name)}</h3>
            <p>${escapeHtml(s.blurb)}</p>
            <ul>${(s.deliverables || []).map((d) => `<li>${escapeHtml(d)}</li>`).join('')}</ul>
        </article>
    `).join('');
}

function collectTestimonials(data) {
    const fromProjects = (data.projects || [])
        .map((p) => {
            const t = p.testimonial || {};
            const quote = String(t.quote || '').trim();
            if (!quote) return null;
            return {
                quote,
                name: t.name || p.client || '',
                role: t.role || '',
                org: t.org || '',
                project: p.name || ''
            };
        })
        .filter(Boolean);

    const standalone = (data.testimonials || []).filter((t) => String(t.quote || '').trim());
    return fromProjects.length ? fromProjects : standalone;
}

function padIndex(n) {
    return String(n).padStart(2, '0');
}

function shortDid(text) {
    const t = String(text || '').trim();
    if (t.length <= 72) return t;
    return t.slice(0, 69).replace(/\s+\S*$/, '') + '…';
}

function renderWork(projects) {
    const list = (projects || []).slice().sort((a, b) => (a.id || 0) - (b.id || 0));
    const host = $('flWork');
    if (!list.length) {
        host.innerHTML = '<p class="fl-error">No projects yet.</p>';
        return;
    }

    let index = 0;

    host.innerHTML = `
        <div class="fl-stage">
            <div class="fl-stage-rail" id="flWorkRail" role="tablist" aria-label="Projects"></div>
            <div class="fl-stage-board">
                <div class="fl-stage-top">
                    <span class="fl-stage-index" id="flWorkIndex"></span>
                    <div class="fl-stage-controls">
                        <button type="button" class="fl-icon-btn" id="flWorkPrev" aria-label="Previous project">‹</button>
                        <button type="button" class="fl-icon-btn" id="flWorkNext" aria-label="Next project">›</button>
                    </div>
                </div>
                <div class="fl-stage-body" id="flWorkBody"></div>
            </div>
        </div>
    `;

    const rail = $('flWorkRail');
    rail.innerHTML = list.map((p, i) => `
        <button type="button" class="fl-rail-btn" role="tab" data-i="${i}" aria-selected="${i === 0}">
            <span class="fl-rail-year">${escapeHtml(p.year)}</span>
            <span class="fl-rail-name">${escapeHtml(p.name)}</span>
            <span class="fl-rail-client">${escapeHtml(p.client)}</span>
        </button>
    `).join('');

    const paint = (i, animate = true) => {
        index = (i + list.length) % list.length;
        const p = list[index];
        $('flWorkIndex').textContent = `${padIndex(index + 1)} / ${padIndex(list.length)}`;
        rail.querySelectorAll('.fl-rail-btn').forEach((btn, bi) => {
            btn.classList.toggle('is-active', bi === index);
            btn.setAttribute('aria-selected', String(bi === index));
        });
        const highlights = (p.did || []).slice(0, 3);
        const body = $('flWorkBody');
        body.innerHTML = `
            <p class="fl-stage-kicker">${escapeHtml([p.client, p.role, p.year].filter(Boolean).join(' · '))}</p>
            <h3>${escapeHtml(p.name)}</h3>
            <p class="fl-stage-summary">${escapeHtml(p.summary)}</p>
            <div class="fl-highlights">${highlights.map((d) => `<span class="fl-highlight">${escapeHtml(shortDid(d))}</span>`).join('')}</div>
            ${p.outcome ? `<p class="fl-stage-outcome">${escapeHtml(p.outcome)}</p>` : ''}
            <div class="fl-tags">${(p.tech || []).slice(0, 6).map((tag) => `<span class="fl-tag">${escapeHtml(tag)}</span>`).join('')}</div>
        `;
        if (animate) {
            body.classList.remove('is-swap');
            void body.offsetWidth;
            body.classList.add('is-swap');
        }
        const active = rail.querySelector('.fl-rail-btn.is-active');
        if (active && active.scrollIntoView) {
            active.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
        }
    };

    rail.addEventListener('click', (e) => {
        const btn = e.target.closest('.fl-rail-btn');
        if (!btn) return;
        paint(Number(btn.dataset.i));
    });
    $('flWorkPrev').addEventListener('click', () => paint(index - 1));
    $('flWorkNext').addEventListener('click', () => paint(index + 1));

    const board = host.querySelector('.fl-stage-board');
    let touchX = null;
    board.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
    board.addEventListener('touchend', (e) => {
        if (touchX == null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        touchX = null;
        if (Math.abs(dx) < 40) return;
        paint(index + (dx < 0 ? 1 : -1));
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
        const section = document.getElementById('work');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > 80;
        if (!inView) return;
        if (e.key === 'ArrowRight') { e.preventDefault(); paint(index + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); paint(index - 1); }
    });

    paint(0, false);
}

function renderQuotes(items) {
    const host = $('flQuotes');
    const section = document.getElementById('feedback');
    if (!items.length) {
        if (section) section.hidden = true;
        return;
    }
    if (section) section.hidden = false;

    let index = 0;
    let timer = null;

    host.innerHTML = `
        <div class="fl-theater" id="flTheater">
            <div class="fl-theater-mark" aria-hidden="true">“</div>
            <p class="fl-theater-quote" id="flTheaterQuote"></p>
            <div class="fl-theater-who" id="flTheaterWho"></div>
            <div class="fl-theater-people" id="flTheaterPeople"></div>
            <div class="fl-theater-progress" aria-hidden="true"><i id="flTheaterBar"></i></div>
        </div>
    `;

    $('flTheaterPeople').innerHTML = items.map((q, i) => `
        <button type="button" class="fl-person" data-i="${i}">${escapeHtml(q.name)}</button>
    `).join('');

    const restartBar = () => {
        const bar = $('flTheaterBar');
        if (!bar) return;
        bar.style.animation = 'none';
        void bar.offsetWidth;
        bar.style.animation = 'flProgress 8s linear';
    };

    const paint = (i, animate = true) => {
        index = (i + items.length) % items.length;
        const q = items[index];
        const quoteEl = $('flTheaterQuote');
        quoteEl.textContent = q.quote;
        $('flTheaterWho').innerHTML = `
            <span class="fl-avatar" aria-hidden="true">${escapeHtml(initials(q.name))}</span>
            <div>
                <strong>${escapeHtml(q.name)}</strong>
                <span>${escapeHtml([q.role, q.org, q.project].filter(Boolean).join(' · '))}</span>
            </div>
        `;
        host.querySelectorAll('.fl-person').forEach((btn, bi) => {
            btn.classList.toggle('is-active', bi === index);
        });
        if (animate) {
            quoteEl.classList.remove('is-swap');
            void quoteEl.offsetWidth;
            quoteEl.classList.add('is-swap');
        }
        restartBar();
    };

    const play = () => {
        clearInterval(timer);
        timer = setInterval(() => paint(index + 1), 8000);
    };

    $('flTheaterPeople').addEventListener('click', (e) => {
        const btn = e.target.closest('.fl-person');
        if (!btn) return;
        paint(Number(btn.dataset.i));
        play();
    });

    const theater = $('flTheater');
    theater.addEventListener('mouseenter', () => clearInterval(timer));
    theater.addEventListener('mouseleave', play);

    paint(0, false);
    play();
}

function renderProcess(steps) {
    $('flProcess').innerHTML = (steps || []).map((s) => `
        <article class="fl-step">
            <div class="fl-step-num">${escapeHtml(s.step)}</div>
            <h3>${escapeHtml(s.title)}</h3>
            <p>${escapeHtml(s.text)}</p>
        </article>
    `).join('');
}

function renderEngage(items) {
    $('flEngage').innerHTML = (items || []).map((e) => `
        <article class="fl-engage-card">
            <h3>${escapeHtml(e.name)}</h3>
            <div class="dur">${escapeHtml(e.duration)}</div>
            <p>${escapeHtml(e.fit)}</p>
        </article>
    `).join('');
}

function renderContact(data) {
    const c = data.contact || {};
    const m = data.meta || {};
    $('flContactEyebrow').textContent = c.eyebrow || '';
    $('flContactTitle').textContent = c.title || '';
    $('flContactNote').textContent = c.note || '';

    const select = $('flInterest');
    select.innerHTML = (c.interests || ['Something else']).map((opt) =>
        `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`
    ).join('');

    const channels = document.querySelectorAll('.fl-channel');
    if (channels[0] && m.email) {
        channels[0].href = `mailto:${m.email}`;
        channels[0].querySelector('span').textContent = m.email;
    }
    if (channels[1] && m.phone) {
        channels[1].href = `tel:${m.phone.replace(/\s+/g, '')}`;
        channels[1].querySelector('span').textContent = m.phone;
    }
    if (channels[2] && m.github) {
        channels[2].href = m.github;
        channels[2].querySelector('span').textContent = m.github.replace(/^https?:\/\//, '');
    }
}

function setupNav() {
    const nav = document.querySelector('.fl-nav');
    const burger = $('flNavBurger');
    const links = $('flNavLinks');
    if (!nav || !burger) return;

    const close = () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
    };

    burger.addEventListener('click', () => {
        const open = !nav.classList.contains('is-open');
        nav.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
}

function setupForm() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: '0BTonjp4iBF33pc3Q' });
    }

    const form = $('flForm');
    const status = $('flFormStatus');
    const btn = $('flSubmit');
    const message = $('flMessage');
    const interest = $('flInterest');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (typeof emailjs === 'undefined') {
            status.textContent = 'Email service unavailable. Write me directly.';
            status.className = 'fl-form-status err';
            return;
        }

        const notes = message.value.trim();
        const lane = interest.value;
        const payload = {
            user_name: form.user_name.value,
            user_email: form.user_email.value,
            message: lane ? `[Interest: ${lane}]\n\n${notes}` : notes
        };

        btn.disabled = true;
        btn.textContent = 'Sending…';
        status.textContent = '';
        status.className = 'fl-form-status';

        emailjs.send('contact_service', 'contact_form', payload)
            .then(() => {
                status.textContent = 'Sent. I’ll reply within a business day.';
                status.className = 'fl-form-status ok';
                form.reset();
            })
            .catch(() => {
                status.textContent = 'Couldn’t send. Email itsrambikkina@gmail.com instead.';
                status.className = 'fl-form-status err';
            })
            .finally(() => {
                btn.disabled = false;
                btn.textContent = 'Send brief';
            });
    });
}

function fail(err) {
    console.warn(err);
    const host = $('flHeadline');
    if (host) host.textContent = 'Could not load freelance data.';
    ['flServices', 'flWork', 'flQuotes', 'flProcess', 'flEngage'].forEach((id) => {
        const el = $(id);
        if (el) el.innerHTML = '<p class="fl-error">Add or fix data/freelance.json and refresh.</p>';
    });
}

function setupReveal() {
    const nodes = document.querySelectorAll('.fl-reveal');
    if (!nodes.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        nodes.forEach((n) => n.classList.add('is-in'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach((n) => io.observe(n));
}

function setupAtmosphere() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const spot = $('flSpot');
    const canvas = $('flDust');

    if (spot && !coarse) {
        window.addEventListener('pointermove', (e) => {
            spot.classList.add('is-on');
            spot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }, { passive: true });
        window.addEventListener('pointerleave', () => spot.classList.remove('is-on'));
    }

    if (!canvas || reduce) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const count = coarse ? 28 : 56;
    let particles = [];
    let w = 0;
    let h = 0;
    let running = true;
    let raf = 0;

    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.6 + 0.4,
            s: Math.random() * 0.35 + 0.12,
            a: Math.random() * 0.45 + 0.12,
            drift: (Math.random() - 0.5) * 0.25
        }));
    };

    const tick = () => {
        if (!running) return;
        ctx.clearRect(0, 0, w, h);
        particles.forEach((p) => {
            p.y -= p.s;
            p.x += p.drift;
            if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
            if (p.x < -4) p.x = w + 4;
            if (p.x > w + 4) p.x = -4;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 229, 106, ${p.a})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            running = false;
            cancelAnimationFrame(raf);
        } else if (!running) {
            running = true;
            tick();
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    setupNav();
    setupForm();
    setupAtmosphere();
    try {
        const data = await loadData();
        renderHero(data);
        renderServices(data.services);
        renderWork(data.projects);
        renderQuotes(collectTestimonials(data));
        renderProcess(data.process);
        renderEngage(data.engagements);
        renderContact(data);
        setupReveal();
    } catch (err) {
        fail(err);
        setupReveal();
    }
});
