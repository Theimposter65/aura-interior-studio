import React, { useState, useRef } from 'react';
import {
  statementItems,
  stylingPortfolioItems,
  StylingPortfolioItem
} from '../../data/newPortfolioData';
import { StatementItem, StatementCategoryKey } from '../../types';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  Eye,
  X
} from 'lucide-react';

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
  { key: 'murals-doodling', label: 'Murals & Doodling', subtitle: 'Floor-to-ceiling narratives & line art' },
  { key: 'hospitality-airbnbs', label: 'Airbnbs & Hotels', subtitle: 'Experiential hospitality styling' }
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
    window.open(`https://wa.me/917567979307?text=${text}`, '_blank');
  };

  return (
    <section id="portfolio" className="py-20 bg-studio-900 text-white overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-studio-800/30 via-studio-950/80 to-studio-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header with Title & Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-studio-300 text-[10px] uppercase tracking-[0.25em]">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Studio Portfolio & Creations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-studio-50 font-normal">
              Curated Works & Spatial Art
            </h2>
            <p className="text-xs sm:text-sm text-studio-300 max-w-xl font-light italic">
              "{currentTabMeta.subtitle}"
            </p>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll Left"
              className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all backdrop-blur-md active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll Right"
              className="p-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all backdrop-blur-md active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {CATEGORY_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all uppercase tracking-wider ${
                activeTab === tab.key
                  ? 'bg-amber-300 text-studio-950 shadow-md font-semibold'
                  : 'bg-white/5 hover:bg-white/10 text-studio-300 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Swipeable Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-5 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent -mx-6 px-6 md:-mx-12 md:px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start group relative rounded-lg overflow-hidden bg-studio-950/60 border border-white/10 hover:border-amber-300/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Image Container with Ambient Overlay */}
              <div className="relative aspect-[4/5] overflow-hidden bg-studio-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={e => {
                    // Fallback to placeholder if not loaded yet
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-sm bg-studio-900/80 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-wider text-amber-200 font-medium">
                    {item.categoryTag}
                  </span>
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => setSelectedPreview(item)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-studio-900/80 hover:bg-white hover:text-studio-900 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  aria-label="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-white font-normal group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-studio-400 font-light line-clamp-2">
                    {item.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  {item.priceNote ? (
                    <span className="text-xs font-semibold text-amber-300">
                      {item.priceNote}
                    </span>
                  ) : (
                    <span className="text-[11px] text-studio-400 uppercase tracking-wider">
                      Custom Commission
                    </span>
                  )}

                  <button
                    onClick={() => handleWhatsAppCommission(item)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-amber-400 hover:text-studio-950 text-white text-[11px] font-medium transition-all"
                  >
                    <span>Inquire</span>
                    <MessageCircle className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-center space-x-2 text-[11px] text-studio-400 pt-2">
          <span>← Swipe horizontally to explore collection →</span>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-2xl w-full bg-studio-900 border border-white/20 rounded-lg overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedPreview(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-studio-950/80 text-white hover:bg-white hover:text-studio-950 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[85vh] overflow-y-auto">
              <div className="aspect-[4/3] bg-studio-950 overflow-hidden">
                <img
                  src={selectedPreview.imageUrl}
                  alt={selectedPreview.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
                    {selectedPreview.categoryTag}
                  </span>
                  <h3 className="font-serif text-2xl text-white font-normal">
                    {selectedPreview.title}
                  </h3>
                  <p className="text-sm text-studio-300 font-light">
                    {selectedPreview.tagline}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  {selectedPreview.priceNote && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-studio-400">Estimate Range</p>
                      <p className="text-base font-semibold text-amber-300">{selectedPreview.priceNote}</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        handleWhatsAppCommission(selectedPreview);
                        setSelectedPreview(null);
                      }}
                      className="flex-1 sm:flex-initial px-6 py-3 rounded bg-amber-400 hover:bg-amber-300 text-studio-950 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Commission via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
