# REDESIGN.md — alexarnoni.com hub

## ESCOPO
Arquivos a modificar:
- index.html
- styles.css
- favicon.svg
- assets/og-home.svg
- partials/header.html (apenas override via CSS no styles.css)
- 404.html

NÃO modificar:
- about/, astraea/, olheiro/, bot/, finance/, aenvar/
- partials/footer.html
- main.js, include-partials.js
- _headers, _redirects, sitemap.xml, robots.txt

---

## 1. FAVICON — favicon.svg

Substituir o conteúdo completo por:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#F8F8FA"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
    font-family="monospace" font-size="13" font-weight="700"
    letter-spacing="1" fill="#2B2B59">AA</text>
</svg>
```

---

## 2. OG IMAGE — assets/og-home.svg

Substituir o conteúdo completo por:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F8F8FA"/>
  <g stroke="#555584" stroke-opacity="0.06" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="200" y1="0" x2="200" y2="630"/>
    <line x1="400" y1="0" x2="400" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="800" y1="0" x2="800" y2="630"/>
    <line x1="1000" y1="0" x2="1000" y2="630"/>
  </g>
  <rect x="80" y="80" width="60" height="3" fill="#555584"/>
  <text x="80" y="140" font-family="monospace" font-size="14" fill="#555584" letter-spacing="4" opacity="0.7">ANALISTA &amp; ENGENHEIRO DE DADOS</text>
  <text x="80" y="270" font-family="sans-serif" font-size="96" font-weight="800" fill="#101033" letter-spacing="-3">ALEXANDRE</text>
  <text x="80" y="370" font-family="sans-serif" font-size="96" font-weight="800" fill="none" stroke="#555584" stroke-width="1.5" letter-spacing="-3">ARNONI</text>
  <text x="80" y="440" font-family="monospace" font-size="20" fill="#B2B2D9" letter-spacing="1">Python · FastAPI · dbt Core · PostgreSQL · Power BI</text>
  <text x="80" y="540" font-family="monospace" font-size="16" fill="#555584" opacity="0.5" letter-spacing="2">alexarnoni.com</text>
</svg>
```

---

## 3. LIMPEZA — styles.css

Remover completamente os seguintes blocos do styles.css:
- O bloco `/* === Hub Page (index) — retro-futurista */` e todo o CSS do `.hub-page` até o fim do arquivo
- A media query `@media (hover: hover) and (pointer: fine)` que aplica `cursor: none`
- O bloco `/* === Cursores por página */` completo

NÃO remover nada mais. Manter intactos: globals, .about-page, .finance-page, .bot-page, .aenvar-page, .olheiro-page, .astraea-page, footer, nav.

Após a limpeza, adicionar ao final do styles.css:

```css
/* === Hub Page — novo design índigo ===================================== */
.hub-page {
  --c-bg:              #F8F8FA;
  --c-bg-card:         #ffffff;
  --c-bg-dark:         #2B2B59;
  --c-text:            #101033;
  --c-text-mid:        #444466;
  --c-text-dim:        #666688;
  --c-text-muted:      #888888;
  --c-accent:          #555584;
  --c-soft:            #B2B2D9;
  --c-border:          #e2e2ec;
  --c-surface:         #f5f5fa;
  --c-hover:           #fafafc;
  --c-badge-high-bg:   #fde8e8;
  --c-badge-high-text: #b82020;
  --c-badge-mid-bg:    #fff4e0;
  --c-badge-mid-text:  #b85c00;
  --c-badge-low-bg:    #e8f5ee;
  --c-badge-low-text:  #1a7a45;
  --c-live:            #2d9a5f;

  background: var(--c-bg);
  color: var(--c-text);
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  padding-top: var(--header-height);
}

/* Header */
.hub-page .site-header {
  background: rgba(248,248,250,0.96);
  border-bottom: 1px solid var(--c-border);
  backdrop-filter: blur(16px);
}
.hub-page .brand {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: -0.5px;
  color: var(--c-text);
  text-transform: none;
}
.hub-page .brand:hover { color: var(--c-accent); }
.hub-page .nav-list a {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--c-text-muted);
  letter-spacing: 0;
  text-transform: none;
  opacity: 1;
  font-weight: 400;
}
.hub-page .nav-list a:hover,
.hub-page .nav-list a[aria-current="page"] {
  color: var(--c-text);
  border-bottom: none;
}
.hub-page .nav-overflow .site-nav {
  background: rgba(248,248,250,0.97);
  border-color: var(--c-border);
  box-shadow: 0 18px 26px rgba(0,0,0,0.08);
}
.hub-page .nav-pill {
  border-color: var(--c-border);
  background: var(--c-bg);
  color: var(--c-text);
}
.hub-page .nav-pill:hover { border-color: var(--c-accent); }

/* Footer */
.hub-page .site-footer {
  background: var(--c-bg);
  border-top-color: var(--c-border);
}
.hub-page .footer-copy,
.hub-page .site-tagline {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--c-soft);
  letter-spacing: 0.5px;
  font-style: normal;
}
.hub-page .footer-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--c-soft);
  letter-spacing: 0.5px;
  border: none;
  min-height: unset;
}
.hub-page .footer-link:hover {
  color: var(--c-accent);
  background: transparent;
  border-color: transparent;
}

/* Reveal */
.hub-page .reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.hub-page .reveal.visible {
  opacity: 1;
  transform: none;
}
```

