/**
 * Optical Physics & Mathematical Engine for Liquid Glass Interfaces
 * Implements Snell's Law, Fresnel Reflectance (Schlick), Blinn-Phong Specular Highlights,
 * Chromatic Dispersion, and 3D Parallax Tilt Angles.
 */

export interface BoundingBox {
  width: number;
  height: number;
  left?: number;
  top?: number;
}

export interface TiltAngles {
  rotateX: number; // degrees
  rotateY: number; // degrees
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export interface SpecularCoords {
  percentX: number; // 0 to 100
  percentY: number; // 0 to 100
  intensity: number; // 0 to 1
  fresnel: number; // 0 to 1
}

export interface ChromaticOffsets {
  redOffset: number; // px
  greenOffset: number; // px
  blueOffset: number; // px
}

// Standard optical constants
export const REFRACTIVE_INDEX_AIR = 1.0;
export const REFRACTIVE_INDEX_GLASS = 1.52; // Crown glass / optical acrylic
export const REFRACTIVE_INDEX_RED = 1.514;
export const REFRACTIVE_INDEX_GREEN = 1.520;
export const REFRACTIVE_INDEX_BLUE = 1.528;

/**
 * Snell's Law: n1 * sin(theta1) = n2 * sin(theta2)
 * Returns refracted angle in radians, or null if total internal reflection occurs.
 */
export function calculateSnellRefraction(
  n1: number = REFRACTIVE_INDEX_AIR,
  n2: number = REFRACTIVE_INDEX_GLASS,
  theta1Radians: number
): number | null {
  if (n2 <= 0) return null;
  const sinTheta2 = (n1 / n2) * Math.sin(theta1Radians);
  if (Math.abs(sinTheta2) > 1.0) {
    // Total internal reflection
    return null;
  }
  return Math.asin(sinTheta2);
}

/**
 * Lateral displacement of a ray traversing a glass slab of thickness d (mm or px)
 * delta = d * sin(theta1 - theta2) / cos(theta2)
 */
export function calculateLateralDisplacement(
  thickness: number,
  theta1Radians: number,
  n1: number = REFRACTIVE_INDEX_AIR,
  n2: number = REFRACTIVE_INDEX_GLASS
): number {
  const theta2 = calculateSnellRefraction(n1, n2, theta1Radians);
  if (theta2 === null) return 0;
  const cosTheta2 = Math.cos(theta2);
  if (cosTheta2 === 0) return 0;
  return (thickness * Math.sin(theta1Radians - theta2)) / cosTheta2;
}

/**
 * Fresnel reflectance using Schlick's approximation:
 * R(theta) = R0 + (1 - R0) * (1 - cos(theta))^5
 * where R0 = ((n1 - n2) / (n1 + n2))^2
 */
export function calculateFresnelReflectance(
  cosTheta: number,
  n1: number = REFRACTIVE_INDEX_AIR,
  n2: number = REFRACTIVE_INDEX_GLASS
): number {
  const clampedCos = Math.max(0, Math.min(1, cosTheta));
  const r0 = Math.pow((n1 - n2) / (n1 + n2), 2);
  return r0 + (1 - r0) * Math.pow(1 - clampedCos, 5);
}

/**
 * Calculate 3D Parallax Tilt Angles based on pointer position relative to element center
 * rotateX tilts vertically (-maxAngle at top, +maxAngle at bottom)
 * rotateY tilts horizontally (+maxAngle at right, -maxAngle at left)
 */
export function calculateTiltAngles(
  pointerX: number,
  pointerY: number,
  bounds: BoundingBox,
  maxAngleDegrees: number = 7
): TiltAngles {
  if (bounds.width <= 0 || bounds.height <= 0) {
    return { rotateX: 0, rotateY: 0, normalizedX: 0, normalizedY: 0 };
  }

  const centerX = bounds.width / 2;
  const centerY = bounds.height / 2;

  const rawNormX = (pointerX - centerX) / centerX;
  const rawNormY = (pointerY - centerY) / centerY;

  const normalizedX = Math.max(-1, Math.min(1, rawNormX));
  const normalizedY = Math.max(-1, Math.min(1, rawNormY));

  const rotateX = -normalizedY * maxAngleDegrees;
  const rotateY = normalizedX * maxAngleDegrees;

  return {
    rotateX,
    rotateY,
    normalizedX,
    normalizedY,
  };
}

/**
 * Calculate dynamic specular highlight position and intensity following pointer
 */
export function calculateSpecularHighlight(
  pointerX: number,
  pointerY: number,
  bounds: BoundingBox
): SpecularCoords {
  if (bounds.width <= 0 || bounds.height <= 0) {
    return { percentX: 50, percentY: 50, intensity: 0, fresnel: 0.04 };
  }

  const percentX = Math.max(0, Math.min(100, (pointerX / bounds.width) * 100));
  const percentY = Math.max(0, Math.min(100, (pointerY / bounds.height) * 100));

  const normX = (pointerX - bounds.width / 2) / (bounds.width / 2);
  const normY = (pointerY - bounds.height / 2) / (bounds.height / 2);
  const distFromCenter = Math.min(1, Math.sqrt(normX * normX + normY * normY) / Math.SQRT2);

  // Blinn-phong specular falloff
  const intensity = Math.max(0, Math.min(1, Math.pow(1 - distFromCenter * 0.7, 2.5)));

  // Fresnel increases toward edges (grazing viewing angle)
  const cosTheta = Math.max(0, 1 - distFromCenter);
  const fresnel = calculateFresnelReflectance(cosTheta);

  return {
    percentX,
    percentY,
    intensity,
    fresnel,
  };
}

/**
 * Chromatic dispersion calculation (splitting white light into R, G, B displacement)
 */
export function calculateChromaticOffsets(
  incidenceAngleRad: number,
  thickness: number = 8
): ChromaticOffsets {
  const dRed = calculateLateralDisplacement(thickness, incidenceAngleRad, REFRACTIVE_INDEX_AIR, REFRACTIVE_INDEX_RED);
  const dGreen = calculateLateralDisplacement(thickness, incidenceAngleRad, REFRACTIVE_INDEX_AIR, REFRACTIVE_INDEX_GREEN);
  const dBlue = calculateLateralDisplacement(thickness, incidenceAngleRad, REFRACTIVE_INDEX_AIR, REFRACTIVE_INDEX_BLUE);

  return {
    redOffset: dRed,
    greenOffset: dGreen,
    blueOffset: dBlue,
  };
}
