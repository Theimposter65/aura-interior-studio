import React from 'react';

/**
 * Optical SVG Filters for Physical Refraction and Acrylic Micro-Surface Noise
 * Injects procedural displacement maps based on Snell's Law and dispersion.
 */
export const LiquidGlassFilter: React.FC = () => {
  return (
    <svg
      aria-hidden="true"
      className="fixed pointer-events-none -left-[9999px] -top-[9999px] w-0 h-0 opacity-0 overflow-hidden"
    >
      <defs>
        {/* Optical Lens Refraction Filter: Warps pixels through physical distortion */}
        <filter id="liquid-refraction-lens" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.012"
            numOctaves="2"
            seed="42"
            result="noiseMap"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noiseMap"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refractedOutput"
          />
          <feBlend in="SourceGraphic" in2="refractedOutput" mode="normal" />
        </filter>

        {/* Micro-Surface Frosted Grain: Optical acrylic scattering texture */}
        <filter id="liquid-frosted-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
            result="fineGrain"
          />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.95
              0 0 0 0 0.95
              0 0 0 0 0.95
              0 0 0 0.045 0"
            result="tintedGrain"
          />
          <feBlend in="SourceGraphic" in2="tintedGrain" mode="screen" />
        </filter>

        {/* Chromatic Caustic Fringe for Crystal Edges */}
        <linearGradient id="chromatic-rim-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
          <stop offset="35%" stopColor="rgba(120, 205, 255, 0.45)" />
          <stop offset="70%" stopColor="rgba(255, 160, 215, 0.45)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.9)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LiquidGlassFilter;
