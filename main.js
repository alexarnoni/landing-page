// pequeno script para parallax e flicker — mantém vida no teaser
(() => {
  let initialized = false;
  function init() {
    if (initialized) return;

    const grid = document.querySelector('.grid');
    const scanner = document.querySelector('.scanner');
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navMenu = document.querySelector('[data-nav-menu]');

    if(!navToggle || !navMenu){
      return;
    }

    initialized = true;

    const MOBILE_BREAKPOINT = 768;

    // leve parallax com o mouse para a grade
    if(grid){
      const onMove = (ev) => {
        const x = (ev.clientX / window.innerWidth - 0.5) * 10; // -5..5
        const y = (ev.clientY / window.innerHeight - 0.5) * 6; // -3..3
        grid.style.transform = `perspective(800px) rotateX(${66 + y}deg) translateY(${18 + y * 2}vh) rotateZ(${x/40}deg) scaleY(0.6)`;
      };

      // reduz movimento se usuário preferir
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if(!mq.matches){
        window.addEventListener('mousemove', onMove);
      }
    }

    // menu responsivo acessível
    if(navToggle && navMenu){
      const focusableItems = () => Array.from(navMenu.querySelectorAll('a'));

      const setMenuState = (open) => {
        navMenu.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');

        if(window.innerWidth <= MOBILE_BREAKPOINT){
          navMenu.setAttribute('aria-hidden', String(!open));
          navMenu.toggleAttribute('data-menu-hidden', !open);
          if(open){
            const [firstItem] = focusableItems();
            if(firstItem){
              firstItem.focus();
            }
          }
        } else {
          navMenu.removeAttribute('aria-hidden');
          navMenu.removeAttribute('data-menu-hidden');
        }
      };

      setMenuState(false);

      navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        setMenuState(!isOpen);
      });

      navMenu.addEventListener('click', (event) => {
        if(window.innerWidth > MOBILE_BREAKPOINT) return;
        if(event.target instanceof Element && event.target.closest('a')){
          setMenuState(false);
        }
      });

      navMenu.addEventListener('keydown', (event) => {
        if(event.key === 'Escape'){
          setMenuState(false);
          navToggle.focus();
        }
      });

      document.addEventListener('keydown', (event) => {
        if(event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true'){
          setMenuState(false);
          navToggle.focus();
        }
      });

      window.addEventListener('resize', () => {
        if(window.innerWidth > MOBILE_BREAKPOINT){
          navMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Abrir menu');
          navMenu.removeAttribute('aria-hidden');
          navMenu.removeAttribute('data-menu-hidden');
        } else {
          const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
          navMenu.setAttribute('aria-hidden', String(!isOpen));
          navMenu.toggleAttribute('data-menu-hidden', !isOpen);
        }
      });
    }

    // flicker ocasional no brilho (apenas para dar vida)
    function flicker(){
      if(!scanner) return;
      if(Math.random() < 0.14){
        const prev = scanner.style.filter || '';
        scanner.style.filter = 'drop-shadow(0 0 28px rgba(255,255,255,0.5))';
        setTimeout(()=> scanner.style.filter = prev, 140 + Math.random()*360);
      }
    }
    setInterval(flicker, 2400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  }

  document.addEventListener('partials:ready', init);
})();

// === Intelligent Nav Toggle: Show hamburger only when items overflow ===
function checkNavOverflow() {
  const navContainer = document.querySelector('.nav-container');
  const siteNav = document.querySelector('.site-nav');
  const brand = document.querySelector('.brand');
  const navToggle = document.querySelector('.nav-toggle');

  if (!navContainer || !siteNav || !brand || !navToggle) return;

  // Temporarily remove overflow class to get accurate natural measurements
  const hadOverflow = document.documentElement.classList.contains('nav-overflow');
  document.documentElement.classList.remove('nav-overflow');

  // Force reflow so measurements reflect the non-overflow state
  void navContainer.offsetWidth;

  const containerWidth = navContainer.offsetWidth;
  const brandWidth = brand.offsetWidth;
  const gaps = 48; // gap spacing
  const availableSpace = containerWidth - brandWidth - gaps;

  // Measure nav items at their natural width (no toggle taking space)
  const navWidth = siteNav.scrollWidth;

  if (navWidth > availableSpace) {
    document.documentElement.classList.add('nav-overflow');
  } else {
    // Keep removed (already done above)
    if (hadOverflow) {
      // was overflow before, now it's not — menu should close
      const toggle = navToggle;
      if (toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        siteNav.classList.remove('is-open');
        siteNav.setAttribute('aria-hidden', 'true');
        siteNav.toggleAttribute('data-menu-hidden', true);
      }
    }
  }
}

// Debounce function for performance
function debounce(func, wait) {
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

// Initialize on DOM ready and after partials are injected
let navOverflowInitialized = false;

function initNavOverflow() {
  checkNavOverflow();
  if (!navOverflowInitialized) {
    navOverflowInitialized = true;
    window.addEventListener('resize', debounce(checkNavOverflow, 150));
  }
}

document.addEventListener('DOMContentLoaded', initNavOverflow);
document.addEventListener('partials:ready', initNavOverflow);

// === Cursor customizado — ativo em todas as páginas ===
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let mx = 0, my = 0, rx = 0, ry = 0, started = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    if (!started) { started = true; rx = mx; ry = my; }
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
}

document.addEventListener('partials:ready', initCursor);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initCursor();
}
