# External Integrations

**Analysis Date:** 2026-03-05

## APIs & External Services

**Form Submission:**
- Web3Forms - Contact form submission endpoint
  - Endpoint: `https://api.web3forms.com/submit`
  - Method: POST with FormData
  - Auth: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` env var (sent as `access_key` in form payload)
  - Implementation: `src/components/ContactForm.tsx` (lines 233-241)
  - Sends: name, country phone code, WhatsApp number, interest type

**Bot Protection:**
- Google reCAPTCHA v3 - Invisible bot detection on contact form
  - Script: `https://www.google.com/recaptcha/api.js?render={siteKey}`
  - Auth: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` env var
  - Action: `contact_submit`
  - Implementation: `src/components/ContactForm.tsx` (lines 162-224)
  - Note: reCAPTCHA token is generated but NOT sent to Web3Forms (comment on line 226 confirms this). Additional client-side bot protection includes a honeypot field and a 1.5-second minimum form mount time check.

**Video Embeds:**
- YouTube - Embedded iframe videos
  - Desktop video: `https://www.youtube.com/embed/HcOtHUQE0xM`
  - Mobile video: `https://www.youtube.com/embed/McS4AyV-ayw`
  - Implementation: `src/app/page.tsx` (lines 287-294), `src/components/YoutubeVideo.tsx`

**External Assets:**
- Country flag icons loaded from external CDN
  - URL pattern: `http://purecatamphetamine.github.io/country-flag-icons/3x2/{CODE}.svg`
  - Implementation: `src/components/ContactForm.tsx` (lines 102, 144)
  - Note: Uses HTTP (not HTTPS) which may cause mixed-content warnings

## Data Storage

**Databases:**
- None - This is a static marketing site with no database

**File Storage:**
- Local filesystem only (`public/` directory)
- Static assets: renders, logos, brochures, fonts, activity images
- Brochure PDFs served from `public/brochure/` (mobile and desktop variants)

**Caching:**
- None (default Next.js caching behavior)

## Authentication & Identity

**Auth Provider:**
- None - No user authentication system
- The site is a public-facing marketing/landing page

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- `console.log` only (used in `src/components/ContactForm.tsx` and `src/components/LandingPage/Calculator.tsx`)

## CI/CD & Deployment

**Hosting:**
- Not detected from codebase (no Vercel config, Dockerfile, or deployment files found)

**CI Pipeline:**
- None detected (no `.github/workflows/`, no CI config files)

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Google reCAPTCHA v3 site key
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` - Web3Forms API access key for contact form submissions

**Env files present:**
- `.env` - Production/default environment configuration
- `.env.development` - Development overrides

## Social Media Links (Outbound)

**Linked Platforms (in `src/components/Footer.tsx`):**
- Instagram: `https://www.instagram.com/yarima.topocoro`
- Facebook: `https://www.facebook.com/share/17NMsPpvfX/`
- YouTube: `https://www.youtube.com/@YarimaResort`

## WhatsApp Integration

**WhatsApp Click-to-Chat:**
- Implementation: `src/hooks/useWhatsApp.ts`
- Phone number: `573016656808` (hardcoded default)
- Default message: "Hola, vi la web de Yarima Resort y estoy interesado en recibir mas informacion"
- Mobile: Opens `whatsapp://send` deep link
- Desktop: Opens `https://wa.me/` web link
- Floating button: `src/components/WhatsAppButton.tsx` (rendered globally in `src/app/layout.tsx`)
- CTA buttons: `src/components/CTAButtons.tsx/CTA_WhatsApp.tsx`, `src/components/CTAButtons.tsx/CTA_WhatsAppAlter.tsx`

## Webhooks & Callbacks

**Incoming:**
- None (no API routes exist)

**Outgoing:**
- Web3Forms submission (POST to `https://api.web3forms.com/submit`) acts as an outgoing webhook for contact form data

---

*Integration audit: 2026-03-05*
