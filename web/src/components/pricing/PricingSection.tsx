import React from 'react';
import { pricingCategories, PRICING_FOOTNOTE } from '../../data/newPortfolioData';
import {
  Sparkles,
  CheckCircle2,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';

interface PricingSectionProps {
  onOpenBooking?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking }) => {
  const handleInquirePricing = (categoryTitle: string) => {
    const text = encodeURIComponent(
      `Hello The Artistic Tales! I would like to inquire about your pricing and consultation for: ${categoryTitle}.`
    );
    window.open(`https://wa.me/917567979307?text=${text}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 bg-studio-50 border-b border-studio-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-studio-200/70 border border-studio-300 text-studio-800 text-[10px] uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Transparent Atelier Pricing</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-studio-900 font-normal">
            Honest Investment in Timeless Art
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-studio-600 font-light max-w-2xl mx-auto leading-relaxed">
            Direct artist pricing with zero hidden surcharges. All custom commissions and spatial styling projects are estimated with absolute clarity.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingCategories.map(cat => (
            <div
              key={cat.id}
              className={`rounded-lg p-7 bg-white border transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between ${
                cat.badge
                  ? 'border-amber-400/80 ring-1 ring-amber-400/20'
                  : 'border-studio-200'
              }`}
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl text-studio-900 font-normal">
                      {cat.title}
                    </h3>
                    {cat.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-semibold tracking-wider uppercase">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-studio-500 font-light">
                    {cat.tagline}
                  </p>
                </div>

                {/* Items List */}
                <div className="space-y-4 pt-2 border-t border-studio-100">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded bg-studio-50/70 border border-studio-100 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-studio-900">
                          {item.label}
                        </span>
                        <span className="text-sm font-serif font-semibold text-amber-700">
                          {item.rate}
                        </span>
                      </div>
                      {item.subtext && (
                        <p className="text-[11px] text-studio-500 leading-snug font-light">
                          {item.subtext}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-studio-100">
                <button
                  onClick={() => handleInquirePricing(cat.title)}
                  className="w-full py-2.5 px-4 rounded bg-studio-900 hover:bg-studio-800 text-white text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
                >
                  <span>Inquire for {cat.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Footnote Banner */}
        <div className="mt-12 p-4 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center space-x-3 text-center">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <p className="text-xs sm:text-sm font-serif text-amber-900 font-medium italic">
            *{PRICING_FOOTNOTE}
          </p>
        </div>

        {/* Custom Project Consultation Callout */}
        <div className="mt-8 p-8 rounded-xl bg-studio-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif text-2xl font-normal">
              Have a Custom Layout or Multi-Room Project?
            </h4>
            <p className="text-xs sm:text-sm text-studio-300 font-light max-w-xl">
              We provide turnkey spatial design, site measurements, custom surface preparations, and shipping logistics across India and globally.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                if (onOpenBooking) {
                  onOpenBooking();
                } else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-6 py-3 rounded bg-amber-400 hover:bg-amber-300 text-studio-950 text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
            >
              Book Consultation Form
            </button>

            <a
              href="https://wa.me/917567979307?text=Hi%20The%20Artistic%20Tales%2C%20I%20would%20like%20to%20get%20a%20custom%20space%20styling%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
