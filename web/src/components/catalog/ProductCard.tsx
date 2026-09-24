import React, { useState } from 'react';
import { Eye, ShoppingBag, EyeOff, Sparkles, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onOpenVisualizer?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onOpenVisualizer
}) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-sm overflow-hidden border border-studio-200/70 hover:border-studio-300 transition-all duration-500 hover:shadow-art"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Canvas Container */}
      <div
        className="relative aspect-[4/5] bg-studio-100 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={isHovered && product.roomContextImage ? product.roomContextImage : product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-widest text-studio-900 font-medium rounded-full shadow-sm">
            {product.category.replace('-', ' ')}
          </span>
        </div>

        {/* Floating Actions on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center space-x-2 transition-all duration-300 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={e => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 bg-white/95 hover:bg-white text-studio-900 text-xs uppercase tracking-wider font-semibold rounded shadow-md backdrop-blur-sm flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-studio-700" />
            <span>Inspect</span>
          </button>

          {product.category === 'wall-designs' && onOpenVisualizer && (
            <button
              onClick={e => {
                e.stopPropagation();
                onOpenVisualizer(product.id);
              }}
              title="Test in Room Visualizer"
              className="p-2.5 bg-studio-900 hover:bg-studio-800 text-white rounded shadow-md transition-colors"
            >
              <Sparkles className="w-4 h-4 text-studio-200" />
            </button>
          )}

          <button
            onClick={handleQuickAdd}
            title="Quick Add to Bag"
            className="p-2.5 bg-studio-900 hover:bg-studio-800 text-white rounded shadow-md transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-studio-500 mb-1">
            <span className="tracking-widest uppercase text-[10px] font-medium text-studio-400">
              {product.tags.slice(0, 2).join(' • ')}
            </span>
            <div className="flex items-center space-x-1 text-studio-700">
              <Star className="w-3 h-3 fill-studio-500 text-studio-500" />
              <span className="font-semibold text-[11px]">{product.rating}</span>
              <span className="text-studio-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-xl text-studio-900 font-normal hover:text-studio-700 cursor-pointer transition-colors leading-snug"
          >
            {product.title}
          </h3>
          <p className="text-xs text-studio-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        <div className="pt-2 border-t border-studio-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-studio-400 block">Acquisition</span>
            <span className="font-serif text-lg text-studio-900 font-semibold">${product.price} USD</span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`text-xs uppercase tracking-wider font-semibold py-1.5 px-3 rounded transition-all ${
              addedAnimation
                ? 'bg-sage-100 text-sage-800 font-bold'
                : 'text-studio-800 hover:text-studio-950 hover:bg-studio-100'
            }`}
          >
            {addedAnimation ? 'Added ✓' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
};
