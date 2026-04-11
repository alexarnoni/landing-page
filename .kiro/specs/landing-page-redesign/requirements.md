# Documento de Requisitos — Redesign da Landing Page

## Introdução

Redesign completo do site alexarnoni.com, substituindo o sistema visual atual (tema escuro medieval com múltiplos temas por página) por um design system unificado baseado no tema índigo claro do hub. O objetivo é eliminar CSS legado, blocos `<style>` inline, overrides de header/footer por página e temas visuais distintos por projeto — consolidando tudo em um único `styles.css` com tokens globais e classes genéricas reutilizáveis. O site é hospedado no Cloudflare Pages e faz deploy a partir da branch `main`.

## Glossário

- **Site**: O site estático alexarnoni.com, composto por páginas HTML, um CSS global, scripts JS e assets SVG.
- **Design_System**: Conjunto de CSS custom properties (tokens), tipografia, componentes e utilitários definidos no `:root` do `styles.css` e herdados por todas as páginas.
- **Hub_Page**: Qualquer página do site que utiliza `<body class="hub-page">` e herda os tokens do Design_System.
- **Página_de_Projeto**: Página dedicada a um projeto específico (Astraea, Olheiro, Bot, Finance, Aenvar), acessível via subdiretório.
- **Partials_System**: Mecanismo de injeção de header e footer via `include-partials.js`, que carrega `partials/header.html` e `partials/footer.html` em tempo de execução.
- **Reveal_Animation**: Animação de entrada baseada em `IntersectionObserver` que adiciona a classe `.visible` a elementos com classe `.reveal` quando entram no viewport.
- **Nav_Overflow**: Comportamento responsivo do menu de navegação que exibe o botão hambúrguer somente quando os itens do menu não cabem na largura disponível.
- **Tokens_Globais**: Variáveis CSS definidas no `:root` que controlam cores, espaçamentos, tipografia e dimensões em todo o site.
- **Styles_CSS**: Arquivo único `styles.css` na raiz do projeto que contém todos os estilos do site.
- **Main_JS**: Arquivo único `main.js` na raiz do projeto que contém todo o JavaScript comportamental do site.

## Requisitos

### Requisito 1: Design System Unificado com Tokens Globais

**User Story:** Como visitante do site, eu quero uma experiência visual consistente em todas as páginas, para que a navegação seja coesa e profissional.

#### Critérios de Aceitação

1. THE Design_System SHALL definir os seguintes tokens no `:root` do Styles_CSS: `--c-bg: #F8F8FA`, `--c-bg-card: #ffffff`, `--c-bg-dark: #2B2B59`, `--c-text: #101033`, `--c-text-mid: #444466`, `--c-text-dim: #666688`, `--c-text-muted: #888888`, `--c-accent: #555584`, `--c-soft: #B2B2D9`, `--c-border: #e2e2ec`, `--c-surface: #f5f5fa`, `--c-hover: #fafafc`, `--c-live: #2d9a5f`, `--c-badge-high-bg: #fde8e8`, `--c-badge-high-text: #b82020`, `--c-badge-mid-bg: #fff4e0`, `--c-badge-mid-text: #b85c00`, `--c-badge-low-bg: #e8f5ee`, `--c-badge-low-text: #1a7a45`, `--header-height: 4.25rem`, `--max-width: 960px`.
2. THE Design_System SHALL utilizar as fontes Inter (pesos 300–800) e JetBrains Mono (pesos 400–500) importadas via Google Fonts.
3. WHEN uma página do Site é carregada, THE Design_System SHALL aplicar os Tokens_Globais a todos os elementos via herança CSS a partir do `body.hub-page`.
4. THE Design_System SHALL manter um único arquivo Styles_CSS sem blocos de tema separados por página.

### Requisito 2: Arquivo CSS Único e Estruturado

**User Story:** Como desenvolvedor, eu quero um único arquivo CSS organizado por seções, para que a manutenção seja simples e previsível.

#### Critérios de Aceitação

