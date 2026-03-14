---
mode: agent
description: "Inicializar o projeto Next.js da migração joekyy.com.br com toda a estrutura base"
---

Execute a Fase 1.1 do [PLAN.md](../../PLAN.md): Setup do projeto.

## Tasks

1. Crie o projeto Next.js com App Router, TypeScript, Tailwind CSS e ESLint
2. Crie a estrutura de pastas conforme definido no plano:
   - `app/[locale]/page.tsx` e `app/[locale]/layout.tsx`
   - `app/page.tsx` (seletor de idioma)
   - `components/` com subpastas para cada seção
   - `data/` para os JSONs
   - `hooks/` para custom hooks
   - `lib/` para data fetchers
   - `types/` para interfaces TypeScript
3. Configure o `tailwind.config.ts` com cores customizadas do site (tema escuro, azul/roxo do portfólio)
4. Configure path aliases no `tsconfig.json` (`@/components`, `@/data`, `@/lib`, `@/types`, `@/hooks`)
5. Instale as dependências: `framer-motion`, `next-intl`
6. Crie o arquivo `types/index.ts` com as interfaces base: `Project`, `Client`, `Skill`, `SiteConfig`, `LocaleContent`

## Referência
Consulte [copilot-instructions.md](../../.github/copilot-instructions.md) para padrões de código e estrutura.
