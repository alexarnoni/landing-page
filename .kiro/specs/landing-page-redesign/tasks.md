# Plano de Implementação: Redesign da Landing Page

## Visão Geral

Reescrita completa do site alexarnoni.com — de múltiplos temas escuros com `<style>` inline para um design system unificado índigo claro. A implementação segue a ordem: CSS (design system) → JS (main.js limpo) → HTML (todas as páginas) → config (headers, sitemap) → validação final.

## Tarefas

- [x] 1. Reescrever styles.css com o design system unificado
  - [x] 1.1 Criar seções 1–2: Reset/base e tokens `:root`
    - Reescrever o arquivo `styles.css` do zero
    - Seção 1: box-sizing, body (padding-top, font-family Inter, background, color), reset de img/svg/a/ul/p/h1-h3, `.sr-skip`, `button:focus-visible, a:focus-visible`
    - Seção 2: todos os tokens no `:root` conforme design (--c-bg, --c-bg-card, --c-bg-dark, --c-text, --c-text-mid, --c-text-dim, --c-text-muted, --c-accent, --c-soft, --c-border, --c-surface, --c-hover, --c-live, badges, --header-height, --max-width)
    - _Requisitos: 1.1, 1.2, 1.3, 2.1_

  - [x] 1.2 Criar seções 3–4: Header e footer compartilhados
    - Seção 3: `.site-header` (fixo, blur, borda), `.nav-container`, `.brand` (Inter 700 15px), `.nav-list` (Inter 13px), `.nav-toggle`, `.nav-pill`, `.site-nav`, comportamento `.nav-overflow`
    - Seção 4: `.site-footer`, `.footer-inner`, `.footer-copy`, `.site-tagline`, `.footer-links`, `.footer-link`, `.footer-icon`
    - _Requisitos: 2.3, 2.4, 3.2_

  - [x] 1.3 Criar seções 5–6: Layout utilitários e reveal animation
    - Seção 5: `.hub-wrap` (max-width 960px), `.hub-section`, `.hub-sec-head`, `.hub-sec-num`, `.hub-sec-title`
    - Seção 6: `.reveal` (opacity 0, translateY 24px, transition 0.6s) e `.reveal.visible` (opacity 1, transform none)
    - _Requisitos: 2.1, 5.4_

  - [x] 1.4 Criar seção 7: Componentes do hub (index.html)
    - Hero: `.hub-hero`, `.hub-hero-tag`, `.hub-hero-dot`, `.hub-hero-loc`, `.hub-hero-name`, `.hub-hero-desc`, `.hub-hero-ctas`, `.hub-btn-p`, `.hub-btn-s`, `.hub-about`
    - Painel Astraea: `.hub-panel`, `.hub-panel-header`, `.hub-panel-row`, `.hub-badge`, `.hub-stats`, `.hub-stat`
    - Projetos: `.hub-proj-grid`, `.hub-proj-card`, `.hub-proj-main`, `.hub-proj-tag`, `.hub-proj-name`, `.hub-proj-desc`, `.hub-proj-footer`, `.hub-proj-pill`, `.hub-proj-link`
    - Experiência: `.hub-exp-table`, `.hub-exp-date`, `.hub-exp-role`, `.hub-exp-org`, `.hub-exp-desc`
    - Stack: `.hub-stack-group`, `.hub-stack-label`, `.hub-stack-pills`, `.hub-stack-pill`
    - Contato: `.hub-contact-desc`, `.hub-contact-links`, `.hub-contact-link`, `.hub-contact-icon`
    - Footer interno: `.hub-footer`
    - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [x] 1.5 Criar seção 8: Componentes de páginas de projeto
    - Classes genéricas reutilizáveis: `.proj-hero`, `.proj-tag`, `.proj-subtitle`, `.proj-cta-primary`, `.proj-cta-secondary`, `.proj-features`, `.proj-feature-grid`, `.proj-feature-card`, `.proj-feature-icon`, `.proj-stats-bar`, `.proj-stats-inner`, `.proj-stat-value`, `.proj-stat-label`, `.proj-stack`, `.proj-stack-badges`, `.proj-stack-badge`
    - _Requisitos: 2.2, 9.2, 9.3, 9.4, 9.5, 10.2, 10.3, 10.4, 10.5, 11.2, 11.3, 12.2, 12.3, 12.4_

  - [x] 1.6 Criar seções 9–11: Componentes about, aenvar e 404
    - Seção 9: `.about-hero`, `.about-hero-tag`, `.about-hero-dot`, `.about-hero-name`, `.about-hero-desc`, `.about-contact-links`, `.about-contact-link`, `.about-edu-grid`, `.about-edu-card`, `.about-edu-degree`, `.about-edu-name`, `.about-edu-inst`
    - Seção 10: `.aenvar-readings`, `.aenvar-reading-card`, `.aenvar-world-grid` (cards clicáveis com hover accent)
    - Seção 11: `.not-found-wrap`, `.not-found-code`, `.not-found-title`, `.not-found-desc`, `.not-found-link`
    - _Requisitos: 8.1, 8.2, 8.3, 8.4, 13.1, 13.3, 13.4, 14.1, 14.2_

  - [x] 1.7 Criar seção 12: Media queries consolidadas
    - `max-width: 768px`: hero single column, proj-grid single column, about-edu-grid single column, hub-wrap padding reduzido, exp-table layout block
    - `max-width: 480px`: ajustes de gap e padding
    - `min-width: 768px`: footer row layout
    - `min-width: 1024px`: nav-container padding maior
    - `prefers-reduced-motion: reduce`: desabilita animações e transições
    - _Requisitos: 2.1, 15.1_

