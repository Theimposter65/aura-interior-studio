import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { ProductGrid } from './components/catalog/ProductGrid';
import { PortfolioGallery } from './components/gallery/PortfolioGallery';
import { WallVisualizer } from './components/visualizer/WallVisualizer';
import { ServicesSection } from './components/planning/ServicesSection';
import { JournalSection } from './components/journal/JournalSection';
import { InstagramFeed } from './components/social/InstagramFeed';
import { InquirySection } from './components/planning/InquirySection';
import { StyleQuizModal } from './components/planning/StyleQuizModal';
import { BookingModal } from './components/planning/BookingModal';
import { ProductCategory, PortfolioItem } from './types';
import { testimonials } from './data/portfolioData';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Compass,
  Star,
  Layers,
  Award,
  ChevronRight,
  Palette,
  MessageCircle
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

  const handleInquiryFromGallery = (_item?: PortfolioItem) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsBookingOpen(true);
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
        {/* HERO SECTION: The Artistic Tales Client Presentation      */}
        {/* ========================================================= */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-studio-900 text-white">
          {/* Background Atmosphere Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
              alt="The Artistic Tales Space Styling"
              className="w-full h-full object-cover opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/40 to-studio-950/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-studio-950/30 to-studio-950/90" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-24 text-center space-y-8 animate-fadeIn">
            {/* Top Subtitle Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-studio-200 text-[10px] uppercase tracking-[0.25em]">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Interior Space Stylist • Goa & Gujarat</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.12] tracking-tight max-w-4xl mx-auto text-studio-50">
              Thoughtful interior styling, custom art, and murals that transform every space.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-studio-300 max-w-2xl mx-auto leading-relaxed font-light">
              Hand-painted on stretched Belgian linen & textured walls — art to collect, not just to decorate. Creating walls that remember for residences, cafes, and creative spaces.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#gallery"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-studio-100 text-studio-900 text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Explore Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-sm border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2"
              >
                <Compass className="w-3.5 h-3.5 text-studio-300" />
                <span>Our Services</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </a>
            </div>

            {/* Credibility Stats Bar */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-white/10 text-left">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">100% Hand-Painted</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Originals on Linen</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">Goa • Gujarat</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Worldwide Commissions</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">39+ Artworks</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Homes, Cafes & Hostels</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-light text-white">5.0 Rating</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Client Reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BRAND PILLARS: The Artistic Tales Principles              */}
        {/* ========================================================= */}
        <section id="philosophy" className="py-20 bg-white border-b border-studio-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
                The Atelier Craft
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-studio-900 font-normal">
                Crafted for Soulful Living Spaces
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-4">
                  <Palette className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Belgian Linen & Earth Pigments
                </h3>
                <p className="text-xs sm:text-sm text-studio-600 leading-relaxed font-light">
                  Bespoke canvas works layered with texture, raw earth pigments, gold leaf accents, and emotive color stories that age gracefully in natural light.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-4">
                  <Layers className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Floor-to-Ceiling Murals
                </h3>
                <p className="text-xs sm:text-sm text-studio-600 leading-relaxed font-light">
                  Transforming plain walls into breathtaking textured murals — botanical dreamscapes, heritage motifs, and organic linework that expand perceived room volume.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-4">
                  <Compass className="w-5 h-5 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Holistic Space Styling
                </h3>
                <p className="text-xs sm:text-sm text-studio-600 leading-relaxed font-light">
                  We collaborate one-on-one with homeowners and interior designers to curate color harmonies, art placement, and lighting details for cohesive comfort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FILTERABLE PORTFOLIO / GALLERY (Step 4 Requirement)       */}
        {/* ========================================================= */}
        <PortfolioGallery onOpenInquiry={handleInquiryFromGallery} />

        {/* ========================================================= */}
        {/* INTERACTIVE ROOM VISUALIZATION (Keep Built Features)      */}
        {/* ========================================================= */}
        <WallVisualizer />

        {/* ========================================================= */}
        {/* FEATURED COLLECTION & ARTWORK EDITIONS                    */}
        {/* ========================================================= */}
        <ProductGrid
          initialCategory={activeCatalogCategory}
        />

        {/* ========================================================= */}
        {/* INTERIOR STYLING SERVICES & PACKAGES                      */}
        {/* ========================================================= */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* ========================================================= */}
        {/* CLIENT TESTIMONIALS (Step 4 Requirement)                  */}
        {/* ========================================================= */}
        <section className="py-24 bg-white border-t border-studio-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
                Client Testimonials
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-studio-900 font-normal">
                Loved by Homeowners, Architects & Hosts
              </h2>
              <p className="text-xs sm:text-sm text-studio-600 font-light">
                Real reflections from patrons across India who trusted us with their private residences and hospitality spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map(item => (
                <div key={item.id} className="p-7 rounded bg-studio-50 border border-studio-200/80 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {item.highlight && (
                      <p className="text-xs font-semibold text-studio-900 italic">
                        "{item.highlight}"
                      </p>
                    )}
                    <p className="text-xs text-studio-700 leading-relaxed font-light">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-studio-200/60 text-xs">
                    <p className="font-semibold text-studio-900">{item.clientName}</p>
                    <p className="text-studio-500 text-[11px]">{item.roleOrLocation}</p>
                    <p className="text-studio-400 text-[10px] mt-0.5">{item.projectType}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recognition & Trust Strip */}
            <div className="mt-16 pt-10 border-t border-studio-200 flex flex-wrap items-center justify-around gap-6 text-studio-400 text-xs uppercase tracking-widest font-serif">
              <span>Goa Hospitality Guild</span>
              <span>•</span>
              <span>Architectural Digest Features</span>
              <span>•</span>
              <span>India Design ID Curation</span>
              <span>•</span>
              <span>Bespoke Residences Mumbai & Delhi</span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ATELIER JOURNAL / BLOG (Step 4 Requirement)               */}
        {/* ========================================================= */}
        <JournalSection />

        {/* ========================================================= */}
        {/* INSTAGRAM EMBED & FEED (Step 4 Requirement)               */}
        {/* ========================================================= */}
        <InstagramFeed />

        {/* ========================================================= */}
        {/* CONSULTATION INQUIRY BOOKING FORM (Step 4 Requirement)    */}
        {/* ========================================================= */}
        <InquirySection />
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
