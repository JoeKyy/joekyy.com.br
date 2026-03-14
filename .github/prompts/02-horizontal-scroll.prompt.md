---
mode: agent
description: "Implementar o componente HorizontalScroll e o hook useHorizontalScroll — peça crítica da migração"
---

Execute a Fase 1.3 do [PLAN.md](../../PLAN.md): Componente HorizontalScroll.

Este é o componente **mais importante** do projeto. O site joekyy.com.br rola **horizontalmente** (esquerda para direita), não verticalmente. O scroll do mousewheel vertical é convertido em scroll horizontal.

## Implementação do hook `hooks/useHorizontalScroll.ts`

```typescript
// O hook deve:
// 1. Receber uma ref do container
// 2. Adicionar event listener no 'wheel' que faz:
//    - evt.preventDefault()
//    - container.scrollLeft += evt.deltaY
// 3. Suportar scroll-snap via CSS
// 4. Expor função scrollToSection(sectionId) que usa scrollIntoView
// 5. Rastrear a seção ativa (IntersectionObserver horizontal)
// 6. Cleanup no unmount
```

## Implementação do componente `components/HorizontalScroll/index.tsx`

O componente deve:
- Ser um container `"use client"` (precisa de browser APIs)
- Usar `display: flex`, `overflow-x: scroll`, `overflow-y: hidden`
- Aplicar `scroll-snap-type: x mandatory` no container
- Cada filho (seção) recebe `scroll-snap-align: start`, `min-w-screen`, `h-screen`
- Esconder a scrollbar com CSS (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`)
- Receber `children` como prop e wrappá-los no container

## CSS Tailwind necessário

Adicione ao `globals.css` se necessário:
```css
.horizontal-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.horizontal-scroll::-webkit-scrollbar {
  display: none;
}
```

## Navegação por âncora

A função `scrollToSection` deve usar:
```typescript
element.scrollIntoView({ behavior: 'smooth', inline: 'start' })
```

## Testes necessários
- Scroll horizontal funciona com mousewheel
- Snap funciona entre seções
- Navegação por âncora funciona suavemente
- Touch/swipe funciona em mobile
- Não quebra o scroll vertical dentro de seções com conteúdo longo

## Referência
- Site atual: https://joekyy.com.br/pt-br/ (observe o scroll horizontal)
- Consulte [copilot-instructions.md](../../.github/copilot-instructions.md)
