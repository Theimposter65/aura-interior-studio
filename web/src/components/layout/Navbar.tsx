import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShoppingBag, Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ArtisticTalesLogo } from '../common/ArtisticTalesLogo';
import { calculateSpecularHighlight } from '../../utils/glassPhysics';

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

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const { itemCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [specular, setSpecular] = useState({ percentX: 50, percentY: 50 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const spec = calculateSpecularHighlight(e.clientX - rect.left, e.clientY - rect.top, rect);
    setSpecular({ percentX: spec.percentX, percentY: spec.percentY });
  }, []);

  const navLinks = NAV_LINKS;

  return (
    <>
      {/* Top Refractive Announcement Pill Bar */}
      <div className="bg-studio-950/90 text-studio-100 text-[11px] tracking-wider uppercase py-2 px-4 text-center flex items-center justify-center space-x-3 backdrop-blur-md border-b border-white/10 z-50 relative">
        <span className="hidden sm:inline opacity-80">Goa • Gujarat • Worldwide Commissions</span>
        <span className="hidden sm:inline text-studio-600">•</span>
        <a
          href="https://wa.me/917567979307"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-300 hover:text-amber-200 transition-colors inline-flex items-center space-x-1 font-medium cursor-pointer apple-press"
        >
          <span>Chat with Space Stylist on WhatsApp</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </a>
      </div>

      {/* Floating Apple Liquid Glass Dynamic Island Header */}
      <header className="sticky top-2 z-40 px-4 sm:px-6 transition-all duration-300 apple-nav-edge-mask">
        <div
          ref={navRef}
          onPointerMove={handlePointerMove}
          className={`
            relative max-w-7xl mx-auto rounded-2xl md:rounded-full
            backdrop-blur-2xl saturate-[190%] border border-t-white/80
            transition-all duration-300 overflow-hidden
            ${
              isScrolled
                ? 'bg-white/75 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] border-white/60 py-2.5 px-5 md:px-8'
                : 'bg-white/55 shadow-[0_12px_32px_-10px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.75)] border-white/50 py-3.5 px-6 md:px-10'
            }
          `}
        >
          {/* Moving Specular Caustic Spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(circle 320px at ${specular.percentX}% ${specular.percentY}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
            }}
          />

          {/* Prism Bevel Rim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-full z-10 border border-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),inset_0_-1px_1px_0_rgba(0,0,0,0.05)]"
          />

          <div className="relative z-20 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-studio-900 hover:text-studio-600 transition-colors apple-press rounded-full hover:bg-white/40"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Left Navigation (Desktop) */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.slice(0, 3).map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={link.onClick}
                  className="text-[11px] uppercase tracking-[0.2em] text-studio-700 hover:text-studio-950 font-medium transition-all py-1 px-2.5 rounded-full hover:bg-white/50 apple-press"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Brand Center Monogram Logo */}
            <a href="#" className="flex items-center space-x-2.5 group apple-press">
              <ArtisticTalesLogo size="sm" />
              <div className="text-left">
                <span className="block font-serif text-base md:text-lg tracking-wider text-studio-900 font-medium group-hover:text-studio-700 transition-colors leading-tight">
                  The Artistic Tales
                </span>
                <span className="block text-[8px] uppercase tracking-[0.25em] text-studio-500 font-sans -mt-0.5">
                  Interior Space Stylist
                </span>
              </div>
            </a>

            {/* Right Navigation & Cart (Desktop) */}
            <div className="flex items-center space-x-3.5">
              <nav className="hidden md:flex items-center space-x-6">
                {navLinks.slice(3).map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[11px] uppercase tracking-[0.2em] text-studio-700 hover:text-studio-950 font-medium transition-all py-1 px-2.5 rounded-full hover:bg-white/50 apple-press"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* INR Currency Badge (Liquid Glass Pill) */}
              <div className="hidden lg:flex items-center text-[10px] font-semibold text-studio-800 border border-white/60 rounded-full px-2.5 py-1 bg-white/40 backdrop-blur-md shadow-sm">
                <span>INR (₹)</span>
              </div>

              {/* Style Quiz Action Button */}
              <button
                onClick={onOpenQuiz}
                className="hidden sm:inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-wider px-3.5 py-1.5 bg-white/60 hover:bg-white/80 text-studio-900 rounded-full transition-all border border-white/70 shadow-sm backdrop-blur-md apple-press font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Style Quiz</span>
              </button>

              {/* Cart Trigger */}
              <button
                onClick={openCart}
                className="relative p-2 text-studio-900 hover:text-studio-600 transition-colors rounded-full hover:bg-white/50 apple-press"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-studio-900 text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-fadeIn shadow-sm">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Liquid Crystal Sheet) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-studio-950/50 backdrop-blur-md md:hidden flex animate-fadeIn">
          <div className="w-4/5 max-w-sm bg-white/90 backdrop-blur-2xl h-full p-8 flex flex-col justify-between shadow-2xl border-r border-white/60">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-studio-200/60">
                <div className="flex items-center space-x-2.5">
                  <ArtisticTalesLogo size="sm" />
                  <div>
                    <span className="font-serif text-base tracking-wider block font-semibold text-studio-900">THE ARTISTIC TALES</span>
                    <span className="text-[8px] uppercase tracking-widest text-studio-500 block">Space Stylist</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-studio-700 hover:text-studio-950 apple-press"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-4">
                {navLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      link.onClick?.();
                      setMobileMenuOpen(false);
                    }}
                    className="font-serif text-2xl text-studio-900 hover:text-amber-600 transition-colors py-1 apple-press"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-studio-200/60 space-y-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-4 bg-studio-950 text-white text-xs uppercase tracking-widest flex items-center justify-center space-x-2 rounded-xl apple-press font-medium shadow-md"
                >
                  <span>Book Consultation</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuiz?.();
                  }}
                  className="w-full py-3 px-4 bg-white/80 border border-white/90 text-studio-900 text-xs uppercase tracking-widest flex items-center justify-center space-x-2 rounded-xl apple-press backdrop-blur-md font-medium shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Take Style Quiz</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-studio-500 pt-6 border-t border-studio-200/60 space-y-1">
              <p className="font-medium text-studio-800">Goa • Gujarat • Worldwide Commissions</p>
              <p>thisisartistictales@gmail.com</p>
              <p>+91 75679 79307</p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;