---

## 4. index.html — SUBSTITUIR COMPLETAMENTE

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Alexandre Arnoni — Analista & Engenheiro de Dados</title>
<meta name="description" content="Analista e engenheiro de dados. Construo pipelines, APIs e dashboards do dado bruto ao deploy.">
<meta property="og:title" content="Alexandre Arnoni — Analista & Engenheiro de Dados">
<meta property="og:description" content="Analista e engenheiro de dados. Construo pipelines, APIs e dashboards do dado bruto ao deploy.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://alexarnoni.com/">
<meta property="og:image" content="https://alexarnoni.com/assets/og-home.svg">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="preload" href="/styles.css" as="style">
<link rel="stylesheet" href="/styles.css">
<style>
html { scroll-behavior: smooth; }

.hub-wrap { max-width: 960px; margin: 0 auto; padding: 0 2.5rem; }

/* Hero */
.hub-hero { padding: 5rem 0 4rem; display: grid; grid-template-columns: 1fr 360px; gap: 4rem; align-items: start; border-bottom: 1px solid var(--c-border); }
.hub-hero-tag { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--c-accent); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; }
.hub-hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c-accent); flex-shrink: 0; }
.hub-hero-loc { color: var(--c-soft); }
.hub-hero-name { font-size: clamp(2.8rem,6vw,4.2rem); font-weight: 800; line-height: 0.95; letter-spacing: -3px; color: var(--c-bg-dark); margin-bottom: 1.75rem; }
.hub-hero-desc { font-size: 1rem; line-height: 1.75; color: var(--c-text-mid); max-width: 460px; margin-bottom: 2.5rem; letter-spacing: -0.1px; }
.hub-hero-ctas { display: flex; gap: 12px; margin-bottom: 3rem; }
.hub-btn-p { background: var(--c-text); color: var(--c-bg); font-size: 13px; font-weight: 500; padding: 10px 22px; border-radius: 980px; border: none; cursor: pointer; text-decoration: none; display: inline-block; transition: background 0.2s; }
.hub-btn-p:hover { background: var(--c-bg-dark); color: var(--c-bg); }
.hub-btn-s { background: transparent; color: var(--c-text); font-size: 13px; font-weight: 500; padding: 10px 22px; border-radius: 980px; border: 1px solid var(--c-border); cursor: pointer; text-decoration: none; display: inline-block; transition: border-color 0.2s, color 0.2s; }
.hub-btn-s:hover { border-color: var(--c-accent); color: var(--c-accent); }
.hub-about { padding-top: 2rem; border-top: 1px solid var(--c-border); max-width: 460px; }
.hub-about-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--c-soft); margin-bottom: 8px; }
.hub-about-text { font-size: 13px; color: var(--c-text-dim); line-height: 1.7; }

