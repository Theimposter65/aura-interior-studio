# Evidence: Apple Design System & Fluid Physics Engine

## Overview
- **Feature**: `apple-design-system`
- **Spec**: `docs/specs/apple-design-system/spec.md`
- **Plan**: `docs/specs/apple-design-system/plan.md`
- **Generated**: 2026-10-20T03:35:00Z

---

## Evidence Items

### E1: Apple Spring & Momentum Physics Engine
- **Requirement**: AC-1
- **Status**: **VERIFIED**
- **Artifact**: [`web/src/test/appleSpringPhysics.test.ts`](file:///home/motobomber/agy/web/src/test/appleSpringPhysics.test.ts)
- **Results**: 17 unit tests passing (100%):
  - `projectMomentum`: Analytical match for $v_0 = 1000\text{px/s}$, $d = 0.998$ yielding $499\text{px}$ resting travel distance; negative flick directionality; snappier $d = 0.990$.
  - `rubberbandDistance`: Soft asymptotic boundary curve with Apple constant $c = 0.55$, zero container guard, and symmetric negative overshoot.
  - `criticallyDampedSpring`: Monotonic settle to target without oscillation.
  - `underDampedSpring`: Momentum overshoot with smooth convergence to target.
  - `VelocityTracker`: Rolling 120ms sliding window calculating release velocity in $\text{px/s}$.

### E2: Direct Manipulation 1:1 Horizontal Portfolio
- **Requirement**: AC-2
- **Status**: **VERIFIED**
- **Artifact**: [`web/src/components/portfolio/HorizontalPortfolio.tsx`](file:///home/motobomber/agy/web/src/components/portfolio/HorizontalPortfolio.tsx)
- **Verification**:
  - `onPointerDown`, `onPointerMove`, `onPointerUp` with `setPointerCapture`.
  - 8px directional hysteresis to disambiguate vertical scroll intent.
  - 1:1 pointer tracking with `rubberbandDistance` at both scroll boundaries.
  - Exponential deceleration projection (`projectMomentum`) snapping to nearest card upon pointer release.
  - Suppressed card click when drag gesture is detected.

### E3: Direct Capture Before & After Slider
- **Requirement**: AC-3
- **Status**: **VERIFIED**
- **Artifact**: [`web/src/components/portfolio/BeforeAfterSlider.tsx`](file:///home/motobomber/agy/web/src/components/portfolio/BeforeAfterSlider.tsx)
- **Verification**:
  - Replaced legacy window mouse/touch listeners with Pointer Events and `setPointerCapture`.
  - Handle scale expands to $1.15\times$ on press (`cubic-bezier(0.16, 1, 0.3, 1)`) providing instant tactile feedback.
  - Continuous 1:1 split position tracking without cursor slip.

### E4: Fluid Sheet Modal Materialization & Swipe Dismiss
- **Requirement**: AC-4
- **Status**: **VERIFIED**
- **Artifacts**:
  - [`web/src/components/planning/BookingModal.tsx`](file:///home/motobomber/agy/web/src/components/planning/BookingModal.tsx)
  - [`web/src/components/planning/StyleQuizModal.tsx`](file:///home/motobomber/agy/web/src/components/planning/StyleQuizModal.tsx)
- **Verification**:
  - CSS `@keyframes appleMaterialize`: simultaneous scale ($0.96 \to 1.0$) and progressive rise.
  - Mobile grab handle pill at sheet top.
  - Pointer drag-to-dismiss gesture: downward drag follows finger 1:1; upward drag applies `rubberbandDistance`; release exceeding threshold triggers smooth dismiss.

### E5: Dynamic Island Chrome & WWDC Optical Typography
- **Requirement**: AC-5 & AC-6
- **Status**: **VERIFIED**
- **Artifacts**:
  - [`web/src/components/layout/Navbar.tsx`](file:///home/motobomber/agy/web/src/components/layout/Navbar.tsx)
  - [`web/src/index.css`](file:///home/motobomber/agy/web/src/index.css)
- **Verification**:
  - Floating dynamic island with bright top-edge light catching (`border-t-white/80`).
  - Scroll edge mask (`.apple-nav-edge-mask`) smoothly dissolving scrolling elements beneath chrome.
  - WWDC 2020 optical typography tables enforced globally: display headings use negative tracking (`-0.025em`) and tight leading (`1.08`), body copy maintains comfortable leading (`1.55`).
