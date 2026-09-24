import React from 'react';
import { Compass, Layers, Crown, Check, ArrowRight, Sparkles, Calendar, ShieldCheck } from 'lucide-react';
import { ServiceTier } from '../../types';
import { serviceTiers } from '../../data/services';

interface ServicesSectionProps {
  onOpenBooking: (tierId?: string) => void;
  onOpenQuiz: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBooking,
  onOpenQuiz
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-studio-700" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-studio-900" />;
      case 'Crown':
        return <Crown className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-studio-700" />;
    }
  };

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
          Our Craft & Offerings
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-studio-900 font-normal leading-tight">
          Art & Interior Styling Services
        </h2>
        <p className="text-xs sm:text-sm text-studio-600 leading-relaxed max-w-2xl mx-auto">
          From custom canvas paintings to floor-to-ceiling architectural murals and full spatial transformations, we bring lasting memory and soul into modern residences and commercial venues.
        </p>

        {/* Style Quiz Prompt Banner */}
        <div className="pt-2">
          <button
            onClick={onOpenQuiz}
            className="inline-flex items-center space-x-2.5 px-6 py-2.5 bg-studio-100 hover:bg-studio-200 text-studio-900 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-studio-200 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-studio-600" />
            <span>Not sure which package fits your home? Take our 2-Minute Style Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3-Tier Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {serviceTiers.map(tier => {
          const isFeatured = tier.badge === 'Most Popular';

          return (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between p-8 rounded-sm bg-white border transition-all duration-300 ${
                isFeatured
                  ? 'border-studio-900 shadow-art-lg ring-1 ring-studio-900'
                  : 'border-studio-200 hover:border-studio-400 hover:shadow-art'
              }`}
            >
              {/* Badge if present */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-studio-900 text-white text-[10px] uppercase tracking-[0.2em] font-semibold px-4 py-1 rounded-full shadow-sm">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-studio-100 rounded-full">
                    {getIcon(tier.iconName)}
                  </div>
                  <span className="text-[11px] text-studio-500 font-mono tracking-wider">
                    {tier.timeline}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-studio-900 font-normal mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs text-studio-500 leading-relaxed mb-6">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="pb-6 border-b border-studio-100 mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-studio-400 block font-semibold">
                    Package Price
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-serif text-3xl font-semibold text-studio-900">
                      ${tier.price}
                    </span>
                    <span className="text-xs text-studio-500">USD / project</span>
                  </div>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-studio-700 block">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5 text-xs text-studio-600">
                    {tier.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button & Ideal For */}
              <div className="pt-6 border-t border-studio-100 space-y-4">
                <div className="text-[11px] text-studio-500 leading-relaxed bg-studio-50 p-3 rounded">
                  <strong className="text-studio-700 block mb-0.5">Best for:</strong>
                  {tier.idealFor}
                </div>

                <button
                  onClick={() => onOpenBooking(tier.id)}
                  className={`w-full py-3.5 px-6 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center justify-center space-x-2 ${
                    isFeatured
                      ? 'bg-studio-900 hover:bg-studio-800 text-white shadow-md'
                      : 'bg-studio-100 hover:bg-studio-900 hover:text-white text-studio-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
