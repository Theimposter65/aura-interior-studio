import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Menu, X, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface NavbarProps {
  onOpenQuiz?: () => void;
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz, onSelectCategory }) => {
  const { itemCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; href: string; onClick?: () => void }[] = [
    { label: 'Gallery', href: '#gallery' },
    { label: 'Services', href: '#services' },
    { label: 'Visualizer', href: '#visualizer' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-studio-900 text-studio-100 text-xs tracking-wider uppercase py-2 px-4 text-center flex items-center justify-center space-x-3">
        <span className="hidden sm:inline opacity-80">Goa • Gujarat • Worldwide Commissions</span>
        <span className="hidden sm:inline text-studio-500">•</span>
        <a
          href="https://wa.me/917567979307"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white transition-colors inline-flex items-center space-x-1 font-medium cursor-pointer"
        >
          <span>Chat with Space Stylist on WhatsApp</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </a>
      </div>

      {/* Main Luxury Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-studio-50/95 backdrop-blur-md shadow-sm py-3.5 border-b border-studio-200/60'
            : 'bg-studio-50/80 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-studio-900 hover:text-studio-600 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.slice(0, 3).map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className="text-xs uppercase tracking-widest text-studio-700 hover:text-studio-950 font-medium transition-colors hover:underline underline-offset-8"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Brand Center Monogram Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <img
              src="./assets/real_logo.png"
              alt="The Artistic Tales Logo"
              className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="text-left">
              <span className="block font-serif text-lg md:text-xl tracking-wider text-studio-900 font-medium group-hover:text-studio-700 transition-colors leading-tight">
                The Artistic Tales
              </span>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-studio-500 font-sans -mt-0.5">
                Interior Space Stylist
              </span>
            </div>
          </a>

          {/* Right Navigation & Cart (Desktop) */}
          <div className="flex items-center space-x-5">
            <nav className="hidden md:flex items-center space-x-7">
              {navLinks.slice(3).map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-studio-700 hover:text-studio-950 font-medium transition-colors hover:underline underline-offset-8"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Currency Selector */}
            <div className="hidden lg:flex items-center text-xs text-studio-600 space-x-1 border border-studio-200 rounded-full px-2.5 py-1">
              {(['USD', 'EUR', 'GBP'] as const).map(curr => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-1.5 py-0.5 rounded text-[10px] tracking-wider transition-all ${
                    currency === curr ? 'bg-studio-900 text-white font-semibold' : 'hover:text-studio-900'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>

            {/* Style Quiz Quick Action Button */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest px-3.5 py-1.5 bg-studio-100 hover:bg-studio-200 text-studio-800 rounded-full transition-all border border-studio-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-studio-600" />
              <span>Style Quiz</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="relative p-2.5 text-studio-900 hover:text-studio-600 transition-colors rounded-full hover:bg-studio-100/80"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-studio-900 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center animate-fadeIn shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-studio-900/40 backdrop-blur-sm md:hidden flex">
          <div className="w-4/5 max-w-sm bg-studio-50 h-full p-8 flex flex-col justify-between shadow-2xl animate-slideRight">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-studio-200">
                <div className="flex items-center space-x-2.5">
                  <img src="./assets/real_logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <span className="font-serif text-base tracking-wider block font-semibold">THE ARTISTIC TALES</span>
                    <span className="text-[8px] uppercase tracking-widest text-studio-500 block">Space Stylist</span>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-studio-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-5">
                {navLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      link.onClick?.();
                      setMobileMenuOpen(false);
                    }}
                    className="font-serif text-2xl text-studio-900 hover:text-studio-600 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-studio-200 space-y-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 px-4 bg-studio-900 text-white text-xs uppercase tracking-widest flex items-center justify-center space-x-2 rounded-sm"
                >
                  <span>Book Consultation</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuiz?.();
                  }}
                  className="w-full py-3 px-4 bg-studio-100 border border-studio-300 text-studio-800 text-xs uppercase tracking-widest flex items-center justify-center space-x-2 rounded-sm"
                >
                  <Sparkles className="w-4 h-4 text-studio-600" />
                  <span>Take Style Quiz</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-studio-500 pt-6 border-t border-studio-200 space-y-1">
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
