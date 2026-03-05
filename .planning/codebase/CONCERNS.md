# Concerns

## Tech Debt

### No `next/image` Usage
- All components use raw `<img>` tags instead of Next.js `Image` component
- Missing automatic image optimization, lazy loading, and responsive sizing
- Affects every component with images across the codebase

### All Components Are `"use client"`
- Every component is marked as client-side rendered
- Prevents server-side rendering benefits (SEO, performance, reduced JS bundle)
- Should evaluate which components truly need client interactivity

### HTTP Flag Icon URLs
- Flag icons loaded over HTTP instead of HTTPS in country selector
- Mixed content warnings in production

### Commented-Out Code
- Dead/commented code scattered across components
- Should be removed and tracked via version control instead

### Console.log in Production
- `console.log` statements left in production code
- Form data and debug info logged to browser console

### Type Safety Suppressions
- `any` type casting used in places (e.g., YoutubeVideo component)
- Reduces TypeScript's ability to catch errors at compile time

## Known Bugs

### Footer Logo Relative Path
- Footer logo uses a relative path that breaks on subpages/nested routes
- Should use absolute path from public directory

### WhatsApp Message Not URL-Encoded
- WhatsApp link message text is not properly URL-encoded
- Special characters may break the link or produce garbled messages

### Interest Rate Inconsistency
- Calculator/content shows conflicting rates: 0.9% vs 1%
- Confusing for users and potentially misleading

## Security

### Form Data Logged to Console
- User-submitted form data (contact, calculator) logged via `console.log`
- Exposes PII in browser developer tools

### reCAPTCHA Token Generated But Never Validated
- reCAPTCHA v3 token is generated on the client
- Token is never sent to backend for server-side validation
- Bot protection is effectively non-functional

## Performance

### ~28MB Unoptimized Images
- Public directory contains approximately 28MB of unoptimized images
- No WebP/AVIF conversion, no responsive srcsets
- Significant impact on page load time, especially on mobile

### CSS Background Images Not Lazy-Loaded
- Background images set via CSS load immediately regardless of viewport
- Parallax and hero sections load large images upfront

### Resize Listener Without Debounce
- Window resize event listeners fire on every pixel change
- No debounce/throttle applied, causing excessive re-renders

## Fragile Areas

### YoutubeVideo Component `any` Casting
- YouTube embed component uses `any` type assertions
- Bypasses type checking, making refactoring risky

### Hardcoded Ally Data with Broken Links
- Alliance/partner data is hardcoded with some broken external links
- No validation or health checking of external URLs

### Duplicated Hero Patterns
- Hero section patterns repeated across multiple page components
- Changes require updating multiple files; easy to miss one

## Missing Features

### No Per-Page SEO Metadata
- Pages lack individual meta titles, descriptions, and Open Graph tags
- All pages likely share the same default metadata

### `lang="en"` on a Spanish Site
- HTML lang attribute set to English despite Spanish content
- Negatively impacts accessibility and SEO for Spanish-speaking audience

### No Error Boundaries
- No React error boundaries implemented
- A single component error can crash the entire page

## Test Coverage

### Zero Tests
- No test files exist across all 37 source files
- No testing framework configured (no Jest, Vitest, Cypress, etc.)
- No CI/CD test pipeline
- Any change carries regression risk with no safety net
