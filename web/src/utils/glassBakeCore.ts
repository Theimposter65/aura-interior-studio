import { buildGlassMaps, refractionProfile } from './liquidGlassMap';
import { REFRACTIVE_INDEX_BLUE, REFRACTIVE_INDEX_GREEN, REFRACTIVE_INDEX_RED } from './glassPhysics';

export interface GlassBakeRequest {
  width: number;
  height: number;
  radius: number;
  bezel: number;
  thickness: number;
  /** Device pixel ratio the maps are traced at. */
  scale: number;
}

export interface GlassBakeResult {
  displacement: Blob;
  specular: Blob;
  /**
   * feDisplacementMap scale per channel. `null` when dispersion is below half a device pixel —
   * physically present but invisible, so a single displacement pass renders identically.
   */
  channelScales: { r: number; g: number; b: number } | null;
  scale: number;
}

/** Below this spread (CSS px) between red and blue shifts, dispersion cannot be seen. */
export const VISIBLE_DISPERSION_PX = 0.5;

type CanvasLike = OffscreenCanvas | HTMLCanvasElement;

async function encode(data: Uint8ClampedArray<ArrayBuffer>, width: number, height: number, makeCanvas: (w: number, h: number) => CanvasLike): Promise<Blob> {
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D | null;
  if (!ctx) throw new Error('2D canvas unavailable');
  ctx.putImageData(new ImageData(data, width, height), 0, 0);
  if ('convertToBlob' in canvas) return canvas.convertToBlob({ type: 'image/png' });
  return new Promise((resolve, reject) =>
    canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error('PNG encoding failed'))), 'image/png')
  );
}

/**
 * feDisplacementMap scales for a surface. The filter shifts by scale × (channel − 0.5) and the map
 * spans ±0.5, so scale = 2 × peak shift. Per-channel scales are returned only when red and blue
 * land at least half a pixel apart; below that the three-pass dispersion filter is pure cost.
 */
export function displacementScales(bezel: number, thickness: number): Pick<GlassBakeResult, 'scale' | 'channelScales'> {
  const peak = (ior: number) => 2 * refractionProfile(bezel, { thickness, ior }).max;
  const red = peak(REFRACTIVE_INDEX_RED);
  const green = peak(REFRACTIVE_INDEX_GREEN);
  const blue = peak(REFRACTIVE_INDEX_BLUE);
  const spreadPx = Math.abs(blue - red) / 2;
  return {
    scale: green,
    channelScales: spreadPx >= VISIBLE_DISPERSION_PX ? { r: red, g: green, b: blue } : null,
  };
}

/** Traces and encodes the displacement and specular maps for one glass surface. */
export async function bakeGlassBlobs(
  request: GlassBakeRequest,
  makeCanvas: (w: number, h: number) => CanvasLike
): Promise<GlassBakeResult> {
  const { width, height, radius, bezel, thickness, scale } = request;
  const maps = buildGlassMaps({ width, height, radius, bezel }, { thickness, ior: REFRACTIVE_INDEX_GREEN }, scale);
  const [displacement, specular] = await Promise.all([
    encode(maps.displacement, maps.width, maps.height, makeCanvas),
    encode(maps.specular, maps.width, maps.height, makeCanvas),
  ]);

  return { displacement, specular, ...displacementScales(bezel, thickness) };
}
