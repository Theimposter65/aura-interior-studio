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
import { LiquidGlassPill } from '../glass/LiquidGlassPill';

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
    window.open(`https://wa.me/917567979307?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="transformations" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <LiquidGlassPill
              variant="light"
              size="sm"
              icon={<Sparkles className="w-3 h-3 text-amber-600" />}
              className="uppercase tracking-[0.25em] text-[10px]"
            >
              Before & After Transformations
            </LiquidGlassPill>
            <h2 className="font-serif text-3xl sm:text-4xl text-studio-900 font-normal tracking-tight">
              From Plain Rooms to Living Art
            </h2>
            <p className="text-xs sm:text-sm text-studio-600 font-light max-w-xl">
              18 real room revitalizations across holiday villas, private apartments, and experiential Airbnbs. Slide across or view side-by-side.
            </p>
          </div>

          {/* Toggle Display Mode & Project Navigation (Liquid Glass Controls) */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSideBySide(prev => !prev)}
              className="px-4 py-2 rounded-full border border-white/70 bg-white/60 hover:bg-white/80 text-studio-800 text-xs font-medium flex items-center space-x-2 transition-all backdrop-blur-md shadow-sm apple-press"
            >
              {isSideBySide ? (
                <>
                  <Split className="w-3.5 h-3.5 text-amber-600" />
                  <span>Split Slider Mode</span>
                </>
              ) : (
                <>
                  <Columns className="w-3.5 h-3.5 text-amber-600" />
                  <span>Side-by-Side Mode</span>
                </>
              )}
            </button>

            <div className="flex items-center space-x-1.5 border border-white/60 rounded-full bg-white/50 backdrop-blur-md p-1 shadow-sm">
              <button
                onClick={prevProject}
                aria-label="Previous Project"
                className="p-1.5 rounded-full hover:bg-white/80 text-studio-700 transition-colors apple-press"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-serif px-2 font-medium text-studio-800">
                {currentProject.projectNumber} / {transformationItems.length}
              </span>
              <button
                onClick={nextProject}
                aria-label="Next Project"
                className="p-1.5 rounded-full hover:bg-white/80 text-studio-700 transition-colors apple-press"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Transformation Showcase Container (Liquid Glass Frame) */}
        <div className="rounded-3xl border border-white/70 bg-white/45 backdrop-blur-2xl saturate-[185%] p-4 sm:p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] space-y-6">
          {/* Main Visual Comparison Canvas */}
          {!isSideBySide ? (
            /* Split Interactive Slider with Refractive Crystal Handle */
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl bg-studio-950 touch-none border border-white/40"
            >
              {/* After Image (Background Layer) */}
              <img
                src={currentProject.afterImageUrl}
                alt={`${currentProject.title} - After Transformation`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-studio-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase">
                After
              </div>

              {/* Before Image (Revealed Overlay Layer) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={currentProject.beforeImageUrl}
                  alt={`${currentProject.title} - Before Transformation`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-studio-950/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase">
                  Before
                </div>
              </div>

              {/* Liquid Glass Crystal Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 pointer-events-none z-20 flex items-center justify-center -translate-x-1/2"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Optical Glass Split Beam */}
                <div className="w-[2px] h-full bg-gradient-to-b from-white/90 via-amber-200 to-white/90 shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

                {/* Central Liquid Glass Crystal Handle with Prismatic Chromatic Rim */}
                <div className="absolute w-11 h-11 rounded-full bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_8px_25px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.95),inset_1px_0_2px_rgba(120,205,255,0.4),inset_-1px_0_2px_rgba(255,160,215,0.35)] flex items-center justify-center space-x-1 pointer-events-auto cursor-grab active:cursor-grabbing apple-press">
                  <div className="w-1 h-3.5 bg-studio-700/60 rounded-full" />
                  <div className="w-1 h-3.5 bg-studio-700/60 rounded-full" />
                </div>
              </div>
            </div>
          ) : (
            /* Side-by-Side Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/40 bg-studio-950">
                <img
                  src={currentProject.beforeImageUrl}
                  alt={`${currentProject.title} - Before`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-studio-950/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase">
                  Before
                </div>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/40 bg-studio-950">
                <img
                  src={currentProject.afterImageUrl}
                  alt={`${currentProject.title} - After`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-studio-950/70 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase">
                  After
                </div>
              </div>
            </div>
          )}

          {/* Project Details Strip with Quick Commission Link */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/40">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40">
                  Project #{currentProject.projectNumber}
                </span>
                {currentProject.roomType && (
                  <span className="text-xs text-studio-500 font-serif">• {currentProject.roomType}</span>
                )}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-studio-900 font-normal mt-1">
                {currentProject.title}
              </h3>
              <p className="text-xs text-studio-600 font-light mt-0.5">
                Authentic transformation captured on-site. Drag the crystal slider to inspect fine mural and styling details.
              </p>
            </div>

            <button
              onClick={handleWhatsAppInquiry}
              className="px-5 py-2.5 rounded-full bg-studio-950 hover:bg-studio-800 text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 transition-all apple-press shadow-md shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>Inquire Transformation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