1. THE Styles_CSS SHALL conter as seguintes seções na ordem especificada: (1) Reset e base, (2) Tokens no `:root`, (3) Header compartilhado, (4) Footer compartilhado, (5) Layout utilitários, (6) Reveal animation, (7) Componentes do hub, (8) Componentes de páginas de projeto, (9) Componentes da página `/about/`, (10) Componentes da página `/aenvar/`, (11) Media queries consolidadas.
2. THE Styles_CSS SHALL definir classes genéricas reutilizáveis para componentes de projeto (hero, tag, subtitle, cta, features, feature-grid, feature-card, stats bar, stack badges).
3. THE Styles_CSS SHALL incluir estilos para o header compartilhado com as classes `.site-header`, `.nav-container`, `.brand`, `.nav-list`, `.nav-toggle`, `.nav-pill`, `.site-nav` e comportamento de Nav_Overflow.
4. THE Styles_CSS SHALL incluir estilos para o footer compartilhado com as classes `.site-footer`, `.footer-inner`, `.footer-copy`, `.site-tagline`, `.footer-links`, `.footer-link`, `.footer-icon`.

### Requisito 3: Eliminação de Estilos Inline e Overrides por Página

**User Story:** Como desenvolvedor, eu quero que nenhuma página contenha blocos `<style>` inline ou overrides de header/footer, para que o design system seja a única fonte de verdade visual.

#### Critérios de Aceitação

1. THE Site SHALL renderizar todas as páginas sem blocos `<style>` dentro do `<head>` ou `<body>` de qualquer arquivo HTML.
2. THE Site SHALL renderizar header e footer com aparência idêntica em todas as páginas, sem overrides CSS específicos por página.
3. WHEN uma Página_de_Projeto é carregada, THE Site SHALL aplicar os mesmos Tokens_Globais do Design_System sem variáveis CSS sobrescritas por classe de body.

### Requisito 4: Todas as Páginas Usam body.hub-page

**User Story:** Como desenvolvedor, eu quero que todas as páginas usem a mesma classe de body, para que o design system funcione de forma uniforme.

#### Critérios de Aceitação

1. THE Site SHALL atribuir a classe `hub-page` ao elemento `<body>` de todas as páginas HTML (index, about, astraea, olheiro, bot, finance, aenvar, 404).
2. THE Site SHALL remover classes de body específicas por página (`.astraea-page`, `.olheiro-page`, `.bot-page`, `.finance-page`, `.aenvar-page`, `.about-page`) de todos os arquivos HTML.

### Requisito 5: JavaScript Limpo e Focado

**User Story:** Como desenvolvedor, eu quero que o Main_JS contenha apenas funcionalidades essenciais, para que o site seja leve e sem código legado.

#### Critérios de Aceitação

1. THE Main_JS SHALL implementar atualização dinâmica do ano de copyright nos elementos com classe `.js-year`.
2. THE Main_JS SHALL implementar a função `checkNavOverflow` com debounce para exibir o botão hambúrguer somente quando os itens do menu não cabem na largura disponível.
3. THE Main_JS SHALL implementar toggle do menu mobile com atributos `aria-expanded`, `aria-hidden` e `aria-label` atualizados corretamente.
4. THE Main_JS SHALL implementar Reveal_Animation via `IntersectionObserver`, adicionando a classe `.visible` a elementos com classe `.reveal` quando entram no viewport.
5. THE Main_JS SHALL remover todo código relacionado a parallax, flicker, scanner e animação de grid do tema anterior.
6. WHEN o script `include-partials.js` dispara o evento `partials:ready`, THE Main_JS SHALL reinicializar o copyright dinâmico e o Nav_Overflow.

### Requisito 6: Preservação de Arquivos Intocáveis

**User Story:** Como desenvolvedor, eu quero que certos arquivos permaneçam inalterados, para que o sistema de partials e o favicon continuem funcionando.

#### Critérios de Aceitação

1. THE Site SHALL manter o arquivo `include-partials.js` idêntico ao estado atual sem modificações.
2. THE Site SHALL manter o arquivo `partials/header.html` idêntico ao estado atual sem modificações.
3. THE Site SHALL manter o arquivo `partials/footer.html` idêntico ao estado atual sem modificações.
4. THE Site SHALL manter o arquivo `favicon.svg` idêntico ao estado atual sem modificações.

### Requisito 7: Página Inicial (index.html)

**User Story:** Como visitante, eu quero ver uma página inicial com hero, projetos, experiência, stack e contato, para que eu tenha uma visão completa do portfólio.

#### Critérios de Aceitação

