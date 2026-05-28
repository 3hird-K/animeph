'use client';

import { useEffect, useRef, useState } from 'react';
import AnimeCard from './AnimeCard';
import type { AnimeMediaItem } from './animeTypes';

type RowVariant = 'default' | 'trending' | 'popular' | 'toprated' | 'upcoming';

interface AnimeRowProps {
  id: string;
  title: string;
  items: AnimeMediaItem[];
  subtitle?: string;
  variant?: RowVariant;
}

const VARIANT_STYLES: Record<RowVariant, { label: string; accent: string; labelColor: string }> = {
  default: {
    label: 'Featured anime',
    accent: 'bg-white',
    labelColor: 'text-white/55',
  },
  trending: {
    label: 'Hot right now',
    accent: 'bg-orange-500',
    labelColor: 'text-orange-400',
  },
  popular: {
    label: 'Fan favorites',
    accent: 'bg-red-600',
    labelColor: 'text-red-500',
  },
  toprated: {
    label: 'Highest scores',
    accent: 'bg-yellow-500',
    labelColor: 'text-yellow-400',
  },
  upcoming: {
    label: 'Coming next',
    accent: 'bg-blue-500',
    labelColor: 'text-blue-400',
  },
};

export default function AnimeRow({ id, title, items, subtitle, variant = 'default' }: AnimeRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const variantStyle = VARIANT_STYLES[variant] ?? VARIANT_STYLES.default;

  const updateArrows = () => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    setCanLeft(element.scrollLeft > 5);
    setCanRight(element.scrollLeft + element.clientWidth < element.scrollWidth - 5);
  };

  useEffect(() => {
    updateArrows();

    const element = scrollRef.current;
    if (!element) {
      return undefined;
    }

    element.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    return () => {
      element.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [items.length]);

  const scroll = (direction: 'left' | 'right') => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const amount = element.clientWidth * 0.85;
    element.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section id={id} className="group/row relative mx-auto w-full max-w-[1600px] py-2 md:py-3">
      {/* Category Header block with variant-specific styling */}
      <div className="mb-2 px-4 select-none md:mb-3 md:px-12">
        <div className="mb-0.5 flex items-center gap-2">
          <p className={`text-[9px] font-black uppercase tracking-widest drop-shadow md:text-[10px] ${variantStyle.labelColor}`}>
            {subtitle || variantStyle.label}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`block h-4 w-[3px] rounded md:h-5 shadow-[0_0_8px_rgba(255,255,255,0.3)] ${variantStyle.accent}`} />
          <h2 className="font-sans text-lg font-black uppercase tracking-tight text-white drop-shadow-md md:text-2xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => scroll('left')}
          className={`absolute left-0 top-0 z-30 hidden h-full w-20 items-center justify-start bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent pl-4 text-white opacity-0 transition hover:opacity-100 group-hover/row:opacity-100 md:flex ${canLeft ? '' : '!hidden'}`}
          aria-label="Scroll left"
        >
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto scroll-smooth px-4 pb-3 pt-4 md:gap-3 md:px-12"
        >
          {items.map((anime, index) => (
            <div key={`${id}-${anime.id}-${index}`} className="relative w-[160px] shrink-0 md:w-[200px]">
              <AnimeCard animeData={anime} />

              {variant === 'toprated' && index < 3 ? (
                <div className="absolute left-2 top-2 z-20 flex items-center gap-1 rounded bg-yellow-500/90 px-2 py-1 shadow-lg pointer-events-none">
                  <span className="text-[10px] font-black text-black">#{index + 1}</span>
                </div>
              ) : null}

              {variant === 'upcoming' ? (
                <div className="absolute left-2 top-2 z-20 rounded bg-blue-600/90 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-lg backdrop-blur-sm pointer-events-none">
                  SOON
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll('right')}
          className={`absolute right-0 top-0 z-30 hidden h-full w-20 items-center justify-end bg-gradient-to-l from-zinc-950 via-zinc-950/70 to-transparent pr-4 text-white opacity-0 transition hover:opacity-100 group-hover/row:opacity-100 md:flex ${canRight ? '' : '!hidden'}`}
          aria-label="Scroll right"
        >
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}