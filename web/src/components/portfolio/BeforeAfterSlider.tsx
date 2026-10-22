import React, { useState, useRef, useEffect, useCallback } from 'react';
import { transformationItems } from '../../data/newPortfolioData';
import { TransformationItem } from '../../types';
import { Columns, Split, ChevronLeft, ChevronRight, ChevronsLeftRight, MessageCircle } from 'lucide-react';
import { LiquidGlass } from '../glass/LiquidGlass';

export const BeforeAfterSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isSideBySide, setIsSideBySide] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const currentProject: TransformationItem = transformationItems[currentIndex] || transformationItems[0];

  const handleMove = useCallback((clientX: number) => {
    const rect = rectRef.current || (containerRef.current ? containerRef.current.getBoundingClientRect() : null);
    if (!rect || rect.width <= 0) return;
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = (clampedX / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect();
    }
    setIsDragging(true);
    handleMove(e.clientX);
  }, [handleMove]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    rectRef.current = null;
    if (isDragging) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // pointer may already be released
      }
      setIsDragging(false);
    }
  }, [isDragging]);

  const nextProject = () => {
    setCurrentIndex(prev => (prev + 1) % transformationItems.length);
    setSliderPosition(50);
  };

  const prevProject = () => {
    setCurrentIndex(prev => (prev - 1 + transformationItems.length) % transformationItems.length);
    setSliderPosition(50);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hi The Artistic Tales, I am amazed by your Before/After Transformation #${currentProject.projectNumber} (${currentProject.title}). I would love to discuss a makeover for my space!`
    );
    window.open(`https://wa.me/917567979307?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const onSliderKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') setSliderPosition(p => Math.max(0, p - step));
    else if (e.key === 'ArrowRight') setSliderPosition(p => Math.min(100, p + step));
    else if (e.key === 'Home') setSliderPosition(0);
    else if (e.key === 'End') setSliderPosition(100);
    else return;
    e.preventDefault();
  };

  const imageTag = (label: string, side: 'left' | 'right') => (
    <LiquidGlass
      tone="dark"
      bezel={12}
      thickness={16}
      className={`absolute bottom-4 ${side === 'left' ? 'left-4' : 'right-4'} z-10 px-3.5 py-1.5 text-[13px] font-semibold text-white`}
    >
      {label}
    </LiquidGlass>
  );

  return (
    <section id="transformations" className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <header className="max-w-3xl">
            <p className="type-eyebrow text-studio-600">Before and after</p>
            <h2 className="type-headline mt-2">From plain rooms to living art.</h2>
            <p className="type-subhead text-studio-600 mt-4">
              {transformationItems.length} real rooms across holiday villas, apartments and Airbnbs. Drag across to compare.
            </p>
          </header>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSideBySide(prev => !prev)}
              aria-pressed={isSideBySide}
              className="btn btn-quiet btn-sm"
            >
              {isSideBySide ? <Split className="w-4 h-4" /> : <Columns className="w-4 h-4" />}
              {isSideBySide ? 'Slider' : 'Side by side'}
            </button>

            <div className="flex items-center rounded-full bg-studio-200/70 p-1">
              <button type="button" onClick={prevProject} aria-label="Previous project" className="grid place-items-center w-8 h-8 rounded-full hover:bg-white apple-press">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-[14px] font-medium tabular-nums" aria-live="polite">
                {currentProject.projectNumber} of {transformationItems.length}
              </span>
              <button type="button" onClick={nextProject} aria-label="Next project" className="grid place-items-center w-8 h-8 rounded-full hover:bg-white apple-press">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          {!isSideBySide ? (
            <div
              ref={containerRef}
              role="slider"
              tabIndex={0}
              aria-label={`Compare before and after: ${currentProject.title}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuetext={`${Math.round(sliderPosition)}% before`}
              onKeyDown={onSliderKey}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-tile overflow-hidden cursor-ew-resize select-none bg-studio-950 touch-none"
            >
              <img
                src={currentProject.afterImageUrl}
                alt={`${currentProject.title} — after`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              {imageTag('After', 'right')}

              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={currentProject.beforeImageUrl}
                  alt={`${currentProject.title} — before`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                {imageTag('Before', 'left')}
              </div>

              {/* Seam + glass lens handle: the lens magnifies the boundary it sits on */}
              <div
                className="absolute inset-y-0 z-20 -translate-x-1/2 flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-0.5 h-full bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.25)]" />
                <LiquidGlass
                  tone="clear"
                  bezel={22}
                  thickness={34}
                  blur={0.4}
                  className="absolute w-14 h-14 grid place-items-center text-white"
                  style={{
                    transform: isDragging ? 'scale(1.12)' : 'scale(1)',
                    transition: 'transform 420ms var(--ease-spring)',
                  }}
                >
                  <ChevronsLeftRight className="w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                </LiquidGlass>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {([
                ['Before', currentProject.beforeImageUrl, 'left'],
                ['After', currentProject.afterImageUrl, 'right'],
              ] as const).map(([label, src, side]) => (
                <div key={label} className="relative aspect-[4/3] rounded-tile overflow-hidden bg-studio-950">
                  <img src={src} alt={`${currentProject.title} — ${label.toLowerCase()}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  {imageTag(label, side)}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <p className="text-[14px] font-semibold text-studio-500">
                Project {currentProject.projectNumber}
                {currentProject.roomType && ` · ${currentProject.roomType}`}
              </p>
              <h3 className="type-title mt-1">{currentProject.title}</h3>
            </div>
            <button type="button" onClick={handleWhatsAppInquiry} className="btn btn-primary shrink-0">
              <MessageCircle className="w-4 h-4" />
              Ask about this transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
