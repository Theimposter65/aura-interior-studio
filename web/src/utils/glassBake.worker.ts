/// <reference lib="webworker" />
import { bakeGlassBlobs, type GlassBakeRequest } from './glassBakeCore';

/**
 * Traces Liquid Glass maps off the main thread. The per-pixel optics and PNG encoding take tens
 * of milliseconds per surface — run on the main thread they stall scrolling and first paint.
 */
self.onmessage = async (event: MessageEvent<{ id: number; request: GlassBakeRequest }>) => {
  const { id, request } = event.data;
  try {
    const result = await bakeGlassBlobs(request, (w, h) => new OffscreenCanvas(w, h));
    (self as unknown as DedicatedWorkerGlobalScope).postMessage({ id, result });
  } catch (error) {
    (self as unknown as DedicatedWorkerGlobalScope).postMessage({ id, error: String(error) });
  }
};
