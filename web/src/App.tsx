import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { HorizontalPortfolio } from './components/portfolio/HorizontalPortfolio';
import { BeforeAfterSlider } from './components/portfolio/BeforeAfterSlider';
import { PricingSection } from './components/pricing/PricingSection';
import { JournalSection } from './components/journal/JournalSection';
import { InstagramFeed } from './components/social/InstagramFeed';
import { InquirySection } from './components/planning/InquirySection';
import { StyleQuizModal } from './components/planning/StyleQuizModal';
import { BookingModal } from './components/planning/BookingModal';
import { ArtisticTalesLogo } from './components/common/ArtisticTalesLogo';
import { testimonials } from './data/portfolioData';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Star,
  Layers,
  Palette,
  MessageCircle,
  Eye
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTierForBooking, setSelectedTierForBooking] = useState<string | undefined>(undefined);

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
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* HERO SECTION: The Artistic Tales Client Presentation      */}
        {/* ========================================================= */}
        <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden bg-studio-900 text-white">
          {/* Background Atmosphere Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
              alt="The Artistic Tales Space Styling"
              className="w-full h-full object-cover opacity-35 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/40 to-studio-950/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-studio-950/30 to-studio-950/90" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-16 sm:py-20 text-center space-y-6 animate-fadeIn">
            {/* Official Centerpiece Emblem */}
            <div className="flex justify-center -mb-2">
              <ArtisticTalesLogo size="lg" showTagline={true} />
            </div>

            {/* Top Subtitle Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-studio-200 text-[10px] uppercase tracking-[0.25em]">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Interior Space Stylist • Goa & Gujarat</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.15] tracking-tight max-w-4xl mx-auto text-studio-50">
              Thoughtful interior styling, custom art, and murals that transform every space.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-studio-300 max-w-2xl mx-auto leading-relaxed font-light">
              Hand-painted on stretched Belgian linen & textured walls — creating walls that remember for residences, cafes, and holiday villas.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#portfolio"
                className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-studio-950 text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#transformations"
                className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-sm border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2"
              >
                <Eye className="w-3.5 h-3.5 text-studio-300" />
                <span>Before & Afters</span>
              </a>

              <a
                href="#pricing"
                className="w-full sm:w-auto px-7 py-3.5 bg-studio-800 hover:bg-studio-700 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Pricing Matrix</span>
              </a>
            </div>

            {/* Credibility Stats Bar */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-white/10 text-left">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-light text-white">100% Hand-Painted</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Originals on Linen</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-light text-white">Goa • Gujarat</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Worldwide Commissions</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-light text-white">120+ Works</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Villas, Cafes & Murals</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-light text-white">5.0 ★ Rating</p>
                <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-0.5">Verified Client Reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BRAND PILLARS: The Atelier Craft                          */}
        {/* ========================================================= */}
        <section id="philosophy" className="py-14 sm:py-16 bg-white border-b border-studio-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
                The Atelier Craft
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-studio-900 font-normal">
                Crafted for Soulful Living Spaces
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-3">
                  <Palette className="w-4 h-4 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-xl text-studio-900 font-normal">
                  Belgian Linen & Earth Pigments
                </h3>
                <p className="text-xs text-studio-600 leading-relaxed font-light">
                  Bespoke canvas works layered with texture, raw earth pigments, gold leaf accents, and emotive color stories that age gracefully.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-3">
                  <Layers className="w-4 h-4 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-xl text-studio-900 font-normal">
                  Floor-to-Ceiling Murals
                </h3>
                <p className="text-xs text-studio-600 leading-relaxed font-light">
                  Transforming plain walls into textured murals — botanical dreamscapes, heritage motifs, and organic linework that expand perceived volume.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-9 h-9 rounded-full bg-studio-100 flex items-center justify-center text-studio-800 mb-3">
                  <Compass className="w-4 h-4 stroke-[1.6]" />
                </div>
                <h3 className="font-serif text-xl text-studio-900 font-normal">
                  Holistic Space Styling
                </h3>
                <p className="text-xs text-studio-600 leading-relaxed font-light">
                  We collaborate one-on-one with homeowners and architects to curate color harmonies, art placement, and lighting details for cohesive comfort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* HORIZONTAL SWIPEABLE PORTFOLIO                            */}
        {/* ========================================================= */}
        <HorizontalPortfolio />

        {/* ========================================================= */}
        {/* BEFORE & AFTER ROOM TRANSFORMATIONS (18 Projects)         */}
        {/* ========================================================= */}
        <BeforeAfterSlider />

        {/* ========================================================= */}
        {/* DEDICATED ATELIER PRICING SECTION                         */}
        {/* ========================================================= */}
        <PricingSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* ========================================================= */}
        {/* CLIENT TESTIMONIALS                                       */}
        {/* ========================================================= */}
        <section id="testimonials" className="py-20 bg-white border-b border-studio-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
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
                <div key={item.id} className="p-6 rounded bg-studio-50 border border-studio-200/80 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
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
            <div className="mt-12 pt-8 border-t border-studio-200 flex flex-wrap items-center justify-around gap-4 text-studio-400 text-xs uppercase tracking-widest font-serif">
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
        {/* ATELIER JOURNAL / BLOG                                    */}
        {/* ========================================================= */}
        <JournalSection />

        {/* ========================================================= */}
        {/* INSTAGRAM EMBED & FEED                                    */}
        {/* ========================================================= */}
        <InstagramFeed />

        {/* ========================================================= */}
        {/* CONSULTATION INQUIRY BOOKING FORM                         */}
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
