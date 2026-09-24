# Research: interior-design-studio

## Overview
A high-aesthetic, editorial digital storefront and consultation platform named **"AURA Studio & Atelier"** (Interior Planning, Bespoke Wall Designs & Spatial Concepts). The platform serves three complementary revenue streams:
1. **Design Concepts & Blueprints**: Pre-packaged spatial layouts, material palettes, and architectural lighting plans for instant purchase/download.
2. **Interactive Wall Designs & Art**: Bespoke wall murals, acoustic panels, and large-format art prints featuring an interactive **Room & Wall Visualizer** (allowing customers to test artwork sizes, frames, and wall paint tones on realistic living room, dining, and bedroom scenes).
3. **Interior Planning & Consultation Packages**: Multi-tier design consultation services (Virtual Styling, Full Concept & 3D Renderings, On-Site Architectural Renovation Planning) with an interactive 4-step style questionnaire and instant booking/quote calculator.

## Clarifications
No clarifications needed — assumed:
- **Aesthetic Direction**: Warm minimalist, architectural luxury (Kinfolk / Architectural Digest / Studio McGee style) with neutral stone/linen palettes, elegant typography, high-res lifestyle imagery, and smooth micro-interactions.
- **Frontend Stack**: React 18+ with TypeScript, Vite for lightning-fast HMR and building, Tailwind CSS with custom editorial styling, Lucide React icons, and Vitest for unit/integration testing.
- **State & Storage**: Client-side reactive state management with localStorage persistence for shopping cart items, visualizer configurations, and booking consultations.
- **Target Audience**: Discerning homeowners, interior decorators, architects, and design enthusiasts looking for premium wall art and bespoke planning services.

## Current State
- The codebase at `/home/motobomber/agy/web` currently consists of the baseline FRAME scaffolding with no application source code or package dependencies installed yet.
- Node.js runtime (v20.20.2) and npm (10.8.2) are available in the local environment.

## Alternatives

### Option 1: Vite + React 18 + TypeScript + Tailwind CSS (SPA)
- **Pros**:
  - Extremely fast compilation, instant HMR, minimal overhead.
  - Zero server dependency, easily deployable to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, or container).
  - Perfect for rich interactive client-side components like the Room & Wall Visualizer and dynamic style quiz.
  - Full TypeScript safety with rapid testing via Vitest.
- **Cons**: Client-side rendering without server-side hydration (acceptable for an interactive portfolio & commerce demo app).
- **Effort**: Low-Medium (clean, highly modular component architecture).
- **Risk**: Low (proven, stable ecosystem).

### Option 2: Next.js 14+ (App Router) + Server Components
- **Pros**: Built-in SSR, server actions, dynamic server rendering.
- **Cons**: Heavier footprint, requires Node.js server or edge runtime, complex client/server component boundary debugging for interactive canvas/visualizer features.
- **Effort**: High.
- **Risk**: Medium (excessive overhead for an immediate interactive design storefront).

## Recommendation
**Option 1 (Vite + React + TypeScript + Tailwind CSS + Lucide React)** is recommended. It delivers optimal rendering performance, silky smooth UI micro-interactions, responsive mobile-first layouts, and zero-latency client state management for the interactive Wall Visualizer and consultation booking flow.

**Confidence**: HIGH — Standard, resilient frontend stack perfectly suited for rich interactive client applications.

## Dependency Passport

### react@^18.3.1 / react-dom@^18.3.1
- **Last release**: 2024-04-26 (Stable 18.3.1)
- **Downloads trend**: Rising / Dominant (>20M weekly)
- **Deprecated**: No
- **Security**: No open CVEs
- **Maintenance**: Maintained by Meta & React core team
- **Verdict**: adopt — Industry standard for reactive web user interfaces.

### vite@^5.4.0
- **Last release**: Active / Ongoing
- **Downloads trend**: Rising (>12M weekly)
- **Deprecated**: No
- **Security**: No known vulnerabilities
- **Maintenance**: Extremely active
- **Verdict**: adopt — Best-in-class developer experience and optimized production bundling.

### tailwindcss@^3.4.10
- **Last release**: Active / Ongoing
- **Downloads trend**: Rising (>10M weekly)
- **Deprecated**: No
- **Security**: Clean
- **Maintenance**: Active
- **Verdict**: adopt — Utility-first CSS allowing bespoke luxury design tokens.

### lucide-react@^0.441.0
- **Last release**: 2024 / Active
- **Downloads trend**: Rising (>5M weekly)
- **Deprecated**: No
- **Security**: Clean
- **Maintenance**: Active
- **Verdict**: adopt — Beautiful, lightweight, customizable SVG iconography.

## Requirements
R1. **Editorial Brand Experience & Navigation**: Elegant header with logo, navigation links (Designs, Wall Art, Interior Planning, Visualizer, About, Contact), currency selector, search/filter drawer, and floating cart indicator.
R2. **Curated Product Catalog (Designs & Wall Art)**: Grid/list view displaying items with high-resolution imagery, category tags (e.g. Wall Murals, Acoustic Art, Minimalist Canvas, 3D Room Packages), price, dimensions, and quick-view modal.
R3. **Interactive Room & Wall Visualizer**: Dedicated interactive tool allowing users to:
  - Choose a room setting (Modern Living Room, Minimalist Bedroom, Japandi Dining Room, Executive Office).
  - Switch wall colors/textures (Alabaster, Sage Ochre, Limewash Charcoal, Warm Greige).
  - Select wall art/murals, change frame styles (Natural Oak, Matte Black, Brushed Brass, Floating Acrylic), and adjust scale/position.
