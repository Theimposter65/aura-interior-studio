import React, { useState, useRef } from 'react';
import {
  statementItems,
  stylingPortfolioItems
} from '../../data/newPortfolioData';
import { ChevronLeft, ChevronRight, MessageCircle, Plus, X } from 'lucide-react';
import { LiquidGlass } from '../glass/LiquidGlass';
import { GlassSegmentedControl } from '../glass/GlassSegmentedControl';
import { projectMomentum, rubberbandDistance, VelocityTracker } from '../../utils/appleSpringPhysics';

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
  const velocityTrackerRef = useRef(new VelocityTracker());
  const dragStartRef = useRef({ x: 0, scrollLeft: 0, isDown: false, hasDragged: false });
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [overscrollOffset, setOverscrollOffset] = useState(0);

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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (!scrollContainerRef.current) return;

    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: scrollContainerRef.current.scrollLeft,
      isDown: true,
      hasDragged: false,
    };
    velocityTrackerRef.current.reset();
    velocityTrackerRef.current.addPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current.isDown || !scrollContainerRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.x;

    if (!dragStartRef.current.hasDragged) {
      if (Math.abs(deltaX) > 8) {
        dragStartRef.current.hasDragged = true;
        setIsGrabbing(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // ignore if already captured
        }
      } else {
        return;
      }
    }

    velocityTrackerRef.current.addPoint(e.clientX, e.clientY);

    const container = scrollContainerRef.current;
    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    const rawTarget = dragStartRef.current.scrollLeft - deltaX;

    if (rawTarget < 0) {
      const resisted = rubberbandDistance(-rawTarget, container.clientWidth, 0.55);
      setOverscrollOffset(resisted);
      container.scrollLeft = 0;
    } else if (rawTarget > maxScroll) {
      const overshoot = rawTarget - maxScroll;
      const resisted = rubberbandDistance(overshoot, container.clientWidth, 0.55);
      setOverscrollOffset(-resisted);
      container.scrollLeft = maxScroll;
    } else {
      setOverscrollOffset(0);
      container.scrollLeft = rawTarget;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current.isDown) return;
    dragStartRef.current.isDown = false;
    setOverscrollOffset(0);

    if (dragStartRef.current.hasDragged && scrollContainerRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      setIsGrabbing(false);

      const { vx } = velocityTrackerRef.current.getVelocity(performance.now());
      const projectedDelta = projectMomentum(-vx, 0.998);

      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;
      const targetScroll = currentScroll + projectedDelta;
      const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);

      const firstCard = container.firstElementChild as HTMLElement | null;
      const cardPitch = firstCard && firstCard.offsetWidth > 0 ? firstCard.offsetWidth + 20 : 360;

      const nearestCardIndex = Math.round(targetScroll / cardPitch);
      const snappedScroll = Math.max(0, Math.min(nearestCardIndex * cardPitch, maxScroll));

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      container.scrollTo({
        left: snappedScroll,
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    } else {
      setIsGrabbing(false);
    }
  };

  const handleWhatsAppCommission = (item: PortfolioCardItem) => {
    const text = encodeURIComponent(
      `Hello The Artistic Tales! I saw "${item.title}" (${item.categoryTag}) on your website portfolio and would love to inquire about commissioning a similar piece for my space.`
    );
    window.open(`https://wa.me/917567979307?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portfolio" data-nav-theme="dark" className="py-24 sm:py-32 bg-studio-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <header className="max-w-3xl">
            <p className="type-eyebrow text-studio-400">Studio portfolio</p>
            <h2 className="type-headline mt-2">Curated works and spatial art.</h2>
            <p className="type-subhead text-studio-400 mt-4">{currentTabMeta.subtitle}.</p>
          </header>

          <div className="hidden sm:flex items-center gap-3">
            {(['left', 'right'] as const).map(direction => (
              <LiquidGlass
                key={direction}
                as="button"
                type="button"
                tone="dark"
                interactive
                thickness={0}
                onClick={() => scroll(direction)}
                aria-label={direction === 'left' ? 'Previous works' : 'Next works'}
                className="grid place-items-center w-11 h-11 text-white"
              >
                {direction === 'left' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </LiquidGlass>
            ))}
          </div>
        </div>

        <GlassSegmentedControl
          label="Portfolio categories"
          tone="dark"
          className="mt-10 inline-flex"
          options={CATEGORY_TABS.map(({ key, label }) => ({ key, label }))}
          value={activeTab}
          onChange={key => {
            setActiveTab(key);
            scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="py-16 text-center text-studio-400">No works in this category yet.</p>
      ) : (
        <div
          ref={scrollContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`
            mt-10 flex gap-5 overflow-x-auto no-scrollbar pb-4 select-none touch-pan-y
            px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] scroll-px-4 sm:scroll-px-6 lg:scroll-px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]
            ${isGrabbing ? 'snap-none cursor-grabbing' : 'snap-x snap-mandatory cursor-grab'}
          `}
          style={{
            transform: overscrollOffset !== 0 ? `translateX(${overscrollOffset}px)` : undefined,
            transition: isGrabbing ? 'none' : 'transform 320ms cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          {filteredItems.map(item => (
            <article
              key={item.id}
              className="group relative flex-shrink-0 w-[78vw] max-w-[340px] sm:w-[340px] aspect-[4/5] snap-start rounded-tile overflow-hidden bg-studio-800"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/40" aria-hidden="true" />

              <div className="absolute inset-x-0 top-0 p-6">
                <p className="text-[13px] font-semibold text-white/75">{item.categoryTag}</p>
                <h3 className="mt-1 font-display text-[24px] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
                  {item.title}
                </h3>
                {item.priceNote && <p className="mt-1 type-callout text-white/80">{item.priceNote}</p>}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between gap-3">
                <LiquidGlass
                  as="button"
                  type="button"
                  tone="clear"
                  interactive
                  bezel={16}
                  thickness={22}
                  onClick={() => handleWhatsAppCommission(item)}
                  className="h-10 px-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-white"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire
                </LiquidGlass>
                <LiquidGlass
                  as="button"
                  type="button"
                  tone="clear"
                  interactive
                  bezel={16}
                  thickness={22}
                  onClick={() => {
                    if (!dragStartRef.current.hasDragged) setSelectedPreview(item);
                  }}
                  aria-label={`View ${item.title}`}
                  className="grid place-items-center w-10 h-10 text-white"
                >
                  <Plus className="w-5 h-5" />
                </LiquidGlass>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Quick view — dims the page to focus a single work */}
      {selectedPreview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPreview.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedPreview(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-tile bg-studio-900 text-white shadow-2xl apple-materialize"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] bg-black">
              <img src={selectedPreview.imageUrl} alt={selectedPreview.title} className="w-full h-full object-contain" />
              <LiquidGlass
                as="button"
                type="button"
                tone="dark"
                interactive
                bezel={16}
                thickness={22}
                onClick={() => setSelectedPreview(null)}
                aria-label="Close"
                className="absolute top-4 right-4 grid place-items-center w-10 h-10 text-white"
              >
                <X className="w-5 h-5" />
              </LiquidGlass>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-[14px] font-semibold text-studio-400">{selectedPreview.categoryTag}</p>
              <h3 className="type-title mt-1">{selectedPreview.title}</h3>
              <p className="mt-3 text-studio-300">{selectedPreview.tagline}</p>
              {selectedPreview.priceNote && <p className="mt-4 font-semibold">{selectedPreview.priceNote}</p>}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => handleWhatsAppCommission(selectedPreview)} className="btn btn-primary">
                  <MessageCircle className="w-4 h-4" />
                  Inquire on WhatsApp
                </button>
                <button type="button" onClick={() => setSelectedPreview(null)} className="btn btn-secondary-dark">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HorizontalPortfolio;
