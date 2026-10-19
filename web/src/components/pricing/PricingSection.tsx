import React from 'react';
import { pricingCategories, PRICING_FOOTNOTE } from '../../data/newPortfolioData';
import {
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { LiquidGlassCard } from '../glass/LiquidGlassCard';
import { LiquidGlassPill } from '../glass/LiquidGlassPill';

interface PricingSectionProps {
  onOpenBooking?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  const handleInquirePricing = (categoryTitle: string) => {
    const text = encodeURIComponent(
      `Hello The Artistic Tales! I would like to inquire about your pricing and consultation for: ${categoryTitle}.`
    );
    window.open(`https://wa.me/917567979307?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <LiquidGlassPill
            variant="amber"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-amber-600" />}
            className="uppercase tracking-[0.25em] text-[10px] font-semibold"
          >
            Transparent Atelier Pricing
          </LiquidGlassPill>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-studio-900 font-normal tracking-tight">
            Honest Investment in Timeless Art
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-studio-600 font-light max-w-2xl mx-auto leading-relaxed">
            Direct artist pricing with zero hidden surcharges. All custom commissions and spatial styling projects are estimated with absolute clarity.
          </p>
        </div>

        {/* Pricing Cards Grid (Liquid Glass Cards with 3D Tilt & Specular Physics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingCategories.map(cat => (
            <LiquidGlassCard
              key={cat.id}
              variant={cat.badge ? 'metallic' : 'light'}
              maxTilt={6}
              className="p-7 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl text-studio-900 font-normal">
                      {cat.title}
                    </h3>
                    {cat.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/25 border border-amber-400/50 text-amber-900 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-studio-600 font-light">
                    {cat.tagline}
                  </p>
                </div>

                {/* Items List */}
                <div className="space-y-3 pt-3 border-t border-white/40">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/40 border border-white/60 space-y-1 shadow-sm backdrop-blur-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-studio-900">
                          {item.label}
                        </span>
                        <span className="text-sm font-serif font-semibold text-amber-800">
                          {item.rate}
                        </span>
                      </div>
                      {item.subtext && (
                        <p className="text-[11px] text-studio-600 leading-snug font-light">
                          {item.subtext}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/40">
                <button
                  onClick={() => handleInquirePricing(cat.title)}
                  className="w-full py-3 px-4 rounded-full bg-studio-950 hover:bg-studio-800 text-white text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center space-x-2 apple-press shadow-md"
                >
                  <span>Inquire for {cat.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            </LiquidGlassCard>
          ))}
        </div>

        {/* Mandatory Footnote Banner (Frosted Amber Glass Pill) */}
        <div className="mt-12 p-4 rounded-2xl bg-amber-400/10 border border-amber-300/40 backdrop-blur-xl flex items-center justify-center space-x-3 text-center shadow-sm">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <p className="text-xs sm:text-sm font-serif text-amber-950 font-medium italic">
            *{PRICING_FOOTNOTE}
          </p>
        </div>

        {/* Custom Project Consultation Callout (Dark Liquid Glass Panel) */}
        <div className="mt-8">
          <LiquidGlassCard variant="dark" maxTilt={3} className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h4 className="font-serif text-2xl md:text-3xl font-normal text-white">
                  Have a Custom Layout or Multi-Room Project?
                </h4>
                <p className="text-xs sm:text-sm text-studio-300 font-light max-w-xl leading-relaxed">
                  We provide turnkey spatial design, site measurements, custom surface preparations, and shipping logistics across India and globally.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => {
                    if (onOpenBooking) {
                      onOpenBooking();
                    } else {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-studio-950 text-xs uppercase tracking-widest font-semibold transition-all apple-press shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
