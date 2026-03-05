# Architecture

**Analysis Date:** 2026-03-05

## Pattern Overview

**Overall:** Next.js App Router - Static Marketing Site (Client-Side Rendered)

**Key Characteristics:**
- All pages use `"use client"` directive -- the entire site renders client-side
- No server components, no API routes, no server-side data fetching
- No database or backend -- content is hardcoded in page components
- Form submission goes to external service (Web3Forms)
- Pure presentational architecture: pages compose reusable UI components with inline content

## Layers

**Pages (Route Layer):**
- Purpose: Define URL routes and compose full-page layouts from components
- Location: `src/app/*/page.tsx`
- Contains: Page-level content (hardcoded text, image paths, feature lists), component composition, local state for modals/galleries
- Depends on: Components, Hooks
- Used by: Next.js router

**Shared Components:**
- Purpose: Reusable UI building blocks
- Location: `src/components/`
- Contains: Layout primitives (`Section`, `Container`), media components (`ParallaxImage`, `Gallery`, `Modal`, `VideoSection`, `YoutubeVideo`), navigation (`Navbar/`), CTA buttons (`CTAButtons.tsx/`), form (`ContactForm`), content (`Footer`, `SectionTitle`, `Accordion`, `Button`)
- Depends on: Hooks, framer-motion, heroicons, react-icons
- Used by: All pages

**Custom Hooks:**
- Purpose: Encapsulate browser-side logic (scroll detection, device detection, external actions)
- Location: `src/hooks/`
- Contains: `useScrollPosition`, `useScreenSize`, `useIsMobile`, `useNavigateWithScroll`, `useDownloadBrochure`, `useWhatsApp`
- Depends on: React, Next.js router, browser APIs
- Used by: Components and Pages

**Styles/Theme:**
- Purpose: Global CSS, custom font loading, Tailwind theme configuration
- Location: `src/app/globals.css`
- Contains: Tailwind v4 `@theme` block with custom color palette, Switzer font-face declarations, slick-carousel overrides
- Depends on: Tailwind CSS v4, font files in `public/fonts/`
- Used by: All components via Tailwind utility classes

## Data Flow

**Page Rendering:**
1. User navigates to a route (e.g., `/ecosistema`)
2. Next.js loads `src/app/ecosistema/page.tsx` as a client component
3. Page component renders hardcoded content using shared components
4. `framer-motion` handles scroll-triggered fade-in animations via `Section` component
5. No data fetching occurs -- all content is static JSX

**Contact Form Submission:**
1. User fills out `ContactForm` in `src/components/ContactForm.tsx`
2. Client-side validation via `zod` schema + `@tanstack/react-form`
3. Bot protection: honeypot field + time-based check (1500ms minimum) + reCAPTCHA v3
4. Form data sent to `https://api.web3forms.com/submit` via POST (FormData)
5. Success/error state displayed inline

**Cross-Page Navigation with Hash Scrolling:**
1. `useNavigateWithScroll` hook calls `router.push('/path#elementId')`
2. `HashScrollHandler` component (mounted in root layout) listens for hash changes
3. `useHashScroll` hook polls for target element via `requestAnimationFrame` (up to 2s)
4. Scrolls to element with 96px offset (navbar height compensation)

**WhatsApp CTA Flow:**
1. CTA button calls `useWhatsApp().openWhatsApp()`
2. Hook detects mobile vs desktop via `useIsMobile()`
3. Opens `whatsapp://send?...` (mobile) or `https://wa.me/...` (desktop) in new tab

**State Management:**
- No global state management (no Redux, Zustand, Context)
- All state is component-local via `useState`
- Common local state patterns: modal open/close, gallery selection, form values

## Key Abstractions

**Section + Container (Layout Primitives):**
- Purpose: Standardized page section layout with consistent padding and max-width
- Files: `src/components/Section.tsx`, `src/components/Container.tsx`
- Pattern: `Section` wraps content with vertical padding and optional fade-in animation; `Container` constrains width to 1200px with horizontal padding
- Every page follows the pattern: `<Section><Container>...content...</Container></Section>`

**CTAButton System:**
- Purpose: Consistent call-to-action buttons across the site
- Files: `src/components/CTAButtons.tsx/CTAButton.tsx` (base), `CTA_WhatsApp.tsx`, `CTA_Brochure.tsx`, `CTA_BookMeeting.tsx`, `CTA_WhatsAppAlter.tsx`
- Pattern: `CTAButtonBase` provides styled button shell; specialized CTA components compose it with specific onClick handlers via hooks

**ParallaxImage (Hero Sections):**
- Purpose: Full-screen hero with parallax scroll effect and image carousel
- File: `src/components/ParallaxImage.tsx`
- Pattern: Accepts single or array of image URLs, auto-fades between them on interval, applies scroll-based parallax via framer-motion `useScroll`/`useTransform`

**Page Composition Pattern:**
- Every page follows the same structure:
  1. Hero `ParallaxImage` section (full width, overlaid text)
  2. Multiple `Section > Container` blocks with content
  3. CTA button groups between sections
  4. `Footer` at bottom
  5. Optional `Modal` for video playback

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: All page loads (wraps every page)
- Responsibilities: Loads Google fonts (Geist), imports `globals.css` and slick-carousel CSS, renders `Navbar`, `HashScrollHandler`, and floating `WhatsAppButton`

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: `/` route
- Responsibilities: Landing page with hero, ecosystem cards, investment calculator, allies slider, video modal

**Sub-Pages:**
- `src/app/ecosistema/page.tsx` - `/ecosistema` - Resort/Beach Club/Lounge features with galleries
- `src/app/inversion/page.tsx` - `/inversion` - Investment details, payment methods, FAQ accordion
- `src/app/aliados/page.tsx` - `/aliados` - Strategic allies/partners listing
- `src/app/topocoro/page.tsx` - `/topocoro` - Location information about Topocoro reservoir
- `src/app/contacto/page.tsx` - `/contacto` - Contact form page

## Error Handling

**Strategy:** Minimal -- no error boundaries, no global error handling

**Patterns:**
- Contact form: try/catch around reCAPTCHA execution; checks `data.success` from Web3Forms response
- Calculator: Zod validation with inline error messages displayed per field
- No `error.tsx` or `not-found.tsx` files in app directory (uses Next.js defaults)

## Cross-Cutting Concerns

**Logging:** `console.log` only -- used in `ContactForm` for form values debugging and submission results
**Validation:** Zod schemas with `@tanstack/react-form` integration (used in `ContactForm` and `Calculator`)
**Authentication:** None -- public marketing site
**Animation:** Framer Motion throughout -- fade-in sections, parallax, modal transitions, navbar animations
**Responsive Design:** Tailwind breakpoints (sm/md/lg/xl/2xl) + `useScreenSize` hook + `useIsMobile` hook for device-specific behavior
**SEO:** Only root-level `metadata` export in `layout.tsx`; no per-page metadata exports

---

*Architecture analysis: 2026-03-05*