/* Painel Astraea */
.hub-panel { background: var(--c-bg-card); border-radius: 16px; border: 1px solid var(--c-border); overflow: hidden; }
.hub-panel-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid var(--c-border); }
.hub-panel-title { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--c-text-muted); letter-spacing: 1.5px; text-transform: uppercase; }
.hub-panel-live { display: flex; align-items: center; gap: 5px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--c-live); }
.hub-live-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--c-live); }
.hub-panel-row { display: grid; grid-template-columns: 1fr auto auto; gap: 12px; align-items: center; padding: 0.65rem 1.25rem; border-bottom: 1px solid var(--c-hover); }
.hub-panel-row:last-child { border-bottom: none; }
.hub-panel-obj { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--c-text); }
.hub-panel-dist { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--c-soft); }
.hub-badge { font-family: 'JetBrains Mono', monospace; font-size: 9px; padding: 2px 7px; border-radius: 4px; font-weight: 500; letter-spacing: 0.5px; }
.hub-badge-low  { background: var(--c-badge-low-bg);  color: var(--c-badge-low-text); }
.hub-badge-mid  { background: var(--c-badge-mid-bg);  color: var(--c-badge-mid-text); }
.hub-badge-high { background: var(--c-badge-high-bg); color: var(--c-badge-high-text); }
.hub-panel-footer { padding: 0.75rem 1.25rem; border-top: 1px solid var(--c-border); background: var(--c-hover); }
.hub-panel-link { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--c-accent); text-decoration: none; }

/* Stats */
.hub-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--c-border); border-radius: 12px; overflow: hidden; margin-top: 1px; }
.hub-stat { background: var(--c-bg); padding: 1rem 1.25rem; }
.hub-stat-val { font-size: 1.3rem; font-weight: 800; color: var(--c-bg-dark); letter-spacing: -1px; margin-bottom: 2px; }
.hub-stat-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--c-soft); letter-spacing: 0.5px; text-transform: uppercase; }

/* Seções */
.hub-section { padding: 4rem 0; border-bottom: 1px solid var(--c-border); }
.hub-section:last-of-type { border-bottom: none; }
.hub-sec-head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 2.5rem; }
.hub-sec-num { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--c-soft); letter-spacing: 2px; }
.hub-sec-title { font-size: 1.5rem; font-weight: 800; letter-spacing: -1px; color: var(--c-text); font-family: 'Inter', sans-serif; }

/* Projetos */
.hub-proj-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--c-border); border-radius: 16px; overflow: hidden; }
.hub-proj-card { background: var(--c-bg-card); padding: 1.75rem; cursor: pointer; transition: background 0.15s; display: flex; flex-direction: column; text-decoration: none; color: inherit; }
.hub-proj-card:hover { background: var(--c-hover); }
.hub-proj-card:hover .hub-proj-link { opacity: 1; }
.hub-proj-main { background: var(--c-bg-dark); }
.hub-proj-main:hover { background: #333370; }
.hub-proj-tag { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--c-accent); margin-bottom: 0.75rem; }
.hub-proj-tag-main { color: var(--c-soft); }
.hub-proj-name { font-size: 1.1rem; font-weight: 700; letter-spacing: -0.5px; color: var(--c-text); margin-bottom: 0.5rem; font-family: 'Inter', sans-serif; }
.hub-proj-name-main { color: #ffffff; }
.hub-proj-desc { font-size: 12px; color: var(--c-text-muted); line-height: 1.65; margin-bottom: 1.25rem; flex: 1; }
.hub-proj-desc-main { color: #9999bb; }
.hub-proj-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--c-border); }
.hub-proj-footer-main { border-top-color: rgba(255,255,255,0.08); }
.hub-proj-stack { display: flex; gap: 6px; flex-wrap: wrap; }
.hub-proj-pill { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--c-text-muted); background: var(--c-surface); padding: 3px 8px; border-radius: 4px; }
.hub-proj-pill-main { color: #9999bb; background: rgba(255,255,255,0.08); }
.hub-proj-link { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--c-accent); opacity: 0; transition: opacity 0.15s; white-space: nowrap; margin-left: 8px; text-decoration: none; }
.hub-proj-link-main { color: var(--c-soft); }

/* Experiência */
.hub-exp-table { width: 100%; border-collapse: collapse; }
.hub-exp-table tr { border-bottom: 1px solid var(--c-border); }
.hub-exp-table tr:last-child { border-bottom: none; }
.hub-exp-table td { padding: 1.25rem 0; vertical-align: top; }
.hub-exp-date { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--c-soft); width: 180px; padding-top: 3px; }
.hub-exp-role { font-size: 15px; font-weight: 600; color: var(--c-text); letter-spacing: -0.3px; margin-bottom: 3px; }
.hub-exp-org { font-size: 12px; color: var(--c-soft); font-family: 'JetBrains Mono', monospace; }

