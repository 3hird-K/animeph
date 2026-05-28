/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment PageInfoFields on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n": typeof types.PageInfoFieldsFragmentDoc,
    "\n  fragment AnimeCardFields on Media {\n    id\n    idMal\n    title {\n      romaji\n      english\n      native\n    }\n    description\n    coverImage {\n      extraLarge\n      large\n      medium\n      color\n    }\n    bannerImage\n    genres\n    averageScore\n    popularity\n    episodes\n    status\n    format\n    season\n    seasonYear\n  }\n": typeof types.AnimeCardFieldsFragmentDoc,
    "\n  query GetTrendingAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: TRENDING_DESC, type: ANIME) {\n        id\n        ...AnimeCardFields\n        nextAiringEpisode { airingAt timeUntilAiring episode }\n      }\n    }\n  }\n": typeof types.GetTrendingAnimeDocument,
    "\n  query GetPopularAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: POPULARITY_DESC, type: ANIME) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n": typeof types.GetPopularAnimeDocument,
    "\n  query GetTopRatedAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: SCORE_DESC, type: ANIME, averageScore_greater: 70) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n": typeof types.GetTopRatedAnimeDocument,
    "\n  query SearchAnime($search: String, $page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(search: $search, type: ANIME) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n": typeof types.SearchAnimeDocument,
    "\n  query GetUpcomingAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n": typeof types.GetUpcomingAnimeDocument,
    "\n  query GetAnimeDetails($id: Int) {\n    Media(id: $id, type: ANIME) {\n      ...AnimeCardFields\n      duration\n      countryOfOrigin\n      source\n      hashtag\n      trailer {\n        id\n        site\n        thumbnail\n      }\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n        episode\n      }\n      airingSchedule(notYetAired: true) {\n        nodes {\n          airingAt\n          episode\n        }\n      }\n      relations {\n        edges {\n          id\n          relationType\n          node {\n            id\n            title {\n              romaji\n              english\n            }\n            coverImage {\n              medium\n            }\n          }\n        }\n      }\n      characters {\n        edges {\n          role\n          node {\n            id\n            name {\n              full\n              native\n            }\n            image {\n              large\n            }\n          }\n          voiceActors {\n            id\n            name {\n              full\n              native\n            }\n            image {\n              large\n            }\n          }\n        }\n      }\n      studios {\n        nodes {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.GetAnimeDetailsDocument,
};
const documents: Documents = {
    "\n  fragment PageInfoFields on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n": types.PageInfoFieldsFragmentDoc,
    "\n  fragment AnimeCardFields on Media {\n    id\n    idMal\n    title {\n      romaji\n      english\n      native\n    }\n    description\n    coverImage {\n      extraLarge\n      large\n      medium\n      color\n    }\n    bannerImage\n    genres\n    averageScore\n    popularity\n    episodes\n    status\n    format\n    season\n    seasonYear\n  }\n": types.AnimeCardFieldsFragmentDoc,
    "\n  query GetTrendingAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: TRENDING_DESC, type: ANIME) {\n        id\n        ...AnimeCardFields\n        nextAiringEpisode { airingAt timeUntilAiring episode }\n      }\n    }\n  }\n": types.GetTrendingAnimeDocument,
    "\n  query GetPopularAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: POPULARITY_DESC, type: ANIME) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n": types.GetPopularAnimeDocument,
    "\n  query GetTopRatedAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: SCORE_DESC, type: ANIME, averageScore_greater: 70) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n": types.GetTopRatedAnimeDocument,
    "\n  query SearchAnime($search: String, $page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(search: $search, type: ANIME) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n": types.SearchAnimeDocument,
    "\n  query GetUpcomingAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n": types.GetUpcomingAnimeDocument,
    "\n  query GetAnimeDetails($id: Int) {\n    Media(id: $id, type: ANIME) {\n      ...AnimeCardFields\n      duration\n      countryOfOrigin\n      source\n      hashtag\n      trailer {\n        id\n        site\n        thumbnail\n      }\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n        episode\n      }\n      airingSchedule(notYetAired: true) {\n        nodes {\n          airingAt\n          episode\n        }\n      }\n      relations {\n        edges {\n          id\n          relationType\n          node {\n            id\n            title {\n              romaji\n              english\n            }\n            coverImage {\n              medium\n            }\n          }\n        }\n      }\n      characters {\n        edges {\n          role\n          node {\n            id\n            name {\n              full\n              native\n            }\n            image {\n              large\n            }\n          }\n          voiceActors {\n            id\n            name {\n              full\n              native\n            }\n            image {\n              large\n            }\n          }\n        }\n      }\n      studios {\n        nodes {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.GetAnimeDetailsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PageInfoFields on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n"): (typeof documents)["\n  fragment PageInfoFields on PageInfo {\n    total\n    currentPage\n    lastPage\n    hasNextPage\n    perPage\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AnimeCardFields on Media {\n    id\n    idMal\n    title {\n      romaji\n      english\n      native\n    }\n    description\n    coverImage {\n      extraLarge\n      large\n      medium\n      color\n    }\n    bannerImage\n    genres\n    averageScore\n    popularity\n    episodes\n    status\n    format\n    season\n    seasonYear\n  }\n"): (typeof documents)["\n  fragment AnimeCardFields on Media {\n    id\n    idMal\n    title {\n      romaji\n      english\n      native\n    }\n    description\n    coverImage {\n      extraLarge\n      large\n      medium\n      color\n    }\n    bannerImage\n    genres\n    averageScore\n    popularity\n    episodes\n    status\n    format\n    season\n    seasonYear\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTrendingAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: TRENDING_DESC, type: ANIME) {\n        id\n        ...AnimeCardFields\n        nextAiringEpisode { airingAt timeUntilAiring episode }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTrendingAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: TRENDING_DESC, type: ANIME) {\n        id\n        ...AnimeCardFields\n        nextAiringEpisode { airingAt timeUntilAiring episode }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPopularAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: POPULARITY_DESC, type: ANIME) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPopularAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: POPULARITY_DESC, type: ANIME) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTopRatedAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: SCORE_DESC, type: ANIME, averageScore_greater: 70) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTopRatedAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: SCORE_DESC, type: ANIME, averageScore_greater: 70) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchAnime($search: String, $page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(search: $search, type: ANIME) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchAnime($search: String, $page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(search: $search, type: ANIME) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUpcomingAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUpcomingAnime($page: Int, $perPage: Int) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo { ...PageInfoFields }\n      media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) {\n        id\n        ...AnimeCardFields\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAnimeDetails($id: Int) {\n    Media(id: $id, type: ANIME) {\n      ...AnimeCardFields\n      duration\n      countryOfOrigin\n      source\n      hashtag\n      trailer {\n        id\n        site\n        thumbnail\n      }\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n        episode\n      }\n      airingSchedule(notYetAired: true) {\n        nodes {\n          airingAt\n          episode\n        }\n      }\n      relations {\n        edges {\n          id\n          relationType\n          node {\n            id\n            title {\n              romaji\n              english\n            }\n            coverImage {\n              medium\n            }\n          }\n        }\n      }\n      characters {\n        edges {\n          role\n          node {\n            id\n            name {\n              full\n              native\n            }\n            image {\n              large\n            }\n          }\n          voiceActors {\n            id\n            name {\n              full\n              native\n            }\n            image {\n              large\n            }\n          }\n        }\n      }\n      studios {\n        nodes {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAnimeDetails($id: Int) {\n    Media(id: $id, type: ANIME) {\n      ...AnimeCardFields\n      duration\n      countryOfOrigin\n      source\n      hashtag\n      trailer {\n        id\n        site\n        thumbnail\n      }\n      nextAiringEpisode {\n        airingAt\n        timeUntilAiring\n        episode\n      }\n      airingSchedule(notYetAired: true) {\n        nodes {\n          airingAt\n          episode\n        }\n      }\n      relations {\n        edges {\n          id\n          relationType\n          node {\n            id\n            title {\n              romaji\n              english\n            }\n            coverImage {\n              medium\n            }\n          }\n        }\n      }\n      characters {\n        edges {\n          role\n          node {\n            id\n            name {\n              full\n              native\n            }\n            image {\n              large\n            }\n          }\n          voiceActors {\n            id\n            name {\n              full\n              native\n            }\n            image {\n              large\n            }\n          }\n        }\n      }\n      studios {\n        nodes {\n          id\n          name\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;