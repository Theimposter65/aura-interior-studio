import { describe, it, expect, vi, beforeEach } from 'vitest';
import { displacementScales, VISIBLE_DISPERSION_PX } from '../utils/glassBakeCore';
import { refractionProfile } from '../utils/liquidGlassMap';

vi.mock('../utils/glassBakeCore', async importOriginal => {
  const actual = await importOriginal<typeof import('../utils/glassBakeCore')>();
  return {
    ...actual,
    bakeGlassBlobs: vi.fn(async () => ({
      displacement: new Blob(['d']),
      specular: new Blob(['s']),
      scale: 10,
      channelScales: null,
    })),
  };
});

const request = { width: 120, height: 40, radius: 20, bezel: 16, thickness: 22, scale: 2 };

describe('displacementScales', () => {
  it('uses a single pass when physical dispersion is sub-pixel (every surface on the site)', () => {
    for (const [bezel, thickness] of [[16, 22], [22, 40], [30, 56], [22, 34]]) {
      const { scale, channelScales } = displacementScales(bezel, thickness);
      expect(channelScales).toBeNull();
      expect(scale).toBeCloseTo(2 * refractionProfile(bezel, { thickness }).max, 6);
    }
  });

  it('keeps per-channel passes once red and blue separate visibly', () => {
    const { channelScales } = displacementScales(40, 400);
    expect(channelScales).not.toBeNull();
    expect(Math.abs(channelScales!.b - channelScales!.r) / 2).toBeGreaterThanOrEqual(VISIBLE_DISPERSION_PX);
    expect(channelScales!.b).toBeGreaterThan(channelScales!.r);
  });
});

describe('acquireGlass', () => {
  beforeEach(() => {
    vi.resetModules();
    let n = 0;
    vi.stubGlobal('URL', { ...URL, createObjectURL: vi.fn(() => `blob:${n++}`), revokeObjectURL: vi.fn() });
  });

  it('shares one bake between identical surfaces', async () => {
    const { acquireGlass } = await import('../utils/glassBaker');
    const { bakeGlassBlobs } = await import('../utils/glassBakeCore');
    vi.mocked(bakeGlassBlobs).mockClear();

    const a = acquireGlass(request);
    const b = acquireGlass({ ...request });
    expect(b.promise).toBe(a.promise);
    const baked = await a.promise;
    expect(bakeGlassBlobs).toHaveBeenCalledTimes(1);
    expect(baked.key).toBe('120x40:20:16:22@2');
    expect(baked.displacementUrl).toMatch(/^blob:/);
  });

  it('bakes distinct geometry separately', async () => {
    const { acquireGlass } = await import('../utils/glassBaker');
    const { bakeGlassBlobs } = await import('../utils/glassBakeCore');
    vi.mocked(bakeGlassBlobs).mockClear();

    await acquireGlass(request).promise;
    await acquireGlass({ ...request, width: 121 }).promise;
    expect(bakeGlassBlobs).toHaveBeenCalledTimes(2);
  });

  it('only evicts idle maps, and release is idempotent', async () => {
    const { acquireGlass } = await import('../utils/glassBaker');
    const held = acquireGlass({ ...request, width: 1 });
    await held.promise;
    const idle = Array.from({ length: 60 }, (_, i) => acquireGlass({ ...request, width: 200 + i }));
    await Promise.all(idle.map(h => h.promise));
    idle.forEach(h => {
      h.release();
      h.release();
    });

    // The held surface survives eviction and is still shared, not re-baked.
    const { bakeGlassBlobs } = await import('../utils/glassBakeCore');
    vi.mocked(bakeGlassBlobs).mockClear();
    expect(acquireGlass({ ...request, width: 1 }).promise).toBe(held.promise);
    expect(URL.revokeObjectURL).toHaveBeenCalled();
    expect(bakeGlassBlobs).not.toHaveBeenCalled();
  });
});
