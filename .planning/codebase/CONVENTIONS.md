# Coding Conventions

**Analysis Date:** 2026-03-05

## Naming Patterns

**Files:**
- Components: PascalCase single-word or compound names (`Button.tsx`, `ParallaxImage.tsx`, `SectionTitle.tsx`, `ContactForm.tsx`)
- Hooks: camelCase prefixed with `use` (`useIsMobile.ts`, `useWhatsApp.ts`, `useScrollPosition.ts`)
- Pages: always `page.tsx` (Next.js App Router convention)
- CTA components use underscore-separated naming: `CTA_WhatsApp.tsx`, `CTA_Brochure.tsx`, `CTA_BookMeeting.tsx`

**Functions/Components:**
- React components: PascalCase (`Button`, `Section`, `ParallaxImage`, `Calculator`)
- Hooks: camelCase with `use` prefix (`useIsMobile`, `useWhatsApp`, `useScrollPosition`)
- Helper functions: camelCase (`calculateMonthlyPayment`, `getPaymentMethodLabel`, `getDifferenceTextColor`)
- Event handlers: camelCase with `handle` prefix (`handleMouseMove`, `handleMouseEnter`, `handleFieldChange`)

**Variables:**
- camelCase for all variables (`isMobileMenuOpen`, `monthlyPayment`, `displayResult`)
- Boolean state: `is` prefix (`isOpen`, `isSubmitting`, `isSubmitted`, `isAtTop`, `isHovered`)
- Constants at module level: camelCase (`cardResponsiveValues_3cols`, `flagClassNames`, `socialMediaSize`)

**Types/Interfaces:**
- PascalCase with descriptive suffix: `ButtonProps`, `SectionProps`, `ModalProps`, `ContainerProps`
- Zod schema types inferred with `z.infer`: `type ContactType = z.infer<typeof contactSchema>`
- Enums: PascalCase with UPPER_SNAKE_CASE values (`Interest.PROFITABILITY`, `PaymentMethod.DIRECT`, `PaymentPeriod.ONE_YEAR`)

## Code Style

**Formatting:**
- No Prettier config detected; relies on editor defaults
- Indentation: 4 spaces in components, 2 spaces in config files
- Semicolons: inconsistent -- some files use them (`ContactForm.tsx`), some omit them (`Modal.tsx`, `Footer.tsx`)
- Trailing commas: used in most places
- Quotes: double quotes for JSX attributes and imports, single quotes also used for imports (inconsistent between files)

**Linting:**
- ESLint 9 with flat config at `eslint.config.mjs`
- Extends `next/core-web-vitals` and `next/typescript`
- Custom rule: `@next/next/no-img-element` set to `"off"` (allows `<img>` tags instead of `next/image`)
- TypeScript strict mode enabled in `tsconfig.json`

## Import Organization

**Order (observed pattern):**
1. React/Next.js framework imports (`react`, `next/navigation`, `next/font/google`)
2. Third-party library imports (`framer-motion`, `@heroicons/react`, `@tanstack/react-form`, `zod`)
3. Internal component imports (`@/components/...`)
4. Internal hook imports (`@/hooks/...`)
5. CSS imports (`slick-carousel/slick/slick.css`)

**Path Aliases:**
- `@/*` maps to `./src/*` (defined in `tsconfig.json`)
- Usage is inconsistent: some files use `@/components/...` while others use relative paths like `../../hooks/useScrollPosition` (see `src/components/Navbar/Navbar.tsx` line 8)

**Guideline:** Always use the `@/` alias for imports. Do not use relative paths that traverse upward (`../`).

## Component Patterns

**Component Declaration:**
- Two styles coexist:
  1. `const` arrow function with `export default` at bottom: `const Button = (...) => { ... }; export default Button;` (used in `Button.tsx`, `Section.tsx`, `Footer.tsx`, `Container.tsx`, `SectionTitle.tsx`)
  2. `export default function` declaration: `export default function Navbar() { ... }` (used in `Navbar.tsx`, `Modal.tsx`, page components)
- **Guideline:** Use `const` arrow function with `export default` at bottom for reusable components. Use `export default function` for page components and complex components.

**Props:**
- Define a dedicated `interface` above the component: `interface ButtonProps { ... }`
- Some simpler components use inline types: `({ value, onChange }: { value: string; onChange: (v: string) => void })`
- Use `React.FC<Props>` sparingly (only in `Footer`, `Container`, `Calculator`)
- **Guideline:** Define a named `interface` for props when the component has 2+ props. Use `React.FC` only if you need the return type annotation.

**Client Components:**
- Most components include `"use client"` directive at the top
- Only exception: `CTAButton.tsx` and page-level layout (`layout.tsx`) which is a server component
- **Guideline:** Add `"use client"` at the top of any component that uses hooks, event handlers, or browser APIs.

## Form Handling

**Library:** TanStack React Form (`@tanstack/react-form`) with Zod v4 validation

