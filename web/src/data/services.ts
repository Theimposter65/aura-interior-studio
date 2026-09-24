import { ServiceTier, QuizQuestion } from '../types';

export const serviceTiers: ServiceTier[] = [
  {
    id: 'tier-essential',
    name: 'Custom Canvas Artwork',
    tagline: 'Hand-painted originals on Belgian linen — art to collect, not just to decorate.',
    price: 950,
    timeline: '7-14 Business Days',
    idealFor: 'Residences, private collections, and executive suites seeking an authentic focal anchor piece.',
    iconName: 'Compass',
    deliverables: [
      'Personal moodboard & narrative curation session',
      'Custom color harmony mapping tailored to your interior lighting',
      'Hand-stretched Belgian linen & archival oil/acrylic pigments with gold leaf accents',
      'Certificate of Authenticity and custom framing options included'
    ]
  },
  {
    id: 'tier-comprehensive',
    name: 'Architectural Wall Murals',
    tagline: 'Floor-to-ceiling narratives painted directly onto your interior or exterior walls.',
    price: 2400,
    badge: 'Most Popular',
    timeline: '2-3 Weeks',
    idealFor: 'Living pavilions, dining focal walls, boutique hotels, cafes, and creative studios.',
    iconName: 'Layers',
    deliverables: [
      'On-site wall surface assessment & architectural lighting audit',
      'Digital scale mockup rendered directly onto your room photos',
      'Hand-painted execution using low-VOC, durable mural paints and layered glazes',
      'Protective matte sealant for longevity, UV resistance & effortless maintenance'
    ]
  },
  {
    id: 'tier-architectural',
    name: 'Artistic Interiors & Spatial Curation',
    tagline: 'Holistic spatial transformation — murals, doodles, and crafted décor across entire spaces.',
    price: 5200,
    badge: 'Signature',
    timeline: '3-5 Weeks + On-Site Execution',
    idealFor: 'Full home transformations, hospitality venues, hostel lounges, and commercial flagships.',
    iconName: 'Crown',
    deliverables: [
      'Comprehensive spatial flow and interior design styling collaboration',
      'Multi-surface integration across walls, ceilings, pillars, and bespoke millwork',
      'Artistic gold-foil leafing, textured glazes, and freehand line doodles',
      'Final spatial styling walkthrough, artwork placement, and ambient lighting setup'
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
