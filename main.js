/**
 * main.js — alexarnoni.com
 *
 * Funcionalidades:
 *   0. Configuração (flags e lista de CVs)
 *   1. Copyright dinâmico
 *   2. Nav overflow (+ debounce)
 *   3. Mobile menu toggle
 *   4. Reveal animation (IntersectionObserver)
 *   5. Painel NEO Feed (API do Astraea, com estado de erro)
 *   6. Lang link (EN/PT toggle)
 *   7. Dark mode
 *   8. Menu de download de CV
 *   9. Flags de conteúdo (data-flag)
 *  10. Métricas do modelo do Astraea (assets/data/astraea-ml.json)
 */

// ─── 0. Configuração ────────────────────────────────────────
// Único bloco para editar à mão.

// Mudam os textos das páginas do Astraea (estado do modelo 2.0.0) e do Acervo.
const ML_IN_PRODUCTION = false;
const ACERVO_POWERBI_READY = true;

// Lista de CVs. Para adicionar uma versão em inglês, inclua uma linha com
// lang: 'en' e o mesmo target: nas páginas em EN ela substitui a versão PT.
// Enquanto só existir PT, o modo EN mostra o arquivo PT com a marca "(PT)".
const CV_FILES = [
  {
    file: '/assets/cv/cv_alexandre_bi_data_analyst.pdf',
    target: 'bi', lang: 'pt',
    label: { pt: 'BI / Data Analyst', en: 'BI / Data Analyst' },
    desc: {
      pt: 'Para vagas de análise de dados, BI e relatórios.',
      en: 'For data analysis, BI and reporting roles.'
    }
  },
  {
    file: '/assets/cv/cv_alexandre_ciencia_dados.pdf',
    target: 'ds', lang: 'pt',
    label: { pt: 'Ciência de Dados', en: 'Data Science' },
    desc: {
      pt: 'Para vagas de ciência de dados e modelagem.',
      en: 'For data science and modeling roles.'
    }
  },
  {
    file: '/assets/cv/cv_alexandre_engenharia_dados.pdf',
    target: 'de', lang: 'pt',
    label: { pt: 'Engenharia de Dados', en: 'Data Engineering' },
    desc: {
      pt: 'Para vagas de engenharia de dados, pipelines e APIs.',
      en: 'For data engineering, pipeline and API roles.'
    }
  }
];

const ASTRAEA_API = 'https://astraea-api.alexarnoni.com';
const ASTRAEA_ML_URL = '/assets/data/astraea-ml.json';

const PAGE_LANG = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
const NUM_LOCALE = PAGE_LANG === 'en' ? 'en-US' : 'pt-BR';

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

// ─── 5. Painel NEO Feed (API do Astraea) ────────────────────
// O painel começa escondido e só aparece com dados reais da API.
// Se a API falhar (fora do ar ou bloqueio de CORS), o painel continua
// escondido e os contadores da página do Astraea mostram "indisponível".

const RISK_BADGES = {
  alto:  { cls: 'hub-badge-high', pt: 'ALTO',  en: 'HIGH' },
  médio: { cls: 'hub-badge-mid',  pt: 'MÉDIO', en: 'MED' },
  baixo: { cls: 'hub-badge-low',  pt: 'BAIXO', en: 'LOW' }
};

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(url + ' respondeu ' + res.status);
  return res.json();
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderNeoRow(a) {
  const distAU = (a.miss_distance_km / 149597870.7).toFixed(4);
  const badge = RISK_BADGES[a.risk_label] || RISK_BADGES.baixo;

  const row = document.createElement('div');
  row.className = 'hub-panel-row';
  const obj = document.createElement('span');
  obj.className = 'hub-panel-obj';
  obj.textContent = String(a.name).replace(/[()]/g, '').trim();
  const dist = document.createElement('span');
  dist.className = 'hub-panel-dist';
  dist.textContent = distAU + ' AU';
  const tag = document.createElement('span');
  tag.className = 'hub-badge ' + badge.cls;
  tag.textContent = badge[PAGE_LANG];
  row.append(obj, dist, tag);
  return row;
}

