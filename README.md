# alexarnoni.com — Portfólio pessoal

Site pessoal hospedado no Cloudflare Pages.

## Estrutura

```
index.html              — página principal (hub de projetos)
styles.css              — estilos globais
main.js                 — scripts globais (scroll reveal, nav overflow, lang toggle, dark mode)
include-partials.js     — carrega header e footer via fetch
404.html                — página de erro
robots.txt
sitemap.xml
_headers                — headers HTTP (CSP, cache)
_redirects              — redirecionamentos Cloudflare Pages
favicon.svg             — ícone AA monograma
partials/header.html
        footer.html
assets/og-home.svg      — Open Graph images
       og-astraea.svg
       og-bot.svg
       og-finance.svg
       og-olheiro.svg
       og-aenvar.svg
about/index.html        — página sobre
astraea/index.html      — Astraea — pipeline NASA + ML
olheiro/index.html      — Olheiro — scouting do Brasileirão
finance/index.html      — Luro Finance
bot/index.html          — EV+ Sports Analyzer
aenvar/                 — Crônicas de Aenvar
en/index.html           — versão em inglês
  about/index.html
```

## Projetos

| Projeto       | URL interna         | URL externa                        |
|---------------|---------------------|-------------------------------------|
| Astraea       | /astraea/           | https://astraea.alexarnoni.com     |
| Olheiro       | /olheiro/           | https://scout.alexarnoni.com       |
| Luro Finance  | /finance/           | —                                  |
| EV+ Analyzer  | /bot/               | —                                  |
| Crônicas      | /aenvar/            | https://medium.com/@alexarnoni     |

## Visualizar localmente

```
python -m http.server 8000
```

Acesse http://localhost:8000

## Deploy — Cloudflare Pages

1. Conecte o repositório no Cloudflare Pages
2. Build command: em branco
3. Output directory: /
4. Associe o domínio alexarnoni.com

