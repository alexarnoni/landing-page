/**
 * main.js — alexarnoni.com
 *
 * 6 funcionalidades:
 *   1. Copyright dinâmico
 *   2. Nav overflow (+ debounce)
 *   3. Mobile menu toggle
 *   4. Reveal animation (IntersectionObserver)
 *   5. Astraea live data (API → painel NEO Feed)
 *   6. Lang link (EN/PT toggle)
 */

// ─── Utilitários ────────────────────────────────────────────

function debounce(func, wait = 150) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ─── 1. Copyright dinâmico ──────────────────────────────────

function updateCopyrightYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = year;
  });
}

// ─── 2. Nav Overflow ────────────────────────────────────────

function checkNavOverflow() {
  const navContainer = document.querySelector('.nav-container');
  const brand = document.querySelector('.brand');
  const navList = document.querySelector('.nav-list');

  if (!navContainer || !brand || !navList) return;

  const containerWidth = navContainer.offsetWidth;
  const brandWidth = brand.offsetWidth;
  const navWidth = navList.scrollWidth;

  if (brandWidth + navWidth + 80 > containerWidth) {
    document.documentElement.classList.add('nav-overflow');
  } else {
    document.documentElement.classList.remove('nav-overflow');
  }
}

const debouncedCheckNavOverflow = debounce(checkNavOverflow, 150);

// ─── 3. Mobile Menu Toggle ──────────────────────────────────

function initMobileMenu() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (!toggle || !menu) return;

  const MOBILE_BREAKPOINT = 768;

  const setMenuState = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggle.focus();
    }
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    }
  });
}

// ─── 4. Reveal Animation ───────────────────────────────────

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// ─── 5. Astraea Live Data ───────────────────────────────────

async function loadAstraeaData() {
  const panel = document.getElementById('astraea-panel');
  if (!panel) return;

  try {
    const [statsRes, asteroidsRes] = await Promise.all([
      fetch('https://astraea-api.alexarnoni.com/v1/stats/summary'),
      fetch('https://astraea-api.alexarnoni.com/v1/asteroids/upcoming')
    ]);

    const stats = await statsRes.json();
    const asteroids = await asteroidsRes.json();

    document.getElementById('stat-asteroids').textContent = stats.total_asteroids;
    document.getElementById('stat-hazardous').textContent = stats.hazardous_count;
    document.getElementById('stat-solar').textContent = stats.total_solar_events;

    const top4 = [...asteroids]
      .sort((a, b) => a.miss_distance_km - b.miss_distance_km)
      .slice(0, 4);

    const rows = document.getElementById('neo-rows');
    rows.innerHTML = top4.map(a => {
      const distAU = (a.miss_distance_km / 149597870.7).toFixed(4);
      const riskClass = a.risk_label_ml === 'alto' ? 'hub-badge-high'
        : a.risk_label_ml === 'médio' ? 'hub-badge-mid'
        : 'hub-badge-low';
      const riskLabel = a.risk_label_ml === 'alto' ? 'ALTO'
        : a.risk_label_ml === 'médio' ? 'MÉDIO'
        : 'BAIXO';
      const name = a.name.replace(/[()]/g, '').trim();

      return `<div class="hub-panel-row">
        <span class="hub-panel-obj">${name}</span>
        <span class="hub-panel-dist">${distAU} AU</span>
        <span class="hub-badge ${riskClass}">${riskLabel}</span>
      </div>`;
    }).join('');
  } catch (e) {
    console.warn('[Astraea] API indisponível, usando fallback.');
  }
}

// ─── 6. Lang Link ───────────────────────────────────────────

function updateLangLink() {
  const langLink = document.getElementById('lang-link');
  if (!langLink) return;

  const path = window.location.pathname;

  if (path.startsWith('/en/')) {
    langLink.textContent = 'PT';
    const ptPath = path.replace('/en/', '/');
    langLink.href = ptPath || '/';
  } else {
    langLink.textContent = 'EN';
    if (path === '/' || path === '') {
      langLink.href = '/en/';
    } else {
      langLink.href = '/en' + path;
    }
  }
}

// ─── 7. Dark Mode ───────────────────────────────────────────

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeButton(theme);
}

function updateThemeButton(theme) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// ─── Inicialização ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateCopyrightYear();
  checkNavOverflow();
  initMobileMenu();
  initReveal();
  loadAstraeaData();
  updateLangLink();
});

document.addEventListener('partials:ready', () => {
  updateCopyrightYear();
  checkNavOverflow();
  initMobileMenu();
  initReveal();
  updateLangLink();
  initThemeToggle();
  updateThemeButton(document.documentElement.getAttribute('data-theme') || 'light');
});

window.addEventListener('resize', debouncedCheckNavOverflow);

(function () {
  const el = document.getElementById('typewriter-role');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = 'Data Engineer';
    return;
  }

  const phrases = ['Data Engineer', 'Data Analyst', 'BI Developer', 'Python Developer'];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) { deleting = true; setTimeout(tick, 1800); return; }
      setTimeout(tick, 80);
    } else {
      el.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 40);
    }
  }
  tick();
})();
