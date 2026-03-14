# Portifolio — joekyy.com.br

![JoeKyy - Soluções em TI e WEB](https://github.com/JoeKyy/joekyy.com.br/assets/2018763/068cfafa-0702-4288-9b92-b49296f49beb)

Layout desenvolvido utilizando [Figma](https://www.figma.com/file/faQt6qJ1h7TzEREfXP0DeC/JoeKyy---Solu%C3%A7%C3%B5es-em-TI-e-WEB?type=design&node-id=1%3A43&mode=design&t=mibgW7dqFnBKiTLx-1)

Tema da estrutura do site desenvolvida utilizando o [Skeleton](https://github.com/JoeKyy/skeleton) como base, um modelo criado via Gulp.

---

## Planejamento

O projeto está sendo migrado de HTML/CSS/JS estático para uma stack moderna em três fases:

| Fase | Descrição | Status |
| --- | --- | --- |
| **Fase 1** | Next.js + TypeScript + Tailwind + JSON | ✅ Concluída |
| **Fase 2** | WordPress Headless (WPGraphQL + ACF) | 🔜 Planejada |
| **Fase 3** | Área de Impressão 3D com catálogo de produtos | 🔜 Planejada |

O plano completo e detalhado está documentado em [PLAN.md](./PLAN.md).

---

## Estrutura do Repositório

```text
joekyy.com.br/
├── HTML/          # Versão original estática (Skeleton + Gulp) — referência
├── WP/            # Tema WordPress (base para Fase 2)
├── next/          # Aplicação Next.js (versão atual em produção)
├── docs/          # Currículos (Jhomar Nando - Resume PT e EN)
└── PLAN.md        # Plano de migração detalhado por fase
```

---

## Fase 1 — Next.js (atual)

### Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Linguagem:** TypeScript
- **Estilos:** Tailwind CSS v4
- **i18n:** next-intl (`/pt-br/` e `/en-us/`)
- **Fontes:** Montserrat (Google Fonts via next/font)
- **Imagens:** next/image
- **Deploy:** Hospedagem compartilhada Apache (static export)

### Estrutura do projeto Next.js

```text
next/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx     # Metadata dinâmica por locale (SEO, OG, favicons)
│   │   └── page.tsx       # Página principal com todas as seções
│   ├── globals.css        # Tema Tailwind (cores, fontes, breakpoints)
│   └── page.tsx           # Raiz — redireciona para /pt-br/
├── components/
│   ├── About/             # Seção sobre + skills + links de currículo
│   ├── Clients/           # Grid de logos de clientes
│   ├── Contact/           # Contato + redes sociais
│   ├── Hero/              # Saudação + avatar
│   ├── HorizontalScroll/  # Provider + Container do scroll horizontal
│   ├── Navigation/        # Menu lateral (desktop) e hamburger (mobile)
│   └── Portfolio/         # Cards de projetos
├── data/
│   ├── en-us.json         # Textos da UI em inglês
│   ├── pt-br.json         # Textos da UI em português
│   ├── portfolio.json     # Projetos do portfólio
│   ├── clients.json       # Clientes
│   └── skills.json        # Habilidades técnicas e profissionais
├── docs/                  # Currículos servidos pelo site
│   ├── resume-pt.docx
│   └── resume-en.docx
├── hooks/
│   └── useHorizontalScroll.ts  # Lógica do scroll horizontal
├── i18n/
│   └── request.ts         # Configuração next-intl
├── lib/
│   └── data.ts            # Funções de acesso aos dados + siteConfig
├── public/
│   ├── favicon/           # Favicons por locale (pt-br e en-us)
│   ├── images/            # Avatar, logos, portfólio, clientes, social cards
│   └── docs/              # Gerado no build (currículos copiados de /docs)
├── types/                 # Interfaces TypeScript
├── middleware.ts           # Roteamento de locale
└── next.config.ts         # output: export, trailingSlash, images unoptimized
```

### Decisões técnicas relevantes

**Scroll horizontal**
O scroll é implementado via `useHorizontalScroll` hook. O `deltaY` do mouse wheel é convertido em `scrollLeft` no container. A navegação usa `element.offsetLeft` (que já inclui a margem do nav lateral de 105px) para posicionar corretamente cada seção. Em mobile (< 1260px) o scroll passa a ser vertical.

**i18n com static export**
O `next-intl` em modo static export requer `setRequestLocale(locale)` no layout e na page para evitar o uso de `headers()` em build time. As mensagens são importadas diretamente via `import()` em vez de `getMessages()`.

**Favicons por locale**
Cada idioma tem seu próprio conjunto de favicons em `/public/favicon/pt-br/` e `/public/favicon/en-us/`, referenciados via `generateMetadata`.

**Social cards**
`og:image` e `twitter:image` apontam para imagens específicas por locale hospedadas em `/images/img-social.png` e `/images/img-social-en-us.png`.

### Comandos

```bash
cd next

# Desenvolvimento
npm run dev

# Build padrão
npm run build

# Build + gera site.zip pronto para upload no cPanel
npm run build:deploy
```

O `build:deploy` copia os currículos de `docs/` para `public/docs/`, roda o build e gera `next/site.zip` com o conteúdo da pasta `out/` na raiz do zip — pronto para extrair diretamente em `public_html/` no cPanel.

### Deploy (hospedagem Apache)

1. Rodar `npm run build:deploy` dentro de `next/`
2. Fazer upload do `next/site.zip` no cPanel
3. Extrair em `public_html/` (os arquivos ficam na raiz, não em subpasta)
4. O `.htaccess` incluso no zip cuida dos redirects e das URLs limpas

---

## Fase 2 — WordPress Headless (planejada)

A fonte de dados será migrada de JSON para WordPress com WPGraphQL + ACF. A aplicação Next.js continuará a mesma, substituindo apenas as chamadas de `lib/data.ts` por queries GraphQL com ISR.

Detalhes completos: ver seção Fase 2 no [PLAN.md](./PLAN.md).

---

## Fase 3 — Impressão 3D (planejada)

Nova área do site com catálogo de produtos impressos em 3D (Bambu Lab A1 com AMS), integrada ao WordPress Headless da Fase 2, com links para Mercado Livre e Shopee.

Detalhes completos: ver seção Fase 3 no [PLAN.md](./PLAN.md).
