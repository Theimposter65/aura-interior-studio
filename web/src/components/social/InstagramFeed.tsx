import React from 'react';
import { Instagram, Heart, ChevronRight } from 'lucide-react';
import { instagramPosts } from '../../data/portfolioData';

const PROFILE_URL = 'https://instagram.com/the_artistic_tales_';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="bg-white pb-24 sm:pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <header>
            <p className="type-eyebrow text-studio-600">Behind the scenes</p>
            <h2 className="type-title mt-2">Follow the creative process.</h2>
          </header>
          <a href={PROFILE_URL} target="_blank" rel="noopener noreferrer" className="link-chevron text-[17px]">
            @the_artistic_tales_ on Instagram
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map(post => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram post: ${post.caption}`}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-studio-100 block apple-press"
            >
              <img
                src={post.imageUrl}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                <Instagram className="w-4 h-4 self-end" aria-hidden="true" />
                <div>
                  <p className="text-[13px] leading-snug line-clamp-2">{post.caption}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium">
                    <Heart className="w-3 h-3 fill-white" aria-hidden="true" />
                    {post.likes}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
