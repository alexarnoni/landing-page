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