R4. **Interior Planning & Services Section**:
  - Detailed breakdown of 3 service tiers: "Essential Room Concept", "Comprehensive 3D Spatial Planning", and "Full Architectural Styling & Sourcing".
  - Interactive 4-step "Style & Space Questionnaire" guiding clients to their ideal package.
  - Interactive Consultation Booking Modal with date picker, space requirements, and estimated project cost.
R5. **Product Detail View**: Dedicated modal/drawer with deep-dive specs: materials, craftsmanship, dimensions, frame choices, designer notes, and customer reviews.
R6. **Shopping Cart & Checkout Drawer**: Slide-over cart drawer with item count, quantity increment/decrement, subtotal, tax calculation, discount code support, and seamless mock checkout flow with order confirmation.
R7. **Responsive & Accessible Design**: 100% mobile-responsive, touch-friendly, semantic HTML5, accessible contrast ratios, and keyboard navigability.
R8. **Automated Test Suite**: Unit and component tests verifying catalog filtering, cart calculations, visualizer state updates, and consultation form validation using Vitest.

## Acceptance Criteria
AC1. Given the user visits the homepage, when browsing, then they see an editorial hero banner, featured design collections, interactive visualizer CTA, customer testimonials, and an architecturally curated footer.
AC2. Given the user is on the product catalog, when filtering by category (e.g., "Wall Designs") or searching by keyword, then only matching items are rendered without full-page reload.
AC3. Given the user opens the Room & Wall Visualizer, when they change the room backdrop, wall paint tone, frame finish, or art piece, then the visual preview updates immediately in real-time.
AC4. Given the user adds one or multiple design items to the cart, when opening the cart drawer, then items, quantities, pricing breakdown, and total update accurately.
AC5. Given the user updates item quantities or removes an item in the cart, when viewing the total, then the subtotal recalculates instantly and state persists in localStorage.
AC6. Given the user completes the Style & Space Quiz, when they submit the questionnaire, then a personalized package recommendation with pricing and direct booking CTA is displayed.
AC7. Given invalid inputs in the consultation booking form (e.g. missing name or email), when submitting, then clear descriptive validation error messages are displayed and submission is prevented.
AC8. Given automated test execution via `npm test` / `npx vitest run`, when tests are executed, then 100% of test suites pass with zero failures.

## Out of Scope
- Real third-party payment gateway charges (Stripe live credit card transactions) — mocked with realistic instant validation and confirmation receipt.
- Real backend database server infrastructure (all state is client-managed with localStorage persistence).
- Full 3D WebGL physics engine (realistic high-res 2D composite layering visualizer is implemented instead).

## Edge Cases
- Empty cart state with "Explore Collections" CTA.
- No search results found with a graceful reset filter button.
- Rapid switching between wall colors and frame styles in the Visualizer without layout shift or UI flickering.
- Form submission with special characters or long text in custom design notes.

## Pitfalls
- **High-res image load latency**: Large interior photos can degrade performance if unoptimized. *Mitigation*: Use responsive modern image formats (WebP/optimized SVGs/Unsplash CDN with size parameters) and progressive lazy loading.
- **Visualizer Aspect Ratio Distortion**: Different art dimensions on variable room backgrounds can cause unnatural stretching. *Mitigation*: Maintain rigid aspect ratios with CSS `object-contain` and proportional scaling factors.

## Architecture
```
web/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── index.ts               # Product, Cart, Visualizer, Consultation models
│   ├── data/
│   │   ├── products.ts            # Curated designs, wall art, & concept packages
│   │   ├── visualizerData.ts      # Room scenes, wall paints, frame options
│   │   └── services.ts            # Interior planning service tiers & quiz questions
│   ├── context/
│   │   └── CartContext.tsx        # Shopping cart state & local storage synchronization
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── CartDrawer.tsx
│   │   ├── catalog/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductDetailModal.tsx
│   │   ├── visualizer/
│   │   │   ├── WallVisualizer.tsx
│   │   │   ├── RoomSelector.tsx
│   │   │   └── FrameSelector.tsx
│   │   ├── planning/
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── StyleQuizModal.tsx
│   │   │   └── BookingModal.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       └── Toast.tsx
│   └── test/
│       ├── cart.test.ts
│       └── products.test.ts
```

## API Design
Key client-side interfaces and data models:
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

## Open Questions
None — ready to plan.

## Research Flags
None.

## Decision Log
### 2026-09-24 — Initial Architecture & Scope Confirmation
- **Context**: User requested a very good looking website for selling designs, interior planning and wall designs.
- **Decision**: Adopt a modern React 18 + TypeScript + Vite + Tailwind CSS architecture with a warm minimalist editorial luxury design aesthetic, including an interactive Room & Wall Visualizer and a 4-step Interior Planning Style Quiz and Consultation Booking flow.
- **Reason**: Maximizes visual impact, fluid interactivity, mobile responsiveness, and client-side reliability without external backend infrastructure dependencies.

## References
- Modern Interior Design & Wall Art E-Commerce UI/UX Best Practices (2024-2026, Architectural Digest & Studio McGee benchmarks)
- Vite + React + Tailwind CSS Production Guide (2024, vitejs.dev & tailwindcss.com)
- Lucide Icons (lucide.dev, 2024)

## Memory Impact
- learnings.md Patterns: Warm minimalist editorial styling for design commerce; interactive room visualizer composite layering pattern.
- learnings.md Decisions: Adopt Vite + React + TypeScript + Tailwind CSS for web client.
- dependencies.md: react, react-dom, lucide-react, vite, tailwindcss, vitest.
