import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, ShieldCheck, Clock, User, Mail, Phone, Home } from 'lucide-react';
import { serviceTiers } from '../../data/services';
import { ConsultationBooking } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTierId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTierId = 'tier-comprehensive'
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<ConsultationBooking>({
    fullName: '',
    email: '',
    phone: '',
    spaceType: 'living',
    tierId: initialTierId,
    preferredDate: '',
    budgetRange: '$15,000 – $50,000',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const selectedTier = serviceTiers.find(t => t.id === formData.tierId) || serviceTiers[1];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone contact is required';
    if (!formData.preferredDate) errs.preferredDate = 'Please select a preferred consultation date';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setBookingRef(`CS-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1000);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-studio-900/70 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-studio-50 w-full max-w-xl rounded-sm shadow-2xl overflow-hidden z-10 border border-studio-200 animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-studio-200 flex items-center justify-between bg-white">
          <div>
            <h3 className="font-serif text-2xl text-studio-900 font-normal">
              Schedule Architectural Consultation
            </h3>
            <p className="text-[11px] text-studio-500 uppercase tracking-wider mt-0.5">
              Direct Advisory with AURA Lead Spatial Architect
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-studio-400 hover:text-studio-900 rounded-full hover:bg-studio-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-sage-100 text-sage-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[1.8]" />
            </div>
            <h4 className="font-serif text-3xl text-studio-900">
              Consultation Protocol Scheduled
            </h4>
            <p className="text-xs text-studio-600 max-w-sm mx-auto leading-relaxed">
              We have reserved your spatial design session with our Senior Architectural Team. A preliminary questionnaire and calendar invite have been dispatched.
            </p>

            <div className="bg-white p-5 rounded border border-studio-200 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-studio-100 pb-2">
                <span className="text-studio-500">Booking Reference:</span>
                <span className="font-mono font-semibold text-studio-900">{bookingRef}</span>
              </div>
              <div className="flex justify-between border-b border-studio-100 pb-2">
                <span className="text-studio-500">Service Tier:</span>
                <span className="font-semibold text-studio-900">{selectedTier.name} (${selectedTier.price})</span>
              </div>
              <div className="flex justify-between border-b border-studio-100 pb-2">
                <span className="text-studio-500">Client Contact:</span>
                <span className="text-studio-800">{formData.fullName} ({formData.email})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-studio-500">Requested Date:</span>
                <span className="font-mono text-studio-900">{formData.preferredDate}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="mt-6 py-3.5 px-8 bg-studio-900 hover:bg-studio-800 text-white text-xs uppercase tracking-widest rounded-sm transition-all shadow-md"
            >
              Close & Return to Studio
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Service Tier Selector */}
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-studio-800 block mb-1.5">
                Service Package
              </label>
              <select
                value={formData.tierId}
                onChange={e => setFormData({ ...formData, tierId: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-studio-300 rounded focus:outline-none focus:border-studio-900 cursor-pointer"
              >
                {serviceTiers.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} — ${t.price} USD ({t.timeline})
                  </option>
                ))}
              </select>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-studio-800 block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-studio-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="E.g. Elena Rostova"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-studio-300 rounded focus:outline-none focus:border-studio-900"
                  />
                </div>
                {errors.fullName && <p className="text-[11px] text-terracotta-700 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-studio-800 block mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-studio-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@domain.com"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-studio-300 rounded focus:outline-none focus:border-studio-900"
                  />
                </div>
                {errors.email && <p className="text-[11px] text-terracotta-700 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-studio-800 block mb-1">
                  Telephone Contact *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-studio-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-studio-300 rounded focus:outline-none focus:border-studio-900"
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-terracotta-700 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-studio-800 block mb-1">
                  Preferred Date *
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 absolute left-3 top-3 text-studio-400" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-studio-300 rounded focus:outline-none focus:border-studio-900"
                  />
                </div>
                {errors.preferredDate && <p className="text-[11px] text-terracotta-700 mt-1">{errors.preferredDate}</p>}
              </div>
            </div>

            {/* Space Type & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-studio-800 block mb-1">
                  Space Type
                </label>
                <select
                  value={formData.spaceType}
                  onChange={e => setFormData({ ...formData, spaceType: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-studio-300 rounded focus:outline-none focus:border-studio-900 cursor-pointer"
                >
                  <option value="living">Living & Entertaining Pavilion</option>
                  <option value="bedroom">Sanctuary Bedroom Suite</option>
                  <option value="open">Full Open-Plan Renovation</option>
                  <option value="whole-home">Whole Residence Masterplan</option>
                  <option value="commercial">Commercial Atelier / Gallery</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-studio-800 block mb-1">
                  Furnishings Budget Range
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={e => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-studio-300 rounded focus:outline-none focus:border-studio-900 cursor-pointer"
                >
                  <option value="$5,000 – $15,000">$5,000 – $15,000 USD</option>
                  <option value="$15,000 – $50,000">$15,000 – $50,000 USD</option>
                  <option value="$50,000 – $100,000">$50,000 – $100,000 USD</option>
                  <option value="$100,000+">$100,000+ USD</option>
                </select>
              </div>
            </div>

            {/* Project Notes */}
            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-studio-800 block mb-1">
                Project Notes & Architectural Priorities
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Share any spatial dimensions, desired limewash finishes, lighting challenges, or specific art considerations..."
                className="w-full text-xs p-3 bg-white border border-studio-300 rounded focus:outline-none focus:border-studio-900 leading-relaxed"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-studio-900 hover:bg-studio-800 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-sm shadow-md flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Confirming Appointment...' : `Book Consultation • $${selectedTier.price}`}
                </span>
              </button>

              <div className="flex items-center justify-center space-x-4 text-[10px] text-studio-400 pt-3">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-sage-600" />
                  <span>Complimentary 14-Day Re-scheduling</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>45-Min Dedicated Video Protocol</span>
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
