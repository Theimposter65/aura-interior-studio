import React, { useState } from 'react';
import bundledLogo from '../../assets/logo.png';

interface ArtisticTalesLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
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
    xs: 'w-9 h-9',
    sm: 'w-10 h-10 sm:w-11 sm:h-11',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40'
  }[size];

  const taglineSize = {
    xs: 'text-[11px]',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-[17px]'
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Circular emblem */}
      <div className={`relative ${sizeClasses} flex items-center justify-center`}>
        <div className="relative w-full h-full rounded-full overflow-hidden bg-studio-950 ring-1 ring-black/10">
          <img
            src={currentSrc}
            alt="The Artistic Tales logo"
            onError={handleImgError}
            className="w-full h-full object-cover rounded-full"
            loading="eager"
          />
        </div>
      </div>

      {/* Brand Text if requested */}
      {showText && (
        <div className="mt-3 text-center">
          <span className="block type-title text-studio-900">
            The Artistic Tales
          </span>
          <span className="block type-callout text-studio-600 mt-0.5">
            Interior space stylist
          </span>
        </div>
      )}

      {/* Tagline */}
      {showTagline && (
        <span className={`block font-semibold text-studio-500 mt-3 ${taglineSize}`}>
          Walls that remember
        </span>
      )}
    </div>
  );
};

export default ArtisticTalesLogo;