- [x] 2. Reescrever main.js com as 4 funcionalidades
  - Reescrever `main.js` do zero com exatamente 4 funcionalidades:
  - (1) `updateCopyrightYear()` — seleciona `.js-year`, define ano atual, executa em DOMContentLoaded e partials:ready
  - (2) `checkNavOverflow()` + `debounce()` — mede container/brand/nav, adiciona/remove `.nav-overflow` no `<html>`, debounce 150ms no resize
  - (3) Mobile menu toggle — aria-expanded, aria-hidden, aria-label, classe .is-open, fecha com Escape, fecha ao clicar link, resize handler
  - (4) Reveal animation — IntersectionObserver observa `.reveal`, adiciona `.visible`, threshold 0.08, rootMargin '0px 0px -40px 0px', executa em DOMContentLoaded e partials:ready
  - Remover todo código de parallax, flicker, scanner, grid, matchMedia para parallax
  - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 3. Checkpoint — Verificar CSS e JS
  - Ensure all tests pass, ask the user if questions arise.
  - Verificar que `styles.css` não contém classes legadas (`.astraea-page`, `.olheiro-page`, `.bot-page`, `.finance-page`, `.aenvar-page`)
  - Verificar que `main.js` não contém referências a `.grid`, `.scanner`, `flicker`, `parallax`

- [x] 4. Reescrever index.html (página inicial)
  - Reescrever `index.html` seguindo o template base do design
  - `<body class="hub-page">`, sem `<style>` inline, sem `?v=2` no CSS
  - Fontes: apenas Inter (300–800) e JetBrains Mono (400–500)
  - Skip link, `data-include="header"`, `<main id="main">`
  - Hub-wrap com hero (grid 2col), seção projetos (grid 2×2 de `<a>`), seção experiência, seção stack, seção contato, hub-footer
  - Classe `.reveal` nos elementos que devem animar
  - Remover script inline do IntersectionObserver (agora no main.js)
  - _Requisitos: 3.1, 4.1, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 15.1, 15.3, 15.4, 18.1, 18.2_

- [x] 5. Reescrever about/index.html
  - Reescrever `about/index.html` seguindo o template base
  - `<body class="hub-page">`, sem `<style>` inline, sem `.about-page`
  - Hub-wrap com about-hero (tag, nome, desc, links), seção stack, seção experiência, seção formação (edu-grid), hub-footer
  - Classe `.reveal` nos elementos animáveis
  - Remover `<noscript>` com estilo inline
  - _Requisitos: 3.1, 4.1, 4.2, 8.1, 8.2, 8.3, 8.4, 15.1, 18.1, 18.2_

- [x] 6. Reescrever astraea/index.html
  - Reescrever `astraea/index.html` seguindo o template base
  - `<body class="hub-page">`, sem `<style>` inline, sem `.astraea-page`
  - Usar classes genéricas `.proj-hero`, `.proj-tag`, `.proj-feature-card`, `.proj-stats-bar`, `.proj-stack-badge`, etc.
  - Manter conteúdo: hero com NEO Feed visual, stats bar, features grid, stack badges
  - Remover `.cursor`, `.cursor-ring`, `<noscript>`, fontes extras (Orbitron, IBM Plex Mono, Share Tech Mono, etc.)
  - _Requisitos: 3.1, 4.1, 4.2, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 15.1, 15.3, 18.1, 18.2_

- [x] 7. Reescrever olheiro/index.html
  - Reescrever `olheiro/index.html` seguindo o template base
  - `<body class="hub-page">`, sem `<style>` inline, sem `.olheiro-page`
  - Usar classes genéricas de projeto
  - Manter conteúdo: hero com tabela de classificação, stats bar, features grid, stack badges
  - Remover `.cursor`, `.cursor-ring`, `<noscript>`, fontes extras (Barlow, Barlow Condensed, Rajdhani, etc.)
  - _Requisitos: 3.1, 4.1, 4.2, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 15.1, 18.1, 18.2_

