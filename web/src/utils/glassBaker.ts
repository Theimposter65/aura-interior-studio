import { bakeGlassBlobs, type GlassBakeRequest, type GlassBakeResult } from './glassBakeCore';

export interface BakedGlass {
  key: string;
  displacementUrl: string;
  specularUrl: string;
  channelScales: GlassBakeResult['channelScales'];
  scale: number;
}

interface Entry {
  promise: Promise<BakedGlass>;
  baked?: BakedGlass;
  refs: number;
}

/** Surfaces not currently on screen keep their maps until the cache outgrows this. */
const IDLE_LIMIT = 48;
const cache = new Map<string, Entry>();

let worker: Worker | null | undefined;
let nextId = 0;
const inFlight = new Map<number, { resolve: (r: GlassBakeResult) => void; reject: (e: Error) => void }>();

function getWorker(): Worker | null {
  if (worker !== undefined) return worker;
  try {
    worker =
      typeof Worker !== 'undefined' && typeof OffscreenCanvas !== 'undefined'
        ? new Worker(new URL('./glassBake.worker.ts', import.meta.url), { type: 'module' })
        : null;
  } catch {
    worker = null;
  }
  if (worker) {
    worker.onmessage = (event: MessageEvent<{ id: number; result?: GlassBakeResult; error?: string }>) => {
      const job = inFlight.get(event.data.id);
      if (!job) return;
      inFlight.delete(event.data.id);
      if (event.data.result) job.resolve(event.data.result);
      else job.reject(new Error(event.data.error ?? 'Glass bake failed'));
    };
    worker.onerror = () => {
      // Worker could not start (e.g. blocked by CSP): fail pending jobs and bake on the main thread from now on.
      inFlight.forEach(job => job.reject(new Error('Glass worker unavailable')));
      inFlight.clear();
      worker?.terminate();
      worker = null;
    };
  }
  return worker;
}

function bake(request: GlassBakeRequest): Promise<GlassBakeResult> {
  const w = getWorker();
  if (!w) {
    return bakeGlassBlobs(request, (width, height) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      return canvas;
    });
  }
  return new Promise((resolve, reject) => {
    const id = nextId++;
    inFlight.set(id, { resolve, reject });
    w.postMessage({ id, request });
  });
}

function evictIdle() {
  for (const [key, entry] of cache) {
    if (cache.size <= IDLE_LIMIT) return;
    if (entry.refs === 0 && entry.baked) {
      URL.revokeObjectURL(entry.baked.displacementUrl);
      URL.revokeObjectURL(entry.baked.specularUrl);
      cache.delete(key);
    }
  }
}

export function glassKey(r: GlassBakeRequest): string {
  return `${r.width}x${r.height}:${r.radius}:${r.bezel}:${r.thickness}@${r.scale}`;
}

/**
 * Borrow the maps for a surface. Identical surfaces (e.g. every card's button) share one bake.
 * Call `release` when the surface no longer needs them so idle maps can be evicted.
 */
export function acquireGlass(request: GlassBakeRequest): { promise: Promise<BakedGlass>; release: () => void } {
  const key = glassKey(request);
  let entry = cache.get(key);
  if (!entry) {
    const created: Entry = {
      refs: 0,
      promise: bake(request).then(result => {
        const baked: BakedGlass = {
          key,
          displacementUrl: URL.createObjectURL(result.displacement),
          specularUrl: URL.createObjectURL(result.specular),
          channelScales: result.channelScales,
          scale: result.scale,
        };
        created.baked = baked;
        return baked;
      }),
    };
    // A failed bake must not poison the cache — the next request retries.
    created.promise.catch(() => cache.delete(key));
    cache.set(key, created);
    entry = created;
  }
  entry.refs++;
  const held = entry;
  let released = false;
  return {
    promise: held.promise,
    release: () => {
      if (released) return;
      released = true;
      held.refs--;
      evictIdle();
    },
  };
}
