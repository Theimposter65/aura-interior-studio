import { describe, it, expect } from 'vitest';
import {
  projectMomentum,
  rubberbandDistance,
  criticallyDampedSpring,
  underDampedSpring,
  VelocityTracker,
} from '../utils/appleSpringPhysics';

describe('Apple Spring & Momentum Physics Engine', () => {
  describe('projectMomentum (WWDC 2018 Deceleration Formula)', () => {
    it('returns 0 when velocity is zero or negligible', () => {
      expect(projectMomentum(0)).toBe(0);
      expect(projectMomentum(0.0001)).toBe(0);
    });

    it('calculates analytical resting distance for standard flick', () => {
      // v = 1000 px/s, d = 0.998 -> (1000 / 1000) * (0.998 / (1 - 0.998)) = 499 px
      const distance = projectMomentum(1000, 0.998);
      expect(distance).toBeCloseTo(499, 1);
    });

    it('preserves directional sign for negative flick (swiping left)', () => {
      const distance = projectMomentum(-500, 0.998);
      expect(distance).toBeCloseTo(-249.5, 1);
    });

    it('handles snappier deceleration rates (d = 0.990)', () => {
      // (1000 / 1000) * (0.990 / 0.010) = 99 px
      const distance = projectMomentum(1000, 0.99);
      expect(distance).toBeCloseTo(99, 1);
    });

    it('clamps unreasonable deceleration inputs to safe boundaries', () => {
      const clampedHigh = projectMomentum(1000, 1.5);
      expect(Number.isFinite(clampedHigh)).toBe(true);

      const clampedLow = projectMomentum(1000, -0.5);
      expect(Number.isFinite(clampedLow)).toBe(true);
    });
  });

  describe('rubberbandDistance (WWDC 2018 Soft Boundary Resistance)', () => {
    it('returns 0 when overshoot is 0 or container dimension is 0', () => {
      expect(rubberbandDistance(0, 1000)).toBe(0);
      expect(rubberbandDistance(100, 0)).toBe(0);
      expect(rubberbandDistance(100, -50)).toBe(0);
    });

    it('resists progressively according to Apple formula', () => {
      // x = 100, L = 1000, c = 0.55
      // (100 * 1000 * 0.55) / (1000 + 0.55 * 100) = 55000 / 1055 ≈ 52.13
      const resisted = rubberbandDistance(100, 1000, 0.55);
      expect(resisted).toBeCloseTo(52.13, 1);
      expect(resisted).toBeLessThan(100); // progressive resistance must be smaller than linear overshoot
    });

    it('is symmetric for negative overshoot (left/top boundary)', () => {
      const positive = rubberbandDistance(150, 800, 0.55);
      const negative = rubberbandDistance(-150, 800, 0.55);
      expect(negative).toBeCloseTo(-positive, 4);
    });

    it('asymptotically approaches boundary limit without exploding at large overshoot', () => {
      const hugeOvershoot = rubberbandDistance(100000, 1000, 0.55);
      expect(hugeOvershoot).toBeLessThanOrEqual(1000);
      expect(Number.isFinite(hugeOvershoot)).toBe(true);
    });
  });

  describe('criticallyDampedSpring (zeta = 1.0)', () => {
    it('moves current value toward target monotonically', () => {
      let current = 0;
      const target = 100;
      let velocity = 0;

      for (let i = 0; i < 30; i++) {
        const step = criticallyDampedSpring(current, target, velocity, 0.35, 0.016);
        current = step.position;
        velocity = step.velocity;
      }

      // After 30 steps (~0.48s), critically damped spring should have settled very close to target
      expect(current).toBeGreaterThan(95);
      expect(current).toBeLessThanOrEqual(100.1); // No overshoot for critically damped
    });

    it('settles immediately when already at target with zero velocity', () => {
      const step = criticallyDampedSpring(50, 50, 0, 0.35, 0.016);
      expect(step.position).toBe(50);
      expect(step.velocity).toBe(0);
    });
  });

  describe('underDampedSpring (zeta = 0.8 momentum spring)', () => {
    it('handles under-damped bounce and converges to target', () => {
      let current = 0;
      const target = 100;
      let velocity = 500; // high momentum flick

      let maxPosition = 0;
      for (let i = 0; i < 50; i++) {
        const step = underDampedSpring(current, target, velocity, 0.8, 0.35, 0.016);
        current = step.position;
        velocity = step.velocity;
        if (current > maxPosition) maxPosition = current;
      }

      // Under-damped spring with high velocity will overshoot target slightly before settling
      expect(maxPosition).toBeGreaterThan(target);
      expect(current).toBeCloseTo(target, 0);
    });

    it('falls back to critically damped if dampingRatio >= 1.0', () => {
      const step1 = underDampedSpring(0, 100, 0, 1.0, 0.35, 0.016);
      const step2 = criticallyDampedSpring(0, 100, 0, 0.35, 0.016);
      expect(step1.position).toBeCloseTo(step2.position, 4);
    });
  });

  describe('VelocityTracker', () => {
    it('returns zero velocity when fewer than 2 points exist', () => {
      const tracker = new VelocityTracker();
      expect(tracker.getVelocity()).toEqual({ vx: 0, vy: 0 });

      tracker.addPoint(100, 200, 1000);
      expect(tracker.getVelocity()).toEqual({ vx: 0, vy: 0 });
    });

    it('computes accurate velocity between points', () => {
      const tracker = new VelocityTracker();
      tracker.addPoint(0, 0, 1000);
      tracker.addPoint(100, 50, 1100); // 100px in 100ms -> 1000 px/s, 50px in 100ms -> 500 px/s

      const vel = tracker.getVelocity(1120);
      expect(vel.vx).toBeCloseTo(1000, 0);
      expect(vel.vy).toBeCloseTo(500, 0);
    });

    it('prunes points outside the sliding window', () => {
      const tracker = new VelocityTracker();
      tracker.addPoint(0, 0, 1000);
      tracker.addPoint(50, 0, 1100);
      tracker.addPoint(100, 0, 1300); // 1000 is 300ms old and should be pruned

      const vel = tracker.getVelocity(1320);
      // Between 1100 and 1300: 50px in 200ms -> 250 px/s
      expect(vel.vx).toBeCloseTo(250, 0);
    });

    it('returns zero velocity when pointer paused before release (staleness check)', () => {
      const tracker = new VelocityTracker();
      tracker.addPoint(0, 0, 1000);
      tracker.addPoint(100, 0, 1100);

      // Pointer paused for 150ms before releasing at 1250
      const vel = tracker.getVelocity(1250);
      expect(vel.vx).toBe(0);
      expect(vel.vy).toBe(0);
    });

    it('resets points cleanly', () => {
      const tracker = new VelocityTracker();
      tracker.addPoint(100, 100, 1000);
      tracker.addPoint(200, 200, 1050);
      tracker.reset();
      expect(tracker.getVelocity()).toEqual({ vx: 0, vy: 0 });
    });
  });
});
