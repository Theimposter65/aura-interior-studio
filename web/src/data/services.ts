import { ServiceTier, QuizQuestion } from '../types';

export const serviceTiers: ServiceTier[] = [
  {
    id: 'tier-essential',
    name: 'Essential Room Concept',
    tagline: 'Ideal for quick room transformations and clear styling direction.',
    price: 950,
    timeline: '7-10 Business Days',
    idealFor: 'Single rooms, living spaces, or bedrooms seeking fresh editorial direction.',
    iconName: 'Compass',
    deliverables: [
      'Comprehensive 2D Furniture Layout & Spatial Flow blueprint',
      'Curated Material, Textile & Color Scheme Palette (with actual paint codes)',
      'Clickable Shopping & Procurement Dossier with designer trade discounts',
      'One round of design revisions and 14 days of direct designer messaging'
    ]
  },
  {
    id: 'tier-comprehensive',
    name: 'Comprehensive 3D Spatial Planning',
    tagline: 'Our flagship full-room experience with photorealistic 3D rendering.',
    price: 2400,
    badge: 'Most Popular',
    timeline: '2-3 Weeks',
    idealFor: 'Complete renovations, open-plan spaces, and clients desiring visual certainty.',
    iconName: 'Layers',
    deliverables: [
      'Everything in the Essential Concept package',
      'Four 4K Photorealistic 3D Renderings showing daytime and night illumination',
      'Detailed Architectural Lighting Plan (recessed, decorative, and task kelvin specs)',
      'Custom Millwork / Built-in Cabinetry Concept drawings',
      'Two 60-minute interactive virtual design consultations with our Lead Architect'
    ]
  },
  {
    id: 'tier-architectural',
    name: 'Full Architectural Styling & Sourcing',
    tagline: 'White-glove turnkey spatial transformation from blueprint to installation.',
    price: 5200,
    badge: 'Atelier Signature',
    timeline: '4-6 Weeks + Project Oversight',
    idealFor: 'Whole-residence architectural projects, luxury villas, and executive penthouses.',
    iconName: 'Crown',
    deliverables: [
      'Everything in the Comprehensive 3D package across multi-room suites',
      'Full CAD Construction-Ready Drawing Sets for contractors and artisans',
      'Atelier Sample Chest with physical timber, stone, and fabric cuttings dispatched to your door',
      'Trade Procurement Management with up to 30% wholesale discounts passed directly to you',
      'On-site or virtual White-Glove Styling direction during final art & furniture installation'
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: 'What space are you looking to elevate?',
    subtitle: 'Select the primary focus of your upcoming spatial transformation.',
    options: [
      {
        id: 'q1-living',
        label: 'Main Living & Entertaining Area',
        description: 'Living room, open salon, dining pavilion, or great room.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q1-bed',
        label: 'Sanctuary Bedroom Suite',
        description: 'Primary bedroom, ensuite dressing area, or guest sanctuary.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q1-open',
        label: 'Full Open-Plan Renovation',
        description: 'Combined living, dining, and architectural kitchen footprint.',
        tierScore: 'tier-comprehensive'
      },
      {
        id: 'q1-whole',
        label: 'Whole Home or Luxury Residence',
        description: 'Multiple rooms, penthouse, villa, or custom new-build architectural layout.',
        tierScore: 'tier-architectural'
      }
    ]
  },
  {
    id: 2,
    title: 'Which aesthetic philosophy resonates most with you?',
    subtitle: 'This defines the palette, textures, and architectural silhouette of your project.',
    options: [
      {
        id: 'q2-japandi',
        label: 'Japandi & Organic Wabi-Sabi',
        description: 'Light European oak, tactile limewash, ceramics, and unhurried simplicity.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q2-warm-min',
        label: 'Warm Architectural Minimalism',
        description: 'Monolithic travertine, clean geometric lines, recessed lighting, and muted tones.',
        tierScore: 'tier-comprehensive'
      },
      {
        id: 'q2-modern-classic',
        label: 'European Classical Modernity',
        description: 'Haussmannian mouldings paired with contemporary Italian furniture and brass accents.',
        tierScore: 'tier-architectural'
      },
      {
        id: 'q2-earthy',
        label: 'Raw Tactile & Earthy Brutalism',
        description: 'Exposed concrete, charcoal linen, smoked walnut, and monumental statement art.',
        tierScore: 'tier-comprehensive'
      }
    ]
  },
  {
    id: 3,
    title: 'What level of visualization do you need to feel confident?',
    subtitle: 'Choose how you prefer to preview your future interior.',
    options: [
      {
        id: 'q3-2d',
        label: '2D Layouts & Curated Moodboards',
        description: 'I have good spatial imagination and just need clear floor plans and product links.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q3-3d',
        label: 'Photorealistic 4K 3D Renderings',
        description: 'I need to see exactly how materials, light, and furniture interact before ordering.',
        tierScore: 'tier-comprehensive'
      },
      {
        id: 'q3-full-specs',
        label: 'Full CAD Drawings + Trade Procurement',
        description: 'I need complete technical drawings for contractors and turnkey white-glove sourcing.',
        tierScore: 'tier-architectural'
      }
    ]
  },
  {
    id: 4,
    title: 'What is your anticipated total furnishings & renovation budget?',
    subtitle: 'Helps us calibrate procurement recommendations to your exact comfort zone.',
    options: [
      {
        id: 'q4-1',
        label: '$5,000 – $15,000',
        description: 'Curated blend of high-street design gems and statement wall art pieces.',
        tierScore: 'tier-essential'
      },
      {
        id: 'q4-2',
        label: '$15,000 – $50,000',
        description: 'Investment designer furniture, bespoke joinery, and architectural lighting.',
        tierScore: 'tier-comprehensive'
      },
      {
        id: 'q4-3',
        label: '$50,000+',
        description: 'Custom atelier craftsmanship, imported Italian marbles, and collector-tier art.',
        tierScore: 'tier-architectural'
      }
    ]
  }
];
