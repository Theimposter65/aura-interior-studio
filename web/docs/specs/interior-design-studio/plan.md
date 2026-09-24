# Plan: interior-design-studio

## Overview
Decompose the implementation of "AURA Studio & Atelier" — a modern high-aesthetic e-commerce and consultation web application for interior design concepts, room planning services, and interactive wall art customization.

## Coverage

| Requirement | Tasks |
|-------------|-------|
| R1 | Task 1, Task 4, Task 8 |
| R2 | Task 2, Task 5 |
| R3 | Task 2, Task 6 |
| R4 | Task 2, Task 7 |
| R5 | Task 5 |
| R6 | Task 3, Task 4 |
| R7 | Task 1, Task 4, Task 8 |
| R8 | Task 1, Task 2, Task 3, Task 5, Task 6, Task 7, Task 8 |
| AC1 | Task 4, Task 8 |
| AC2 | Task 5 |
| AC3 | Task 6 |
| AC4 | Task 3, Task 4 |
| AC5 | Task 3 |
| AC6 | Task 7 |
| AC7 | Task 7 |
| AC8 | Task 8 |

## Plan Risks
- Advisory: High-resolution images should use optimized modern responsive styling to avoid page rendering delays.
- Advisory: Visualizer layered rendering should maintain strict aspect ratio scaling across mobile and desktop breakpoints.

## Waves

### Wave 1: Foundation & Project Scaffolding
- Parallel: no (Task 2 depends on configuration & types)
- Tasks: Task 1, Task 2

### Wave 2: State Management & Layout Framework
- Parallel: no (Task 4 consumes CartContext from Task 3)
- Tasks: Task 3, Task 4

### Wave 3: Curated Design Catalog & Detail Inspection
- Parallel: no
- Tasks: Task 5

### Wave 4: Interactive Room & Wall Visualizer
- Parallel: no
- Tasks: Task 6

### Wave 5: Interior Planning Services & Main Application Polish
- Parallel: no
- Tasks: Task 7, Task 8

## Tasks

### Task 1: Initialize Vite React TypeScript project with Tailwind CSS & Vitest
- Files: `package.json` (new), `vite.config.ts` (new), `tailwind.config.js` (new), `postcss.config.js` (new), `tsconfig.json` (new), `index.html` (new), `src/index.css` (new)
- Files Changed: 7
- Complexity: medium
- Risk: low
- Estimate: 30min
- Wave: 1
- Acceptance: R1, R7, R8
- Action: Scaffold package.json with React 18, Vite 5, Tailwind CSS, Lucide-react, Vitest, and TypeScript; configure Tailwind with luxury warm-neutral colors (alabaster, sage, terracotta, greige, bronze) and editorial serif/sans fonts.
- Done: Project builds cleanly with `npm install` and `npm run build`; base index.html and index.css load with Tailwind utility styles.
- Context: spec.md ## Behavior; research.md ## Alternatives: Option 1
- Test: `src/test/setup.test.ts` (new)
- Dependencies: NONE
- Verification: `npx vitest run src/test/setup.test.ts`
- Status: [DONE]

### Task 2: Core Data Models and Curated Mock Data
- Files: `src/types/index.ts` (new), `src/data/products.ts` (new), `src/data/visualizerData.ts` (new), `src/data/services.ts` (new)
- Files Changed: 4
- Complexity: low
- Risk: low
- Estimate: 30min
- Wave: 1
- Acceptance: R2, R3, R4, R8
- Action: Define TypeScript interfaces for Product, CartItem, VisualizerState, and ConsultationRequest; populate rich mock catalog items across Wall Designs, Interior Plans, and Concept Packages with realistic imagery, dimensions, frame options, and interior service tiers.
- Done: All data files export strongly-typed arrays; data integrity tests pass with verified categories, non-zero pricing, and valid identifiers.
- Context: spec.md ## Interfaces; research.md ## Architecture
- Test: `src/test/data.test.ts` (new)
- Dependencies: Task 1
- Verification: `npx vitest run src/test/data.test.ts`
- Status: [DONE]