async function loadAstraeaData() {
  const wrap = document.getElementById('astraea-panel-wrap');
  const hasStatsBar = !!document.getElementById('proj-stat-asteroids');
  if (!wrap && !hasStatsBar) return;

  try {
    const [stats, asteroids] = await Promise.all([
      fetchJson(ASTRAEA_API + '/v1/stats/summary'),
      fetchJson(ASTRAEA_API + '/v1/asteroids/upcoming')
    ]);
    const ok = [stats.total_asteroids, stats.hazardous_count, stats.total_solar_events]
      .every(Number.isFinite) && Array.isArray(asteroids);
    if (!ok) throw new Error('resposta da API fora do formato esperado');

    const nf = new Intl.NumberFormat(NUM_LOCALE);
    ['stat', 'proj-stat'].forEach((prefix) => {
      setText(prefix + '-asteroids', nf.format(stats.total_asteroids));
      setText(prefix + '-hazardous', nf.format(stats.hazardous_count));
      setText(prefix + '-solar', nf.format(stats.total_solar_events));
    });

    const top4 = asteroids
      .filter(a => Number.isFinite(a.miss_distance_km))
      .sort((a, b) => a.miss_distance_km - b.miss_distance_km)
      .slice(0, 4);
    const rows = document.getElementById('neo-rows');
    if (wrap && rows && top4.length) {
      rows.replaceChildren(...top4.map(renderNeoRow));
      wrap.hidden = false;
    }
  } catch (e) {
    console.warn('[Astraea] API indisponível, painel escondido.', e);
    if (wrap) wrap.hidden = true;
    const msg = PAGE_LANG === 'en' ? 'unavailable' : 'indisponível';
    ['proj-stat-asteroids', 'proj-stat-hazardous', 'proj-stat-solar'].forEach(id => setText(id, msg));
  }
}

// ─── 6. Lang Link ───────────────────────────────────────────

