# Codebase Structure

**Analysis Date:** 2026-03-05

## Directory Layout

```
yarima/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Navbar, WhatsAppButton, fonts)
│   │   ├── page.tsx            # Home page (/)
│   │   ├── globals.css         # Tailwind config, theme colors, fonts, slick overrides
│   │   ├── aliados/
│   │   │   └── page.tsx        # /aliados - Strategic partners
│   │   ├── contacto/
│   │   │   └── page.tsx        # /contacto - Contact form
│   │   ├── ecosistema/
│   │   │   └── page.tsx        # /ecosistema - Resort/Beach/Lounge features
│   │   ├── inversion/
│   │   │   └── page.tsx        # /inversion - Investment details & FAQ
│   │   └── topocoro/
│   │       └── page.tsx        # /topocoro - Location information
│   ├── components/             # Shared UI components
│   │   ├── Accordion.tsx       # Expandable FAQ-style component
│   │   ├── Button.tsx          # Generic styled button
│   │   ├── ContactForm.tsx     # Contact form with Zod + TanStack Form + reCAPTCHA
│   │   ├── Container.tsx       # Max-width content wrapper (1200px)
│   │   ├── Footer.tsx          # Site footer with social links
│   │   ├── Gallery.tsx         # Image gallery modal with lightbox
│   │   ├── HashScrollHandler.tsx # Client component that handles hash-based scrolling
│   │   ├── Modal.tsx           # Generic modal with backdrop + animations
│   │   ├── ParallaxImage.tsx   # Hero parallax with image carousel
│   │   ├── Section.tsx         # Page section wrapper with fade-in animation
│   │   ├── SectionTitle.tsx    # Standardized section heading
│   │   ├── VideoSection.tsx    # Video thumbnail with animated play button
│   │   ├── WhatsAppButton.tsx  # Floating WhatsApp button (fixed position)
│   │   ├── YoutubeVideo.tsx    # Responsive YouTube embed (desktop/mobile variants)
│   │   ├── CTAButtons.tsx/     # CTA button variants (NOTE: directory named with .tsx extension)
│   │   │   ├── CTAButton.tsx   # Base CTA button component
│   │   │   ├── CTA_WhatsApp.tsx      # "Contactanos" + WhatsApp icon
│   │   │   ├── CTA_WhatsAppAlter.tsx # "Hablar con un asesor ahora" variant
│   │   │   ├── CTA_Brochure.tsx      # Brochure download CTA
│   │   │   └── CTA_BookMeeting.tsx   # Meeting booking CTA (Kuantia link)
│   │   ├── LandingPage/        # Home page-specific components
│   │   │   ├── AlliesSlider.tsx # Logo slider carousel (react-slick)
│   │   │   └── Calculator.tsx  # Investment payment calculator
│   │   └── Navbar/             # Navigation components
│   │       ├── Navbar.tsx      # Main navbar with mobile menu
│   │       └── NavBarButton.tsx # Individual nav link button
│   └── hooks/                  # Custom React hooks
│       ├── useDownloadBrochure.ts  # Brochure download (mobile/desktop PDF)
│       ├── useIsMobile.ts          # Mobile device detection
│       ├── useNavigateWithScroll.ts # Cross-page navigation with hash scrolling
│       ├── useScrollPosition.ts    # Window scroll position tracking
│       ├── useScreenSize.ts        # Tailwind breakpoint detection
│       └── useWhatsApp.ts          # WhatsApp link generation (mobile/desktop)
├── public/                     # Static assets
│   ├── actividades/            # Activity images (nautica, relajacion, etc.)
│   ├── brochure/               # PDF brochures (mobile + desktop versions)
│   ├── fonts/                  # Custom fonts
│   │   ├── switzer/            # Switzer font files (eot, woff2, woff, ttf)
│   │   └── WEB/               # Additional web fonts
│   ├── logos/                  # Brand logos
│   │   └── slider/            # Partner/ally logos for carousel
│   ├── model/                  # Investment model images
│   ├── renders/                # Architectural renders
│   │   ├── beach/              # Beach club renders + thumbnails/
│   │   ├── v1/                 # Resort renders v1
│   │   └── v2/                 # Resort renders v2 + thumbnails/
│   ├── topocoro/               # Topocoro location photos
│   ├── nav-logo.png            # Navbar logo
│   ├── logo-full.png           # Full logo (color)
│   ├── logo-full-blanco.png    # Full logo (white, for footer)
│   └── simple-logo.png         # Simplified logo
├── package.json                # Dependencies and scripts
├── next.config.ts              # Next.js config (minimal/empty)
├── tsconfig.json               # TypeScript config with @/* path alias
├── postcss.config.mjs          # PostCSS config (Tailwind)
├── eslint.config.mjs           # ESLint config
└── next-env.d.ts               # Next.js TypeScript declarations
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router pages and global styles
- Contains: One `page.tsx` per route, root `layout.tsx`, `globals.css`
- Key files: `src/app/layout.tsx` (root layout), `src/app/globals.css` (theme definition)

**`src/components/`:**
- Purpose: All reusable UI components
- Contains: Layout primitives, media components, navigation, forms, CTA buttons
- Key files: `src/components/Section.tsx` and `src/components/Container.tsx` (used by every page)

**`src/components/CTAButtons.tsx/`:**
- Purpose: Call-to-action button variants
- Contains: Base button + 4 specialized CTA components
- Note: This directory has a `.tsx` extension in its name (unusual naming)

**`src/components/LandingPage/`:**
- Purpose: Components used only on the home page
- Contains: `AlliesSlider.tsx` (partner logos carousel), `Calculator.tsx` (investment calculator)

**`src/components/Navbar/`:**
- Purpose: Navigation bar components
- Contains: Main `Navbar.tsx` + `NavBarButton.tsx`

**`src/hooks/`:**
- Purpose: Custom React hooks for browser-side logic
- Contains: Device detection, scroll tracking, external action helpers (WhatsApp, brochure download)

**`public/`:**
- Purpose: Static assets served at root URL
- Contains: Images (renders, logos, activities, topocoro photos), fonts, brochure PDFs, favicons
- Key pattern: Images referenced directly in components as `/renders/v2/1.jpg`, `/logos/slider/vimarsa.svg`, etc.

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout -- renders on every page
- `src/app/page.tsx`: Home page -- longest page component (~300 lines)

**Configuration:**
- `src/app/globals.css`: Theme colors, fonts, Tailwind v4 `@theme` block
- `tsconfig.json`: TypeScript config with `@/*` path alias mapping to `./src/*`
- `next.config.ts`: Empty Next.js config
- `package.json`: Dependencies and npm scripts

**Core Logic:**
- `src/components/ContactForm.tsx`: Contact form with validation, bot protection, reCAPTCHA, Web3Forms submission
- `src/components/LandingPage/Calculator.tsx`: Investment calculator with payment computation logic

**Testing:**
- No test files exist in the codebase

## Naming Conventions

**Files:**
- Components: PascalCase (`ParallaxImage.tsx`, `ContactForm.tsx`, `SectionTitle.tsx`)
- Hooks: camelCase with `use` prefix (`useScrollPosition.ts`, `useIsMobile.ts`)
- Pages: Always `page.tsx` inside route directory (Next.js convention)
- CTA components: `CTA_` prefix with PascalCase (`CTA_WhatsApp.tsx`, `CTA_Brochure.tsx`)

**Directories:**
- Route directories: lowercase Spanish names (`aliados/`, `contacto/`, `ecosistema/`, `inversion/`, `topocoro/`)
- Component directories: PascalCase (`LandingPage/`, `Navbar/`)
- Exception: `CTAButtons.tsx/` -- directory named with `.tsx` extension

**Exports:**
- All components use `export default`
- Hooks use named exports (`export const useWhatsApp`, `export function useScrollPosition`)

## Where to Add New Code

**New Page:**
- Create directory under `src/app/` with Spanish route name
- Create `page.tsx` inside the directory
- Add `"use client"` directive at top
- Follow the composition pattern: `Section > Container > content` blocks
- Add route to `menuItems` array in `src/components/Navbar/Navbar.tsx` (line 54)
- Include `<Footer />` at the bottom

**New Shared Component:**
- Place in `src/components/` as PascalCase `.tsx` file
- Add `"use client"` directive (all existing components are client-side)
- Export as default

**New CTA Button Variant:**
- Add to `src/components/CTAButtons.tsx/` directory
- Follow pattern: import `CTAButtonBase`, compose with onClick handler
- Use hooks from `src/hooks/` for actions

**New Custom Hook:**
- Place in `src/hooks/` as `use[Name].ts`
- Add `"use client"` directive
- Export as named export

**New Static Assets:**
- Images: Place in appropriate `public/` subdirectory
- Reference in components as absolute path from root (e.g., `/renders/v2/8.jpg`)
- For gallery images, provide both thumbnail and full-res versions in `thumbnails/` subdirectory

## Special Directories

**`public/renders/`:**
- Purpose: Architectural render images for the resort and beach club
- Generated: Yes (3D renders, not code-generated)
- Committed: Yes
- Contains subdirectories with `thumbnails/` for optimized gallery previews

**`public/brochure/`:**
- Purpose: Downloadable PDF brochures (separate mobile and desktop versions)
- Generated: Yes (designed externally)
- Committed: Yes

**`public/fonts/switzer/`:**
- Purpose: Custom Switzer font files for the site's primary typeface
- Generated: No (third-party font)
- Committed: Yes
- Referenced from: `src/app/globals.css` via `@font-face`

**`.planning/`:**
- Purpose: Project planning documents and codebase analysis
- Generated: By tooling
- Committed: Yes

---

*Structure analysis: 2026-03-05*
