# Technology Stack

**Analysis Date:** 2026-03-05

## Languages

**Primary:**
- TypeScript ^5 - All application code (`src/**/*.ts`, `src/**/*.tsx`)
- CSS - Styling via Tailwind CSS v4 (`src/app/globals.css`)

**Secondary:**
- HTML - Embedded in JSX/TSX components

## Runtime

**Environment:**
- Node.js (version not pinned; no `.nvmrc` or `.node-version` file)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 15.5.2 - Full-stack React framework with App Router
  - Turbopack enabled for both `dev` and `build` scripts
  - Config: `next.config.ts` (minimal, no custom options)
- React 19.1.0 - UI library
- React DOM 19.1.0 - DOM rendering

**Styling:**
- Tailwind CSS ^4 - Utility-first CSS framework
  - Integrated via PostCSS plugin `@tailwindcss/postcss` in `postcss.config.mjs`
  - Custom theme colors defined in `src/app/globals.css` using `@theme inline` directive
  - Color system: `theme-gold`, `theme-background-*` (50-950), `theme-background-dark-*` (50-950), `text-primary`, `text-primary-light`

**Linting:**
- ESLint ^9 with flat config (`eslint.config.mjs`)
  - Extends: `next/core-web-vitals`, `next/typescript`
  - Custom rule: `@next/next/no-img-element` disabled (allows `<img>` tags instead of `next/image`)

**Build/Dev:**
- Turbopack - Bundler (used via `next dev --turbopack` and `next build --turbopack`)
- PostCSS - CSS processing (`postcss.config.mjs`)
- TypeScript - Compilation target ES2017, bundler module resolution (`tsconfig.json`)

## Key Dependencies

**Critical:**
- `framer-motion` ^12.23.12 - Animations, scroll-triggered effects, page transitions. Used throughout components for `motion.div`, `animate`, `useMotionValue`, `useTransform`.
- `@tanstack/react-form` ^1.23.0 - Form state management with validation. Used in `src/components/ContactForm.tsx` and `src/components/LandingPage/Calculator.tsx`.
- `zod` ^4.1.9 - Schema validation (imported as `zod/v4`). Validates contact form and calculator inputs.

**UI Components:**
- `react-slick` ^0.31.0 + `slick-carousel` ^1.8.1 - Carousel/slider component. CSS imported in `src/app/layout.tsx`, custom overrides in `src/app/globals.css`.
- `@heroicons/react` ^2.2.0 - SVG icons (outline and solid variants)
- `react-icons` ^5.5.0 - Additional icon set (used for social media icons: Instagram, Facebook, YouTube in `src/components/Footer.tsx`)
- `react-countup` ^6.5.3 - Animated number counting

**Utility:**
- `country-codes-flags-phone-codes` ^1.1.1 - Country phone code data for contact form country selector
- `country-flag-icons` ^1.5.21 - Country flag SVGs (referenced via external CDN URL, not locally served)

**Type Definitions:**
- `@types/react` ^19
- `@types/react-dom` ^19
- `@types/node` ^20
- `@types/react-slick` ^0.23.13

## Configuration

**Environment:**
- `.env` file present - contains environment configuration
- `.env.development` file present - development overrides
- Required public env vars:
  - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Google reCAPTCHA v3 site key (used in `src/components/ContactForm.tsx`)
  - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` - Web3Forms API access key (used in `src/components/ContactForm.tsx`)

**TypeScript:**
- Path alias: `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- Strict mode enabled
- JSX: preserve (handled by Next.js)
- Incremental compilation enabled

**Build:**
- `next.config.ts` - Minimal config with no custom options
- `postcss.config.mjs` - Tailwind CSS via `@tailwindcss/postcss` plugin
- `eslint.config.mjs` - ESLint flat config

## Fonts

**Custom Fonts:**
- Switzer - Self-hosted in `public/fonts/switzer/` (Regular 400, Medium 500, Semibold 600, Bold 700). Declared via `@font-face` in `src/app/globals.css`. Set as primary font-family on `body`.
- Geist Sans - Google Font loaded via `next/font/google` in `src/app/layout.tsx`, set as CSS variable `--font-geist-sans`
- Geist Mono - Google Font loaded via `next/font/google` in `src/app/layout.tsx`, set as CSS variable `--font-geist-mono`

## NPM Scripts

```bash
npm run dev        # next dev --turbopack
npm run build      # next build --turbopack
npm start          # next start
npm run lint       # next lint
```

## Platform Requirements

**Development:**
- Node.js (modern version supporting ES2017+)
- npm

**Production:**
- Static-capable hosting or Node.js server (Next.js App Router)
- No API routes detected - purely client-side rendering with external form submission

---

*Stack analysis: 2026-03-05*
