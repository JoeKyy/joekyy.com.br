# Plano de Migração — joekyy.com.br

## Overview

**Problema:** O site portfólio joekyy.com.br está em HTML/CSS/JS estático (Skeleton/Gulp), sem CMS, sem tipagem, difícil de manter e expandir. Precisamos migrar para uma stack moderna que permita gerenciamento de conteúdo e expansão.

**Resultado esperado:**
- Site em Next.js com App Router, TypeScript, Tailwind CSS
- Scroll horizontal preservado (identidade visual do site)
- i18n funcionando (/pt-br/ e /en-us/)
- Dados alimentados por JSON (fase 1), depois WordPress headless (fase 2)
- Nova área de impressão 3D com catálogo de produtos (fase 3)

**Repositório atual:** https://github.com/JoeKyy/joekyy.com.br
**Site live:** https://joekyy.com.br/

---

## Technical Approach

### Stack
- **Framework:** Next.js 14+ (App Router, SSG/ISR)
- **Linguagem:** TypeScript
- **Estilos:** Tailwind CSS
- **Animações:** Framer Motion
- **i18n:** next-intl
- **CMS (fase 2):** WordPress headless + WPGraphQL + ACF
- **Deploy:** Hospedagem compartilhada Apache (static export via `build-prod.sh`)
- **Imagens:** next/image (otimização automática)

### Arquitetura do site atual
O site é single-page com scroll horizontal (esquerda→direita). As seções são: Hello → Sobre → Portfólio → Clientes → Contato. O mousewheel vertical é convertido em scrollLeft via JS. Menu lateral com âncoras. Versões pt-br e en-us.

### Decisões técnicas
- Scroll horizontal: Container flex + `overflow-x: scroll` + wheel event (`deltaY → scrollLeft`) + `scroll-snap-type: x mandatory`
- i18n: Rotas dinâmicas `[locale]/` com next-intl, JSONs por idioma
- Dados: Fonte única de verdade em JSON (fase 1), migrada para WordPress GraphQL (fase 2)
- Imagens: Migrar de `/assets/img/` para `/public/images/` com next/image

---

## Implementation Plan

### FASE 1: Next.js + JSON (2-3 semanas)

#### 1.1 Setup do projeto (Small)
- [x] Criar repositório Next.js com `npx create-next-app@latest` (App Router, TypeScript, Tailwind, ESLint)
- [x] Configurar estrutura de pastas: `app/[locale]/`, `components/`, `data/`, `public/`, `styles/`, `lib/`, `types/`
- [x] Configurar Tailwind com tema customizado (cores do site atual, fontes, breakpoints)
- [x] Instalar dependências: `framer-motion`, `next-intl`
- [x] Criar `tsconfig.json` com path aliases (`@/components`, `@/data`, `@/lib`, `@/types`)

#### 1.2 Tipos TypeScript e dados JSON (Small)
- [x] Criar `types/index.ts` com interfaces: `Project`, `Client`, `Skill`, `SiteConfig`, `LocaleContent`
- [x] Criar `data/portfolio.json` com os 11 projetos (id, title, image, description pt/en, tags, technologies, featured)
- [x] Criar `data/clients.json` com os 19 clientes (id, name, logo, url, order)
- [x] Criar `data/skills.json` com habilidades organizadas por categoria
- [x] Criar `data/pt-br.json` e `data/en-us.json` com textos da UI (hero, about, sections labels, contact)
- [x] Criar `lib/data.ts` com funções de fetch dos JSONs tipadas

#### 1.3 Componente HorizontalScroll (Large) — CRÍTICO
- [x] Criar `components/HorizontalScroll/index.tsx` — container principal
- [x] Implementar hook `hooks/useHorizontalScroll.ts`:
  - Converter wheel `deltaY` em `scrollLeft` (`evt.preventDefault()` + `container.scrollLeft += evt.deltaY`)
  - CSS: `display: flex`, `overflow-x: scroll`, `overflow-y: hidden`, `scroll-snap-type: x mandatory`
  - Cada seção: `scroll-snap-align: start`, `min-width: 100vw`, `height: 100vh`
  - `scrollIntoView({ behavior: 'smooth', inline: 'start' })` para navegação por âncora
  - Suporte a touch/swipe nativo em mobile
  - Debounce no scroll para performance