**Pattern:**
```typescript
// 1. Define Zod schema
const contactSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    whatsapp: z.string().min(1, "El numero es requerido"),
});

// 2. Infer type
type ContactType = z.infer<typeof contactSchema>;

// 3. Use form hook with validators
const form = useForm({
    defaultValues: { ... } as ContactType,
    validators: {
        onChange: contactSchema,
        onBlur: contactSchema,
        onSubmitAsync: contactSchema, // or onSubmit for sync
    },
    onSubmit: async ({ value }) => { ... },
});

// 4. Render fields with form.Field
<form.Field name="fieldName">
    {(field) => (
        <>
            <label>...</label>
            <input
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                aria-invalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
            />
            {(field.state.meta.errors.length > 0 && field.state.meta.isTouched) ? (
                <p className="mt-1 text-sm text-red-600">{field.state.meta.errors[0]?.message}</p>
            ) : null}
        </>
    )}
</form.Field>
```

See `src/components/ContactForm.tsx` and `src/components/LandingPage/Calculator.tsx` for full examples.

## Styling

**Framework:** Tailwind CSS v4 with PostCSS

**Approach:**
- Utility-first Tailwind classes applied inline via `className`
- Custom theme colors defined in `src/app/globals.css` using CSS custom properties under `@theme inline`
- Theme tokens: `theme-gold`, `theme-background-{50-950}`, `theme-background-dark-{50-950}`, `text-primary`
- Responsive: mobile-first with `sm:`, `md:`, `lg:`, `xl:` prefixes
- No CSS modules or styled-components

**Common class composition pattern:**
```typescript
const baseClasses = "text-base font-normal px-4 py-2 rounded-full";
const variantClasses = outline ? outlinedClasses : filledClasses;
return <button className={`${baseClasses} ${variantClasses}`}>...</button>;
```

**Custom CSS:** Minimal custom CSS in `src/app/globals.css` for:
- Custom font faces (Switzer family)
- Slick carousel overrides
- Scroll padding

## Animation

**Library:** Framer Motion (`framer-motion`)

**Common patterns:**
- Fade-in on scroll using `useInView`: see `src/components/Section.tsx`
- Parallax scroll effect using `useScroll` + `useTransform`: see `src/components/ParallaxImage.tsx`
- Modal enter/exit with `AnimatePresence`: see `src/components/Modal.tsx`
- Mobile menu slide animation with variants: see `src/components/Navbar/Navbar.tsx`
- Interactive hover effects with `useMotionValue` + `useSpring`: see `src/components/Button.tsx`

## Error Handling

**Patterns:**
- Form validation errors displayed inline below fields using Zod + TanStack Form error state
- API errors logged to `console.log("Error", data)` (no user-facing error UI beyond form validation)
- Try/catch used for reCAPTCHA token retrieval in `src/components/ContactForm.tsx`
- No global error boundary detected
- No centralized error handling utility

**Guideline:** Display form validation errors inline. For API errors, log to console and provide user feedback. Wrap async operations in try/catch.

## Logging

**Framework:** `console.log` (browser console)

**Patterns:**
- Debug logging of form state: `console.log(form.state.values)` in `src/components/ContactForm.tsx`
- Success/error logging: `console.log("Form Submitted Successfully")` / `console.log("Error", data)`
- No structured logging framework

## Comments

**When to Comment:**
- Commented-out code is prevalent (alternative implementations, previous designs) -- avoid this practice
- Inline comments explain "why" for non-obvious logic (e.g., `// Keep script for other pages; no-op on unmount`)
- Section markers in JSX: `{/* Card 1 - Suites */}`, `{/* Backdrop */}`, `{/* Video Modal */}`

**JSDoc/TSDoc:**
- Not used anywhere in the codebase

## Function Design

**Size:** Components range from small (10-15 lines for `Container.tsx`) to large (370+ lines for `Calculator.tsx`). Page components (`src/app/page.tsx`) are the largest at ~300 lines of JSX.

**Parameters:** Use destructured props with TypeScript interfaces. Default values provided inline: `({ fadeIn = false, speed = 0.5 }: Props)`.

**Return Values:** Components return JSX. Hooks return objects with named properties: `return { openWhatsApp, isMobile, phoneNumber }`.

## Module Design

**Exports:** Single default export per file. No named exports from component files.

**Barrel Files:** Not used. Each component/hook is imported directly by path.

**Guideline:** Use one default export per component file. Import components directly by their file path using the `@/` alias.

## Enum Pattern

**Use TypeScript `enum` for domain values** with companion helper functions:

```typescript
enum Interest {
    PROFITABILITY = "profitability",
    USE = "use",
    BOTH = "both",
}
const interestValues = Object.values(Interest);
const getInterestLabel = (interest: Interest): string => {
    switch (interest) { ... }
};
```

See `src/components/ContactForm.tsx` and `src/components/LandingPage/Calculator.tsx`.

---

*Convention analysis: 2026-03-05*
