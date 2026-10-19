import { describe, it, expect } from 'vitest';
import {
  calculateSnellRefraction,
  calculateLateralDisplacement,
  calculateFresnelReflectance,
  calculateTiltAngles,
  calculateSpecularHighlight,
  calculateChromaticOffsets,
  REFRACTIVE_INDEX_AIR,
  REFRACTIVE_INDEX_GLASS,
} from '../utils/glassPhysics';

describe('glassPhysics Engine', () => {
  describe('Snell Refraction', () => {
    it('calculates normal incidence refraction (0 degrees) as 0 radians', () => {
      const angle = calculateSnellRefraction(REFRACTIVE_INDEX_AIR, REFRACTIVE_INDEX_GLASS, 0);
      expect(angle).toBeCloseTo(0, 5);
    });

    it('calculates refraction for 45 degree incidence ray', () => {
      const angleRad = Math.PI / 4; // 45 deg
      const refracted = calculateSnellRefraction(REFRACTIVE_INDEX_AIR, REFRACTIVE_INDEX_GLASS, angleRad);
      expect(refracted).not.toBeNull();
      // sin(theta2) = sin(45) / 1.52 = 0.7071 / 1.52 = 0.4652 -> theta2 ≈ 0.4839 rad (27.7 deg)
      expect(refracted!).toBeCloseTo(0.4839, 3);
    });

    it('detects total internal reflection when ray goes from glass to air at critical angle', () => {
      // Critical angle theta_c = arcsin(1.0 / 1.52) ≈ 41.14 deg (0.718 rad)
      const grazingAngle = Math.PI / 3; // 60 deg > critical angle
      const tir = calculateSnellRefraction(REFRACTIVE_INDEX_GLASS, REFRACTIVE_INDEX_AIR, grazingAngle);
      expect(tir).toBeNull();
    });
  });

  describe('Lateral Displacement', () => {
    it('returns 0 lateral displacement for perpendicular rays', () => {
      const displacement = calculateLateralDisplacement(10, 0);
      expect(displacement).toBeCloseTo(0, 5);
    });

    it('returns positive displacement for inclined ray through glass slab', () => {
      const displacement = calculateLateralDisplacement(10, Math.PI / 6); // 30 deg, 10mm slab
      expect(displacement).toBeGreaterThan(0);
      expect(displacement).toBeLessThan(10);
    });
  });

  describe('Fresnel Reflectance (Schlick)', () => {
    it('returns base reflectance R0 ≈ 0.0426 at perpendicular viewing (cosTheta = 1)', () => {
      const r = calculateFresnelReflectance(1.0);
      expect(r).toBeCloseTo(0.0426, 3);
    });

    it('returns maximum reflectance R ≈ 1.0 at glancing angle (cosTheta = 0)', () => {
      const r = calculateFresnelReflectance(0.0);
      expect(r).toBeCloseTo(1.0, 3);
    });

    it('monotonically increases reflectance as angle moves from perpendicular to grazing', () => {
      const rPerp = calculateFresnelReflectance(1.0);
      const r45 = calculateFresnelReflectance(0.707);
      const rGlance = calculateFresnelReflectance(0.1);
      expect(r45).toBeGreaterThan(rPerp);
      expect(rGlance).toBeGreaterThan(r45);
    });
  });

  describe('3D Parallax Tilt Angles', () => {
    const bounds = { width: 400, height: 300 };

    it('returns 0 degrees at exact card center', () => {
      const tilt = calculateTiltAngles(200, 150, bounds, 8);
      expect(tilt.rotateX).toBeCloseTo(0, 4);
      expect(tilt.rotateY).toBeCloseTo(0, 4);
      expect(tilt.normalizedX).toBeCloseTo(0, 4);
      expect(tilt.normalizedY).toBeCloseTo(0, 4);
    });

    it('returns positive rotateY and negative rotateX for top-right pointer', () => {
      const tilt = calculateTiltAngles(400, 0, bounds, 10);
      expect(tilt.rotateX).toBe(10); // tilted back because pointer is at top
      expect(tilt.rotateY).toBe(10); // tilted right because pointer is at right
      expect(tilt.normalizedX).toBe(1);
      expect(tilt.normalizedY).toBe(-1);
    });

    it('handles zero or negative bounds safely without throwing', () => {
      const tilt = calculateTiltAngles(50, 50, { width: 0, height: 0 });
      expect(tilt.rotateX).toBe(0);
      expect(tilt.rotateY).toBe(0);
    });
  });

  describe('Dynamic Specular Highlight', () => {
    const bounds = { width: 200, height: 100 };

    it('maps pointer to 50% 50% when at center', () => {
      const specular = calculateSpecularHighlight(100, 50, bounds);
      expect(specular.percentX).toBeCloseTo(50, 1);
      expect(specular.percentY).toBeCloseTo(50, 1);
      expect(specular.intensity).toBeGreaterThan(0.5);
    });

    it('calculates higher Fresnel rim reflectance near edges', () => {
      const centerSpec = calculateSpecularHighlight(100, 50, bounds);
      const edgeSpec = calculateSpecularHighlight(0, 0, bounds);
      expect(edgeSpec.fresnel).toBeGreaterThan(centerSpec.fresnel);
    });
  });

  describe('Chromatic Aberration Offsets', () => {
    it('calculates distinct offsets for red, green, and blue rays', () => {
      const offsets = calculateChromaticOffsets(Math.PI / 4, 12);
      expect(offsets.redOffset).toBeGreaterThan(0);
      expect(offsets.greenOffset).toBeGreaterThan(0);
      expect(offsets.blueOffset).toBeGreaterThan(0);
      // Red bends slightly less than blue because n_red < n_blue
      expect(offsets.redOffset).toBeLessThan(offsets.blueOffset);
    });
  });
});
