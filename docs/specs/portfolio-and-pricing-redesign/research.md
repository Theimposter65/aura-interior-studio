# Research: portfolio-and-pricing-redesign

## Overview
A comprehensive structural redesign, content elevation, and pricing architecture update for **The Artistic Tales** (`https://theimposter65.github.io/aura-interior-studio/`). The update transforms the client presentation from a heavy, generic interior decor store format into a fast, punchy, mobile-first studio portfolio showcasing authentic works across 3 key collections extracted from the client's official presentation documents, with a clear, transparent INR pricing matrix and bespoke inquiry booking system.

## Clarifications
No clarifications needed — assumed:
- **Client Brand Identity**: The Artistic Tales ("Walls That Remember", Interior Space Stylist, Goa & Gujarat with worldwide commissions).
- **Extracted Content**: 123 authentic high-resolution photographs extracted from the 3 source PDFs:
  1. `the_statement_collection.pdf` (5 statement categories: Disco, Bar, Mirror, Light, Wall with exact client taglines).
  2. `portfolio_for_interior_space_styling.pdf` (General styling: Exhibitions & Collaborations, Abstract Works, Painting Collage for Bars, Doodling on Walls & Cafeterias, Airbnb Styling, Hotel Interiors, Cafe Collages, Hotel Murals, Doodling on Bar Tables, Customised Artworks).
  3. `airbnb_and_villas_designs.pdf` (18 complete Before & After room transformation sets).
- **Structural Pruning**:
  - Remove "Interactive Room Preview" (`WallVisualizer`) entirely.
  - Remove "Featured Collection" (`ProductGrid`) entirely.
  - Audit and tighten page length to ensure swift scanning on mobile devices.
- **Horizontal Scroll UX**: Replace vertical portfolio lists with silky, swipeable horizontal card rows with touch swipe support, category pills, quick-view modal, and direct commission triggers.
- **Before/After Compare Treatment**: Interactive Before/After slider with draggable divider and side-by-side toggle for instant visual impact.
- **Pricing Matrix (INR Only)**:
  - Doodling: Minimal ₹350/sq ft · Detailed ₹550/sq ft
  - Wall Mural: Minimal ₹550/sq ft · Detailed ₹850/sq ft
  - Paintings (Canvas / Print): 10x10 in (₹4,500 / ₹3,000), 20x15 in (₹14,500 / ₹7,000), 30x20 in (₹29,500 / ₹12,000)
  - Interior Design (10x10 ft room): Design ₹12,000, Execution ₹17,000 (excl. installation)
  - Statement Pieces: ₹5,000–₹20,000
  - Footnote: "All prices excluding material and frame charges."
  - Currency: Strictly INR (`₹`) throughout the entire application; remove USD/EUR/GBP switcher.

## Current State
- `App.tsx` renders heavy sections (`WallVisualizer`, `ProductGrid`) that lengthen page load and vertical scroll distance.
- Currency switcher still exists in `Navbar.tsx` and cart types.
- The portfolio currently uses static vertical grid layout rather than horizontal swipeable showcases.
- 123 optimized WebP images have been extracted and placed in `/web/public/assets/portfolio/`.

## Architecture & Design Decisions

### 1. Horizontal Scroll Portfolio Component (`HorizontalPortfolio.tsx`)
- **UX Architecture**:
  - Category tabs: "Statement Collection", "Before & After Transformations", "Murals & Doodling", "Hospitality & Bars", "Bespoke Artworks".
  - Scroll container: CSS `flex overflow-x-auto snap-x snap-mandatory` with hidden scrollbars, smooth trackpad/wheel support, and visible navigation arrows for desktop.
  - Card design: High-aspect photography cards with ambient hover elevation, collection badge, space type, and quick commission inquiry CTA via WhatsApp.
  - Mobile ergonomics: Full touch swipe velocity, 85vw card width previewing the adjacent card to hint at horizontal scroll affordance.

### 2. Interactive Before/After Slider (`BeforeAfterSlider.tsx`)
- **UX Architecture**:
  - Slider container with 0–100% split position.
  - Drag handle and touch listener for interactive exploration of room transformations.
  - Quick toggle button between "Interactive Slider" and "Side-by-Side" view.
  - Project pagination to easily browse all 18 transformation projects.

### 3. Dedicated Transparent Studio Pricing Section (`PricingSection.tsx`)
- **Information Architecture**:
  - Grouped into 4 clean cards/panels:
    1. **Wall Murals & Doodling** (per sq ft rates for Minimal and Detailed styling).
    2. **Original Paintings & Fine Art Prints** (10×10, 20×15, 30×20 tier comparisons).
    3. **Interior Space Design & Execution** (10×10 ft room standard, Design vs Execution).
    4. **Bespoke Statement Pieces** (₹5,000 – ₹20,000 custom art objects & lighting).
  - Clear mandatory footnote: *"All prices excluding material and frame charges."*
  - Instant "Calculate Project Estimate" or "Book Custom Quote" action directly pre-filling the inquiry form / WhatsApp message.

### 4. Page Length Audit & Mobile Tightening
- Eliminate redundant vertical spacers.
- Streamline Hero credibility bar.
- Cut repetitive marketing prose, letting the real photographic work lead.
- Keep essential high-converting modules: Hero, Horizontal Portfolio, Before/After Slider, Pricing, Testimonials, Inquiry Form, Footer.

## Quality Gates & Verification
- `npm test -- --run`: All unit and integration tests passing.
- `npx tsc --noEmit`: Strict TypeScript typing with zero errors.
- `npm run build`: Production bundle optimized with Vite.
- GitHub Pages live deployment verified via `gh-pages` branch.
