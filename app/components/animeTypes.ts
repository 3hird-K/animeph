export interface AnimeMediaItem {
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
}