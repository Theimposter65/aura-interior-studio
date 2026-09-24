# Specification: portfolio-and-pricing-redesign

## Goal
Transform the website into an agile, highly visual, mobile-first portfolio and studio pricing portal for **The Artistic Tales**, eliminating outdated bulky sections, implementing swipeable horizontal portfolio galleries from 123 extracted authentic project photographs, adding an interactive Before/After room transformation viewer, introducing the studio pricing matrix, and standardizing strictly on INR (`₹`).

## Acceptance Criteria
- [ ] **AC-1 (Structural Pruning)**: The "Interactive Room Preview" (`WallVisualizer`) and "Featured Collection" (`ProductGrid`) sections are completely removed from `App.tsx` and the navigation menu.
- [ ] **AC-2 (Horizontal Scroll Portfolio)**: The portfolio presents project cards in horizontal swipeable rows (`overflow-x-auto snap-x`) grouped into Statement Collection, Styling Projects, Murals & Doodling, and Hotel/Cafe interiors, with desktop arrow controls and mobile touch swipe.
- [ ] **AC-3 (Statement Collection Integration)**: Statement items feature the 5 official categories and taglines:
  - Disco Statements: "Made to catch the light & attention"
  - Bar Statements: "Made to turn the bars into a vibe"
  - Mirror Statements: "Your space's new selfie corner"
  - Light Statements: "For spaces that deserve their own spotlight"
  - Wall Statements: "Walls into little more personality"
- [ ] **AC-4 (Before & After Transformation Showcase)**: All 18 extracted transformation projects are presented with interactive before/after split slider and side-by-side mode.
- [ ] **AC-5 (Studio Pricing Matrix)**: Dedicated pricing section displays transparent rates:
  - Doodling: Minimal ₹350/sq ft · Detailed ₹550/sq ft
  - Wall Mural: Minimal ₹550/sq ft · Detailed ₹850/sq ft
  - Paintings: 10x10 in (Canvas ₹4,500 / Print ₹3,000), 20x15 in (Canvas ₹14,500 / Print ₹7,000), 30x20 in (Canvas ₹29,500 / Print ₹12,000)
  - Interior Design (10x10 ft room): Design ₹12,000, Execution ₹17,000
  - Statement Pieces: ₹5,000–₹20,000
  - Footnote: "All prices excluding material and frame charges."
- [ ] **AC-6 (INR Standardization)**: All currency switchers (USD/EUR/GBP) are removed; all prices across the site are formatted in INR (`₹`).
- [ ] **AC-7 (Mobile & Length Optimization)**: Page length audited and trimmed for rapid mobile scanning without friction.
- [ ] **AC-8 (Quality Gates & Deployment)**: `npm test -- --run`, `npx tsc --noEmit`, and `npm run build` pass with zero errors, and deployment is pushed live to GitHub Pages.

## Evidence
- E1: Horizontal scroll portfolio rendering swipeable cards with category filters.
- E2: Interactive Before/After slider allowing comparison between transformation states.
- E3: New Pricing section displaying all 5 service categories and required footnote.
- E4: Navbar displaying only INR and clean navigation links (no currency dropdown, no visualizer link).
- E5: Vitest test suite running green with 100% test pass rate.
