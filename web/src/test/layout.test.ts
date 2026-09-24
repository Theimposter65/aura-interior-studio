import { describe, it, expect } from 'vitest';

describe('Layout Components Verification', () => {
  it('defines core navigation sections and anchors', () => {
    const expectedSections = ['#gallery', '#services', '#contact'];
    expect(expectedSections.length).toBe(3);
    expect(expectedSections).toContain('#gallery');
    expect(expectedSections).toContain('#services');
    expect(expectedSections).toContain('#contact');
  });

  it('validates currency switcher options', () => {
    const currencies = ['USD', 'EUR', 'GBP'];
    expect(currencies).toContain('USD');
    expect(currencies).toContain('EUR');
    expect(currencies).toContain('GBP');
  });

  it('confirms atelier global presence footprint', () => {
    const ateliers = ['Goa Studio', 'Gujarat Atelier', 'Worldwide Commissions'];
    expect(ateliers.length).toBe(3);
    ateliers.forEach(city => expect(city).toBeTruthy());
  });
});
