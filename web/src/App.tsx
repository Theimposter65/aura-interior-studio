import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { ProductGrid } from './components/catalog/ProductGrid';
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

  const handleOpenBooking = (tierId?: string) => {
    setSelectedTierForBooking(tierId);
    setIsBookingOpen(true);
  };

  const handleSelectTierFromQuiz = (tierId: string) => {
    setSelectedTierForBooking(tierId);
    setIsBookingOpen(true);
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
        {/* HERO SECTION: Clear, Professional Modern Presentation     */}
        {/* ========================================================= */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-studio-900 text-white">
          {/* Background Photography */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
              alt="Modern Interior Design"
              className="w-full h-full object-cover opacity-45 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/40 to-studio-950/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-studio-950/30 to-studio-950/90" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24 text-center space-y-8 animate-fadeIn">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.12] tracking-tight max-w-4xl mx-auto text-studio-50">
              Timeless wall art and interior design made simple.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-studio-300 max-w-2xl mx-auto leading-relaxed font-light">
              We design museum-quality wall art and practical room packages that bring warmth, balance, and quiet elegance to modern homes.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#catalog"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-studio-100 text-studio-900 text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-sm border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2"
              >
                <Compass className="w-3.5 h-3.5 text-studio-300" />
                <span>Design Services</span>
              </a>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-studio-300 hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all"
              >
                Take Style Quiz →
              </button>
            </div>

            {/* Credibility Stats Bar */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-white/10 text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">100-Year</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Quality Guarantee</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">Turnkey</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Plans & 3D Renderings</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">3 Studios</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Cph • NYC • Kyoto</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">4.9 / 5.0</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Client Reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BRAND PILLARS: Simple, Professional Values                */}
        {/* ========================================================= */}
        <section id="philosophy" className="py-20 bg-white border-b border-studio-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
                Our Principles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-studio-900 font-normal">
                Crafted for Everyday Living
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-4">
                  <Shield className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Natural Materials
                </h3>
                <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
                  Every print and wall mural is crafted with natural mineral pigments, archival cotton paper, and solid oak frames for rich texture and lasting durability.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-4">
                  <Compass className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Practical Room Plans
                </h3>
                <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
                  Our interior packages include accurate layouts, realistic lighting guides, and clear blueprints your contractor can execute with ease.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-4">
                  <Sparkles className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Personalized Guidance
                </h3>
                <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
                  Work one-on-one with our experienced interior team to select the perfect art dimensions, room palettes, and custom finishes for your home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PRODUCT CATALOG: Wall Art & Interior Packages             */}
        {/* ========================================================= */}
        <ProductGrid
          initialCategory={activeCatalogCategory}
        />

        {/* ========================================================= */}
        {/* INTERIOR PLANNING SERVICES & PACKAGES                     */}
        {/* ========================================================= */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* ========================================================= */}
        {/* TESTIMONIALS & PRESS RECOGNITION                          */}
        {/* ========================================================= */}
        <section className="py-24 bg-white border-t border-studio-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
                Client Reviews
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-studio-900 font-normal">
                Loved by Homeowners and Designers
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
                  "The Limewash Strata Mural completely transformed our living room. The texture and way it catches morning light is stunning."
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
                  "AURA's 3D room planning saved us weeks of second-guessing. Our contractor executed the exact layout and lighting details smoothly."
                </p>
                <div className="pt-2 border-t border-studio-200/60 text-xs">
                  <p className="font-semibold text-studio-800">Julian Vance-Moreau</p>
                  <p className="text-studio-500">Loft Renovation, New York</p>
                </div>
              </div>

              <div className="p-8 rounded bg-studio-50 border border-studio-200/80 space-y-4">
                <div className="flex text-studio-800">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-studio-600 text-studio-600" />
                  ))}
                </div>
                <p className="font-serif text-lg text-studio-900 leading-snug">
                  "The Acoustic Art Triptych solved our echo issues while looking like a museum centerpiece. It's both functional and beautiful."
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
