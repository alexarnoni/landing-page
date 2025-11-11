(async () => {
  async function inject(id, url) {
    const host = document.querySelector(`[data-include="${id}"]`);
    if (!host) return;
    try {
      const res = await fetch(url, { cache: 'no-cache' });
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

  document.dispatchEvent(new CustomEvent('partials:ready'));
})();
