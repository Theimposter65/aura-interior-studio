import React from 'react';

/**
 * Floating Ambient Light Orbs with Organic Sinusoidal Motion
 * Provides background light sources that refract and disperse through Liquid Glass components.
 */
export const LiquidBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Primary Warm Champagne Orb (Top-Right) */}
      <div
        className="absolute -top-[10%] -right-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full opacity-40 blur-[90px] mix-blend-multiply filter"
        style={{
          background: 'radial-gradient(circle, rgba(230, 200, 160, 0.75) 0%, rgba(200, 161, 125, 0.35) 55%, transparent 75%)',
          animation: 'liquidFloat 18s ease-in-out infinite alternate',
        }}
      />

      {/* Secondary Ethereal Amber/Gold Orb (Center-Left) */}
      <div
        className="absolute top-[35%] -left-[15%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full opacity-35 blur-[100px] mix-blend-multiply filter"
        style={{
          background: 'radial-gradient(circle, rgba(245, 200, 105, 0.65) 0%, rgba(217, 130, 91, 0.3) 50%, transparent 75%)',
          animation: 'liquidFloatReverse 22s ease-in-out infinite alternate',
        }}
      />

      {/* Tertiary Soft Terracotta / Rose Quartz Orb (Bottom-Right) */}
      <div
        className="absolute top-[65%] -right-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full opacity-30 blur-[110px] mix-blend-multiply filter"
        style={{
          background: 'radial-gradient(circle, rgba(217, 130, 91, 0.5) 0%, rgba(197, 160, 89, 0.25) 50%, transparent 80%)',
          animation: 'liquidFloat 25s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* Deep Obsidian Glow (Bottom-Left) */}
      <div
        className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full opacity-20 blur-[95px] mix-blend-multiply filter"
        style={{
          background: 'radial-gradient(circle, rgba(160, 140, 120, 0.5) 0%, rgba(100, 85, 75, 0.2) 60%, transparent 80%)',
          animation: 'liquidFloatReverse 20s ease-in-out infinite alternate',
        }}
      />

      {/* Keyframe Styles for Organic Sinusoidal Motion */}
      <style>{`
        @keyframes liquidFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(40px, -60px, 0) scale(1.08);
          }
          100% {
            transform: translate3d(-30px, 45px, 0) scale(0.95);
          }
        }
        @keyframes liquidFloatReverse {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-50px, 50px, 0) scale(1.05);
          }
          100% {
            transform: translate3d(35px, -35px, 0) scale(0.92);
          }
        }
      `}</style>
    </div>
  );
};

export default LiquidBackground;
