# Yuni Tech — Website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React

## Getting started

```bash
npm install
npm run dev
```

## Architecture (feature-based)

```
src/
├── app/                  # Routes only — thin pages that compose features
│   ├── layout.tsx        # Root layout: fonts, Header/Footer, global SEO metadata
│   ├── page.tsx          # Home
│   ├── services/ about/ contact/
│   ├── sitemap.ts robots.ts not-found.tsx
│   └── globals.css       # Tailwind v4 @theme design tokens
├── features/             # One folder per feature/domain
│   └── <feature>/
│       ├── components/   # Feature-specific UI
│       ├── data/         # Static content / fetchers
│       └── index.ts      # Public API of the feature
├── components/
│   ├── ui/               # Primitives: Button, Container
│   ├── shared/           # Cross-feature: Logo, SectionHeading, MotionInView
│   └── layout/           # Header, Footer
├── config/               # site.ts (SEO/brand), navigation.ts
├── lib/                  # utils (cn), seo (buildMetadata), motion (variants)
├── hooks/                # Reusable client hooks
└── types/                # Shared TS types
```

Rules:
- `app/` pages never contain business UI — import from `@/features/*`.
- Features import from `@/components/*`, `@/lib/*`, never from other features' internals.
- Every route exports `metadata` via `buildMetadata()` from `@/lib/seo`.

## Design tokens (Figma)

Defined in `src/app/globals.css` under `@theme` (Tailwind v4 CSS-first config):

| Token            | Value     | Utilities                                          |
|------------------|-----------|----------------------------------------------------|
| brand-primary    | `#091D40` | `bg-brand-primary`, `text-brand-primary`, …        |
| brand-secondary  | `#2979FF` | `bg-brand-secondary`, `border-brand-secondary`, …  |
| brand-tertiary   | `#9AFC78` | `bg-brand-tertiary`, `text-brand-tertiary`, …      |

Each has `-light` / `-dark` variants, plus semantic `background`, `foreground`, `muted`, `muted-foreground`, `border`.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint
