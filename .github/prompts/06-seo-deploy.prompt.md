---
mode: agent
description: "Configurar SEO, performance, meta tags e preparar deploy na Vercel"
---

Execute as Fases 1.9 e 1.10 do [PLAN.md](../../PLAN.md): SEO, performance e deploy.

## SEO

### Metadata
- `generateMetadata` em `app/[locale]/layout.tsx` com title, description, og:image, twitter:card por locale
- Título: "JoeKyy - Soluções em TI e WEB | Jhomar Nando Portfolio"
- Structured data JSON-LD: `Person`, `WebSite`, `ItemList` (portfólio)

### Arquivos estáticos
- `app/sitemap.ts` — gerar sitemap dinâmico com rotas /pt-br/ e /en-us/
- `app/robots.ts` — permitir crawling, referenciar sitemap
- `app/manifest.ts` — PWA manifest básico
- Favicon e apple-touch-icon em `/app/`

### Open Graph
- og:image padrão (screenshot do site ou logo)
- og:locale para cada idioma
- twitter:card summary_large_image

## Performance
- Verificar que todas as imagens usam next/image com `sizes` correto
- Hero image com `priority={true}`
- Demais imagens com lazy loading (default)
- Font optimization: usar `next/font` para fontes do site
- Verificar bundle size com `next build`

## Deploy Vercel
- Criar `vercel.json` se necessário (headers, redirects)
- Configurar redirects 301 de URLs antigas se houver mudança de estrutura
- Configurar domínio joekyy.com.br
- Variáveis de ambiente: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DATA_SOURCE` (json/wordpress)

## Validação final
- Lighthouse: ≥ 90 em Performance, Accessibility, Best Practices, SEO
- Testar com PageSpeed Insights
- Validar Open Graph com https://www.opengraph.xyz/
- Testar schema com https://search.google.com/test/rich-results

## Referência
- Consulte [copilot-instructions.md](../../.github/copilot-instructions.md)
