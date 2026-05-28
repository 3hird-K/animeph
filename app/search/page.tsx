import { searchAnime } from '../../lib/anilist';
import AnimeNavbar from '../components/AnimeNavbar';
import AnimeCard from '../components/AnimeCard';
import type { AnimeMediaItem } from '../components/animeTypes';

type AnimeSource = {
  id: number;
  title?: {
    english?: string | null;
    romaji?: string | null;
  } | null;
  description?: string | null;
  bannerImage?: string | null;
  coverImage?: {
    extraLarge?: string | null;
    large?: string | null;
  } | null;
  averageScore?: number | null;
  format?: string | null;
  seasonYear?: number | null;
  status?: string | null;
  genres?: string[] | null;
};

function toAnimeMediaItem(anime: AnimeSource | null | undefined): AnimeMediaItem | null {
  if (!anime) {
    return null;
  }

  return {
    id: anime.id,
    title: anime.title
      ? {
          english: anime.title.english ?? null,
          romaji: anime.title.romaji ?? null,
        }
      : null,
    description: anime.description ?? null,
    bannerImage: anime.bannerImage ?? null,
    coverImage: anime.coverImage
      ? {
          extraLarge: anime.coverImage.extraLarge ?? null,
          large: anime.coverImage.large ?? null,
        }
      : null,
    averageScore: anime.averageScore ?? null,
    format: anime.format ?? null,
    seasonYear: anime.seasonYear ?? null,
    status: anime.status ?? null,
    genres: anime.genres ?? null,
  };
}

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}) {
  const searchParams = await props.searchParams;
  const rawQ = searchParams.q;
  const q = Array.isArray(rawQ) ? rawQ[0] : rawQ;
  const query = q || '';

  let results: AnimeMediaItem[] = [];
  if (query) {
    try {
      const searchRes = await searchAnime(query, 1, 30);
      results = (searchRes.Page?.media || []).map(toAnimeMediaItem).filter(
        (anime): anime is AnimeMediaItem => anime !== null
      );
    } catch (e) {
      console.error("Error searching anime:", e);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white" id="top">
      <AnimeNavbar initialQuery={query} />
      
      <div className="mx-auto max-w-[1600px] px-4 md:px-12 pt-28 pb-24">
        {query ? (
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-white/80">
              Search results for <span className="text-white font-bold">&quot;{query}&quot;</span>
            </h1>
          </div>
        ) : (
          <div className="mb-8">
            <h1 className="text-2xl font-medium text-white/50">
              Type something to search...
            </h1>
          </div>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-12 md:gap-x-4 md:gap-y-14">
            {results.map((anime) => (
              <div key={anime.id} className="relative z-0 group hover:z-20">
                <AnimeCard animeData={anime} />
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="mt-20 text-center">
            <p className="text-xl text-white/60">No results found for &quot;{query}&quot;.</p>
            <p className="text-sm text-white/40 mt-2">Try searching for a different title or genre.</p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
