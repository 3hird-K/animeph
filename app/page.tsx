import { getPopularAnime, getTopRatedAnime, getTrendingAnime, getUpcomingAnime } from '../lib/anilist';
import AnimeHero from './components/AnimeHero';
import AnimeNavbar from './components/AnimeNavbar';
import AnimeRow from './components/AnimeRow';
import type { AnimeMediaItem } from './components/animeTypes';

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

function uniqueAnime(lists: AnimeMediaItem[][]) {
  const seen = new Set<AnimeMediaItem['id']>();

  return lists.flat().filter((anime) => {
    if (seen.has(anime.id)) {
      return false;
    }

    seen.add(anime.id);
    return true;
  });
}

export default async function Home() {
  const [trendingRes, popularRes, topRatedRes, upcomingRes] = await Promise.all([
    getTrendingAnime(1, 16),
    getPopularAnime(1, 16),
    getTopRatedAnime(1, 16),
    getUpcomingAnime(1, 16),
  ]);

  const trendingAnime = (trendingRes.Page?.media || []).map(toAnimeMediaItem).filter(
    (anime): anime is AnimeMediaItem => anime !== null
  );
  const popularAnime = (popularRes.Page?.media || []).map(toAnimeMediaItem).filter(
    (anime): anime is AnimeMediaItem => anime !== null
  );
  const topRatedAnime = (topRatedRes.Page?.media || []).map(toAnimeMediaItem).filter(
    (anime): anime is AnimeMediaItem => anime !== null
  );
  const upcomingAnime = (upcomingRes.Page?.media || []).map(toAnimeMediaItem).filter(
    (anime): anime is AnimeMediaItem => anime !== null
  );

  const sections = [
    {
      id: 'trending',
      title: 'Trending Now',
      subtitle: 'Most watched anime this week',
      variant: 'trending' as const,
      items: trendingAnime,
    },
    {
      id: 'popular',
      title: 'Popular on AniList',
      subtitle: 'The titles people keep coming back to',
      variant: 'popular' as const,
      items: popularAnime,
    },
    {
      id: 'top-rated',
      title: 'Top Rated',
      subtitle: 'Highest scoring anime on the service',
      variant: 'toprated' as const,
      items: topRatedAnime,
    },
    {
      id: 'upcoming',
      title: 'Upcoming',
      subtitle: 'On the way next',
      variant: 'upcoming' as const,
      items: upcomingAnime,
    },
  ] as const;

  const heroQueue = uniqueAnime([
    trendingAnime,
    popularAnime,
    topRatedAnime,
    upcomingAnime,
  ])
    .filter((anime) => anime?.bannerImage || anime?.coverImage?.extraLarge || anime?.coverImage?.large)
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-[#141414] text-white" id="top">
      <AnimeNavbar sections={sections} />
      <AnimeHero animeList={heroQueue} />

      <div id="rows" className="relative z-10 -mt-10 space-y-8 pb-24 sm:-mt-14">
        {sections.map((section) => (
          <AnimeRow
            key={section.id}
            id={section.id}
            title={section.title}
            subtitle={section.subtitle}
            variant={section.variant}
            items={section.items}
          />
        ))}
      </div>
    </main>
  );
}