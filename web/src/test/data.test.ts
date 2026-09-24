import { describe, it, expect } from 'vitest';
import { products } from '../data/products';
import { roomScenes, wallColors, frameOptions } from '../data/visualizerData';
import { serviceTiers, quizQuestions } from '../data/services';

describe('Data Integrity & Curated Models', () => {
  it('exports valid catalog products with all required fields', () => {
    expect(products.length).toBeGreaterThanOrEqual(6);
    
    // Check categories represented
    const categories = new Set(products.map(p => p.category));
    expect(categories.has('wall-designs')).toBe(true);
    expect(categories.has('interior-plans')).toBe(true);
    expect(categories.has('concept-packages')).toBe(true);

    products.forEach(p => {
      expect(p.id).toBeDefined();
      expect(p.title).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.rating).toBeGreaterThanOrEqual(4.0);
      expect(p.image).toContain('http');
      expect(p.dimensions?.length).toBeGreaterThan(0);
    });
  });

  it('exports room scenes with valid placement coordinates', () => {
    expect(roomScenes.length).toBe(4);
    roomScenes.forEach(r => {
      expect(r.id).toBeTruthy();
      expect(r.backgroundUrl).toContain('http');
      expect(r.artPlacement.top).toContain('%');
      expect(r.artPlacement.left).toContain('%');
    });
  });

  it('exports wall colors with valid hex codes', () => {
    expect(wallColors.length).toBeGreaterThanOrEqual(6);
    wallColors.forEach(c => {
      expect(c.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('exports frame options with styling classes', () => {
    expect(frameOptions.length).toBe(4);
    frameOptions.forEach(f => {
      expect(f.styleClass).toContain('frame-');
      expect(f.material).toBeTruthy();
    });
  });

  it('exports 3 service tiers with deliverables and timelines', () => {
    expect(serviceTiers.length).toBe(3);
    expect(serviceTiers.map(s => s.id)).toEqual(['tier-essential', 'tier-comprehensive', 'tier-architectural']);
    serviceTiers.forEach(s => {
      expect(s.price).toBeGreaterThan(500);
      expect(s.deliverables.length).toBeGreaterThan(2);
      expect(s.timeline).toBeTruthy();
    });
  });

  it('exports a 4-step interactive quiz with scoring tags', () => {
    expect(quizQuestions.length).toBe(4);
    quizQuestions.forEach(q => {
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      q.options.forEach(opt => {
        expect(opt.tierScore).toMatch(/^tier-(essential|comprehensive|architectural)$/);
      });
    });
  });
});
