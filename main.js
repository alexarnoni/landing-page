/**
 * main.js — alexarnoni.com
 *
 * 5 funcionalidades:
 *   1. Copyright dinâmico
 *   2. Nav overflow (+ debounce)
 *   3. Mobile menu toggle
 *   4. Reveal animation (IntersectionObserver)
 *   5. Astraea live data (API → painel NEO Feed)
 */

// ─── Utilitários ────────────────────────────────────────────

/**
 * Debounce genérico — adia a execução de `func` até que
 * `wait` ms tenham passado sem nova chamada.
 */
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

/** Atualiza todos os elementos .js-year com o ano corrente. */
function updateCopyrightYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = year;
  });
}

// ─── 2. Nav Overflow ────────────────────────────────────────

/**
 * Verifica se os itens de navegação cabem na largura disponível.
 * Adiciona/remove a classe `nav-overflow` no <html> conforme necessário.
 */
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

/** Inicializa o toggle do menu mobile com acessibilidade completa. */
function initMobileMenu() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (!toggle || !menu) return;

  const MOBILE_BREAKPOINT = 768;

  /** Define o estado aberto/fechado do menu e atualiza atributos ARIA. */
  const setMenuState = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  // Toggle ao clicar no botão
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      toggle.focus();
    }
  });

  // Fecha ao clicar em link dentro do menu (mobile)
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      setMenuState(false);
    }
  });

  // Resize: reseta estado ao sair do breakpoint mobile
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

/**
 * Observa elementos com classe `.reveal` e adiciona `.visible`
 * quando entram no viewport.
 */
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

/**
 * Busca dados da API Astraea e atualiza o painel NEO Feed
 * e as stats. Fallback silencioso se a API estiver fora.
 */
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

    // Stats
    document.getElementById('stat-asteroids').textContent = stats.total_asteroids;
    document.getElementById('stat-hazardous').textContent = stats.hazardous_count;
    document.getElementById('stat-solar').textContent = stats.total_solar_events;

    // Painel — 4 mais próximos por miss_distance_km
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
    // falha silenciosa — fallback já está no HTML
    console.warn('[Astraea] API indisponível, usando fallback.');
  }
}

// ─── Inicialização ─────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  updateCopyrightYear();
  checkNavOverflow();
  initMobileMenu();
  initReveal();
  loadAstraeaData();
});

// Reinicializa após injeção dos partials (header/footer)
document.addEventListener('partials:ready', () => {
  updateCopyrightYear();
  checkNavOverflow();
  initMobileMenu();
  initReveal();
});

// Nav overflow no resize (debounced)
window.addEventListener('resize', debouncedCheckNavOverflow);
