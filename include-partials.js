(async () => {
  async function inject(id, url) {
    const host = document.querySelector(`[data-include="${id}"]`);
    if (!host) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
      let html = await res.text();

      // Language toggle: patch the header HTML before injecting
      if (id === 'header') {
        const path = location.pathname;
        const isEn = path.startsWith('/en/') || path === '/en';
        if (isEn) {
          const ptHref = (path === '/en/' || path === '/en') ? '/' : path.replace('/en/', '/');
          html = html.replace(
            '<a href="/en/" id="lang-link" class="lang-link">EN</a>',
            '<a href="' + ptHref + '" id="lang-link" class="lang-link">PT</a>'
          );
        } else {
          const enHref = '/en/' + path.replace(/^\//, '');
          html = html.replace(
            '<a href="/en/" id="lang-link" class="lang-link">EN</a>',
            '<a href="' + enHref + '" id="lang-link" class="lang-link">EN</a>'
          );
        }
      }

      // Localiza textos e links do header nas páginas em inglês
      if (id === 'header' && (location.pathname.startsWith('/en/') || location.pathname === '/en')) {
        const EN_PAGES = ['apuracao', 'encore', 'acervo', 'astraea', 'olheiro', 'bot', 'about'];
        const tpl = document.createElement('template');
        tpl.innerHTML = html;
        tpl.content.querySelectorAll('[data-en]').forEach((el) => { el.textContent = el.dataset.en; });
        tpl.content.querySelectorAll('a[href^="/"]').forEach((a) => {
          const href = a.getAttribute('href');
          if (href === '/en' || href.startsWith('/en/')) return;
          const seg = href.replace(/^\//, '').split(/[/#]/)[0];
          if (href === '/' || EN_PAGES.includes(seg) || href.startsWith('/#')) {
            a.setAttribute('href', '/en' + href);
          }
        });
        html = tpl.innerHTML;
      }

      host.outerHTML = html;
    } catch (e) {
      console.error(`[partials] ${id} error:`, e);
    }
  }

  await Promise.all([
    inject('header', '/partials/header.html'),
    inject('footer', '/partials/footer.html'),
  ]);

  // Destaca link ativo
  const nav = document.querySelector('.site-nav .nav-list');
  if (nav) {
    const here = location.pathname.replace(/\/+$/, '') || '/';
    nav.querySelectorAll('a[href]').forEach(a => {
      const norm = (a.getAttribute('href') || '').replace(/\/+$/, '') || '/';
      if (norm === here || (norm !== '/' && here.startsWith(norm))) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  document.dispatchEvent(new CustomEvent('partials:ready'));
})();
