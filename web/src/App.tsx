import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { ProductGrid } from './components/catalog/ProductGrid';
import { WallVisualizer } from './components/visualizer/WallVisualizer';
import { ServicesSection } from './components/planning/ServicesSection';
import { StyleQuizModal } from './components/planning/StyleQuizModal';
import { BookingModal } from './components/planning/BookingModal';
import { ProductCategory } from './types';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Compass,
  Star,
  Layers,
  Award,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTierForBooking, setSelectedTierForBooking] = useState<string | undefined>(undefined);
  const [activeCatalogCategory, setActiveCatalogCategory] = useState<ProductCategory | 'all'>('all');
  const [visualizerTargetArtId, setVisualizerTargetArtId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (tierId?: string) => {
    setSelectedTierForBooking(tierId);
    setIsBookingOpen(true);
  };

  const handleSelectTierFromQuiz = (tierId: string) => {
    setSelectedTierForBooking(tierId);
    setIsBookingOpen(true);
  };

  const handleOpenVisualizerWithArt = (artId: string) => {
    setVisualizerTargetArtId(artId);
    const element = document.getElementById('visualizer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-studio-50 text-studio-900 flex flex-col font-sans selection:bg-studio-300">
      {/* Navigation */}
      <Navbar
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSelectCategory={cat => {
          setActiveCatalogCategory(cat as ProductCategory);
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* HERO SECTION: Editorial Luxury Architectural Presentation */}
        {/* ========================================================= */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-studio-900 text-white">
          {/* Background Photography with Architectural Gradient */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
              alt="Architectural Interior Sanctuary"
              className="w-full h-full object-cover opacity-45 scale-105 animate-pulse duration-[10000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/40 to-studio-950/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-studio-950/30 to-studio-950/90" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24 text-center space-y-8 animate-fadeIn">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-studio-200">
              <span className="w-1.5 h-1.5 rounded-full bg-studio-300 animate-ping" />
              <span>Autumn/Winter Spatial Collections & Advisory</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight max-w-4xl mx-auto text-studio-50">
              Where spatial poetry meets tactile permanence.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-studio-300 max-w-2xl mx-auto leading-relaxed font-light">
              A bespoke digital atelier offering hand-rendered mineral wall murals, turnkey architectural 3D layout blueprints, and real-time room visualizer simulation.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#catalog"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-studio-100 text-studio-900 text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Acquire Designs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#visualizer"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-sm border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-studio-300" />
                <span>Simulate on Wall</span>
              </a>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-studio-300 hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all"
              >
                Style Finder Quiz →
              </button>
            </div>

            {/* Credibility Stats Bar */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-white/10 text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">100-Year</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Archival Pigments</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">4K CAD</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Spatial Blueprints</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">3 Ateliers</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Cph • NYC • Kyoto</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">4.9 / 5.0</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Architect Reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BRAND PILLARS: Material Integrity & Spatial Precision */}
        {/* ========================================================= */}
        <section id="philosophy" className="py-20 bg-white border-b border-studio-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-4">
                  <Shield className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Mineral Craftsmanship
                </h3>
                <p className="text-xs text-studio-600 leading-relaxed">
                  Every wall mural and artwork uses natural Roman limewash, organic sumi inks, and museum-certified 310gsm cotton rag. Never flat synthetic prints; always depth and natural breathability.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-4">
                  <Compass className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Architectural Rigor
                </h3>
                <p className="text-xs text-studio-600 leading-relaxed">
                  Our spatial planning blueprints adhere to millimeter-accurate circulation paths, circadian lighting Kelvin schedules, and turnkey contractor-ready joinery elevations.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-4">
                  <Sparkles className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Live Wall Visualizer
                </h3>
                <p className="text-xs text-studio-600 leading-relaxed">
                  Experience zero ambiguity. Test your selected art against curated wall paint pigments, solid oak and brass moulding profiles, and daytime versus evening lighting conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PRODUCT CATALOG: Wall Art & Architectural Packages */}
        {/* ========================================================= */}
        <ProductGrid
          initialCategory={activeCatalogCategory}
          onOpenVisualizer={handleOpenVisualizerWithArt}
        />

        {/* ========================================================= */}
        {/* INTERACTIVE ROOM & WALL VISUALIZER */}
        {/* ========================================================= */}
        <WallVisualizer initialProductId={visualizerTargetArtId} />

        {/* ========================================================= */}
        {/* INTERIOR PLANNING SERVICES & CONSULTATIONS */}
        {/* ========================================================= */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* ========================================================= */}
        {/* TESTIMONIALS & PRESS RECOGNITION */}
        {/* ========================================================= */}
        <section className="py-24 bg-white border-t border-studio-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
                Acclaimed Transformations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-studio-900 font-normal">
                Notes from Discerning Collectors & Architects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded bg-studio-50 border border-studio-200/80 space-y-4">
                <div className="flex text-studio-800">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-studio-600 text-studio-600" />
                  ))}
                </div>
                <p className="font-serif text-lg text-studio-900 leading-snug">
                  "The Limewash Strata Mural completely transformed our double-height living room. The way it reflects morning light is mesmerizing."
                </p>
                <div className="pt-2 border-t border-studio-200/60 text-xs">
                  <p className="font-semibold text-studio-800">Henrik & Sofia Lindqvist</p>
                  <p className="text-studio-500">Private Residence, Copenhagen</p>
                </div>
              </div>

              <div className="p-8 rounded bg-studio-50 border border-studio-200/80 space-y-4">
                <div className="flex text-studio-800">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-studio-600 text-studio-600" />
                  ))}
                </div>
                <p className="font-serif text-lg text-studio-900 leading-snug">
                  "AURA's 3D spatial planning package saved us months of indecision. The contractor executed the exact lighting details and custom millwork."
                </p>
                <div className="pt-2 border-t border-studio-200/60 text-xs">
                  <p className="font-semibold text-studio-800">Julian Vance-Moreau</p>
                  <p className="text-studio-500">Tribeca Loft Renovation, New York</p>
                </div>
              </div>

              <div className="p-8 rounded bg-studio-50 border border-studio-200/80 space-y-4">
                <div className="flex text-studio-800">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-studio-600 text-studio-600" />
                  ))}
                </div>
                <p className="font-serif text-lg text-studio-900 leading-snug">
                  "The Acoustic Architectural Triptych is that rare intersection of high art and genuine acoustic engineering. Our dining echo is completely gone."
                </p>
                <div className="pt-2 border-t border-studio-200/60 text-xs">
                  <p className="font-semibold text-studio-800">Dr. Aris Thorne</p>
                  <p className="text-studio-500">Villa Bellevue, Zurich</p>
                </div>
              </div>
            </div>

            {/* Press Logotypes */}
            <div className="mt-16 pt-12 border-t border-studio-200 flex flex-wrap items-center justify-around gap-8 opacity-60">
              <span className="font-serif text-lg tracking-widest uppercase">ARCHITECTURAL DIGEST</span>
              <span className="font-serif text-lg tracking-widest uppercase">ELLE DECOR</span>
              <span className="font-serif text-lg tracking-widest uppercase">WALLPAPER*</span>
              <span className="font-serif text-lg tracking-widest uppercase">KINFOLK</span>
            </div>
          </div>
        </section>
      </main>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer />

      {/* Modals */}
      <StyleQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectTier={handleSelectTierFromQuiz}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTierId={selectedTierForBooking}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
