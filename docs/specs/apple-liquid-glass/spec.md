# Specification: Apple Liquid Glass Interface & Optical Refractions

## Overview
Redesign **The Artistic Tales** website to adopt an Apple-grade Liquid Glass design system with real physical and mathematical optical refractions (Snell's Law, Fresnel rim lighting, chromatic caustics, dynamic specular lighting, and 3D pointer parallax), while rigorously adhering to Emil Kowalski's `apple-design` principles (tactile response, spring motion, optical typography, translucency hierarchy).

## Acceptance Criteria
- **AC-1 (Liquid Glass Component System)**: Implement `LiquidGlassCard`, `LiquidGlassPill`, and `LiquidGlassContainer` components with configurable refractive indices, dynamic pointer-following specular highlight ($I_{spec} = (\vec{N} \cdot \vec{H})^\alpha$), and 3D card tilt physics ($\text{rotateX}, \text{rotateY}$).
- **AC-2 (Physical Optical Refractions)**: Provide SVG-based displacement and chromatic aberration filters (`feDisplacementMap`, radial caustics, and prism rim lighting) simulating glass refraction ($n = 1.52$) and Fresnel edge reflection.
- **AC-3 (Floating Ambient Physics Layer)**: Render floating liquid gradient orbs in the page background that drift with sinusoidal physics, visibly refracting and warping beneath frosted liquid glass cards and navigation chrome.
- **AC-4 (Apple Navigation Chrome)**: Redesign `Navbar` as a floating liquid glass dynamic island / frosted pill with liquid refraction, bright top edge light catching (`rgba(255, 255, 255, 0.4)`), and tactile pointer-down feedback.
- **AC-5 (Liquid Hero & Optical Typography)**: Elevate the Hero section with Apple optical typography (negative tracking `-0.025em`, tight display leading `1.08`), liquid crystal badges, and fluid action buttons with instant press response.
- **AC-6 (Portfolio & Transformation Glass Integration)**: Encase horizontal portfolio cards and the Before & After comparison slider with liquid glass frames, subtle micro-surface acrylic grain, and smooth gesture handling.
- **AC-7 (Pricing Matrix & Interactive Glass Panels)**: Re-skin the pricing matrix, client testimonial cards, and consultation form with tiered liquid glass weights (light/medium/thick crystal) that preserve 100% legibility and INR ₹ rates.
- **AC-8 (Accessibility & Performance Gates)**: Respect `prefers-reduced-motion` and `prefers-reduced-transparency`. All quality gates (`tsc`, `vitest`, `eslint`, `build`) must pass with 0 errors.

## Evidence
- **E1**: Automated unit tests validating liquid glass calculations (Fresnel reflection, Snell refraction displacement, Euler tilt angles, Blinn-Phong specular intensity).
- **E2**: Live browser snapshot of floating liquid glass navigation bar with blur, refraction, and specular highlight.
- **E3**: Live browser snapshot of Hero section with optical typography and liquid glass badges.
- **E4**: Live browser snapshot of Liquid Glass portfolio and Before/After slider.
- **E5**: Live browser snapshot of Liquid Glass pricing matrix and consultation form.

## Non-Functional Requirements
- 60fps hardware-accelerated animations using CSS transforms and `backdrop-filter`.
- Zero layout shift (CLS < 0.05).
- Clean responsive layout on mobile (375px) and desktop (1440px).