1. THE Site SHALL renderizar a página inicial com `<body class="hub-page">` e sem blocos `<style>` inline.
2. THE Site SHALL renderizar um hero em grid de 2 colunas contendo texto (tag, nome, descrição, CTAs, bloco sobre) e painel Astraea (NEO Feed com badges de risco e stats).
3. THE Site SHALL renderizar a seção 01 — Projetos com grid 2×2 onde cada card é um elemento `<a>` clicável que leva à página do projeto correspondente.
4. THE Site SHALL renderizar a seção 02 — Experiência com tabela de experiência profissional.
5. THE Site SHALL renderizar a seção 03 — Stack com grupos de pills organizados por categoria.
6. THE Site SHALL renderizar a seção 04 — Contato com links para GitHub, LinkedIn, Email e Medium.
7. THE Site SHALL renderizar um footer interno com path do site e copyright dinâmico.
8. THE Site SHALL aplicar a classe `.reveal` aos elementos que devem animar ao entrar no viewport.

### Requisito 8: Página Sobre (about/index.html)

**User Story:** Como visitante, eu quero conhecer o perfil profissional do autor, para que eu entenda sua trajetória e competências.

#### Critérios de Aceitação

1. THE Site SHALL renderizar a página sobre com `<body class="hub-page">` e sem blocos `<style>` inline.
2. THE Site SHALL renderizar um hero com tag, nome, descrição e links de contato.
3. THE Site SHALL renderizar seções numeradas para Stack, Experiência e Formação.
4. THE Site SHALL renderizar a formação em grid de cards com grau, nome do curso e instituição.

### Requisito 9: Página Astraea (astraea/index.html)

**User Story:** Como visitante, eu quero ver os detalhes do projeto Astraea, para que eu entenda o pipeline de monitoramento de asteroides.

#### Critérios de Aceitação

1. THE Site SHALL renderizar a página Astraea com `<body class="hub-page">` e sem blocos `<style>` inline.
2. THE Site SHALL renderizar um proj-hero com tag, título, descrição e CTAs.
3. THE Site SHALL renderizar uma stats bar com métricas do sistema.
4. THE Site SHALL renderizar uma seção de features em grid de cards.
5. THE Site SHALL renderizar uma seção de stack com badges de tecnologias.
6. THE Site SHALL renderizar um painel visual com dados de asteroides (NEO Feed).

### Requisito 10: Página Olheiro (olheiro/index.html)

**User Story:** Como visitante, eu quero ver os detalhes do projeto Olheiro, para que eu entenda a plataforma de scouting do Brasileirão.

#### Critérios de Aceitação

1. THE Site SHALL renderizar a página Olheiro com `<body class="hub-page">` e sem blocos `<style>` inline.
2. THE Site SHALL renderizar um proj-hero com tag, título, descrição e CTA.
3. THE Site SHALL renderizar uma stats bar com métricas da plataforma.
4. THE Site SHALL renderizar uma seção de features em grid de cards.
5. THE Site SHALL renderizar uma seção de stack com badges de tecnologias.
6. THE Site SHALL renderizar uma tabela de classificação do Brasileirão.

### Requisito 11: Página Bot (bot/index.html)

**User Story:** Como visitante, eu quero ver os detalhes do EV+ Sports Analyzer, para que eu entenda o sistema de detecção de valor esperado.

#### Critérios de Aceitação

1. THE Site SHALL renderizar a página Bot com `<body class="hub-page">` e sem blocos `<style>` inline.
2. THE Site SHALL renderizar um proj-hero com tag, título, descrição e CTA.
3. THE Site SHALL renderizar uma seção de features em grid de cards.

### Requisito 12: Página Finance (finance/index.html)

**User Story:** Como visitante, eu quero ver os detalhes do projeto Luro, para que eu entenda a arquitetura do app financeiro.

#### Critérios de Aceitação

1. THE Site SHALL renderizar a página Finance com `<body class="hub-page">` e sem blocos `<style>` inline.
2. THE Site SHALL renderizar um proj-hero com tag, título, descrição e CTAs.
3. THE Site SHALL renderizar uma seção de features em grid de cards.
4. THE Site SHALL renderizar uma seção de stack com badges de tecnologias.
5. THE Site SHALL renderizar uma seção de status com texto descritivo.

### Requisito 13: Página Aenvar (aenvar/index.html)

