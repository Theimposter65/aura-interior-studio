import { describe, it, expect } from 'vitest';
import {
  roundedRectSdf,
  surfaceHeight,
  surfaceTilt,
  lateralShift,
  refractionProfile,
  displacementAt,
  specularAt,
  buildGlassMaps,
} from '../utils/liquidGlassMap';
import { REFRACTIVE_INDEX_RED, REFRACTIVE_INDEX_BLUE } from '../utils/glassPhysics';

const pill = { width: 200, height: 60, radius: 30, bezel: 18 };
const optics = { thickness: 30 };

describe('liquidGlassMap', () => {
  describe('roundedRectSdf', () => {
    it('is negative inside, ~0 on the edge and positive outside', () => {
      expect(roundedRectSdf(100, 30, pill).distance).toBeCloseTo(-30, 5);
      expect(roundedRectSdf(100, 0, pill).distance).toBeCloseTo(0, 5);
      expect(roundedRectSdf(100, -5, pill).distance).toBeCloseTo(5, 5);
    });

    it('returns outward unit normals on straight edges and rounded caps', () => {
      expect(roundedRectSdf(100, 2, pill)).toMatchObject({ nx: 0, ny: -1 });
      expect(roundedRectSdf(100, 58, pill)).toMatchObject({ nx: 0, ny: 1 });
      const cap = roundedRectSdf(5, 5, pill);
      expect(Math.hypot(cap.nx, cap.ny)).toBeCloseTo(1, 5);
      expect(cap.nx).toBeLessThan(0);
      expect(cap.ny).toBeLessThan(0);
    });
  });

  describe('bevel surface', () => {
    it('rises from 0 at the rim to 1 at the flat top', () => {
      expect(surfaceHeight(0)).toBe(0);
      expect(surfaceHeight(1)).toBe(1);
      expect(surfaceHeight(0.3)).toBeLessThan(surfaceHeight(0.6));
    });

    it('is steep at the rim and flat at the top', () => {
      expect(surfaceTilt(0.01, 18, 30)).toBeGreaterThan(Math.PI / 3);
      expect(surfaceTilt(1, 18, 30)).toBeCloseTo(0, 5);
    });
  });

  describe('refraction (Snell)', () => {
    it('does not shift light on the flat top or at the grazing rim', () => {
      expect(lateralShift(1, 18, optics)).toBeCloseTo(0, 5);
      expect(lateralShift(0, 18, optics)).toBeCloseTo(0, 5);
    });

    it('peaks just inside the rim and decays toward the centre', () => {
      const profile = refractionProfile(18, optics);
      const peakIndex = profile.samples.indexOf(profile.max);
      expect(peakIndex / (profile.samples.length - 1)).toBeLessThan(0.15);
      expect(lateralShift(0.5, 18, optics)).toBeLessThan(profile.max / 4);
    });

    it('bends further through thicker glass', () => {
      expect(refractionProfile(18, { thickness: 40 }).max).toBeGreaterThan(refractionProfile(18, { thickness: 20 }).max);
    });

    it('disperses: blue refracts more than red', () => {
      const red = refractionProfile(18, { ...optics, ior: REFRACTIVE_INDEX_RED }).max;
      const blue = refractionProfile(18, { ...optics, ior: REFRACTIVE_INDEX_BLUE }).max;
      expect(blue).toBeGreaterThan(red);
    });
  });

  describe('displacementAt', () => {
    const profile = refractionProfile(pill.bezel, optics);

    it('pulls the backdrop from further inside the shape', () => {
      const top = displacementAt(100, 2, pill, profile);
      expect(top.dy).toBeGreaterThan(0);
      expect(top.dx).toBeCloseTo(0, 5);
      const right = displacementAt(198, 30, pill, profile);
      expect(right.dx).toBeLessThan(0);
    });

    it('is zero on the flat centre and outside the glass', () => {
      expect(displacementAt(100, 30, pill, profile)).toEqual({ dx: 0, dy: 0 });
      expect(displacementAt(100, -3, pill, profile)).toEqual({ dx: 0, dy: 0 });
    });
  });

  describe('specularAt', () => {
    it('catches the key light on the upper-left rim, a weaker glint lower-right, none in the centre', () => {
      const upperLeft = specularAt(12, 10, pill, optics);
      const lowerRight = specularAt(188, 50, pill, optics);
      expect(upperLeft).toBeGreaterThan(lowerRight);
      expect(lowerRight).toBeGreaterThan(0);
      expect(specularAt(100, 30, pill, optics)).toBe(0);
    });
  });

  describe('buildGlassMaps', () => {
    it('traces maps at device resolution with a neutral centre', () => {
      const maps = buildGlassMaps(pill, optics, 2);
      expect(maps.width).toBe(400);
      expect(maps.height).toBe(120);
      expect(maps.displacement.length).toBe(400 * 120 * 4);

      const centre = (60 * 400 + 200) * 4;
      expect(maps.displacement[centre]).toBe(128);
      expect(maps.displacement[centre + 1]).toBe(128);
      expect(maps.displacement[centre + 3]).toBe(255);
      expect(maps.specular[centre + 3]).toBe(0);
      expect(maps.maxShift).toBeGreaterThan(0);
    });

    it('encodes inward displacement on the top rim', () => {
      const maps = buildGlassMaps(pill, optics, 1);
      const topRim = (2 * 200 + 100) * 4;
      expect(maps.displacement[topRim + 1]).toBeGreaterThan(160);
    });
  });
});
