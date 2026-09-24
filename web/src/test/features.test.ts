import { describe, it, expect } from 'vitest';
import { portfolioItems, testimonials, journalArticles, instagramPosts } from '../data/portfolioData';
import { PortfolioGallery } from '../components/gallery/PortfolioGallery';
import { JournalSection } from '../components/journal/JournalSection';
import { InstagramFeed } from '../components/social/InstagramFeed';
import { InquirySection } from '../components/planning/InquirySection';
import { WallVisualizer } from '../components/visualizer/WallVisualizer';
import { ArtisticTalesLogo } from '../components/common/ArtisticTalesLogo';

describe('The Artistic Tales Feature Suite (Step 4 Verification)', () => {
  it('exports complete 39-item client portfolio with required properties', () => {
    expect(portfolioItems.length).toBe(39);
    
    // Check categories
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
    expect(typeof PortfolioGallery).toBe('function');
    expect(typeof WallVisualizer).toBe('function');
    expect(typeof JournalSection).toBe('function');
    expect(typeof InstagramFeed).toBe('function');
    expect(typeof InquirySection).toBe('function');
    expect(typeof ArtisticTalesLogo).toBe('function');
  });
});
