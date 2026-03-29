# alexarnoni.com — Landing Page

Site pessoal hospedado no Cloudflare Pages.

## Estrutura

```
index.html              — página principal (hub de projetos)
styles.css              — estilos globais
main.js                 — scripts globais (cursor, scroll reveal)
include-partials.js     — carrega header e footer via fetch
404.html                — página de erro
robots.txt
sitemap.xml
_headers                — headers HTTP (CSP, cache)
_redirects              — redirecionamentos Cloudflare Pages

partials/
  header.html
  footer.html

about/index.html        — página sobre
finance/index.html      — Luro Finance
bot/index.html          — EV+ Bot
aenvar/                 — Crônicas de Aenvar
```

## Projetos linkados

| Projeto | URL |
|---|---|
| Luro Finance | `/finance/` (interno) |
| EV+ Bot | `/bot/` (interno) |
| Scout Brasileirão | `https://scout.alexarnoni.com` (externo) |
| Crônicas de Aenvar | `/aenvar/` (interno) |
| Portfólio | `https://alexarnoni.github.io/` (externo) |

## Visualizar localmente

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000`

## Deploy no Cloudflare Pages

1. Conecte o repositório `landing-page` no Cloudflare Pages.
2. Deixe o campo *Build command* em branco.
3. Defina *Output directory* como `/`.
4. Após o deploy, associe o domínio `alexarnoni.com`.

## Rotas internas → Subdomínios

Quando um subdomínio dedicado estiver pronto:

1. Atualize o `href` correspondente no `partials/header.html` e nas páginas internas.
2. Descomente (ou adicione) a regra de redirecionamento `301` no `_redirects`.
3. Faça o deploy para publicar.

## Responsividade — checklist de QA

- [ ] Testar em 360px, 390px, 414px, 768px, 1024px e 1280px
- [ ] Navegação por teclado (Tab / Shift+Tab) com foco visível
- [ ] Contraste AA no modo escuro/claro
- [ ] Áreas de toque ≥ 44px
- [ ] Cards e mídias com largura fluida sem layout shift

### Lighthouse

Rode via DevTools → aba Lighthouse. Metas mínimas: Performance, Accessibility, Best Practices e SEO ≥ 90.
