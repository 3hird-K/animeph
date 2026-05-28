import Image from 'next/image';
import { getAnimeDetails } from '../../../lib/anilist';
import AnimeNavbar from '../../components/AnimeNavbar';
import AnimeCard from '../../components/AnimeCard';

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function AnimeDetailsPage(props: PageProps) {
  const params = await props.params;
  const animeId = parseInt(params.id, 10);
  
  if (isNaN(animeId)) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col">
        <AnimeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-white/50">Invalid ID</p>
        </div>
      </main>
    );
  }

  let res: any;
  try {
    res = await getAnimeDetails(animeId);
  } catch (error) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col">
        <AnimeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-white/50">Failed to load anime details.</p>
        </div>
      </main>
    );
  }

  const anime = res.Media as any;

  if (!anime) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex flex-col">
        <AnimeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-white/50">Anime not found</p>
        </div>
      </main>
    );
  }

  const title = anime.title?.english || anime.title?.romaji || "Unknown Title";
  const cover = anime.coverImage?.extraLarge || anime.coverImage?.large;
  const banner = anime.bannerImage || cover;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <AnimeNavbar />
      
      {/* Hero Section */}
      <div className="relative h-[65vh] w-full lg:h-[80vh]">
        {banner && (
          <Image
            src={banner}
            alt={title}
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full px-4 md:px-12 pb-8 md:pb-16 pt-32 z-10">
          <div className="flex flex-col md:flex-row gap-8 max-w-[1600px] mx-auto items-end">
            {cover && (
              <div className="hidden md:block relative w-56 h-80 rounded-lg overflow-hidden shrink-0 shadow-2xl ring-1 ring-white/20">
                <Image src={cover} alt={title} fill className="object-cover" />
              </div>
            )}
            
            <div className="flex-1 max-w-3xl z-10">
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-wider mb-4 drop-shadow-lg">
                {title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium mb-6 drop-shadow-md">
                {anime.averageScore && (
                  <span className="text-green-400 font-bold">{anime.averageScore}% Match</span>
                )}
                {anime.seasonYear && <span>{anime.seasonYear}</span>}
                {anime.format && <span className="border border-white/40 px-1.5 py-0.5 rounded text-xs bg-black/20">{anime.format}</span>}
                {anime.episodes && <span>{anime.episodes} Episodes</span>}
              </div>
              
              <div 
                className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-6 mb-6 drop-shadow"
                dangerouslySetInnerHTML={{ __html: anime.description || 'No description available.' }}
              />
              
              {anime.genres && (
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((g: string) => g && (
                    <span key={g} className="px-3 py-1 bg-zinc-800/80 rounded-full text-xs font-medium text-white/80 border border-white/10 hover:bg-white/10 transition-colors">
                      {g}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {anime.trailer && anime.trailer.site === 'youtube' && (
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 pt-12 relative z-10">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block"></span>
            Trailer
          </h2>
          <div className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-zinc-900">
            <iframe
              src={`https://www.youtube.com/embed/${anime.trailer.id}`}
              title="Anime Trailer"
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Characters Section */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-12 relative z-10">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block"></span>
          Characters
        </h2>
        {anime.characters?.edges && anime.characters.edges.length > 0 ? (
          <div className="flex overflow-x-auto gap-6 md:gap-8 pb-6 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 md:mx-0 md:px-0">
            {anime.characters.edges.map((edge: any, i: number) => {
              const char = edge?.node;
              if (!char) return null;
              return (
                <div key={char.id || i} className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-1 shrink-0 snap-start w-28 md:w-36">
                  <div className="relative aspect-square w-28 md:w-36 rounded-full overflow-hidden ring-2 ring-zinc-800 group-hover:ring-red-600/50 shadow-lg group-hover:shadow-red-900/40 mb-4 bg-zinc-900">
                    {char.image?.large ? (
                      <Image src={char.image.large} alt={char.name?.full || "Character"} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-xs text-white/50">No Image</div>
                    )}
                  </div>
                  <div className="text-center w-full px-2">
                    <p className="font-bold text-sm truncate text-white/90 group-hover:text-white transition-colors">{char.name?.full}</p>
                    <p className="text-xs text-white/50 capitalize mt-1 group-hover:text-red-400 font-medium transition-colors">{edge?.role?.toLowerCase()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-white/50 text-sm">No characters found for this anime.</p>
        )}
      </div>

      {/* Recommendations Section */}
      {anime.recommendations?.edges && anime.recommendations.edges.length > 0 && (
        <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-12 relative z-10">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-red-600 rounded-full inline-block"></span>
            More Like This
          </h2>
          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 md:mx-0 md:px-0">
            {anime.recommendations.edges.map((edge: any, i: number) => {
              const rec = edge?.node?.mediaRecommendation;
              if (!rec) return null;
              return (
                <div key={rec.id || i} className="shrink-0 snap-start w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px]">
                  <AnimeCard animeData={rec} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