### Task 3: Shopping Cart Context & State Persistence
- Files: `src/context/CartContext.tsx` (new)
- Files Changed: 1
- Complexity: medium
- Risk: low
- Estimate: 30min
- Wave: 2
- Acceptance: R6, AC4, AC5, R8
- Action: Implement CartContext providing addToCart, removeFromCart, updateQuantity, clearCart, subtotal, shipping, and discount calculation with synchronized localStorage persistence.
- Done: Adding, updating, removing items, and promo codes accurately calculate totals and persist across browser reloads; targeted unit test green.
- Context: spec.md ## Behavior; research.md ## Architecture
- Test: `src/test/cart.test.ts` (new)
- Dependencies: Task 2
- Verification: `npx vitest run src/test/cart.test.ts`
- Status: [DONE]

### Task 4: Editorial Navigation, Header, Footer & Cart Slide-over Drawer
- Files: `src/components/layout/Navbar.tsx` (new), `src/components/layout/Footer.tsx` (new), `src/components/layout/CartDrawer.tsx` (new)
- Files Changed: 3
- Complexity: medium
- Risk: low
- Estimate: 45min
- Wave: 2
- Acceptance: R1, R6, R7, AC1, AC4
- Action: Build sticky luxury navbar with brand monogram, navigation anchors, quick search toggle, and cart badge indicator; build slide-over cart drawer with animated item list, quantity controllers, promo input, checkout simulation, and order confirmation state.
- Done: Navbar responds to scrolling and mobile drawer toggles; cart drawer opens smoothly and renders item summary with simulated checkout receipt.
- Context: spec.md ## Requirements: R1, R6
- Test: `src/test/layout.test.ts` (new)
- Dependencies: Task 3
- Verification: `npx vitest run src/test/layout.test.ts`
- Status: [DONE]

### Task 5: Curated Product Catalog, Category Filters & Detail Inspection Modal
- Files: `src/components/catalog/ProductCard.tsx` (new), `src/components/catalog/ProductGrid.tsx` (new), `src/components/catalog/ProductDetailModal.tsx` (new)
- Files Changed: 3
- Complexity: medium
- Risk: low
- Estimate: 45min
- Wave: 3
- Acceptance: R2, R5, AC2, R8
- Action: Implement product cards with hover lifestyle transitions, category filter pills ("All", "Wall Designs", "Interior Plans", "Concept Packages"), search input, sorting (price, popularity), and comprehensive product detail modal with dimension selection, frame finishes, craftsmanship notes, and direct "Add to Cart" / "Try in Visualizer" actions.
- Done: Filtering and search reactively slice items without full-page reloads; modal presents rich material details and adds configured item to cart.
- Context: spec.md ## Requirements: R2, R5; AC2
- Test: `src/test/catalog.test.ts` (new)
- Dependencies: Task 4
- Verification: `npx vitest run src/test/catalog.test.ts`
- Status: [DONE]

### Task 6: Interactive Room & Wall Visualizer
- Files: `src/components/visualizer/WallVisualizer.tsx` (new), `src/components/visualizer/RoomSelector.tsx` (new), `src/components/visualizer/FrameSelector.tsx` (new)
- Files Changed: 3
- Complexity: medium
- Risk: medium
- Estimate: 60min
- Wave: 4
- Acceptance: R3, AC3, R8
- Action: Create an interactive visualizer workspace enabling users to switch between realistic room scenes (Modern Living Room, Japandi Dining, Minimalist Bedroom, Studio Atelier), dynamically adjust wall background tint/paint colors, swap wall art/mural pieces, test frame finishes (Oak, Matte Black, Brass, Floating Acrylic), and resize/scale the art with direct "Add Configured Piece to Cart" action.
- Done: Room and wall color transitions render smoothly with realistic shadow overlays; frame styling and art selection dynamically update in real time.
- Context: spec.md ## Requirements: R3; research.md ## Pitfalls
- Test: `src/test/visualizer.test.ts` (new)
- Dependencies: Task 5
- Verification: `npx vitest run src/test/visualizer.test.ts`
- Status: [DONE]

