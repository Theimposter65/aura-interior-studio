# Plan: Apple Design System & Fluid Physics Engine

## Overview
Decomposition of feature `apple-design-system` into 4 atomic, code-grounded waves.

---

## Wave 1: Mathematical Foundations & Apple Physics Engine
**Goal**: Create pure mathematical engine for momentum projection, rubber-banding, spring simulation, and velocity tracking with 100% test coverage.

### Task 1.1: Implement Apple Spring & Momentum Physics Engine
- **Files**: `web/src/utils/appleSpringPhysics.ts`
- **Action**:
  - Implement `projectMomentum(initialVelocity: number, decelerationRate = 0.998): number`.
  - Implement `rubberbandDistance(overshoot: number, dimension: number, constant = 0.55): number`.
  - Implement `criticallyDampedSpring(current: number, target: number, velocity: number, response = 0.35, dt = 0.016): { position: number; velocity: number }`.
  - Implement `underDampedSpring(current: number, target: number, velocity: number, dampingRatio = 0.8, response = 0.35, dt = 0.016): { position: number; velocity: number }`.
  - Implement `VelocityTracker` class tracking position and timestamp points with rolling window (100ms) to compute release velocity ($v = \Delta x / \Delta t$).
- **Done**: All math formulas exported with full TypeScript types and documentation.
- **Verification**: `npx tsc --noEmit`

### Task 1.2: Unit Test Suite for Apple Physics Engine
- **Files**: `web/src/test/appleSpringPhysics.test.ts`
- **Action**:
  - Write test cases verifying `projectMomentum` against analytical values (zero velocity, positive flick, negative flick, varying deceleration rates).
  - Write test cases verifying `rubberbandDistance` (zero overshoot, asymptotic saturation at large overshoot, negative overshoot).
  - Write test cases verifying spring convergence to target and overshoot behavior.
  - Write test cases for `VelocityTracker` (stationary, fast swipe, direction change).
- **Done**: Unit tests execute and pass cleanly.
- **Verification**: `npx vitest run src/test/appleSpringPhysics.test.ts`

---

## Wave 2: Direct Manipulation & Gesture Tracking
**Goal**: Elevate horizontal portfolio and Before & After slider into fluid 1:1 direct manipulation surfaces.

### Task 2.1: Upgrade Horizontal Portfolio with 1:1 Pointer Manipulation & Momentum
- **Files**: `web/src/components/portfolio/HorizontalPortfolio.tsx`
- **Action**:
  - Add pointer drag state (`isDragging`, `dragStartX`, `scrollStartX`, `velocityTracker`).
  - Use `onPointerDown`, `onPointerMove`, `onPointerUp`, `onPointerCancel` with `setPointerCapture`.
  - Apply 10px movement hysteresis before locking into drag.
  - On pointer move: calculate delta and update `scrollLeft` directly with rubber-banding resistance at bounds.
  - On pointer release: compute release velocity via `velocityTracker`, project target via `projectMomentum`, and smoothly animate spring snap to nearest card.
  - Disable native text selection / image ghost drag during interaction.
- **Done**: Horizontal portfolio responds fluidly to mouse drag and touch flick with Apple momentum.
- **Verification**: `npx vitest run` & `npm run build`

### Task 2.2: Upgrade Before/After Slider with Pointer Capture & Direct Manipulation
- **Files**: `web/src/components/portfolio/BeforeAfterSlider.tsx`
- **Action**:
  - Refactor slider handle to use `onPointerDown` with `e.currentTarget.setPointerCapture(e.pointerId)`.
  - Calculate position relative to container width with zero latency.
  - Add instant `:active:scale-95` tactile feedback to crystal handle.
  - Remove legacy global window event listeners.
- **Done**: Slider handle tracks 1:1 without slipping or jumping when pointer leaves bounds.
- **Verification**: `npx vitest run` & `npm run build`

---

## Wave 3: Fluid Sheets, Modals & Navigation Chrome
**Goal**: Implement Apple modal materialization, swipe-to-dismiss sheet gestures, and chrome edge blur masks.

### Task 3.1: Implement Apple Fluid Sheet Architecture for Modals
- **Files**: `web/src/components/planning/BookingModal.tsx`, `web/src/components/planning/StyleQuizModal.tsx`
- **Action**:
  - Add Apple materialization: simultaneous scale ($0.96 \to 1.0$) and backdrop blur rise on open.
  - Add mobile grab handle bar at top of sheet.
  - Implement vertical swipe-down drag to dismiss with `rubberbandDistance` when dragged upward, and velocity-based dismiss when flicked downward.
  - Maintain symmetric enter and exit animation curves.
- **Done**: Modals open with materialization and support intuitive swipe-to-dismiss gesture on mobile.
- **Verification**: `npx vitest run` & `npm run build`

### Task 3.2: Enhance Navigation Chrome with Scroll Edge Mask
- **Files**: `web/src/components/layout/Navbar.tsx`, `web/src/index.css`
- **Action**:
  - Add luminous top rim reflection on dynamic island header (`border-t border-white/50`).
  - Add subtle scroll edge gradient mask beneath floating header to smoothly dissolve scrolling text.
  - Ensure all navigation buttons use `:active:scale-97` instant tactile feedback.
- **Done**: Navigation feels like visionOS/macOS floating chrome.
- **Verification**: `npx vitest run` & `npm run build`

---

## Wave 4: Optical Typography, Deterministic Gates & Ship
**Goal**: Apply WWDC optical typography tables across the application, verify all quality gates, capture visual evidence, and ship.

### Task 4.1: Systematic WWDC Optical Typography Audit
- **Files**: `web/src/index.css`, `web/src/App.tsx`, `web/src/components/pricing/PricingSection.tsx`
- **Action**:
  - Enforce optical tracking: negative tracking (`-0.025em`) on display headings, tight leading (`1.05 - 1.08`), neutral tracking on body copy with comfortable leading (`1.55 - 1.6`).
  - Ensure `font-optical-sizing: auto` is declared globally.
  - Maintain 100% legibility and INR ₹ pricing clarity.
- **Done**: Typography strictly reflects WWDC 2020 *Details of UI Typography* guidance.
- **Verification**: `npx tsc --noEmit && npx eslint .`

### Task 4.2: Deterministic Verification & Evidence Capture
- **Files**: `docs/specs/apple-design-system/evidence.md`
- **Action**:
  - Run all quality gates: `tsc`, `vitest`, `eslint`, `build`.
  - Capture visual artifacts using Playwright browser tool.
  - Document evidence E1 through E5 in `evidence.md`.
- **Done**: All quality gates green and evidence verified.
- **Verification**: `npm run test && npm run build`
