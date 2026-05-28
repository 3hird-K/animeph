"use client";

import { useState, useRef } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { AnimeMediaItem } from './animeTypes';

interface Props {
  animeData: AnimeMediaItem;
}

const GRADIENTS = [
  "from-red-600 via-rose-800 to-black",
  "from-indigo-700 via-purple-800 to-slate-900",
  "from-emerald-600 via-teal-800 to-black",
  "from-amber-500 via-orange-700 to-red-900",
  "from-cyan-500 via-blue-700 to-indigo-900",
  "from-fuchsia-600 via-pink-700 to-rose-900",
  "from-yellow-500 via-red-700 to-zinc-900",
  "from-lime-500 via-emerald-700 to-slate-900",
  "from-sky-500 via-indigo-700 to-purple-900",
  "from-orange-600 via-red-700 to-zinc-900",
  "from-violet-600 via-purple-800 to-black",
  "from-teal-500 via-cyan-700 to-blue-900",
];

export default function AnimeCard({ animeData }: Props) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const [hover, setHover] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const title = animeData.title?.english || animeData.title?.romaji || 'Unknown Title';
  const cover = animeData.coverImage?.extraLarge || animeData.coverImage?.large || '';
  const score = animeData.averageScore ? `${(animeData.averageScore / 10).toFixed(1)}` : 'N/A';
  const format = animeData.format || 'TV';
  const seasonYear = animeData.seasonYear || 'TBA';
  const genres = animeData.genres?.slice(0, 2) || [];
  const overview = animeData.description?.replace(/<[^>]*>?/gm, '') || ""; // Strip HTML tags
  const status = animeData.status || 'ONGOING';

  const gradientSeed = animeData.id || 0;
  const gradient = GRADIENTS[gradientSeed % GRADIENTS.length];
  const showFallback = !cover || imgError;

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => setHover(true), 200);
  };
  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setHover(false);
  };

  return (
    <div
      className="group/card relative cursor-pointer select-none transition-transform duration-300 w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push(`/anime/${animeData.id}`)}
      style={{ zIndex: hover ? 50 : 1 }}
    >
      {/* Base poster */}
      <div className={`relative aspect-2/3 w-full overflow-hidden rounded bg-zinc-950 shadow-lg shadow-black/60 ring-1 ring-white/5 transition-all duration-500 ease-out ${hover ? "scale-105 -translate-y-1.5 shadow-2xl shadow-black ring-primary/40" : ""}`}>
        
        {/* Unhovered Format Badge */}
        <div className={`absolute bottom-2 left-2 z-10 transition-opacity duration-300 ${hover ? "opacity-0" : "opacity-100"}`}>
          <span className="rounded bg-black/60 px-1.5 py-0.5 text-[8px] font-bold text-white/90 backdrop-blur-sm border border-white/20">
            {format}
          </span>
        </div>

        {showFallback ? (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient} p-4`}>
            <span className="text-center text-sm font-bold leading-tight text-white/95 drop-shadow-lg">{title}</span>
          </div>
        ) : (
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 24vw, 200px"
            onError={() => setImgError(true)}
            className="object-cover transition-all duration-500 ease-out"
          />
        )}

        {/* Hover gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 transition-opacity duration-300 ease-out ${hover ? "opacity-100" : "opacity-0 pointer-events-none"}`} />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-between p-3.5 transition-all duration-300 ease-out ${
            hover ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Top: type badge */}
          <div className="flex items-center justify-between">
            <span className="rounded bg-primary/90 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-white shadow-md">
              {format}
            </span>
            {score !== "N/A" && (
              <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm">
                <svg className="h-3 w-3 text-yellow-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="text-[10px] font-bold text-white">{score}</span>
              </div>
            )}
          </div>

          {/* Bottom: info block */}
          <div className={`space-y-2 transition-all duration-400 ease-out transform ${hover ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            {/* Play button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-xl transition hover:scale-110 hover:bg-white/90 mx-auto mb-2 pointer-events-none"
            >
              <svg className="h-4 w-4 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            <h3 className="text-xs font-black uppercase tracking-tight text-white line-clamp-2 md:text-sm leading-tight">
              {title}
            </h3>

            {/* Genre tags */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {genres.map(g => (
                  <span key={g} className="rounded bg-white/10 px-1.5 py-0.5 text-[8px] font-bold text-white/80 uppercase tracking-wider backdrop-blur-sm">
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* Mini synopsis */}
            {overview && (
              <p className="text-description text-[10px] text-white/65 line-clamp-3">
                {overview}
              </p>
            )}

            {/* Year and action icons */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white/50">{seasonYear}</span>
                <span className="rounded border border-white/20 bg-black/40 px-1 py-0.5 text-[8px] font-bold text-white/80 backdrop-blur-sm">
                  {status}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Add to list icon */}
                <button
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-white/70 transition hover:border-white hover:text-white hover:scale-110"
                  title="Add to My List"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                {/* Info icon */}
                <button
                  onClick={() => router.push(`/anime/${animeData.id}`)}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-white/70 transition hover:border-white hover:text-white hover:scale-110"
                  title="More Info"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}