- [x] Testar em Chrome, Firefox, Safari, mobile (iOS/Android)
- [x] Implementar fallback: se tela < 1260px, scroll vertical automático

#### 1.4 Componente Navigation (Medium)
- [x] Criar `components/Navigation/index.tsx` — menu lateral fixo
- [x] Links de âncora: sobre, portfólio, clientes, contato
- [x] Indicador de seção ativa baseado em scroll position (IntersectionObserver horizontal)
- [x] Logo/nome linkando para home (#hello)
- [x] Seletor de idioma (pt-br / en-us) com redirecionamento via next-intl
- [x] Responsivo: hamburger menu em mobile

#### 1.5 Seções do site (Medium cada)
- [x] `components/Hero/index.tsx` — Saudação + avatar + nome (dados do JSON locale)
- [x] `components/About/index.tsx` — Bio, formação, habilidades (grid), links para currículos
- [x] `components/Portfolio/index.tsx` — Lista de projetos com imagem, descrição, tags, tecnologias
  - Componente `ProjectCard` individual
  - Botão "Veja todos os trabalhos" (expandir lista ou modal)
- [x] `components/Clients/index.tsx` — Grid/carrossel de logos (19 clientes)
- [x] `components/Contact/index.tsx` — Email de contato, links redes sociais

#### 1.6 Internacionalização (Medium)
- [x] Configurar next-intl com middleware de detecção de locale
- [x] Criar `app/[locale]/layout.tsx` com metadata dinâmica por idioma
- [x] Criar `app/[locale]/page.tsx` como página principal
- [x] Criar `app/page.tsx` (raiz) como redirecionamento para /pt-br/
- [x] Configurar `i18n/request.ts` com locales suportados e default
- [x] Traduzir todos os textos da UI para en-us nos JSONs

#### 1.7 Assets e imagens (Small)
- [x] Migrar imagens de `/assets/img/` para `/public/images/`
  - `/public/images/avatar.png`
  - `/public/images/portfolio/` (imagens de projetos)
  - `/public/images/clients/` (logos)
- [x] Implementar next/image em todos os componentes com sizes e priority corretos
- [x] Configurar favicon por locale, og:image, meta tags

#### 1.8 Animações e polish (Small)
- [x] Framer Motion: fade-in nas seções conforme scroll
- [x] Animação de entrada do hero (texto + avatar)
- [x] Hover effects nos cards de portfólio e logos de clientes

#### 1.9 SEO e performance (Small)
- [x] Metadata dinâmica por locale (`generateMetadata`)
- [x] Open Graph tags, Twitter cards
- [x] Social cards por locale (pt-br e en-us)
- [x] Google Analytics 4 integrado

#### 1.10 Deploy e validação (Small)
- [x] Configurar deploy em hospedagem Apache (static export + .htaccess)
- [x] Configurar domínio joekyy.com.br
- [x] Validar paridade visual com site original
- [x] Validar scroll horizontal em múltiplos devices
- [x] Validar i18n e todas as rotas
- [x] Script `build:deploy` para gerar site.zip

---

### FASE 2: WordPress Headless (2-3 semanas)
**Dependência:** Fase 1 concluída e em produção

#### 2.1 Setup WordPress (Medium)
- [x] Instalar WordPress em subdomínio (joekyy.com.br/wp/)
- [x] Instalar plugins: WPGraphQL, ACF Pro, ACF to WPGraphQL
- [x] Configurar idiomas (campos bilíngues pt/en nos ACF fields)
- [x] Desativar frontend do WordPress (headless mode)
- [x] Configurar CORS para permitir requests do domínio Next.js

#### 2.2 Custom Post Types e campos (Medium)
- [x] CPT `projeto` — campos ACF: títuloPt/En, descriçãoPt/En, imagem, tipo, link, featured, ordem
- [x] CPT `cliente` — campos ACF: nome, logo, url, ordem de exibição
- [x] CPT `habilidade` — campos ACF: nomePt/En, categoria
- [x] Options Page `config_site` — campos ACF: hero, about, portfolio, clients, contact (bilíngues), avatar, redes sociais, currículos
- [x] Configurar permissões e WPGraphQL exposure

#### 2.3 Migração de dados JSON → WordPress (Small)
- [x] Script `scripts/migrate.mjs` para importar dados via REST/GraphQL
- [x] Importar projetos, clientes, habilidades
- [x] Configurar config do site na Options Page
- [x] Validar dados no painel WordPress

#### 2.4 Integração Next.js ← WordPress (Large)
- [x] Criar `lib/wordpress.ts` com client GraphQL (graphql-request)
- [x] Queries GraphQL para cada tipo de dado:
  - `getProjectsWP()` — lista de projetos com tradução
  - `getClientsWP()` — lista de clientes ordenada
  - `getSkillsWP()` — habilidades por categoria
  - `getSiteConfigWP(locale)` — configurações gerais
- [x] Feature flag: `NEXT_PUBLIC_DATA_SOURCE` alterna entre JSON local e WordPress
- [x] Atualizar componentes para usar os novos data fetchers (transparente via `lib/data.ts`)

#### 2.5 Validação e cutover (Small)
- [x] Comparar output JSON vs WordPress (mesmos dados, mesma renderização)
- [x] Testar edição no WordPress → rebuild → atualização no site
- [x] Build de produção com `build-prod.sh`
- [x] Deploy em produção com WordPress como fonte de dados

---

### FASE 3: Área de Impressão 3D (2-4 semanas)
**Dependência:** Fase 2 concluída

#### 3.1 Planejamento da área 3D (Small)
- [x] Definir como seção no scroll horizontal (após Clientes)
- [x] Definir modelo de dados: thumbnail, título, descrição, reels URL, buy URL

#### 3.2 WordPress: novos CPTs (Medium)
- [x] CPT `projeto_3d` — campos ACF: títuloPt/En, descriçãoPt/En, thumbnail, reelsUrl, buyUrl, ordem
- [x] Query GraphQL `GetProjetos3D` em `lib/wordpress.ts`
- [x] Função `getPrint3DProjectsWP()` com tipagem `Print3DProject`

#### 3.3 Frontend: nova seção (Large)
- [x] `components/Print3D/index.tsx` — seção no scroll horizontal
- [x] `components/Print3D/Print3DCard.tsx` — card de projeto 3D (thumbnail, título, reels, compra)
- [x] Integração na página principal (entre Clientes e Contato)
- [x] Responsivo: layout adaptado para mobile e desktop

#### 3.4 SEO e validação (Small)
- [x] Seção incluída no site com metadata dinâmica
- [x] Deploy em produção com dados do WordPress

#### 3.5 Testes e deploy (Small)
- [x] Testar seção com projetos reais do WordPress
- [x] Validar links de Reels e compra
- [x] Validar responsividade
- [x] Deploy em produção

---

## Considerations

### Assumptions
- O design visual do site atual será mantido (mesmas cores, layout, identidade)
- O scroll horizontal é essencial e não deve ser removido
- WordPress será hospedado separadamente do Next.js
- Deploy do Next.js será feito na Vercel
- Impressora utilizada: Bambu Lab A1 com AMS
- Marketplaces iniciais: Mercado Livre e Shopee

### Constraints
- O site precisa funcionar offline entre as fases (nunca ficar fora do ar durante migração)
- Cada fase deve ser funcional independentemente
- Performance: Lighthouse ≥ 90 em todas as métricas

### Risks
| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Scroll horizontal bugado cross-browser | Alto | Testar extensivamente; hook isolado; fallback vertical |
| Perda de SEO na migração | Médio | Manter URLs; redirects 301; SSG |
| WordPress como ponto único de falha | Médio | ISR com cache; fallback JSON |
| Complexidade de manter WP + Next | Baixo | Documentação; automação |

---

## Not Included (futuro)
- Integração com API dos marketplaces para sync automático de preços/estoque
- Blog/artigos sobre impressão 3D
- Área de orçamento automatizada com calculadora de preços
- Dark mode (pode ser adicionado depois com Tailwind)
- Formulário de contato com backend (fase 1 usa mailto)
- Analytics avançado (pode adicionar Plausible/GA depois)
