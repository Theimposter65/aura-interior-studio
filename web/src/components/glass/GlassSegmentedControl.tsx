import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { criticallyDampedSpring } from '../../utils/appleSpringPhysics';
import { LiquidGlass, GlassTone } from './LiquidGlass';

export interface SegmentOption {
  key: string;
  label: string;
}

interface GlassSegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (key: string) => void;
  tone?: GlassTone;
  label: string;
  className?: string;
}

const RESPONSE = 0.32; // seconds — Apple's default UI spring, critically damped (no overshoot)
const EPSILON = 0.25;

interface Axis {
  pos: number;
  vel: number;
  target: number;
}

/**
 * Glass tab bar whose selection droplet glides between segments. Position and width are two
 * independent springs that always start from their live values, so a new selection mid-flight
 * redirects the droplet without a jump.
 */
export const GlassSegmentedControl: React.FC<GlassSegmentedControlProps> = ({
  options,
  value,
  onChange,
  tone = 'dark',
  label,
  className = '',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());
  const x = useRef<Axis>({ pos: 0, vel: 0, target: 0 });
  const w = useRef<Axis>({ pos: 0, vel: 0, target: 0 });
  const frame = useRef(0);
  const lastTime = useRef(0);

  const paint = () => {
    const el = indicatorRef.current;
    if (!el) return;
    el.style.transform = `translateX(${x.current.pos}px)`;
    el.style.width = `${w.current.pos}px`;
  };

  const step = useCallback((now: number) => {
    const dt = Math.min(0.064, (now - lastTime.current) / 1000 || 0.016);
    lastTime.current = now;
    let settled = true;
    for (const axis of [x.current, w.current]) {
      const next = criticallyDampedSpring(axis.pos, axis.target, axis.vel, RESPONSE, dt);
      axis.pos = next.position;
      axis.vel = next.velocity;
      if (Math.abs(axis.pos - axis.target) > EPSILON || Math.abs(axis.vel) > EPSILON) settled = false;
      else {
        axis.pos = axis.target;
        axis.vel = 0;
      }
    }
    paint();
    frame.current = settled ? 0 : requestAnimationFrame(step);
  }, []);

  const moveTo = useCallback(
    (key: string, animate: boolean) => {
      const btn = buttonRefs.current.get(key);
      if (!btn) return;
      x.current.target = btn.offsetLeft;
      w.current.target = btn.offsetWidth;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!animate || reduced || w.current.pos === 0) {
        x.current = { pos: x.current.target, vel: 0, target: x.current.target };
        w.current = { pos: w.current.target, vel: 0, target: w.current.target };
        paint();
        return;
      }
      if (!frame.current) {
        lastTime.current = performance.now();
        frame.current = requestAnimationFrame(step);
      }
    },
    [step]
  );

  useLayoutEffect(() => {
    moveTo(value, true);
    const btn = buttonRefs.current.get(value);
    const track = trackRef.current;
    if (btn && track) {
      const left = btn.offsetLeft - (track.clientWidth - btn.offsetWidth) / 2;
      track.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }, [value, moveTo]);

  // Re-measure on layout changes only. Observing once (not per selection) matters: a fresh
  // observer fires immediately, which would snap the droplet and cut the spring short.
  const valueRef = useRef(value);
  valueRef.current = value;
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => moveTo(valueRef.current, false));
    observer.observe(track);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [moveTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const index = options.findIndex(o => o.key === value);
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = options[(index + delta + options.length) % options.length];
    onChange(next.key);
    buttonRefs.current.get(next.key)?.focus();
  };

  const dark = tone === 'dark';

  return (
    <LiquidGlass tone={tone} thickness={0} className={`p-1 max-w-full ${className}`}>
      <div
        ref={trackRef}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="relative flex overflow-x-auto no-scrollbar rounded-full"
      >
        <span
          ref={indicatorRef}
          aria-hidden="true"
          className={`absolute left-0 top-0 bottom-0 rounded-full will-change-transform ${
            dark
              ? 'bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_10px_rgba(0,0,0,0.3)]'
              : 'bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,1)]'
          }`}
        />
        {options.map(option => {
          const selected = option.key === value;
          return (
            <button
              key={option.key}
              ref={node => {
                if (node) buttonRefs.current.set(option.key, node);
                else buttonRefs.current.delete(option.key);
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(option.key)}
              // Weight stays constant across states so a segment never changes width under the droplet.
              className={`relative z-10 shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200 apple-press ${
                selected
                  ? dark ? 'text-white' : 'text-studio-900'
                  : dark ? 'text-white/65 hover:text-white' : 'text-studio-600 hover:text-studio-900'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </LiquidGlass>
  );
};

export default GlassSegmentedControl;
