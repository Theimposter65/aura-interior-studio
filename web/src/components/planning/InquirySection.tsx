import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, CheckCircle2, Shield, Clock, MapPin, Sparkles } from 'lucide-react';
import { LiquidGlassCard } from '../glass/LiquidGlassCard';
import { LiquidGlassPill } from '../glass/LiquidGlassPill';

export const InquirySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    spaceType: 'Home / Private Residence',
    budgetRange: '₹25,000 – ₹60,000',
    vision: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      const ref = `AT-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryRef(ref);
    }, 700);
  };

  const handleOpenWhatsAppDirect = () => {
    const defaultMsg = encodeURIComponent(
      "Hello The Artistic Tales! I want to inquire about designing and styling my space. Please share details on how we can get started."
    );
    window.open(`https://wa.me/917567979307?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 bg-studio-950 text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-studio-700/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Studio Contact & Narrative */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <LiquidGlassPill
                variant="dark"
                size="sm"
                icon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                className="uppercase tracking-[0.25em] text-[10px]"
              >
                Begin A Conversation
              </LiquidGlassPill>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white tracking-tight">
                Let's Create Walls That Remember
              </h2>
              <p className="text-xs sm:text-sm text-studio-300 leading-relaxed font-light">
                Every commission starts with a conversation. Share a few details about your spatial vision, wall dimensions, or upcoming renovation project.
              </p>
            </div>

            {/* Direct Instant Channels */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleOpenWhatsAppDirect}
                  className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all flex items-center justify-center space-x-2 shadow-lg apple-press"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp The Studio</span>
                </button>

                <a
                  href="tel:+917567979307"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all flex items-center justify-center space-x-2 border border-white/20 backdrop-blur-md apple-press shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us Directly</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="mailto:thisisartistictales@gmail.com"
                  className="inline-flex items-center space-x-2 text-xs text-studio-300 hover:text-amber-200 transition-colors py-1 apple-press"
                >
                  <Mail className="w-4 h-4 text-studio-400" />
                  <span>thisisartistictales@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Studio Footprint (Liquid Glass Capsule) */}
            <div className="p-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/15 space-y-2.5 shadow-md">
              <div className="flex items-center space-x-2 text-xs text-white font-medium">
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>Goa • Gujarat • Worldwide Commissions</span>
              </div>
              <p className="text-[11px] text-studio-300 leading-relaxed font-light">
                We accept residential and hospitality spatial art commissions across India and internationally. Physical visits, on-site wall murals, and studio canvas dispatches available.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form (Liquid Glass Card) */}
          <div className="lg:col-span-7">
            <LiquidGlassCard variant="dark" maxTilt={3} className="p-6 sm:p-10 rounded-3xl">
              {submitted ? (
                <div className="text-center py-10 space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-900/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-white">
                    Inquiry Transmitted
                  </h3>
                  <p className="text-xs sm:text-sm text-studio-300 max-w-md mx-auto leading-relaxed font-light">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Our principal space stylist will review your spatial details and reach out within 24 hours.
                  </p>

                  <div className="p-4 bg-white/5 rounded-xl border border-white/15 max-w-sm mx-auto text-xs text-studio-300 space-y-1.5 text-left font-mono">
                    <div className="flex justify-between">
                      <span>Reference:</span>
                      <span className="text-white font-bold">{inquiryRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Space Type:</span>
                      <span className="text-white">{formData.spaceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="text-white">{formData.budgetRange}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        const msg = `Hello! Following up on inquiry ${inquiryRef} from ${formData.name}.`;
                        window.open(`https://wa.me/917567979307?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs uppercase tracking-widest font-semibold rounded-full transition-all flex items-center justify-center space-x-2 apple-press shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-studio-200 text-xs uppercase tracking-widest rounded-full transition-all border border-white/20 apple-press"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="font-serif text-2xl md:text-3xl text-white font-normal">
                      Project & Consultation Inquiry
                    </h3>
                    <p className="text-xs text-studio-400 mt-1">
                      Fill in your details below for custom canvas commissions, murals, or space styling.
                    </p>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-studio-300 font-semibold block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g. Priya Sharma"
                        className="w-full text-xs px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-300 placeholder-studio-500 backdrop-blur-md transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-studio-300 font-semibold block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="priya@domain.com"
                        className="w-full text-xs px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-300 placeholder-studio-500 backdrop-blur-md transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Space Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-studio-300 font-semibold block mb-1.5">
                        Phone / WhatsApp Contact
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full text-xs px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-300 placeholder-studio-500 backdrop-blur-md transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-studio-300 font-semibold block mb-1.5">
                        Space / Project Type
                      </label>
                      <select
                        value={formData.spaceType}
                        onChange={e => setFormData({ ...formData, spaceType: e.target.value })}
                        className="w-full text-xs px-4 py-3 bg-studio-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-300 cursor-pointer"
                      >
                        <option value="Home / Private Residence">Home / Private Residence</option>
                        <option value="Café / Coffee Lounge">Café / Coffee Lounge</option>
                        <option value="Restaurant / Dining">Restaurant / Dining</option>
                        <option value="Boutique Hotel / Homestay">Boutique Hotel / Homestay</option>
                        <option value="Executive Office / Studio">Executive Office / Studio</option>
                        <option value="Custom Canvas Commission">Custom Canvas Commission</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-studio-300 font-semibold block mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full text-xs px-4 py-3 bg-studio-900 border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-300 cursor-pointer"
                    >
                      <option value="Under ₹25,000">Under ₹25,000 (Small Accent Wall / 10×10 Artwork)</option>
                      <option value="₹25,000 – ₹60,000">₹25,000 – ₹60,000 (Statement Piece / Large Canvas / Minimal Mural)</option>
                      <option value="₹60,000 – ₹1,50,000">₹60,000 – ₹1,50,000 (Detailed Mural / Room Makeover)</option>
                      <option value="₹1,50,000+">₹1,50,000+ (Full Villa / Hospitality Venue Transformation)</option>
                    </select>
                  </div>

                  {/* Vision / Notes */}
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-studio-300 font-semibold block mb-1.5">
                      Your Vision / Wall Dimensions / Space Details
                    </label>
                    <textarea
                      rows={3}
                      value={formData.vision}
                      onChange={e => setFormData({ ...formData, vision: e.target.value })}
                      placeholder="Tell us about the mood, colors, wall size, or specific artwork style you're envisioning..."
                      className="w-full text-xs p-4 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:border-amber-300 placeholder-studio-500 backdrop-blur-md resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 px-6 bg-studio-950 hover:bg-studio-900 text-white text-xs uppercase tracking-widest font-semibold rounded-full border border-white/20 transition-all flex items-center justify-center space-x-2 shadow-xl apple-press disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? (
                        <span>Transmitting Inquiry...</span>
                      ) : (
                        <>
                          <span>Transmit Spatial Consultation Inquiry</span>
                          <Send className="w-3.5 h-3.5 ml-1 text-amber-300" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy & Direct Assurance */}
                  <div className="pt-3 flex flex-wrap items-center justify-between text-[11px] text-studio-400 border-t border-white/10 gap-2">
                    <div className="flex items-center space-x-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Direct Atelier Response • 100% Confidential</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Response within 24 hours</span>
                    </div>
                  </div>
                </form>
              )}
            </LiquidGlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;
