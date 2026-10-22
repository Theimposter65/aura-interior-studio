import React, { useEffect, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { JournalArticle } from '../../types';
import { journalArticles } from '../../data/portfolioData';
import { LiquidGlass } from '../glass/LiquidGlass';

export const JournalSection: React.FC = () => {
  const [readingArticle, setReadingArticle] = useState<JournalArticle | null>(null);

  useEffect(() => {
    if (!readingArticle) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setReadingArticle(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [readingArticle]);

  return (
    <section id="journal" className="bg-white py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="max-w-3xl">
          <p className="type-eyebrow text-studio-600">Journal</p>
          <h2 className="type-headline mt-2">Notes on space, light and pigment.</h2>
          <p className="type-subhead text-studio-600 mt-4">
            Perspectives from the studio on styling, Indian heritage motifs and what custom art does for contemporary architecture.
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {journalArticles.map(article => (
            <button
              key={article.id}
              type="button"
              onClick={() => setReadingArticle(article)}
              className="group text-left rounded-tile bg-studio-50 overflow-hidden flex flex-col apple-press focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="aspect-[16/11] overflow-hidden bg-studio-200">
                <img
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[13px] font-semibold text-studio-500">{article.category}</p>
                <h3 className="mt-1 font-display text-[19px] leading-snug font-semibold tracking-[-0.015em]">{article.title}</h3>
                <p className="mt-2 type-callout text-studio-600 line-clamp-3">{article.excerpt}</p>
                <p className="mt-auto pt-5 type-footnote text-studio-500">
                  {article.date} · {article.readTime}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {readingArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={readingArticle.title}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setReadingArticle(null)}
        >
          <article
            className="relative bg-white w-full max-w-2xl rounded-t-tile sm:rounded-tile shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto apple-materialize"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img src={readingArticle.image} alt="" className="w-full aspect-[16/9] object-cover" />
              <LiquidGlass
                as="button"
                type="button"
                tone="clear"
                interactive
                bezel={16}
                thickness={22}
                onClick={() => setReadingArticle(null)}
                aria-label="Close article"
                className="absolute top-4 right-4 grid place-items-center w-10 h-10 text-white"
              >
                <X className="w-5 h-5" />
              </LiquidGlass>
            </div>

            <div className="p-6 sm:p-10">
              <p className="text-[14px] font-semibold text-studio-500">
                {readingArticle.category} · {readingArticle.readTime}
              </p>
              <h2 className="type-title mt-2">{readingArticle.title}</h2>
              <p className="mt-2 type-callout text-studio-500">
                By {readingArticle.author} · {readingArticle.date}
              </p>

              <div className="mt-8 space-y-5 text-studio-700">
                <p className="type-subhead text-studio-900">{readingArticle.excerpt}</p>
                <p>
                  Every space carries an inherent rhythm dictated by daylight, architectural contours, and human movement. When we introduce original canvas art or a wall mural into a room, the goal is never to merely decorate — it is to alter the sensory presence of that space.
                </p>
                <p>
                  Working with natural raw earth pigments and Belgian linen allows the artwork to react organically to ambient shifts. In morning light, mineral limewash reveals tactile micro-reliefs; in the twilight, genuine gold leaf catches candlelight, evoking quiet warmth and contemplative stillness.
                </p>
                <p>
                  Whether creating a focal Pichhwai narrative for a private family residence or an expansive mural for a bustling hospitality lounge, we treat each surface as a living collaboration between space, memory, and pigment.
                </p>
              </div>

              <button type="button" onClick={() => setReadingArticle(null)} className="btn btn-neutral mt-10">
                Done
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
};

export default JournalSection;
