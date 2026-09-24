import React from 'react';
import { Instagram, Heart, ExternalLink } from 'lucide-react';
import { instagramPosts } from '../../data/portfolioData';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-20 bg-studio-50 border-t border-studio-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-studio-200">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-studio-500 font-semibold block">
              Behind the Scenes
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-studio-900 font-normal">
              Follow Our Creative Process
            </h3>
          </div>

          <a
            href="https://instagram.com/the_artistic_tales_"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-studio-800 hover:text-studio-950 transition-colors group"
          >
            <Instagram className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
            <span>@the_artistic_tales_</span>
            <ExternalLink className="w-3 h-3 text-studio-400" />
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map(post => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-studio-200 rounded-sm block"
            >
              <img
                src={post.imageUrl}
                alt="Instagram preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-studio-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                <div className="flex justify-end">
                  <Instagram className="w-4 h-4 text-pink-400" />
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] line-clamp-2 leading-snug font-light text-studio-200">
                    {post.caption}
                  </p>
                  <div className="flex items-center space-x-1 text-[10px] text-pink-300 font-medium pt-1">
                    <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com/the_artistic_tales_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-white border border-studio-300 hover:border-studio-500 text-studio-900 rounded-full text-xs uppercase tracking-wider font-semibold shadow-sm transition-all hover:shadow"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
