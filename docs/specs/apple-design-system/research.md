# Research: Apple Design System & Fluid Physics Engine

## Overview
Grounding **The Artistic Tales** web experience in the complete Apple Design specification authored by Emil Kowalski (`apple-design`), translated from Apple's WWDC design talks:
- *Designing Fluid Interfaces* (WWDC 2018)
- *The Details of UI Typography* (WWDC 2020)
- *Designing Audio-Haptic Experiences* (WWDC 2021)
- *Principles of Great Design* (WWDC 2026)

The interface transitions from static/semi-static UI into a fluid system where:
1. **Motion starts from the current on-screen value, inherits user velocity, projects momentum forward, and can be grabbed and reversed at any instant.**
2. **Springs are the mathematical foundation**: parameterized by damping ratio $\zeta$ and response $T_0$, rather than arbitrary CSS duration.
3. **Touch and content move together (1:1 direct manipulation)** using Pointer Events with `setPointerCapture` and grab offset awareness.
4. **Edge boundaries rubber-band with progressive resistance** rather than stopping abruptly.
5. **Sheets and modals materialize** (blur radius + scale spring simultaneously) with anchored origin and swipe-to-dismiss velocity handoff.
6. **Optical typography hierarchy** enforces size-specific negative tracking and inverse leading across display and body scales.

---

## Mathematical & Physics Foundations

### 1. Apple Momentum Projection (WWDC 2018)
When a swipe or flick gesture releases, the interface must not stop at the release point or arbitrarily jump. It projects the resting position using exponential velocity decay:
$$d_{projected} = \left(\frac{v_0}{1000}\right) \cdot \frac{d}{1 - d}$$
where $v_0$ is the release velocity in pixels per second ($\text{px/s}$), and $d$ is the Apple deceleration rate ($d = 0.998$ for natural scroll feel; $d = 0.990$ for snappy cards).
The resting endpoint is:
$$x_{endpoint} = x_{current} + d_{projected}$$
The carousel or slider snaps to the nearest item at $x_{endpoint}$, and hands off $v_0$ into the spring.

### 2. Apple Rubber-Banding Resistance (WWDC 2018)
When dragging past content boundaries, linear movement breaks physical plausibility. Apple's soft boundary curve applies asymptotic resistance:
$$f(x) = \frac{x \cdot L \cdot c}{L + c \cdot |x|}$$
where:
- $x$: distance dragged beyond the boundary (overshoot)
- $L$: dimension of the viewport/container along the drag axis
- $c$: resistance constant (Apple standard $c = 0.55$)

As $x \to \infty$, $f(x)$ asymptotically approaches $L$. Real surfaces resist progressively before settling.

### 3. Apple Spring Parameters (Damping Ratio & Response)
Apple replaces mass/stiffness/friction with two intuitive physical parameters:
- **Damping ratio $\zeta$**:
  - $\zeta = 1.0$: critically damped (no overshoot, smooth deceleration, default for UI shifts).
  - $\zeta = 0.8$: under-damped (slight momentum overshoot, reserved for flicks, throws, and drawer releases).
- **Response $T_0$**: natural period in seconds ($T_0 = 2\pi / \omega_0 = 0.3\text{s} - 0.4\text{s}$).

The spring equation for position $x(t)$ with target $x_{target}$, initial position $x_0$, and initial velocity $v_0$:
For critical damping ($\zeta = 1$):
$$\omega_0 = \frac{2\pi}{T_0}$$
$$x(t) = x_{target} + \left( (x_0 - x_{target}) + (v_0 + \omega_0(x_0 - x_{target})) \cdot t \right) e^{-\omega_0 t}$$

### 4. Apple Optical Typography (WWDC 2020)
- **Tracking (letter-spacing)**:
  - Display titles ($>32\text{px}$): negative tracking ($-0.025\text{em}$ to $-0.020\text{em}$).
  - Subheadings ($18-24\text{px}$): slight negative tracking ($-0.010\text{em}$).
  - Body text ($14-16\text{px}$): neutral ($0\text{em}$).
  - Small labels/caps ($10-12\text{px}$): positive tracking ($+0.05\text{em}$ to $+0.20\text{em}$).
- **Leading (line-height)**:
  - Inversely correlated with size: display titles use tight leading ($1.05 - 1.08$), body copy uses comfortable leading ($1.50 - 1.60$).

---

## Scope & Target Components

1. **`web/src/utils/appleSpringPhysics.ts`**:
   - Pure math engine for `projectMomentum`, `rubberbandDistance`, `criticallyDampedSpring`, and velocity tracking (`VelocityTracker`).
   - 100% unit test coverage in `web/src/test/appleSpringPhysics.test.ts`.

2. **`web/src/components/portfolio/HorizontalPortfolio.tsx`**:
   - Upgrade from passive scroll to direct 1:1 pointer drag with `setPointerCapture`.
   - Continuous velocity tracking during drag.
   - Release momentum projection (`projectMomentum`) snapping to nearest artwork card.
   - Boundary rubber-banding (`rubberbandDistance`).

3. **`web/src/components/portfolio/BeforeAfterSlider.tsx`**:
   - Upgrade slider handle to Pointer Events with `setPointerCapture`.
   - Grab offset awareness and 1:1 direct tracking without pointer jumping.
   - Instant pointer-down tactile feedback (`apple-press`).

4. **`web/src/components/planning/BookingModal.tsx` & `StyleQuizModal.tsx`**:
   - Apple-style fluid sheet / modal presentation:
     - Backdrop dimming scrim (`bg-studio-950/65 backdrop-blur-md`).
     - Materialization animation (spring scale $0.96 \to 1.0$ + blur $0 \to 24\text{px}$).
     - Mobile swipe-down-to-dismiss gesture with boundary rubber-banding and velocity handoff.
     - Anchored symmetric exit path.

5. **`web/src/components/layout/Navbar.tsx` & Ambient Chrome**:
   - Translucent dynamic island with top-edge light catching (`border-t border-white/50`).
   - Scroll edge blur mask fading content as it slides beneath navigation chrome.
   - Instant pointer-down feedback on all navigation items.

---

## Decision Log
- **DL-1 (Technical)**: Implement Apple momentum and spring equations in a lightweight standalone module (`appleSpringPhysics.ts`) without adding external heavy npm dependencies like Framer Motion to preserve micro-second load times and lightweight bundle footprint.
- **DL-2 (Technical)**: Retain standard touch/scroll interoperability by applying direct pointer capture only during deliberate horizontal drags with a 10px directional hysteresis threshold (Emil Kowalski Section 10).
- **DL-3 (Technical)**: Honor `prefers-reduced-motion` across all spring calculations by immediately snapping to target without oscillation or slide translation.
- **DL-4 (Technical)**: Preserve 100% of authentic client content, portfolio items, pricing matrices, and WhatsApp routing.

## Open Questions
- None. All requirements are fully specified by Emil Kowalski's `apple-design` skill and Apple WWDC design talks.
