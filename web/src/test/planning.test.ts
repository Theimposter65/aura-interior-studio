import { describe, it, expect } from 'vitest';
import { serviceTiers, quizQuestions } from '../data/services';

describe('Spatial Planning & Style Quiz Validation', () => {
  it('correctly maps quiz answers to recommended service tiers', () => {
    // Helper function mirroring StyleQuizModal recommendation algorithm
    const calculateRecommendedTier = (answers: Record<number, string>) => {
      const scoreMap: Record<string, number> = {
        'tier-essential': 0,
        'tier-comprehensive': 0,
        'tier-architectural': 0
      };

      quizQuestions.forEach(q => {
        const chosenOptionId = answers[q.id];
        const opt = q.options.find(o => o.id === chosenOptionId);
        if (opt && opt.tierScore) {
          scoreMap[opt.tierScore] = (scoreMap[opt.tierScore] || 0) + 1;
        }
      });

      let topTierId = 'tier-comprehensive';
      let maxScore = -1;

      Object.entries(scoreMap).forEach(([tierId, score]) => {
        if (score > maxScore) {
          maxScore = score;
          topTierId = tierId;
        }
      });

      return serviceTiers.find(t => t.id === topTierId);
    };

    // Scenario A: Client looking for single room + 2D moodboard + smaller budget -> Essential
    const essentialAnswers = {
      1: 'q1-living',
      2: 'q2-japandi',
      3: 'q3-2d',
      4: 'q4-1'
    };
    const resultA = calculateRecommendedTier(essentialAnswers);
    expect(resultA?.id).toBe('tier-essential');

    // Scenario B: Whole Home + European Classic + CAD Drawings + $50k+ -> Architectural
    const architecturalAnswers = {
      1: 'q1-whole',
      2: 'q2-modern-classic',
      3: 'q3-full-specs',
      4: 'q4-3'
    };
    const resultB = calculateRecommendedTier(architecturalAnswers);
    expect(resultB?.id).toBe('tier-architectural');
  });

  it('validates consultation booking form requirements', () => {
    const validateBooking = (data: {
      fullName: string;
      email: string;
      phone: string;
      preferredDate: string;
    }) => {
      const errors: Record<string, string> = {};
      if (!data.fullName.trim()) errors.fullName = 'Full Name is required';
      if (!data.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid email';
      }
      if (!data.phone.trim()) errors.phone = 'Phone is required';
      if (!data.preferredDate) errors.preferredDate = 'Date is required';

      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    };

    // Test missing fields
    const invalidSubmission = validateBooking({
      fullName: '',
      email: 'invalid-email',
      phone: '',
      preferredDate: ''
    });
    expect(invalidSubmission.isValid).toBe(false);
    expect(invalidSubmission.errors.fullName).toBeDefined();
    expect(invalidSubmission.errors.email).toBe('Invalid email');
    expect(invalidSubmission.errors.phone).toBeDefined();
    expect(invalidSubmission.errors.preferredDate).toBeDefined();

    // Test valid submission
    const validSubmission = validateBooking({
      fullName: 'Marcus Aurelius',
      email: 'marcus@atelier.com',
      phone: '+1 555 123 4567',
      preferredDate: '2026-10-15'
    });
    expect(validSubmission.isValid).toBe(true);
    expect(Object.keys(validSubmission.errors).length).toBe(0);
  });
});
