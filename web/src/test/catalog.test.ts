import { describe, it, expect } from 'vitest';
import { products } from '../data/products';

describe('Product Catalog Filtering & Search Algorithms', () => {
  it('filters accurately by category', () => {
    const wallDesigns = products.filter(p => p.category === 'wall-designs');
    expect(wallDesigns.length).toBeGreaterThanOrEqual(4);
    wallDesigns.forEach(p => expect(p.category).toBe('wall-designs'));

    const interiorPlans = products.filter(p => p.category === 'interior-plans');
    expect(interiorPlans.length).toBeGreaterThanOrEqual(2);
    interiorPlans.forEach(p => expect(p.category).toBe('interior-plans'));

    const conceptPackages = products.filter(p => p.category === 'concept-packages');
    expect(conceptPackages.length).toBeGreaterThanOrEqual(2);
    conceptPackages.forEach(p => expect(p.category).toBe('concept-packages'));
  });

  it('searches products reactively by title, tags, and description', () => {
    const searchFilter = (query: string) => {
      const q = query.toLowerCase();
      return products.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    };

    const limewashResults = searchFilter('Limewash');
    expect(limewashResults.length).toBeGreaterThanOrEqual(1);
    expect(limewashResults.some(p => p.title.includes('Limewash'))).toBe(true);

    const acousticResults = searchFilter('Acoustic');
    expect(acousticResults.length).toBeGreaterThanOrEqual(1);

    const nonExistent = searchFilter('NonExistentTermXYZ');
    expect(nonExistent.length).toBe(0);
  });

  it('sorts correctly by price ascending and descending', () => {
    const asc = [...products].sort((a, b) => a.price - b.price);
    for (let i = 0; i < asc.length - 1; i++) {
      expect(asc[i].price).toBeLessThanOrEqual(asc[i + 1].price);
    }

    const desc = [...products].sort((a, b) => b.price - a.price);
    for (let i = 0; i < desc.length - 1; i++) {
      expect(desc[i].price).toBeGreaterThanOrEqual(desc[i + 1].price);
    }
  });

  it('sorts correctly by collector rating', () => {
    const rated = [...products].sort((a, b) => b.rating - a.rating);
    for (let i = 0; i < rated.length - 1; i++) {
      expect(rated[i].rating).toBeGreaterThanOrEqual(rated[i + 1].rating);
    }
  });
});
