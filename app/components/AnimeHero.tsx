 'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { AnimeMediaItem } from './animeTypes';

interface AnimeHeroProps {
  animeList: AnimeMediaItem[];
}

function stripAnimeDescription(description?: string | null) {
  return (description ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAnimeTitle(anime: AnimeMediaItem) {
  return anime.title?.english || anime.title?.romaji || 'Untitled Anime';
}

const renderStars = (voteAverage: number = 8.0) => {
  return (
    <div className="flex items-center gap-1">
      <svg
        className="w-3.5 h-3.5 text-yellow-500 fill-current drop-shadow-[0_0_2px_rgba(234,179,8,0.8)]"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <span className="text-xs font-bold text-white">{(voteAverage / 10).toFixed(1)}</span>
    </div>
  );
};

export default function AnimeHero({ animeList }: AnimeHeroProps) {
  const [prevAnime, setPrevAnime] = useState<AnimeMediaItem | null>(null);
  const [activeAnime, setActiveAnime] = useState<AnimeMediaItem | null>(animeList[0] || null);
  const [displayAnime, setDisplayAnime] = useState<AnimeMediaItem | null>(animeList[0] || null);
  
  const [fadeActive, setFadeActive] = useState(true);
  const [textFade, setTextFade] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (animeList.length < 2) return;

    const interval = window.setInterval(() => {
      const nextIndex = (currentIndex + 1) % animeList.length;
      const nextAnime = animeList[nextIndex];
      setCurrentIndex(nextIndex);

      setPrevAnime(activeAnime || displayAnime);
      setActiveAnime(nextAnime);
      setFadeActive(false);
      setTextFade(false);

      const timerBackdrop = setTimeout(() => {
        setFadeActive(true);
      }, 50);

      const timerText = setTimeout(() => {
        setDisplayAnime(nextAnime);
        setTextFade(true);
      }, 300);

    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [animeList, currentIndex, activeAnime, displayAnime]);

  if (!displayAnime) {
    return (
      <div className="relative h-[65vh] w-full animate-pulse bg-gradient-to-br from-zinc-900 via-red-950/40 to-black md:h-[75vh]" />
    );
  }

  const title = getAnimeTitle(displayAnime);
  const description = stripAnimeDescription(displayAnime.description);
  const prevBanner = prevAnime ? prevAnime.bannerImage || prevAnime.coverImage?.extraLarge || prevAnime.coverImage?.large : null;
  const activeBanner = activeAnime ? activeAnime.bannerImage || activeAnime.coverImage?.extraLarge || activeAnime.coverImage?.large : null;

  return (
    <div className="relative h-[100svh] w-full overflow-hidden md:h-[80vh] bg-[#141414]" id="top">
      {/* LAYER 1: Underneath Background (Previous Movie Backdrop positioned full width) */}
      {prevAnime && (
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          {prevBanner ? (
            <Image
              src={prevBanner}
              alt=""
              fill
              className="absolute inset-0 h-full w-full object-cover object-center md:object-top"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-zinc-900 to-black" />
          )}
          {/* Vignetting overlays optimized for full width layout */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 via-[#141414]/35 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/30 z-10" />
        </div>
      )}

      {/* LAYER 2: Overlay Background with Transition (Active Movie Backdrop positioned full width) */}
      <div
        className={`absolute inset-0 z-10 select-none pointer-events-none transition-opacity duration-1000 ease-in-out ${
          fadeActive ? "opacity-100" : "opacity-0"
        }`}
      >
        {activeBanner ? (
          <Image
            src={activeBanner}
            alt=""
            fill
            priority
            className="absolute inset-0 h-full w-full object-cover object-center md:object-top"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-zinc-900 to-black" />
        )}
        {/* Vignetting overlays optimized for full width layout */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 via-[#141414]/35 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/30 z-10" />
      </div>

      {/* Content Layer */}
      <div className="relative h-full w-full z-20">
        <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-20 pt-24 md:px-12 md:pb-28 md:pt-32">
          <div
            className={`transition-all duration-700 ease-in-out ${
              textFade ? "opacity-100 translate-y-0 filter blur-0" : "opacity-0 translate-y-3 filter blur-[3px]"
            }`}
          >
            {/* Recommendation Tag — desktop only */}
            <div className="hidden md:flex mb-3 items-center gap-1.5 select-none">
              <span className="rounded-full bg-red-600 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-widest text-white shadow-[0_0_8px_rgba(229,9,20,0.5)]">THE</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-white/70">Netflix Recommendation</span>
            </div>

            {/* Title */}
            <h1 className="mb-3 text-4xl font-display uppercase tracking-wider leading-none text-white drop-shadow-2xl md:text-5xl lg:text-6xl max-w-3xl line-clamp-3">
              {title}
            </h1>

            {/* Compact star + year row — mobile only */}
            <div className="flex items-center gap-3 mb-4 md:hidden">
              {renderStars(displayAnime.averageScore || 0)}
              <span className="text-xs text-white/50">{displayAnime.seasonYear || "TBA"}</span>
              <span className="text-[10px] font-bold uppercase text-white/40">{displayAnime.format || "ANIME"}</span>
            </div>

            {/* Description — 2 lines on mobile, 3 lines on desktop */}
            <p className="text-description mb-5 line-clamp-2 max-w-sm text-[12px] text-white/60 drop-shadow-md md:line-clamp-3 md:max-w-lg md:text-[13px] md:text-white/65">
              {description}
            </p>

            {/* Full metadata grid — desktop only */}
            <div className="hidden md:flex mb-6 flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-4 select-none max-w-md">
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-red-500 mb-0.5">Format</p>
                <p className="text-xs font-bold text-white uppercase">{displayAnime.format || "ANIME"}</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-red-500 mb-0.5">Released</p>
                <p className="text-xs font-bold text-white">{displayAnime.seasonYear || "TBA"}</p>
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-red-500 mb-0.5">Rating</p>
                {renderStars(displayAnime.averageScore || 0)}
              </div>
              <div>
                <p className="text-[8px] font-black uppercase tracking-widest text-red-500 mb-0.5">Status</p>
                <p className="text-xs font-bold text-white uppercase">{displayAnime.status || "ONGOING"}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2.5">
              <a
                href="#rows"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-black text-xs px-5 py-3 rounded-full cursor-pointer select-none active:scale-95 duration-200 shadow-md uppercase tracking-wider gap-1.5 shadow-primary/20 min-w-[120px]"
              >
                <svg className="fill-current w-4 h-4" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </a>

              <Link
                href={`/anime/${displayAnime.id}`}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 shadow-lg backdrop-blur px-5 py-3 rounded-full cursor-pointer select-none active:scale-95 duration-200 gap-1.5 uppercase tracking-wider min-w-[120px]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                </svg>
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Extra bottom blending gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}