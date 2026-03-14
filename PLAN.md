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
- **Deploy:** Vercel
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
- [ ] Criar repositório Next.js com `npx create-next-app@latest` (App Router, TypeScript, Tailwind, ESLint)
- [ ] Configurar estrutura de pastas: `app/[locale]/`, `components/`, `data/`, `public/`, `styles/`, `lib/`, `types/`
- [ ] Configurar Tailwind com tema customizado (cores do site atual, fontes, breakpoints)
- [ ] Instalar dependências: `framer-motion`, `next-intl`
- [ ] Criar `tsconfig.json` com path aliases (`@/components`, `@/data`, `@/lib`, `@/types`)

#### 1.2 Tipos TypeScript e dados JSON (Small)
- [ ] Criar `types/index.ts` com interfaces: `Project`, `Client`, `Skill`, `SiteConfig`, `LocaleContent`
- [ ] Criar `data/portfolio.json` com os 11 projetos (id, title, image, description pt/en, tags, technologies, featured)
- [ ] Criar `data/clients.json` com os 19 clientes (id, name, logo, url, order)
- [ ] Criar `data/skills.json` com habilidades organizadas por categoria
- [ ] Criar `data/pt-br.json` e `data/en-us.json` com textos da UI (hero, about, sections labels, contact)
- [ ] Criar `lib/data.ts` com funções de fetch dos JSONs tipadas

#### 1.3 Componente HorizontalScroll (Large) — CRÍTICO
- [ ] Criar `components/HorizontalScroll/index.tsx` — container principal
- [ ] Implementar hook `hooks/useHorizontalScroll.ts`:
  - Converter wheel `deltaY` em `scrollLeft` (`evt.preventDefault()` + `container.scrollLeft += evt.deltaY`)
  - CSS: `display: flex`, `overflow-x: scroll`, `overflow-y: hidden`, `scroll-snap-type: x mandatory`
  - Cada seção: `scroll-snap-align: start`, `min-width: 100vw`, `height: 100vh`
  - `scrollIntoView({ behavior: 'smooth', inline: 'start' })` para navegação por âncora
  - Suporte a touch/swipe nativo em mobile
  - Debounce no scroll para performance
- [ ] Testar em Chrome, Firefox, Safari, mobile (iOS/Android)
- [ ] Implementar fallback: se tela < 768px, considerar scroll vertical (decisão pendente)

