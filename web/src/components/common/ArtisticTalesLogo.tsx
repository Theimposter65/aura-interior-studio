import React, { useState } from 'react';
import bundledLogo from '../../assets/logo.png';

interface ArtisticTalesLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  showText?: boolean;
  className?: string;
}

const CDN_FALLBACK = 'https://lh3.googleusercontent.com/d/1M9LffbMinvbR_OzRaY_rCkXDso3jU9U8=s1000';

export const ArtisticTalesLogo: React.FC<ArtisticTalesLogoProps> = ({
  size = 'md',
  showTagline = false,
  showText = false,
  className = ''
}) => {
  const [srcIndex, setSrcIndex] = useState(0);

  // Fallback chain
  const sources = [
    bundledLogo,
    CDN_FALLBACK,
    './assets/real_logo.png',
    './logo.png'
  ];

  const currentSrc = sources[srcIndex] || CDN_FALLBACK;

  const handleImgError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(prev => prev + 1);
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10 sm:w-11 sm:h-11',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40'
  }[size];

  const taglineSize = {
    sm: 'text-[8px] tracking-[0.25em]',
    md: 'text-[10px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.4em]'
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Circular Emblem with Ambient Glow */}
      <div className={`relative ${sizeClasses} group cursor-pointer flex items-center justify-center`}>
        {/* Ambient Warm Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/30 via-purple-600/25 to-amber-500/25 rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Circular Frame */}
        <div className="relative w-full h-full rounded-full overflow-hidden p-0.5 bg-studio-950 border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-105">
          <img
            src={currentSrc}
            alt="The Artistic Tales Official Logo"
            onError={handleImgError}
            className="w-full h-full object-cover rounded-full filter drop-shadow-md"
            loading="eager"
          />
        </div>
      </div>

      {/* Brand Text if requested */}
      {showText && (
        <div className="mt-3 text-center">
          <span className="block font-serif text-xl sm:text-2xl text-studio-900 font-medium tracking-wide">
            The Artistic Tales
          </span>
          <span className="block text-[9px] uppercase tracking-[0.25em] text-studio-500 font-sans mt-0.5">
            Interior Space Stylist
          </span>
        </div>
      )}

      {/* Tagline */}
      {showTagline && (
        <span className={`block font-serif font-medium text-studio-300 mt-3 uppercase tracking-[0.35em] ${taglineSize}`}>
          WALLS THAT REMEMBER
        </span>
      )}
    </div>
  );
};

export default ArtisticTalesLogo;
