import React, { useState, useRef } from 'react';
import {
  statementItems,
  stylingPortfolioItems
} from '../../data/newPortfolioData';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageCircle,
  Eye,
  X
} from 'lucide-react';
import { LiquidGlassPill } from '../glass/LiquidGlassPill';

interface PortfolioCardItem {
  id: string;
  title: string;
  categoryTag: string;
  tagline: string;
  imageUrl: string;
  priceNote?: string;
  isStatement: boolean;
}

const CATEGORY_TABS = [
  { key: 'all-statements', label: 'All Statement Pieces', subtitle: 'Sculptural & Light Reflective Editions' },
  { key: 'disco', label: 'Disco Statements', subtitle: 'Made to catch the light & attention' },
  { key: 'bar', label: 'Bar Statements', subtitle: 'Made to turn the bars into a vibe' },
  { key: 'mirror', label: 'Mirror Statements', subtitle: "Your space's new selfie corner" },
  { key: 'light', label: 'Light Statements', subtitle: 'For spaces that deserve their own spotlight' },
  { key: 'wall', label: 'Wall Statements', subtitle: 'Walls into little more personality' },
  { key: 'abstracts-canvas', label: 'Canvas & Abstracts', subtitle: 'Curated original paintings on Belgian linen' },
  { key: 'murals-doodling', label: 'Murals & Doodling', subtitle: 'Floor-to-ceiling narratives & line art' },
  { key: 'hospitality-airbnbs', label: 'Airbnbs & Hotels', subtitle: 'Experiential hospitality styling' },
  { key: 'exhibitions-custom', label: 'Exhibitions & Custom', subtitle: 'Bespoke commissions & curated gallery exhibitions' }
];

