export type ProductCategory = 'wall-designs' | 'interior-plans' | 'concept-packages';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  roomContextImage: string;
  dimensions: string[];
  frames: string[];
  description: string;
  features: string[];
  tags: string[];
  architecturalDetails?: {
    material: string;
    finish: string;
    origin: string;
    leadTime: string;
  };
}

export interface CartItem {
  id: string; // unique cart entry ID combining product id + options
  product: Product;
  quantity: number;
  selectedDimension?: string;
  selectedFrame?: string;
}

export interface WallColor {
  id: string;
  name: string;
  hex: string;
  description: string;
}

export interface FrameOption {
  id: string;
  name: string;
  styleClass: string;
  finishColor: string;
  material: string;
}

export interface RoomScene {
  id: string;
  name: string;
  roomType: 'living' | 'bedroom' | 'dining' | 'workspace';
  backgroundUrl: string;
  lightingStyle: string;
  artPlacement: {
    top: string;
    left: string;
    maxWidth: string;
    aspectRatio: string;
  };
}

export interface VisualizerState {
  roomId: string;
  wallColorId: string;
  selectedProductId: string;
  frameOptionId: string;
  artScale: number; // 0.8 to 1.3
}

export interface ServiceTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  timeline: string;
  deliverables: string[];
  idealFor: string;
  iconName: string;
}

export interface QuizOption {
  id: string;
  label: string;
  description: string;
  image?: string;
  tierScore: string; // references service tier id
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: QuizOption[];
}

export interface ConsultationBooking {
  fullName: string;
  email: string;
  phone: string;
  spaceType: string;
  tierId: string;
  preferredDate: string;
  budgetRange: string;
  notes: string;
}
