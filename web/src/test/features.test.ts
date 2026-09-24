import { describe, it, expect } from 'vitest';
import { portfolioItems, testimonials, journalArticles, instagramPosts } from '../data/portfolioData';
import { JournalSection } from '../components/journal/JournalSection';
import { InstagramFeed } from '../components/social/InstagramFeed';
import { InquirySection } from '../components/planning/InquirySection';
import { ArtisticTalesLogo } from '../components/common/ArtisticTalesLogo';
import { HorizontalPortfolio } from '../components/portfolio/HorizontalPortfolio';
import { BeforeAfterSlider } from '../components/portfolio/BeforeAfterSlider';
import { PricingSection } from '../components/pricing/PricingSection';
import {
  statementItems,
  transformationItems,
  stylingPortfolioItems,
  pricingCategories,
  PRICING_FOOTNOTE
} from '../data/newPortfolioData';

describe('The Artistic Tales Feature Suite', () => {
  it('exports complete 39-item client portfolio with required properties', () => {
    expect(portfolioItems.length).toBe(39);
    
    const categories = new Set(portfolioItems.map(p => p.category));
    expect(categories.has('HOMES')).toBe(true);
    expect(categories.has('STUDIOS')).toBe(true);
    expect(categories.has('OFFICES')).toBe(true);
    expect(categories.has('RESTAURANTS')).toBe(true);
    expect(categories.has('CAFÉS')).toBe(true);
    expect(categories.has('BARS')).toBe(true);
    expect(categories.has('MURALS')).toBe(true);

    portfolioItems.forEach(item => {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.imageUrl).toMatch(/^https?:\/\//);
      expect(item.description).toBeTruthy();
      expect(item.location).toBeTruthy();
    });
  });

  it('exports statement collection items across all 5 official categories and taglines', () => {
    expect(statementItems.length).toBe(31);
    const statementCats = new Set(statementItems.map(s => s.category));
    expect(statementCats.has('disco')).toBe(true);
    expect(statementCats.has('bar')).toBe(true);
    expect(statementCats.has('mirror')).toBe(true);
    expect(statementCats.has('light')).toBe(true);
    expect(statementCats.has('wall')).toBe(true);

    const disco = statementItems.find(s => s.category === 'disco');
    expect(disco?.tagline).toBe('Made to catch the light & attention');

    const bar = statementItems.find(s => s.category === 'bar');
    expect(bar?.tagline).toBe('Made to turn the bars into a vibe');

    const mirror = statementItems.find(s => s.category === 'mirror');
    expect(mirror?.tagline).toBe("Your space's new selfie corner");

    const light = statementItems.find(s => s.category === 'light');
    expect(light?.tagline).toBe('For spaces that deserve their own spotlight');

    const wall = statementItems.find(s => s.category === 'wall');
    expect(wall?.tagline).toBe('Walls into little more personality');
  });

  it('exports 18 complete Before & After transformation projects', () => {
    expect(transformationItems.length).toBe(18);
    transformationItems.forEach(item => {
      expect(item.id).toBeTruthy();
      expect(item.beforeImageUrl).toBeTruthy();
      expect(item.afterImageUrl).toBeTruthy();
      expect(item.projectNumber).toBeGreaterThanOrEqual(1);
      expect(item.projectNumber).toBeLessThanOrEqual(18);
    });
  });

  it('verifies pricing categories and exact rates with footnote', () => {
    expect(pricingCategories.length).toBe(5);
    const doodling = pricingCategories.find(c => c.id === 'doodling');
    expect(doodling?.items[0].rate).toContain('₹350 / sq ft');
    expect(doodling?.items[1].rate).toContain('₹550 / sq ft');

    const murals = pricingCategories.find(c => c.id === 'murals');
    expect(murals?.items[0].rate).toContain('₹550 / sq ft');
    expect(murals?.items[1].rate).toContain('₹850 / sq ft');

    const paintings = pricingCategories.find(c => c.id === 'paintings');
    expect(paintings?.items[0].rate).toContain('Canvas: ₹4,500');
    expect(paintings?.items[0].subtext).toContain('Print Edition: ₹3,000');
    expect(paintings?.items[1].rate).toContain('Canvas: ₹14,500');
    expect(paintings?.items[1].subtext).toContain('Print Edition: ₹7,000');
    expect(paintings?.items[2].rate).toContain('Canvas: ₹29,500');
    expect(paintings?.items[2].subtext).toContain('Print Edition: ₹12,000');

    const interior = pricingCategories.find(c => c.id === 'interior-design');
    expect(interior?.items[0].rate).toContain('₹12,000');
    expect(interior?.items[1].rate).toContain('₹17,000');

    const statements = pricingCategories.find(c => c.id === 'statement-pieces');
    expect(statements?.items[0].rate).toContain('₹5,000 – ₹20,000');

    expect(PRICING_FOOTNOTE).toBe('All prices excluding material and frame charges.');
  });

  it('exports testimonials covering residences, hospitality, and architecture', () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(4);
    testimonials.forEach(t => {
      expect(t.clientName).toBeTruthy();
      expect(t.roleOrLocation).toBeTruthy();
      expect(t.projectType).toBeTruthy();
      expect(t.rating).toBe(5);
      expect(t.quote).toBeTruthy();
    });
  });

  it('exports curated journal articles on spatial styling and craft', () => {
    expect(journalArticles.length).toBe(4);
    journalArticles.forEach(a => {
      expect(a.title).toBeTruthy();
      expect(a.excerpt).toBeTruthy();
      expect(a.category).toBeTruthy();
      expect(a.date).toBeTruthy();
      expect(a.image).toMatch(/^https?:\/\//);
    });
  });

  it('exports Instagram feed items with valid post links to @the_artistic_tales_', () => {
    expect(instagramPosts.length).toBe(6);
    instagramPosts.forEach(post => {
      expect(post.link).toBe('https://instagram.com/the_artistic_tales_');
      expect(post.imageUrl).toMatch(/^https?:\/\//);
      expect(post.caption).toBeTruthy();
      expect(post.likes).toBeGreaterThan(0);
    });
  });

  it('verifies all feature components are valid React component functions', () => {
    expect(typeof HorizontalPortfolio).toBe('function');
    expect(typeof BeforeAfterSlider).toBe('function');
    expect(typeof PricingSection).toBe('function');
    expect(typeof JournalSection).toBe('function');
    expect(typeof InstagramFeed).toBe('function');
    expect(typeof InquirySection).toBe('function');
    expect(typeof ArtisticTalesLogo).toBe('function');
  });
});
