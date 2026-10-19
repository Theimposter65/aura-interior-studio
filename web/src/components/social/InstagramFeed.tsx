import React from 'react';
import { Instagram, Heart, ExternalLink } from 'lucide-react';
import { instagramPosts } from '../../data/portfolioData';
import { LiquidGlassPill } from '../glass/LiquidGlassPill';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-white/40">
          <div className="space-y-2">
            <LiquidGlassPill
              variant="light"
              size="sm"
              className="uppercase tracking-[0.3em] text-[10px] font-semibold"
            >
              Behind the Scenes
            </LiquidGlassPill>
            <h3 className="font-serif text-2xl sm:text-3xl text-studio-900 font-normal tracking-tight">
              Follow Our Creative Process
            </h3>
          </div>

          <a
            href="https://instagram.com/the_artistic_tales_"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-semibold text-studio-800 hover:text-studio-950 transition-colors group apple-press"
          >
            <Instagram className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
            <span>@the_artistic_tales_</span>
            <ExternalLink className="w-3 h-3 text-studio-400" />
          </a>
        </div>

        {/* Instagram Grid (Liquid Crystal Frames) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map(post => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-white/20 backdrop-blur-md rounded-2xl border border-white/60 block shadow-sm hover:shadow-xl transition-all duration-300 apple-press"
            >
              <img
                src={post.imageUrl}
                alt="Instagram preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />

              {/* Liquid Hover Overlay */}
              <div className="absolute inset-0 bg-studio-950/75 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
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
        <div className="mt-10 text-center">
          <a
            href="https://instagram.com/the_artistic_tales_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-7 py-3 bg-white/70 backdrop-blur-xl border border-white/80 hover:bg-white text-studio-900 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md transition-all apple-press"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
            <span>Follow Studio on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
