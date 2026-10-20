# Code Review: Apple Design System & Fluid Physics Engine

## Overview
- **Feature**: `apple-design-system`
- **Spec**: `docs/specs/apple-design-system/spec.md`
- **Evidence**: `docs/specs/apple-design-system/evidence.md`
- **Round**: 1 of 5
- **Verdict**: **APPROVE (ready to ship)**

---

## Panel Verdicts

| Reviewer Role | Initial Verdict | Post-Fix Verdict | Key Observations |
|---|---|---|---|
| **Spec Compliance & Accessibility** | WARN | **PASS** | AC-1 through AC-7 verified. `apple-nav-edge-mask` connected to Navbar header. `prefers-reduced-motion` checked dynamically in portfolio `scrollTo` for instant snaps. Sheet modals equipped with `VelocityTracker` and drag dismiss. Both `@media (prefers-reduced-motion: reduce)` and `@media (prefers-reduced-transparency: reduce)` verified. |
| **Performance & Math** | WARN | **PASS** | `appleSpringPhysics.ts` closed-form ODE spring solutions verified. Velocity staleness check added (`currentTime - last.time > 100ms`). CSS `snap-none scroll-auto` applied during active dragging to eliminate jitter. Dynamic `cardPitch` calculated from DOM child elements. Container bounds cached on pointer down in slider. |
| **Conventions & Security** | PASS | **PASS** | 0 TypeScript errors (`tsc --noEmit`). 0 ESLint warnings (`eslint .`). Strict types with no untyped `any`. Pointer captures protected with `try/catch`. All WhatsApp links sanitized with `encodeURIComponent` and opened with `noopener,noreferrer`. |

---

## Quality Gates Audit

| Gate | Command | Result |
|---|---|---|
| Type check | `npx tsc --noEmit` | **PASS** (0 errors) |
| Unit tests | `npx vitest run` | **PASS** (11 test files, 68/68 passed, including 18 physics tests) |
| Linter | `npx eslint .` | **PASS** (0 warnings, 0 errors) |
| Production build | `npm run build` | **PASS** (`dist/` compiled cleanly in 2.8s) |

---

## Resolved Review Findings
1. **Finding 1 (Velocity staleness)**: Resolved in `appleSpringPhysics.ts:148-151` by zeroing velocity when pointer paused > 100ms before release. Verified by unit test.
2. **Finding 2 (Drag contention with scroll snap)**: Resolved in `HorizontalPortfolio.tsx:325` by toggling `snap-none scroll-auto` while dragging.
3. **Finding 3 (Dynamic Card Pitch)**: Resolved in `HorizontalPortfolio.tsx:215` by computing pitch dynamically from `firstCard.offsetWidth + 24`.
4. **Finding 4 (Reduced motion programmatic scroll)**: Resolved in `HorizontalPortfolio.tsx:220` by querying `matchMedia('(prefers-reduced-motion: reduce)')`.
5. **Finding 5 (Unused nav scroll edge mask)**: Resolved in `Navbar.tsx:67` by applying `.apple-nav-edge-mask` to header.
6. **Finding 6 (Bounds caching in slider)**: Resolved in `BeforeAfterSlider.tsx:39` by caching `getBoundingClientRect()` on pointer down.
7. **Finding 7 (Velocity flick dismiss on sheets)**: Resolved in `BookingModal.tsx` and `StyleQuizModal.tsx` using `modalVelocityTracker.current.getVelocity()`.
8. **Finding 8 (Keyframe transform conflict)**: Resolved in `index.css:105` by removing `forwards` from `.apple-materialize`.

**Final Panel Verdict: APPROVE (ready to ship)**
