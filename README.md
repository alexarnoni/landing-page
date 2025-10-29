# alexarnoni.com — Landing Page

Página simples "em breve" para o domínio **alexarnoni.com**.

## Estrutura

```
index.html
style.css
```

## Visualizar localmente
```bash
python -m http.server 8000
```

Depois acesse http://localhost:8000

## Deploy no Cloudflare Pages
1. Crie um projeto e conecte seu repositório GitHub `landing-page`.
2. Deixe o campo *Build command* em branco.
3. Defina *Output directory* como `/`.
4. Após o deploy, associe o domínio `alexarnoni.com`.

## Rotas internas → Subdomínios
Os links do menu principal apontam para as rotas internas `/finance/`, `/bot/` e `/aenvar/` por padrão. Quando os subdomínios dedicados estiverem prontos:

1. Atualize os `href` da navegação nos arquivos `index.html`, `finance/index.html`, `bot/index.html` e `aenvar/index.html` para `https://finance.alexarnoni.com`, `https://bot.alexarnoni.com` e `https://aenvar.alexarnoni.com` (adicione a barra final se precisar de rotas filhas).
2. Edite o arquivo `_redirects` na raiz e descomente as regras correspondentes para ativar os redirecionamentos `301` permanentes. Isso garante que visitantes que usem as rotas antigas sejam enviados aos subdomínios e que a parte final do caminho (`:splat`) continue funcionando.
3. Faça o deploy no Cloudflare Pages para publicar as alterações.

## Portfólio — migração para subdomínio
Siga estes passos quando o portfólio for movido para o subdomínio dedicado:

1. **Criar o CNAME no Cloudflare**
   - Acesse o painel da zona `alexarnoni.com` e abra a aba **DNS**.
   - Adicione um novo registro **CNAME** com:
     - **Nome:** `portfolio`
     - **Destino:** `alexarnoni.github.io`
     - **Proxy status:** habilitado (laranja / *Proxied ON*).
   - Salve o registro e aguarde a propagação.
2. **Atualizar o link no menu**
   - No arquivo `index.html`, atualize o `href` do item "Portfólio" de `https://alexarnoni.github.io/` para `https://portfolio.alexarnoni.com`.
   - Verifique se `target="_blank"` e `rel="noopener"` permanecem configurados no link.
3. **(Opcional) Adicionar regra em `_redirects`**
   - Caso crie uma rota local `/portfolio` e queira redirecionar visitantes automaticamente, adicione a linha abaixo ao arquivo `_redirects`:
     ```
     /portfolio/*  https://portfolio.alexarnoni.com/:splat  301
     ```
   - Faça o deploy para que a regra passe a valer.

## Responsividade

Use a lista abaixo como guia de QA sempre que fizer alterações de layout:

- [ ] Verificar a apresentação em **360px, 390px, 414px, 768px, 1024px e 1280px** (modo responsivo do navegador ou dispositivos reais).
- [ ] Exercitar a navegação do menu mobile apenas com **Tab / Shift + Tab**, confirmando foco visível e leitura correta pelo leitor de tela.
- [ ] Conferir contraste de texto e ícones no modo escuro/claro, garantindo nível **AA** mínimo.
- [ ] Validar áreas de toque com pelo menos **44px** de altura e feedback de foco/hover.
- [ ] Confirmar que cards, imagens e mídias mantêm **largura fluida** sem gerar layout shift.

### Lighthouse

1. Suba o servidor local (`python -m http.server 8000`) e abra a página no Chrome.
2. Abra o DevTools (`Ctrl+Shift+I` ou `Cmd+Option+I`), vá à aba **Lighthouse** e gere um relatório para Mobile e Desktop.
3. As metas mínimas são **Performance, Accessibility, Best Practices e SEO ≥ 90**. Revise as recomendações antes de publicar.
