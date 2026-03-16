# joekyy.com.br — Portfólio & Impressão 3D

![JoeKyy - Soluções em TI e WEB](https://github.com/JoeKyy/joekyy.com.br/assets/2018763/068cfafa-0702-4288-9b92-b49296f49beb)

Site portfólio de **Jhomar Nando (JoeKyy)** — desenvolvedor web full stack. O projeto foi migrado de HTML/CSS/JS estático para uma stack moderna com **Next.js**, **TypeScript** e **Tailwind CSS**, alimentado por **WordPress Headless** via **WPGraphQL + ACF**, e inclui uma área de **impressão 3D** com catálogo de projetos.

**🌐 Site:** [joekyy.com.br](https://joekyy.com.br)
**🎨 Design:** [Figma](https://www.figma.com/file/faQt6qJ1h7TzEREfXP0DeC/JoeKyy---Solu%C3%A7%C3%B5es-em-TI-e-WEB?type=design&node-id=1%3A43&mode=design&t=mibgW7dqFnBKiTLx-1)

---

## Visão geral

O site é single-page com **scroll horizontal** (esquerda → direita) em desktop e scroll vertical em mobile. As seções são: **Hello → Sobre → Portfólio → Clientes → Impressão 3D → Contato**. Suporta dois idiomas: **pt-br** (padrão) e **en-us**.

A migração foi realizada em três fases:

| Fase       | Descrição                                     | Status       |
| ---------- | --------------------------------------------- | ------------ |
| **Fase 1** | Next.js + TypeScript + Tailwind + JSON        | ✅ Concluída |
| **Fase 2** | WordPress Headless (WPGraphQL + ACF)          | ✅ Concluída |
| **Fase 3** | Área de Impressão 3D com catálogo de projetos | ✅ Concluída |

O plano original de migração está documentado em [PLAN.md](./PLAN.md).

---

## Stack tecnológica

| Camada        | Tecnologia                                      |
| ------------- | ----------------------------------------------- |
| **Framework** | Next.js 16 (App Router, static export)          |
| **Linguagem** | TypeScript (strict mode)                        |
| **Estilos**   | Tailwind CSS v4                                 |
| **Animações** | Framer Motion                                   |
| **i18n**      | next-intl (`/pt-br/` e `/en-us/`)               |
| **Fontes**    | Montserrat (Google Fonts via next/font)         |
| **Imagens**   | next/image (unoptimized para static export)     |
| **CMS**       | WordPress Headless + WPGraphQL + ACF            |
| **Analytics** | Google Analytics 4                              |
| **Deploy**    | Hospedagem compartilhada Apache (static export) |

---

## Estrutura do repositório

```text
joekyy.com.br/
├── next/              # Aplicação Next.js (versão em produção)
├── HTML/              # Versão original estática (Skeleton + Gulp) — referência
├── WP/                # Tema WordPress headless (funções, CPTs, ACF)
├── docs/              # Currículos (Jhomar Nando - Resume PT e EN)
├── scripts/           # Scripts de migração e manutenção (migrate.mjs)
├── build-prod.sh      # Script de build para produção com WordPress
├── .github/           # Copilot instructions, agents e prompts
└── PLAN.md            # Plano de migração detalhado por fase
```

### Estrutura do projeto Next.js

```text
next/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx     # Metadata dinâmica por locale (SEO, OG, favicons)
│   │   └── page.tsx       # Página principal com todas as seções
│   ├── globals.css        # Tema Tailwind (cores, fontes, breakpoints)
│   ├── layout.tsx         # Root layout (fonte, GA4)
│   └── page.tsx           # Raiz — redireciona para /pt-br/
├── components/
│   ├── About/             # Bio, skills, links de currículo
│   ├── Clients/           # Grid de logos de clientes
│   ├── Contact/           # Contato + redes sociais
│   ├── Hero/              # Saudação + avatar
│   ├── HorizontalScroll/  # Provider + Container do scroll horizontal
│   ├── Navigation/        # Menu lateral (desktop) e hamburger (mobile)
│   ├── Portfolio/         # Cards de projetos
│   └── Print3D/           # Seção de impressão 3D (cards + reels)
├── data/                  # JSONs de fallback (quando não usa WordPress)
│   ├── en-us.json         # Textos da UI em inglês
│   ├── pt-br.json         # Textos da UI em português
│   ├── portfolio.json     # Projetos do portfólio
│   ├── clients.json       # Clientes
│   └── skills.json        # Habilidades técnicas e profissionais
├── hooks/
│   └── useHorizontalScroll.ts  # Lógica do scroll horizontal
├── i18n/
│   └── request.ts         # Configuração next-intl
├── lib/
│   ├── data.ts            # Camada de dados (JSON ↔ WordPress, transparente)
│   └── wordpress.ts       # Client GraphQL + queries WPGraphQL
├── public/
│   ├── favicon/           # Favicons por locale (pt-br e en-us)
│   └── images/            # Avatar, logos, portfólio, clientes, social cards
├── types/
│   └── index.ts           # Interfaces TypeScript (Project, Client, Skill, etc.)
├── middleware.ts          # Roteamento de locale (next-intl)
├── next.config.ts         # output: export, trailingSlash, images unoptimized
└── .env.example           # Variáveis de ambiente (DATA_SOURCE, WORDPRESS_API_URL)
```

---

## Decisões técnicas

### Scroll horizontal (core UX)

O scroll horizontal é a identidade visual do site. Implementado via `useHorizontalScroll` hook:

- O `deltaY` do mouse wheel é convertido em `scrollLeft` no container flex
- Suporte a teclado (setas, PageUp/PageDown)
- `IntersectionObserver` detecta a seção ativa e atualiza a URL hash
- A navegação usa `element.offsetLeft` para posicionar cada seção
- Em mobile (< 1260px) o layout muda automaticamente para scroll vertical
- `scroll-snap-type: x mandatory` garante snap preciso entre seções

### Fonte de dados: JSON ↔ WordPress

A camada `lib/data.ts` abstrai a fonte de dados. Uma flag de ambiente `NEXT_PUBLIC_DATA_SOURCE` controla o comportamento:

- `json` (padrão): lê dos arquivos JSON locais em `data/`
- `wordpress`: consulta o endpoint GraphQL via `lib/wordpress.ts`

Em produção, o `build-prod.sh` exporta `NEXT_PUBLIC_DATA_SOURCE=wordpress` e aponta para `https://joekyy.com.br/wp/graphql`.

### i18n com static export

O `next-intl` em modo static export requer `setRequestLocale(locale)` no layout e na page. As mensagens são importadas via `import()` dinâmico. A rota raiz (`/`) redireciona para `/pt-br/`.

### Favicons e Social Cards por locale

Cada idioma tem favicons próprios em `/public/favicon/{locale}/`. As imagens Open Graph e Twitter Cards também são específicas por locale.

### WordPress Headless

WordPress instalado em `joekyy.com.br/wp/` com:

- **WPGraphQL** — endpoint GraphQL
- **ACF Pro** — campos customizados para projetos, clientes, habilidades, config do site e projetos 3D
- **Custom Post Types:** `projeto`, `cliente`, `habilidade`, `config_site`, `projeto_3d`

### Impressão 3D

Seção dedicada a projetos de impressão 3D (Bambu Lab A1 com AMS). Os dados vêm exclusivamente do WordPress (CPT `projeto_3d`). Cada card exibe thumbnail, título, descrição, link para Reels e link de compra.

---

## Comandos

```bash
cd next

# Desenvolvimento (fonte JSON por padrão)
npm run dev

# Build padrão (usa .env.local)
npm run build

# Build de produção com WordPress (gera site.zip)
# Executar da raiz do repositório:
cd ..
./build-prod.sh
```

O `build-prod.sh`:

1. Copia currículos de `docs/` para `next/public/docs/`
2. Limpa o cache de fetch para dados frescos do WP
3. Exporta `NEXT_PUBLIC_DATA_SOURCE=wordpress` e `WORDPRESS_API_URL`
4. Roda `next build` (static export)
5. Gera `next/site.zip` pronto para upload

---

## Deploy (hospedagem Apache)

1. Rodar `./build-prod.sh` na raiz do repositório
2. Fazer upload do `next/site.zip` no cPanel (File Manager → `public_html/`)
3. Extrair na raiz (os arquivos ficam direto em `public_html/`, sem subpasta)
4. O `.htaccess` incluso no zip cuida dos redirects e das URLs limpas

### Variáveis de ambiente

```bash
# next/.env.local (desenvolvimento)
NEXT_PUBLIC_DATA_SOURCE=json
WORDPRESS_API_URL=http://localhost:8888/wordpress/graphql

# Produção (via build-prod.sh)
NEXT_PUBLIC_DATA_SOURCE=wordpress
WORDPRESS_API_URL=https://joekyy.com.br/wp/graphql
```

---

## Idiomas

| Locale  | URL       | Descrição                    |
| ------- | --------- | ---------------------------- |
| `pt-br` | `/pt-br/` | Português do Brasil (padrão) |
| `en-us` | `/en-us/` | English (US)                 |

Todos os textos da UI vêm dos JSONs de locale (`data/pt-br.json` e `data/en-us.json`). Os conteúdos dinâmicos (projetos, clientes, config) possuem campos bilíngues no WordPress (ex: `tituloPt`, `tituloEn`).

---

## Licença

Projeto privado de portfólio pessoal. Código disponível como referência.
