import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ArtisticTalesLogo } from '../common/ArtisticTalesLogo';
import { LiquidGlass } from '../glass/LiquidGlass';

export interface NavLinkItem {
  label: string;
  href: string;
  onClick?: () => void;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenQuiz?: () => void;
}

/**
 * Glass adapts to what sits beneath it: sections marked `data-nav-theme="dark"` flip the bar to
 * the dark material with light labels, exactly like system chrome over dark content.
 */
function useThemeBeneath(barRef: React.RefObject<HTMLElement>): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const bar = barRef.current?.getBoundingClientRect();
      const probeY = bar ? bar.top + bar.height / 2 : 40;
      const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      let next: 'light' | 'dark' = 'light';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          next = section.dataset.navTheme === 'dark' ? 'dark' : 'light';
        }
      });
      setTheme(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [barRef]);
  return theme;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const theme = useThemeBeneath(barRef);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dark = theme === 'dark';

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const label = dark ? 'text-white/90 hover:text-white' : 'text-studio-900/80 hover:text-studio-900';
  const iconButton = `relative grid place-items-center w-9 h-9 rounded-full transition-colors apple-press ${
    dark ? 'text-white hover:bg-white/15' : 'text-studio-900 hover:bg-black/5'
  }`;

  return (
    <>
      {/* Ribbon */}
      <div className="relative z-50 bg-studio-50 text-center px-4 py-2.5 type-callout text-studio-900">
        <span className="hidden sm:inline text-studio-600">Goa · Gujarat · Worldwide commissions. </span>
        <a
          href="https://wa.me/917567979307"
          target="_blank"
          rel="noopener noreferrer"
          className="link-chevron"
        >
          Chat with a space stylist on WhatsApp
          <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Floating glass bar — zero-height sticky rail so content scrolls beneath the glass */}
      <div className="sticky top-3 z-40 h-0 px-3 sm:px-6">
        <LiquidGlass
          ref={barRef}
          as="header"
          tone={dark ? 'dark' : 'light'}
          bezel={22}
          thickness={40}
          blur={4}
          className={`mx-auto max-w-5xl h-14 pl-2 pr-2 sm:pl-3 flex items-center justify-between gap-2 transition-colors duration-300 ${
            dark ? 'text-white' : 'text-studio-900'
          }`}
        >
          <a href="#" className="flex items-center gap-2.5 rounded-full pr-2 apple-press" aria-label="The Artistic Tales — home">
            <ArtisticTalesLogo size="xs" />
            <span className="font-display text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap">
              The Artistic Tales
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className={`px-3 py-1.5 rounded-full text-[13px] tracking-[-0.005em] transition-colors ${label} ${
                  dark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onOpenQuiz}
              className={`hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-medium apple-press transition-colors ${
                dark ? 'bg-white/15 hover:bg-white/25 text-white' : 'bg-black/5 hover:bg-black/10 text-studio-900'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${dark ? 'text-accent-light' : 'text-accent'}`} />
              Style quiz
            </button>

            <button type="button" onClick={openCart} className={iconButton} aria-label={`Shopping bag, ${itemCount} items`}>
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.7]" />
              {itemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-accent text-white text-[10px] font-semibold grid place-items-center animate-fadeIn">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(open => !open)}
              className={`md:hidden ${iconButton}`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </LiquidGlass>

        {/* Mobile menu — grows out of the bar that summoned it */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 -z-10 md:hidden" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
            <LiquidGlass
              id="mobile-menu"
              tone="light"
              radius={28}
              bezel={22}
              thickness={0}
              className="md:hidden mx-auto max-w-5xl mt-2 p-3 text-studio-900 apple-materialize origin-top !bg-white/80"
              style={{ backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)' }}
            >
              <nav aria-label="Mobile" className="flex flex-col">
                {NAV_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      link.onClick?.();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl text-[19px] font-semibold tracking-[-0.015em] hover:bg-black/5 apple-press"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-studio-400" />
                  </a>
                ))}
              </nav>
              <div className="grid grid-cols-2 gap-2 p-1 pt-3 mt-2 border-t border-black/5">
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-sm">
                  Book a consultation
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuiz?.();
                  }}
                  className="btn btn-quiet btn-sm"
                >
                  Style quiz
                </button>
              </div>
            </LiquidGlass>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
