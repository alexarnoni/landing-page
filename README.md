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
