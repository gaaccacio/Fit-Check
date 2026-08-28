# Guia de Deploy no Netlify - FitCheck 21 Dias

Este projeto é uma Single Page Application (SPA) construída com **React**, **Vite** e **Tailwind CSS**. O arquivo de configuração `netlify.toml` já foi adicionado na raiz do projeto.

---

## Opção 1: Deploy Automático via GitHub (Recomendado)

1. **Suba o código para o GitHub**:
   - Se ainda não subiu, crie um repositório no GitHub e envie o código.

2. **Conecte ao Netlify**:
   - Acesse [app.netlify.com](https://app.netlify.com/) e faça login.
   - Clique em **"Add new site"** > **"Import an existing project"**.
   - Escolha **GitHub** e selecione o repositório do **FitCheck**.

3. **Configurações de Build (Já pré-configuradas no `netlify.toml`)**:
   - **Base directory:** *(deixe em branco)*
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

4. **Variáveis de Ambiente (se for integrar ao Supabase no frontend)**:
   - Em *Site configuration* > *Environment variables*, adicione caso use:
     - `VITE_SUPABASE_URL` = `https://seu-projeto.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = `sua-chave-anon-publica`

5. **Deploy**:
   - Clique em **"Deploy site"**. Em menos de 1 minuto seu site estará no ar com HTTPS gratuito!

---

## Opção 2: Deploy Direto (Arrastar e Soltar / Netlify Drop)

1. No terminal do seu projeto local, execute:
   ```bash
   npm run build
   ```
2. Isso vai gerar a pasta `dist` na raiz do projeto.
3. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
4. Arraste a pasta `dist` inteira para dentro da área pontilhada no navegador.
5. O site será publicado instantaneamente.

---

## Opção 3: Deploy via Netlify CLI (Linha de Comando)

1. Instale a CLI do Netlify globalmente:
   ```bash
   npm install -g netlify-cli
   ```

2. Faça o login:
   ```bash
   netlify login
   ```

3. Compile o projeto e publique em produção:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

---

## Estrutura do arquivo `netlify.toml` incluído no projeto:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```
