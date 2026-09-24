# Plan: portfolio-and-pricing-redesign

## Overview
Decompose the implementation into 4 sequential waves:
- **Wave 1**: Data Layer & Types (extract and map all 123 photos, build pricing models, remove foreign currency types).
- **Wave 2**: Portfolio & Interactive Components (Horizontal Portfolio Gallery, Before/After Slider, Pricing Section).
- **Wave 3**: Page Assembly & Navigation Pruning (remove WallVisualizer, ProductGrid, currency switcher; streamline page layout).
- **Wave 4**: Testing, QA & GitHub Pages Deployment (Vitest tests, typecheck, production build, gh-pages sync).

---

## Tasks

### Wave 1: Data & Currency Modernization
- [ ] **Task 1.1**: Update `web/src/types/index.ts` to include `StatementItem`, `TransformationItem`, and `PricingTier` models, and clean up currency types to INR only.
  - **Action**: Define types for Statement Collection, Before/After transformations, and studio pricing tiers.
  - **Done**: TypeScript definitions ready and clean.
  - **Context**: `web/src/types/index.ts`.

- [ ] **Task 1.2**: Create structured dataset `web/src/data/newPortfolioData.ts` mapping all 123 extracted photos into Statement categories, Styling categories, Before/After sets, and the new Pricing matrix.
  - **Action**: Compile structured data for all items, taglines, dimensions, and prices.
  - **Done**: Data exports available with zero broken image references.
  - **Context**: `web/src/data/newPortfolioData.ts`.

### Wave 2: New Visual & Interactive Components
- [ ] **Task 2.1**: Implement `web/src/components/portfolio/HorizontalPortfolio.tsx` featuring smooth horizontal scroll, snap cards, category filtering, and direct WhatsApp commission triggers.
  - **Action**: Build horizontal scrollable gallery container with navigation controls and mobile touch swipe.
  - **Done**: Cards swipe horizontally smoothly on both mobile and desktop.
  - **Context**: `web/src/components/portfolio/HorizontalPortfolio.tsx`.

- [ ] **Task 2.2**: Implement `web/src/components/portfolio/BeforeAfterSlider.tsx` for the 18 transformation projects with draggable divider and side-by-side mode toggle.
  - **Action**: Build interactive slider with mouse/touch drag handlers and project selector.
  - **Done**: Clients can slide between before and after states or view side-by-side.
  - **Context**: `web/src/components/portfolio/BeforeAfterSlider.tsx`.

- [ ] **Task 2.3**: Implement `web/src/components/pricing/PricingSection.tsx` displaying the transparent studio rates, footnote, and instant consultation CTA.
  - **Action**: Build clean editorial pricing grid for Doodling, Murals, Paintings, Interior Design, and Statement Pieces.
  - **Done**: Displays exact INR figures and footnote.
  - **Context**: `web/src/components/pricing/PricingSection.tsx`.

### Wave 3: Page Assembly & Layout Tightening
- [ ] **Task 3.1**: Clean up `web/src/components/layout/Navbar.tsx` — remove currency switcher dropdown (INR only), remove links to removed sections (visualizer, catalog), and add links to Portfolio, Transformations, and Pricing.
  - **Action**: Streamline header and mobile drawer.
  - **Done**: Clean navigation with zero currency switchers.
  - **Context**: `web/src/components/layout/Navbar.tsx`.

- [ ] **Task 3.2**: Update `web/src/App.tsx` — remove `WallVisualizer` and `ProductGrid`, integrate `HorizontalPortfolio`, `BeforeAfterSlider`, and `PricingSection`, and tighten overall page length for fast mobile reading.
  - **Action**: Assemble modernized page structure.
  - **Done**: Fast-reading, punchy layout with zero wasted vertical space.
  - **Context**: `web/src/App.tsx`.

### Wave 4: Testing, Verification & Deployment
- [ ] **Task 4.1**: Update and expand tests in `web/src/test/` to verify horizontal portfolio, before/after transformations, pricing values, and currency display.
  - **Action**: Update `web/src/test/features.test.ts` and `web/src/test/layout.test.ts`.
  - **Done**: `npm test -- --run` passes 100%.
  - **Context**: `web/src/test/`.

- [ ] **Task 4.2**: Execute quality gates (`tsc`, `npm run build`), commit to `main`, and deploy distribution bundle to `gh-pages`.
  - **Action**: Run build, commit, push, and sync to `gh-pages`.
  - **Done**: Live site on GitHub Pages reflects all changes with 200 OK.
  - **Context**: Git branches `main` and `gh-pages`.
