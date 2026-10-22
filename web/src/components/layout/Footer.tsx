import React, { useState } from 'react';
import { Check } from 'lucide-react';

const DIRECTORY = [
  {
    title: 'Portfolio',
    links: [
      ['Statement pieces', '#portfolio'],
      ['Murals and doodling', '#portfolio'],
      ['Hospitality and café collages', '#portfolio'],
      ['Villa before and afters', '#transformations'],
      ['Canvases and prints', '#portfolio'],
    ],
  },
  {
    title: 'Studio',
    links: [
      ['Pricing', '#pricing'],
      ['Transformations', '#transformations'],
      ['Space styling', '#portfolio'],
      ['Client stories', '#testimonials'],
      ['Book a consultation', '#contact'],
    ],
  },
  {
    title: 'Contact',
    links: [
      ['WhatsApp +91 75679 79307', 'https://wa.me/917567979307'],
      ['thisisartistictales@gmail.com', 'mailto:thisisartistictales@gmail.com'],
      ['Instagram @the_artistic_tales_', 'https://instagram.com/the_artistic_tales_'],
    ],
  },
] as const;

const LOCATIONS = [
  ['Goa studio', 'Coastal atelier and hospitality murals'],
  ['Gujarat atelier', 'Traditional Pichhwai and fine art'],
  ['Worldwide', 'On-site travel and international dispatch'],
];

const CRAFT = [
  'Hand-stretched Belgian linen and archival canvas',
  'Raw earth pigments and 24k gold leaf accents',
  'Low-VOC, durable matte mural formulations',
  'Personal narrative curation for every client',
];

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

  const external = (href: string) => href.startsWith('http');

  return (
    <footer className="bg-studio-50 text-studio-600 text-xs leading-[1.33]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <p className="pb-4 border-b border-studio-300">
          The Artistic Tales transforms homes, boutique hospitality venues and architectural studios through interior
          styling, custom canvas on Belgian linen and floor-to-ceiling murals. All works are 100% hand-painted originals.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 py-8">
          {DIRECTORY.map(column => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="font-sans text-xs font-semibold text-studio-900">{column.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="hover:underline underline-offset-2 break-words"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="font-sans text-xs font-semibold text-studio-900">Locations</h3>
            <ul className="mt-3 space-y-2.5">
              {LOCATIONS.map(([place, note]) => (
                <li key={place}>
                  <span className="text-studio-900">{place}</span>
                  <br />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold text-studio-900">Craft</h3>
            <ul className="mt-3 space-y-2.5">
              {CRAFT.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-studio-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-sans text-xs font-semibold text-studio-900">Studio updates</h3>
            <p className="mt-1">Occasional notes on space styling and private collection releases. No spam.</p>
          </div>
          {subscribed ? (
            <p className="inline-flex items-center gap-1.5 text-studio-900" role="status">
              <Check className="w-4 h-4 text-[#248A3D]" aria-hidden="true" />
              You’re subscribed. Welcome to the atelier.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                required
                autoComplete="email"
                className="field !py-2 !text-[14px] md:w-64"
              />
              <button type="submit" className="btn btn-primary btn-sm shrink-0">Subscribe</button>
            </form>
          )}
        </div>

        <div className="pt-4 border-t border-studio-300 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <p>Copyright © {new Date().getFullYear()} The Artistic Tales. All rights reserved.</p>
          <p>Goa · Gujarat · Worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