### Task 7: Interior Planning Services, Interactive Style Quiz & Booking Modal
- Files: `src/components/planning/ServicesSection.tsx` (new), `src/components/planning/StyleQuizModal.tsx` (new), `src/components/planning/BookingModal.tsx` (new)
- Files Changed: 3
- Complexity: medium
- Risk: low
- Estimate: 45min
- Wave: 5
- Acceptance: R4, AC6, AC7, R8
- Action: Implement 3-tier services presentation ("Essential Room Concept", "Comprehensive 3D Spatial Planning", "Full Architectural Styling"); build interactive 4-step "Style & Space Questionnaire" calculating ideal recommended tier; build consultation booking modal with date selector, space details, and instant quote calculation with validation.
- Done: Style quiz outputs personalized recommendation and auto-selects service tier in booking form; booking validation enforces required fields and displays confirmation message.
- Context: spec.md ## Requirements: R4; AC6, AC7
- Test: `src/test/planning.test.ts` (new)
- Dependencies: Task 6
- Verification: `npx vitest run src/test/planning.test.ts`
- Status: [DONE]

### Task 8: Main Application Shell, Hero Showcase, Testimonials & Production Build
- Files: `src/App.tsx` (new), `src/main.tsx` (new), `src/test/app.test.ts` (new)
- Files Changed: 3
- Complexity: medium
- Risk: low
- Estimate: 30min
- Wave: 5
- Acceptance: R1, R7, R8, AC1, AC8
- Action: Assemble the complete application in App.tsx with hero showcase, curated collections, interactive visualizer section, interior planning services, client testimonials, and architectural brand storytelling; verify end-to-end integration and production compilation.
- Done: App renders all sections seamlessly; all unit & integration test suites pass; `npm run build` succeeds with zero errors.
- Context: spec.md ## Evidence: E1-E6
- Test: `src/test/app.test.ts`
- Dependencies: Task 7
- Verification: `npx vitest run && npm run build`
- Status: [DONE]

## Touched Files
- `package.json`
- `vite.config.ts`
- `tailwind.config.js`
- `postcss.config.js`
- `tsconfig.json`
- `index.html`
- `src/index.css`
- `src/types/index.ts`
- `src/data/products.ts`
- `src/data/visualizerData.ts`
- `src/data/services.ts`
- `src/context/CartContext.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/CartDrawer.tsx`
- `src/components/catalog/ProductCard.tsx`
- `src/components/catalog/ProductGrid.tsx`
- `src/components/catalog/ProductDetailModal.tsx`
- `src/components/visualizer/WallVisualizer.tsx`
- `src/components/visualizer/RoomSelector.tsx`
- `src/components/visualizer/FrameSelector.tsx`
- `src/components/planning/ServicesSection.tsx`
- `src/components/planning/StyleQuizModal.tsx`
- `src/components/planning/BookingModal.tsx`
- `src/App.tsx`
- `src/main.tsx`
- `src/test/setup.test.ts`
- `src/test/data.test.ts`
- `src/test/cart.test.ts`
- `src/test/layout.test.ts`
- `src/test/catalog.test.ts`
- `src/test/visualizer.test.ts`
- `src/test/planning.test.ts`
- `src/test/app.test.ts`

## Exit Criteria
- [x] `npm run build` passes with 0 errors
- [x] `npx vitest run` — all tests pass
- [x] All tasks marked [DONE] in plan.md

## Decision Log
### 2026-09-24 — Plan finalized
- **Decision**: 8 tasks arranged into 5 waves spanning Project Foundation, State & Layout, Catalog & Detail, Interactive Visualizer, and Planning Services & Main App.
- **Reason**: Clear boundaries, high modularity, zero circular dependencies, each task independently testable with Vitest.
