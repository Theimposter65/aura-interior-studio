# Specification: Apple Design System & Fluid Physics Engine

## Overview
- **Feature**: `apple-design-system`
- **Scope**: Implementation of Emil Kowalski's `apple-design` skill foundations across the site: mathematical momentum projection, boundary rubber-banding, 1:1 direct pointer manipulation with pointer capture, Apple spring physics, fluid sheet modals, and WWDC optical typography.

---

## Acceptance Criteria

### AC-1: Apple Spring & Motion Physics Engine
- Implement [`appleSpringPhysics.ts`](file:///home/motobomber/agy/web/src/utils/appleSpringPhysics.ts) with pure mathematical implementations of:
  - `projectMomentum(initialVelocity, decelerationRate)` ($d=0.998$).
  - `rubberbandDistance(overshoot, dimension, constant)` ($c=0.55$).
  - `criticallyDampedSpring(current, target, velocity, response, dt)` ($\zeta=1.0$).
  - `underDampedSpring(current, target, velocity, dampingRatio, response, dt)` ($\zeta=0.8$).
  - `VelocityTracker` class maintaining a rolling timestamp/position history window for accurate release velocity calculation.
- Backed by 100% unit test coverage in `web/src/test/appleSpringPhysics.test.ts`.

### AC-2: Direct Manipulation 1:1 Horizontal Portfolio
- In [`HorizontalPortfolio.tsx`](file:///home/motobomber/agy/web/src/components/portfolio/HorizontalPortfolio.tsx):
  - Support direct pointer dragging with Pointer Events and `setPointerCapture`.
  - Apply 10px directional hysteresis before committing to drag.
  - Track release velocity and calculate resting endpoint via `projectMomentum`.
  - Snap smoothly to the nearest card at projected endpoint.
  - Apply soft boundary rubber-banding when dragged past first or last card.

### AC-3: Direct Manipulation Before & After Slider
- In [`BeforeAfterSlider.tsx`](file:///home/motobomber/agy/web/src/components/portfolio/BeforeAfterSlider.tsx):
  - Replace legacy window listeners with Pointer Events and `setPointerCapture` on the slider handle.
  - Maintain 1:1 tracking without pointer release slip or center jump.
  - Provide instant pointer-down scale feedback (`apple-press`).

### AC-4: Fluid Sheet Modals with Materialization & Swipe Dismiss
- In [`BookingModal.tsx`](file:///home/motobomber/agy/web/src/components/planning/BookingModal.tsx) and [`StyleQuizModal.tsx`](file:///home/motobomber/agy/web/src/components/planning/StyleQuizModal.tsx):
  - Implement Apple materialization: simultaneous scale ($0.96 \to 1.0$) and backdrop blur rise.
  - Mobile bottom-sheet presentation with grab handle.
  - Drag-down-to-dismiss gesture with `rubberbandDistance` upward resistance and velocity handoff downward dismiss.
  - Symmetric enter/exit paths.

### AC-5: Floating Chrome & Scroll Edge Effects
- In [`Navbar.tsx`](file:///home/motobomber/agy/web/src/components/layout/Navbar.tsx):
  - Luminous light-catching top edge (`border-t border-white/50`).
  - Subtle blur/gradient transition beneath floating navigation chrome so content smoothly dissolves as it scrolls underneath.
  - Tactile instant press scaling (`:active:scale-97`).

### AC-6: Optical Typography & Hierarchy
- Audit and apply WWDC optical typography tables across the app:
  - Large display headings ($>32\text{px}$): negative tracking (`-0.025em`) and tight leading (`1.05 - 1.08`).
  - Subheadings: `-0.01em` tracking.
  - Body text: comfortable leading (`1.55 - 1.6`) with `system-ui` optical sizing.
  - Uppercase tags/badges: positive tracking (`+0.15em` to `+0.25em`).

### AC-7: Deterministic Quality Gates & Accessibility
- Respect `prefers-reduced-motion` (disable spring motion, immediate snaps) and `prefers-reduced-transparency`.
- All quality gates must pass:
  - `npx tsc --noEmit` (0 errors)
  - `npx vitest run` (100% passing tests)
  - `npx eslint .` (0 errors, 0 warnings)
  - `npm run build` (clean production build)

---

## Evidence List

| ID | Title | Description | Target Path |
| :--- | :--- | :--- | :--- |
| **E1** | Apple Spring Physics Tests | Vitest unit test suite proving exact match for WWDC formulas (`project`, `rubberband`, `spring`) | `web/src/test/appleSpringPhysics.test.ts` |
| **E2** | Direct Manipulation Portfolio | Interactive horizontal portfolio with 1:1 pointer drag, momentum flick, and rubber-banding | Live browser artifact / screenshot |
| **E3** | Direct Capture Before/After Slider | Slider handle tracking with pointer capture and tactile feedback | Live browser artifact / screenshot |
| **E4** | Fluid Sheet Modal Materialization | Booking and style quiz modals with spring materialization and swipe-down dismiss | Live browser artifact / screenshot |
| **E5** | Optical Typography & Chrome | Dynamic island header with scroll edge effect and WWDC optical typography hierarchy | Live browser artifact / screenshot |
