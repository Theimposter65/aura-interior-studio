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
import { LiquidGlassFilter } from './components/glass/LiquidGlassFilter';
import { LiquidBackground } from './components/glass/LiquidBackground';
import { LiquidGlassCard } from './components/glass/LiquidGlassCard';
import { LiquidGlassPill } from './components/glass/LiquidGlassPill';
import { testimonials } from './data/portfolioData';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Star,
  Layers,
  Palette,
  Eye
} from 'lucide-react';

export const AppContent: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTierForBooking, setSelectedTierForBooking] = useState<string | undefined>(undefined);

  const handleSelectTierFromQuiz = (tierId: string) => {
    setSelectedTierForBooking(tierId);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-studio-50 text-studio-900 flex flex-col font-sans selection:bg-amber-200 antialiased overflow-x-hidden">
      {/* Optical Physical Refraction Filter Defs */}
      <LiquidGlassFilter />

      {/* Floating Ambient Light Physics Layer */}
      <LiquidBackground />

      {/* Floating Apple Liquid Glass Dynamic Island Navigation */}
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />

      <main className="flex-1 relative z-10">
        {/* ========================================================= */}
        {/* HERO SECTION: Apple Liquid Glass & Optical Typography    */}
        {/* ========================================================= */}
        <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-studio-950 text-white">
          {/* Background Atmosphere Image with Refractive Dimming */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
              alt="The Artistic Tales Space Styling"
              className="w-full h-full object-cover opacity-25 scale-105 filter"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/60 to-studio-950/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-studio-950/90" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-16 sm:py-24 text-center space-y-7 animate-fadeIn">
            {/* Centerpiece Emblem with Glass Aura */}
            <div className="flex justify-center -mb-2">
              <ArtisticTalesLogo size="lg" showTagline={true} />
            </div>

            {/* Top Subtitle Badge (Liquid Glass Pill) */}
            <div className="flex justify-center">
              <LiquidGlassPill
                variant="dark"
                size="md"
                icon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                className="uppercase tracking-[0.25em] text-[10px]"
              >
                Interior Space Stylist • Goa & Gujarat
              </LiquidGlassPill>
            </div>

            {/* Apple Optical Typography: Negative Tracking & Tight Leading */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-[-0.025em] max-w-4xl mx-auto text-white">
              Thoughtful interior styling, custom art, and murals that transform every space.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-studio-300 max-w-2xl mx-auto leading-relaxed font-light subhead-refined">
              Hand-painted on stretched Belgian linen & textured walls — creating spaces that remember for residences, cafes, and holiday villas.
            </p>

            {/* Action Buttons with 1:1 Instant Pointer Feedback */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="#portfolio"
                className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-studio-950 text-xs uppercase tracking-[0.2em] font-semibold rounded-full shadow-[0_10px_25px_-5px_rgba(245,158,11,0.4)] apple-press flex items-center justify-center space-x-2 border border-amber-300/80"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#transformations"
                className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.2em] font-medium rounded-full border border-white/25 backdrop-blur-xl apple-press transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 text-studio-300" />
                <span>Before & Afters</span>
              </a>

              <a
                href="#pricing"
                className="w-full sm:w-auto px-7 py-3.5 bg-white/5 hover:bg-white/15 text-studio-200 hover:text-white text-xs uppercase tracking-[0.2em] font-medium rounded-full border border-white/15 backdrop-blur-lg apple-press transition-all flex items-center justify-center space-x-2"
              >
                <span>Pricing Matrix</span>
              </a>
            </div>

            {/* Credibility Stats (Liquid Glass Panel) */}
            <div className="pt-8 max-w-3xl mx-auto">
              <LiquidGlassCard variant="dark" maxTilt={3} className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                  <div className="border-l border-white/15 pl-4">
                    <p className="font-serif text-xl sm:text-2xl font-light text-white">100% Hand-Painted</p>
                    <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-1">Originals on Linen</p>
                  </div>
                  <div className="border-l border-white/15 pl-4">
                    <p className="font-serif text-xl sm:text-2xl font-light text-white">Goa • Gujarat</p>
                    <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-1">Worldwide Commissions</p>
                  </div>
                  <div className="border-l border-white/15 pl-4">
                    <p className="font-serif text-xl sm:text-2xl font-light text-white">120+ Works</p>
                    <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-1">Villas, Cafes & Murals</p>
                  </div>
                  <div className="border-l border-white/15 pl-4">
                    <p className="font-serif text-xl sm:text-2xl font-light text-white">5.0 ★ Rating</p>
                    <p className="text-[10px] uppercase tracking-wider text-studio-400 mt-1">Verified Client Reviews</p>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BRAND PILLARS: Liquid Crystal Atelier Craft               */}
        {/* ========================================================= */}
        <section id="philosophy" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
                The Atelier Craft
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-studio-900 font-normal tracking-tight">
                Crafted for Soulful Living Spaces
              </h2>
              <p className="text-xs sm:text-sm text-studio-600 font-light">
                Every surface is an invitation to pause. We combine fine art with interior architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <LiquidGlassCard variant="light" maxTilt={8} className="p-8 space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-white/70 border border-white/80 shadow-sm flex items-center justify-center text-studio-900">
                  <Palette className="w-5 h-5 stroke-[1.6] text-amber-600" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Belgian Linen & Earth Pigments
                </h3>
                <p className="text-xs sm:text-sm text-studio-600 leading-relaxed font-light">
                  Bespoke canvas works layered with texture, raw earth pigments, gold leaf accents, and emotive color stories that age gracefully.
                </p>
              </LiquidGlassCard>

              <LiquidGlassCard variant="light" maxTilt={8} className="p-8 space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-white/70 border border-white/80 shadow-sm flex items-center justify-center text-studio-900">
                  <Layers className="w-5 h-5 stroke-[1.6] text-amber-600" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Floor-to-Ceiling Murals
                </h3>
                <p className="text-xs sm:text-sm text-studio-600 leading-relaxed font-light">
                  Transforming plain walls into textured murals — botanical dreamscapes, heritage motifs, and organic linework that expand perceived volume.
                </p>
              </LiquidGlassCard>

              <LiquidGlassCard variant="light" maxTilt={8} className="p-8 space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-white/70 border border-white/80 shadow-sm flex items-center justify-center text-studio-900">
                  <Compass className="w-5 h-5 stroke-[1.6] text-amber-600" />
                </div>
                <h3 className="font-serif text-2xl text-studio-900 font-normal">
                  Holistic Space Styling
                </h3>
                <p className="text-xs sm:text-sm text-studio-600 leading-relaxed font-light">
                  We collaborate one-on-one with homeowners and architects to curate color harmonies, art placement, and lighting details for cohesive comfort.
                </p>
              </LiquidGlassCard>
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
        {/* CLIENT TESTIMONIALS (Liquid Glass Review Matrix)          */}
        {/* ========================================================= */}
        <section id="testimonials" className="py-24 relative border-t border-white/40">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
                Client Testimonials
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-studio-900 font-normal tracking-tight">
                Loved by Homeowners, Architects & Hosts
              </h2>
              <p className="text-xs sm:text-sm text-studio-600 font-light">
                Real reflections from patrons across India who trusted us with their private residences and hospitality spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map(item => (
                <LiquidGlassCard key={item.id} variant="light" maxTilt={5} className="p-6 flex flex-col justify-between space-y-4">
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

                  <div className="pt-4 border-t border-studio-200/50 text-xs">
                    <p className="font-semibold text-studio-900">{item.clientName}</p>
                    <p className="text-studio-500 text-[11px]">{item.roleOrLocation}</p>
                    <p className="text-studio-400 text-[10px] mt-0.5">{item.projectType}</p>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>

            {/* Recognition & Trust Strip */}
            <div className="mt-14 pt-8 border-t border-studio-200/60 flex flex-wrap items-center justify-around gap-4 text-studio-500 text-xs uppercase tracking-widest font-serif">
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
