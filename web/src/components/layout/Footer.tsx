import React, { useState } from 'react';
import { ArrowRight, Check, Compass, Shield, Sparkles } from 'lucide-react';

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
            <span className="text-[10px] uppercase tracking-[0.3em] text-studio-400 font-semibold block">
              Atelier Manifesto
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-studio-50 font-normal leading-tight">
              Spaces sculpted with mineral calm, architectural poise, and tactile permanence.
            </h3>
            <p className="text-xs text-studio-400 max-w-lg leading-relaxed">
              AURA Atelier operates at the intersection of classical spatial balance and contemporary Nordic-Japanese minimalism. Every wall mural, spatial concept blueprint, and custom acoustic element is crafted to transform living habitats into meditative sanctuaries.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-400 font-semibold block">
                Atelier Chronicles
              </span>
              <h4 className="font-serif text-xl text-studio-100 mt-2">
                Receive private portfolio previews & limited print editions
              </h4>
              <p className="text-xs text-studio-400 mt-1">
                Published seasonally. Zero promotional clutter, purely architectural insights.
              </p>
            </div>

            {subscribed ? (
              <div className="p-4 bg-studio-800/80 border border-studio-700 rounded text-xs text-sage-200 flex items-center space-x-2">
                <Check className="w-4 h-4 text-sage-400" />
                <span>You have been added to the Private Atelier Register. Welcome.</span>
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
                  <span>Request Register</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            <div className="flex items-center space-x-6 text-[11px] text-studio-400 pt-2">
              <span className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-studio-500" />
                <span>Museum-Grade Materials</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-studio-500" />
                <span>Bespoke Spatial CAD</span>
              </span>
            </div>
          </div>
        </div>

        {/* Middle Navigation & Atelier Locations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-studio-800 text-xs">
          <div>
            <h5 className="uppercase tracking-[0.2em] text-studio-300 font-semibold mb-4 text-[11px]">
              Wall Art Collections
            </h5>
            <ul className="space-y-3 text-studio-400">
              <li><a href="#catalog" className="hover:text-studio-100 transition-colors">Mineral Limewash Murals</a></li>
              <li><a href="#catalog" className="hover:text-studio-100 transition-colors">Acoustic Felted Panels</a></li>
              <li><a href="#catalog" className="hover:text-studio-100 transition-colors">Japanese Sumi Ink Series</a></li>
              <li><a href="#catalog" className="hover:text-studio-100 transition-colors">Architectural Color Fields</a></li>
              <li><a href="#visualizer" className="hover:text-studio-100 transition-colors">Room & Wall Visualizer</a></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-[0.2em] text-studio-300 font-semibold mb-4 text-[11px]">
              Spatial Planning
            </h5>
            <ul className="space-y-3 text-studio-400">
              <li><a href="#services" className="hover:text-studio-100 transition-colors">Essential Room Concepts</a></li>
              <li><a href="#services" className="hover:text-studio-100 transition-colors">Comprehensive 3D Renders</a></li>
              <li><a href="#services" className="hover:text-studio-100 transition-colors">Turnkey White-Glove Styling</a></li>
              <li><a href="#services" className="hover:text-studio-100 transition-colors">Circadian Lighting Strategies</a></li>
              <li><a href="#services" className="hover:text-studio-100 transition-colors">Architectural Material Kits</a></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-[0.2em] text-studio-300 font-semibold mb-4 text-[11px]">
              Global Ateliers
            </h5>
            <div className="space-y-4 text-studio-400 leading-relaxed">
              <div>
                <p className="text-studio-200 font-medium">Copenhagen Studio</p>
                <p>Bredgade 34, 1260 København K</p>
              </div>
              <div>
                <p className="text-studio-200 font-medium">New York Atelier</p>
                <p>417 Broome St, SoHo, NY 10013</p>
              </div>
              <div>
                <p className="text-studio-200 font-medium">Kyoto Laboratory</p>
                <p>Gion-machi Minamigawa, Higashiyama</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="uppercase tracking-[0.2em] text-studio-300 font-semibold mb-4 text-[11px]">
              Curatorial Standards
            </h5>
            <ul className="space-y-3 text-studio-400">
              <li className="flex items-start space-x-2">
                <span className="text-studio-500 font-mono">01.</span>
                <span>FSC-Certified Old-Growth White Oak & Walnut</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-studio-500 font-mono">02.</span>
                <span>100% Archival Cotton Rag & Zero-VOC Pigments</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-studio-500 font-mono">03.</span>
                <span>Recycled PET Structural Acoustic Substrates</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-studio-500 font-mono">04.</span>
                <span>Direct Artisan Trade Equity & Climate Offset</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-studio-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-lg tracking-widest text-studio-400">AURA</span>
            <span>• © {new Date().getFullYear()} AURA Studio & Atelier Inc. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-studio-300 transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-studio-300 transition-colors">Architectural Terms</a>
            <a href="#" className="hover:text-studio-300 transition-colors">Trade Portal</a>
            <a href="#" className="hover:text-studio-300 transition-colors">Client Concierge</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
