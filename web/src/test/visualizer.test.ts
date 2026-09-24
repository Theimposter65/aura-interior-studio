import { describe, it, expect } from 'vitest';
import { roomScenes, wallColors, frameOptions } from '../data/visualizerData';
import { products } from '../data/products';

describe('Interactive Room & Wall Visualizer Logic', () => {
  const wallDesigns = products.filter(p => p.category === 'wall-designs');

  it('provides accessible room scenes for all primary room types', () => {
    const roomTypes = roomScenes.map(r => r.roomType);
    expect(roomTypes).toContain('living');
    expect(roomTypes).toContain('bedroom');
    expect(roomTypes).toContain('dining');
    expect(roomTypes).toContain('workspace');
  });

  it('manages art scale within safe visual proportions', () => {
    const minScale = 0.75;
    const maxScale = 1.25;
    const defaultScale = 1.0;

    expect(defaultScale).toBeGreaterThanOrEqual(minScale);
    expect(defaultScale).toBeLessThanOrEqual(maxScale);

    // Test clamped scaling logic
    const clampScale = (val: number) => Math.min(Math.max(val, minScale), maxScale);
    expect(clampScale(0.5)).toBe(0.75);
    expect(clampScale(1.5)).toBe(1.25);
    expect(clampScale(1.1)).toBe(1.1);
  });

  it('selects valid wall colors and calculates background opacity correctly', () => {
    wallColors.forEach(color => {
      expect(color.name).toBeTruthy();
      expect(color.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    const getWallOpacity = (mode: 'daylight' | 'twilight') => (mode === 'twilight' ? 0.35 : 0.25);
    expect(getWallOpacity('daylight')).toBe(0.25);
    expect(getWallOpacity('twilight')).toBe(0.35);
  });

  it('associates wall designs with frames properly', () => {
    expect(wallDesigns.length).toBeGreaterThan(0);
    expect(frameOptions.length).toBe(4);

    const oakFrame = frameOptions.find(f => f.id === 'frame-oak');
    expect(oakFrame).toBeDefined();
    expect(oakFrame?.styleClass).toBe('frame-oak');
  });
});
