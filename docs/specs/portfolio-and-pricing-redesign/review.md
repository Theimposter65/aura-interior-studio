# Review: portfolio-and-pricing-redesign
Date: 2026-09-24
Base: 1f6e855 (tag: frame/checkpoint/build-portfolio-and-pricing-redesign-20260924T120000)

## Completion
| Requirement | Status | Evidence |
|-------------|--------|----------|
| AC-1 (Structural Pruning) | DONE | App.tsx:6-14, 182-198 (WallVisualizer & ProductGrid removed), Navbar.tsx:25-31 |
| AC-2 (Horizontal Scroll Portfolio) | DONE | HorizontalPortfolio.tsx:181-196 (snap-x, touch swipe, all category pills) |
| AC-3 (Statement Collection Integration) | DONE | newPortfolioData.ts:2150-2430 (31 items across Disco, Bar, Mirror, Light, Wall with taglines) |
| AC-4 (Before & After Transformation Showcase) | DONE | BeforeAfterSlider.tsx:1358-1633 (18 projects, split slider, side-by-side mode) |
| AC-5 (Studio Pricing Matrix) | DONE | PricingSection.tsx:1970-2131 (All 5 service tiers, exact rates, mandatory footnote) |
| AC-6 (INR Standardization) | DONE | 100% INR across site, navbar, modals, and style quiz (residual $ eliminated) |
| AC-7 (Mobile & Length Optimization) | DONE | Tightened vertical padding, streamlined fast mobile scan layout |
| AC-8 (Quality Gates & Deployment) | DONE | Vitest 36/36 pass, tsc pass, npm run build pass, deployed live to GitHub Pages |

## Automated Checks
- typecheck: PASS (0 errors)
- tests: PASS (36/36 passed)
- lint: PASS (0 errors)
- build: PASS (Vite production bundle generated in 10.61s)

## Evidence
5/5 items match the spec — docs/specs/portfolio-and-pricing-redesign/evidence.md
0 manual item(s) pending human confirmation

## Panel Verdicts
| Reviewer | Verdict | Findings | Status |
|----------|---------|----------|--------|
| Spec compliance | PASS | 0 | All AC satisfied; INR standardized 100% |
| Security        | PASS | 0 | encodeURIComponent, noopener/noreferrer, safe onError fallback |
| Performance     | PASS | 0 | touch-none, lazy loaded thumbnails, CLS=0, aspect ratios |
| Business logic  | PASS | 0 | Zero-width guard, touchcancel unbind, 100% photo access |
| Tests           | PASS | 0 | 36/36 tests, real NAV_LINKS, stylingPortfolioItems tested |
| Conventions     | PASS | 0 | Strict TypeScript, studio-950/900 palette tokens aligned |

## Resolved Findings

### [REV-1] Residual USD ($) Strings in Style Quiz Budget Options
- **Status**: FIXED (in commit `015147b`)
- **Fix**: Replaced with standard INR ranges (`Under ₹25,000`, `₹25,000 – ₹60,000`, `₹60,000+`).

### [REV-2] BeforeAfterSlider Division by Zero Produces NaN in clip-path
- **Status**: FIXED (in commit `015147b`)
- **Fix**: Added guard `if (!containerRef.current || rect.width <= 0) return;`.

### [REV-3] Missing touch-none and touchcancel Traps BeforeAfterSlider on Mobile
- **Status**: FIXED (in commit `015147b`)
- **Fix**: Added `touch-none` to slider container and subscribed `touchcancel` to `handleStopDragging`.

### [REV-4] 22 Authentic Styling Photos Excluded from HorizontalPortfolio Tabs
- **Status**: FIXED (in commit `015147b`)
- **Fix**: Added tabs `Canvas & Abstracts` and `Exhibitions & Custom`, exposing all 100% of extracted styling items.

### [REV-5] Tautological Assertions in layout.test.ts and Untested stylingPortfolioItems
- **Status**: FIXED (in commit `015147b`)
- **Fix**: Exported `NAV_LINKS` from `Navbar.tsx` and added comprehensive assertions in `layout.test.ts` and `features.test.ts`.

### [REV-6] CartContext Computes 8% Tax While CartDrawer Displays 18% GST
- **Status**: FIXED (in commit `015147b`)
- **Fix**: Updated tax multiplier from `0.08` to `0.18`.

### [REV-7] Unhandled Recursive Fallback in Image onError Handler
- **Status**: FIXED (in commit `015147b`)
- **Fix**: Added `target.onerror = null` before fallback reassignment.

### [REV-8] Tailwind Palette Drift in InquirySection.tsx (stone instead of studio)
- **Status**: FIXED (in commit `015147b`)
- **Fix**: Standardized submit button classes to `studio-950` and `studio-900`.

### [REV-9] Legacy Service Tier Prices in services.ts Conflict with Atelier Pricing
- **Status**: FIXED (in commit `015147b`)
- **Fix**: Updated starting retainers to ₹4,500, ₹12,000, and ₹25,000.

## Recommendation
approve

## Memory Updates
- learnings.md Anti-Patterns: Never leave dummy tautology assertions in test files (`expect('INR').toBe('INR')`); always test real exported configuration or components.
- learnings.md Patterns: In interactive drag components, always combine `touch-none` with `touchcancel` event handling to prevent mobile gesture lock.