- [x] 8. Reescrever bot/index.html
  - Reescrever `bot/index.html` seguindo o template base
  - `<body class="hub-page">`, sem `<style>` inline, sem `.bot-page`
  - Usar classes genéricas de projeto
  - Manter conteúdo: hero com CTA, features grid
  - Remover `.cursor`, `.cursor-ring`, `<noscript>`, `.bot-hero-visual`, `.bot-glow`, `.bot-grid`, fontes extras
  - _Requisitos: 3.1, 4.1, 4.2, 11.1, 11.2, 11.3, 15.1, 18.1, 18.2_

- [x] 9. Reescrever finance/index.html
  - Reescrever `finance/index.html` seguindo o template base
  - `<body class="hub-page">`, sem `<style>` inline, sem `.finance-page`
  - Usar classes genéricas de projeto
  - Manter conteúdo: hero com CTAs, features grid, stack badges, seção status
  - Remover `.cursor`, `.cursor-ring`, `<noscript>`, atributos `style` inline nos elementos, fontes extras
  - _Requisitos: 3.1, 4.1, 4.2, 12.1, 12.2, 12.3, 12.4, 12.5, 15.1, 18.1, 18.2_

- [x] 10. Reescrever aenvar/index.html
  - Reescrever `aenvar/index.html` seguindo o template base
  - `<body class="hub-page">`, sem `<style>` inline, sem `.aenvar-page`
  - Usar classes genéricas de projeto para hero e classes específicas aenvar para leituras/mundo
  - Manter conteúdo: hero com CTA Medium, seção leituras (cards `<a>` clicáveis), seção explorar mundo (cards informativos)
  - Remover `.cursor`, `.cursor-ring`, `<noscript>`, parágrafos com `style` inline, fontes extras (Cinzel Decorative, EB Garamond, etc.)
  - _Requisitos: 3.1, 4.1, 4.2, 13.1, 13.2, 13.3, 13.4, 15.1, 15.4, 18.1, 18.2_

- [x] 11. Reescrever 404.html
  - Reescrever `404.html` seguindo o template base
  - `<body class="hub-page">`, sem `<style>` inline
  - Usar classes do design system: `.not-found-wrap`, `.not-found-code`, `.not-found-title`, `.not-found-desc`, `.not-found-link`
  - Remover `?v=2` do href do CSS, fontes extras (Share Tech Mono, Cinzel Decorative, etc.)
  - _Requisitos: 3.1, 4.1, 14.1, 14.2, 18.1, 18.2_

- [x] 12. Checkpoint — Verificar todas as páginas HTML
  - Ensure all tests pass, ask the user if questions arise.
  - Verificar que nenhuma página contém blocos `<style>` inline
  - Verificar que todas as páginas têm `<body class="hub-page">`
  - Verificar que nenhuma página usa classes de body legadas

- [x] 13. Atualizar _headers e sitemap.xml
  - [x] 13.1 Atualizar `_headers`
    - Alterar cache do `styles.css` para `Cache-Control: no-store` (período de desenvolvimento)
    - Manter todos os headers de segurança existentes
    - _Requisitos: 17.1, 17.2_

  - [x] 13.2 Limpar `sitemap.xml`
    - Remover entradas referentes a `aenvar/world/` caso existam
    - Manter todas as outras entradas
    - _Requisitos: 17.4_

  - [x] 13.3 Verificar `_redirects`
    - Remover entradas de redirect referentes a `world/*` caso existam
    - _Requisitos: 17.3_

- [x] 14. Validação final
  - Ensure all tests pass, ask the user if questions arise.
  - Verificar que `include-partials.js`, `partials/header.html`, `partials/footer.html` e `favicon.svg` NÃO foram modificados
  - Verificar ausência de blocos `<style>` inline em todos os HTMLs
  - Verificar que todas as páginas usam `<body class="hub-page">`
  - Verificar que nenhuma página importa fontes além de Inter e JetBrains Mono
  - Verificar que `styles.css` não contém classes legadas de temas por página
  - Verificar que `main.js` não contém código de parallax/flicker/scanner
  - _Requisitos: 1.4, 3.1, 3.2, 3.3, 4.1, 4.2, 6.1, 6.2, 6.3, 6.4, 16.1_

## Notas

- Nenhuma tarefa é marcada como opcional — todas são essenciais para o redesign
- PBT não é aplicável (trabalho de UI/CSS, sem funções puras)
- Os arquivos `include-partials.js`, `partials/header.html`, `partials/footer.html` e `favicon.svg` são intocáveis
- Checkpoints garantem validação incremental entre as fases CSS → HTML → config
- Cada tarefa referencia requisitos específicos para rastreabilidade
