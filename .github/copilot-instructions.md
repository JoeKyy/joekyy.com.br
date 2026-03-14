# Copilot Instructions — joekyy.com.br

## Project context
This is a migration of joekyy.com.br from static HTML/CSS/JS to Next.js. The site is a developer portfolio with a distinctive **horizontal scroll** (left-to-right) navigation. The migration plan is in [PLAN.md](../../PLAN.md).

## Tech stack
- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **i18n:** next-intl
- **Data:** JSON files in `/data` (phase 1), WordPress GraphQL (phase 2)
- **Deploy:** Vercel

## Coding standards
- Use functional components with hooks (no class components)
- All components must be typed with TypeScript interfaces/types in `/types`
- Use `"use client"` directive only when necessary (prefer server components)
- CSS: Tailwind utility classes, avoid inline styles. Custom values in `tailwind.config.ts`
- File naming: PascalCase for components (`HorizontalScroll.tsx`), camelCase for utils (`useHorizontalScroll.ts`)
- Exports: named exports for components, default export only for pages
- Data fetching: centralize in `/lib/data.ts`, always typed
- Images: always use `next/image` with explicit `width`, `height`, and `alt`
- i18n: all user-facing strings must come from locale JSON files, never hardcoded

## Critical behavior: horizontal scroll
The site's scroll is horizontal, not vertical. This is the core UX feature. When implementing:
- The main container uses `display: flex`, `overflow-x: scroll`, `overflow-y: hidden`
- Mouse wheel `deltaY` is converted to `scrollLeft` via event listener
- Each section is `min-width: 100vw`, `height: 100vh` with `scroll-snap-align: start`
- Navigation uses `scrollIntoView({ behavior: 'smooth', inline: 'start' })`
- The `useHorizontalScroll` hook encapsulates all scroll logic

## Project structure
```
app/
  [locale]/
    page.tsx          # Main page with all sections
    layout.tsx        # Locale layout with metadata
    impressao-3d/     # Phase 3: 3D printing area
      page.tsx
  page.tsx            # Root: language selector
components/
  HorizontalScroll/   # Core scroll container
  Navigation/         # Sidebar nav with anchors
  Hero/              # Welcome section
  About/             # Bio, skills, resume
  Portfolio/         # Project cards
  Clients/           # Client logos
  Contact/           # Contact info
  Print3D/           # Phase 3: 3D printing components
data/
  portfolio.json
  clients.json
  skills.json
  pt-br.json
  en-us.json
hooks/
  useHorizontalScroll.ts
lib/
  data.ts            # Data fetchers (JSON → WordPress later)
  wordpress.ts       # Phase 2: GraphQL client
types/
  index.ts           # All TypeScript interfaces
public/
  images/
    portfolio/
    clients/
```

## Languages
The site supports pt-br and en-us. Default locale is pt-br. All content must be available in both languages.
