# Testing

## Current State

### No Tests Exist
- Zero test files across all 37 source files
- No testing framework is installed or configured
- No test scripts defined in `package.json`
- No CI/CD pipeline with test steps

### No Testing Dependencies
- No Jest, Vitest, Cypress, Playwright, or any testing library in dependencies
- No `@testing-library/react` or similar utilities
- No mock/stub libraries

## Recommended Setup

### Framework: Vitest + Testing Library
Given the stack (Next.js 15, React 19, TypeScript), the recommended setup would be:

- **Unit/Component tests:** Vitest + `@testing-library/react`
- **E2E tests:** Playwright or Cypress
- **Coverage:** Vitest built-in coverage via `@vitest/coverage-v8`

### Suggested Dependencies
```
vitest
@vitejs/plugin-react
@testing-library/react
@testing-library/jest-dom
@testing-library/user-event
jsdom
playwright (or cypress for E2E)
```

### Priority Test Targets
Based on codebase concerns:

1. **Calculator component** - Complex state logic, interest rate calculations
2. **Contact form** - Form validation, submission handling, reCAPTCHA flow
3. **Navigation** - Responsive behavior, mobile menu toggle
4. **Country selector** - Phone code selection, formatting
5. **Hero sections** - Parallax behavior, resize handlers

### Configuration Pattern
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
```

### Test File Convention
```
src/
  components/
    Calculator/
      Calculator.tsx
      Calculator.test.tsx    # co-located tests
  app/
    page.tsx
tests/
  e2e/                      # E2E tests
    navigation.spec.ts
  setup.ts                   # global test setup
```
