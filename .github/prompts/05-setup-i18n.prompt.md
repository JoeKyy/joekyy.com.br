---
mode: agent
description: "Configurar internacionalização com next-intl para pt-br e en-us"
---

Execute a Fase 1.6 do [PLAN.md](../../PLAN.md): Internacionalização.

## Setup next-intl

### 1. Configuração base
- Criar `i18n/config.ts` com locales: `['pt-br', 'en-us']`, default: `'pt-br'`
- Criar `i18n/request.ts` com `getRequestConfig`
- Criar `middleware.ts` na raiz com `createMiddleware` do next-intl

### 2. Rotas
- `app/[locale]/layout.tsx` — layout com `NextIntlClientProvider`, metadata dinâmica por locale
- `app/[locale]/page.tsx` — página principal
- `app/page.tsx` — seletor de idioma (redirect ou página com dois botões: Português / English)

### 3. Uso nos componentes
- Server components: usar `getTranslations` do next-intl
- Client components: usar `useTranslations` hook
- Para dados do portfólio com campo `description: { "pt-br": "...", "en-us": "..." }`, usar o locale para selecionar a versão correta

### 4. Metadata dinâmica
```typescript
export async function generateMetadata({ params }: { params: { locale: string } }) {
  // Retornar title, description, og tags no idioma correto
}
```

### 5. Validação
- Navegar para /pt-br/ mostra conteúdo em português
- Navegar para /en-us/ mostra conteúdo em inglês
- Seletor de idioma no nav troca corretamente
- URLs são preservadas: /pt-br/ e /en-us/ (mesma estrutura do site atual)
- Fallback: / redireciona para seletor ou para pt-br

## Referência
- Docs next-intl: https://next-intl.dev
- Consulte [copilot-instructions.md](../../.github/copilot-instructions.md)
