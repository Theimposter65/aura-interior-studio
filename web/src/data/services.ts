import { ServiceTier, QuizQuestion } from '../types';

export const serviceTiers: ServiceTier[] = [
  {
    id: 'tier-essential',
    name: 'Essential Room Design',
    tagline: 'Ideal for single rooms that need clear layout and styling direction.',
    price: 950,
    timeline: '7-10 Business Days',
    idealFor: 'Single rooms, living spaces, or bedrooms seeking a cohesive, curated look.',
    iconName: 'Compass',
    deliverables: [
      '2D floor plan with clear furniture layout and walkways',
      'Curated color palette with exact paint codes and fabric recommendations',
      'Direct shopping list with exclusive designer trade discounts',
      'One round of design revisions and 14 days of direct designer support'
    ]
  },
  {
    id: 'tier-comprehensive',
    name: 'Comprehensive 3D Planning',
    tagline: 'Our most popular full-room package with photorealistic 3D renderings.',
    price: 2400,
    badge: 'Most Popular',
    timeline: '2-3 Weeks',
    idealFor: 'Complete renovations, open-plan spaces, and anyone wanting to see 3D views before purchasing.',
    iconName: 'Layers',
    deliverables: [
      'Everything in the Essential Room Design package',
      'Four 3D room renderings showing daytime and evening lighting',
      'Practical lighting plan with fixture recommendations',
      'Custom cabinetry and built-in storage concept drawings',
      'Two 60-minute video design consultations with our lead designer'
    ]
  },
  {
    id: 'tier-architectural',
    name: 'Full Home Design & Sourcing',
    tagline: 'Turnkey interior design and sourcing from initial concept to completion.',
    price: 5200,
    badge: 'Signature',
    timeline: '4-6 Weeks + Project Support',
    idealFor: 'Whole-residence architectural projects, full home remodels, and custom builds.',
    iconName: 'Crown',
    deliverables: [
      'Everything in the Comprehensive 3D package across multiple rooms',
      'Ready-to-use construction plans for your contractors and trades',
      'Physical sample box with timber, stone, and fabric swatches sent to your door',
      'Purchasing management with trade discounts up to 30% passed to you',
      'Personal styling direction during final art and furniture setup'
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: 'What room would you like to design?',
    subtitle: 'Choose the primary focus of your project.',
    options: [
      {
        id: 'q1-living',
        label: 'Living & Dining Room',
        description: 'Main living room, lounge, or open dining area.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q1-bed',
        label: 'Bedroom Suite',
        description: 'Primary bedroom, guest bedroom, or walk-in dressing space.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q1-open',
        label: 'Open-Plan Living Area',
        description: 'Combined living, dining, and kitchen space.',
        tierScore: 'tier-comprehensive'
      },
      {
        id: 'q1-whole',
        label: 'Whole Home or Renovation',
        description: 'Multiple rooms, a whole apartment, or custom home build.',
        tierScore: 'tier-architectural'
      }
    ]
  },
  {
    id: 2,
    title: 'Which interior style fits you best?',
    subtitle: 'This guides the color palette, textures, and furniture selection.',
    options: [
      {
        id: 'q2-japandi',
        label: 'Japandi & Natural Warmth',
        description: 'Light oak wood, warm neutral tones, soft linen, and calm simplicity.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q2-warm-min',
        label: 'Warm Modern Minimalism',
        description: 'Clean lines, warm stone, concealed lighting, and uncluttered spaces.',
        tierScore: 'tier-comprehensive'
      },
      {
        id: 'q2-modern-classic',
        label: 'Modern Classic',
        description: 'Timeless wall mouldings paired with modern furniture and brass accents.',
        tierScore: 'tier-architectural'
      },
      {
        id: 'q2-earthy',
        label: 'Earthy & Textured',
        description: 'Rich woods, dark linen, textured walls, and statement artwork.',
        tierScore: 'tier-comprehensive'
      }
    ]
  },
  {
    id: 3,
    title: 'What type of design visualization do you need?',
    subtitle: 'Choose how you prefer to preview your new space.',
    options: [
      {
        id: 'q3-2d',
        label: '2D Floor Plans & Moodboards',
        description: 'Clear layout drawings, color palettes, and curated product shopping links.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q3-3d',
        label: 'Realistic 3D Room Renderings',
        description: 'See exactly how furniture, lighting, and art look in 3D before buying.',
        tierScore: 'tier-comprehensive'
      },
      {
        id: 'q3-full-specs',
        label: 'Complete Contractor Plans & Sourcing',
        description: 'Detailed drawings for builders plus end-to-end purchasing support.',
        tierScore: 'tier-architectural'
      }
    ]
  },
  {
    id: 4,
    title: 'What is your planned furniture & decor budget?',
    subtitle: 'Helps us recommend furniture and materials that match your budget.',
    options: [
      {
        id: 'q4-1',
        label: '$5,000 – $15,000',
        description: 'A balance of accessible design essentials and statement art pieces.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q4-2',
        label: '$15,000 – $50,000',
        description: 'High-quality designer furniture, custom joinery, and architectural lighting.',
        tierScore: 'tier-comprehensive'
      },
      {
        id: 'q4-3',
        label: '$50,000+',
        description: 'Custom-built furniture, premium natural stones, and fine art pieces.',
        tierScore: 'tier-architectural'
      }
    ]
  }
];
