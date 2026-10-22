/**
 * Liquid Glass optics.
 *
 * Models a glass slab lying on the content, flat in the middle with a convex squircle bevel around
 * its rim. For every pixel we trace a ray from the viewer straight down through the surface:
 *   1. the bevel's slope gives the surface normal and so the angle of incidence θi,
 *   2. Snell's law bends the ray to θt inside the glass,
 *   3. the ray drifts sideways by depth · tan(θi − θt) before reaching the content below.
 * That drift is the displacement field fed to `feDisplacementMap`. Because each colour channel
 * has its own index of refraction, the R/G/B fields differ slightly — real dispersion.
 *
 * The same normals drive a specular map: Fresnel reflectance (grazing rims reflect more) plus a
 * key light from the upper-left and its weaker exit glint on the opposite rim.
 */

import {
  calculateFresnelReflectance,
  calculateSnellRefraction,
  REFRACTIVE_INDEX_AIR,
  REFRACTIVE_INDEX_GREEN,
} from './glassPhysics';

export interface GlassGeometry {
  width: number;
  height: number;
  /** Corner radius in px (clamped to half the shortest side, so a capsule is `height / 2`). */
  radius: number;
  /** Width of the curved rim in px — the only region that refracts. */
  bezel: number;
}

export interface GlassOptics {
  /** Height of the glass at the top of the bevel, in px. Thicker glass bends the backdrop further. */
  thickness: number;
  /** Index of refraction for the channel being traced. */
  ior?: number;
}

export interface SdfSample {
  /** Signed distance to the edge: negative inside the shape, positive outside. */
  distance: number;
  /** Outward unit normal of the nearest edge. */
  nx: number;
  ny: number;
}

/** Signed distance + outward normal of a rounded rectangle, sampled at (x, y) in px from its top-left. */
export function roundedRectSdf(x: number, y: number, g: GlassGeometry): SdfSample {
  const hw = g.width / 2;
  const hh = g.height / 2;
  const r = Math.max(0, Math.min(g.radius, hw, hh));
  const px = x - hw;
  const py = y - hh;
  const qx = Math.abs(px) - (hw - r);
  const qy = Math.abs(py) - (hh - r);
  const sx = px < 0 ? -1 : 1;
  const sy = py < 0 ? -1 : 1;

  if (qx > 0 && qy > 0) {
    const len = Math.hypot(qx, qy);
    return { distance: len - r, nx: (qx / len) * sx, ny: (qy / len) * sy };
  }
  if (qx > qy) {
    return { distance: qx - r, nx: sx, ny: 0 };
  }
  return { distance: qy - r, nx: 0, ny: sy };
}

/** Bevel height (0…1) at depth t into the rim, 0 = outer edge, 1 = start of the flat top. */
export function surfaceHeight(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return Math.pow(1 - Math.pow(1 - c, 4), 0.25);
}

/** dh/dt of the squircle bevel. Unbounded at the very rim, so t is floored to keep it finite. */
export function surfaceSlope(t: number): number {
  const c = Math.max(1e-4, Math.min(1, t));
  const inner = 1 - Math.pow(1 - c, 4);
  return Math.pow(1 - c, 3) * Math.pow(inner, -0.75);
}

/** Tilt of the surface away from the viewer at depth t, in radians. */
export function surfaceTilt(t: number, bezel: number, thickness: number): number {
  if (bezel <= 0) return 0;
  return Math.atan((thickness / bezel) * surfaceSlope(t));
}

/** Sideways drift (px, toward the centre) of a vertical ray entering the bevel at depth t. */
export function lateralShift(t: number, bezel: number, optics: GlassOptics): number {
  const ior = optics.ior ?? REFRACTIVE_INDEX_GREEN;
  const thetaI = surfaceTilt(t, bezel, optics.thickness);
  const thetaT = calculateSnellRefraction(REFRACTIVE_INDEX_AIR, ior, thetaI);
  if (thetaT === null) return 0;
  const depth = surfaceHeight(t) * optics.thickness;
  return depth * Math.tan(thetaI - thetaT);
}

const PROFILE_SAMPLES = 256;

export interface RefractionProfile {
  /** Shift in px at evenly spaced depths 0…1 across the bevel. */
  samples: Float32Array;
  /** Largest shift anywhere on the bevel, in px. */
  max: number;
}

/** Pre-traced shift across the bevel; the field is radially symmetric so one profile covers every pixel. */
export function refractionProfile(bezel: number, optics: GlassOptics): RefractionProfile {
  const samples = new Float32Array(PROFILE_SAMPLES + 1);
  let max = 0;
  for (let i = 0; i <= PROFILE_SAMPLES; i++) {
    const shift = lateralShift(i / PROFILE_SAMPLES, bezel, optics);
    samples[i] = shift;
    if (shift > max) max = shift;
  }
  return { samples, max };
}

