(async () => {
  async function inject(id, url) {
    const host = document.querySelector(`[data-include="${id}"]`);
    if (!host) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
      host.outerHTML = await res.text();
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

  // Language toggle PT/EN (defer to ensure DOM is updated after outerHTML)
  setTimeout(() => {
    const langLink = document.querySelector('.lang-link');
    if (!langLink) return;
    const path = location.pathname;
    const isEn = path.startsWith('/en/') || path === '/en';
    if (isEn) {
      langLink.textContent = 'PT';
      langLink.href = (path === '/en/' || path === '/en') ? '/' : path.replace('/en/', '/');
    } else {
      langLink.textContent = 'EN';
      langLink.href = '/en/' + path.replace(/^\//, '');
    }
  }, 0);

  document.dispatchEvent(new CustomEvent('partials:ready'));
})();
