import React, { useState } from 'react';
import { BookOpen, ArrowRight, Clock, Calendar, User, X, Sparkles } from 'lucide-react';
import { JournalArticle } from '../../types';
import { journalArticles } from '../../data/portfolioData';

export const JournalSection: React.FC = () => {
  const [readingArticle, setReadingArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="py-24 bg-white border-t border-studio-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-studio-200">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center space-x-2">
              <span className="p-1 bg-studio-100 text-studio-900 rounded">
                <BookOpen className="w-3.5 h-3.5 text-studio-700" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold">
                Journal & Essays
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-studio-900 font-normal leading-tight">
              Notes on Space, Light & Pigment
            </h2>
            <p className="text-xs sm:text-sm text-studio-600 leading-relaxed">
              Perspectives from our studio on interior space styling, traditional Indian heritage motifs, and the transformative power of custom art in contemporary architecture.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs text-studio-500 font-medium">
            Studio Musings & Field Notes
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {journalArticles.map(article => (
            <article
              key={article.id}
              onClick={() => setReadingArticle(article)}
              className="group cursor-pointer flex flex-col justify-between space-y-4 bg-studio-50/50 p-4 rounded-sm border border-studio-200/70 hover:border-studio-400 hover:shadow-md transition-all duration-300"
            >
              <div className="space-y-3">
                {/* Article Image */}
                <div className="aspect-[16/10] overflow-hidden rounded-sm bg-studio-200 relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-studio-900/80 backdrop-blur-sm text-white text-[9px] uppercase tracking-wider font-semibold rounded">
                    {article.category}
                  </span>
                </div>

                {/* Article Meta */}
                <div className="flex items-center space-x-3 text-[10px] text-studio-400 pt-1">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Article Title & Excerpt */}
                <h3 className="font-serif text-lg text-studio-900 font-medium leading-snug group-hover:text-studio-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-studio-600 leading-relaxed line-clamp-3 font-light">
                  {article.excerpt}
                </p>
              </div>

              {/* Read More Trigger */}
              <div className="pt-3 border-t border-studio-200/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-studio-800 group-hover:text-studio-950">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* Article Reading Modal */}
        {readingArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div
              className="fixed inset-0 bg-studio-950/70 backdrop-blur-md"
              onClick={() => setReadingArticle(null)}
            />

            <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 border border-studio-200 max-h-[85vh] flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-studio-200 flex items-center justify-between bg-studio-50">
                <span className="text-[10px] uppercase tracking-[0.25em] text-studio-500 font-semibold">
                  {readingArticle.category} • {readingArticle.readTime}
                </span>
                <button
                  onClick={() => setReadingArticle(null)}
                  className="p-1.5 text-studio-400 hover:text-studio-900 rounded-full hover:bg-studio-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Article Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <img
                  src={readingArticle.image}
                  alt={readingArticle.title}
                  className="w-full aspect-[21/9] object-cover rounded-sm"
                />

                <div className="space-y-3">
                  <h2 className="font-serif text-2xl sm:text-3xl text-studio-900 font-normal leading-tight">
                    {readingArticle.title}
                  </h2>
                  <div className="flex items-center space-x-3 text-xs text-studio-500 border-b border-studio-100 pb-4">
                    <span>By {readingArticle.author}</span>
                    <span>•</span>
                    <span>{readingArticle.date}</span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-studio-700 leading-relaxed space-y-4 font-light">
                  <p className="font-serif text-base sm:text-lg text-studio-900 leading-relaxed font-normal italic">
                    "{readingArticle.excerpt}"
                  </p>
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

                <div className="pt-6 border-t border-studio-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-studio-500">
                    Interested in a custom piece or space styling?
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setReadingArticle(null)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-studio-900 text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-studio-800 transition-colors text-center"
                  >
                    Start a Conversation
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
