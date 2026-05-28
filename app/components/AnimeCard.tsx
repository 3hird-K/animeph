import Image from 'next/image';
import { FragmentType, useFragment } from '../../graphql/fragment-masking';
import { AnimeCardFragment } from '../../lib/anilist';

interface Props {
  animeData: FragmentType<typeof AnimeCardFragment>;
}

export default function AnimeCard({ animeData }: Props) {
  const anime = useFragment(AnimeCardFragment, animeData);
  
  // Cleanly fall back to available data
  const title = anime.title?.english || anime.title?.romaji || 'Unknown Title';
  const cover = anime.coverImage?.extraLarge || anime.coverImage?.large || '';
  const score = anime.averageScore ? `${anime.averageScore}%` : 'N/R';

  return (
    <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/50">
      
      {/* Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-800">
        {cover && (
          <Image 
            src={cover} 
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        
        {/* Floating Score Badge */}
        <div className="absolute right-2 top-2 rounded-md bg-slate-950/80 px-2 py-1 text-xs font-bold tracking-wide text-amber-400 shadow-sm backdrop-blur-md">
          ⭐ {score}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <h3 className="line-clamp-2 text-sm font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-blue-400">
          {title}
        </h3>
        
        <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-400">
          <span className="truncate">{anime.format || 'TV'} • {anime.seasonYear || 'TBA'}</span>
          
          {/* Display the first genre as a mini-tag if it exists */}
          {anime.genres && anime.genres.length > 0 && (
            <span className="truncate rounded-sm bg-slate-800 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-300">
              {anime.genres[0]}
            </span>
          )}
        </div>
      </div>
      
    </div>
  );
}