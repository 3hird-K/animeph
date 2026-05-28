import { print } from 'graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { graphql } from '../graphql/gql';

// ==========================================
// CORE FETCH UTILITY
// ==========================================

export async function fetchAniList<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult> {
  const url = 'https://graphql.anilist.co';
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: print(document),
      variables: variables || {}
    })
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.errors) {
      console.error("AniList API Errors:", json.errors);
      throw new Error(json.errors[0].message);
    }

    return json.data;
  } catch (error) {
    console.error("Network or Parsing Error:", error);
    throw error;
  }
}

// ==========================================
// SHARED FRAGMENTS
// ==========================================

export const PageInfoFragment = graphql(`
  fragment PageInfoFields on PageInfo {
    total
    currentPage
    lastPage
    hasNextPage
    perPage
  }
`);

export const AnimeCardFragment = graphql(`
  fragment AnimeCardFields on Media {
    id
    idMal
    title {
      romaji
      english
      native
    }
    description
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    genres
    averageScore
    popularity
    episodes
    status
    format
    season
    seasonYear
  }
`);

// ==========================================
// QUERIES
// ==========================================

const GetTrendingAnimeQuery = graphql(`
  query GetTrendingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { ...PageInfoFields }
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        ...AnimeCardFields
        nextAiringEpisode { airingAt timeUntilAiring episode }
      }
    }
  }
`);

const GetPopularAnimeQuery = graphql(`
  query GetPopularAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { ...PageInfoFields }
      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        ...AnimeCardFields
      }
    }
  }
`);

const GetTopRatedAnimeQuery = graphql(`
  query GetTopRatedAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { ...PageInfoFields }
      media(sort: SCORE_DESC, type: ANIME, averageScore_greater: 70) {
        id
        ...AnimeCardFields
      }
    }
  }
`);

const SearchAnimeQuery = graphql(`
  query SearchAnime($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { ...PageInfoFields }
      media(search: $search, type: ANIME) {
        id
        ...AnimeCardFields
      }
    }
  }
`);

const GetUpcomingAnimeQuery = graphql(`
  query GetUpcomingAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { ...PageInfoFields }
      media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {
        id
        ...AnimeCardFields
      }
    }
  }
`);

const GetAnimeDetailsQuery = graphql(`
  query GetAnimeDetails($id: Int) {
    Media(id: $id, type: ANIME) {
      ...AnimeCardFields
      duration
      countryOfOrigin
      source
      hashtag
      trailer {
        id
        site
        thumbnail
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      airingSchedule(notYetAired: true) {
        nodes {
          airingAt
          episode
        }
      }
      relations {
        edges {
          id
          relationType
          node {
            id
            title {
              romaji
              english
            }
            coverImage {
              medium
            }
          }
        }
      }
      characters {
        edges {
          role
          node {
            id
            name {
              full
              native
            }
            image {
              large
            }
          }
          voiceActors {
            id
            name {
              full
              native
            }
            image {
              large
            }
          }
        }
      }
      studios {
        nodes {
          id
          name
        }
      }
      recommendations(sort: RATING_DESC, page: 1, perPage: 15) {
        edges {
          node {
            mediaRecommendation {
              ...AnimeCardFields
            }
          }
        }
      }
    }
  }
`);

// ==========================================
// API SERVICE FUNCTIONS
// ==========================================

export const getTrendingAnime = async (page = 1, perPage = 20) => {
  return fetchAniList(GetTrendingAnimeQuery, { page, perPage });
};

export const getPopularAnime = async (page = 1, perPage = 20) => {
  return fetchAniList(GetPopularAnimeQuery, { page, perPage });
};

export const getTopRatedAnime = async (page = 1, perPage = 20) => {
  return fetchAniList(GetTopRatedAnimeQuery, { page, perPage });
};

export const searchAnime = async (search: string, page = 1, perPage = 20) => {
  return fetchAniList(SearchAnimeQuery, { search, page, perPage });
};

export const getUpcomingAnime = async (page = 1, perPage = 20) => {
  return fetchAniList(GetUpcomingAnimeQuery, { page, perPage });
};

export const getAnimeDetails = async (id: number) => {
  return fetchAniList(GetAnimeDetailsQuery as any, { id });
};