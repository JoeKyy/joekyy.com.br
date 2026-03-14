# Estrutura Copilot Planner — Migração joekyy.com.br

## Arquivos e como usar

### Plano principal
- **`PLAN.md`** — Plano completo de migração com todas as tarefas em checkbox. O Copilot Planner usa este arquivo como fonte de verdade para saber o que fazer e o que já foi feito.

### Instruções do repositório
- **`.github/copilot-instructions.md`** — Instruções que o Copilot aplica automaticamente em toda interação neste workspace. Define stack, padrões de código, estrutura de pastas e o comportamento do scroll horizontal.

### Agente customizado
- **`.github/agents/migration-planner.agent.md`** — Agente especializado na migração. Usa o PLAN.md como guia. Invoque com `@migration-planner` no chat do Copilot.

### Prompts (tarefas executáveis)
Cada prompt é uma tarefa que pode ser executada pelo Copilot. Use na ordem:

| # | Arquivo | Fase | Descrição |
|---|---------|------|-----------|
| 1 | `01-setup-project.prompt.md` | 1.1 | Criar projeto Next.js, estrutura de pastas, deps |
| 2 | `02-horizontal-scroll.prompt.md` | 1.3 | Hook e componente de scroll horizontal (CRÍTICO) |
| 3 | `03-create-json-data.prompt.md` | 1.2 | JSONs com dados do site + data fetchers tipados |
| 4 | `04-build-sections.prompt.md` | 1.4-1.5 | Todas as seções: Nav, Hero, About, Portfolio, etc. |
| 5 | `05-setup-i18n.prompt.md` | 1.6 | Internacionalização pt-br / en-us com next-intl |
| 6 | `06-seo-deploy.prompt.md` | 1.9-1.10 | SEO, meta tags, Lighthouse, deploy Vercel |

### Como usar no VS Code / Copilot CLI

**VS Code:**
1. Abra o projeto no VS Code
2. No Copilot Chat, use o ícone de anexar (📎) → Prompt → selecione o prompt desejado
3. Ou digite `@migration-planner` para usar o agente customizado

**Copilot CLI (plan mode):**
```bash
# Shift+Tab para entrar em plan mode, depois:
copilot "Execute o prompt 01-setup-project para iniciar o projeto Next.js"
```

**Coding Agent (github.com):**
1. Vá em Issues → crie uma issue descrevendo a tarefa
2. Atribua ao Copilot coding agent
3. Ele vai ler PLAN.md e os prompts automaticamente
