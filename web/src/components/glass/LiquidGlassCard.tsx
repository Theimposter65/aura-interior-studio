import React, { useRef, useState, useCallback, useEffect } from 'react';
import { calculateTiltAngles, calculateSpecularHighlight } from '../../utils/glassPhysics';

export interface LiquidGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'crystal' | 'metallic';
  interactive?: boolean;
  maxTilt?: number;
  glassThickness?: number;
  className?: string;
  children: React.ReactNode;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  variant = 'light',
  interactive = true,
  maxTilt = 6,
  className = '',
  children,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [specular, setSpecular] = useState({ percentX: 50, percentY: 50, intensity: 0, fresnel: 0.04 });
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef<number | null>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    rafId.current = requestAnimationFrame(() => {
      const angles = prefersReducedMotion
        ? { rotateX: 0, rotateY: 0 }
        : calculateTiltAngles(pointerX, pointerY, rect, maxTilt);
      const spec = calculateSpecularHighlight(pointerX, pointerY, rect);
      setTilt(angles);
      setSpecular(spec);
    });
  }, [interactive, maxTilt]);

  const handlePointerEnter = useCallback(() => {
    if (interactive) setIsHovered(true);
  }, [interactive]);

  const handlePointerLeave = useCallback(() => {
    if (!interactive) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setIsHovered(false);
    // Critically damped spring settle back to flat resting orientation
    setTilt({ rotateX: 0, rotateY: 0 });
    setSpecular({ percentX: 50, percentY: 50, intensity: 0, fresnel: 0.04 });
  }, [interactive]);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Variant styling
  const variantStyles = {
    light: 'bg-white/45 text-studio-900 border-white/50 shadow-[0_12px_36px_-10px_rgba(0,0,0,0.08)]',
    dark: 'bg-studio-950/70 text-white border-white/15 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)]',
    crystal: 'bg-white/30 text-studio-900 border-white/60 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.12)]',
    metallic: 'bg-gradient-to-br from-amber-500/10 via-white/40 to-studio-900/10 text-studio-900 border-amber-200/50 shadow-[0_16px_40px_-10px_rgba(197,160,89,0.15)]',
  }[variant];

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: interactive
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
          : undefined,
        transition: isHovered
          ? 'transform 60ms ease-out'
          : 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`
        relative rounded-xl border backdrop-blur-2xl saturate-[190%]
        overflow-hidden will-change-transform ${variant === 'dark' ? 'liquid-glass-dark' : 'liquid-glass-light'} ${variantStyles} ${className}
      `}
      {...rest}
    >
      {/* Specular Spotlight & Fresnel Glare Layer */}
      {interactive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 380px at ${specular.percentX}% ${specular.percentY}%, rgba(255, 255, 255, ${
              variant === 'dark' ? 0.16 : 0.4
            }), rgba(255, 255, 255, ${
              variant === 'dark' ? 0.04 : 0.1
            }) 40%, transparent 80%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Chromatic Edge Prism Caustics */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl z-20 border border-white/40 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.7),inset_1px_0_2px_0_rgba(120,205,255,0.2),inset_-1px_0_2px_0_rgba(255,160,215,0.18)]"
      />

      {/* Card Content */}
      <div className="relative z-30">{children}</div>
    </div>
  );
};

export const LiquidGlassContainer = LiquidGlassCard;
export default LiquidGlassCard;
