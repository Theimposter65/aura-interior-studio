import { describe, it, expect } from 'vitest';
import { isSoftwareRenderer } from '../utils/renderCapability';

describe('isSoftwareRenderer', () => {
  it('flags CPU rasterisers', () => {
    for (const name of [
      'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)',
      'llvmpipe (LLVM 15.0.7, 256 bits)',
      'softpipe',
      'ANGLE (Microsoft, Microsoft Basic Render Driver Direct3D11 vs_5_0 ps_5_0)',
      'Google SwiftShader',
    ]) {
      expect(isSoftwareRenderer(name)).toBe(true);
    }
  });

  it('accepts real GPUs', () => {
    for (const name of [
      'ANGLE (Apple, ANGLE Metal Renderer: Apple M2, Unspecified Version)',
      'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)',
      'ANGLE (Intel, Mesa Intel(R) UHD Graphics 620 (KBL GT2), OpenGL 4.6)',
      'Adreno (TM) 740',
      'Mali-G78',
    ]) {
      expect(isSoftwareRenderer(name)).toBe(false);
    }
  });
});
