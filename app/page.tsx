import { getTrendingAnime } from '../lib/anilist';
import AnimeCard from './components/AnimeCard';

export default async function Home() {
  const data = await getTrendingAnime(1, 12);
  
  const trendingAnime = data.Page?.media || [];

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight">Trending Now</h1>
        </header>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {trendingAnime.map((anime) => {
            if (!anime) return null;
            
            return (
              <AnimeCard 
                key={anime.id} 
                animeData={anime} 
              />
            );
          })}
        </div>
        
      </div>
    </main>
  );
}