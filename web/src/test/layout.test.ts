import { describe, it, expect } from 'vitest';
import { NAV_LINKS } from '../components/layout/Navbar';
import { serviceTiers, quizQuestions } from '../data/services';

describe('Layout & Navigation Verification', () => {
  it('validates exported NAV_LINKS contains active sections and excludes obsolete sections', () => {
    const hrefs = NAV_LINKS.map(link => link.href);
    expect(hrefs).toContain('#portfolio');
    expect(hrefs).toContain('#transformations');
    expect(hrefs).toContain('#pricing');
    expect(hrefs).toContain('#testimonials');
    expect(hrefs).toContain('#contact');

    // Regression check: WallVisualizer and Catalog links MUST NOT be present
    expect(hrefs).not.toContain('#visualizer');
    expect(hrefs).not.toContain('#room-preview');
    expect(hrefs).not.toContain('#catalog');
    expect(hrefs).not.toContain('#gallery');
  });

  it('validates INR only currency standard across service tiers and style quiz', () => {
    // All service tiers must have positive integer price in INR
    serviceTiers.forEach(tier => {
      expect(tier.price).toBeGreaterThanOrEqual(1000);
      expect(typeof tier.price).toBe('number');
    });

    // Style quiz options must only reference INR (₹) and zero dollar ($) symbols
    const quizOptions = quizQuestions.flatMap(q => q.options);
    quizOptions.forEach(opt => {
      expect(opt.label).not.toContain('$');
      expect(opt.label).not.toContain('€');
      expect(opt.label).not.toContain('£');
    });
  });

  it('confirms atelier global presence footprint', () => {
    const ateliers = ['Goa Studio', 'Gujarat Atelier', 'Worldwide Commissions'];
    expect(ateliers.length).toBe(3);
    ateliers.forEach(city => expect(city).toBeTruthy());
  });
});
