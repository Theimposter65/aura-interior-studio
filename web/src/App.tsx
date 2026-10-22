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
import { LiquidGlass } from './components/glass/LiquidGlass';
import { testimonials } from './data/portfolioData';
import { ChevronRight, Compass, Star, Layers, Palette } from 'lucide-react';

const HERO_STATS = [
  { value: '100%', label: 'Hand-painted originals on linen' },
  { value: '120+', label: 'Villas, cafés and murals' },
  { value: 'Goa · Gujarat', label: 'Worldwide commissions' },
  { value: '5.0', label: 'Verified client rating', star: true },
];

const PILLARS = [
  {
    icon: Palette,
    title: 'Belgian linen & earth pigments.',
    body: 'Bespoke canvas works layered with texture, raw earth pigments, gold leaf accents and emotive colour stories that age gracefully.',
  },
  {
    icon: Layers,
    title: 'Floor-to-ceiling murals.',
    body: 'Plain walls become textured murals — botanical dreamscapes, heritage motifs and organic linework that expand the feel of a room.',
  },
  {
    icon: Compass,
    title: 'Holistic space styling.',
    body: 'One-on-one with homeowners and architects to curate colour harmonies, art placement and lighting for cohesive comfort.',
  },
];

const RECOGNITION = [
  'Goa Hospitality Guild',
  'Architectural Digest features',
  'India Design ID curation',
  'Bespoke residences, Mumbai & Delhi',
];

export const AppContent: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTierForBooking, setSelectedTierForBooking] = useState<string | undefined>(undefined);

  const handleSelectTierFromQuiz = (tierId: string) => {
    setSelectedTierForBooking(tierId);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white text-studio-900 flex flex-col overflow-x-clip">
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />

      <main className="flex-1 relative">
        {/* ── Hero ── full-bleed photograph; glass floats over it ── */}
        <section
          data-nav-theme="dark"
          className="relative min-h-[calc(100svh-2.75rem)] flex flex-col justify-end overflow-hidden bg-studio-950 text-white"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
            alt="A styled living space by The Artistic Tales"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_55%,rgba(0,0,0,0.55),rgba(0,0,0,0.2))]" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" aria-hidden="true" />

          <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 pt-32 pb-6 sm:pb-8 text-center">
            <p className="type-eyebrow text-white/80 animate-fadeIn">The Artistic Tales</p>
            <h1 className="type-hero mt-3 animate-fadeIn">Walls that remember.</h1>
            <p className="type-subhead mt-5 max-w-2xl mx-auto text-white/85">
              Thoughtful interior styling, custom art and murals — hand-painted on Belgian linen and textured walls
              for residences, cafés and holiday villas.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
              <a href="#portfolio" className="btn btn-primary">View the portfolio</a>
              <a href="#transformations" className="inline-flex items-center gap-0.5 text-[17px] text-white hover:underline underline-offset-4">
                See the transformations <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <LiquidGlass
              tone="dark"
              radius={28}
              bezel={30}
              thickness={56}
              blur={1}
              className="mt-14 sm:mt-20 mx-auto max-w-4xl px-2 py-5 sm:py-6"
            >
              <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-5">
                {HERO_STATS.map(stat => (
                  <div key={stat.label} className="px-4 text-center md:border-l md:first:border-l-0 border-white/15">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] flex items-center justify-center gap-1">
                      {stat.value}
                      {stat.star && <Star className="w-5 h-5 fill-star text-star" aria-hidden="true" />}
                    </dd>
                    <dd className="type-footnote text-white/70 mt-1">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </LiquidGlass>
          </div>
        </section>

        {/* ── Philosophy ── */}
        <section id="philosophy" className="bg-studio-50 py-24 sm:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <header className="max-w-3xl">
              <p className="type-eyebrow text-studio-600">The atelier craft</p>
              <h2 className="type-headline mt-2">Crafted for soulful living spaces.</h2>
              <p className="type-subhead text-studio-600 mt-4">
                Every surface is an invitation to pause. We bring fine art and interior architecture together.
              </p>
            </header>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
              {PILLARS.map(({ icon: Icon, title, body }) => (
                <article key={title} className="tile tile-hover p-8 sm:p-10">
                  <Icon className="w-9 h-9 stroke-[1.5] text-accent" aria-hidden="true" />
                  <h3 className="type-title mt-8">{title}</h3>
                  <p className="mt-3 text-studio-600">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <HorizontalPortfolio />

        <BeforeAfterSlider />

        <PricingSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* ── Testimonials ── */}
        <section id="testimonials" className="bg-studio-50 py-24 sm:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <header className="max-w-3xl">
              <p className="type-eyebrow text-studio-600">Client stories</p>
              <h2 className="type-headline mt-2">Loved by homeowners, architects and hosts.</h2>
              <p className="type-subhead text-studio-600 mt-4">
                Reflections from patrons across India who trusted us with their homes and hospitality spaces.
              </p>
            </header>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {testimonials.map(item => (
                <figure key={item.id} className="tile p-7 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }, (_, i) => (
                        <Star key={i} className="w-4 h-4 fill-star text-star" aria-hidden="true" />
                      ))}
                    </div>
                    {item.highlight && (
                      <p className="mt-4 font-display text-[19px] font-semibold leading-snug tracking-[-0.015em]">
                        “{item.highlight}”
                      </p>
                    )}
                    <blockquote className="mt-3 type-callout text-studio-600">“{item.quote}”</blockquote>
                  </div>
                  <figcaption className="pt-5 border-t border-studio-200 type-callout">
                    <p className="font-semibold">{item.clientName}</p>
                    <p className="text-studio-600">{item.roleOrLocation}</p>
                    <p className="text-studio-500 type-footnote mt-0.5">{item.projectType}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <ul className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 type-callout font-medium text-studio-500">
              {RECOGNITION.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </section>

        <JournalSection />

        <InstagramFeed />

        <InquirySection />
      </main>

      <CartDrawer />

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