/* Stack */
.hub-stack-group { margin-top: 1.25rem; }
.hub-stack-group:first-child { margin-top: 0; }
.hub-stack-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--c-soft); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
.hub-stack-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.hub-stack-pill { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--c-accent); border: 1px solid var(--c-border); padding: 6px 14px; border-radius: 8px; background: var(--c-bg-card); }

/* Contato */
.hub-contact-desc { font-size: 13px; color: var(--c-text-dim); line-height: 1.7; max-width: 480px; margin-bottom: 1.5rem; }
.hub-contact-links { display: flex; gap: 12px; flex-wrap: wrap; }
.hub-contact-link { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: var(--c-text); border: 1px solid var(--c-border); padding: 10px 20px; border-radius: 980px; background: var(--c-bg-card); text-decoration: none; transition: border-color 0.15s, color 0.15s; }
.hub-contact-link:hover { border-color: var(--c-accent); color: var(--c-accent); }
.hub-contact-icon { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--c-soft); }

/* Footer */
.hub-footer { padding: 2rem 0; display: flex; justify-content: space-between; align-items: center; }
.hub-footer span { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--c-soft); }

/* Responsivo */
@media (max-width: 768px) {
  .hub-hero { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 0 2rem; }
  .hub-hero-right { display: none; }
  .hub-proj-grid { grid-template-columns: 1fr; }
  .hub-wrap { padding: 0 1.25rem; }
  .hub-section { padding: 3rem 0; }
}
</style>
</head>
<body class="hub-page">

<div data-include="header"></div>

