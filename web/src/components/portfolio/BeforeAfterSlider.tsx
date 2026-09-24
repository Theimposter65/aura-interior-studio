import React, { useState, useRef, useEffect, useCallback } from 'react';
import { transformationItems } from '../../data/newPortfolioData';
import { TransformationItem } from '../../types';
import {
  Sparkles,
  Columns,
  Split,
  ChevronLeft,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isSideBySide, setIsSideBySide] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProject: TransformationItem = transformationItems[currentIndex] || transformationItems[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = (clampedX / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  }, [isDragging, handleMove]);

  const handleStopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleStopDragging);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleStopDragging);
      window.addEventListener('touchcancel', handleStopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleStopDragging);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleStopDragging);
      window.removeEventListener('touchcancel', handleStopDragging);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleStopDragging]);

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
    window.open(`https://wa.me/917567979307?text=${text}`, '_blank');
  };

  return (
    <section id="transformations" className="py-20 bg-white border-b border-studio-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-studio-100 border border-studio-200 text-studio-700 text-[10px] uppercase tracking-[0.25em]">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Before & After Transformations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-studio-900 font-normal">
              From Plain Rooms to Living Art
            </h2>
            <p className="text-xs sm:text-sm text-studio-600 font-light max-w-xl">
              18 real room revitalizations across holiday villas, private apartments, and experiential Airbnbs. Slide across or view side-by-side.
            </p>
          </div>

          {/* Toggle Display Mode & Project Navigation */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSideBySide(prev => !prev)}
              className="px-3.5 py-2 rounded-sm border border-studio-300 bg-studio-50 hover:bg-studio-100 text-studio-800 text-xs font-medium flex items-center space-x-2 transition-all"
            >
              {isSideBySide ? (
                <>
                  <Split className="w-3.5 h-3.5" />
                  <span>Split Slider Mode</span>
                </>
              ) : (
                <>
                  <Columns className="w-3.5 h-3.5" />
                  <span>Side-by-Side Mode</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-1 border border-studio-200 rounded-sm bg-studio-50 p-1">
              <button
                onClick={prevProject}
                aria-label="Previous Project"
                className="p-1.5 rounded hover:bg-studio-200 text-studio-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-serif px-2 font-medium text-studio-800">
                {currentProject.projectNumber} / {transformationItems.length}
              </span>
              <button
                onClick={nextProject}
                aria-label="Next Project"
                className="p-1.5 rounded hover:bg-studio-200 text-studio-700 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Transformation Viewer */}
        <div className="bg-studio-950 rounded-xl overflow-hidden shadow-2xl border border-studio-800">
          {!isSideBySide ? (
            /* ======================================================== */
            /* Interactive Split Comparison Slider                      */
            /* ======================================================== */
            <div
              ref={containerRef}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full select-none overflow-hidden cursor-ew-resize bg-studio-950 touch-none"
              onMouseDown={e => {
                setIsDragging(true);
                handleMove(e.clientX);
              }}
              onTouchStart={e => {
                setIsDragging(true);
                if (e.touches[0]) handleMove(e.touches[0].clientX);
              }}
            >
              {/* AFTER Image (Full background) */}
              <img
                src={currentProject.afterImageUrl}
                alt="After Transformation"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* BEFORE Image (Clipped overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={currentProject.beforeImageUrl}
                  alt="Before Transformation"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Badges for BEFORE / AFTER */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest border border-white/20">
                  BEFORE
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span className="px-3 py-1 rounded bg-amber-400 text-studio-950 text-[10px] uppercase font-bold tracking-widest shadow-md">
                  AFTER
                </span>
              </div>

              {/* Draggable Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-studio-950 shadow-xl flex items-center justify-center border-2 border-studio-900 pointer-events-auto cursor-grab active:cursor-grabbing">
                  <Split className="w-4 h-4 rotate-90 text-studio-800" />
                </div>
              </div>
            </div>
          ) : (
            /* ======================================================== */
            /* Side-by-Side Comparison Mode                             */
            /* ======================================================== */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-studio-800">
              <div className="relative aspect-[4/3] bg-studio-950">
                <img
                  src={currentProject.beforeImageUrl}
                  alt="Before Transformation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest border border-white/20">
                    BEFORE
                  </span>
                </div>
              </div>

              <div className="relative aspect-[4/3] bg-studio-950">
                <img
                  src={currentProject.afterImageUrl}
                  alt="After Transformation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded bg-amber-400 text-studio-950 text-[10px] uppercase font-bold tracking-widest shadow-md">
                    AFTER
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Project Details Footer Strip */}
          <div className="p-6 bg-studio-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold">
                  {currentProject.roomType}
                </span>
                <span className="text-studio-500">•</span>
                <span className="text-xs text-studio-400">Project {currentProject.projectNumber} of 18</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                {currentProject.title}
              </h3>
              <p className="text-xs text-studio-300 font-light max-w-xl">
                {currentProject.description}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full sm:w-auto px-6 py-3 rounded bg-amber-400 hover:bg-amber-300 text-studio-950 font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book Room Makeover</span>
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip (18 Projects) */}
        <div className="mt-6 flex space-x-3 overflow-x-auto pb-2 scrollbar-thin">
          {transformationItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentIndex(idx);
                setSliderPosition(50);
              }}
              className={`flex-shrink-0 w-20 sm:w-24 rounded-md overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-amber-500 ring-2 ring-amber-500/30 scale-105'
                  : 'border-studio-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={item.afterImageUrl}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-14 object-cover"
              />
              <div className="p-1 bg-studio-50 text-[10px] text-center font-medium text-studio-700 truncate">
                #{item.projectNumber}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