function sampleProfile(profile: RefractionProfile, t: number): number {
  const f = Math.max(0, Math.min(1, t)) * PROFILE_SAMPLES;
  const i = Math.floor(f);
  if (i >= PROFILE_SAMPLES) return profile.samples[PROFILE_SAMPLES];
  const frac = f - i;
  return profile.samples[i] * (1 - frac) + profile.samples[i + 1] * frac;
}

/** Inward displacement at (x, y) in px. Zero on the flat top and outside the shape. */
export function displacementAt(
  x: number,
  y: number,
  g: GlassGeometry,
  profile: RefractionProfile
): { dx: number; dy: number } {
  const { distance, nx, ny } = roundedRectSdf(x, y, g);
  if (distance > 0 || g.bezel <= 0) return { dx: 0, dy: 0 };
  const t = -distance / g.bezel;
  if (t >= 1) return { dx: 0, dy: 0 };
  const shift = sampleProfile(profile, t);
  // The ray bends toward the centre, so the content seen here comes from further inside.
  return { dx: -nx * shift, dy: -ny * shift };
}

// Key light from the upper-left, slightly in front of the glass (screen space, y down, z to viewer).
const KEY_LIGHT = normalize3(-0.45, -0.75, 0.55);
// Light that crossed the slab leaves a weaker glint on the opposite rim.
const EXIT_LIGHT = normalize3(0.45, 0.75, 0.55);
const VIEW = [0, 0, 1] as const;

function normalize3(x: number, y: number, z: number): [number, number, number] {
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
}

function blinnPhong(n: [number, number, number], light: [number, number, number], shininess: number): number {
  const h = normalize3(light[0] + VIEW[0], light[1] + VIEW[1], light[2] + VIEW[2]);
  const nDotH = Math.max(0, n[0] * h[0] + n[1] * h[1] + n[2] * h[2]);
  return Math.pow(nDotH, shininess);
}

/** Highlight intensity 0…1 at (x, y): Fresnel rim reflection + key/exit specular glints. */
export function specularAt(x: number, y: number, g: GlassGeometry, optics: GlassOptics): number {
  const { distance, nx, ny } = roundedRectSdf(x, y, g);
  if (distance > 0 || g.bezel <= 0) return 0;
  const t = -distance / g.bezel;
  if (t >= 1) return 0;

  const tilt = surfaceTilt(t, g.bezel, optics.thickness);
  const sinT = Math.sin(tilt);
  const normal: [number, number, number] = [nx * sinT, ny * sinT, Math.cos(tilt)];
  const fresnel = calculateFresnelReflectance(normal[2], REFRACTIVE_INDEX_AIR, optics.ior ?? REFRACTIVE_INDEX_GREEN);
  // Polished glass: a tight lobe gives a thin line of light along the rim rather than a haze.
  const glint = blinnPhong(normal, KEY_LIGHT, 90) + 0.5 * blinnPhong(normal, EXIT_LIGHT, 90);
  return Math.min(1, fresnel * 0.35 + glint * 0.9);
}

export interface GlassMaps {
  /** Pixel size of both maps (geometry × scale). */
  width: number;
  height: number;
  /** RGBA displacement field, R/G = X/Y around 128, normalised to `maxShift`. */
  displacement: Uint8ClampedArray<ArrayBuffer>;
  /** RGBA white with the highlight intensity in alpha. */
  specular: Uint8ClampedArray<ArrayBuffer>;
  /** Peak shift in CSS px that a full ±127 channel value represents. */
  maxShift: number;
}

/**
 * Bakes the displacement and specular maps. `scale` is the device pixel ratio — maps are traced at
 * device resolution so the rim stays crisp on high-density displays.
 */
export function buildGlassMaps(g: GlassGeometry, optics: GlassOptics, scale = 1): GlassMaps {
  const width = Math.max(1, Math.round(g.width * scale));
  const height = Math.max(1, Math.round(g.height * scale));
  const profile = refractionProfile(g.bezel, optics);
  const maxShift = Math.max(profile.max, 1e-6);
  const displacement = new Uint8ClampedArray(width * height * 4);
  const specular = new Uint8ClampedArray(width * height * 4);

  for (let py = 0; py < height; py++) {
    const y = (py + 0.5) / scale;
    for (let px = 0; px < width; px++) {
      const x = (px + 0.5) / scale;
      const i = (py * width + px) * 4;
      const { dx, dy } = displacementAt(x, y, g, profile);
      displacement[i] = 128 + (dx / maxShift) * 127;
      displacement[i + 1] = 128 + (dy / maxShift) * 127;
      displacement[i + 2] = 128;
      displacement[i + 3] = 255;

      specular[i] = 255;
      specular[i + 1] = 255;
      specular[i + 2] = 255;
      specular[i + 3] = specularAt(x, y, g, optics) * 255;
    }
  }

  return { width, height, displacement, specular, maxShift };
}
