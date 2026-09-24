# Spec: interior-design-studio

## Requirements
R1. Editorial Brand Experience & Navigation: Elegant header with logo, navigation links (Designs, Wall Art, Interior Planning, Visualizer, About, Contact), currency selector, search/filter drawer, and floating cart indicator.
R2. Curated Product Catalog (Designs & Wall Art): Grid/list view displaying items with high-resolution imagery, category tags (e.g. Wall Murals, Acoustic Art, Minimalist Canvas, 3D Room Packages), price, dimensions, and quick-view modal.
R3. Interactive Room & Wall Visualizer: Dedicated interactive tool allowing users to:
  - Choose a room setting (Modern Living Room, Minimalist Bedroom, Japandi Dining Room, Executive Office).
  - Switch wall colors/textures (Alabaster, Sage Ochre, Limewash Charcoal, Warm Greige).
  - Select wall art/murals, change frame styles (Natural Oak, Matte Black, Brushed Brass, Floating Acrylic), and adjust scale/position.
R4. Interior Planning & Services Section:
  - Detailed breakdown of 3 service tiers: "Essential Room Concept", "Comprehensive 3D Spatial Planning", and "Full Architectural Styling & Sourcing".
  - Interactive 4-step "Style & Space Questionnaire" guiding clients to their ideal package.
  - Interactive Consultation Booking Modal with date picker, space requirements, and estimated project cost.
R5. Product Detail View: Dedicated modal/drawer with deep-dive specs: materials, craftsmanship, dimensions, frame choices, designer notes, and customer reviews.
R6. Shopping Cart & Checkout Drawer: Slide-over cart drawer with item count, quantity increment/decrement, subtotal, tax calculation, discount code support, and seamless mock checkout flow with order confirmation.
R7. Responsive & Accessible Design: 100% mobile-responsive, touch-friendly, semantic HTML5, accessible contrast ratios, and keyboard navigability.
R8. Automated Test Suite: Unit and component tests verifying catalog filtering, cart calculations, visualizer state updates, and consultation form validation using Vitest.

## Acceptance Criteria
AC1. Given the user visits the homepage, when browsing, then they see an editorial hero banner, featured design collections, interactive visualizer CTA, customer testimonials, and an architecturally curated footer.
AC2. Given the user is on the product catalog, when filtering by category (e.g., "Wall Designs") or searching by keyword, then only matching items are rendered without full-page reload.
AC3. Given the user opens the Room & Wall Visualizer, when they change the room backdrop, wall paint tone, frame finish, or art piece, then the visual preview updates immediately in real-time.
AC4. Given the user adds one or multiple design items to the cart, when opening the cart drawer, then items, quantities, pricing breakdown, and total update accurately.
AC5. Given the user updates item quantities or removes an item in the cart, when viewing the total, then the subtotal recalculates instantly and state persists in localStorage.
AC6. Given the user completes the Style & Space Quiz, when they submit the questionnaire, then a personalized package recommendation with pricing and direct booking CTA is displayed.
AC7. Given invalid inputs in the consultation booking form (e.g. missing name or email), when submitting, then clear descriptive validation error messages are displayed and submission is prevented.
AC8. Given automated test execution via `npm test` / `npx vitest run`, when tests are executed, then 100% of test suites pass with zero failures.

## Behavior
Users land on an ultra-luxurious, editorial online studio. They can seamlessly explore architectural design packages, inspect fine art wall prints and bespoke wallpaper murals, and test any piece directly in an interactive room visualizer that dynamically renders frame and wall paint changes. Clients seeking interior renovation or spatial design can take an interactive 4-step style quiz that matches them with an interior planning service tier, schedule a consultation with instant quote estimation, or add products to cart and complete an elegant checkout.

## Interfaces
```typescript
export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: 'wall-designs' | 'interior-plans' | 'concept-packages';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  roomContextImage?: string;
  dimensions?: string[];
  frames?: string[];
  description: string;
  features: string[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedDimension?: string;
  selectedFrame?: string;
}

export interface VisualizerState {
  roomId: string;
  wallColor: string;
  selectedArtId: string;
  frameStyle: string;
  artScale: number;
}

export interface ConsultationRequest {
  tierId: string;
  fullName: string;
  email: string;
  phone: string;
  spaceType: 'living' | 'bedroom' | 'dining' | 'whole-home' | 'commercial';
  budgetRange: string;
  preferredDate: string;
  notes: string;
}
```

## Evidence
- E1. Output of `npx vitest run src/test/data.test.ts` → verifies curated products, visualizer scenes, and service tiers are loaded with valid prices, categories, and image paths.
- E2. Output of `npx vitest run src/test/cart.test.ts` → verifies adding, updating quantity, removing items, subtotal calculation, and localStorage persistence.
- E3. Output of `npx vitest run src/test/catalog.test.ts` → verifies filtering products by category ('wall-designs', 'interior-plans') and search querying.
- E4. Output of `npx vitest run src/test/visualizer.test.ts` → verifies visualizer room switching, wall color paint changes, and frame style selections.
- E5. Output of `npx vitest run src/test/planning.test.ts` → verifies 4-step quiz recommendation algorithm and consultation form field validation.
- E6. Output of `npm run build` → generates clean, minified production assets in `dist/` with 0 TypeScript/compilation errors.

## Out of Scope
- Real third-party payment gateway charges (Stripe live credit card transactions) — mocked with realistic instant validation and confirmation receipt.
- Real backend database server infrastructure (all state is client-managed with localStorage persistence).
- Full 3D WebGL physics engine (realistic high-res 2D composite layering visualizer is implemented instead).
