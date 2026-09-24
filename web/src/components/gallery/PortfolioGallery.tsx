import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Maximize2, ExternalLink, MessageCircle, Sparkles, MapPin, Palette } from 'lucide-react';
import { PortfolioItem } from '../../types';
import { portfolioItems } from '../../data/portfolioData';

interface PortfolioGalleryProps {
  onOpenInquiry?: (item?: PortfolioItem) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStyle, setSelectedStyle] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { label: 'All Spaces', value: 'ALL' },
    { label: 'Homes & Villas', value: 'HOMES' },
    { label: 'Studios & Offices', value: 'OFFICES' },
    { label: 'Cafés & Dining', value: 'CAFÉS' },
    { label: 'Bars & Hostels', value: 'BARS' },
    { label: 'Wall Murals', value: 'MURALS' }
  ];

  const styles = [
    { label: 'All Styles', value: 'ALL' },
    { label: 'Traditional Heritage', value: 'Traditional' },
    { label: 'Modern Abstract', value: 'Abstract' },
    { label: 'Architectural Murals', value: 'Mural' },
    { label: 'Commercial Interiors', value: 'Interior' }
  ];

  const filteredItems = useMemo(() => {
    return portfolioItems.filter(item => {
      // Category match
      let matchesCat = true;
      if (selectedCategory !== 'ALL') {
        if (selectedCategory === 'OFFICES') {
          matchesCat = item.category === 'OFFICES' || item.category === 'STUDIOS';
        } else if (selectedCategory === 'CAFÉS') {
          matchesCat = item.category === 'CAFÉS' || item.category === 'RESTAURANTS';
        } else {
          matchesCat = item.category === selectedCategory;
        }
      }

      // Style match
      let matchesStyle = true;
      if (selectedStyle !== 'ALL') {
        if (selectedStyle === 'Traditional') {
          matchesStyle = item.canvasType === 'Traditional' || item.typeLabel.includes('TRADITIONAL');
        } else if (selectedStyle === 'Abstract') {
          matchesStyle = item.canvasType === 'Abstract' || item.typeLabel.includes('ABSTRACT');
        } else if (selectedStyle === 'Mural') {
          matchesStyle = item.typeLabel.includes('MURAL') || item.category === 'MURALS';
        } else if (selectedStyle === 'Interior') {
          matchesStyle = item.typeLabel.includes('INTERIOR');
        }
      }

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        (item.technique && item.technique.toLowerCase().includes(query));

      return matchesCat && matchesStyle && matchesSearch;
    });
  }, [selectedCategory, selectedStyle, searchQuery]);

  const handleWhatsAppInquiry = (item: PortfolioItem) => {
    const text = encodeURIComponent(
      `Hello The Artistic Tales! I am interested in commissioning or inquiring about the artwork "${item.title}" (${item.typeLabel}, ${item.location}). Could you please share more details?`
    );
    window.open(`https://wa.me/917567979307?text=${text}`, '_blank');
  };

  return (
    <section id="gallery" className="py-24 bg-studio-100/40 border-y border-studio-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-studio-200">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center space-x-2">
              <span className="p-1 bg-studio-200 text-studio-900 rounded">
                <Sparkles className="w-3.5 h-3.5 text-studio-700" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold">
                Portfolio & Gallery
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-studio-900 font-normal leading-tight">
              Curated Works & Real Installations
            </h2>
            <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
              Explore our collection of hand-painted Belgian linen canvases, floor-to-ceiling murals, and custom spatial commissions executed across India and worldwide.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs text-studio-500 font-mono tracking-wider">
            Showing {filteredItems.length} of {portfolioItems.length} Works
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Space Category Tabs */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-studio-900 text-white font-medium shadow-sm'
                      : 'bg-white text-studio-600 border border-studio-200/80 hover:border-studio-400 hover:text-studio-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-studio-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search artworks, murals, or styles..."
                className="w-full text-xs pl-9 pr-8 py-2 bg-white border border-studio-200 rounded-full focus:outline-none focus:border-studio-900 placeholder-studio-400 tracking-wider"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-studio-400 hover:text-studio-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Sub-filter: Style Filter */}
          <div className="flex items-center space-x-2 pt-2 border-t border-studio-200/50">
            <span className="text-[10px] uppercase tracking-wider text-studio-400 font-semibold">
              Filter by Style:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {styles.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSelectedStyle(s.value)}
                  className={`text-[11px] px-3 py-1 rounded-sm transition-colors ${
                    selectedStyle === s.value
                      ? 'bg-studio-200 text-studio-900 font-medium'
                      : 'text-studio-500 hover:text-studio-800 hover:bg-studio-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white rounded-lg border border-dashed border-studio-300">
            <p className="font-serif text-2xl text-studio-800">No artwork found matching criteria</p>
            <p className="text-xs text-studio-500 max-w-sm mx-auto">
              Try adjusting your search terms or reset the filters to browse our complete collection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedStyle('ALL');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-studio-900 text-white text-xs uppercase tracking-widest rounded transition-colors hover:bg-studio-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer bg-white rounded-sm overflow-hidden border border-studio-200/80 hover:border-studio-400 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Artwork Thumbnail */}
                <div className="relative aspect-[4/5] bg-studio-200 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[10px] uppercase tracking-widest text-white flex items-center space-x-1.5 font-medium">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Artwork</span>
                    </span>
                  </div>

                  {item.status && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold rounded bg-studio-900/80 text-white backdrop-blur-sm">
                      {item.status}
                    </span>
                  )}
                </div>

                {/* Artwork Information */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-studio-500 font-semibold block">
                      {item.typeLabel}
                    </span>
                    <h3 className="font-serif text-lg text-studio-900 font-medium leading-snug group-hover:text-studio-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-studio-100 flex items-center justify-between text-[11px] text-studio-500">
                    <span className="truncate max-w-[150px]">{item.location}</span>
                    <span className="text-studio-900 font-medium group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick View / Detail Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div
              className="fixed inset-0 bg-studio-950/75 backdrop-blur-md"
              onClick={() => setActiveItem(null)}
            />

            <div className="relative bg-white w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden z-10 border border-studio-200 flex flex-col md:flex-row max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 z-20 p-2 text-studio-400 hover:text-studio-900 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Artwork Large Image */}
              <div className="md:w-1/2 bg-studio-100 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="max-h-[60vh] md:max-h-[75vh] w-auto object-contain rounded-sm shadow-md"
                />
              </div>

              {/* Artwork Metadata */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-studio-500 font-semibold block mb-1">
                      {activeItem.typeLabel}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-studio-900 font-normal leading-tight">
                      {activeItem.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
                    {activeItem.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-studio-200 text-xs">
                    {activeItem.technique && (
                      <div className="flex items-start space-x-2">
                        <Palette className="w-4 h-4 text-studio-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-studio-500 font-medium">Technique: </span>
                          <span className="text-studio-800">{activeItem.technique}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-studio-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-studio-500 font-medium">Collection / Site: </span>
                        <span className="text-studio-800">{activeItem.location}</span>
                      </div>
                    </div>

                    {activeItem.status && (
                      <div className="flex items-center space-x-2">
                        <span className="text-studio-500 font-medium">Status: </span>
                        <span className="inline-block px-2 py-0.5 bg-studio-100 text-studio-800 rounded font-semibold text-[10px] uppercase tracking-wider">
                          {activeItem.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inquiry CTAs */}
                <div className="space-y-2.5 pt-6 border-t border-studio-200">
                  <button
                    onClick={() => handleWhatsAppInquiry(activeItem)}
                    className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors flex items-center justify-center space-x-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      const item = activeItem;
                      setActiveItem(null);
                      onOpenInquiry?.(item);
                    }}
                    className="w-full py-3 bg-studio-100 hover:bg-studio-200 text-studio-900 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Request Studio Consultation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