#### 1.4 Componente Navigation (Medium)
- [ ] Criar `components/Navigation/index.tsx` — menu lateral fixo
- [ ] Links de âncora: sobre, portfólio, clientes, contato
- [ ] Indicador de seção ativa baseado em scroll position (IntersectionObserver horizontal)
- [ ] Logo/nome linkando para home (#hello)
- [ ] Seletor de idioma (pt-br / en-us) com redirecionamento via next-intl
- [ ] Responsivo: hamburger menu em mobile

#### 1.5 Seções do site (Medium cada)
- [ ] `components/Hero/index.tsx` — Saudação + avatar + nome (dados do JSON locale)
- [ ] `components/About/index.tsx` — Bio, formação, habilidades (grid), links para currículos
- [ ] `components/Portfolio/index.tsx` — Lista de projetos com imagem, descrição, tags, tecnologias
  - Componente `ProjectCard` individual
  - Botão "Veja todos os trabalhos" (expandir lista ou modal)
  - Filtro por tags/tecnologias (opcional fase 1)
- [ ] `components/Clients/index.tsx` — Grid/carrossel de logos (19 clientes)
- [ ] `components/Contact/index.tsx` — Email de contato, links redes sociais
- [ ] `components/Footer/index.tsx` — Copyright, links extras

#### 1.6 Internacionalização (Medium)
- [ ] Configurar next-intl com middleware de detecção de locale
- [ ] Criar `app/[locale]/layout.tsx` com metadata dinâmica por idioma
- [ ] Criar `app/[locale]/page.tsx` como página principal
- [ ] Criar `app/page.tsx` (raiz) como seletor de idioma (como o site atual)
- [ ] Configurar `i18n.ts` com locales suportados e default
- [ ] Traduzir todos os textos da UI para en-us nos JSONs

#### 1.7 Assets e imagens (Small)
- [ ] Migrar imagens de `/assets/img/` para `/public/images/`
  - `/public/images/avatar.png`
  - `/public/images/portfolio/` (11 imagens de projetos)
  - `/public/images/clients/` (19 logos)
- [ ] Converter imagens para WebP onde possível
- [ ] Implementar next/image em todos os componentes com sizes e priority corretos
- [ ] Configurar favicon, og:image, meta tags

#### 1.8 Animações e polish (Small)
- [ ] Framer Motion: fade-in nas seções conforme scroll
- [ ] Animação de entrada do hero (texto + avatar)
- [ ] Hover effects nos cards de portfólio e logos de clientes
- [ ] Transição suave entre idiomas
- [ ] Loading state / skeleton screens

#### 1.9 SEO e performance (Small)
- [ ] Metadata dinâmica por locale (`generateMetadata`)
- [ ] Open Graph tags, Twitter cards
- [ ] Structured data (JSON-LD: Person, WebSite, Portfolio)
- [ ] Sitemap.xml e robots.txt
- [ ] Lighthouse: target ≥ 90 em Performance, Accessibility, Best Practices, SEO

#### 1.10 Deploy e validação (Small)
- [ ] Configurar Vercel project
- [ ] Configurar domínio joekyy.com.br
- [ ] Testar em staging antes de apontar domínio
- [ ] Validar paridade visual com site atual
- [ ] Validar scroll horizontal em múltiplos devices
- [ ] Validar i18n e todas as rotas
- [ ] Configurar redirects 301 de URLs antigas se necessário

---

### FASE 2: WordPress Headless (2-3 semanas)
**Dependência:** Fase 1 concluída e em produção

#### 2.1 Setup WordPress (Medium)
- [ ] Instalar WordPress em subdomínio (wp.joekyy.com.br) ou servidor separado
- [ ] Instalar plugins: WPGraphQL, ACF Pro, ACF to WPGraphQL, Polylang, Polylang for WPGraphQL
- [ ] Configurar idiomas no Polylang (pt-br, en-us)
- [ ] Desativar frontend do WordPress (headless mode)
- [ ] Configurar CORS para permitir requests do domínio Next.js

#### 2.2 Custom Post Types e campos (Medium)
- [ ] CPT `projeto` — campos ACF: título, descrição (pt/en), imagem destaque, tags (taxonomy), tecnologias (taxonomy), link, tipo (freelance/serviço), featured (boolean), ordem
- [ ] CPT `cliente` — campos ACF: nome, logo, url, ordem de exibição
- [ ] CPT `habilidade` — campos ACF: nome, categoria, nível, ícone
- [ ] Options Page `config_site` — campos ACF: bio (pt/en), avatar, email, redes sociais, links currículos
- [ ] Configurar permissões e roles

#### 2.3 Migração de dados JSON → WordPress (Small)
- [ ] Script Node.js para importar `portfolio.json` → CPT projeto via REST API
- [ ] Script para importar `clients.json` → CPT cliente
- [ ] Script para importar `skills.json` → CPT habilidade
- [ ] Importar config do site manualmente na Options Page
- [ ] Validar dados no painel WordPress

#### 2.4 Integração Next.js ← WordPress (Large)
- [ ] Criar `lib/wordpress.ts` com client GraphQL (urql ou graphql-request)
- [ ] Queries GraphQL para cada tipo de dado:
  - `getProjects(locale)` — lista de projetos com tradução
  - `getClients()` — lista de clientes ordenada
  - `getSkills()` — habilidades por categoria
  - `getSiteConfig(locale)` — configurações gerais
- [ ] Implementar ISR (Incremental Static Regeneration) com `revalidate: 3600` (1h)
- [ ] Configurar on-demand revalidation via webhook do WordPress
- [ ] Feature flag: alternar entre JSON local e WordPress (`NEXT_PUBLIC_DATA_SOURCE`)
- [ ] Atualizar componentes para usar os novos data fetchers

#### 2.5 Validação e cutover (Small)
- [ ] Comparar output JSON vs WordPress (mesmos dados, mesma renderização)
- [ ] Testar edição no WordPress → revalidação → atualização no site
- [ ] Remover feature flag, desativar fallback JSON
- [ ] Testes de regressão visual (screenshots diff)
- [ ] Monitorar performance pós-migração

---

### FASE 3: Área de Impressão 3D (2-4 semanas)
**Dependência:** Fase 2 concluída

#### 3.1 Planejamento da área 3D (Small)
- [ ] Definir se será rota separada (`/impressao-3d`) ou seção no scroll horizontal
- [ ] Wireframe/mockup da nova área
- [ ] Definir categorias de produtos (brinquedos, organizadores, suportes, etc.)
- [ ] Listar produtos iniciais para o catálogo

#### 3.2 WordPress: novos CPTs (Medium)
- [ ] CPT `produto_3d` — campos ACF: nome, descrição (pt/en), fotos (gallery), preço, material (PLA/PETG), tempo de impressão, peso, dimensões, link Mercado Livre, link Shopee, link modelo (Thingiverse/MakerWorld), featured, status (disponível/sob encomenda)
- [ ] Taxonomy `categoria_3d` — nome, descrição, ícone, slug
- [ ] CPT `faq_3d` — campos ACF: pergunta (pt/en), resposta (pt/en), categoria, ordem
- [ ] Options Page `config_3d` — informações sobre a impressora (Bambu Lab A1 com AMS), materiais, processo

#### 3.3 Frontend: nova área (Large)
- [ ] `app/[locale]/impressao-3d/page.tsx` — página principal do catálogo
- [ ] `components/Print3D/ProductGrid.tsx` — grid de produtos com filtro por categoria
- [ ] `components/Print3D/ProductCard.tsx` — card de produto (imagem, nome, preço, links marketplace)
- [ ] `components/Print3D/ProductDetail.tsx` — modal/página de detalhe do produto
- [ ] `components/Print3D/FAQ.tsx` — seção de perguntas frequentes (accordion)
- [ ] `components/Print3D/About3D.tsx` — sobre o processo, impressora, materiais
- [ ] `components/Print3D/ContactForm.tsx` — formulário de orçamento específico
- [ ] Links de marketplace com ícones (Mercado Livre, Shopee)
- [ ] Adicionar link para a área 3D na navegação principal

#### 3.4 SEO para impressão 3D (Small)
- [ ] Metadata específica para a área 3D
- [ ] Structured data (Product, FAQ)
- [ ] Otimização para termos: "impressão 3D São Paulo", "produtos impressos 3D", etc.
- [ ] Sitemap atualizado com novas rotas

#### 3.5 Testes e deploy (Small)
- [ ] Testar catálogo com produtos reais
- [ ] Validar links para Mercado Livre e Shopee
- [ ] Testar formulário de orçamento
- [ ] Validar responsividade da nova área
- [ ] Deploy em produção

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
