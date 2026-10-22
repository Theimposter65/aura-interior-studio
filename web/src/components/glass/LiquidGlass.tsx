import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { buildGlassMaps, refractionProfile } from '../../utils/liquidGlassMap';
import { REFRACTIVE_INDEX_BLUE, REFRACTIVE_INDEX_GREEN, REFRACTIVE_INDEX_RED } from '../../utils/glassPhysics';

export type GlassTone = 'clear' | 'light' | 'dark';

export interface LiquidGlassProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render — `button`, `a`, `nav`, `header`… */
  as?: React.ElementType;
  tone?: GlassTone;
  /** Corner radius in px; `'capsule'` follows half the height. */
  radius?: number | 'capsule';
  /** Width of the curved rim in px — the only part of the glass that bends light. */
  bezel?: number;
  /** Glass thickness in px. Thicker glass bends the backdrop further; 0 gives frosted glass with no lensing. */
  thickness?: number;
  /** Backdrop blur (px) applied before refraction. */
  blur?: number;
  /** Grows and brightens under the pointer while pressed — for buttons and other controls. */
  interactive?: boolean;
  // Anchor / button passthroughs for polymorphic use
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

/**
 * SVG filters inside `backdrop-filter` are Chromium-only. WebKit parses the syntax but renders
 * nothing, so `CSS.supports` cannot be trusted — gate on the engine and let others fall back to
 * the frosted material defined in CSS.
 */
const supportsBackdropSvg = (() => {
  if (typeof navigator === 'undefined' || typeof CSS === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Chrome\/\d+/.test(ua) && !/Firefox|FxiOS|CriOS/.test(ua) && CSS.supports('backdrop-filter', 'blur(1px)');
})();

interface BakedGlass {
  displacementUrl: string;
  specularUrl: string;
  /** feDisplacementMap scale per channel — each traced with its own index of refraction. */
  scale: { r: number; g: number; b: number };
}

// Literal class names so Tailwind keeps the layered material rules.
const TONE_CLASS: Record<GlassTone, string> = {
  clear: 'lg-clear',
  light: 'lg-light',
  dark: 'lg-dark',
};

const bakeCache = new Map<string, BakedGlass>();
const BAKE_CACHE_LIMIT = 48;

function toDataUrl(data: Uint8ClampedArray<ArrayBuffer>, width: number, height: number): string | null {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.putImageData(new ImageData(data, width, height), 0, 0);
  return canvas.toDataURL('image/png');
}

function bakeGlass(width: number, height: number, radius: number, bezel: number, thickness: number): BakedGlass | null {
  const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
  const key = `${width}x${height}:${radius}:${bezel}:${thickness}@${dpr}`;
  const cached = bakeCache.get(key);
  if (cached) return cached;

  const maps = buildGlassMaps({ width, height, radius, bezel }, { thickness, ior: REFRACTIVE_INDEX_GREEN }, dpr);
  const displacementUrl = toDataUrl(maps.displacement, maps.width, maps.height);
  const specularUrl = toDataUrl(maps.specular, maps.width, maps.height);
  if (!displacementUrl || !specularUrl) return null;

  // feDisplacementMap shifts by scale × (channel − 0.5); the map spans ±0.5, so scale = 2 × peak shift.
  const peak = (ior: number) => 2 * refractionProfile(bezel, { thickness, ior }).max;
  const baked: BakedGlass = {
    displacementUrl,
    specularUrl,
    scale: { r: peak(REFRACTIVE_INDEX_RED), g: 2 * maps.maxShift, b: peak(REFRACTIVE_INDEX_BLUE) },
  };

  if (bakeCache.size >= BAKE_CACHE_LIMIT) {
    const oldest = bakeCache.keys().next().value;
    if (oldest !== undefined) bakeCache.delete(oldest);
  }
  bakeCache.set(key, baked);
  return baked;
}

export const LiquidGlass = React.forwardRef<HTMLElement, LiquidGlassProps>(function LiquidGlass(
  {
    as: Tag = 'div',
    tone = 'light',
    radius = 'capsule',
    bezel = 18,
    thickness = 16,
    blur = 1.5,
    interactive = false,
    className = '',
    style,
    children,
    onPointerMove,
    onPointerLeave,
    ...rest
  },
  forwardedRef
) {
  const localRef = useRef<HTMLElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [baked, setBaked] = useState<BakedGlass | null>(null);
  const filterId = `lg-${useId().replace(/:/g, '')}`;
  const lensing = supportsBackdropSvg && thickness > 0;

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef]
  );

  useLayoutEffect(() => {
    const node = localRef.current;
    if (!node || !lensing) return;
    const measure = () => {
      const w = Math.round(node.offsetWidth);
      const h = Math.round(node.offsetHeight);
      setSize(prev => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [lensing]);

  useEffect(() => {
    if (!lensing || !size || size.w < 4 || size.h < 4) return;
    const r = radius === 'capsule' ? size.h / 2 : radius;
    const b = Math.min(bezel, size.h / 2, size.w / 2);
    setBaked(bakeGlass(size.w, size.h, r, b, thickness));
  }, [lensing, size, radius, bezel, thickness]);

  // Specular glint follows the pointer through CSS variables — no re-render per move.
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const node = localRef.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--lg-x', `${e.clientX - rect.left}px`);
      node.style.setProperty('--lg-y', `${e.clientY - rect.top}px`);
      node.style.setProperty('--lg-glow', '1');
    }
    onPointerMove?.(e);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    localRef.current?.style.setProperty('--lg-glow', '0');
    onPointerLeave?.(e);
  };

  const radiusCss = radius === 'capsule' ? '9999px' : `${radius}px`;
  const active = lensing && size && baked;

  return (
    <Tag
      ref={setRefs}
      className={`lg ${TONE_CLASS[tone]} ${active ? 'lg-lensed' : ''} ${interactive ? 'lg-interactive' : ''} ${className}`}
      style={{
        borderRadius: radiusCss,
        ...(active ? { backdropFilter: `url(#${filterId})`, WebkitBackdropFilter: `url(#${filterId})` } : null),
        ...style,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      {active && (
        <svg aria-hidden="true" className="lg-defs" width="0" height="0">
          <filter
            id={filterId}
            x="0"
            y="0"
            width={size.w}
            height={size.h}
            filterUnits="userSpaceOnUse"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="frost" />
            <feImage href={baked.displacementUrl} x="0" y="0" width={size.w} height={size.h} preserveAspectRatio="none" result="field" />
            {/* Dispersion: each channel refracts with its own index, fringing the rim like a prism */}
            <feDisplacementMap in="frost" in2="field" scale={baked.scale.r} xChannelSelector="R" yChannelSelector="G" result="dispR" />
            <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feDisplacementMap in="frost" in2="field" scale={baked.scale.g} xChannelSelector="R" yChannelSelector="G" result="dispG" />
            <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feDisplacementMap in="frost" in2="field" scale={baked.scale.b} xChannelSelector="R" yChannelSelector="G" result="dispB" />
            <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" result="refracted" />
            <feColorMatrix in="refracted" type="saturate" values="1.4" result="vivid" />
            {/* Fresnel rim reflection + key-light glint, traced from the same bevel normals */}
            <feImage href={baked.specularUrl} x="0" y="0" width={size.w} height={size.h} preserveAspectRatio="none" result="specular" />
            <feComposite in="specular" in2="vivid" operator="over" />
          </filter>
        </svg>
      )}
      {children}
    </Tag>
  );
});

export default LiquidGlass;
