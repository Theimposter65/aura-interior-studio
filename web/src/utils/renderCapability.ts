/**
 * Renderers that rasterise on the CPU. Under these the compositor has no GPU, and anything that
 * re-filters a moving backdrop every frame (live refraction) halves the scroll frame rate.
 */
const SOFTWARE_RENDERERS = /swiftshader|llvmpipe|softpipe|software|basic render driver|mesa offscreen/i;

export function isSoftwareRenderer(rendererName: string): boolean {
  return SOFTWARE_RENDERERS.test(rendererName);
}

let cached: boolean | undefined;

/**
 * Whether the browser is rendering with real GPU acceleration. `failIfMajorPerformanceCaveat`
 * is the standard signal, but Chromium still grants contexts on its SwiftShader fallback, so the
 * unmasked renderer name is checked as well.
 */
export function hasGpuAcceleration(): boolean {
  if (cached !== undefined) return cached;
  cached = false;
  if (typeof document === 'undefined') return cached;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true });
    if (!gl) return cached;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    cached = !isSoftwareRenderer(renderer);
    // Release the probe context — browsers cap live WebGL contexts per page.
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    cached = false;
  }
  return cached;
}