**User Story:** Como visitante, eu quero ver os detalhes das Crônicas de Aenvar, para que eu explore o universo de fantasia épica.

#### Critérios de Aceitação

1. THE Site SHALL renderizar a página Aenvar com `<body class="hub-page">` e sem blocos `<style>` inline.
2. THE Site SHALL renderizar um proj-hero com tag, título, descrição e CTA.
3. THE Site SHALL renderizar uma seção de leituras com cards clicáveis que abrem links do Medium em nova aba.
4. THE Site SHALL renderizar uma seção "Explorar o mundo" com cards informativos.

### Requisito 14: Página 404

**User Story:** Como visitante que acessa uma URL inexistente, eu quero ver uma página de erro clara, para que eu saiba que a rota não existe e possa voltar ao início.

#### Critérios de Aceitação

1. THE Site SHALL renderizar a página 404 com `<body class="hub-page">` e sem blocos `<style>` inline.
2. THE Site SHALL renderizar o código 404, título, descrição e link para voltar ao início.

### Requisito 15: Acessibilidade

**User Story:** Como visitante que utiliza tecnologias assistivas, eu quero que o site seja acessível, para que eu possa navegar e consumir o conteúdo de forma eficaz.

#### Critérios de Aceitação

1. THE Site SHALL incluir um link "Pular para o conteúdo" (`.sr-skip`) em todas as páginas, visível ao receber foco via teclado.
2. THE Site SHALL atribuir `aria-label` descritivo a todas as regiões de navegação e seções interativas.
3. THE Site SHALL atribuir `aria-hidden="true"` a todos os elementos decorativos (ícones SVG, emojis, elementos visuais sem conteúdo semântico).
4. WHEN um link externo é renderizado, THE Site SHALL incluir os atributos `target="_blank"` e `rel="noopener noreferrer"`.
5. THE Main_JS SHALL atualizar `aria-expanded`, `aria-hidden` e `aria-label` no toggle do menu mobile a cada interação.

### Requisito 16: Estrutura de Arquivos

**User Story:** Como desenvolvedor, eu quero uma estrutura de arquivos limpa e previsível, para que o projeto seja fácil de manter.

#### Critérios de Aceitação

1. THE Site SHALL manter a seguinte estrutura de diretórios: raiz com `styles.css`, `main.js`, `include-partials.js`, `favicon.svg`, `index.html`, `404.html`, `robots.txt`, `sitemap.xml`, `_headers`, `_redirects`; diretório `assets/` com arquivos OG SVG; diretório `partials/` com `header.html` e `footer.html`; subdiretórios `about/`, `astraea/`, `olheiro/`, `bot/`, `finance/`, `aenvar/` cada um com `index.html`.
2. THE Site SHALL remover o diretório `aenvar/world/` caso exista.
3. THE Site SHALL importar Google Fonts (Inter 300–800 + JetBrains Mono 400–500) em cada página HTML individualmente.

### Requisito 17: Configuração de Deploy (Cloudflare Pages)

**User Story:** Como desenvolvedor, eu quero que os headers de cache e redirects estejam corretos, para que o deploy no Cloudflare Pages funcione adequadamente durante o desenvolvimento.

#### Critérios de Aceitação

1. THE Site SHALL configurar o header `Cache-Control: no-store` para o arquivo `styles.css` no arquivo `_headers` durante o período de desenvolvimento.
2. THE Site SHALL manter os headers de segurança existentes (X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, Content-Security-Policy).
3. THE Site SHALL remover entradas de redirect referentes a `world/*` do arquivo `_redirects`.
4. THE Site SHALL remover entradas de sitemap referentes a `aenvar/world/` do arquivo `sitemap.xml`.
5. THE Site SHALL manter o arquivo `robots.txt` com permissão de crawling e referência ao sitemap.

### Requisito 18: Importação de Fontes por Página

**User Story:** Como desenvolvedor, eu quero que cada página importe as fontes necessárias diretamente, para que o carregamento seja eficiente e independente.

#### Critérios de Aceitação

1. WHEN uma página HTML é carregada, THE Site SHALL incluir no `<head>` um import único do Google Fonts com as famílias Inter (pesos 300–800) e JetBrains Mono (pesos 400–500).
2. THE Site SHALL incluir tags `<link rel="preconnect">` para `fonts.googleapis.com` e `fonts.gstatic.com` em cada página.
