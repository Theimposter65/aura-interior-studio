import React from 'react';
import { pricingCategories, PRICING_FOOTNOTE } from '../../data/newPortfolioData';
import { ChevronRight } from 'lucide-react';

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

  const openBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="bg-studio-50 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="max-w-3xl">
          <p className="type-eyebrow text-studio-600">Pricing</p>
          <h2 className="type-headline mt-2">Honest pricing for timeless art.</h2>
          <p className="type-subhead text-studio-600 mt-4">
            Direct artist pricing with no hidden surcharges. Every commission and styling project is estimated up front.
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pricingCategories.map(cat => (
            <article key={cat.id} className="tile p-8 flex flex-col">
              {cat.badge && <p className="text-[14px] font-semibold text-[#B64400]">{cat.badge}</p>}
              <h3 className="type-title mt-1">{cat.title}</h3>
              <p className="mt-2 type-callout text-studio-600">{cat.tagline}</p>

              <dl className="mt-6 flex-1 divide-y divide-studio-200 border-t border-studio-200">
                {cat.items.map(item => (
                  <div key={item.label} className="py-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="type-callout font-medium">{item.label}</dt>
                      <dd className="type-callout font-semibold whitespace-nowrap">{item.rate}</dd>
                    </div>
                    {item.subtext && <dd className="mt-1 type-footnote text-studio-500">{item.subtext}</dd>}
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={() => handleInquirePricing(cat.title)}
                className="link-chevron mt-6 self-start text-left text-[17px]"
              >
                Inquire about {cat.title.toLowerCase()}
                <ChevronRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>

        <p className="mt-8 type-footnote text-studio-500">*{PRICING_FOOTNOTE}</p>

        <div className="mt-12 tile-dark bg-studio-950 p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="type-title">Planning a custom layout or multi-room project?</h3>
            <p className="mt-3 text-studio-400">
              Turnkey spatial design, site measurements, surface preparation and shipping — across India and worldwide.
            </p>
          </div>
          <button type="button" onClick={openBooking} className="btn btn-primary shrink-0">
            Book a consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
