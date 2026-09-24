import React, { useState } from 'react';
import { ArrowRight, Check, Compass, Shield, Sparkles, MessageCircle, Mail, Phone, Instagram, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-studio-900 text-studio-100 pt-20 pb-12 border-t border-studio-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Newsletter & Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-studio-800">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="./assets/real_logo.png"
                alt="The Artistic Tales Logo"
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <div>
                <span className="font-serif text-xl tracking-wider text-white font-medium block">
                  The Artistic Tales
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-studio-400 block -mt-0.5">
                  Interior Space Stylist
                </span>
              </div>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-studio-50 font-normal leading-tight">
              Walls that remember. Art to collect, not just to decorate.
            </h3>
            <p className="text-xs sm:text-sm text-studio-400 max-w-lg leading-relaxed font-light">
              The Artistic Tales transforms living spaces, boutique hospitality venues, and architectural studios through thoughtful interior styling, custom canvas artworks on Belgian linen, and floor-to-ceiling murals.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-studio-300">
              <a
                href="https://wa.me/917567979307"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 75679 79307 (WhatsApp)</span>
              </a>
              <span className="text-studio-600">•</span>
              <a
                href="mailto:thisisartistictales@gmail.com"
                className="inline-flex items-center space-x-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-studio-400" />
                <span>thisisartistictales@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-400 font-semibold block">
                Stay Connected
              </span>
              <h4 className="font-serif text-xl text-studio-100 mt-2">
                Receive atelier updates & private collection releases
              </h4>
              <p className="text-xs text-studio-400 mt-1">
                Sent occasionally. No spam, only thoughtful perspectives on space styling and art.
              </p>
            </div>

            {subscribed ? (
              <div className="p-4 bg-studio-800/80 border border-studio-700 rounded text-xs text-emerald-300 flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing. Welcome to The Artistic Tales Atelier.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="bg-studio-800 border border-studio-700 px-4 py-3 text-xs text-studio-100 placeholder-studio-500 rounded focus:outline-none focus:border-studio-400 flex-1 tracking-wider"
                />
                <button
                  type="submit"
                  className="bg-studio-100 hover:bg-white text-studio-900 px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="flex items-center space-x-6 text-[11px] text-studio-400 pt-2">
              <span className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-studio-500" />
                <span>100% Hand-Painted Originals</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-studio-500" />
                <span>Spatial Space Curation</span>
              </span>
              <a
                href="https://instagram.com/the_artistic_tales_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span>@the_artistic_tales_</span>
              </a>
            </div>
          </div>
        </div>

        {/* Middle Navigation & Studio Locations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-studio-800 text-xs">
          <div>
            <h5 className="uppercase tracking-[0.2em] text-studio-300 font-semibold mb-4 text-[11px]">
              Artistic Portfolio
            </h5>
            <ul className="space-y-3 text-studio-400">
              <li><a href="#gallery" className="hover:text-studio-100 transition-colors">Traditional Pichhwai Canvases</a></li>
              <li><a href="#gallery" className="hover:text-studio-100 transition-colors">Modern Abstract Artworks</a></li>
              <li><a href="#gallery" className="hover:text-studio-100 transition-colors">Floor-to-Ceiling Wall Murals</a></li>
              <li><a href="#gallery" className="hover:text-studio-100 transition-colors">Hospitality & Café Commissions</a></li>
              <li><a href="#gallery" className="hover:text-studio-100 transition-colors">Live Site Restorations</a></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-[0.2em] text-studio-300 font-semibold mb-4 text-[11px]">
              Studio Services
            </h5>
            <ul className="space-y-3 text-studio-400">
              <li><a href="#services" className="hover:text-studio-100 transition-colors">Custom Canvas Art</a></li>
              <li><a href="#services" className="hover:text-studio-100 transition-colors">Architectural Wall Murals</a></li>
              <li><a href="#services" className="hover:text-studio-100 transition-colors">Interior Space Styling</a></li>
              <li><a href="#visualizer" className="hover:text-studio-100 transition-colors">Room & Wall Art Visualizer</a></li>
              <li><a href="#contact" className="hover:text-studio-100 transition-colors">Consultation Booking</a></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-[0.2em] text-studio-300 font-semibold mb-4 text-[11px]">
              Our Locations
            </h5>
            <div className="space-y-4 text-studio-400 leading-relaxed">
              <div>
                <p className="text-studio-200 font-medium">Goa Studio</p>
                <p>Coastal Atelier & Hospitality Murals</p>
              </div>
              <div>
                <p className="text-studio-200 font-medium">Gujarat Atelier</p>
                <p>Traditional Pichhwai & Fine Art Studio</p>
              </div>
              <div>
                <p className="text-studio-200 font-medium">Worldwide Commissions</p>
                <p>On-Site Travel & International Dispatches</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="uppercase tracking-[0.2em] text-studio-300 font-semibold mb-4 text-[11px]">
              Our Craft Ethics
            </h5>
            <ul className="space-y-3 text-studio-400">
              <li className="flex items-start space-x-2">
                <span className="text-studio-500 font-mono">01.</span>
                <span>Hand-stretched Belgian linen & archival canvas</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-studio-500 font-mono">02.</span>
                <span>Raw earth pigments and 24k gold leaf accents</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-studio-500 font-mono">03.</span>
                <span>Low-VOC, durable matte mural formulations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-studio-500 font-mono">04.</span>
                <span>Personal narrative curation for every client</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-studio-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-lg tracking-widest text-studio-400">The Artistic Tales</span>
            <span>• © {new Date().getFullYear()} The Artistic Tales — Interior Space Stylist. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#gallery" className="hover:text-studio-300 transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-studio-300 transition-colors">Services</a>
            <a href="#journal" className="hover:text-studio-300 transition-colors">Journal</a>
            <a href="#contact" className="hover:text-studio-300 transition-colors">Consultation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
