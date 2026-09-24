import React, { useState } from 'react';
import { X, Star, Sparkles, ShoppingBag, ShieldCheck, Check, Truck, Clock, Compass } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenVisualizer?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenVisualizer
}) => {
  const { addToCart } = useCart();
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'curator'>('details');
  const [selectedDimension, setSelectedDimension] = useState(product.dimensions?.[0] || 'Standard');
  const [selectedFrame, setSelectedFrame] = useState(product.frames?.[0] || 'Frameless');
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, {
      dimension: selectedDimension,
      frame: selectedFrame,
      quantity
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-studio-900/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-studio-50 w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden z-10 border border-studio-200 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 hover:bg-white text-studio-900 rounded-full shadow-sm backdrop-blur-sm transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
          {/* Left Visual Gallery */}
          <div className="md:col-span-6 bg-studio-100 flex flex-col justify-between p-6">
            <div className="relative aspect-[4/5] w-full rounded overflow-hidden bg-white shadow-frame">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span className="absolute top-3 left-3 bg-studio-900/80 backdrop-blur-sm text-white text-[9px] uppercase tracking-widest px-2.5 py-1 rounded">
                {product.category.replace('-', ' ')}
              </span>
            </div>

            {/* Thumbnail switcher if context image exists */}
            {product.roomContextImage && (
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                    activeImage === product.image ? 'border-studio-900 scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={product.image} alt="Artwork" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveImage(product.roomContextImage)}
                  className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                    activeImage === product.roomContextImage ? 'border-studio-900 scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={product.roomContextImage} alt="Room Context" className="w-full h-full object-cover" />
                </button>
              </div>
            )}
          </div>

          {/* Right Product Information */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto max-h-[85vh]">
            <div>
              <div className="flex items-center space-x-2 text-xs text-studio-500 mb-2">
                <div className="flex items-center text-studio-600">
                  <Star className="w-3.5 h-3.5 fill-studio-500 text-studio-500" />
                  <span className="font-semibold text-studio-900 ml-1">{product.rating}</span>
                </div>
                <span>•</span>
                <span className="underline cursor-pointer">{product.reviewsCount} Atelier Reviews</span>
              </div>

              <h2 className="font-serif text-3xl text-studio-900 font-normal leading-tight">
                {product.title}
              </h2>
              <p className="text-xs text-studio-500 mt-1 uppercase tracking-wider">
                {product.subtitle}
              </p>

              <div className="mt-4 flex items-baseline space-x-3">
                <span className="font-serif text-2xl font-semibold text-studio-900">
                  ${product.price} USD
                </span>
                <span className="text-[11px] text-sage-700 bg-sage-50 px-2 py-0.5 rounded font-medium">
                  Free Shipping Included
                </span>
              </div>

              {/* Tabs: Details / Technical Specs / Curator */}
              <div className="flex space-x-6 border-b border-studio-200 mt-6 text-xs uppercase tracking-wider font-medium">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 transition-colors border-b-2 ${
                    activeTab === 'details' ? 'border-studio-900 text-studio-900' : 'border-transparent text-studio-400 hover:text-studio-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 transition-colors border-b-2 ${
                    activeTab === 'specs' ? 'border-studio-900 text-studio-900' : 'border-transparent text-studio-400 hover:text-studio-700'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('curator')}
                  className={`pb-2.5 transition-colors border-b-2 ${
                    activeTab === 'curator' ? 'border-studio-900 text-studio-900' : 'border-transparent text-studio-400 hover:text-studio-700'
                  }`}
                >
                  Features & Notes
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-4 text-xs text-studio-600 leading-relaxed min-h-[90px]">
                {activeTab === 'details' && (
                  <p>{product.description}</p>
                )}
                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    <p><strong className="text-studio-800">Material:</strong> {product.architecturalDetails?.material || 'Archival substrate'}</p>
                    <p><strong className="text-studio-800">Finish:</strong> {product.architecturalDetails?.finish || 'Museum ultra-matte'}</p>
                    <p><strong className="text-studio-800">Origin:</strong> {product.architecturalDetails?.origin || 'AURA Studios'}</p>
                    <p><strong className="text-studio-800">Lead Time:</strong> {product.architecturalDetails?.leadTime || 'Handcrafted to order'}</p>
                  </div>
                )}
                {activeTab === 'curator' && (
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.features.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Dimension Selection */}
              {product.dimensions && product.dimensions.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-studio-700 block">
                    Select Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.dimensions.map(dim => (
                      <button
                        key={dim}
                        onClick={() => setSelectedDimension(dim)}
                        className={`text-xs px-3 py-1.5 rounded border transition-all ${
                          selectedDimension === dim
                            ? 'bg-studio-900 text-white border-studio-900 font-medium'
                            : 'bg-white text-studio-700 border-studio-200 hover:border-studio-400'
                        }`}
                      >
                        {dim}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Frame Selection */}
              {product.frames && product.frames.length > 0 && (
                <div className="space-y-2 pt-3">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-studio-700 block">
                    Select Frame Finish:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.frames.map(frame => (
                      <button
                        key={frame}
                        onClick={() => setSelectedFrame(frame)}
                        className={`text-xs px-3 py-1.5 rounded border transition-all ${
                          selectedFrame === frame
                            ? 'bg-studio-900 text-white border-studio-900 font-medium'
                            : 'bg-white text-studio-700 border-studio-200 hover:border-studio-400'
                        }`}
                      >
                        {frame}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions & Guarantee */}
            <div className="space-y-4 pt-4 border-t border-studio-200">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 bg-studio-900 hover:bg-studio-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                </button>

                {product.category === 'wall-designs' && onOpenVisualizer && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenVisualizer(product.id);
                    }}
                    className="py-3.5 px-4 border border-studio-900 text-studio-900 hover:bg-studio-100 text-xs uppercase tracking-widest font-semibold rounded-sm transition-colors flex items-center space-x-1.5"
                    title="Preview in Room Visualizer"
                  >
                    <Sparkles className="w-4 h-4 text-studio-600" />
                    <span className="hidden sm:inline">Try in Room</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-studio-500 pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
                  <span>100-Year Quality Guarantee</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Truck className="w-3.5 h-3.5 text-studio-500" />
                  <span>Insured Tracked Delivery</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
