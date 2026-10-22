import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, CheckCircle2, Shield, Clock, MapPin } from 'lucide-react';

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
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedName || !trimmedEmail || !emailRegex.test(trimmedEmail)) return;

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

  const followUpOnWhatsApp = () => {
    const msg = `Hello! Following up on inquiry ${inquiryRef} from ${formData.name}.`;
    window.open(`https://wa.me/917567979307?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" data-nav-theme="dark" className="bg-studio-950 text-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <p className="type-eyebrow text-studio-400">Begin a conversation</p>
          <h2 className="type-headline mt-2">Let’s create walls that remember.</h2>
          <p className="type-subhead text-studio-400 mt-4">
            Every commission starts with a conversation. Share your vision, wall dimensions or upcoming renovation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={handleOpenWhatsAppDirect} className="btn btn-primary">
              <MessageCircle className="w-4 h-4" />
              WhatsApp the studio
            </button>
            <a href="tel:+917567979307" className="btn btn-secondary-dark">
              <Phone className="w-4 h-4" />
              Call us
            </a>
          </div>

          <dl className="mt-10 space-y-5 type-callout">
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-studio-400 shrink-0" aria-hidden="true" />
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a href="mailto:thisisartistictales@gmail.com" className="text-accent-light hover:underline underline-offset-4">
                    thisisartistictales@gmail.com
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-studio-400 shrink-0" aria-hidden="true" />
              <div>
                <dt className="font-medium">Goa · Gujarat · Worldwide</dt>
                <dd className="text-studio-400 mt-1">
                  Residential and hospitality commissions across India and internationally. Site visits, on-site murals and canvas dispatch available.
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7 rounded-tile bg-studio-900 p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-8 animate-fadeIn" role="status">
              <CheckCircle2 className="w-14 h-14 mx-auto text-[#30D158]" aria-hidden="true" />
              <h3 className="type-title mt-5">Inquiry sent.</h3>
              <p className="mt-3 text-studio-400 max-w-md mx-auto">
                Thank you, {formData.name}. Our principal space stylist will review your details and reply within 24 hours.
              </p>

              <dl className="mt-8 max-w-sm mx-auto divide-y divide-studio-700 rounded-2xl bg-studio-950 px-5 text-left type-callout">
                {[
                  ['Reference', inquiryRef],
                  ['Space', formData.spaceType],
                  ['Budget', formData.budgetRange],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className="text-studio-400">{k}</dt>
                    <dd className="font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button type="button" onClick={followUpOnWhatsApp} className="btn btn-primary">
                  <MessageCircle className="w-4 h-4" />
                  Continue on WhatsApp
                </button>
                <button type="button" onClick={() => setSubmitted(false)} className="btn btn-secondary-dark">
                  Send another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="type-title">Project inquiry</h3>
                <p className="mt-2 type-callout text-studio-400">
                  For canvas commissions, murals and space styling.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inq-name" className="field-label">Name</label>
                  <input
                    id="inq-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Priya Sharma"
                    className="field-dark"
                  />
                </div>
                <div>
                  <label htmlFor="inq-email" className="field-label">Email</label>
                  <input
                    id="inq-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="priya@example.com"
                    className="field-dark"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inq-phone" className="field-label">
                    Phone or WhatsApp <span className="text-studio-500 font-normal">(optional)</span>
                  </label>
                  <input
                    id="inq-phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="field-dark"
                  />
                </div>
                <div>
                  <label htmlFor="inq-space" className="field-label">Space type</label>
                  <select
                    id="inq-space"
                    value={formData.spaceType}
                    onChange={e => setFormData({ ...formData, spaceType: e.target.value })}
                    className="field-dark cursor-pointer"
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

              <div>
                <label htmlFor="inq-budget" className="field-label">Estimated budget</label>
                <select
                  id="inq-budget"
                  value={formData.budgetRange}
                  onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="field-dark cursor-pointer"
                >
                  <option value="Under ₹25,000">Under ₹25,000 (Small Accent Wall / 10×10 Artwork)</option>
                  <option value="₹25,000 – ₹60,000">₹25,000 – ₹60,000 (Statement Piece / Large Canvas / Minimal Mural)</option>
                  <option value="₹60,000 – ₹1,50,000">₹60,000 – ₹1,50,000 (Detailed Mural / Room Makeover)</option>
                  <option value="₹1,50,000+">₹1,50,000+ (Full Villa / Hospitality Venue Transformation)</option>
                </select>
              </div>

              <div>
                <label htmlFor="inq-vision" className="field-label">Your vision</label>
                <textarea
                  id="inq-vision"
                  rows={4}
                  value={formData.vision}
                  onChange={e => setFormData({ ...formData, vision: e.target.value })}
                  placeholder="Mood, colours, wall size or the style you have in mind…"
                  className="field-dark resize-none"
                />
              </div>

              <button type="submit" disabled={submitting} className="btn btn-primary w-full disabled:opacity-60">
                {submitting ? 'Sending…' : (
                  <>
                    Send inquiry
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 type-footnote text-studio-400">
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Confidential
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Reply within 24 hours
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default InquirySection;
