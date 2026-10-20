/**
 * Apple Fluid Physics & Motion Engine
 * Based on Emil Kowalski's apple-design specification and Apple WWDC design talks:
 * - Designing Fluid Interfaces (WWDC 2018)
 * - The Details of UI Typography (WWDC 2020)
 * - Principles of Great Design (WWDC 2026)
 */

/**
 * Projects resting endpoint position using Apple's exponential scroll deceleration formula.
 * @param initialVelocity Release velocity in pixels per second (px/s)
 * @param decelerationRate Exponential decay rate (0.998 for standard scroll, 0.99 for snappier sheets)
 * @returns Projected travel distance in pixels
 */
export function projectMomentum(initialVelocity: number, decelerationRate = 0.998): number {
  if (Math.abs(initialVelocity) < 0.001) return 0;
  const d = Math.max(0.5, Math.min(decelerationRate, 0.9995));
  return (initialVelocity / 1000) * (d / (1 - d));
}

/**
 * Soft boundary rubber-band resistance curve.
 * Real materials resist progressively as they exceed boundaries before coming to a stop.
 * @param overshoot Distance dragged beyond the edge boundary (can be positive or negative)
 * @param dimension Total length/dimension of the container/viewport along the drag axis
 * @param constant Apple resistance coefficient (standard c = 0.55)
 * @returns Resisted displacement in pixels
 */
export function rubberbandDistance(overshoot: number, dimension: number, constant = 0.55): number {
  if (Math.abs(overshoot) < 0.001 || dimension <= 0) return 0;
  const c = Math.max(0.1, constant);
  const absOvershoot = Math.abs(overshoot);
  const resisted = (absOvershoot * dimension * c) / (dimension + c * absOvershoot);
  return Math.sign(overshoot) * resisted;
}

/**
 * Computes single time-step for a critically damped spring (zeta = 1.0).
 * Ideal for standard UI transitions: no overshoot, smooth settle, natural deceleration.
 * @param current Current position
 * @param target Target position
 * @param velocity Current velocity in px/s
 * @param response Natural period response time in seconds (standard 0.3s - 0.4s)
 * @param dt Delta time elapsed in seconds (default 1/60s ≈ 0.016s)
 */
export function criticallyDampedSpring(
  current: number,
  target: number,
  velocity: number,
  response = 0.35,
  dt = 0.016
): { position: number; velocity: number } {
  const safeResponse = Math.max(0.05, response);
  const omega0 = (2 * Math.PI) / safeResponse;
  const delta = current - target;

  if (Math.abs(delta) < 0.001 && Math.abs(velocity) < 0.001) {
    return { position: target, velocity: 0 };
  }

  const exp = Math.exp(-omega0 * dt);
  const c1 = delta;
  const c2 = velocity + omega0 * delta;

  const nextPos = target + (c1 + c2 * dt) * exp;
  const nextVel = (velocity - omega0 * c2 * dt) * exp;

  return { position: nextPos, velocity: nextVel };
}

/**
 * Computes single time-step for an under-damped spring (zeta < 1.0, e.g. 0.8).
 * Used when gestures carry momentum (flicks, throws, sheet releases).
 * @param current Current position
 * @param target Target position
 * @param velocity Current velocity in px/s
 * @param dampingRatio Damping ratio zeta (0.8 = Apple momentum bounce)
 * @param response Natural period response time in seconds
 * @param dt Delta time elapsed in seconds
 */
export function underDampedSpring(
  current: number,
  target: number,
  velocity: number,
  dampingRatio = 0.8,
  response = 0.35,
  dt = 0.016
): { position: number; velocity: number } {
  if (dampingRatio >= 1.0) {
    return criticallyDampedSpring(current, target, velocity, response, dt);
  }

  const safeResponse = Math.max(0.05, response);
  const omega0 = (2 * Math.PI) / safeResponse;
  const zeta = Math.max(0.05, Math.min(dampingRatio, 0.999));
  const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
  const delta = current - target;

  if (Math.abs(delta) < 0.001 && Math.abs(velocity) < 0.001) {
    return { position: target, velocity: 0 };
  }

  const exp = Math.exp(-zeta * omega0 * dt);
  const c1 = delta;
  const c2 = (velocity + zeta * omega0 * delta) / omegaD;

  const cos = Math.cos(omegaD * dt);
  const sin = Math.sin(omegaD * dt);

  const nextPos = target + exp * (c1 * cos + c2 * sin);
  const nextVel =
    -zeta * omega0 * exp * (c1 * cos + c2 * sin) +
    exp * (-c1 * omegaD * sin + c2 * omegaD * cos);

  return { position: nextPos, velocity: nextVel };
}

export interface VelocityPoint {
  x: number;
  y: number;
  time: number;
}

/**
 * Rolling velocity tracker for Pointer Events.
 * Tracks recent pointer movements within a 100ms window to determine accurate release velocity.
 */
export class VelocityTracker {
  private history: VelocityPoint[] = [];
  private maxWindowMs = 120;

  public addPoint(x: number, y: number, time: number = performance.now()): void {
    this.history.push({ x, y, time });
    // Prune entries older than sliding window
    const cutoff = time - this.maxWindowMs;
    while (this.history.length > 2 && this.history[0].time < cutoff) {
      this.history.shift();
    }
  }

  public getVelocity(currentTime: number = performance.now()): { vx: number; vy: number } {
    if (this.history.length < 2) {
      return { vx: 0, vy: 0 };
    }

    const first = this.history[0];
    const last = this.history[this.history.length - 1];

    // If pointer paused for > 100ms before release, velocity has decayed to zero
    if (currentTime - last.time > 100) {
      return { vx: 0, vy: 0 };
    }

    const dt = (last.time - first.time) / 1000; // seconds

    if (dt <= 0.001) {
      return { vx: 0, vy: 0 };
    }

    const vx = (last.x - first.x) / dt;
    const vy = (last.y - first.y) / dt;

    return { vx, vy };
  }

  public reset(): void {
    this.history = [];
  }
}
