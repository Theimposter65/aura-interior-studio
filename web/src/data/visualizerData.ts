import { RoomScene, WallColor, FrameOption } from '../types';

export const roomScenes: RoomScene[] = [
  {
    id: 'room-living',
    name: 'Curated Living Pavilion',
    roomType: 'living',
    backgroundUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    lightingStyle: 'Natural morning diffused south light',
    artPlacement: {
      top: '22%',
      left: '36%',
      maxWidth: '38%',
      aspectRatio: '4/3'
    }
  },
  {
    id: 'room-dining',
    name: 'Japandi Dining Atelier',
    roomType: 'dining',
    backgroundUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80',
    lightingStyle: 'Low-slung warm pendant illumination',
    artPlacement: {
      top: '18%',
      left: '34%',
      maxWidth: '35%',
      aspectRatio: '3/4'
    }
  },
  {
    id: 'room-bedroom',
    name: 'Sanctuary Master Suite',
    roomType: 'bedroom',
    backgroundUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
    lightingStyle: 'Soft cove lighting and linen filtered daylight',
    artPlacement: {
      top: '16%',
      left: '33%',
      maxWidth: '36%',
      aspectRatio: '16/9'
    }
  },
  {
    id: 'room-workspace',
    name: 'Architectural Executive Studio',
    roomType: 'workspace',
    backgroundUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
    lightingStyle: 'Crisp task lighting & northern exposure',
    artPlacement: {
      top: '20%',
      left: '38%',
      maxWidth: '32%',
      aspectRatio: '1/1'
    }
  }
];

export const wallColors: WallColor[] = [
  {
    id: 'color-alabaster',
    name: 'Alabaster Mineral',
    hex: '#F7F4EE',
    description: 'A soft chalky white with gentle warm undertones that elevates subtle artwork.'
  },
  {
    id: 'color-greige',
    name: 'Warm Limewash Greige',
    hex: '#D7CDC1',
    description: 'An earthy stone grey reflecting European townhouse elegance.'
  },
  {
    id: 'color-sage',
    name: 'Muted Nordic Sage',
    hex: '#B8C4B8',
    description: 'A tranquil botanical tint inspired by Scandinavian pine forests.'
  },
  {
    id: 'color-terracotta',
    name: 'Dusk Terracotta',
    hex: '#C4917B',
    description: 'A rich sun-baked clay tone that creates intimate warmth and drama.'
  },
  {
    id: 'color-charcoal',
    name: 'Mineral Roman Charcoal',
    hex: '#3D3C3A',
    description: 'Deep architectural soot providing immense gallery contrast.'
  },
  {
    id: 'color-linen',
    name: 'Raw Oat Linen',
    hex: '#EFE7DA',
    description: 'Textural tactile beige pairing effortlessly with natural timber.'
  }
];

export const frameOptions: FrameOption[] = [
  {
    id: 'frame-oak',
    name: 'Natural White Oak',
    styleClass: 'frame-oak',
    finishColor: '#C8A17D',
    material: 'Solid American White Oak with matte beeswax finish'
  },
  {
    id: 'frame-black',
    name: 'Matte Noir Metal',
    styleClass: 'frame-black',
    finishColor: '#1A1A1A',
    material: 'Anodized architectural aluminum profile'
  },
  {
    id: 'frame-brass',
    name: 'Champagne Brass',
    styleClass: 'frame-brass',
    finishColor: '#C5A059',
    material: 'Hand-patinated solid brushed brass moulding'
  },
  {
    id: 'frame-acrylic',
    name: 'Gallery Float Acrylic',
    styleClass: 'frame-acrylic',
    finishColor: 'rgba(255, 255, 255, 0.85)',
    material: 'Museum-grade optical float glass with polished bevel edge'
  }
];
