---
mode: agent
description: "Criar os arquivos JSON com todos os dados do site joekyy.com.br e os data fetchers tipados"
---

Execute a Fase 1.2 do [PLAN.md](../../PLAN.md): Tipos TypeScript e dados JSON.

## Dados para extrair do site atual

O site está em https://joekyy.com.br/pt-br/ — extraia todos os dados e crie os JSONs.

### `data/portfolio.json`

11 projetos identificados:
1. ESG por Lana Pinheiro — freelance, design + dev
2. Escola ITV — freelance, WordPress
3. Miguel 44 — freelance, campanha eleitoral
4. Bora Paraiba — freelance, campanha eleitoral
5. Revista Koreain — WordPress, design remodelado, freelance
6. Portal do Investidor (B3) — Angular 10, prestação de serviço para Microsoft
7. Culturice — freelance, design + dev
8. Theo/AASP — ReactJS, prestação de serviço para 7Comn
9. Portal do Credenciado Amil — Angular, prestação de serviço para Cubo
10. Campanha Azul — HTML/CSS/JS, freelance
11. Núcleo Capivara — HTML/CSS/JS, freelance

Cada projeto deve ter: `id`, `title`, `image`, `description` (objeto com `pt-br` e `en-us`), `tags`, `technologies`, `client`, `type` (freelance/service), `featured`, `order`.

### `data/clients.json`

19 logos de clientes. Usar nomes genéricos se não identificáveis (client-01 a client-19). Campos: `id`, `name`, `logo`, `url`, `order`.

### `data/skills.json`

Duas categorias:
- Técnicas: Angular, React, Node.js, WordPress, HTML/CSS/JavaScript
- Complementares: Arquitetura de Soluções, UX & UI Design, Gestão de TI e Agil, SEO, Acessibilidade

Campos: `id`, `name`, `category`, `order`.

### `data/pt-br.json` e `data/en-us.json`

Textos da UI: hero greeting, about bio, section titles, contact text, resume links, meta description, etc.

### `lib/data.ts`

Data fetchers tipados que importam os JSONs:
```typescript
import type { Project, Client, Skill, LocaleContent } from '@/types'

export function getProjects(): Project[]
export function getClients(): Client[]
export function getSkills(): Skill[]
export function getContent(locale: string): LocaleContent
```

## Referência
- Tipos definidos em `types/index.ts` (criado no setup)
- Consulte [copilot-instructions.md](../../.github/copilot-instructions.md)
