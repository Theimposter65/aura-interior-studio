import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'wall-01',
    title: 'Limewash Strata Mural',
    subtitle: 'Textured Mineral Pigment Wall Treatment',
    category: 'wall-designs',
    price: 340,
    rating: 4.9,
    reviewsCount: 48,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    roomContextImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    dimensions: ['120x80 cm', '160x100 cm', '200x140 cm', 'Bespoke Mural Scale'],
    frames: ['Natural White Oak', 'Matte Architectural Noir', 'Brushed Champagne Brass', 'Frameless Gallery Wrap'],
    description: 'A hand-rendered textural study captured with organic Roman limewash pigments. Its warm mineral gradations reflect changing ambient light throughout the day, creating meditative spatial depth in contemporary living spaces.',
    features: [
      'Museum-grade 310gsm archival cotton rag',
      'UV-resistant pigment inks guaranteed for 100+ years',
      'Custom handcrafted solid timber frame options',
      'Accompanied by Certificate of Authenticity signed by the artist'
    ],
    tags: ['Mineral', 'Limewash', 'Warm Neutral', 'Large Format'],
    architecturalDetails: {
      material: 'Raw pigment emulsion & heavy weave canvas',
      finish: 'Matte textural glaze with tactile micro-relief',
      origin: 'Atelier Copenhagen & Kyoto Studio',
      leadTime: '7-10 business days handcrafted to order'
    }
  },
  {
    id: 'wall-02',
    title: 'Acoustic Architectural Triptych',
    subtitle: 'Felted Bas-Relief Sound Dampening Art',
    category: 'wall-designs',
    price: 580,
    rating: 5.0,
    reviewsCount: 32,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    roomContextImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    dimensions: ['Three 60x120 cm Panels', 'Three 80x160 cm Panels'],
    frames: ['Blackened Ash', 'Bleached Walnut', 'Float Frame Brass'],
    description: 'Where acoustic science converges with sculptural minimalism. Engineered with recycled PET felt and European linen in structural three-dimensional relief, dampening room reverberation while commanding architectural presence.',
    features: [
      'NRC 0.85 certified sound absorption rating',
      'Modular 3-piece composition with precision split margins',
      'Hidden French cleat hanging mechanism for flush wall mount',
      'Fire-rated Class A interior acoustic felt'
    ],
    tags: ['Acoustic', 'Sculptural', 'Triptych', 'Minimalist'],
    architecturalDetails: {
      material: 'High-density acoustic fiber & linen wrap',
      finish: 'Matte architectural relief',
      origin: 'Studio Stockholm',
      leadTime: '12 business days custom production'
    }
  },
  {
    id: 'wall-03',
    title: 'Terra & Ochre Geometric Form',
    subtitle: 'Brutalist Color Field Archival Print',
    category: 'wall-designs',
    price: 280,
    rating: 4.8,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    roomContextImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    dimensions: ['70x100 cm', '100x140 cm', '120x160 cm'],
    frames: ['Natural White Oak', 'Matte Architectural Noir', 'Deep Charcoal'],
    description: 'An exploration of proportion, negative space, and earthy warmth. Heavy ochre and raw terracotta pigments interact in deliberate geometric tension, grounding dining and gallery walls with quiet elegance.',
    features: [
      'Individually numbered limited edition of 150',
      'Ultra-matte finish eliminating gallery glare',
      'FSC-certified sustainable hardwood framing',
      'Anti-reflective UV museum glass included'
    ],
    tags: ['Ochre', 'Terracotta', 'Geometric', 'Earth'],
    architecturalDetails: {
      material: 'German etching 310gsm archival paper',
      finish: 'Fine velvet tooth matte',
      origin: 'Atelier Berlin',
      leadTime: '5-7 business days'
    }
  },
  {
    id: 'wall-04',
    title: 'Sumi Noir Kinetic Wave',
    subtitle: 'Contemporary Japanese Ink Mural Concept',
    category: 'wall-designs',
    price: 420,
    rating: 4.9,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    roomContextImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    dimensions: ['100x140 cm', '140x200 cm', 'Continuous Wall Covering'],
    frames: ['Matte Architectural Noir', 'Natural White Oak', 'Brushed Champagne Brass'],
    description: 'A monumentally expressive wave rendered using historic Kyoto sumi ink techniques scaled for contemporary residential interiors. Creates dynamic vertical momentum while maintaining Zen balance.',
    features: [
      'Giclée printed with 12 pigment inks',
      'Available as framed statement print or seamless wallpaper roll',
      'Eco-solvent non-toxic water-based formulation',
      'Zero-VOC indoor air quality certification'
    ],
    tags: ['Sumi Ink', 'Monochrome', 'Zen', 'Statement'],
    architecturalDetails: {
      material: 'Heavyweight textured grasscloth or cotton paper',
      finish: 'Satin matte non-reflective',
      origin: 'Kyoto / Paris Atelier',
      leadTime: '8 business days'
    }
  },
  {
    id: 'plan-01',
    title: 'Japandi Sanctuary Living Plan',
    subtitle: 'Turnkey 3D Spatial Layout & Sourcing Blueprint',
    category: 'interior-plans',
    price: 750,
    rating: 5.0,
    reviewsCount: 56,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    roomContextImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    dimensions: ['Up to 50 sqm (550 sqft)', 'Up to 90 sqm (970 sqft)'],
    frames: ['Digital CAD + High-Res 3D PDF Pack', 'Physical Luxe Linen Binder + Swatches (+ $150)'],
    description: 'A meticulously documented architectural interior masterplan merging Scandinavian functionality with Japanese wabi-sabi principles. Includes exact furniture scale blueprints, 4K photorealistic 3D renders, paint codes, and clickable manufacturer procurement lists.',
    features: [
      'Complete dimensioned 2D furniture & circulation floor plan',
      'Five 4K photorealistic 3D daytime and twilight perspectives',
      'Full material schedule (timber species, textiles, metals, limewash paint codes)',
      'Direct trade discounts (15-25% off) with curated international design houses',
      'Architectural lighting plan with kelvin and lumen specifications'
    ],
    tags: ['Japandi', 'Living Room', '3D Renderings', 'Floor Plan'],
    architecturalDetails: {
      material: 'CAD vector plans & 4K photorealistic renders',
      finish: 'Print-ready A3 architectural dossier + DWG files',
      origin: 'AURA Senior Spatial Planning Team',
      leadTime: 'Instant Digital Download + 10-day Customization Window'
    }
  },
  {
    id: 'plan-02',
    title: 'Minimalist Penthouse Suite Blueprint',
    subtitle: 'Master Bedroom & Walk-In Wardrobe Spatial Scheme',
    category: 'interior-plans',
    price: 890,
    rating: 4.9,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    roomContextImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    dimensions: ['Up to 60 sqm (650 sqft)', 'Whole Master Wing'],
    frames: ['Digital Dossier', 'Architectural Boxed Set (+ $180)'],
    description: 'An executive bedroom retreat engineered for sensory calm and tactile luxury. Features recessed circadian lighting details, integrated bespoke millwork drawings, acoustic headwall detailing, and natural stone accent specifications.',
    features: [
      'Complete millwork fabrication drawings for custom closets and bed plinth',
      'Acoustic wall paneling specification and elevation sections',
      'Curated luxury bedding and textile procurement schedule',
      'Electrical socket and dimming scene configuration schematics',
      'One 45-minute virtual video walkthrough with lead architect'
    ],
    tags: ['Penthouse', 'Bedroom', 'Millwork', 'Lighting'],
    architecturalDetails: {
      material: 'Architectural elevations & construction-ready joinery plans',
      finish: 'BIM / CAD export + PDF guide',
      origin: 'AURA Architectural Group',
      leadTime: 'Instant Download'
    }
  },
  {
    id: 'pkg-01',
    title: 'Warm Minimalist Materiality Box',
    subtitle: 'Curated Architectural Swatches & Finish Palette',
    category: 'concept-packages',
    price: 195,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    roomContextImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    dimensions: ['Studio Curator Box (35 Samples)', 'Master Architect Chest (70 Samples)'],
    frames: ['Handcrafted Linen Keepsake Box'],
    description: 'Stop guessing paint chips and online swatches. Experience the authentic weight and tactile interaction of real European oak, travertine, bouclé textiles, patinated brass, and mineral limewashes in your own home light.',
    features: [
      '12 real limewash and Roman clay paint sample cards',
      '8 solid hardwood samples (White Oak, Smoked Walnut, Bleached Ash)',
      '6 natural stone and quartz tiles (Travertine, Calacatta, Fluted Limestone)',
      '8 upholstery and drapery cuttings (Belgian linen, wool bouclé, velvet)',
      'Exclusive trade catalog directory and color combination lookup guide'
    ],
    tags: ['Materials', 'Swatches', 'Tactile', 'Sample Box'],
    architecturalDetails: {
      material: 'Authentic stone, timber, textile, and mineral paint samples',
      finish: 'Linen-wrapped architectural presentation box',
      origin: 'Curated by AURA Atelier',
      leadTime: 'Dispatches within 48 hours'
    }
  },
  {
    id: 'pkg-02',
    title: 'Architectural Lighting & Spatial System',
    subtitle: 'Circadian Illumination Strategy & Fixture Guide',
    category: 'concept-packages',
    price: 320,
    rating: 5.0,
    reviewsCount: 27,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    roomContextImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    dimensions: ['Residential Master Protocol'],
    frames: ['Digital Interactive Lighting Plan'],
    description: 'Lighting is the invisible architecture of luxury. This master scheme provides 3-tier layering strategies (ambient, task, accent), kelvin temperature pairing protocols (from morning 4000K to twilight 2200K), and curated iconic fixture recommendations.',
    features: [
      'Circadian lighting temperature schedule and automation guide',
      'Recessed cove and architectural track placement formulas',
      'Curated fixture schedule featuring Flos, Bocci, and custom atelier pendants',
      'Lux level calculation templates for dining, art display, and lounging'
    ],
    tags: ['Lighting', 'Circadian', 'Ambience', 'Technical'],
    architecturalDetails: {
      material: 'Lighting layout vectors & luminaire specification sheets',
      finish: 'Vector PDF + Trade discount pass',
      origin: 'AURA Lighting Lab',
      leadTime: 'Instant Access'
    }
  }
];
