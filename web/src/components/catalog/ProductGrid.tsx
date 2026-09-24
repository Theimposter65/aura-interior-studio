import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, Filter, X } from 'lucide-react';
import { Product, ProductCategory } from '../../types';
import { products as allProducts } from '../../data/products';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductGridProps {
  initialCategory?: ProductCategory | 'all';
  onOpenVisualizer?: (productId: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  initialCategory = 'all',
  onOpenVisualizer
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inspectingProduct, setInspectingProduct] = useState<Product | null>(null);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.tags.some(t => t.toLowerCase().includes(query)) ||
          item.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured maintains default order
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const categories: { label: string; value: ProductCategory | 'all' }[] = [
    { label: 'All Atelier Pieces', value: 'all' },
    { label: 'Wall Designs & Murals', value: 'wall-designs' },
    { label: 'Interior Spatial Plans', value: 'interior-plans' },
    { label: 'Material Concept Packages', value: 'concept-packages' },
  ];

  return (
    <section id="catalog" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-studio-200">
        <div className="max-w-xl space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
            Curated Atelier Archive
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-studio-900 font-normal leading-tight">
            Spatial Concepts & Bespoke Wall Art
          </h2>
          <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
            Every piece is architecturally documented, archival certified, and available for direct acquisition or tailored spatial commissions.
          </p>
        </div>

        {/* Total Count */}
        <div className="mt-4 md:mt-0 text-xs text-studio-500 font-mono tracking-wider">
          Showing {filteredProducts.length} of {allProducts.length} Works
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-studio-900 text-white font-medium shadow-sm'
                    : 'bg-white text-studio-600 border border-studio-200/80 hover:border-studio-400 hover:text-studio-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center space-x-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-studio-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by pigment, style, room..."
                className="w-full text-xs pl-9 pr-8 py-2 bg-white border border-studio-200 rounded-full focus:outline-none focus:border-studio-800 placeholder-studio-400 tracking-wider"
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

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="text-xs py-2 pl-3 pr-8 bg-white border border-studio-200 rounded-full text-studio-700 focus:outline-none focus:border-studio-800 appearance-none cursor-pointer uppercase tracking-wider"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Ascending</option>
                <option value="price-desc">Price: Descending</option>
                <option value="rating">Collector Rating</option>
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-studio-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-lg border border-dashed border-studio-300">
          <p className="font-serif text-2xl text-studio-800">No architectural pieces match your search</p>
          <p className="text-xs text-studio-500 max-w-sm mx-auto">
            Try adjusting your keyword or reset filters to view our full collection of mineral wall murals and spatial plans.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 bg-studio-900 text-white text-xs uppercase tracking-widest rounded transition-colors hover:bg-studio-800"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={item => setInspectingProduct(item)}
              onOpenVisualizer={onOpenVisualizer}
            />
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {inspectingProduct && (
        <ProductDetailModal
          product={inspectingProduct}
          onClose={() => setInspectingProduct(null)}
          onOpenVisualizer={onOpenVisualizer}
        />
      )}
    </section>
  );
};