function updateLangLink() {
  const langLinks = document.querySelectorAll('.lang-link');
  if (!langLinks.length) return;

  const path = window.location.pathname;
  const inEn = path.startsWith('/en/');
  const label = inEn ? 'PT' : 'EN';
  let href;
  if (inEn) {
    href = path.replace('/en/', '/') || '/';
  } else {
    href = (path === '/' || path === '') ? '/en/' : '/en' + path;
  }

  langLinks.forEach((link) => {
    link.textContent = label;
    link.href = href;
  });
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

// ─── 8. Menu de download de CV ──────────────────────────────

function cvItemsForPage() {
  const byTarget = new Map();
  CV_FILES.forEach((item) => {
    const current = byTarget.get(item.target);
    if (!current || (item.lang === PAGE_LANG && current.lang !== PAGE_LANG)) {
      byTarget.set(item.target, item);
    }
  });
  return [...byTarget.values()];
}

function initCvMenus() {
  const menus = document.querySelectorAll('[data-cv-menu]');
  if (!menus.length) return;
  const items = cvItemsForPage();
  if (!items.length) return;

  menus.forEach((menu) => {
    const list = menu.querySelector('.cv-menu-list');
    if (!list) return;

    list.replaceChildren(...items.map((item) => {
      const a = document.createElement('a');
      a.className = 'cv-menu-item';
      a.href = item.file;
      a.setAttribute('download', '');
      const name = document.createElement('span');
      name.className = 'cv-menu-name';
      name.textContent = item.label[PAGE_LANG] +
        (item.lang !== PAGE_LANG ? ' (' + item.lang.toUpperCase() + ')' : '');
      const desc = document.createElement('span');
      desc.className = 'cv-menu-desc';
      desc.textContent = item.desc[PAGE_LANG];
      a.append(name, desc);
      return a;
    }));
    menu.hidden = false;
  });

  document.addEventListener('click', (e) => {
    menus.forEach((menu) => {
      if (menu.open && !menu.contains(e.target)) menu.open = false;
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    menus.forEach((menu) => {
      if (menu.open) {
        menu.open = false;
        const summary = menu.querySelector('summary');
        if (summary) summary.focus();
      }
    });
  });
}

// ─── 9. Flags de conteúdo ───────────────────────────────────
// <el data-flag="NOME=true"> só aparece quando a constante tem esse valor.

function applyFlags() {
  const flags = { ML_IN_PRODUCTION, ACERVO_POWERBI_READY };
  document.querySelectorAll('[data-flag]').forEach((el) => {
    const [name, value] = el.dataset.flag.split('=');
    el.hidden = String(flags[name]) !== value;
  });
}

// ─── 10. Métricas do modelo do Astraea ──────────────────────
// Lê assets/data/astraea-ml.json. Só renderiza métricas se o arquivo
// existir, for JSON válido e tiver status "retargeted". Caso contrário
// mostra apenas o texto de fallback. O campo "notes" nunca é exibido.

function isValidModelFile(d) {
  const num = (v) => typeof v === 'number' && Number.isFinite(v);
  const has4 = (m) => !!m && ['precision', 'recall', 'f1', 'pr_auc'].every(k => num(m[k]));
  return !!d && d.status === 'retargeted'
    && typeof d.model_version === 'string'
    && num(d.n_samples) && num(d.n_asteroids)
    && has4(d.metrics)
    && !!d.baselines && has4(d.baselines.logistic_regression) && has4(d.baselines.majority);
}

async function loadAstraeaModel() {
  const root = document.getElementById('astraea-model');
  if (!root) return;

  let data = null;
  try {
    const res = await fetch(ASTRAEA_ML_URL, { cache: 'no-cache' });
    if (res.ok) data = await res.json();
  } catch (e) {
    console.warn('[Astraea] métricas do modelo indisponíveis.', e);
  }

  const valid = isValidModelFile(data);
  root.querySelectorAll('[data-ml-fallback]').forEach(el => { el.hidden = valid; });
  applyFlags();
  root.querySelectorAll('[data-ml-ok]').forEach(el => { if (!valid) el.hidden = true; else if (!el.dataset.flag) el.hidden = false; });
  if (!valid) return;

  const fmt = (n, d) => n.toLocaleString(NUM_LOCALE, { minimumFractionDigits: d, maximumFractionDigits: d });
  const fields = {
    model_version: data.model_version,
    n_samples: fmt(data.n_samples, 0),
    n_asteroids: fmt(data.n_asteroids, 0),
    recall: fmt(data.metrics.recall, 2)
  };
  root.querySelectorAll('[data-ml-field]').forEach((el) => {
    const v = fields[el.dataset.mlField];
    if (v !== undefined) el.textContent = v;
  });

  // A frase "deixa passar mais da metade" só vale com recall abaixo de 0,5.
  root.querySelectorAll('[data-ml-recall-low]').forEach(el => { el.hidden = !(data.metrics.recall < 0.5); });

  const rows = [
    { name: { pt: 'Random Forest (modelo)', en: 'Random Forest (model)' }, m: data.metrics },
    { name: { pt: 'Regressão logística', en: 'Logistic regression' }, m: data.baselines.logistic_regression },
    { name: { pt: 'Classe majoritária', en: 'Majority class' }, m: data.baselines.majority }
  ];
  const body = document.getElementById('ml-table-body');
  if (body) {
    body.replaceChildren(...rows.map(({ name, m }) => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.scope = 'row';
      th.textContent = name[PAGE_LANG];
      tr.append(th);
      ['precision', 'recall', 'f1', 'pr_auc'].forEach((k) => {
        const td = document.createElement('td');
        td.textContent = fmt(m[k], 2);
        tr.append(td);
      });
      return tr;
    }));
  }
}

// ─── Inicialização ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateCopyrightYear();
  checkNavOverflow();
  initMobileMenu();
  initReveal();
  applyFlags();
  initCvMenus();
  loadAstraeaData();
  loadAstraeaModel();
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
