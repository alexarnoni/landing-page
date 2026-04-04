# alexarnoni.com — Portfólio pessoal

Site pessoal hospedado no Cloudflare Pages.

## Estrutura

```
index.html              — página principal (hub de projetos)
styles.css              — estilos globais
main.js                 — scripts globais (cursor, scroll reveal, nav overflow)
include-partials.js     — carrega header e footer via fetch
404.html                — página de erro
robots.txt
sitemap.xml
_headers                — headers HTTP (CSP, cache)
_redirects              — redirecionamentos Cloudflare Pages
partials/header.html
        footer.html
about/index.html        — página sobre
astraea/index.html      — Astraea — pipeline NASA + ML
olheiro/index.html      — Olheiro — scouting do Brasileirão
finance/index.html      — Luro Finance
bot/index.html          — EV+ Sports Analyzer
aenvar/                 — Crônicas de Aenvar
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

## Responsividade — checklist de QA

- [ ] 360px, 390px, 414px, 768px, 1024px, 1280px, 1440px
- [ ] Nav hamburguer só aparece quando itens não cabem (checkNavOverflow)
- [ ] Navegação por teclado com foco visível
- [ ] Contraste AA em todas as páginas
- [ ] Áreas de toque ≥ 44px