<div class="hub-wrap">

  <!-- HERO -->
  <div class="hub-hero reveal">
    <div>
      <div class="hub-hero-tag">
        <span class="hub-hero-dot"></span>
        <span>Analista & engenheiro de dados</span>
        <span class="hub-hero-loc">· São Paulo, BR</span>
      </div>
      <h1 class="hub-hero-name">Alexandre<br>Arnoni</h1>
      <p class="hub-hero-desc">Construo pipelines, APIs e dashboards — do dado bruto ao deploy. Trabalho com dados públicos de 350 mil pessoas durante o dia e monitoro asteroides com a NASA à noite.</p>
      <div class="hub-hero-ctas">
        <a href="#projetos" class="hub-btn-p">Ver projetos</a>
        <a href="#contato" class="hub-btn-s">Falar comigo</a>
      </div>
      <div class="hub-about">
        <div class="hub-about-label">sobre</div>
        <p class="hub-about-text">Formado em Comércio Exterior, Técnico em Informática, cursando Ciência de Dados. Uma trajetória que mistura visão de negócio, dados e código.</p>
      </div>
    </div>

    <div class="hub-hero-right">
      <div class="hub-panel">
        <div class="hub-panel-header">
          <span class="hub-panel-title">Astraea · NEO Feed</span>
          <span class="hub-panel-live"><span class="hub-live-dot"></span>live</span>
        </div>
        <div class="hub-panel-row">
          <span class="hub-panel-obj">2024 YR4</span>
          <span class="hub-panel-dist">0.0031 AU</span>
          <span class="hub-badge hub-badge-high">ALTO</span>
        </div>
        <div class="hub-panel-row">
          <span class="hub-panel-obj">2023 BU</span>
          <span class="hub-panel-dist">0.0142 AU</span>
          <span class="hub-badge hub-badge-mid">MÉDIO</span>
        </div>
        <div class="hub-panel-row">
          <span class="hub-panel-obj">2021 QM1</span>
          <span class="hub-panel-dist">0.0287 AU</span>
          <span class="hub-badge hub-badge-low">BAIXO</span>
        </div>
        <div class="hub-panel-row">
          <span class="hub-panel-obj">2020 NK1</span>
          <span class="hub-panel-dist">0.0094 AU</span>
          <span class="hub-badge hub-badge-high">ALTO</span>
        </div>
        <div class="hub-panel-footer">
          <a href="https://astraea.alexarnoni.com" class="hub-panel-link" target="_blank" rel="noopener noreferrer">→ astraea.alexarnoni.com</a>
        </div>
      </div>
      <div class="hub-stats">
        <div class="hub-stat">
          <div class="hub-stat-val">1.4k+</div>
          <div class="hub-stat-label">asteroides</div>
        </div>
        <div class="hub-stat">
          <div class="hub-stat-val">4</div>
          <div class="hub-stat-label">projetos</div>
        </div>
        <div class="hub-stat">
          <div class="hub-stat-val">11+</div>
          <div class="hub-stat-label">anos</div>
        </div>
      </div>
    </div>
  </div>

  <!-- PROJETOS -->
  <section id="projetos" class="hub-section">
    <div class="hub-sec-head reveal">
      <span class="hub-sec-num">01 —</span>
      <span class="hub-sec-title">Projetos</span>
    </div>
    <div class="hub-proj-grid reveal">
      <a href="/astraea/" class="hub-proj-card hub-proj-main">
        <div class="hub-proj-tag hub-proj-tag-main">⬡ Projeto principal</div>
        <div class="hub-proj-name hub-proj-name-main">Astraea</div>
        <div class="hub-proj-desc hub-proj-desc-main">Pipeline end-to-end de monitoramento de asteroides. NASA APIs, dbt Core, Random Forest, API pública REST com 1.400+ objetos catalogados.</div>
        <div class="hub-proj-footer hub-proj-footer-main">
          <div class="hub-proj-stack">
            <span class="hub-proj-pill hub-proj-pill-main">FastAPI</span>
            <span class="hub-proj-pill hub-proj-pill-main">dbt Core</span>
            <span class="hub-proj-pill hub-proj-pill-main">scikit-learn</span>
          </div>
          <a href="https://astraea.alexarnoni.com" class="hub-proj-link hub-proj-link-main" target="_blank" rel="noopener noreferrer">astraea.alexarnoni.com →</a>
        </div>
      </a>
      <a href="/olheiro/" class="hub-proj-card">
        <div class="hub-proj-tag">⬡ Projeto ativo</div>
        <div class="hub-proj-name">Olheiro</div>
        <div class="hub-proj-desc">Scouting e análise do Brasileirão. Rankings por posição, radar charts e modelo Garimpo para talentos subvalorizados.</div>
        <div class="hub-proj-footer">
          <div class="hub-proj-stack">
            <span class="hub-proj-pill">FastAPI</span>
            <span class="hub-proj-pill">PostgreSQL</span>
            <span class="hub-proj-pill">Docker</span>
          </div>
          <a href="https://scout.alexarnoni.com" class="hub-proj-link" target="_blank" rel="noopener noreferrer">scout.alexarnoni.com →</a>
        </div>
      </a>
      <a href="/bot/" class="hub-proj-card">
        <div class="hub-proj-tag">⬡ Em desenvolvimento</div>
        <div class="hub-proj-name">EV+ Sports Analyzer</div>
        <div class="hub-proj-desc">Análise de valor esperado em 200+ ligas esportivas. Alertas automáticos via Telegram, scheduler a cada 2 minutos.</div>
        <div class="hub-proj-footer">
          <div class="hub-proj-stack">
            <span class="hub-proj-pill">Python</span>
            <span class="hub-proj-pill">Odds API</span>
            <span class="hub-proj-pill">Telegram</span>
          </div>
          <a href="/bot/" class="hub-proj-link">alexarnoni.com/bot →</a>
        </div>
      </a>
      <a href="/finance/" class="hub-proj-card">
        <div class="hub-proj-tag">⬡ Arquitetural</div>
        <div class="hub-proj-name">Luro Finance</div>
        <div class="hub-proj-desc">App financeiro completo. Magic link, CSRF duplo, rate limiting persistente, importador CSV/OFX e categorização via LLM.</div>
        <div class="hub-proj-footer">
          <div class="hub-proj-stack">
            <span class="hub-proj-pill">FastAPI</span>
            <span class="hub-proj-pill">PostgreSQL</span>
            <span class="hub-proj-pill">LLM</span>
          </div>
          <a href="/finance/" class="hub-proj-link">alexarnoni.com/finance →</a>
        </div>
      </a>
    </div>
  </section>

  <!-- EXPERIÊNCIA -->
  <section id="experiencia" class="hub-section">
    <div class="hub-sec-head reveal">
      <span class="hub-sec-num">02 —</span>
      <span class="hub-sec-title">Experiência</span>
    </div>
    <table class="hub-exp-table reveal">
      <tr>
        <td class="hub-exp-date">Jan 2025 — presente</td>
        <td>
          <div class="hub-exp-role">Analista de Dados</div>
          <div class="hub-exp-org">Prefeitura de Praia Grande · CIDE</div>
        </td>
      </tr>
      <tr>
        <td class="hub-exp-date">Mar 2022 — Dez 2024</td>
        <td>
          <div class="hub-exp-role">Chefe de Seção — Compensação Previdenciária</div>
          <div class="hub-exp-org">Prefeitura de Praia Grande</div>
        </td>
      </tr>
      <tr>
        <td class="hub-exp-date">Dez 2014 — Fev 2022</td>
        <td>
          <div class="hub-exp-role">Agente Administrativo</div>
          <div class="hub-exp-org">FPGPREV · Praia Grande</div>
        </td>
      </tr>
    </table>
  </section>

  <!-- STACK -->
  <section id="stack" class="hub-section">
    <div class="hub-sec-head reveal">
      <span class="hub-sec-num">03 —</span>
      <span class="hub-sec-title">Stack</span>
    </div>
    <div class="reveal">
      <div class="hub-stack-group">
        <div class="hub-stack-label">dados & pipelines</div>
        <div class="hub-stack-pills">
          <span class="hub-stack-pill">Python</span>
          <span class="hub-stack-pill">dbt Core</span>
          <span class="hub-stack-pill">PostgreSQL</span>
          <span class="hub-stack-pill">scikit-learn</span>
          <span class="hub-stack-pill">Power BI</span>
        </div>
      </div>
      <div class="hub-stack-group">
        <div class="hub-stack-label">apis & backend</div>
        <div class="hub-stack-pills">
          <span class="hub-stack-pill">FastAPI</span>
          <span class="hub-stack-pill">Docker</span>
          <span class="hub-stack-pill">APScheduler</span>
          <span class="hub-stack-pill">JavaScript</span>
        </div>
      </div>
      <div class="hub-stack-group">
        <div class="hub-stack-label">infra & deploy</div>
        <div class="hub-stack-pills">
          <span class="hub-stack-pill">Cloudflare</span>
          <span class="hub-stack-pill">Oracle VM</span>
          <span class="hub-stack-pill">Git</span>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTATO -->
  <section id="contato" class="hub-section">
    <div class="hub-sec-head reveal">
      <span class="hub-sec-num">04 —</span>
      <span class="hub-sec-title">Contato</span>
    </div>
    <p class="hub-contact-desc reveal">Aberto para oportunidades, freelances ou uma conversa sobre dados e projetos.</p>
    <div class="hub-contact-links reveal">
      <a href="https://github.com/alexarnoni" class="hub-contact-link" target="_blank" rel="noopener noreferrer">
        <span class="hub-contact-icon">gh</span>GitHub
      </a>
      <a href="https://linkedin.com/in/alexandrearnoni" class="hub-contact-link" target="_blank" rel="noopener noreferrer">
        <span class="hub-contact-icon">in</span>LinkedIn
      </a>
      <a href="mailto:alexandre.anf@gmail.com" class="hub-contact-link">
        <span class="hub-contact-icon">@</span>Email
      </a>
      <a href="https://medium.com/@alexarnoni" class="hub-contact-link" target="_blank" rel="noopener noreferrer">
        <span class="hub-contact-icon">✍</span>Medium
      </a>
    </div>
  </section>

  <footer class="hub-footer">
    <span>alexarnoni.com</span>
    <span>© 2026 Alexandre Arnoni</span>
  </footer>

</div>

<div data-include="footer"></div>

<script src="/include-partials.js"></script>
<script src="/main.js"></script>
<script>
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
</script>
</body>
</html>
```

---

## 5. 404.html — atualizar bloco `<style>` interno

Substituir todos os valores hardcoded no bloco `<style>` do 404.html:
- `#00ffe5` → `var(--c-accent)` ou `#555584`
- `#ff3c6e` → `#2B2B59`
- `#040810` → `#F8F8FA`
- `#c8dde8` → `#101033`
- `#7a9fb0` → `#B2B2D9`
- Remover `clip-path` do `.not-found-link`, substituir por `border-radius: 980px`
- Adicionar no `<body class="hub-page">` para herdar as variáveis CSS
