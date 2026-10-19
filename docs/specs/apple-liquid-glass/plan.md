# Plan: Apple Liquid Glass Interface & Optical Refractions

## Touched Files
- `src/utils/glassPhysics.ts` (new)
- `src/test/glassPhysics.test.ts` (new)
- `src/components/glass/LiquidGlassFilter.tsx` (new)
- `src/components/glass/LiquidGlassCard.tsx` (new)
- `src/components/glass/LiquidGlassPill.tsx` (new)
- `src/components/glass/LiquidBackground.tsx` (new)
- `src/index.css`
- `src/components/layout/Navbar.tsx`
- `src/App.tsx`
- `src/components/portfolio/HorizontalPortfolio.tsx`
- `src/components/portfolio/BeforeAfterSlider.tsx`
- `src/components/pricing/PricingSection.tsx`
- `src/components/planning/InquirySection.tsx`

---

### Wave 1: Mathematical Foundations & Liquid Glass Component System (AC-1, AC-2, AC-8)

#### Task 1.1: Optical Physics Engine & Unit Tests
- **Action**: Create `src/utils/glassPhysics.ts` containing:
  - `calculateSnellRefraction(n1, n2, theta1)`: Snell's Law angle calculation.
  - `calculateFresnelReflectance(cosTheta, n1, n2)`: Schlick's approximation for rim reflection.
  - `calculateTiltAngles(pointerX, pointerY, rect, maxAngle)`: 3D parallax tilt $(\text{rotateX}, \text{rotateY})$.
  - `calculateSpecularHighlight(pointerX, pointerY, rect)`: Normalized Blinn-Phong highlight coordinates and intensity.
  - Create comprehensive tests in `src/test/glassPhysics.test.ts`.
- **Done**: All math functions tested and verified with exact numerical bounds.
- **Context**: Groundwork for true physical refraction rather than static blur.
- **Verification**: `npx vitest run src/test/glassPhysics.test.ts` passes.

#### Task 1.2: Procedural SVG Refraction Filter & Base Glass CSS
- **Action**: Create `src/components/glass/LiquidGlassFilter.tsx` rendering SVG displacement maps (`feDisplacementMap`, `feTurbulence`, `feComponentTransfer`) for optical refraction distortion. Add custom CSS utilities in `src/index.css` for Apple liquid glass materials, vibrancy, optical tracking, and micro-surface noise grain.
- **Done**: Filter component and CSS utilities integrated and exported.
- **Context**: Generates real physical refraction displacement on background elements.
- **Verification**: `npx tsc --noEmit` passes.

#### Task 1.3: Reusable Liquid Glass Components (`LiquidGlassCard`, `LiquidGlassPill`, `LiquidBackground`)
- **Action**:
  - Build `LiquidGlassCard.tsx`: Supports 3D pointer tilt, dynamic specular glare spotlight, Fresnel edge rim, chromatic caustic bevels, and critically damped spring settle.
  - Build `LiquidGlassPill.tsx`: Compact liquid glass capsule for badges, tags, and nav chips.
  - Build `LiquidBackground.tsx`: Organic floating ambient light orbs with gentle sinusoidal motion.
- **Done**: Components built with TypeScript types and exported.
- **Context**: Reusable building blocks for pages and sections.
- **Verification**: `npx tsc --noEmit` passes.

---

### Wave 2: Navigation Chrome & Hero Section (AC-3, AC-4, AC-5)

#### Task 2.1: Floating Apple Liquid Glass Navbar
- **Action**: Upgrade `Navbar.tsx` into a floating liquid glass dynamic island with:
  - Translucent frosted glass body (`backdrop-blur-2xl bg-white/45 saturate-[190%]`).
  - Luminous top edge light catching (`border-t border-white/50`).
  - Apple spring button interactions (`:active:scale-95`).
  - Dynamic specular reflection following pointer coordinates.
- **Done**: Navbar upgraded and responsive on mobile and desktop.
- **Context**: First point of contact embodying Apple design language.
- **Verification**: `npx tsc --noEmit` and `npx vitest run src/test/layout.test.ts` pass.

#### Task 2.2: Liquid Hero & Brand Craft Section with Optical Typography
- **Action**: Upgrade `App.tsx` Hero and Brand Pillars section:
  - Apply Apple optical typography: display headings with negative tracking (`-0.025em`) and tight leading (`1.08`).
  - Liquid glass credibility cards and floating badge pills.
  - Fluid call-to-action buttons with instant pointer-down feedback.
  - Integrate `LiquidBackground` and `LiquidGlassFilter`.
- **Done**: Hero radiates depth and authentic refraction.
- **Context**: Central visual anchor of the homepage.
- **Verification**: `npx tsc --noEmit` passes.

---

### Wave 3: Portfolio, Transformations & Pricing Integration (AC-6, AC-7)

#### Task 3.1: Liquid Glass Portfolio & Before/After Slider
- **Action**:
  - Upgrade `HorizontalPortfolio.tsx` with liquid glass card frames, chromatic border dispersion, and responsive touch gestures.
  - Upgrade `BeforeAfterSlider.tsx` with a liquid glass refractive handle that magnifies the split seam between before and after images.
- **Done**: All 123 authentic WebP photos and 18 transformations encased in liquid glass.
- **Context**: Elevates portfolio showcase without altering data.
- **Verification**: `npx tsc --noEmit` and `npx vitest run src/test/features.test.ts` pass.

#### Task 3.2: Liquid Glass Pricing Matrix, Testimonials & Inquiry Form
- **Action**:
  - Upgrade `PricingSection.tsx` with liquid crystal tiers, frosted price badges, and subtle gold specular sheen.
  - Wrap Testimonial cards and `InquirySection.tsx` in liquid glass containers.
- **Done**: Clean visual harmony across all lower sections.
- **Context**: Premium finishes for transactional sections.
- **Verification**: `npx tsc --noEmit` passes.

---

### Wave 4: Quality Gates, Accessibility & Evidence (AC-8, E1-E5)

#### Task 4.1: Quality Gates & Verification
- **Action**: Run `npx tsc --noEmit`, `npx vitest run`, `npx eslint .`, and `npm run build`. Capture visual evidence screenshots E1-E5 using Playwright.
- **Done**: All gates green, evidence recorded in `docs/specs/apple-liquid-glass/evidence.md`.
- **Context**: Verification and readiness for review.
- **Verification**: 0 errors across all gates.