export const HorizontalPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all-statements');
  const [selectedPreview, setSelectedPreview] = useState<PortfolioCardItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter items based on active tab
  const getFilteredItems = (): PortfolioCardItem[] => {
    if (activeTab === 'all-statements') {
      return statementItems.map(item => ({
        id: item.id,
        title: item.title,
        categoryTag: item.categoryName,
        tagline: item.tagline,
        imageUrl: item.imageUrl,
        priceNote: item.priceEstimate || '₹5,000 – ₹20,000',
        isStatement: true
      }));
    }

    if (['disco', 'bar', 'mirror', 'light', 'wall'].includes(activeTab)) {
      return statementItems
        .filter(item => item.category === activeTab)
        .map(item => ({
          id: item.id,
          title: item.title,
          categoryTag: item.categoryName,
          tagline: item.tagline,
          imageUrl: item.imageUrl,
          priceNote: item.priceEstimate || '₹5,000 – ₹20,000',
          isStatement: true
        }));
    }

    if (activeTab === 'abstracts-canvas') {
      return stylingPortfolioItems
        .filter(item => item.category === 'abstract')
        .map(item => ({
          id: item.id,
          title: item.title,
          categoryTag: item.categoryTitle,
          tagline: item.tagline,
          imageUrl: item.imageUrl,
          isStatement: false
        }));
    }

    if (activeTab === 'murals-doodling') {
      return stylingPortfolioItems
        .filter(item => ['hotel_murals', 'doodling_walls', 'bar_tables'].includes(item.category))
        .map(item => ({
          id: item.id,
          title: item.title,
          categoryTag: item.categoryTitle,
          tagline: item.tagline,
          imageUrl: item.imageUrl,
          isStatement: false
        }));
    }

    if (activeTab === 'hospitality-airbnbs') {
      return stylingPortfolioItems
        .filter(item => ['airbnbs', 'hotel_interiors', 'cafes', 'bars_collage'].includes(item.category))
        .map(item => ({
          id: item.id,
          title: item.title,
          categoryTag: item.categoryTitle,
          tagline: item.tagline,
          imageUrl: item.imageUrl,
          isStatement: false
        }));
    }

    if (activeTab === 'exhibitions-custom') {
      return stylingPortfolioItems
        .filter(item => ['customised', 'exhibitions'].includes(item.category))
        .map(item => ({
          id: item.id,
          title: item.title,
          categoryTag: item.categoryTitle,
          tagline: item.tagline,
          imageUrl: item.imageUrl,
          isStatement: false
        }));
    }

    return [];
  };

  const filteredItems = getFilteredItems();
  const currentTabMeta = CATEGORY_TABS.find(t => t.key === activeTab) || CATEGORY_TABS[0];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleWhatsAppCommission = (item: PortfolioCardItem) => {
    const text = encodeURIComponent(
      `Hello The Artistic Tales! I saw "${item.title}" (${item.categoryTag}) on your website portfolio and would love to inquire about commissioning a similar piece for my space.`
    );
    window.open(`https://wa.me/917567979307?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portfolio" className="py-24 bg-studio-950 text-white overflow-hidden relative">
      {/* Background Refractive Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-studio-950/70 to-studio-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header with Title & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2">
            <LiquidGlassPill
              variant="dark"
              size="sm"
              icon={<Sparkles className="w-3 h-3 text-amber-300" />}
              className="uppercase tracking-[0.25em] text-[10px]"
            >
              Studio Portfolio & Creations
            </LiquidGlassPill>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight">
              Curated Works & Spatial Art
            </h2>
            <p className="text-xs sm:text-sm text-studio-300 max-w-xl font-light italic">
              "{currentTabMeta.subtitle}"
            </p>
          </div>

          {/* Desktop Arrow Controls (Liquid Glass Buttons) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll Left"
              className="p-3 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-xl apple-press shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll Right"
              className="p-3 rounded-full border border-white/25 bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-xl apple-press shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Category Filter Pills (Liquid Glass Pills) */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {CATEGORY_TABS.map(tab => (
            <LiquidGlassPill
              key={tab.key}
              active={activeTab === tab.key}
              variant={activeTab === tab.key ? 'amber' : 'dark'}
              size="md"
              onClick={() => {
                setActiveTab(tab.key);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className="whitespace-nowrap uppercase tracking-wider text-[11px]"
            >
              {tab.label}
            </LiquidGlassPill>
          ))}
        </div>

        {/* Swipeable Horizontal Scroll Container */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-xs text-studio-400">
            No artworks currently cataloged under this category.
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent -mx-6 px-6 md:-mx-12 md:px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/15 hover:border-amber-300/50 transition-all duration-300 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                {/* Image Container with Ambient Overlay */}
                <div className="relative aspect-[4/5] overflow-hidden bg-studio-950">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Category Pill Tag (Liquid Glass Pill) */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-studio-950/70 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-wider text-amber-200 font-medium">
                      {item.categoryTag}
                    </span>
                  </div>

                  {/* Quick View Button */}
                  <button
                    onClick={() => setSelectedPreview(item)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-studio-950/70 hover:bg-white hover:text-studio-950 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 apple-press shadow-md"
                    aria-label="Quick View"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Meta Content with Prism Rim */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5 relative">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg text-white font-normal group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-studio-300 italic line-clamp-2 font-light">
                      "{item.tagline}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      {item.priceNote ? (
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-studio-400 block">
                            Estimate
                          </span>
                          <span className="text-xs font-serif text-amber-300 font-medium">
                            {item.priceNote}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-studio-400 font-light">
                          Custom Commission
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleWhatsAppCommission(item)}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-amber-400 hover:text-studio-950 text-white text-[11px] font-medium border border-white/20 transition-all apple-press"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Quick View Modal (Liquid Crystal Sheet) */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-studio-950/80 backdrop-blur-xl animate-fadeIn">
          <div className="relative max-w-2xl w-full rounded-2xl overflow-hidden bg-studio-950/90 border border-white/25 shadow-2xl backdrop-blur-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPreview(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-studio-900/80 text-white hover:bg-white hover:text-studio-950 transition-colors border border-white/20 apple-press"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[85vh] overflow-y-auto">
              <div className="relative aspect-[4/3] bg-studio-950">
                <img
                  src={selectedPreview.imageUrl}
                  alt={selectedPreview.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                    {selectedPreview.categoryTag}
                  </span>
                  {selectedPreview.priceNote && (
                    <span className="font-serif text-lg text-white">
                      {selectedPreview.priceNote}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
                  {selectedPreview.title}
                </h3>

                <p className="text-sm text-studio-300 italic font-light">
                  "{selectedPreview.tagline}"
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleWhatsAppCommission(selectedPreview)}
                    className="flex-1 py-3 px-6 rounded-full bg-amber-400 hover:bg-amber-300 text-studio-950 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 transition-all apple-press shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSelectedPreview(null)}
                    className="py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest border border-white/20 transition-all apple-press"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HorizontalPortfolio;
