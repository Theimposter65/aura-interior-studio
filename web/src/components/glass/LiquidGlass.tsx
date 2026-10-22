import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { acquireGlass, glassKey, type BakedGlass } from '../../utils/glassBaker';
import type { GlassBakeRequest } from '../../utils/glassBakeCore';
import { hasGpuAcceleration } from '../../utils/renderCapability';

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
  /** Backdrop blur (px) applied before refraction — run by the compositor's blur, not the SVG filter. */
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
 * the frosted material defined in CSS. Live refraction also needs a GPU compositor: rasterised on
 * the CPU it re-filters the moving backdrop every frame and halves scrolling, so software-rendered
 * browsers get the frosted material too.
 */
const supportsLensing = (() => {
  if (typeof navigator === 'undefined' || typeof CSS === 'undefined') return false;
  const ua = navigator.userAgent;
  const chromium = /Chrome\/\d+/.test(ua) && !/Firefox|FxiOS|CriOS/.test(ua) && CSS.supports('backdrop-filter', 'blur(1px)');
  return chromium && hasGpuAcceleration();
})();

/**
 * Chromium cannot compute output bounds for `url()` backdrop filters, so it never culls them:
 * every lensed surface re-runs its filter on every frame, on screen or not. Lensing is therefore
 * attached only while a surface is near the viewport; elsewhere it rests as frosted glass. The
 * margin swaps the material in before the surface scrolls into view.
 */
const VIEWPORT_MARGIN = '200px 0px';

// Literal class names so Tailwind keeps the layered material rules.
const TONE_CLASS: Record<GlassTone, string> = {
  clear: 'lg-clear',
  light: 'lg-light',
  dark: 'lg-dark',
};

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
  const [inView, setInView] = useState(false);
  const [baked, setBaked] = useState<BakedGlass | null>(null);
  const filterId = `lg-${useId().replace(/:/g, '')}`;
  const lensing = supportsLensing && thickness > 0;

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
    const resize = new ResizeObserver(measure);
    resize.observe(node);
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: VIEWPORT_MARGIN,
    });
    visibility.observe(node);
    return () => {
      resize.disconnect();
      visibility.disconnect();
    };
  }, [lensing]);

  const request: GlassBakeRequest | null =
    lensing && size && size.w >= 4 && size.h >= 4
      ? {
          width: size.w,
          height: size.h,
          radius: radius === 'capsule' ? size.h / 2 : radius,
          bezel: Math.min(bezel, size.h / 2, size.w / 2),
          thickness,
          scale: Math.min(2, Math.max(1, window.devicePixelRatio || 1)),
        }
      : null;
  const key = request ? glassKey(request) : null;
  const requestRef = useRef(request);
  requestRef.current = request;

  // Borrow maps only while near the viewport; identical surfaces share one bake in the worker.
  // `key` encodes every field of the request, so it alone decides when to re-acquire.
  useEffect(() => {
    const current = requestRef.current;
    if (!current || !inView) return;
    let cancelled = false;
    const { promise, release } = acquireGlass(current);
    promise.then(
      result => !cancelled && setBaked(result),
      () => !cancelled && setBaked(null) // bake failed: stay on the frosted material
    );
    return () => {
      cancelled = true;
      release();
    };
  }, [key, inView]);

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
  const lens = inView && size && baked && baked.key === key ? baked : null;

  return (
    <Tag
      ref={setRefs}
      className={`lg ${TONE_CLASS[tone]} ${lens ? 'lg-lensed' : ''} ${interactive ? 'lg-interactive' : ''} ${className}`}
      style={{
        borderRadius: radiusCss,
        // Blur in the CSS filter list takes Chromium's fast compositor blur path (an SVG
        // feGaussianBlur in the same chain is several times slower) and samples past the edges
        // instead of fading to transparent, so the SVG filter is left with only the optics.
        ...(lens
          ? { backdropFilter: `blur(${blur}px) url(#${filterId})`, WebkitBackdropFilter: `blur(${blur}px) url(#${filterId})` }
          : null),
        ...style,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      {lens && size && (
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
            <feImage href={lens.displacementUrl} x="0" y="0" width={size.w} height={size.h} preserveAspectRatio="none" result="field" />
            {lens.channelScales ? (
              <>
                {/* Visible dispersion: each channel refracts with its own index, fringing the rim like a prism */}
                <feDisplacementMap in="SourceGraphic" in2="field" scale={lens.channelScales.r} xChannelSelector="R" yChannelSelector="G" result="dispR" />
                <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
                <feDisplacementMap in="SourceGraphic" in2="field" scale={lens.channelScales.g} xChannelSelector="R" yChannelSelector="G" result="dispG" />
                <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
                <feDisplacementMap in="SourceGraphic" in2="field" scale={lens.channelScales.b} xChannelSelector="R" yChannelSelector="G" result="dispB" />
                <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
                <feBlend in="r" in2="g" mode="screen" result="rg" />
                <feBlend in="rg" in2="b" mode="screen" result="refracted" />
              </>
            ) : (
              <feDisplacementMap in="SourceGraphic" in2="field" scale={lens.scale} xChannelSelector="R" yChannelSelector="G" result="refracted" />
            )}
            <feColorMatrix in="refracted" type="saturate" values="1.4" result="vivid" />
            {/* Fresnel rim reflection + key-light glint, traced from the same bevel normals */}
            <feImage href={lens.specularUrl} x="0" y="0" width={size.w} height={size.h} preserveAspectRatio="none" result="specular" />
            <feComposite in="specular" in2="vivid" operator="over" />
          </filter>
        </svg>
      )}
      {children}
    </Tag>
  );
});

export default LiquidGlass;
