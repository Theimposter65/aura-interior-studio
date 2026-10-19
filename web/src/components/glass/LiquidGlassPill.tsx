import React from 'react';

export interface LiquidGlassPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  variant?: 'light' | 'dark' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const LiquidGlassPill: React.FC<LiquidGlassPillProps> = ({
  active = false,
  variant = 'light',
  size = 'md',
  icon,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-[11px] gap-1.5',
    md: 'px-4 py-2 text-xs gap-2',
    lg: 'px-5 py-2.5 text-xs gap-2.5',
  }[size];

  const variantClasses = {
    light: active
      ? 'bg-white/85 text-studio-950 border-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] font-medium'
      : 'bg-white/35 hover:bg-white/55 text-studio-700 hover:text-studio-950 border-white/45 shadow-[0_2px_10px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.6)]',
    dark: active
      ? 'bg-white/25 text-white border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)] font-medium'
      : 'bg-white/10 hover:bg-white/20 text-studio-200 hover:text-white border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]',
    amber: active
      ? 'bg-amber-400 text-studio-950 border-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.3)] font-semibold'
      : 'bg-amber-400/20 hover:bg-amber-400/30 text-amber-900 border-amber-300/40 shadow-[0_2px_10px_rgba(245,158,11,0.1)]',
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        glass-frosted-pill inline-flex items-center justify-center rounded-full
        backdrop-blur-xl saturate-[180%] border
        transition-all duration-200 ease-out
        apple-press tracking-wide cursor-pointer
        ${sizeClasses}
        ${variantClasses}
        ${className}
      `}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default LiquidGlassPill;
