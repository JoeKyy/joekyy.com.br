---
mode: agent
description: "Implementar todas as seções do site: Hero, About, Portfolio, Clients, Contact, Navigation"
---

Execute as Fases 1.4 e 1.5 do [PLAN.md](../../PLAN.md): Navigation e Seções do site.

## Ordem de implementação

### 1. `components/Navigation/index.tsx` ("use client")
- Menu lateral fixo (posição esquerda no desktop)
- Logo "JoeKyy - Soluções em TI e Web" linkando para #hello
- Links: sobre, portfólio, clientes, contato
- Cada link chama `scrollToSection(id)` do hook `useHorizontalScroll`
- Indicador visual da seção ativa (baseado em IntersectionObserver)
- Seletor de idioma (pt-br / en-us) usando next-intl `useRouter` e `usePathname`
- Mobile: hamburger menu com overlay

### 2. `components/Hero/index.tsx`
- Saudação: "Olá! Eu sou o Jhomar, mas pode me chamar de Joe. E eu crio sites."
- Avatar: `/images/avatar.png` com next/image
- Animação de entrada com Framer Motion (fade + slide)
- Dados vêm do JSON de locale

### 3. `components/About/index.tsx`
- Bio profissional (texto do JSON locale)
- Formação: Uninove (ADS), XP Educação (MBA Gestão TI)
- Grid de habilidades (componente `SkillBadge`)
- Links para currículos (Português e Inglês) — links Dropbox do site atual
- Layout: texto à esquerda, habilidades à direita

### 4. `components/Portfolio/index.tsx` + `components/Portfolio/ProjectCard.tsx`
- Listar projetos de `data/portfolio.json`
- Cada `ProjectCard`: imagem (next/image), título, descrição, tags coloridas, tecnologias
- Botão "Veja todos os trabalhos" — inicialmente mostra featured, clique expande todos
- Layout: grid ou lista horizontal dentro da seção
- Descrição no idioma correto (baseado no locale)

### 5. `components/Clients/index.tsx`
- Grid de logos (19 clientes)
- Cada logo: next/image com tamanho uniforme
- Texto introdutório do JSON locale
- Logos em grayscale com hover colorido (Tailwind: `grayscale hover:grayscale-0`)

### 6. `components/Contact/index.tsx`
- Texto: "Interessado? Vamos conversar!"
- Email: contato@joekyy.com.br (mailto link)
- Layout simples e clean

### 7. Montagem em `app/[locale]/page.tsx`
Montar todas as seções dentro do `HorizontalScroll`:
```tsx
<HorizontalScroll>
  <section id="hello"><Hero /></section>
  <section id="sobre"><About /></section>
  <section id="portifolio"><Portfolio /></section>
  <section id="clientes"><Clients /></section>
  <section id="contato"><Contact /></section>
</HorizontalScroll>
```

## Regras
- Todos os textos via JSON locale (nunca hardcoded)
- Todas as imagens via next/image
- Tailwind para todos os estilos
- Cada seção ocupa `min-w-screen h-screen` para o scroll-snap funcionar
- "use client" só onde necessário (componentes com interatividade)

## Referência
- Site atual para referência visual: https://joekyy.com.br/pt-br/
- Consulte [copilot-instructions.md](../../.github/copilot-instructions.md)
